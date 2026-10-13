# Cloudflare Migration Runbook (Workers + OpenNext)

## 1) Pre-Migration Setup

- Ensure Cloudflare account has Workers enabled.
- Install and authenticate Wrangler locally:
  - `npm i`
  - `npx wrangler login`
- Configure project variables/secrets in Cloudflare:
  - Public vars (`NEXT_PUBLIC_*`) as plain text variables.
  - Server secrets (`HELIUS_*`, `ALCHEMY_*`, `JUPITER_API_KEY`, `PINATA_JWT`) as secrets.
- Ensure Reown project allowed origins include:
  - `https://www.tokenclub.fun`
  - `https://tokenclub.fun`
  - Cloudflare preview URLs
  - `http://localhost:3000`

## 2) Build and Preview

- Build Worker bundle:
  - `npm run cf:build`
- Run local Worker preview:
  - `npm run cf:preview`
- Validate:
  - `POST /api/rpc?cluster=mainnet-beta` returns JSON (not HTML).
  - `POST /api/jupiter/*` and `POST /api/pinata/*` behavior is correct.
  - Wallet connect/sign/send works.

## 3) Edge Protection Baseline (Cloudflare Dashboard)

Create these rules before production cutover.

### WAF Custom Rules

1. **Block invalid methods on RPC**
   - Expression:
     - `(http.request.uri.path eq "/api/rpc" and http.request.method ne "POST")`
   - Action: Block

2. **Block non-JSON RPC payloads**
   - Expression:
     - `(http.request.uri.path eq "/api/rpc" and not starts_with(lower(http.request.headers["content-type"][0]), "application/json"))`
   - Action: Block

3. **Pinata endpoints must be POST**
   - Expression:
     - `(starts_with(http.request.uri.path, "/api/pinata/") and http.request.method ne "POST")`
   - Action: Block

### Rate Limiting Rules

1. `/api/rpc`
   - Threshold: 120 requests / 60s per IP
   - Action: Managed Challenge (or Block if abuse is severe)

2. `/api/pinata/*`
   - Threshold: 20 requests / 60s per IP
   - Action: Managed Challenge

## 4) Canary Cutover

1. Lower DNS TTL (300s) one hour before cutover.
2. Route a small traffic slice (10%) to Cloudflare deployment.
3. Monitor for 15-30 minutes:
   - `/api/rpc` success rate
   - 5xx rate
   - wallet connection/signing
   - latency p95/p99
4. Ramp to 25%, then 50%, then 100% if stable.

## 5) Rollback Criteria and Procedure

### Trigger rollback if any:

- `/api/rpc` 5xx > 2% for 5+ minutes
- wallet transaction failures spike above baseline
- sustained latency degradation > 2x baseline

### Rollback steps:

1. Move traffic back to previous origin (Vercel) in DNS/proxy rules.
2. Keep Cloudflare deployment running for diagnostics.
3. Export logs and identify failing route signature.

## 6) Post-Cutover Hardening

- Rotate API keys after final cutover.
- Tighten WAF thresholds based on real traffic.
- Add alerting:
  - 4xx/5xx spikes
  - sudden request volume jumps
  - RPC upstream 429/403 spikes
- Keep Vercel rollback path for 72 hours, then disable production routing.
