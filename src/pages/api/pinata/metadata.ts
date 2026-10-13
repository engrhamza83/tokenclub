import type { NextApiRequest, NextApiResponse } from 'next';
import { getPinataJwt } from '../../../lib/server/secrets';
import { consumeRateLimit, extractClientIp } from '../../../lib/simple-rate-limit';

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '1mb',
    },
  },
  maxDuration: 60,
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const ip = extractClientIp(req.headers);
  const limit = consumeRateLimit(`pinata:${ip}`, 20);
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

  const metadata = req.body;
  if (!metadata || typeof metadata !== 'object') {
    return res.status(400).json({ error: 'Missing metadata JSON body' });
  }

  try {
    const r = await fetch('https://api.pinata.cloud/pinning/pinJSONToIPFS', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwt}`,
      },
      body: JSON.stringify(metadata),
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
          : data.error?.details || data.error?.reason || data.message || 'Pinata metadata upload failed';
      return res.status(r.status).json({
        error: details,
        reason: typeof data.error === 'object' ? data.error?.reason : undefined,
        pinata: data,
      });
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
    return res.status(502).json({ error: 'Pinata metadata upload failed' });
  }
}
