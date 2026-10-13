import { pumpFunLogo } from './token-images';
import { fetchDexPairsForMints, type DexPairSummary } from './dexscreener';
import { getCoinPage, PAGE_SIZE, type StaticTrendingCoin } from './trending-coins';

export type TrendingDataSource = 'live' | 'static';

export interface TrendingPageResult {
  tokens: StaticTrendingCoin[];
  total: number;
  offset: number;
  pageSize: number;
  page: number;
  pageCount: number;
  source: TrendingDataSource;
}

const CACHE_TTL_MS = 90_000;
const PUMP_PAGE_SIZE = 50;
const WSOL = 'So11111111111111111111111111111111111111112';

type CacheEntry = { tokens: StaticTrendingCoin[]; fetchedAt: number };
const listCache = new Map<string, CacheEntry>();

interface PumpFunCoin {
  mint?: string;
  name?: string | null;
  symbol?: string | null;
  description?: string | null;
  image_uri?: string | null;
  usd_market_cap?: number | null;
  market_cap?: number | null;
  nsfw?: boolean;
  is_banned?: boolean;
  last_trade_timestamp?: number | null;
  created_timestamp?: number | null;
  reply_count?: number | null;
}

interface GeckoPool {
  attributes?: {
    name?: string;
    market_cap_usd?: string | null;
    fdv_usd?: string | null;
    transactions?: {
      h1?: { buys?: number };
      h24?: { buys?: number; buyers?: number };
    };
  };
  relationships?: {
    base_token?: { data?: { id?: string } };
    quote_token?: { data?: { id?: string } };
  };
}

interface GeckoToken {
  id?: string;
  type?: string;
  attributes?: {
    address?: string;
    name?: string | null;
    symbol?: string | null;
    image_url?: string | null;
  };
}

function formatUsd(value: number | string | null | undefined): string {
  const n = typeof value === 'string' ? parseFloat(value) : value ?? 0;
  if (!Number.isFinite(n) || n <= 0) return 'N/A';
  if (n >= 1_000_000_000) return `$${(n / 1_000_000_000).toFixed(2)}B`;
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(2)}M`;
  if (n >= 1_000) return `$${(n / 1_000).toFixed(1)}K`;
  return `$${n.toFixed(2)}`;
}

function formatCount(value: number | string | null | undefined): string {
  const n = typeof value === 'string' ? parseInt(value, 10) : value ?? 0;
  if (!Number.isFinite(n) || n <= 0) return 'N/A';
  return n.toLocaleString('en-US');
}

function formatBuyCount(value: number | string | null | undefined, windowLabel: string): string {
  const n = typeof value === 'string' ? parseFloat(value) : value ?? 0;
  if (!Number.isFinite(n) || n <= 0) return 'Active';
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M buys/${windowLabel}`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K buys/${windowLabel}`;
  return `${Math.round(n)} buys/${windowLabel}`;
}

function mintFromGeckoId(id?: string): string | null {
  if (!id) return null;
  const mint = id.replace(/^solana_/, '').trim();
  return mint || null;
}

function firstImage(...candidates: (string | null | undefined)[]): string | undefined {
  return candidates.map((u) => u?.trim()).find(Boolean);
}

function paginate(tokens: StaticTrendingCoin[], offset: number, source: TrendingDataSource): TrendingPageResult {
  const pageSize = PAGE_SIZE;
  const total = tokens.length;
  const pageCount = Math.max(1, Math.ceil(total / pageSize));
  const safeOffset = Math.max(0, Math.min(offset, Math.max(0, total - pageSize)));
  const page = Math.floor(safeOffset / pageSize);
  return {
    tokens: tokens.slice(safeOffset, safeOffset + pageSize),
    total,
    offset: safeOffset,
    pageSize,
    page,
    pageCount,
    source,
  };
}

function applyDexEnrichment(
  token: StaticTrendingCoin,
  dex?: DexPairSummary
): StaticTrendingCoin {
  if (!dex) return token;
  return {
    ...token,
    imageUri: firstImage(token.imageUri, dex.imageUrl, pumpFunLogo(token.mint)),
    marketCap: token.marketCap !== 'N/A' ? token.marketCap : formatUsd(dex.marketCap),
    lastBuy:
      token.lastBuy !== 'Active'
        ? token.lastBuy
        : dex.buys1h != null
          ? formatBuyCount(dex.buys1h, '1h')
          : formatBuyCount(dex.buys24h, '24h'),
    website: token.website || dex.website,
    twitter: token.twitter || dex.twitter,
    telegram: token.telegram || dex.telegram,
  };
}

const JSON_HEADERS = {
  Accept: 'application/json',
  'User-Agent': 'Mozilla/5.0 TokenClub',
};

interface DexBoostRow {
  chainId?: string;
  tokenAddress?: string;
  icon?: string;
  description?: string;
  links?: Array<{ type?: string; url?: string }>;
}

interface JupiterToken {
  id?: string;
  name?: string | null;
  symbol?: string | null;
  icon?: string | null;
  twitter?: string | null;
  website?: string | null;
  telegram?: string | null;
  holderCount?: number | null;
  mcap?: number | null;
  fdv?: number | null;
  stats1h?: { numBuys?: number };
  stats24h?: { numBuys?: number };
}

async function fetchPumpFunCoins(tab: string): Promise<StaticTrendingCoin[]> {
  const sort = tab === 'new' ? 'created_timestamp' : 'last_trade_timestamp';
  const url =
    `https://frontend-api-v3.pump.fun/coins?offset=0&limit=${PUMP_PAGE_SIZE}` +
    `&sort=${sort}&order=DESC&includeNsfw=false`;
  const res = await fetch(url, { headers: JSON_HEADERS });
  if (!res.ok) {
    throw new Error(`pump.fun trending failed (${res.status})`);
  }
  const batch = (await res.json()) as PumpFunCoin[];
  if (!Array.isArray(batch) || batch.length === 0) {
    throw new Error('pump.fun returned no coins');
  }

  const coins = batch.filter((c) => Boolean(c.mint) && !c.nsfw && !c.is_banned);
  if (coins.length === 0) {
    throw new Error('pump.fun returned no usable coins');
  }
  return coins.map((coin) => {
    const mint = coin.mint as string;
    const name = (coin.name || 'Unknown').trim();
    const symbol = (coin.symbol || 'TOKEN').replace(/^\$/, '').trim().toUpperCase().slice(0, 10);
    return {
      name,
      symbol,
      ticker: `$${symbol}`,
      mint,
      holders: 'N/A',
      marketCap: formatUsd(coin.usd_market_cap ?? coin.market_cap),
      lastBuy: 'Active',
      imageUri: firstImage(coin.image_uri, pumpFunLogo(mint)),
      description: (coin.description || `${name} on pump.fun`).slice(0, 500),
    };
  });
}

async function fetchDexBoostedCoins(tab: string): Promise<StaticTrendingCoin[]> {
  const endpoint =
    tab === 'new'
      ? 'https://api.dexscreener.com/token-boosts/latest/v1'
      : 'https://api.dexscreener.com/token-boosts/top/v1';
  const res = await fetch(endpoint, { headers: JSON_HEADERS });
  if (!res.ok) {
    throw new Error(`DexScreener boosts failed (${res.status})`);
  }
  const rows = (await res.json()) as DexBoostRow[];
  if (!Array.isArray(rows) || rows.length === 0) {
    throw new Error('DexScreener returned no boosted tokens');
  }

  const solana = rows.filter(
    (row) => row.chainId === 'solana' && Boolean(row.tokenAddress)
  );
  const uniqueMints = [...new Set(solana.map((row) => row.tokenAddress as string))].slice(
    0,
    PUMP_PAGE_SIZE
  );
  if (uniqueMints.length === 0) {
    throw new Error('DexScreener returned no Solana tokens');
  }

  const mintSet = new Set(uniqueMints);
  const dexByMint = await fetchDexPairsForMints(uniqueMints);
  const tokens: StaticTrendingCoin[] = [];
  for (const row of solana) {
    const mint = row.tokenAddress as string;
    if (!mintSet.has(mint) || tokens.some((t) => t.mint === mint)) continue;
    const dex = dexByMint.get(mint);
    const name = (dex?.name || '').trim();
    if (!name) continue;
    const symbol = (dex?.symbol || name).replace(/^\$/, '').trim().toUpperCase().slice(0, 10);
    const twitter = row.links?.find((l) => l.type === 'twitter')?.url;
    const telegram = row.links?.find((l) => l.type === 'telegram')?.url;
    const website = row.links?.find((l) => !l.type && l.url)?.url;
    tokens.push({
      name,
      symbol,
      ticker: `$${symbol}`,
      mint,
      holders: 'N/A',
      marketCap: formatUsd(dex?.marketCap),
      lastBuy: dex?.buys1h != null ? formatBuyCount(dex.buys1h, '1h') : formatBuyCount(dex?.buys24h, '24h'),
      imageUri: firstImage(row.icon, dex?.imageUrl, pumpFunLogo(mint)),
      description: (row.description || `${name} trending on Solana`).slice(0, 500),
      website: website || dex?.website,
      twitter: twitter || dex?.twitter,
      telegram: telegram || dex?.telegram,
    });
  }

  if (tokens.length === 0) {
    throw new Error('DexScreener boosts had no usable Solana tokens');
  }
  return tokens;
}

async function fetchJupiterCoins(tab: string): Promise<StaticTrendingCoin[]> {
  const endpoint =
    tab === 'new'
      ? 'https://lite-api.jup.ag/tokens/v2/recent?limit=50'
      : 'https://lite-api.jup.ag/tokens/v2/toptrending/24h?limit=50';
  const res = await fetch(endpoint, { headers: JSON_HEADERS });
  if (!res.ok) {
    throw new Error(`Jupiter trending failed (${res.status})`);
  }
  const rows = (await res.json()) as JupiterToken[];
  if (!Array.isArray(rows) || rows.length === 0) {
    throw new Error('Jupiter returned no tokens');
  }

  const tokens: StaticTrendingCoin[] = [];
  const seen = new Set<string>();
  for (const row of rows) {
    const mint = row.id?.trim();
    if (!mint || mint === WSOL || seen.has(mint)) continue;
    const name = (row.name || '').trim();
    const symbol = (row.symbol || name || 'TOKEN').replace(/^\$/, '').trim().toUpperCase().slice(0, 10);
    if (!name || !symbol) continue;
    seen.add(mint);
    tokens.push({
      name,
      symbol,
      ticker: `$${symbol}`,
      mint,
      holders: formatCount(row.holderCount),
      marketCap: formatUsd(row.mcap ?? row.fdv),
      lastBuy:
        row.stats1h?.numBuys != null
          ? formatBuyCount(row.stats1h.numBuys, '1h')
          : formatBuyCount(row.stats24h?.numBuys, '24h'),
      imageUri: firstImage(row.icon, pumpFunLogo(mint)),
      description: `${name} trending on Solana`,
      website: row.website?.trim() || undefined,
      twitter: row.twitter?.trim() || undefined,
      telegram: row.telegram?.trim() || undefined,
    });
  }

  if (tokens.length === 0) {
    throw new Error('Jupiter returned no usable Solana tokens');
  }
  return tokens;
}

async function fetchGeckoCoins(tab: string): Promise<StaticTrendingCoin[]> {
  const path = tab === 'new' ? 'new_pools' : 'trending_pools';
  const url =
    `https://api.geckoterminal.com/api/v2/networks/solana/${path}` +
    `?page=1&include=base_token`;
  const res = await fetch(url, { headers: JSON_HEADERS });
  if (!res.ok) {
    throw new Error(`GeckoTerminal trending failed (${res.status})`);
  }
  const data = (await res.json()) as {
    data?: GeckoPool[];
    included?: GeckoToken[];
  };
  const included = new Map(
    (data.included ?? [])
      .filter((row) => row.type === 'token' && row.id)
      .map((row) => [row.id as string, row])
  );

  const tokens: StaticTrendingCoin[] = [];
  const seen = new Set<string>();
  for (const pool of data.data ?? []) {
    const baseId = pool.relationships?.base_token?.data?.id;
    const quoteId = pool.relationships?.quote_token?.data?.id;
    const mint = mintFromGeckoId(baseId);
    const quote = mintFromGeckoId(quoteId);
    if (!mint || seen.has(mint) || mint === WSOL) continue;
    if (quote && quote !== WSOL) continue;

    const meta = included.get(baseId || '');
    const poolName = (pool.attributes?.name || '').split('/')[0]?.trim();
    const name = (meta?.attributes?.name || poolName || 'Unknown').trim();
    const symbol = (meta?.attributes?.symbol || name).trim().toUpperCase().slice(0, 10);
    const buys = pool.attributes?.transactions?.h1?.buys ?? pool.attributes?.transactions?.h24?.buys;
    const buyers = pool.attributes?.transactions?.h24?.buyers;

    seen.add(mint);
    tokens.push({
      name,
      symbol,
      ticker: `$${symbol}`,
      mint,
      holders: formatCount(buyers),
      marketCap: formatUsd(pool.attributes?.market_cap_usd ?? pool.attributes?.fdv_usd),
      lastBuy: formatBuyCount(buys, pool.attributes?.transactions?.h1?.buys != null ? '1h' : '24h'),
      imageUri: firstImage(meta?.attributes?.image_url, pumpFunLogo(mint)),
      description: `${name} trending on Solana`,
    });
  }

  if (tokens.length === 0) {
    throw new Error('GeckoTerminal returned no Solana tokens');
  }
  return tokens;
}

async function loadLiveTokens(tab: string): Promise<StaticTrendingCoin[]> {
  const cacheKey = tab === 'new' ? 'new' : 'trending';
  const cached = listCache.get(cacheKey);
  if (cached && Date.now() - cached.fetchedAt < CACHE_TTL_MS) {
    return cached.tokens;
  }

  const loaders = [fetchPumpFunCoins, fetchJupiterCoins, fetchDexBoostedCoins, fetchGeckoCoins];
  let lastError: unknown;
  for (const loader of loaders) {
    try {
      const tokens = await loader(cacheKey);
      if (tokens.length > 0) {
        listCache.set(cacheKey, { tokens, fetchedAt: Date.now() });
        return tokens;
      }
    } catch (err) {
      lastError = err;
      console.warn(`[trending] ${loader.name} failed:`, err);
    }
  }

  throw lastError instanceof Error ? lastError : new Error('All live trending sources failed');
}

export function getStaticTrendingPage(tab: string, offset: number): TrendingPageResult {
  const data = getCoinPage(tab, offset);
  return { ...data, source: 'static' };
}

export async function getTrendingPage(
  tab: string,
  offset: number
): Promise<TrendingPageResult> {
  try {
    const all = await loadLiveTokens(tab);
    const page = paginate(all, offset, 'live');
    const mints = page.tokens.map((t) => t.mint);
    const dexByMint = await fetchDexPairsForMints(mints);
    return {
      ...page,
      tokens: page.tokens.map((token) => applyDexEnrichment(token, dexByMint.get(token.mint))),
    };
  } catch (err) {
    console.warn('[trending] live APIs unavailable, using static list:', err);
    return getStaticTrendingPage(tab, offset);
  }
}
