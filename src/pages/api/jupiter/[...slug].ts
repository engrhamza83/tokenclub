/**
 * Proxies Jupiter api.jup.ag so JUPITER_API_KEY stays server-side only.
 * Client: `${origin}/api/jupiter/...`
 */
import type { NextApiRequest, NextApiResponse } from 'next';
import { getJupiterServerApiKey, getJupiterUpstreamBaseUrl } from '../../../lib/server/secrets';
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
  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  const ip = extractClientIp(req.headers);
  const limit = consumeRateLimit(`jup:${ip}`, 90);
  if (!limit.allowed) {
    res.setHeader('Retry-After', '60');
    return res.status(429).json({ error: 'Too many requests' });
  }

  const slug = req.query.slug;
  const parts = Array.isArray(slug) ? slug : slug ? [slug] : [];
  if (parts.length === 0) {
    return res.status(400).json({ error: 'Missing path' });
  }

  const base = getJupiterUpstreamBaseUrl();
  const path = parts.map(encodeURIComponent).join('/');
  const search = new URL(req.url || '', 'http://localhost').search;
  const target = `${base}/${path}${search}`;

  const headers: Record<string, string> = {};
  const ct = req.headers['content-type'];
  if (typeof ct === 'string') headers['Content-Type'] = ct;
  const apiKey = getJupiterServerApiKey();
  if (apiKey) headers['x-api-key'] = apiKey;

  const init: RequestInit = {
    method: req.method || 'GET',
    headers,
  };
  if (req.method === 'POST' || req.method === 'PUT' || req.method === 'PATCH') {
    init.body =
      typeof req.body === 'string' ? req.body : req.body != null ? JSON.stringify(req.body) : undefined;
  }

  try {
    const upstream = await fetch(target, init);
    const text = await upstream.text();
    const passCt = upstream.headers.get('content-type');
    if (passCt) res.setHeader('Content-Type', passCt);
    return res.status(upstream.status).send(text);
  } catch {
    return res.status(502).json({ error: 'Jupiter proxy request failed' });
  }
}
