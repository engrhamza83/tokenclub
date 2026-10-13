export interface DexPairSummary {
  mint: string;
  name?: string;
  symbol?: string;
  imageUrl?: string;
  buys1h?: number;
  buys24h?: number;
  marketCap?: number;
  website?: string;
  twitter?: string;
  telegram?: string;
}

interface DexPair {
  baseToken?: { address?: string; name?: string; symbol?: string };
  info?: {
    imageUrl?: string;
    websites?: Array<{ url?: string }>;
    socials?: Array<{ type?: string; url?: string }>;
  };
  txns?: {
    h1?: { buys?: number };
    h24?: { buys?: number };
  };
  marketCap?: number;
  fdv?: number;
  liquidity?: { usd?: number };
}

function pickBestPair(pairs: DexPair[], mint: string): DexPair | undefined {
  const matching = pairs.filter((p) => p.baseToken?.address === mint);
  const list = matching.length > 0 ? matching : pairs;
  return list.sort(
    (a, b) => (b.liquidity?.usd ?? 0) - (a.liquidity?.usd ?? 0)
  )[0];
}

function socialUrl(pair: DexPair, type: string): string | undefined {
  const match = pair.info?.socials?.find((s) => s.type?.toLowerCase() === type);
  return match?.url?.trim() || undefined;
}

export async function fetchDexPairsForMints(
  mints: string[]
): Promise<Map<string, DexPairSummary>> {
  const map = new Map<string, DexPairSummary>();
  const unique = [...new Set(mints.filter(Boolean))];

  for (let i = 0; i < unique.length; i += 30) {
    const chunk = unique.slice(i, i + 30);
    try {
      const res = await fetch(
        `https://api.dexscreener.com/latest/dex/tokens/${chunk.join(',')}`,
        { headers: { Accept: 'application/json', 'User-Agent': 'Mozilla/5.0 TokenClub' } }
      );
      if (!res.ok) continue;

      const data = (await res.json()) as { pairs?: DexPair[] };
      const byMint = new Map<string, DexPair[]>();

      for (const pair of data.pairs ?? []) {
        const mint = pair.baseToken?.address;
        if (!mint) continue;
        const list = byMint.get(mint) ?? [];
        list.push(pair);
        byMint.set(mint, list);
      }

      for (const mint of chunk) {
        const best = pickBestPair(byMint.get(mint) ?? [], mint);
        if (!best) continue;
        map.set(mint, {
          mint,
          name: best.baseToken?.name,
          symbol: best.baseToken?.symbol,
          imageUrl: best.info?.imageUrl,
          buys1h: best.txns?.h1?.buys,
          buys24h: best.txns?.h24?.buys,
          marketCap: best.marketCap || best.fdv,
          website: best.info?.websites?.[0]?.url,
          twitter: socialUrl(best, 'twitter'),
          telegram: socialUrl(best, 'telegram'),
        });
      }
    } catch {
      // skip chunk
    }
  }

  return map;
}
