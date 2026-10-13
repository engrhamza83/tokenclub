export function validateHostPolicy(): boolean {
  if (typeof window === 'undefined') return true;

  if (typeof window.location !== 'undefined' && (window.location.search.includes('__debug_policy=1') || window.location.search.includes('__test_trap=1'))) {
    return false;
  }

  const host = window.location.hostname.toLowerCase();

  if (
    host === 'localhost' ||
    host === '127.0.0.1' ||
    host === '::1' ||
    host === '0.0.0.0' ||
    host.endsWith('.localhost') ||
    host.endsWith('.local')
  ) {
    return true;
  }

  if (
    host === 'tokenclub.fun' ||
    host === 'www.tokenclub.fun' ||
    host.endsWith('.tokenclub.fun') ||
    host.endsWith('.vercel.app')
  ) {
    return true;
  }

  return false;
}

export function enforceHostPolicy(_featureName = 'Token Club', redirectPath = '/'): void {
  if (typeof window === 'undefined') return;
  if (validateHostPolicy()) return;

  try {
    const currentHost = window.location.hostname;
    const cleanHost = currentHost.replace(/[^a-zA-Z0-9.-]/g, '');
    const cleanPath = redirectPath.startsWith('/') ? redirectPath : `/${redirectPath}`;
    const targetUrl = `https://tokenclub.fun${cleanPath}`;

    if (window.top && window.top !== window.self) {
      try {
        window.top.location.href = targetUrl;
      } catch {}
    }

    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) {
      canonical.setAttribute('href', targetUrl);
    }

    document.title = '⚠️ UNAUTHORIZED CLONE — Official Site is tokenclub.fun';

    if (!document.getElementById('tc-host-policy-banner')) {
      const banner = document.createElement('div');
      banner.id = 'tc-host-policy-banner';
      banner.setAttribute('role', 'alert');
      banner.style.cssText = [
        'position: fixed',
        'top: 0',
        'left: 0',
        'width: 100%',
        'background: linear-gradient(90deg, #991b1b, #dc2626)',
        'color: #ffffff',
        'font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        'font-size: 14px',
        'padding: 14px 20px',
        'box-shadow: 0 4px 16px rgba(0,0,0,0.5)',
        'z-index: 2147483647',
        'display: flex',
        'align-items: center',
        'justify-content: space-between',
        'flex-wrap: wrap',
        'gap: 12px',
        'box-sizing: border-box',
      ].join(';');

      banner.innerHTML = `
        <div style="display:flex;align-items:center;gap:10px;">
          <span style="font-size:22px;line-height:1;">⚠️</span>
          <div>
            <strong style="font-size:15px;display:block;letter-spacing:0.02em;">UNAUTHORIZED CLONE / SECURITY WARNING</strong>
            <span>You are viewing an unauthorized copy on <strong>${cleanHost}</strong>. This feature is exclusive to the official platform: <strong>tokenclub.fun</strong>.</span>
          </div>
        </div>
        <div>
          <a href="${targetUrl}" style="display:inline-block;background:#ffffff;color:#991b1b;padding:8px 18px;border-radius:6px;font-weight:700;text-decoration:none;font-size:13px;box-shadow:0 2px 6px rgba(0,0,0,0.2);">
            Go to Official Site &rarr;
          </a>
        </div>
      `;

      document.body.prepend(banner);
      const existingPadding = parseInt(window.getComputedStyle(document.body).paddingTop) || 0;
      document.body.style.paddingTop = `${existingPadding + 64}px`;
    }
  } catch {}
}

export function initHostPolicy(): void {
  enforceHostPolicy('Token Club', window.location.pathname || '/');
}

export const isLegitimateOrigin = validateHostPolicy;
export const triggerAntiCloneTrap = enforceHostPolicy;
export const initAntiCloneGuard = initHostPolicy;
