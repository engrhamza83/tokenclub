import type { NextApiRequest, NextApiResponse } from 'next';
import { consumeRateLimit, extractClientIp } from '../../../lib/simple-rate-limit';
import { getTrendingPage } from '../../../lib/live-trending';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const ip = extractClientIp(req.headers);
  const limit = consumeRateLimit(`trending:${ip}`, 120);
  res.setHeader('X-RateLimit-Limit', '120');
  res.setHeader('X-RateLimit-Remaining', String(limit.remaining));
  res.setHeader('X-RateLimit-Reset', String(limit.resetEpochSeconds));
  if (!limit.allowed) {
    res.setHeader('Retry-After', '60');
    return res.status(429).json({ error: 'Too many requests' });
  }

  const tab = typeof req.query.tab === 'string' ? req.query.tab : 'trending';
  const offsetRaw = parseInt(typeof req.query.offset === 'string' ? req.query.offset : '0', 10);
  const offset = Number.isFinite(offsetRaw) ? Math.max(0, offsetRaw) : 0;

  try {
    const data = await getTrendingPage(tab, offset);
    res.setHeader('Cache-Control', 'public, s-maxage=60, stale-while-revalidate=120');
    return res.status(200).json(data);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Trending fetch failed';
    return res.status(500).json({ error: message });
  }
}
