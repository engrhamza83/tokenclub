import type { ConnectionConfig } from '@solana/web3.js';
import { getPublicSiteUrl } from './public-url';

// Network and API configuration

export type Network = 'mainnet-beta' | 'devnet';

export const NETWORK_STORAGE_KEY = 'tokenclub_network';

/** When true (default), Solana RPC goes through same-origin /api/rpc with server-side keys. */
export const isWireProxyEnabled = (): boolean =>
  (process.env.NEXT_PUBLIC_USE_RPC_PROXY ?? process.env.NEXT_PUBLIC_USE_WIRE_PROXY) !== 'false';

/** When true (default), Jupiter calls go through /api/jupiter with server-side JUPITER_API_KEY. */
export const isJupiterProxyEnabled = (): boolean =>
  process.env.NEXT_PUBLIC_USE_JUPITER_PROXY !== 'false';

// Helper to extract API key from potentially malformed env var (handles full URLs)
const extractApiKey = (value: string | undefined): string | null => {
  if (!value) return null;

  // If it's already a full URL, extract the API key from it
  const urlMatch = value.match(/[?&]api-key=([^&]+)/);
  if (urlMatch) {
    return urlMatch[1];
  }

  // If it contains a URL, try to extract from the path
  const urlPattern = /https?:\/\/[^\/]+\/.*api-key[=:]([^&\s]+)/;
  const match = value.match(urlPattern);
  if (match) {
    return match[1];
  }

  // Otherwise, assume it's just the API key
  return value.trim();
};

export const getWireUrl = (network: Network): string => {
  if (isWireProxyEnabled()) {
    const origin = getPublicSiteUrl();
    const net = network === 'devnet' ? 'devnet' : 'mainnet-beta';
    return `${origin}/api/rpc?network=${encodeURIComponent(net)}`;
  }

  if (network === 'devnet') {
    const heliusDevnetKey = extractApiKey(process.env.NEXT_PUBLIC_HELIUS_API_KEY_DEVNET || '');
    if (heliusDevnetKey) {
      return `https://devnet.helius-rpc.com/?api-key=${heliusDevnetKey}`;
    }
    const heliusKey = extractApiKey(process.env.NEXT_PUBLIC_HELIUS_API_KEY || '');
    if (heliusKey) {
      return `https://devnet.helius-rpc.com/?api-key=${heliusKey}`;
    }
    return process.env.NEXT_PUBLIC_RPC_URL_DEVNET || 'https://api.devnet.solana.com';
  }
  const heliusMainnetKey = extractApiKey(process.env.NEXT_PUBLIC_HELIUS_API_KEY_MAINNET || '');
  if (heliusMainnetKey) {
    return `https://mainnet.helius-rpc.com/?api-key=${heliusMainnetKey}`;
  }
  const heliusKey = extractApiKey(process.env.NEXT_PUBLIC_HELIUS_API_KEY || '');
  if (heliusKey) {
    return `https://mainnet.helius-rpc.com/?api-key=${heliusKey}`;
  }
  return process.env.NEXT_PUBLIC_RPC_URL_MAINNET || 'https://api.mainnet-beta.solana.com';
};

/**
 * Usage-specific RPC URL (same upstream on Vercel; kept for call-site compatibility).
 */
export const getWireUrlForUsage = (
  network: Network,
  _usage: 'default' | 'portfolio' | 'security'
): string => getWireUrl(network);

/**
 * WebSocket URL for subscriptions (confirmTransaction, accountSubscribe).
 * Same-origin /api/rpc is HTTP POST only — do not derive wss from it.
 * When HTTP uses the RPC proxy, still use Helius WSS if NEXT_PUBLIC_HELIUS_* is set;
 * public mainnet WSS is strict and often fails or reconnects in the browser.
 */
export const getWireWsUrl = (network: Network): string => {
  const explicit =
    network === 'devnet'
      ? process.env.NEXT_PUBLIC_RPC_WS_DEVNET?.trim()
      : process.env.NEXT_PUBLIC_RPC_WS_MAINNET?.trim();
  if (explicit) return explicit;

  if (network === 'devnet') {
    const key =
      extractApiKey(process.env.NEXT_PUBLIC_HELIUS_API_KEY_DEVNET || '') ||
      extractApiKey(process.env.NEXT_PUBLIC_HELIUS_API_KEY || '');
    if (key) return `wss://devnet.helius-rpc.com/?api-key=${key}`;
    return 'wss://api.devnet.solana.com';
  }

  const key =
    extractApiKey(process.env.NEXT_PUBLIC_HELIUS_API_KEY_MAINNET || '') ||
    extractApiKey(process.env.NEXT_PUBLIC_HELIUS_API_KEY || '');
  if (key) return `wss://mainnet.helius-rpc.com/?api-key=${key}`;

  return 'wss://api.mainnet-beta.solana.com';
};

/** Options for @solana/web3.js Connection (HTTP RPC + real WSS). */
export const getSolanaConnectionConfig = (network: Network): ConnectionConfig => ({
  commitment: 'confirmed',
  wsEndpoint: getWireWsUrl(network),
});

// Backward-compatible aliases during migration from RPC -> WIRE naming.
export const isRpcProxyEnabled = isWireProxyEnabled;
export const getRpcUrl = getWireUrl;
export const getRpcUrlForUsage = getWireUrlForUsage;
export const getRpcWsUrl = getWireWsUrl;

/** Default network for AppKit SolanaAdapter (static WS; app Connection uses NetworkContext). */
export const getAdapterDefaultNetwork = (): Network =>
  process.env.NEXT_PUBLIC_SOLANA_NETWORK === 'devnet' ? 'devnet' : 'mainnet-beta';

export const getJupiterApiUrl = (): string => {
  if (isJupiterProxyEnabled()) {
    return `${getPublicSiteUrl()}/api/jupiter`;
  }
  return process.env.NEXT_PUBLIC_JUPITER_ULTRA_ENDPOINT || 'https://api.jup.ag';
};

/** Client-side Jupiter auth: omitted when using /api/jupiter proxy (key is server-only). */
export const getJupiterApiKey = (): string | undefined => {
  if (isJupiterProxyEnabled()) {
    return undefined;
  }
  return process.env.NEXT_PUBLIC_JUPITER_API_KEY;
};

export const getDefaultNetwork = (): Network => {
  if (typeof window === 'undefined') {
    return (process.env.NEXT_PUBLIC_SOLANA_NETWORK as Network) || 'mainnet-beta';
  }
  const stored = localStorage.getItem(NETWORK_STORAGE_KEY);
  if (stored === 'devnet' || stored === 'mainnet-beta') {
    return stored;
  }
  return (process.env.NEXT_PUBLIC_SOLANA_NETWORK as Network) || 'mainnet-beta';
};

/** Default platform fee recipient when `NEXT_PUBLIC_PLATFORM_FEE_WALLET` is unset */
const DEFAULT_PLATFORM_FEE_WALLET = '6nZ3TZhPcr4wLYFXa5jQeSB1YYKF9tozfuxzYgGPau23';

// Platform fee wallet from environment variable
export const getPlatformFeeWallet = (): string => {
  const envWallet = process.env.NEXT_PUBLIC_PLATFORM_FEE_WALLET?.trim();
  if (envWallet) {
    return envWallet;
  }
  return DEFAULT_PLATFORM_FEE_WALLET;
};

// Legacy function for backward compatibility
export const getRandomFeeWallet = (): string => {
  return getPlatformFeeWallet();
};

// Platform fees - actual fees charged
export const PLATFORM_FEES = {
  TOKEN_CREATION_BASE: 0.11, // SOL - Basic token creation
  REVOKE_MINT_AUTHORITY: 0.11, // SOL - Mint authority revocation
  REVOKE_FREEZE_AUTHORITY: 0.105, // SOL - Freeze authority revocation
  ADVANCED_FEATURES: 0.06, // SOL - Advanced features (creator website, name)
  LIQUIDITY_POOL_CREATION: 0.17, // SOL - Initialize pool
  LIQUIDITY_ADD: 0.05, // SOL - Add liquidity
  LIQUIDITY_REMOVE: 0.11, // SOL - Remove liquidity
  LOCK_LIQUIDITY: 0.11, // SOL - Lock liquidity
  CLAIM_FEES: 0.05, // SOL - Claim earned fees
  LIQUIDITY_BURN: 0.11, // SOL - Burn liquidity
  CLOSE_ACCOUNTS: 0.001, // SOL - Wallet cleanup (scan wallet fee)
  SWAP_PERCENTAGE: 0.011, // 1.1% of swap amount
};

// Display fees - what shows in UI (rounded for display)
export const PLATFORM_FEES_DISPLAY = {
  TOKEN_CREATION_BASE: 0.1, // Show 0.1 SOL
  REVOKE_MINT_AUTHORITY: 0.1, // Show 0.1 SOL
  REVOKE_FREEZE_AUTHORITY: 0.1, // Show 0.1 SOL
  ADVANCED_FEATURES: 0.05, // Show 0.05 SOL
  LIQUIDITY_POOL_CREATION: 0.15, // Show 0.15 SOL
  LIQUIDITY_ADD: 0.05, // Show 0.05 SOL
  LIQUIDITY_REMOVE: 0.1, // Show 0.1 SOL
  LOCK_LIQUIDITY: 0.1, // Show 0.1 SOL
  CLAIM_FEES: 0.05, // Show 0.05 SOL
  LIQUIDITY_BURN: 0.1, // Show 0.1 SOL
  CLOSE_ACCOUNTS: 0.001, // Show 0.001 SOL (scan wallet fee)
  SWAP_PERCENTAGE: 1.0, // Show 1% (actual fee is 1.1%)
};

