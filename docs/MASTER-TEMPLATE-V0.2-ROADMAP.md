# WEBINOW Master Template v0.2 Roadmap

## Goal

Turn the current Comfort SOS implementation into a reusable, client-agnostic local-service website engine that can support prospect previews now and production sites later without client-specific code changes.

## v0.2A — Config Contract

Status: implemented and reviewed on `refactor/site-config-v0.2`.

Includes:

- schema versioning
- template versioning
- stable prospect identifier
- `local-service` site archetype
- locale
- structured business category and Schema.org business type
- structured address
- reusable feature flags
- centralized primary/secondary conversion actions
- expanded SEO config
- stable service IDs/slugs
- proposal/production helpers


## Version Gate — Mandatory Review Before Progressing

Before starting any new version or sub-version:

1. review the previous implementation against its definition of done;
2. check for schema drift, duplicated data, dead flags, hardcoded client data, unsafe assumptions, and obvious regressions;
3. correct defects immediately when the fix is low-cost and prevents technical debt;
4. only then continue to the next version.

Do not knowingly carry fixable defects forward just to keep momentum. Validation should stay lightweight and pragmatic: enough to protect scalability without blocking outreach.

## v0.2B — Remove Client Hardcodes

Status: validated on `refactor/site-config-v0.2` — structural checks, TypeScript, production build, Cloudflare/Wrangler runtime, and proposal SEO behavior all passed.

Move every client-specific string or action out of React routes and into config.

Priority targets:

- service section headings/copy
- wide CTA section
- service-area labels/location
- contact copy
- license/business facts
- booking provider references
- all CTA links

Definition of done:

Changing only `site.config.json` can render a different local-service business without touching route code.

## v0.2C — SEO + Preview Safety

Status: implemented, structurally reviewed, type-checked, and production-built successfully on `refactor/site-config-v0.2`.

Implemented:

- proposal => `noindex, nofollow`
- production => `index, follow`
- canonical in production only
- production config requires a canonical URL
- Open Graph image/url support
- locale-driven `html lang`
- LocalBusiness JSON-LD with an allowlisted Schema.org type when a physical address is available
- Organization JSON-LD fallback when no physical address is available
- crawlable `robots.txt` so proposal `noindex` can be read by crawlers
- duplicate page-level SEO metadata removed from the home route

Deferred deliberately:

- sitemap generation stays in the near-term backlog until production/multi-page output exists, to avoid publishing preview URLs or maintaining a premature static sitemap

## v0.2D — Cross-Vertical Validation

Validate the same template using config-only changes for:

1. HVAC
2. Roofing
3. Plumbing

No React changes should be required.

## Near-Term Backlog

Implement after first outreach / first commercial signal unless a client requires it sooner:

- individual service SEO pages
- service-area/city SEO pages
- automated sitemap generation for multi-page sites
- Google Search Console connection
- GA4 / Microsoft Clarity
- Google Business Profile integration
- review synchronization
- lead-form backend / CRM integration
- multi-location architecture
- reusable portfolio/project section
- additional visual foundations / archetypes
- automated image sourcing and optimization
- conversion event tracking
- production deployment automation

## Operating Principle

Every new capability must improve at least one of:

- personalization
- conversion
- SEO foundation
- proof/trust
- scalability
- speed to outreach

If it does not help WEBINOW reach qualified prospect -> approved preview -> outreach -> reply -> meeting -> sale, it should not block the current release.


## Validation Record — 2026-10-05

Validated locally on `refactor/site-config-v0.2`:

- `npm ci` -> success
- `npx tsc --noEmit` -> success, no TypeScript errors
- `npm run build` -> success for client, SSR, and Nitro/Cloudflare output
- dependency audit -> 0 vulnerabilities

Non-blocking warnings observed:

- `vite-tsconfig-paths` is provided by `@lovable.dev/vite-tanstack-config`; do not remove or duplicate it casually because the project wrapper owns that plugin setup
- npm deprecation notices for transitive/current packages should be handled as maintenance, not during the sales-critical validation path
- Nitro's `inlineDynamicImports` warning is build-system noise while code splitting is enabled; build output completed successfully

Next gate:

- runtime smoke test on desktop/mobile
- config-only cross-vertical swap
