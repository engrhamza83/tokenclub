/**
 * Resolves authenticated Solana JSON-RPC upstream URLs for /api/rpc (server-only).
 * Supports Helius and Alchemy; keys are never sent to the client.
 */

export type RpcProvider = 'helius' | 'alchemy';

function extractApiKey(value: string | undefined): string | null {
  if (!value) return null;
  const urlMatch = value.match(/[?&]api-key=([^&]+)/);
  if (urlMatch) return urlMatch[1];
  const urlPattern = /https?:\/\/[^/]+\/.*api-key[=:]([^&\s]+)/;
  const match = value.match(urlPattern);
  if (match) return match[1];
  const alchemyV2 = value.match(/\/v2\/([^/?\s]+)/);
  if (alchemyV2) return alchemyV2[1];
  return value.trim();
}

function pickProvider(): RpcProvider | null {
  const raw = (process.env.RPC_PROVIDER || '').toLowerCase().trim();
  if (raw === 'helius' || raw === 'alchemy') return raw;

  const hasHelius =
    extractApiKey(process.env.HELIUS_API_KEY_MAINNET) ||
    extractApiKey(process.env.HELIUS_API_KEY_DEVNET) ||
    extractApiKey(process.env.HELIUS_API_KEY);
  const hasAlchemy =
    extractApiKey(process.env.ALCHEMY_API_KEY_MAINNET) ||
    extractApiKey(process.env.ALCHEMY_API_KEY_DEVNET) ||
    extractApiKey(process.env.ALCHEMY_API_KEY);

  if (raw === 'auto' || !raw) {
    if (hasHelius) return 'helius';
    if (hasAlchemy) return 'alchemy';
    return null;
  }

  return null;
}

function heliusUrl(cluster: string): string | null {
  const mainKey =
    extractApiKey(process.env.HELIUS_API_KEY_MAINNET) ||
    extractApiKey(process.env.HELIUS_API_KEY);
  const devKey =
    extractApiKey(process.env.HELIUS_API_KEY_DEVNET) || extractApiKey(process.env.HELIUS_API_KEY);

  if (cluster === 'devnet') {
    const k = devKey || mainKey;
    if (k) return `https://devnet.helius-rpc.com/?api-key=${k}`;
    return null;
  }

  if (mainKey) return `https://mainnet.helius-rpc.com/?api-key=${mainKey}`;
  return null;
}

function alchemyUrl(cluster: string): string | null {
  const mainKey =
    extractApiKey(process.env.ALCHEMY_API_KEY_MAINNET) ||
    extractApiKey(process.env.ALCHEMY_API_KEY);
  const devKey =
    extractApiKey(process.env.ALCHEMY_API_KEY_DEVNET) || extractApiKey(process.env.ALCHEMY_API_KEY);

  if (cluster === 'devnet') {
    const k = devKey || mainKey;
    if (k) return `https://solana-devnet.g.alchemy.com/v2/${k}`;
    return null;
  }

  if (mainKey) return `https://solana-mainnet.g.alchemy.com/v2/${mainKey}`;
  return null;
}

/**
 * Returns upstream URL or null if no provider keys configured (caller may use public RPC).
 */
export function getRpcUpstreamUrl(cluster: string): string | null {
  const isDevnet = cluster === 'devnet';
  const c = isDevnet ? 'devnet' : 'mainnet-beta';

  const provider = pickProvider();
  if (provider === 'alchemy') {
    return alchemyUrl(c);
  }
  if (provider === 'helius') {
    return heliusUrl(c);
  }

  return heliusUrl(c) || alchemyUrl(c);
}

export function getPublicRpcFallback(cluster: string): string {
  return cluster === 'devnet'
    ? process.env.NEXT_PUBLIC_RPC_URL_DEVNET || 'https://api.devnet.solana.com'
    : process.env.NEXT_PUBLIC_RPC_URL_MAINNET || 'https://api.mainnet-beta.solana.com';
}
