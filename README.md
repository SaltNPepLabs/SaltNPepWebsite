# SALT N’ PEP

Next.js storefront-style site for a research peptide catalog. The site presents product cards, product detail pages, science/FAQ content, and a client-side cart drawer.

## Repository

The company homebase is [SaltNPepLabs/SaltNPepWebsite](https://github.com/SaltNPepLabs/SaltNPepWebsite), with `main` as the working branch.

```bash
git clone https://github.com/SaltNPepLabs/SaltNPepWebsite.git
cd SaltNPepWebsite
npm ci
```

The existing Windows workspace remains `C:\Users\kalec\peptide-store`. Its `origin` points to the company repository; `legacy` retains the previous personal repository as a migration fallback. The full Git history and completed local analytics work are preserved. Local environment files, databases, research caches, generated exports, and agent logs stay outside Git; use the committed environment examples for a fresh setup.

## Stack

- Next.js 16 App Router
- React 19
- TypeScript
- Tailwind CSS v4
- Static export configured through `next.config.ts`

## Local Commands

```bash
npm run dev -- --webpack
npm run lint
npm run build
npm test
```

Use `npm run dev -- --webpack` on this Windows machine. The default Turbopack dev server previously panicked while serving this project locally.

For fast UX review, run `npm run preview` and open http://127.0.0.1:3016. This builds and serves the static export, so first visits do not wait for development compilation. Rebuild after editing. Run `node --test scripts/preview-static.test.mjs` after building to verify the preview server. The credential-free checkout demo remains `npm run checkout:preview` at http://127.0.0.1:3015; its development-only guard is preserved.

## Design Direction

The active visual system follows the owner-provided SALT N’ PEP vial reference: warm ivory, charcoal, stone neutrals, restrained sans-serif typography with editorial serif italics, textured surfaces, and locally bundled brand imagery. Responsive layouts support 320px viewports.

## Docs

- [Project Context](docs/PROJECT_CONTEXT.md)
- [Decisions](docs/DECISIONS.md)
- [Next Steps](docs/NEXT_STEPS.md)
- [Worklog](docs/WORKLOG.md)
- [Docs Index](docs/index.md)

## Deployment

Connect hosting to `SaltNPepLabs/SaltNPepWebsite` on `main`. The project is configured for static export. `npm run build` emits `out/`; use that directory as the Render Static Site publish directory.

Checkout uses a separate Node 24 API and persistent SQLite database. See [Checkout setup and operations](docs/CHECKOUT.md) for environments, Stripe webhooks, staff review, Venmo reconciliation, and production deployment. Live payments are disabled until configured; do not deploy secrets with the static site.

## Content Boundary

Keep product copy research-oriented. Do not add medical treatment, diagnosis, dosing, or outcome claims without explicit reviewed source material and user approval.
