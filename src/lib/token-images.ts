/** Mainnet mints for curated trending symbols (DexScreener / Jupiter logos). */
export const KNOWN_TOKEN_MINTS: Record<string, string> = {
  TRUMP: '6p6xgHyF7AeE6TZkSmFsko444wqoP15icUSqi2jfGiPN',
  PEPE: '2b1kV6DkPAnxd5ixfnxCpjxmKwqjjaYmCZfHsFu24GXo',
  WIF: 'EKpQGSJtjMFqKZ9KQanSqYXRcF8fBopzLHYxdM65zcjm',
  BONK: 'DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263',
  POPCAT: '7GCihgDB8fe6KNjn2MYtkz73cZnaqhZbUEvqv7LLgRH',
  MOG: 'ED5nyyWEzpPPiWimP8vYm7sD7TD3LAt3Q3gRTWHzPJBY',
  MEW: 'MEW1gQWJ3nEXg2qgERiKu7FAFjxiCoz71wfipg9HCj88',
  GOAT: 'CzLSujWBLFsSjncfkh59rUFqvafWcY5tzedWJSuypump',
  PNUT: '2qEHjDLDLbuBgRYvsxhc5D4BoVgiC3Ly7iskKmrCjqo8',
  FARTCOIN: '9BB6NFEcjBCtnNLFko2FqVQBq8HHJ6gT8eWjJgWJBCJY',
  CHILLGUY: 'DFieywNiLq3Q7j89Ti3mk72kZQxgFuTb81Zpx7JM7KQi',
  AI16Z: 'HeLp6NuQkmYB4pYWo2zYsGFxhk89Xx8X99ka3KAEBjZi',
  PENGU: '2zMMhcVQEXDtdE6vsFS7SrxDtgE3EU9bbV5BDmTgwZCT',
  MELANIA: 'FUAfBo2SjdT7FRy5P8MvrfuAEmccECnmFw6KkfE7N5X3',
  MICHI: '5mbK36SZ7J19n8edfvnePL9a1jTmkoMJzz7wBa1cjkp',
  VINE: '6AJcP7wuLwmRYLBNbi825wgG9sVqZL32p355hxXneD1',
  ZEREBRO: '8x5VqbHA8D7NkD52uPsS6GcDGJxvVCGz8M7pump',
  GRIFFAIN: 'KENJSUYLASHUMfHyy5o4Hp2FdNqZg1AsUPhfH2kYvup',
  ACT: 'GJAFwWjJ3vnTsrQVabjBVK2TYB1YtRCQXRDfDgUnpump',
  SIGMA: '5SVG3T9CNqM2kv1F7iH1KBG3Nd7A4Pw8q8i5dLK7pump',
  RETARDIO: '6ogzHhzdrQr9Pgv6hZ2MNze7UrzCAAoJwUFvX8Cpump',
  BRETT: 'BR6CaZYnN7ZodDyqXY38VzsucrScyRMN3qszbPVApump',
};

const SYMBOL_IMAGE_OVERRIDES: Record<string, string> = {
  TRUMP: 'https://dd.dexscreener.com/ds-data/tokens/solana/6p6xgHyF7AeE6TZkSmFsko444wqoP15icUSqi2jfGiPN.png?size=lg',
  WIF: 'https://dd.dexscreener.com/ds-data/tokens/solana/EKpQGSJtjMFqKZ9KQanSqYXRcF8fBopzLHYxdM65zcjm.png?size=lg',
  BONK: 'https://dd.dexscreener.com/ds-data/tokens/solana/DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263.png?size=lg',
  POPCAT: 'https://dd.dexscreener.com/ds-data/tokens/solana/7GCihgDB8fe6KNjn2MYtkz73cZnaqhZbUEvqv7LLgRH.png?size=lg',
  PEPE: 'https://dd.dexscreener.com/ds-data/tokens/solana/2b1kV6DkPAnxd5ixfnxCpjxmKwqjjaYmCZfHsFu24GXo.png?size=lg',
  PENGU: 'https://dd.dexscreener.com/ds-data/tokens/solana/2zMMhcVQEXDtdE6vsFS7SrxDtgE3EU9bbV5BDmTgwZCT.png?size=lg',
  FARTCOIN: 'https://dd.dexscreener.com/ds-data/tokens/solana/9BB6NFEcjBCtnNLFko2FqVQBq8HHJ6gT8eWjJgWJBCJY.png?size=lg',
  PNUT: 'https://dd.dexscreener.com/ds-data/tokens/solana/2qEHjDLDLbuBgRYvsxhc5D4BoVgiC3Ly7iskKmrCjqo8.png?size=lg',
  GOAT: 'https://dd.dexscreener.com/ds-data/tokens/solana/CzLSujWBLFsSjncfkh59rUFqvafWcY5tzedWJSuypump.png?size=lg',
  MEW: 'https://dd.dexscreener.com/ds-data/tokens/solana/MEW1gQWJ3nEXg2qgERiKu7FAFjxiCoz71wfipg9HCj88.png?size=lg',
  AI16Z: 'https://dd.dexscreener.com/ds-data/tokens/solana/HeLp6NuQkmYB4pYWo2zYsGFxhk89Xx8X99ka3KAEBjZi.png?size=lg',
  MICHI: 'https://dd.dexscreener.com/ds-data/tokens/solana/5mbK36SZ7J19n8edfvnePL9a1jTmkoMJzz7wBa1cjkp.png?size=lg',
  CHILLGUY: 'https://dd.dexscreener.com/ds-data/tokens/solana/DFieywNiLq3Q7j89Ti3mk72kZQxgFuTb81Zpx7JM7KQi.png?size=lg',
  MELANIA: 'https://dd.dexscreener.com/ds-data/tokens/solana/FUAfBo2SjdT7FRy5P8MvrfuAEmccECnmFw6KkfE7N5X3.png?size=lg',
  ACT: 'https://dd.dexscreener.com/ds-data/tokens/solana/GJAFwWjJ3vnTsrQVabjBVK2TYB1YtRCQXRDfDgUnpump.png?size=lg',
  SIGMA: 'https://dd.dexscreener.com/ds-data/tokens/solana/5SVG3T9CNqM2kv1F7iH1KBG3Nd7A4Pw8q8i5dLK7pump.png?size=lg',
  RETARDIO: 'https://dd.dexscreener.com/ds-data/tokens/solana/6ogzHhzdrQr9Pgv6hZ2MNze7UrzCAAoJwUFvX8Cpump.png?size=lg',
  MOG: 'https://dd.dexscreener.com/ds-data/tokens/solana/ED5nyyWEzpPPiWimP8vYm7sD7TD3LAt3Q3gRTWHzPJBY.png?size=lg',
  VINE: 'https://dd.dexscreener.com/ds-data/tokens/solana/6AJcP7wuLwmRYLBNbi825wgG9sVqZL32p355hxXneD1.png?size=lg',
  ZEREBRO: 'https://dd.dexscreener.com/ds-data/tokens/solana/8x5VqbHA8D7NkD52uPsS6GcDGJxvVCGz8M7pump.png?size=lg',
  GRIFFAIN: 'https://dd.dexscreener.com/ds-data/tokens/solana/KENJSUYLASHUMfHyy5o4Hp2FdNqZg1AsUPhfH2kYvup.png?size=lg',
  BRETT: 'https://dd.dexscreener.com/ds-data/tokens/solana/BR6CaZYnN7ZodDyqXY38VzsucrScyRMN3qszbPVApump.png?size=lg',
};

const isPlaceholderMint = (mint: string): boolean =>
  mint.startsWith('Curated') || mint.includes('x'.repeat(10));

export function dexScreenerLogo(mint: string): string {
  return `https://dd.dexscreener.com/ds-data/tokens/solana/${mint}.png?size=lg`;
}

export function pumpFunLogo(mint: string): string {
  return `https://images.pump.fun/coin-image/${mint}?variant=600x600`;
}

export function jupiterLogo(mint: string): string {
  return `https://token.jup.ag/icon/${mint}`;
}

export const MEME_PLACEHOLDER_IMAGES = [
  '/meme-placeholders/bonk.webp',
  '/meme-placeholders/wif.webp',
  '/meme-placeholders/pepe.webp',
  '/meme-placeholders/trump.webp',
  '/meme-placeholders/goat.webp',
  '/meme-placeholders/mog.webp',
  '/meme-placeholders/brett.webp',
] as const;

export function memePlaceholder(seed: string): string {
  const key = seed || 'meme';
  let hash = 0;
  for (let i = 0; i < key.length; i += 1) {
    hash = (hash * 31 + key.charCodeAt(i)) >>> 0;
  }
  return MEME_PLACEHOLDER_IMAGES[hash % MEME_PLACEHOLDER_IMAGES.length];
}

export function generatedLogo(symbol: string): string {
  return memePlaceholder(symbol);
}

export function resolveTokenImageUrl(symbol: string, mint?: string): string {
  const key = symbol.toUpperCase().replace(/^\$/, '');
  if (SYMBOL_IMAGE_OVERRIDES[key]) return SYMBOL_IMAGE_OVERRIDES[key];

  const knownMint = KNOWN_TOKEN_MINTS[key];
  const resolvedMint = mint && !isPlaceholderMint(mint) ? mint : knownMint;

  if (resolvedMint) return dexScreenerLogo(resolvedMint);
  return memePlaceholder(key);
}

export function tokenImageFallbacks(
  imageUri: string | undefined,
  mint?: string,
  symbol?: string
): string[] {
  const seed = mint || symbol || 'meme';
  const candidates = [
    imageUri?.trim(),
    mint && !isPlaceholderMint(mint) ? dexScreenerLogo(mint) : undefined,
    mint && !isPlaceholderMint(mint) ? jupiterLogo(mint) : undefined,
    mint && !isPlaceholderMint(mint) ? pumpFunLogo(mint) : undefined,
    symbol ? resolveTokenImageUrl(symbol, mint) : undefined,
    memePlaceholder(seed),
  ];
  const seen = new Set<string>();
  const out: string[] = [];
  for (const url of candidates) {
    if (!url || seen.has(url)) continue;
    seen.add(url);
    out.push(url);
  }
  return out;
}
