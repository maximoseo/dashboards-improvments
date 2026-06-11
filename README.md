# DashAudit

DashAudit is a Next.js + Supabase app for read-only dashboard audits with evidence-backed findings.

## v1 ground rules
- No mock, seed, or demo data.
- Findings require real evidence; empty states remain empty.
- No paid OpenAI/Anthropic SDK calls. AI goes through the worker multi-CLI adapter only.
- Secrets are encrypted and never returned to clients.
- Mobile-first UI is a hard requirement.

## Apps
- `apps/web`: Next.js 14 App Router web app.
- `apps/worker`: Node 20 worker placeholder for scan execution.

## Local commands
```bash
pnpm install
pnpm lint
pnpm typecheck
pnpm test
pnpm build
pnpm mobile:check
```
