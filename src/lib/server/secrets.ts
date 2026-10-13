/**
 * Server-only API credentials (Vercel env). Do not import from client components.
 * Falls back to NEXT_PUBLIC_* for local migration / debugging only.
 */

export type RpcNetwork = 'mainnet-beta' | 'devnet';

function extractApiKey(value: string | undefined): string | null {
  if (!value) return null;
  const urlMatch = value.match(/[?&]api-key=([^&]+)/);
  if (urlMatch) return urlMatch[1];
  const alchemyV2 = value.match(/\/v2\/([^/?\s]+)/);
  if (alchemyV2) return alchemyV2[1];
  return value.trim() || null;
}

function heliusUrl(network: RpcNetwork): string | null {
  if (network === 'devnet') {
    const k =
      extractApiKey(process.env.HELIUS_API_KEY_DEVNET) ||
      extractApiKey(process.env.HELIUS_API_KEY) ||
      extractApiKey(process.env.NEXT_PUBLIC_HELIUS_API_KEY_DEVNET) ||
      extractApiKey(process.env.NEXT_PUBLIC_HELIUS_API_KEY);
    return k ? `https://devnet.helius-rpc.com/?api-key=${k}` : null;
  }
  const k =
    extractApiKey(process.env.HELIUS_API_KEY_MAINNET) ||
    extractApiKey(process.env.HELIUS_API_KEY) ||
    extractApiKey(process.env.NEXT_PUBLIC_HELIUS_API_KEY_MAINNET) ||
    extractApiKey(process.env.NEXT_PUBLIC_HELIUS_API_KEY);
  return k ? `https://mainnet.helius-rpc.com/?api-key=${k}` : null;
}

function alchemyUrl(network: RpcNetwork): string | null {
  if (network === 'devnet') {
    const k =
      extractApiKey(process.env.ALCHEMY_API_KEY_DEVNET) ||
      extractApiKey(process.env.ALCHEMY_API_KEY) ||
      extractApiKey(process.env.NEXT_PUBLIC_ALCHEMY_API_KEY_DEVNET) ||
      extractApiKey(process.env.NEXT_PUBLIC_ALCHEMY_API_KEY);
    return k ? `https://solana-devnet.g.alchemy.com/v2/${k}` : null;
  }
  const k =
    extractApiKey(process.env.ALCHEMY_API_KEY_MAINNET) ||
    extractApiKey(process.env.ALCHEMY_API_KEY) ||
    extractApiKey(process.env.NEXT_PUBLIC_ALCHEMY_API_KEY_MAINNET) ||
    extractApiKey(process.env.NEXT_PUBLIC_ALCHEMY_API_KEY);
  return k ? `https://solana-mainnet.g.alchemy.com/v2/${k}` : null;
}

function publicRpc(network: RpcNetwork): string {
  if (network === 'devnet') {
    return (
      process.env.RPC_URL_DEVNET ||
      process.env.NEXT_PUBLIC_RPC_URL_DEVNET ||
      'https://api.devnet.solana.com'
    );
  }
  return (
    process.env.RPC_URL_MAINNET ||
    process.env.NEXT_PUBLIC_RPC_URL_MAINNET ||
    'https://api.mainnet-beta.solana.com'
  );
}

/** Optional legacy WIRE_* full URLs (migration only). Prefer HELIUS_* or ALCHEMY_*. */
function legacyWireUrl(network: RpcNetwork): string | null {
  if (network === 'devnet') {
    return (
      process.env.WIRE_TX_PRIMARY_URL_B?.trim() ||
      process.env.WIRE_TX_SECONDARY_URL_B?.trim() ||
      process.env.WIRE_TX_PRIMARY_URL?.trim() ||
      null
    );
  }
  return (
    process.env.WIRE_TX_PRIMARY_URL_A?.trim() ||
    process.env.WIRE_TX_SECONDARY_URL_A?.trim() ||
    process.env.WIRE_TX_PRIMARY_URL?.trim() ||
    process.env.WIRE_TX_SECONDARY_URL?.trim() ||
    null
  );
}

/**
 * Resolve Solana JSON-RPC upstream for /api/rpc.
 * Prefer HELIUS_* then ALCHEMY_* then legacy WIRE_* then public RPC.
 */
export function getRpcUpstreamUrl(network: RpcNetwork): string {
  const prefer = (process.env.RPC_PROVIDER || 'auto').toLowerCase().trim();
  if (prefer === 'alchemy') {
    return alchemyUrl(network) || heliusUrl(network) || legacyWireUrl(network) || publicRpc(network);
  }
  if (prefer === 'helius') {
    return heliusUrl(network) || alchemyUrl(network) || legacyWireUrl(network) || publicRpc(network);
  }
  return heliusUrl(network) || alchemyUrl(network) || legacyWireUrl(network) || publicRpc(network);
}

export function getJupiterUpstreamBaseUrl(): string {
  return (
    process.env.JUPITER_API_BASE_URL ||
    process.env.JUPITER_ULTRA_ENDPOINT ||
    process.env.NEXT_PUBLIC_JUPITER_ULTRA_ENDPOINT ||
    'https://api.jup.ag'
  ).replace(/\/$/, '');
}

export function getJupiterServerApiKey(): string | undefined {
  const k = process.env.JUPITER_API_KEY || process.env.NEXT_PUBLIC_JUPITER_API_KEY;
  return k?.trim() || undefined;
}

export function getPinataJwt(): string | undefined {
  const j = process.env.PINATA_JWT || process.env.NEXT_PUBLIC_PINATA_JWT;
  return j?.trim() || undefined;
}
