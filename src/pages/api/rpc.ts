/**
 * Solana JSON-RPC proxy (Vercel Node). Keys stay server-side.
 * Client: POST /api/rpc?network=mainnet-beta|devnet
 * Also accepts ?cluster= for backwards compatibility with /api/wire clients.
 */
import type { NextApiRequest, NextApiResponse } from 'next';
import { getRpcUpstreamUrl, type RpcNetwork } from '../../lib/server/secrets';
import { consumeRateLimit, extractClientIp } from '../../lib/simple-rate-limit';

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '2.5mb',
    },
  },
  maxDuration: 60,
};

const MAX_BODY_CHARS = 2_500_000;

function normalizeNetwork(raw: string | string[] | undefined): RpcNetwork | null {
  const v = Array.isArray(raw) ? raw[0] : raw;
  if (!v || v === 'mainnet-beta') return 'mainnet-beta';
  if (v === 'devnet') return 'devnet';
  return null;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'OPTIONS') {
    res.setHeader('Allow', 'POST, OPTIONS');
    return res.status(204).end();
  }

  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST, OPTIONS');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const ip = extractClientIp(req.headers);
  const limit = consumeRateLimit(`rpc:${ip}`, 120);
  res.setHeader('X-RateLimit-Limit', '120');
  res.setHeader('X-RateLimit-Remaining', String(limit.remaining));
  res.setHeader('X-RateLimit-Reset', String(limit.resetEpochSeconds));
  if (!limit.allowed) {
    res.setHeader('Retry-After', '60');
    return res.status(429).json({ error: 'Too many requests' });
  }

  const network = normalizeNetwork(req.query.network ?? req.query.cluster);
  if (!network) {
    return res.status(400).json({ error: 'Invalid network (use mainnet-beta or devnet)' });
  }

  let bodyText: string;
  try {
    if (typeof req.body === 'string') {
      bodyText = req.body;
    } else if (req.body && typeof req.body === 'object') {
      bodyText = JSON.stringify(req.body);
    } else {
      return res.status(400).json({ error: 'Invalid JSON' });
    }
  } catch {
    return res.status(400).json({ error: 'Invalid JSON' });
  }

  if (bodyText.length > MAX_BODY_CHARS) {
    return res.status(413).json({ error: 'Payload too large' });
  }

  let parsed: unknown;
  try {
    parsed = JSON.parse(bodyText);
  } catch {
    return res.status(400).json({ error: 'Invalid JSON' });
  }
  if (parsed === null || typeof parsed !== 'object' || !('method' in parsed)) {
    return res.status(400).json({ error: 'Invalid JSON-RPC body' });
  }

  const upstream = getRpcUpstreamUrl(network);

  try {
    let upstreamRes = await fetch(upstream, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: bodyText,
    });

    // Devnet: if private RPC rejects auth, fall back to public (amm pattern).
    if (
      network === 'devnet' &&
      (upstreamRes.status === 401 || upstreamRes.status === 403) &&
      (upstream.includes('helius-rpc.com') || upstream.includes('alchemy.com'))
    ) {
      upstreamRes = await fetch('https://api.devnet.solana.com', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: bodyText,
      });
    }

    const outText = await upstreamRes.text();
    const ct = upstreamRes.headers.get('Content-Type') || 'application/json';
    res.setHeader('Content-Type', ct);
    return res.status(upstreamRes.status).send(outText);
  } catch {
    return res.status(502).json({ error: 'Upstream RPC request failed' });
  }
}
