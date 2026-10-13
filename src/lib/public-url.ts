/**
 * Canonical site origin for same-origin API URLs (RPC / Jupiter / Pinata proxies).
 * Set NEXT_PUBLIC_SITE_URL in production if SSR/AppKit needs a stable origin outside Vercel.
 */
export function getPublicSiteUrl(): string {
  if (typeof window !== 'undefined') {
    // Always use the current page origin for API URLs so /api/rpc stays same-origin.
    // Forcing www while the user is on apex (or vice versa) triggers CORS + fetch failures.
    return window.location.origin;
  }
  const site = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '');
  if (site) return site;
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  return 'http://localhost:3000';
}
