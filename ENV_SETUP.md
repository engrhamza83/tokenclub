# Environment Variables (Next.js on Vercel)

Create `.env.local` for local development. Set the same values in **Vercel → Project → Settings → Environment Variables** (Production + Preview).

## Public (safe in browser)

```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_REOWN_PROJECT_ID=your-reown-project-id
NEXT_PUBLIC_PLATFORM_FEE_WALLET=6nZ3TZhPcr4wLYFXa5jQeSB1YYKF9tozfuxzYgGPau23
NEXT_PUBLIC_SOLANA_NETWORK=mainnet-beta
```

## Server-only (do NOT use NEXT_PUBLIC_)

```env
RPC_PROVIDER=auto
HELIUS_API_KEY=
HELIUS_API_KEY_MAINNET=
HELIUS_API_KEY_DEVNET=
ALCHEMY_API_KEY=
ALCHEMY_API_KEY_MAINNET=
ALCHEMY_API_KEY_DEVNET=
JUPITER_API_KEY=
JUPITER_API_BASE_URL=https://api.jup.ag
PINATA_JWT=
```

Client traffic uses:
- `POST /api/rpc?network=mainnet-beta|devnet` (legacy alias: `/api/wire?cluster=…`)
- `/api/jupiter/…`
- `/api/pinata/file` and `/api/pinata/metadata`
- `GET /api/pump/trending` (Copy Trend; free pump.fun, Jupiter, DexScreener, GeckoTerminal — no API key)

## Reown allowed origins

In [Reown Cloud](https://cloud.reown.com) allowlist:
- `https://www.tokenclub.fun`
- `https://tokenclub.fun`
- `https://*.vercel.app` (or your specific Vercel preview URLs)
- `http://localhost:3000`

## Smoke test after deploy

```bash
curl -X POST "https://www.tokenclub.fun/api/rpc?network=mainnet-beta" \
  -H "Content-Type: application/json" \
  --data '{"jsonrpc":"2.0","id":1,"method":"getHealth"}'
```
