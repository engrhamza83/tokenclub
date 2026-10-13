import type { NextApiRequest, NextApiResponse } from 'next';
import { getPinataJwt } from '../../../lib/server/secrets';
import { consumeRateLimit, extractClientIp } from '../../../lib/simple-rate-limit';

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '8kb',
    },
  },
  maxDuration: 60,
};

const ALLOWED_HOSTS = new Set([
  'dd.dexscreener.com',
  'cdn.dexscreener.com',
  'images.pump.fun',
  'pump.fun',
  'token.jup.ag',
  'api.dicebear.com',
  'gateway.pinata.cloud',
  'ipfs.io',
  'cloudflare-ipfs.com',
  'arweave.net',
  'nftstorage.link',
  'i.imgur.com',
  'pbs.twimg.com',
  'coin-images.coingecko.com',
  'assets.coingecko.com',
]);

function isAllowedImageHost(hostname: string): boolean {
  const host = hostname.toLowerCase();
  if (ALLOWED_HOSTS.has(host)) return true;
  if (host.endsWith('.mypinata.cloud')) return true;
  if (host.endsWith('.ipfs.dweb.link')) return true;
  if (host.endsWith('.nftstorage.link')) return true;
  if (host.endsWith('.arweave.net')) return true;
  if (host.endsWith('.coingecko.com')) return true;
  if (host.endsWith('.geckoterminal.com')) return true;
  if (host.endsWith('.pump.fun')) return true;
  if (host.endsWith('.jup.ag')) return true;
  if (host.endsWith('.axiom-cdn.io')) return true;
  return false;
}

function guessMime(url: string, contentType: string | null): string {
  if (contentType && contentType.startsWith('image/')) {
    return contentType.split(';')[0].trim();
  }
  const lower = url.toLowerCase();
  if (lower.includes('.png')) return 'image/png';
  if (lower.includes('.webp')) return 'image/webp';
  if (lower.includes('.gif')) return 'image/gif';
  if (lower.includes('.svg')) return 'image/svg+xml';
  return 'image/jpeg';
}

function filenameFromMime(mime: string): string {
  switch (mime) {
    case 'image/png':
      return 'token.png';
    case 'image/webp':
      return 'token.webp';
    case 'image/gif':
      return 'token.gif';
    case 'image/svg+xml':
      return 'token.svg';
    default:
      return 'token.jpg';
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const ip = extractClientIp(req.headers);
  const limit = consumeRateLimit(`pinata-url:${ip}`, 20);
  res.setHeader('X-RateLimit-Limit', '20');
  res.setHeader('X-RateLimit-Remaining', String(limit.remaining));
  res.setHeader('X-RateLimit-Reset', String(limit.resetEpochSeconds));
  if (!limit.allowed) {
    res.setHeader('Retry-After', '60');
    return res.status(429).json({ error: 'Too many requests' });
  }

  const jwt = getPinataJwt();
  if (!jwt) {
    return res.status(503).json({
      error: 'Pinata not configured',
      message: 'Set PINATA_JWT in Vercel environment variables.',
    });
  }

  const rawUrl = (req.body as { url?: string } | null)?.url;
  if (!rawUrl || typeof rawUrl !== 'string') {
    return res.status(400).json({ error: 'Missing image url' });
  }

  let parsed: URL;
  try {
    parsed = new URL(rawUrl);
  } catch {
    return res.status(400).json({ error: 'Invalid image url' });
  }

  if (parsed.protocol !== 'https:' && parsed.protocol !== 'http:') {
    return res.status(400).json({ error: 'Unsupported image protocol' });
  }
  if (!isAllowedImageHost(parsed.hostname)) {
    return res.status(400).json({ error: 'Image host is not allowed' });
  }

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15000);
    const imageRes = await fetch(parsed.toString(), {
      headers: { Accept: 'image/*,*/*;q=0.8' },
      signal: controller.signal,
    }).finally(() => clearTimeout(timeout));
    if (!imageRes.ok) {
      return res.status(502).json({ error: `Failed to fetch image (${imageRes.status})` });
    }

    const bytes = Buffer.from(await imageRes.arrayBuffer());
    if (bytes.length > 5 * 1024 * 1024) {
      return res.status(413).json({ error: 'File too large (max 5MB)' });
    }
    if (bytes.length === 0) {
      return res.status(400).json({ error: 'Empty image' });
    }

    const mimeType = guessMime(parsed.pathname, imageRes.headers.get('content-type'));
    const form = new FormData();
    form.append(
      'file',
      new Blob([new Uint8Array(bytes)], { type: mimeType }),
      filenameFromMime(mimeType)
    );

    const r = await fetch('https://api.pinata.cloud/pinning/pinFileToIPFS', {
      method: 'POST',
      headers: { Authorization: `Bearer ${jwt}` },
      body: form,
    });

    const data = (await r.json().catch(() => ({}))) as {
      IpfsHash?: string;
      error?: string | { reason?: string; details?: string };
      message?: string;
    };

    if (!r.ok) {
      const details =
        typeof data.error === 'string'
          ? data.error
          : data.error?.details || data.error?.reason || data.message || 'Pinata upload failed';
      return res.status(r.status).json({ error: details });
    }

    const hash = data.IpfsHash;
    if (!hash) {
      return res.status(502).json({ error: 'Unexpected Pinata response' });
    }
    return res.status(200).json({
      gatewayUrl: `https://gateway.pinata.cloud/ipfs/${hash}`,
      ipfsHash: hash,
    });
  } catch {
    return res.status(502).json({ error: 'Failed to pin remote image' });
  }
}
