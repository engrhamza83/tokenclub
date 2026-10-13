type Bucket = {
  count: number;
  startedAt: number;
};

const buckets = new Map<string, Bucket>();
const WINDOW_MS = 60_000;

type HeaderLike = Headers | Record<string, string | string[] | undefined>;

export function extractClientIp(headers: HeaderLike): string {
  const getHeader = (key: string): string | string[] | undefined => {
    if (headers instanceof Headers) {
      const v = headers.get(key);
      return v === null ? undefined : v;
    }
    return (headers as Record<string, string | string[] | undefined>)[key];
  };

  const xff = getHeader('x-forwarded-for');
  if (typeof xff === 'string' && xff.length > 0) {
    return xff.split(',')[0].trim();
  }
  if (Array.isArray(xff) && xff.length > 0) {
    return xff[0].split(',')[0].trim();
  }
  const realIp = getHeader('x-real-ip');
  if (typeof realIp === 'string' && realIp.length > 0) {
    return realIp;
  }
  if (Array.isArray(realIp) && realIp.length > 0) {
    return realIp[0];
  }
  return 'unknown';
}

export function consumeRateLimit(
  key: string,
  limitPerMinute: number
): { allowed: boolean; remaining: number; resetEpochSeconds: number } {
  const now = Date.now();
  const current = buckets.get(key);

  if (!current || now - current.startedAt >= WINDOW_MS) {
    buckets.set(key, { count: 1, startedAt: now });
    return {
      allowed: true,
      remaining: Math.max(limitPerMinute - 1, 0),
      resetEpochSeconds: Math.floor((now + WINDOW_MS) / 1000),
    };
  }

  current.count += 1;
  buckets.set(key, current);

  return {
    allowed: current.count <= limitPerMinute,
    remaining: Math.max(limitPerMinute - current.count, 0),
    resetEpochSeconds: Math.floor((current.startedAt + WINDOW_MS) / 1000),
  };
}
