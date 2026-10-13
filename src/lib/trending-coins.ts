// Curated fallback list used only if live pump.fun / Jupiter / DexScreener / Gecko APIs are down.
// Re-generate seed scaffold: node scripts/gen-trending-coins.mjs

import { resolveTokenImageUrl } from "./token-images";

export interface StaticTrendingCoin {
  name: string;
  symbol: string;
  ticker: string;
  mint: string;
  holders: string;
  marketCap: string;
  lastBuy: string;
  imageUri?: string;
  description?: string;
  website?: string;
  twitter?: string;
  telegram?: string;
}

export const TRENDING_COINS: StaticTrendingCoin[] = [
  {
    "name": "TRUMP",
    "symbol": "TRUMP",
    "ticker": "$TRUMP",
    "mint": "Curated0011111111111111111111111111111111111111111",
    "holders": "645,788",
    "marketCap": "$2.04B",
    "lastBuy": "108 buys/1h",
    "description": "TRUMP — edit this list in src/lib/trending-coins.ts"
  },
  {
    "name": "PEPE",
    "symbol": "PEPE",
    "ticker": "$PEPE",
    "mint": "Curated0021111111111111111111111111111111111111111",
    "holders": "412,300",
    "marketCap": "$890M",
    "lastBuy": "92 buys/1h",
    "description": "PEPE — edit this list in src/lib/trending-coins.ts"
  },
  {
    "name": "WIF",
    "symbol": "WIF",
    "ticker": "$WIF",
    "mint": "Curated0031111111111111111111111111111111111111111",
    "holders": "521,100",
    "marketCap": "$1.2B",
    "lastBuy": "156 buys/1h",
    "description": "WIF — edit this list in src/lib/trending-coins.ts"
  },
  {
    "name": "BONK",
    "symbol": "BONK",
    "ticker": "$BONK",
    "mint": "Curated0041111111111111111111111111111111111111111",
    "holders": "892,400",
    "marketCap": "$1.8B",
    "lastBuy": "201 buys/1h",
    "description": "BONK — edit this list in src/lib/trending-coins.ts"
  },
  {
    "name": "POPCAT",
    "symbol": "POPCAT",
    "ticker": "$POPCAT",
    "mint": "Curated0051111111111111111111111111111111111111111",
    "holders": "298,500",
    "marketCap": "$420M",
    "lastBuy": "67 buys/1h",
    "description": "POPCAT — edit this list in src/lib/trending-coins.ts"
  },
  {
    "name": "MOG",
    "symbol": "MOG",
    "ticker": "$MOG",
    "mint": "Curated0061111111111111111111111111111111111111111",
    "holders": "187,200",
    "marketCap": "$310M",
    "lastBuy": "45 buys/1h",
    "description": "MOG — edit this list in src/lib/trending-coins.ts"
  },
  {
    "name": "BRETT",
    "symbol": "BRETT",
    "ticker": "$BRETT",
    "mint": "Curated0071111111111111111111111111111111111111111",
    "holders": "334,800",
    "marketCap": "$680M",
    "lastBuy": "88 buys/1h",
    "description": "BRETT — edit this list in src/lib/trending-coins.ts"
  },
  {
    "name": "MEW",
    "symbol": "MEW",
    "ticker": "$MEW",
    "mint": "Curated0081111111111111111111111111111111111111111",
    "holders": "156,900",
    "marketCap": "$245M",
    "lastBuy": "34 buys/1h",
    "description": "MEW — edit this list in src/lib/trending-coins.ts"
  },
  {
    "name": "GOAT",
    "symbol": "GOAT",
    "ticker": "$GOAT",
    "mint": "Curated0091111111111111111111111111111111111111111",
    "holders": "221,400",
    "marketCap": "$390M",
    "lastBuy": "56 buys/1h",
    "description": "GOAT — edit this list in src/lib/trending-coins.ts"
  },
  {
    "name": "PNUT",
    "symbol": "PNUT",
    "ticker": "$PNUT",
    "mint": "Curated0101111111111111111111111111111111111111111",
    "holders": "98,700",
    "marketCap": "$180M",
    "lastBuy": "29 buys/1h",
    "description": "PNUT — edit this list in src/lib/trending-coins.ts"
  },
  {
    "name": "FARTCOIN",
    "symbol": "FARTCOIN",
    "ticker": "$FARTCOIN",
    "mint": "Curated0111111111111111111111111111111111111111111",
    "holders": "267,300",
    "marketCap": "$520M",
    "lastBuy": "74 buys/1h",
    "description": "FARTCOIN — edit this list in src/lib/trending-coins.ts"
  },
  {
    "name": "CHILLGUY",
    "symbol": "CHILLGUY",
    "ticker": "$CHILLGUY",
    "mint": "Curated0121111111111111111111111111111111111111111",
    "holders": "76,400",
    "marketCap": "$95M",
    "lastBuy": "18 buys/1h",
    "description": "CHILLGUY — edit this list in src/lib/trending-coins.ts"
  },
  {
    "name": "AI16Z",
    "symbol": "AI16Z",
    "ticker": "$AI16Z",
    "mint": "Curated0131111111111111111111111111111111111111111",
    "holders": "143,200",
    "marketCap": "$275M",
    "lastBuy": "41 buys/1h",
    "description": "AI16Z — edit this list in src/lib/trending-coins.ts"
  },
  {
    "name": "PENGU",
    "symbol": "PENGU",
    "ticker": "$PENGU",
    "mint": "Curated0141111111111111111111111111111111111111111",
    "holders": "445,600",
    "marketCap": "$1.1B",
    "lastBuy": "132 buys/1h",
    "description": "PENGU — edit this list in src/lib/trending-coins.ts"
  },
  {
    "name": "MELANIA",
    "symbol": "MELANIA",
    "ticker": "$MELANIA",
    "mint": "Curated0151111111111111111111111111111111111111111",
    "holders": "198,400",
    "marketCap": "$310M",
    "lastBuy": "48 buys/1h",
    "description": "MELANIA — edit this list in src/lib/trending-coins.ts"
  },
  {
    "name": "ACT",
    "symbol": "ACT",
    "ticker": "$ACT",
    "mint": "Curated0161111111111111111111111111111111111111111",
    "holders": "87,600",
    "marketCap": "$120M",
    "lastBuy": "22 buys/1h",
    "description": "ACT — edit this list in src/lib/trending-coins.ts"
  },
  {
    "name": "MICHI",
    "symbol": "MICHI",
    "ticker": "$MICHI",
    "mint": "Curated0171111111111111111111111111111111111111111",
    "holders": "28,900",
    "marketCap": "$35M",
    "lastBuy": "8 buys/1h",
    "description": "MICHI — edit this list in src/lib/trending-coins.ts"
  },
  {
    "name": "VINE",
    "symbol": "VINE",
    "ticker": "$VINE",
    "mint": "Curated0181111111111111111111111111111111111111111",
    "holders": "41,500",
    "marketCap": "$58M",
    "lastBuy": "14 buys/1h",
    "description": "VINE — edit this list in src/lib/trending-coins.ts"
  },
  {
    "name": "SIGMA",
    "symbol": "SIGMA",
    "ticker": "$SIGMA",
    "mint": "Curated0191111111111111111111111111111111111111111",
    "holders": "36,700",
    "marketCap": "$51M",
    "lastBuy": "13 buys/1h",
    "description": "SIGMA — edit this list in src/lib/trending-coins.ts"
  },
  {
    "name": "RETARDIO",
    "symbol": "RETARDIO",
    "ticker": "$RETARDIO",
    "mint": "Curated0201111111111111111111111111111111111111111",
    "holders": "22,400",
    "marketCap": "$28M",
    "lastBuy": "7 buys/1h",
    "description": "RETARDIO — edit this list in src/lib/trending-coins.ts"
  },
  {
    "name": "MoonInu",
    "symbol": "MOONINU",
    "ticker": "$MOONINU",
    "mint": "Curated0211111111111111111111111111111111111111111",
    "holders": "43,000",
    "marketCap": "$81.0M",
    "lastBuy": "15 buys/1h",
    "description": "MoonInu — curated placeholder. Replace with real data when you update the list."
  },
  {
    "name": "DogeInu",
    "symbol": "DOGEINU",
    "ticker": "$DOGEINU",
    "mint": "Curated0221111111111111111111111111111111111111111",
    "holders": "42,550",
    "marketCap": "$80.2M",
    "lastBuy": "15 buys/1h",
    "description": "DogeInu — curated placeholder. Replace with real data when you update the list."
  },
  {
    "name": "SolInu",
    "symbol": "SOLINU",
    "ticker": "$SOLINU",
    "mint": "Curated0231111111111111111111111111111111111111111",
    "holders": "42,100",
    "marketCap": "$79.3M",
    "lastBuy": "15 buys/1h",
    "description": "SolInu — curated placeholder. Replace with real data when you update the list."
  },
  {
    "name": "PumpInu",
    "symbol": "PUMPINU",
    "ticker": "$PUMPINU",
    "mint": "Curated0241111111111111111111111111111111111111111",
    "holders": "41,650",
    "marketCap": "$78.5M",
    "lastBuy": "15 buys/1h",
    "description": "PumpInu — curated placeholder. Replace with real data when you update the list."
  },
  {
    "name": "MemeInu",
    "symbol": "MEMEINU",
    "ticker": "$MEMEINU",
    "mint": "Curated0251111111111111111111111111111111111111111",
    "holders": "41,200",
    "marketCap": "$77.6M",
    "lastBuy": "14 buys/1h",
    "description": "MemeInu — curated placeholder. Replace with real data when you update the list."
  },
  {
    "name": "TurboInu",
    "symbol": "TURBOINU",
    "ticker": "$TURBOINU",
    "mint": "Curated0261111111111111111111111111111111111111111",
    "holders": "40,750",
    "marketCap": "$76.8M",
    "lastBuy": "14 buys/1h",
    "description": "TurboInu — curated placeholder. Replace with real data when you update the list."
  },
  {
    "name": "MegaInu",
    "symbol": "MEGAINU",
    "ticker": "$MEGAINU",
    "mint": "Curated0271111111111111111111111111111111111111111",
    "holders": "40,300",
    "marketCap": "$75.9M",
    "lastBuy": "14 buys/1h",
    "description": "MegaInu — curated placeholder. Replace with real data when you update the list."
  },
  {
    "name": "UltraInu",
    "symbol": "ULTRAINU",
    "ticker": "$ULTRAINU",
    "mint": "Curated0281111111111111111111111111111111111111111",
    "holders": "39,850",
    "marketCap": "$75.0M",
    "lastBuy": "14 buys/1h",
    "description": "UltraInu — curated placeholder. Replace with real data when you update the list."
  },
  {
    "name": "HyperInu",
    "symbol": "HYPERINU",
    "ticker": "$HYPERINU",
    "mint": "Curated0291111111111111111111111111111111111111111",
    "holders": "39,400",
    "marketCap": "$74.2M",
    "lastBuy": "14 buys/1h",
    "description": "HyperInu — curated placeholder. Replace with real data when you update the list."
  },
  {
    "name": "BasedInu",
    "symbol": "BASEDINU",
    "ticker": "$BASEDINU",
    "mint": "Curated0301111111111111111111111111111111111111111",
    "holders": "38,950",
    "marketCap": "$73.3M",
    "lastBuy": "14 buys/1h",
    "description": "BasedInu — curated placeholder. Replace with real data when you update the list."
  },
  {
    "name": "MoonCoin",
    "symbol": "MOONCOIN",
    "ticker": "$MOONCOIN",
    "mint": "Curated0311111111111111111111111111111111111111111",
    "holders": "38,500",
    "marketCap": "$72.5M",
    "lastBuy": "13 buys/1h",
    "description": "MoonCoin — curated placeholder. Replace with real data when you update the list."
  },
  {
    "name": "DogeCoin",
    "symbol": "DOGECOIN",
    "ticker": "$DOGECOIN",
    "mint": "Curated0321111111111111111111111111111111111111111",
    "holders": "38,050",
    "marketCap": "$71.7M",
    "lastBuy": "13 buys/1h",
    "description": "DogeCoin — curated placeholder. Replace with real data when you update the list."
  },
  {
    "name": "SolCoin",
    "symbol": "SOLCOIN",
    "ticker": "$SOLCOIN",
    "mint": "Curated0331111111111111111111111111111111111111111",
    "holders": "37,600",
    "marketCap": "$70.8M",
    "lastBuy": "13 buys/1h",
    "description": "SolCoin — curated placeholder. Replace with real data when you update the list."
  },
  {
    "name": "PumpCoin",
    "symbol": "PUMPCOIN",
    "ticker": "$PUMPCOIN",
    "mint": "Curated0341111111111111111111111111111111111111111",
    "holders": "37,150",
    "marketCap": "$70.0M",
    "lastBuy": "13 buys/1h",
    "description": "PumpCoin — curated placeholder. Replace with real data when you update the list."
  },
  {
    "name": "MemeCoin",
    "symbol": "MEMECOIN",
    "ticker": "$MEMECOIN",
    "mint": "Curated0351111111111111111111111111111111111111111",
    "holders": "36,700",
    "marketCap": "$69.1M",
    "lastBuy": "13 buys/1h",
    "description": "MemeCoin — curated placeholder. Replace with real data when you update the list."
  },
  {
    "name": "TurboCoin",
    "symbol": "TURBOCOIN",
    "ticker": "$TURBOCOIN",
    "mint": "Curated0361111111111111111111111111111111111111111",
    "holders": "36,250",
    "marketCap": "$68.3M",
    "lastBuy": "13 buys/1h",
    "description": "TurboCoin — curated placeholder. Replace with real data when you update the list."
  },
  {
    "name": "MegaCoin",
    "symbol": "MEGACOIN",
    "ticker": "$MEGACOIN",
    "mint": "Curated0371111111111111111111111111111111111111111",
    "holders": "35,800",
    "marketCap": "$67.4M",
    "lastBuy": "12 buys/1h",
    "description": "MegaCoin — curated placeholder. Replace with real data when you update the list."
  },
  {
    "name": "UltraCoin",
    "symbol": "ULTRACOIN",
    "ticker": "$ULTRACOIN",
    "mint": "Curated0381111111111111111111111111111111111111111",
    "holders": "35,350",
    "marketCap": "$66.5M",
    "lastBuy": "12 buys/1h",
    "description": "UltraCoin — curated placeholder. Replace with real data when you update the list."
  },
  {
    "name": "HyperCoin",
    "symbol": "HYPERCOIN",
    "ticker": "$HYPERCOIN",
    "mint": "Curated0391111111111111111111111111111111111111111",
    "holders": "34,900",
    "marketCap": "$65.7M",
    "lastBuy": "12 buys/1h",
    "description": "HyperCoin — curated placeholder. Replace with real data when you update the list."
  },
  {
    "name": "BasedCoin",
    "symbol": "BASEDCOIN",
    "ticker": "$BASEDCOIN",
    "mint": "Curated0401111111111111111111111111111111111111111",
    "holders": "34,450",
    "marketCap": "$64.8M",
    "lastBuy": "12 buys/1h",
    "description": "BasedCoin — curated placeholder. Replace with real data when you update the list."
  },
  {
    "name": "MoonFi",
    "symbol": "MOONFI",
    "ticker": "$MOONFI",
    "mint": "Curated0411111111111111111111111111111111111111111",
    "holders": "34,000",
    "marketCap": "$64.0M",
    "lastBuy": "12 buys/1h",
    "description": "MoonFi — curated placeholder. Replace with real data when you update the list."
  },
  {
    "name": "DogeFi",
    "symbol": "DOGEFI",
    "ticker": "$DOGEFI",
    "mint": "Curated0421111111111111111111111111111111111111111",
    "holders": "33,550",
    "marketCap": "$63.1M",
    "lastBuy": "12 buys/1h",
    "description": "DogeFi — curated placeholder. Replace with real data when you update the list."
  },
  {
    "name": "SolFi",
    "symbol": "SOLFI",
    "ticker": "$SOLFI",
    "mint": "Curated0431111111111111111111111111111111111111111",
    "holders": "33,100",
    "marketCap": "$62.3M",
    "lastBuy": "11 buys/1h",
    "description": "SolFi — curated placeholder. Replace with real data when you update the list."
  },
  {
    "name": "PumpFi",
    "symbol": "PUMPFI",
    "ticker": "$PUMPFI",
    "mint": "Curated0441111111111111111111111111111111111111111",
    "holders": "32,650",
    "marketCap": "$61.5M",
    "lastBuy": "11 buys/1h",
    "description": "PumpFi — curated placeholder. Replace with real data when you update the list."
  },
  {
    "name": "MemeFi",
    "symbol": "MEMEFI",
    "ticker": "$MEMEFI",
    "mint": "Curated0451111111111111111111111111111111111111111",
    "holders": "32,200",
    "marketCap": "$60.6M",
    "lastBuy": "11 buys/1h",
    "description": "MemeFi — curated placeholder. Replace with real data when you update the list."
  },
  {
    "name": "TurboFi",
    "symbol": "TURBOFI",
    "ticker": "$TURBOFI",
    "mint": "Curated0461111111111111111111111111111111111111111",
    "holders": "31,750",
    "marketCap": "$59.8M",
    "lastBuy": "11 buys/1h",
    "description": "TurboFi — curated placeholder. Replace with real data when you update the list."
  },
  {
    "name": "MegaFi",
    "symbol": "MEGAFI",
    "ticker": "$MEGAFI",
    "mint": "Curated0471111111111111111111111111111111111111111",
    "holders": "31,300",
    "marketCap": "$58.9M",
    "lastBuy": "11 buys/1h",
    "description": "MegaFi — curated placeholder. Replace with real data when you update the list."
  },
  {
    "name": "UltraFi",
    "symbol": "ULTRAFI",
    "ticker": "$ULTRAFI",
    "mint": "Curated0481111111111111111111111111111111111111111",
    "holders": "30,850",
    "marketCap": "$58.1M",
    "lastBuy": "11 buys/1h",
    "description": "UltraFi — curated placeholder. Replace with real data when you update the list."
  },
  {
    "name": "HyperFi",
    "symbol": "HYPERFI",
    "ticker": "$HYPERFI",
    "mint": "Curated0491111111111111111111111111111111111111111",
    "holders": "30,400",
    "marketCap": "$57.2M",
    "lastBuy": "10 buys/1h",
    "description": "HyperFi — curated placeholder. Replace with real data when you update the list."
  },
  {
    "name": "BasedFi",
    "symbol": "BASEDFI",
    "ticker": "$BASEDFI",
    "mint": "Curated0501111111111111111111111111111111111111111",
    "holders": "29,950",
    "marketCap": "$56.4M",
    "lastBuy": "10 buys/1h",
    "description": "BasedFi — curated placeholder. Replace with real data when you update the list."
  },
  {
    "name": "MoonAI",
    "symbol": "MOONAI",
    "ticker": "$MOONAI",
    "mint": "Curated0511111111111111111111111111111111111111111",
    "holders": "29,500",
    "marketCap": "$55.5M",
    "lastBuy": "10 buys/1h",
    "description": "MoonAI — curated placeholder. Replace with real data when you update the list."
  },
  {
    "name": "DogeAI31",
    "symbol": "DOGEAI31",
    "ticker": "$DOGEAI31",
    "mint": "Curated0521111111111111111111111111111111111111111",
    "holders": "29,050",
    "marketCap": "$54.6M",
    "lastBuy": "10 buys/1h",
    "description": "DogeAI31 — curated placeholder. Replace with real data when you update the list."
  },
  {
    "name": "SolAI32",
    "symbol": "SOLAI32",
    "ticker": "$SOLAI32",
    "mint": "Curated0531111111111111111111111111111111111111111",
    "holders": "28,600",
    "marketCap": "$53.8M",
    "lastBuy": "10 buys/1h",
    "description": "SolAI32 — curated placeholder. Replace with real data when you update the list."
  },
  {
    "name": "PumpAI33",
    "symbol": "PUMPAI33",
    "ticker": "$PUMPAI33",
    "mint": "Curated0541111111111111111111111111111111111111111",
    "holders": "28,150",
    "marketCap": "$53.0M",
    "lastBuy": "10 buys/1h",
    "description": "PumpAI33 — curated placeholder. Replace with real data when you update the list."
  },
  {
    "name": "MemeAI34",
    "symbol": "MEMEAI34",
    "ticker": "$MEMEAI34",
    "mint": "Curated0551111111111111111111111111111111111111111",
    "holders": "27,700",
    "marketCap": "$52.1M",
    "lastBuy": "9 buys/1h",
    "description": "MemeAI34 — curated placeholder. Replace with real data when you update the list."
  },
  {
    "name": "TurboAI35",
    "symbol": "TURBOAI35",
    "ticker": "$TURBOAI35",
    "mint": "Curated0561111111111111111111111111111111111111111",
    "holders": "27,250",
    "marketCap": "$51.3M",
    "lastBuy": "9 buys/1h",
    "description": "TurboAI35 — curated placeholder. Replace with real data when you update the list."
  },
  {
    "name": "MegaAI36",
    "symbol": "MEGAAI36",
    "ticker": "$MEGAAI36",
    "mint": "Curated0571111111111111111111111111111111111111111",
    "holders": "26,800",
    "marketCap": "$50.4M",
    "lastBuy": "9 buys/1h",
    "description": "MegaAI36 — curated placeholder. Replace with real data when you update the list."
  },
  {
    "name": "UltraAI37",
    "symbol": "ULTRAAI37",
    "ticker": "$ULTRAAI37",
    "mint": "Curated0581111111111111111111111111111111111111111",
    "holders": "26,350",
    "marketCap": "$49.6M",
    "lastBuy": "9 buys/1h",
    "description": "UltraAI37 — curated placeholder. Replace with real data when you update the list."
  },
  {
    "name": "HyperAI38",
    "symbol": "HYPERAI38",
    "ticker": "$HYPERAI38",
    "mint": "Curated0591111111111111111111111111111111111111111",
    "holders": "25,900",
    "marketCap": "$48.7M",
    "lastBuy": "9 buys/1h",
    "description": "HyperAI38 — curated placeholder. Replace with real data when you update the list."
  },
  {
    "name": "BasedAI39",
    "symbol": "BASEDAI39",
    "ticker": "$BASEDAI39",
    "mint": "Curated0601111111111111111111111111111111111111111",
    "holders": "25,450",
    "marketCap": "$47.9M",
    "lastBuy": "9 buys/1h",
    "description": "BasedAI39 — curated placeholder. Replace with real data when you update the list."
  },
  {
    "name": "MoonX40",
    "symbol": "MOONX40",
    "ticker": "$MOONX40",
    "mint": "Curated0611111111111111111111111111111111111111111",
    "holders": "25,000",
    "marketCap": "$47.0M",
    "lastBuy": "8 buys/1h",
    "description": "MoonX40 — curated placeholder. Replace with real data when you update the list."
  },
  {
    "name": "DogeX41",
    "symbol": "DOGEX41",
    "ticker": "$DOGEX41",
    "mint": "Curated0621111111111111111111111111111111111111111",
    "holders": "24,550",
    "marketCap": "$46.1M",
    "lastBuy": "8 buys/1h",
    "description": "DogeX41 — curated placeholder. Replace with real data when you update the list."
  },
  {
    "name": "SolX42",
    "symbol": "SOLX42",
    "ticker": "$SOLX42",
    "mint": "Curated0631111111111111111111111111111111111111111",
    "holders": "24,100",
    "marketCap": "$45.3M",
    "lastBuy": "8 buys/1h",
    "description": "SolX42 — curated placeholder. Replace with real data when you update the list."
  },
  {
    "name": "PumpX43",
    "symbol": "PUMPX43",
    "ticker": "$PUMPX43",
    "mint": "Curated0641111111111111111111111111111111111111111",
    "holders": "23,650",
    "marketCap": "$44.5M",
    "lastBuy": "8 buys/1h",
    "description": "PumpX43 — curated placeholder. Replace with real data when you update the list."
  },
  {
    "name": "MemeX44",
    "symbol": "MEMEX44",
    "ticker": "$MEMEX44",
    "mint": "Curated0651111111111111111111111111111111111111111",
    "holders": "23,200",
    "marketCap": "$43.6M",
    "lastBuy": "8 buys/1h",
    "description": "MemeX44 — curated placeholder. Replace with real data when you update the list."
  },
  {
    "name": "TurboX45",
    "symbol": "TURBOX45",
    "ticker": "$TURBOX45",
    "mint": "Curated0661111111111111111111111111111111111111111",
    "holders": "22,750",
    "marketCap": "$42.8M",
    "lastBuy": "8 buys/1h",
    "description": "TurboX45 — curated placeholder. Replace with real data when you update the list."
  },
  {
    "name": "MegaX46",
    "symbol": "MEGAX46",
    "ticker": "$MEGAX46",
    "mint": "Curated0671111111111111111111111111111111111111111",
    "holders": "22,300",
    "marketCap": "$41.9M",
    "lastBuy": "7 buys/1h",
    "description": "MegaX46 — curated placeholder. Replace with real data when you update the list."
  },
  {
    "name": "UltraX47",
    "symbol": "ULTRAX47",
    "ticker": "$ULTRAX47",
    "mint": "Curated0681111111111111111111111111111111111111111",
    "holders": "21,850",
    "marketCap": "$41.1M",
    "lastBuy": "7 buys/1h",
    "description": "UltraX47 — curated placeholder. Replace with real data when you update the list."
  },
  {
    "name": "HyperX48",
    "symbol": "HYPERX48",
    "ticker": "$HYPERX48",
    "mint": "Curated0691111111111111111111111111111111111111111",
    "holders": "21,400",
    "marketCap": "$40.2M",
    "lastBuy": "7 buys/1h",
    "description": "HyperX48 — curated placeholder. Replace with real data when you update the list."
  },
  {
    "name": "BasedX49",
    "symbol": "BASEDX49",
    "ticker": "$BASEDX49",
    "mint": "Curated0701111111111111111111111111111111111111111",
    "holders": "20,950",
    "marketCap": "$39.4M",
    "lastBuy": "7 buys/1h",
    "description": "BasedX49 — curated placeholder. Replace with real data when you update the list."
  },
  {
    "name": "MoonLabs50",
    "symbol": "MOONLABS50",
    "ticker": "$MOONLABS50",
    "mint": "Curated0711111111111111111111111111111111111111111",
    "holders": "20,500",
    "marketCap": "$38.5M",
    "lastBuy": "7 buys/1h",
    "description": "MoonLabs50 — curated placeholder. Replace with real data when you update the list."
  },
  {
    "name": "DogeLabs51",
    "symbol": "DOGELABS51",
    "ticker": "$DOGELABS51",
    "mint": "Curated0721111111111111111111111111111111111111111",
    "holders": "20,050",
    "marketCap": "$37.6M",
    "lastBuy": "7 buys/1h",
    "description": "DogeLabs51 — curated placeholder. Replace with real data when you update the list."
  },
  {
    "name": "SolLabs52",
    "symbol": "SOLLABS52",
    "ticker": "$SOLLABS52",
    "mint": "Curated0731111111111111111111111111111111111111111",
    "holders": "19,600",
    "marketCap": "$36.8M",
    "lastBuy": "6 buys/1h",
    "description": "SolLabs52 — curated placeholder. Replace with real data when you update the list."
  },
  {
    "name": "PumpLabs53",
    "symbol": "PUMPLABS53",
    "ticker": "$PUMPLABS53",
    "mint": "Curated0741111111111111111111111111111111111111111",
    "holders": "19,150",
    "marketCap": "$36.0M",
    "lastBuy": "6 buys/1h",
    "description": "PumpLabs53 — curated placeholder. Replace with real data when you update the list."
  },
  {
    "name": "MemeLabs54",
    "symbol": "MEMELABS54",
    "ticker": "$MEMELABS54",
    "mint": "Curated0751111111111111111111111111111111111111111",
    "holders": "18,700",
    "marketCap": "$35.1M",
    "lastBuy": "6 buys/1h",
    "description": "MemeLabs54 — curated placeholder. Replace with real data when you update the list."
  },
  {
    "name": "TurboLabs55",
    "symbol": "TURBOLABS5",
    "ticker": "$TURBOLABS5",
    "mint": "Curated0761111111111111111111111111111111111111111",
    "holders": "18,250",
    "marketCap": "$34.3M",
    "lastBuy": "6 buys/1h",
    "description": "TurboLabs55 — curated placeholder. Replace with real data when you update the list."
  },
  {
    "name": "MegaLabs56",
    "symbol": "MEGALABS56",
    "ticker": "$MEGALABS56",
    "mint": "Curated0771111111111111111111111111111111111111111",
    "holders": "17,800",
    "marketCap": "$33.4M",
    "lastBuy": "6 buys/1h",
    "description": "MegaLabs56 — curated placeholder. Replace with real data when you update the list."
  },
  {
    "name": "UltraLabs57",
    "symbol": "ULTRALABS5",
    "ticker": "$ULTRALABS5",
    "mint": "Curated0781111111111111111111111111111111111111111",
    "holders": "17,350",
    "marketCap": "$32.5M",
    "lastBuy": "6 buys/1h",
    "description": "UltraLabs57 — curated placeholder. Replace with real data when you update the list."
  },
  {
    "name": "HyperLabs58",
    "symbol": "HYPERLABS5",
    "ticker": "$HYPERLABS5",
    "mint": "Curated0791111111111111111111111111111111111111111",
    "holders": "16,900",
    "marketCap": "$31.7M",
    "lastBuy": "5 buys/1h",
    "description": "HyperLabs58 — curated placeholder. Replace with real data when you update the list."
  },
  {
    "name": "BasedLabs59",
    "symbol": "BASEDLABS5",
    "ticker": "$BASEDLABS5",
    "mint": "Curated0801111111111111111111111111111111111111111",
    "holders": "16,450",
    "marketCap": "$30.9M",
    "lastBuy": "5 buys/1h",
    "description": "BasedLabs59 — curated placeholder. Replace with real data when you update the list."
  },
  {
    "name": "MoonClub60",
    "symbol": "MOONCLUB60",
    "ticker": "$MOONCLUB60",
    "mint": "Curated0811111111111111111111111111111111111111111",
    "holders": "16,000",
    "marketCap": "$30.0M",
    "lastBuy": "5 buys/1h",
    "description": "MoonClub60 — curated placeholder. Replace with real data when you update the list."
  },
  {
    "name": "DogeClub61",
    "symbol": "DOGECLUB61",
    "ticker": "$DOGECLUB61",
    "mint": "Curated0821111111111111111111111111111111111111111",
    "holders": "15,550",
    "marketCap": "$29.2M",
    "lastBuy": "5 buys/1h",
    "description": "DogeClub61 — curated placeholder. Replace with real data when you update the list."
  },
  {
    "name": "SolClub62",
    "symbol": "SOLCLUB62",
    "ticker": "$SOLCLUB62",
    "mint": "Curated0831111111111111111111111111111111111111111",
    "holders": "15,100",
    "marketCap": "$28.3M",
    "lastBuy": "5 buys/1h",
    "description": "SolClub62 — curated placeholder. Replace with real data when you update the list."
  },
  {
    "name": "PumpClub63",
    "symbol": "PUMPCLUB63",
    "ticker": "$PUMPCLUB63",
    "mint": "Curated0841111111111111111111111111111111111111111",
    "holders": "14,650",
    "marketCap": "$27.5M",
    "lastBuy": "5 buys/1h",
    "description": "PumpClub63 — curated placeholder. Replace with real data when you update the list."
  },
  {
    "name": "MemeClub64",
    "symbol": "MEMECLUB64",
    "ticker": "$MEMECLUB64",
    "mint": "Curated0851111111111111111111111111111111111111111",
    "holders": "14,200",
    "marketCap": "$26.6M",
    "lastBuy": "4 buys/1h",
    "description": "MemeClub64 — curated placeholder. Replace with real data when you update the list."
  },
  {
    "name": "TurboClub65",
    "symbol": "TURBOCLUB6",
    "ticker": "$TURBOCLUB6",
    "mint": "Curated0861111111111111111111111111111111111111111",
    "holders": "13,750",
    "marketCap": "$25.8M",
    "lastBuy": "4 buys/1h",
    "description": "TurboClub65 — curated placeholder. Replace with real data when you update the list."
  },
  {
    "name": "MegaClub66",
    "symbol": "MEGACLUB66",
    "ticker": "$MEGACLUB66",
    "mint": "Curated0871111111111111111111111111111111111111111",
    "holders": "13,300",
    "marketCap": "$24.9M",
    "lastBuy": "4 buys/1h",
    "description": "MegaClub66 — curated placeholder. Replace with real data when you update the list."
  },
  {
    "name": "UltraClub67",
    "symbol": "ULTRACLUB6",
    "ticker": "$ULTRACLUB6",
    "mint": "Curated0881111111111111111111111111111111111111111",
    "holders": "12,850",
    "marketCap": "$24.0M",
    "lastBuy": "4 buys/1h",
    "description": "UltraClub67 — curated placeholder. Replace with real data when you update the list."
  },
  {
    "name": "HyperClub68",
    "symbol": "HYPERCLUB6",
    "ticker": "$HYPERCLUB6",
    "mint": "Curated0891111111111111111111111111111111111111111",
    "holders": "12,400",
    "marketCap": "$23.2M",
    "lastBuy": "4 buys/1h",
    "description": "HyperClub68 — curated placeholder. Replace with real data when you update the list."
  },
  {
    "name": "BasedClub69",
    "symbol": "BASEDCLUB6",
    "ticker": "$BASEDCLUB6",
    "mint": "Curated0901111111111111111111111111111111111111111",
    "holders": "11,950",
    "marketCap": "$22.4M",
    "lastBuy": "4 buys/1h",
    "description": "BasedClub69 — curated placeholder. Replace with real data when you update the list."
  },
  {
    "name": "MoonArmy70",
    "symbol": "MOONARMY70",
    "ticker": "$MOONARMY70",
    "mint": "Curated0911111111111111111111111111111111111111111",
    "holders": "11,500",
    "marketCap": "$21.5M",
    "lastBuy": "3 buys/1h",
    "description": "MoonArmy70 — curated placeholder. Replace with real data when you update the list."
  },
  {
    "name": "DogeArmy71",
    "symbol": "DOGEARMY71",
    "ticker": "$DOGEARMY71",
    "mint": "Curated0921111111111111111111111111111111111111111",
    "holders": "11,050",
    "marketCap": "$20.7M",
    "lastBuy": "3 buys/1h",
    "description": "DogeArmy71 — curated placeholder. Replace with real data when you update the list."
  },
  {
    "name": "SolArmy72",
    "symbol": "SOLARMY72",
    "ticker": "$SOLARMY72",
    "mint": "Curated0931111111111111111111111111111111111111111",
    "holders": "10,600",
    "marketCap": "$19.8M",
    "lastBuy": "3 buys/1h",
    "description": "SolArmy72 — curated placeholder. Replace with real data when you update the list."
  },
  {
    "name": "PumpArmy73",
    "symbol": "PUMPARMY73",
    "ticker": "$PUMPARMY73",
    "mint": "Curated0941111111111111111111111111111111111111111",
    "holders": "10,150",
    "marketCap": "$19.0M",
    "lastBuy": "3 buys/1h",
    "description": "PumpArmy73 — curated placeholder. Replace with real data when you update the list."
  },
  {
    "name": "MemeArmy74",
    "symbol": "MEMEARMY74",
    "ticker": "$MEMEARMY74",
    "mint": "Curated0951111111111111111111111111111111111111111",
    "holders": "9,700",
    "marketCap": "$18.1M",
    "lastBuy": "3 buys/1h",
    "description": "MemeArmy74 — curated placeholder. Replace with real data when you update the list."
  },
  {
    "name": "TurboArmy75",
    "symbol": "TURBOARMY7",
    "ticker": "$TURBOARMY7",
    "mint": "Curated0961111111111111111111111111111111111111111",
    "holders": "9,250",
    "marketCap": "$17.3M",
    "lastBuy": "3 buys/1h",
    "description": "TurboArmy75 — curated placeholder. Replace with real data when you update the list."
  },
  {
    "name": "MegaArmy76",
    "symbol": "MEGAARMY76",
    "ticker": "$MEGAARMY76",
    "mint": "Curated0971111111111111111111111111111111111111111",
    "holders": "8,800",
    "marketCap": "$16.4M",
    "lastBuy": "3 buys/1h",
    "description": "MegaArmy76 — curated placeholder. Replace with real data when you update the list."
  },
  {
    "name": "UltraArmy77",
    "symbol": "ULTRAARMY7",
    "ticker": "$ULTRAARMY7",
    "mint": "Curated0981111111111111111111111111111111111111111",
    "holders": "8,350",
    "marketCap": "$15.5M",
    "lastBuy": "3 buys/1h",
    "description": "UltraArmy77 — curated placeholder. Replace with real data when you update the list."
  },
  {
    "name": "HyperArmy78",
    "symbol": "HYPERARMY7",
    "ticker": "$HYPERARMY7",
    "mint": "Curated0991111111111111111111111111111111111111111",
    "holders": "7,900",
    "marketCap": "$14.7M",
    "lastBuy": "3 buys/1h",
    "description": "HyperArmy78 — curated placeholder. Replace with real data when you update the list."
  },
  {
    "name": "BasedArmy79",
    "symbol": "BASEDARMY7",
    "ticker": "$BASEDARMY7",
    "mint": "Curated1001111111111111111111111111111111111111111",
    "holders": "7,450",
    "marketCap": "$13.9M",
    "lastBuy": "3 buys/1h",
    "description": "BasedArmy79 — curated placeholder. Replace with real data when you update the list."
  }
];

export const NEW_COINS: StaticTrendingCoin[] = [
  {
    "name": "BasedArmy79",
    "symbol": "BASEDARMY7",
    "ticker": "$BASEDARMY7",
    "mint": "Curated1001111111111111111111111111111111111111111",
    "holders": "7,450",
    "marketCap": "$13.9M",
    "lastBuy": "3 buys/1h",
    "description": "BasedArmy79 — curated placeholder. Replace with real data when you update the list."
  },
  {
    "name": "HyperArmy78",
    "symbol": "HYPERARMY7",
    "ticker": "$HYPERARMY7",
    "mint": "Curated0991111111111111111111111111111111111111111",
    "holders": "7,900",
    "marketCap": "$14.7M",
    "lastBuy": "3 buys/1h",
    "description": "HyperArmy78 — curated placeholder. Replace with real data when you update the list."
  },
  {
    "name": "UltraArmy77",
    "symbol": "ULTRAARMY7",
    "ticker": "$ULTRAARMY7",
    "mint": "Curated0981111111111111111111111111111111111111111",
    "holders": "8,350",
    "marketCap": "$15.5M",
    "lastBuy": "3 buys/1h",
    "description": "UltraArmy77 — curated placeholder. Replace with real data when you update the list."
  },
  {
    "name": "MegaArmy76",
    "symbol": "MEGAARMY76",
    "ticker": "$MEGAARMY76",
    "mint": "Curated0971111111111111111111111111111111111111111",
    "holders": "8,800",
    "marketCap": "$16.4M",
    "lastBuy": "3 buys/1h",
    "description": "MegaArmy76 — curated placeholder. Replace with real data when you update the list."
  },
  {
    "name": "TurboArmy75",
    "symbol": "TURBOARMY7",
    "ticker": "$TURBOARMY7",
    "mint": "Curated0961111111111111111111111111111111111111111",
    "holders": "9,250",
    "marketCap": "$17.3M",
    "lastBuy": "3 buys/1h",
    "description": "TurboArmy75 — curated placeholder. Replace with real data when you update the list."
  },
  {
    "name": "MemeArmy74",
    "symbol": "MEMEARMY74",
    "ticker": "$MEMEARMY74",
    "mint": "Curated0951111111111111111111111111111111111111111",
    "holders": "9,700",
    "marketCap": "$18.1M",
    "lastBuy": "3 buys/1h",
    "description": "MemeArmy74 — curated placeholder. Replace with real data when you update the list."
  },
  {
    "name": "PumpArmy73",
    "symbol": "PUMPARMY73",
    "ticker": "$PUMPARMY73",
    "mint": "Curated0941111111111111111111111111111111111111111",
    "holders": "10,150",
    "marketCap": "$19.0M",
    "lastBuy": "3 buys/1h",
    "description": "PumpArmy73 — curated placeholder. Replace with real data when you update the list."
  },
  {
    "name": "SolArmy72",
    "symbol": "SOLARMY72",
    "ticker": "$SOLARMY72",
    "mint": "Curated0931111111111111111111111111111111111111111",
    "holders": "10,600",
    "marketCap": "$19.8M",
    "lastBuy": "3 buys/1h",
    "description": "SolArmy72 — curated placeholder. Replace with real data when you update the list."
  },
  {
    "name": "DogeArmy71",
    "symbol": "DOGEARMY71",
    "ticker": "$DOGEARMY71",
    "mint": "Curated0921111111111111111111111111111111111111111",
    "holders": "11,050",
    "marketCap": "$20.7M",
    "lastBuy": "3 buys/1h",
    "description": "DogeArmy71 — curated placeholder. Replace with real data when you update the list."
  },
  {
    "name": "MoonArmy70",
    "symbol": "MOONARMY70",
    "ticker": "$MOONARMY70",
    "mint": "Curated0911111111111111111111111111111111111111111",
    "holders": "11,500",
    "marketCap": "$21.5M",
    "lastBuy": "3 buys/1h",
    "description": "MoonArmy70 — curated placeholder. Replace with real data when you update the list."
  },
  {
    "name": "BasedClub69",
    "symbol": "BASEDCLUB6",
    "ticker": "$BASEDCLUB6",
    "mint": "Curated0901111111111111111111111111111111111111111",
    "holders": "11,950",
    "marketCap": "$22.4M",
    "lastBuy": "4 buys/1h",
    "description": "BasedClub69 — curated placeholder. Replace with real data when you update the list."
  },
  {
    "name": "HyperClub68",
    "symbol": "HYPERCLUB6",
    "ticker": "$HYPERCLUB6",
    "mint": "Curated0891111111111111111111111111111111111111111",
    "holders": "12,400",
    "marketCap": "$23.2M",
    "lastBuy": "4 buys/1h",
    "description": "HyperClub68 — curated placeholder. Replace with real data when you update the list."
  },
  {
    "name": "UltraClub67",
    "symbol": "ULTRACLUB6",
    "ticker": "$ULTRACLUB6",
    "mint": "Curated0881111111111111111111111111111111111111111",
    "holders": "12,850",
    "marketCap": "$24.0M",
    "lastBuy": "4 buys/1h",
    "description": "UltraClub67 — curated placeholder. Replace with real data when you update the list."
  },
  {
    "name": "MegaClub66",
    "symbol": "MEGACLUB66",
    "ticker": "$MEGACLUB66",
    "mint": "Curated0871111111111111111111111111111111111111111",
    "holders": "13,300",
    "marketCap": "$24.9M",
    "lastBuy": "4 buys/1h",
    "description": "MegaClub66 — curated placeholder. Replace with real data when you update the list."
  },
  {
    "name": "TurboClub65",
    "symbol": "TURBOCLUB6",
    "ticker": "$TURBOCLUB6",
    "mint": "Curated0861111111111111111111111111111111111111111",
    "holders": "13,750",
    "marketCap": "$25.8M",
    "lastBuy": "4 buys/1h",
    "description": "TurboClub65 — curated placeholder. Replace with real data when you update the list."
  },
  {
    "name": "MemeClub64",
    "symbol": "MEMECLUB64",
    "ticker": "$MEMECLUB64",
    "mint": "Curated0851111111111111111111111111111111111111111",
    "holders": "14,200",
    "marketCap": "$26.6M",
    "lastBuy": "4 buys/1h",
    "description": "MemeClub64 — curated placeholder. Replace with real data when you update the list."
  },
  {
    "name": "PumpClub63",
    "symbol": "PUMPCLUB63",
    "ticker": "$PUMPCLUB63",
    "mint": "Curated0841111111111111111111111111111111111111111",
    "holders": "14,650",
    "marketCap": "$27.5M",
    "lastBuy": "5 buys/1h",
    "description": "PumpClub63 — curated placeholder. Replace with real data when you update the list."
  },
  {
    "name": "SolClub62",
    "symbol": "SOLCLUB62",
    "ticker": "$SOLCLUB62",
    "mint": "Curated0831111111111111111111111111111111111111111",
    "holders": "15,100",
    "marketCap": "$28.3M",
    "lastBuy": "5 buys/1h",
    "description": "SolClub62 — curated placeholder. Replace with real data when you update the list."
  },
  {
    "name": "DogeClub61",
    "symbol": "DOGECLUB61",
    "ticker": "$DOGECLUB61",
    "mint": "Curated0821111111111111111111111111111111111111111",
    "holders": "15,550",
    "marketCap": "$29.2M",
    "lastBuy": "5 buys/1h",
    "description": "DogeClub61 — curated placeholder. Replace with real data when you update the list."
  },
  {
    "name": "MoonClub60",
    "symbol": "MOONCLUB60",
    "ticker": "$MOONCLUB60",
    "mint": "Curated0811111111111111111111111111111111111111111",
    "holders": "16,000",
    "marketCap": "$30.0M",
    "lastBuy": "5 buys/1h",
    "description": "MoonClub60 — curated placeholder. Replace with real data when you update the list."
  },
  {
    "name": "BasedLabs59",
    "symbol": "BASEDLABS5",
    "ticker": "$BASEDLABS5",
    "mint": "Curated0801111111111111111111111111111111111111111",
    "holders": "16,450",
    "marketCap": "$30.9M",
    "lastBuy": "5 buys/1h",
    "description": "BasedLabs59 — curated placeholder. Replace with real data when you update the list."
  },
  {
    "name": "HyperLabs58",
    "symbol": "HYPERLABS5",
    "ticker": "$HYPERLABS5",
    "mint": "Curated0791111111111111111111111111111111111111111",
    "holders": "16,900",
    "marketCap": "$31.7M",
    "lastBuy": "5 buys/1h",
    "description": "HyperLabs58 — curated placeholder. Replace with real data when you update the list."
  },
  {
    "name": "UltraLabs57",
    "symbol": "ULTRALABS5",
    "ticker": "$ULTRALABS5",
    "mint": "Curated0781111111111111111111111111111111111111111",
    "holders": "17,350",
    "marketCap": "$32.5M",
    "lastBuy": "6 buys/1h",
    "description": "UltraLabs57 — curated placeholder. Replace with real data when you update the list."
  },
  {
    "name": "MegaLabs56",
    "symbol": "MEGALABS56",
    "ticker": "$MEGALABS56",
    "mint": "Curated0771111111111111111111111111111111111111111",
    "holders": "17,800",
    "marketCap": "$33.4M",
    "lastBuy": "6 buys/1h",
    "description": "MegaLabs56 — curated placeholder. Replace with real data when you update the list."
  },
  {
    "name": "TurboLabs55",
    "symbol": "TURBOLABS5",
    "ticker": "$TURBOLABS5",
    "mint": "Curated0761111111111111111111111111111111111111111",
    "holders": "18,250",
    "marketCap": "$34.3M",
    "lastBuy": "6 buys/1h",
    "description": "TurboLabs55 — curated placeholder. Replace with real data when you update the list."
  },
  {
    "name": "MemeLabs54",
    "symbol": "MEMELABS54",
    "ticker": "$MEMELABS54",
    "mint": "Curated0751111111111111111111111111111111111111111",
    "holders": "18,700",
    "marketCap": "$35.1M",
    "lastBuy": "6 buys/1h",
    "description": "MemeLabs54 — curated placeholder. Replace with real data when you update the list."
  },
  {
    "name": "PumpLabs53",
    "symbol": "PUMPLABS53",
    "ticker": "$PUMPLABS53",
    "mint": "Curated0741111111111111111111111111111111111111111",
    "holders": "19,150",
    "marketCap": "$36.0M",
    "lastBuy": "6 buys/1h",
    "description": "PumpLabs53 — curated placeholder. Replace with real data when you update the list."
  },
  {
    "name": "SolLabs52",
    "symbol": "SOLLABS52",
    "ticker": "$SOLLABS52",
    "mint": "Curated0731111111111111111111111111111111111111111",
    "holders": "19,600",
    "marketCap": "$36.8M",
    "lastBuy": "6 buys/1h",
    "description": "SolLabs52 — curated placeholder. Replace with real data when you update the list."
  },
  {
    "name": "DogeLabs51",
    "symbol": "DOGELABS51",
    "ticker": "$DOGELABS51",
    "mint": "Curated0721111111111111111111111111111111111111111",
    "holders": "20,050",
    "marketCap": "$37.6M",
    "lastBuy": "7 buys/1h",
    "description": "DogeLabs51 — curated placeholder. Replace with real data when you update the list."
  },
  {
    "name": "MoonLabs50",
    "symbol": "MOONLABS50",
    "ticker": "$MOONLABS50",
    "mint": "Curated0711111111111111111111111111111111111111111",
    "holders": "20,500",
    "marketCap": "$38.5M",
    "lastBuy": "7 buys/1h",
    "description": "MoonLabs50 — curated placeholder. Replace with real data when you update the list."
  },
  {
    "name": "BasedX49",
    "symbol": "BASEDX49",
    "ticker": "$BASEDX49",
    "mint": "Curated0701111111111111111111111111111111111111111",
    "holders": "20,950",
    "marketCap": "$39.4M",
    "lastBuy": "7 buys/1h",
    "description": "BasedX49 — curated placeholder. Replace with real data when you update the list."
  },
  {
    "name": "HyperX48",
    "symbol": "HYPERX48",
    "ticker": "$HYPERX48",
    "mint": "Curated0691111111111111111111111111111111111111111",
    "holders": "21,400",
    "marketCap": "$40.2M",
    "lastBuy": "7 buys/1h",
    "description": "HyperX48 — curated placeholder. Replace with real data when you update the list."
  },
  {
    "name": "UltraX47",
    "symbol": "ULTRAX47",
    "ticker": "$ULTRAX47",
    "mint": "Curated0681111111111111111111111111111111111111111",
    "holders": "21,850",
    "marketCap": "$41.1M",
    "lastBuy": "7 buys/1h",
    "description": "UltraX47 — curated placeholder. Replace with real data when you update the list."
  },
  {
    "name": "MegaX46",
    "symbol": "MEGAX46",
    "ticker": "$MEGAX46",
    "mint": "Curated0671111111111111111111111111111111111111111",
    "holders": "22,300",
    "marketCap": "$41.9M",
    "lastBuy": "7 buys/1h",
    "description": "MegaX46 — curated placeholder. Replace with real data when you update the list."
  },
  {
    "name": "TurboX45",
    "symbol": "TURBOX45",
    "ticker": "$TURBOX45",
    "mint": "Curated0661111111111111111111111111111111111111111",
    "holders": "22,750",
    "marketCap": "$42.8M",
    "lastBuy": "8 buys/1h",
    "description": "TurboX45 — curated placeholder. Replace with real data when you update the list."
  },
  {
    "name": "MemeX44",
    "symbol": "MEMEX44",
    "ticker": "$MEMEX44",
    "mint": "Curated0651111111111111111111111111111111111111111",
    "holders": "23,200",
    "marketCap": "$43.6M",
    "lastBuy": "8 buys/1h",
    "description": "MemeX44 — curated placeholder. Replace with real data when you update the list."
  },
  {
    "name": "PumpX43",
    "symbol": "PUMPX43",
    "ticker": "$PUMPX43",
    "mint": "Curated0641111111111111111111111111111111111111111",
    "holders": "23,650",
    "marketCap": "$44.5M",
    "lastBuy": "8 buys/1h",
    "description": "PumpX43 — curated placeholder. Replace with real data when you update the list."
  },
  {
    "name": "SolX42",
    "symbol": "SOLX42",
    "ticker": "$SOLX42",
    "mint": "Curated0631111111111111111111111111111111111111111",
    "holders": "24,100",
    "marketCap": "$45.3M",
    "lastBuy": "8 buys/1h",
    "description": "SolX42 — curated placeholder. Replace with real data when you update the list."
  },
  {
    "name": "DogeX41",
    "symbol": "DOGEX41",
    "ticker": "$DOGEX41",
    "mint": "Curated0621111111111111111111111111111111111111111",
    "holders": "24,550",
    "marketCap": "$46.1M",
    "lastBuy": "8 buys/1h",
    "description": "DogeX41 — curated placeholder. Replace with real data when you update the list."
  },
  {
    "name": "MoonX40",
    "symbol": "MOONX40",
    "ticker": "$MOONX40",
    "mint": "Curated0611111111111111111111111111111111111111111",
    "holders": "25,000",
    "marketCap": "$47.0M",
    "lastBuy": "8 buys/1h",
    "description": "MoonX40 — curated placeholder. Replace with real data when you update the list."
  },
  {
    "name": "BasedAI39",
    "symbol": "BASEDAI39",
    "ticker": "$BASEDAI39",
    "mint": "Curated0601111111111111111111111111111111111111111",
    "holders": "25,450",
    "marketCap": "$47.9M",
    "lastBuy": "9 buys/1h",
    "description": "BasedAI39 — curated placeholder. Replace with real data when you update the list."
  },
  {
    "name": "HyperAI38",
    "symbol": "HYPERAI38",
    "ticker": "$HYPERAI38",
    "mint": "Curated0591111111111111111111111111111111111111111",
    "holders": "25,900",
    "marketCap": "$48.7M",
    "lastBuy": "9 buys/1h",
    "description": "HyperAI38 — curated placeholder. Replace with real data when you update the list."
  },
  {
    "name": "UltraAI37",
    "symbol": "ULTRAAI37",
    "ticker": "$ULTRAAI37",
    "mint": "Curated0581111111111111111111111111111111111111111",
    "holders": "26,350",
    "marketCap": "$49.6M",
    "lastBuy": "9 buys/1h",
    "description": "UltraAI37 — curated placeholder. Replace with real data when you update the list."
  },
  {
    "name": "MegaAI36",
    "symbol": "MEGAAI36",
    "ticker": "$MEGAAI36",
    "mint": "Curated0571111111111111111111111111111111111111111",
    "holders": "26,800",
    "marketCap": "$50.4M",
    "lastBuy": "9 buys/1h",
    "description": "MegaAI36 — curated placeholder. Replace with real data when you update the list."
  },
  {
    "name": "TurboAI35",
    "symbol": "TURBOAI35",
    "ticker": "$TURBOAI35",
    "mint": "Curated0561111111111111111111111111111111111111111",
    "holders": "27,250",
    "marketCap": "$51.3M",
    "lastBuy": "9 buys/1h",
    "description": "TurboAI35 — curated placeholder. Replace with real data when you update the list."
  },
  {
    "name": "MemeAI34",
    "symbol": "MEMEAI34",
    "ticker": "$MEMEAI34",
    "mint": "Curated0551111111111111111111111111111111111111111",
    "holders": "27,700",
    "marketCap": "$52.1M",
    "lastBuy": "9 buys/1h",
    "description": "MemeAI34 — curated placeholder. Replace with real data when you update the list."
  },
  {
    "name": "PumpAI33",
    "symbol": "PUMPAI33",
    "ticker": "$PUMPAI33",
    "mint": "Curated0541111111111111111111111111111111111111111",
    "holders": "28,150",
    "marketCap": "$53.0M",
    "lastBuy": "10 buys/1h",
    "description": "PumpAI33 — curated placeholder. Replace with real data when you update the list."
  },
  {
    "name": "SolAI32",
    "symbol": "SOLAI32",
    "ticker": "$SOLAI32",
    "mint": "Curated0531111111111111111111111111111111111111111",
    "holders": "28,600",
    "marketCap": "$53.8M",
    "lastBuy": "10 buys/1h",
    "description": "SolAI32 — curated placeholder. Replace with real data when you update the list."
  },
  {
    "name": "DogeAI31",
    "symbol": "DOGEAI31",
    "ticker": "$DOGEAI31",
    "mint": "Curated0521111111111111111111111111111111111111111",
    "holders": "29,050",
    "marketCap": "$54.6M",
    "lastBuy": "10 buys/1h",
    "description": "DogeAI31 — curated placeholder. Replace with real data when you update the list."
  },
  {
    "name": "MoonAI",
    "symbol": "MOONAI",
    "ticker": "$MOONAI",
    "mint": "Curated0511111111111111111111111111111111111111111",
    "holders": "29,500",
    "marketCap": "$55.5M",
    "lastBuy": "10 buys/1h",
    "description": "MoonAI — curated placeholder. Replace with real data when you update the list."
  },
  {
    "name": "BasedFi",
    "symbol": "BASEDFI",
    "ticker": "$BASEDFI",
    "mint": "Curated0501111111111111111111111111111111111111111",
    "holders": "29,950",
    "marketCap": "$56.4M",
    "lastBuy": "10 buys/1h",
    "description": "BasedFi — curated placeholder. Replace with real data when you update the list."
  },
  {
    "name": "HyperFi",
    "symbol": "HYPERFI",
    "ticker": "$HYPERFI",
    "mint": "Curated0491111111111111111111111111111111111111111",
    "holders": "30,400",
    "marketCap": "$57.2M",
    "lastBuy": "10 buys/1h",
    "description": "HyperFi — curated placeholder. Replace with real data when you update the list."
  },
  {
    "name": "UltraFi",
    "symbol": "ULTRAFI",
    "ticker": "$ULTRAFI",
    "mint": "Curated0481111111111111111111111111111111111111111",
    "holders": "30,850",
    "marketCap": "$58.1M",
    "lastBuy": "11 buys/1h",
    "description": "UltraFi — curated placeholder. Replace with real data when you update the list."
  },
  {
    "name": "MegaFi",
    "symbol": "MEGAFI",
    "ticker": "$MEGAFI",
    "mint": "Curated0471111111111111111111111111111111111111111",
    "holders": "31,300",
    "marketCap": "$58.9M",
    "lastBuy": "11 buys/1h",
    "description": "MegaFi — curated placeholder. Replace with real data when you update the list."
  },
  {
    "name": "TurboFi",
    "symbol": "TURBOFI",
    "ticker": "$TURBOFI",
    "mint": "Curated0461111111111111111111111111111111111111111",
    "holders": "31,750",
    "marketCap": "$59.8M",
    "lastBuy": "11 buys/1h",
    "description": "TurboFi — curated placeholder. Replace with real data when you update the list."
  },
  {
    "name": "MemeFi",
    "symbol": "MEMEFI",
    "ticker": "$MEMEFI",
    "mint": "Curated0451111111111111111111111111111111111111111",
    "holders": "32,200",
    "marketCap": "$60.6M",
    "lastBuy": "11 buys/1h",
    "description": "MemeFi — curated placeholder. Replace with real data when you update the list."
  },
  {
    "name": "PumpFi",
    "symbol": "PUMPFI",
    "ticker": "$PUMPFI",
    "mint": "Curated0441111111111111111111111111111111111111111",
    "holders": "32,650",
    "marketCap": "$61.5M",
    "lastBuy": "11 buys/1h",
    "description": "PumpFi — curated placeholder. Replace with real data when you update the list."
  },
  {
    "name": "SolFi",
    "symbol": "SOLFI",
    "ticker": "$SOLFI",
    "mint": "Curated0431111111111111111111111111111111111111111",
    "holders": "33,100",
    "marketCap": "$62.3M",
    "lastBuy": "11 buys/1h",
    "description": "SolFi — curated placeholder. Replace with real data when you update the list."
  },
  {
    "name": "DogeFi",
    "symbol": "DOGEFI",
    "ticker": "$DOGEFI",
    "mint": "Curated0421111111111111111111111111111111111111111",
    "holders": "33,550",
    "marketCap": "$63.1M",
    "lastBuy": "12 buys/1h",
    "description": "DogeFi — curated placeholder. Replace with real data when you update the list."
  },
  {
    "name": "MoonFi",
    "symbol": "MOONFI",
    "ticker": "$MOONFI",
    "mint": "Curated0411111111111111111111111111111111111111111",
    "holders": "34,000",
    "marketCap": "$64.0M",
    "lastBuy": "12 buys/1h",
    "description": "MoonFi — curated placeholder. Replace with real data when you update the list."
  },
  {
    "name": "BasedCoin",
    "symbol": "BASEDCOIN",
    "ticker": "$BASEDCOIN",
    "mint": "Curated0401111111111111111111111111111111111111111",
    "holders": "34,450",
    "marketCap": "$64.8M",
    "lastBuy": "12 buys/1h",
    "description": "BasedCoin — curated placeholder. Replace with real data when you update the list."
  },
  {
    "name": "HyperCoin",
    "symbol": "HYPERCOIN",
    "ticker": "$HYPERCOIN",
    "mint": "Curated0391111111111111111111111111111111111111111",
    "holders": "34,900",
    "marketCap": "$65.7M",
    "lastBuy": "12 buys/1h",
    "description": "HyperCoin — curated placeholder. Replace with real data when you update the list."
  },
  {
    "name": "UltraCoin",
    "symbol": "ULTRACOIN",
    "ticker": "$ULTRACOIN",
    "mint": "Curated0381111111111111111111111111111111111111111",
    "holders": "35,350",
    "marketCap": "$66.5M",
    "lastBuy": "12 buys/1h",
    "description": "UltraCoin — curated placeholder. Replace with real data when you update the list."
  },
  {
    "name": "MegaCoin",
    "symbol": "MEGACOIN",
    "ticker": "$MEGACOIN",
    "mint": "Curated0371111111111111111111111111111111111111111",
    "holders": "35,800",
    "marketCap": "$67.4M",
    "lastBuy": "12 buys/1h",
    "description": "MegaCoin — curated placeholder. Replace with real data when you update the list."
  },
  {
    "name": "TurboCoin",
    "symbol": "TURBOCOIN",
    "ticker": "$TURBOCOIN",
    "mint": "Curated0361111111111111111111111111111111111111111",
    "holders": "36,250",
    "marketCap": "$68.3M",
    "lastBuy": "13 buys/1h",
    "description": "TurboCoin — curated placeholder. Replace with real data when you update the list."
  },
  {
    "name": "MemeCoin",
    "symbol": "MEMECOIN",
    "ticker": "$MEMECOIN",
    "mint": "Curated0351111111111111111111111111111111111111111",
    "holders": "36,700",
    "marketCap": "$69.1M",
    "lastBuy": "13 buys/1h",
    "description": "MemeCoin — curated placeholder. Replace with real data when you update the list."
  },
  {
    "name": "PumpCoin",
    "symbol": "PUMPCOIN",
    "ticker": "$PUMPCOIN",
    "mint": "Curated0341111111111111111111111111111111111111111",
    "holders": "37,150",
    "marketCap": "$70.0M",
    "lastBuy": "13 buys/1h",
    "description": "PumpCoin — curated placeholder. Replace with real data when you update the list."
  },
  {
    "name": "SolCoin",
    "symbol": "SOLCOIN",
    "ticker": "$SOLCOIN",
    "mint": "Curated0331111111111111111111111111111111111111111",
    "holders": "37,600",
    "marketCap": "$70.8M",
    "lastBuy": "13 buys/1h",
    "description": "SolCoin — curated placeholder. Replace with real data when you update the list."
  },
  {
    "name": "DogeCoin",
    "symbol": "DOGECOIN",
    "ticker": "$DOGECOIN",
    "mint": "Curated0321111111111111111111111111111111111111111",
    "holders": "38,050",
    "marketCap": "$71.7M",
    "lastBuy": "13 buys/1h",
    "description": "DogeCoin — curated placeholder. Replace with real data when you update the list."
  },
  {
    "name": "MoonCoin",
    "symbol": "MOONCOIN",
    "ticker": "$MOONCOIN",
    "mint": "Curated0311111111111111111111111111111111111111111",
    "holders": "38,500",
    "marketCap": "$72.5M",
    "lastBuy": "13 buys/1h",
    "description": "MoonCoin — curated placeholder. Replace with real data when you update the list."
  },
  {
    "name": "BasedInu",
    "symbol": "BASEDINU",
    "ticker": "$BASEDINU",
    "mint": "Curated0301111111111111111111111111111111111111111",
    "holders": "38,950",
    "marketCap": "$73.3M",
    "lastBuy": "14 buys/1h",
    "description": "BasedInu — curated placeholder. Replace with real data when you update the list."
  },
  {
    "name": "HyperInu",
    "symbol": "HYPERINU",
    "ticker": "$HYPERINU",
    "mint": "Curated0291111111111111111111111111111111111111111",
    "holders": "39,400",
    "marketCap": "$74.2M",
    "lastBuy": "14 buys/1h",
    "description": "HyperInu — curated placeholder. Replace with real data when you update the list."
  },
  {
    "name": "UltraInu",
    "symbol": "ULTRAINU",
    "ticker": "$ULTRAINU",
    "mint": "Curated0281111111111111111111111111111111111111111",
    "holders": "39,850",
    "marketCap": "$75.0M",
    "lastBuy": "14 buys/1h",
    "description": "UltraInu — curated placeholder. Replace with real data when you update the list."
  },
  {
    "name": "MegaInu",
    "symbol": "MEGAINU",
    "ticker": "$MEGAINU",
    "mint": "Curated0271111111111111111111111111111111111111111",
    "holders": "40,300",
    "marketCap": "$75.9M",
    "lastBuy": "14 buys/1h",
    "description": "MegaInu — curated placeholder. Replace with real data when you update the list."
  },
  {
    "name": "TurboInu",
    "symbol": "TURBOINU",
    "ticker": "$TURBOINU",
    "mint": "Curated0261111111111111111111111111111111111111111",
    "holders": "40,750",
    "marketCap": "$76.8M",
    "lastBuy": "14 buys/1h",
    "description": "TurboInu — curated placeholder. Replace with real data when you update the list."
  },
  {
    "name": "MemeInu",
    "symbol": "MEMEINU",
    "ticker": "$MEMEINU",
    "mint": "Curated0251111111111111111111111111111111111111111",
    "holders": "41,200",
    "marketCap": "$77.6M",
    "lastBuy": "14 buys/1h",
    "description": "MemeInu — curated placeholder. Replace with real data when you update the list."
  },
  {
    "name": "PumpInu",
    "symbol": "PUMPINU",
    "ticker": "$PUMPINU",
    "mint": "Curated0241111111111111111111111111111111111111111",
    "holders": "41,650",
    "marketCap": "$78.5M",
    "lastBuy": "15 buys/1h",
    "description": "PumpInu — curated placeholder. Replace with real data when you update the list."
  },
  {
    "name": "SolInu",
    "symbol": "SOLINU",
    "ticker": "$SOLINU",
    "mint": "Curated0231111111111111111111111111111111111111111",
    "holders": "42,100",
    "marketCap": "$79.3M",
    "lastBuy": "15 buys/1h",
    "description": "SolInu — curated placeholder. Replace with real data when you update the list."
  },
  {
    "name": "DogeInu",
    "symbol": "DOGEINU",
    "ticker": "$DOGEINU",
    "mint": "Curated0221111111111111111111111111111111111111111",
    "holders": "42,550",
    "marketCap": "$80.2M",
    "lastBuy": "15 buys/1h",
    "description": "DogeInu — curated placeholder. Replace with real data when you update the list."
  },
  {
    "name": "MoonInu",
    "symbol": "MOONINU",
    "ticker": "$MOONINU",
    "mint": "Curated0211111111111111111111111111111111111111111",
    "holders": "43,000",
    "marketCap": "$81.0M",
    "lastBuy": "15 buys/1h",
    "description": "MoonInu — curated placeholder. Replace with real data when you update the list."
  },
  {
    "name": "RETARDIO",
    "symbol": "RETARDIO",
    "ticker": "$RETARDIO",
    "mint": "Curated0201111111111111111111111111111111111111111",
    "holders": "22,400",
    "marketCap": "$28M",
    "lastBuy": "7 buys/1h",
    "description": "RETARDIO — edit this list in src/lib/trending-coins.ts"
  },
  {
    "name": "SIGMA",
    "symbol": "SIGMA",
    "ticker": "$SIGMA",
    "mint": "Curated0191111111111111111111111111111111111111111",
    "holders": "36,700",
    "marketCap": "$51M",
    "lastBuy": "13 buys/1h",
    "description": "SIGMA — edit this list in src/lib/trending-coins.ts"
  },
  {
    "name": "VINE",
    "symbol": "VINE",
    "ticker": "$VINE",
    "mint": "Curated0181111111111111111111111111111111111111111",
    "holders": "41,500",
    "marketCap": "$58M",
    "lastBuy": "14 buys/1h",
    "description": "VINE — edit this list in src/lib/trending-coins.ts"
  },
  {
    "name": "MICHI",
    "symbol": "MICHI",
    "ticker": "$MICHI",
    "mint": "Curated0171111111111111111111111111111111111111111",
    "holders": "28,900",
    "marketCap": "$35M",
    "lastBuy": "8 buys/1h",
    "description": "MICHI — edit this list in src/lib/trending-coins.ts"
  },
  {
    "name": "ACT",
    "symbol": "ACT",
    "ticker": "$ACT",
    "mint": "Curated0161111111111111111111111111111111111111111",
    "holders": "87,600",
    "marketCap": "$120M",
    "lastBuy": "22 buys/1h",
    "description": "ACT — edit this list in src/lib/trending-coins.ts"
  },
  {
    "name": "MELANIA",
    "symbol": "MELANIA",
    "ticker": "$MELANIA",
    "mint": "Curated0151111111111111111111111111111111111111111",
    "holders": "198,400",
    "marketCap": "$310M",
    "lastBuy": "48 buys/1h",
    "description": "MELANIA — edit this list in src/lib/trending-coins.ts"
  },
  {
    "name": "PENGU",
    "symbol": "PENGU",
    "ticker": "$PENGU",
    "mint": "Curated0141111111111111111111111111111111111111111",
    "holders": "445,600",
    "marketCap": "$1.1B",
    "lastBuy": "132 buys/1h",
    "description": "PENGU — edit this list in src/lib/trending-coins.ts"
  },
  {
    "name": "AI16Z",
    "symbol": "AI16Z",
    "ticker": "$AI16Z",
    "mint": "Curated0131111111111111111111111111111111111111111",
    "holders": "143,200",
    "marketCap": "$275M",
    "lastBuy": "41 buys/1h",
    "description": "AI16Z — edit this list in src/lib/trending-coins.ts"
  },
  {
    "name": "CHILLGUY",
    "symbol": "CHILLGUY",
    "ticker": "$CHILLGUY",
    "mint": "Curated0121111111111111111111111111111111111111111",
    "holders": "76,400",
    "marketCap": "$95M",
    "lastBuy": "18 buys/1h",
    "description": "CHILLGUY — edit this list in src/lib/trending-coins.ts"
  },
  {
    "name": "FARTCOIN",
    "symbol": "FARTCOIN",
    "ticker": "$FARTCOIN",
    "mint": "Curated0111111111111111111111111111111111111111111",
    "holders": "267,300",
    "marketCap": "$520M",
    "lastBuy": "74 buys/1h",
    "description": "FARTCOIN — edit this list in src/lib/trending-coins.ts"
  },
  {
    "name": "PNUT",
    "symbol": "PNUT",
    "ticker": "$PNUT",
    "mint": "Curated0101111111111111111111111111111111111111111",
    "holders": "98,700",
    "marketCap": "$180M",
    "lastBuy": "29 buys/1h",
    "description": "PNUT — edit this list in src/lib/trending-coins.ts"
  },
  {
    "name": "GOAT",
    "symbol": "GOAT",
    "ticker": "$GOAT",
    "mint": "Curated0091111111111111111111111111111111111111111",
    "holders": "221,400",
    "marketCap": "$390M",
    "lastBuy": "56 buys/1h",
    "description": "GOAT — edit this list in src/lib/trending-coins.ts"
  },
  {
    "name": "MEW",
    "symbol": "MEW",
    "ticker": "$MEW",
    "mint": "Curated0081111111111111111111111111111111111111111",
    "holders": "156,900",
    "marketCap": "$245M",
    "lastBuy": "34 buys/1h",
    "description": "MEW — edit this list in src/lib/trending-coins.ts"
  },
  {
    "name": "BRETT",
    "symbol": "BRETT",
    "ticker": "$BRETT",
    "mint": "Curated0071111111111111111111111111111111111111111",
    "holders": "334,800",
    "marketCap": "$680M",
    "lastBuy": "88 buys/1h",
    "description": "BRETT — edit this list in src/lib/trending-coins.ts"
  },
  {
    "name": "MOG",
    "symbol": "MOG",
    "ticker": "$MOG",
    "mint": "Curated0061111111111111111111111111111111111111111",
    "holders": "187,200",
    "marketCap": "$310M",
    "lastBuy": "45 buys/1h",
    "description": "MOG — edit this list in src/lib/trending-coins.ts"
  },
  {
    "name": "POPCAT",
    "symbol": "POPCAT",
    "ticker": "$POPCAT",
    "mint": "Curated0051111111111111111111111111111111111111111",
    "holders": "298,500",
    "marketCap": "$420M",
    "lastBuy": "67 buys/1h",
    "description": "POPCAT — edit this list in src/lib/trending-coins.ts"
  },
  {
    "name": "BONK",
    "symbol": "BONK",
    "ticker": "$BONK",
    "mint": "Curated0041111111111111111111111111111111111111111",
    "holders": "892,400",
    "marketCap": "$1.8B",
    "lastBuy": "201 buys/1h",
    "description": "BONK — edit this list in src/lib/trending-coins.ts"
  },
  {
    "name": "WIF",
    "symbol": "WIF",
    "ticker": "$WIF",
    "mint": "Curated0031111111111111111111111111111111111111111",
    "holders": "521,100",
    "marketCap": "$1.2B",
    "lastBuy": "156 buys/1h",
    "description": "WIF — edit this list in src/lib/trending-coins.ts"
  },
  {
    "name": "PEPE",
    "symbol": "PEPE",
    "ticker": "$PEPE",
    "mint": "Curated0021111111111111111111111111111111111111111",
    "holders": "412,300",
    "marketCap": "$890M",
    "lastBuy": "92 buys/1h",
    "description": "PEPE — edit this list in src/lib/trending-coins.ts"
  },
  {
    "name": "TRUMP",
    "symbol": "TRUMP",
    "ticker": "$TRUMP",
    "mint": "Curated0011111111111111111111111111111111111111111",
    "holders": "645,788",
    "marketCap": "$2.04B",
    "lastBuy": "108 buys/1h",
    "description": "TRUMP — edit this list in src/lib/trending-coins.ts"
  }
];

export const PAGE_SIZE = 20;

export function getCoinList(tab: string): StaticTrendingCoin[] {
  return tab === "new" ? NEW_COINS : TRENDING_COINS;
}

export function getCoinPage(tab: string, offset: number) {
  const all = getCoinList(tab).map((coin) => ({
    ...coin,
    imageUri: coin.imageUri || resolveTokenImageUrl(coin.symbol, coin.mint),
  }));
  const pageSize = PAGE_SIZE;
  const page = Math.floor(offset / pageSize);
  const pageCount = Math.max(1, Math.ceil(all.length / pageSize));
  const safeOffset = Math.max(0, Math.min(offset, Math.max(0, all.length - pageSize)));
  return {
    tokens: all.slice(safeOffset, safeOffset + pageSize),
    total: all.length,
    offset: safeOffset,
    pageSize,
    page,
    pageCount,
  };
}
