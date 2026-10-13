# TokenClub — security review notes (Phantom / Blowfish / Blockaid)

Public source for domain allowlist review. **Do not send GitHub PATs or API keys.** Clone this repository instead:

https://github.com/engrhamza83/tokenclub

## Live hosts

- https://tokenclub.fun
- https://www.tokenclub.fun
- https://app.tokenclub.fun

## Operator contact

- Email: [dev@tokenclub.fun](mailto:dev@tokenclub.fun)
- GitHub: [engrhamza83/tokenclub](https://github.com/engrhamza83/tokenclub)

## What this app is

TokenClub is a non-custodial Solana dApp (token creation, Jupiter swaps, Meteora liquidity, portfolio/security tools). Users connect an **external** wallet via [Reown AppKit](https://reown.com/appkit) (WalletConnect). The server never receives private keys or seed phrases.

## Disclosed platform fee wallet

All platform fees are explicit `SystemProgram.transfer` (or equivalent) instructions to:

`6nZ3TZhPcr4wLYFXa5jQeSB1YYKF9tozfuxzYgGPau23`

Defined in `src/lib/config.ts` (`DEFAULT_PLATFORM_FEE_WALLET` / `getPlatformFeeWallet()`). Override via `NEXT_PUBLIC_PLATFORM_FEE_WALLET`.

## Reviewer file map

| Concern | Where to look |
|--------|----------------|
| Wallet connect (no in-app key custody) | `src/contexts/WalletContext.tsx` — `useAppKit`, `walletProvider.signTransaction`, then `connection.sendRawTransaction` |
| Fee amounts | `src/lib/config.ts` — `PLATFORM_FEES` |
| Token creation fee transfer | `src/lib/token-creation-full.ts` |
| Swap fee | `src/lib/jupiter.ts` |
| Liquidity fees | `src/lib/meteora-full.ts` |
| Account-close fee | `src/modules/SecurityModule.tsx` |
| RPC keys stay server-side | `src/pages/api/rpc.ts`, `src/lib/server/secrets.ts` |
| Jupiter API key server-side | `src/pages/api/jupiter/[...slug].ts` |
| Pinata JWT server-side | `src/pages/api/pinata/` |
| Privacy copy (no seed collection) | `src/components/PrivacyPolicyPage.tsx`, `src/pages/privacy.tsx` |

## What we do not do

- Collect, log, or store seed phrases or private keys
- Ask the user to paste a secret key into the product
- Hide fee transfers; amounts are in `PLATFORM_FEES` and the recipient is the wallet above

Server secrets (`HELIUS_*`, `JUPITER_API_KEY`, `PINATA_JWT`) are **not** in this repo. See `.env.example` for names only.

## Verification we can complete on request

- DNS TXT or `/.well-known` challenge for domain ownership
- Read-only GitHub collaborator invite to an account **you** specify (never a PAT from us)
- Signed message from the fee wallet above
