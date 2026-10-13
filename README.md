# TokenClub - Solana Token Platform

A comprehensive platform for creating, managing, and trading Solana tokens.

**Public source for security review:** clone this repo — do not send GitHub PATs or API tokens. See [SECURITY_REVIEW.md](SECURITY_REVIEW.md) for fee wallet, connect/sign flow, and reviewer file map.

Live sites: [tokenclub.fun](https://tokenclub.fun) · [www.tokenclub.fun](https://www.tokenclub.fun) · [app.tokenclub.fun](https://app.tokenclub.fun)  
Contact: [dev@tokenclub.fun](mailto:dev@tokenclub.fun)

## Features

- **Token Creation**: Create fully compliant SPL tokens on Solana
- **Token Swapping**: Best price routing across all Solana DEXs
- **Liquidity Management**: Initialize pools, add/remove liquidity
- **Security Tools**: Wallet cleanup and account management
- **Portfolio Tracking**: Monitor your tokens and LP positions

## Tech Stack

- **Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Blockchain**: Solana Web3.js
- **Wallet**: Reown (WalletConnect) AppKit
- **Deployment**: Vercel (Next.js)

## Getting Started

### Prerequisites

- Node.js 20.11.0 or higher
- npm or yarn

### Installation

```bash
npm install
```

### Environment Variables

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_REOWN_PROJECT_ID=your_project_id
NEXT_PUBLIC_SITE_URL=https://www.tokenclub.fun
NEXT_PUBLIC_PLATFORM_FEE_WALLET=your_fee_wallet

# Server-only (do not expose in NEXT_PUBLIC_)
HELIUS_API_KEY_MAINNET=your_mainnet_key
HELIUS_API_KEY_DEVNET=your_devnet_key
JUPITER_API_KEY=your_jupiter_key
PINATA_JWT=your_pinata_jwt
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build

```bash
npm run build
```

### Production

```bash
npm start
```

## Deployment

Primary host is **Vercel**. See `ENV_SETUP.md` for environment variables.

1. Import the GitHub repo in [Vercel](https://vercel.com) (Framework: Next.js).
2. Set env vars from `.env.example` / `ENV_SETUP.md` for Production + Preview.
3. Deploy (`vercel --prod` or Git push). Point `tokenclub.fun` DNS to Vercel.
4. Allowlist the production + `*.vercel.app` origins in Reown Cloud.

Legacy Cloudflare Pages scripts (`pages:deploy`, `cf:*`) remain for rollback only.

## Project Structure

```
├── public/              # Static assets
├── src/
│   ├── components/      # React components
│   ├── contexts/        # React contexts (Wallet, Network)
│   ├── lib/             # Utility functions and services
│   ├── modules/         # Feature modules
│   ├── pages/           # Next.js pages
│   └── ...
├── next.config.js       # Next.js configuration
├── wrangler.toml        # Legacy Cloudflare Pages config (rollback only)
├── tailwind.config.js   # Tailwind CSS configuration
└── vercel.json          # Vercel headers / build hints
```

## Network Switching

The platform supports both Mainnet and Devnet. Use `Ctrl+Shift+E` to toggle between networks (admin feature).

## License

MIT
