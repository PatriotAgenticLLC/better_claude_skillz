---
name: seo-kit
description: >
  Generate a complete SEO/GEO implementation kit for JS-rendered websites (Lovable, Vercel, Bolt, React SPAs, Next.js).
  Produces a Cloudflare Worker (prerender + configurable robots.txt + spec-compliant llms.txt + JSON-LD schema injection
  + optional meta tag injection), sitemap.xml, implementation checklist, and setup guide.
  Use when: user says "generate SEO kit", "set up SEO", "fix SEO for my site", "make my site indexable",
  "GEO optimization", "AI search visibility", "prerender setup", "schema markup", or mentions that their
  JS-rendered site isn't being indexed by Google or AI crawlers.
---

# SEO/GEO Kit Generator (v2)

> Originally created by [AAA Accelerator](https://aaaaccelerator.com).
> v2 enhanced by Nick Martin, [PatriotAgentic LLC](https://patriotagentic.com).

Generate a production-ready SEO/GEO kit for JS-rendered websites. Proven pattern deployed on live sites.

## Architecture

```
Browser/Human --> Cloudflare Worker --> Upstream Origin
Bot/AI Crawler -> Cloudflare Worker --> Prerender.io --> Full HTML returned
Static SEO files (/sitemap.xml, /robots.txt, /llms.txt) served by Worker
Schema markup injected into HTML via Cloudflare HTMLRewriter
Optional: Meta tags (OG, canonical, Twitter Cards) injected via HTMLRewriter
```

## Workflow

### Phase 1: Gather Info

Collect from the user (ask if not provided):

| Field | Example | Required |
|-------|---------|----------|
| Domain | `example.com` | Yes |
| Upstream URL | `https://my-app.example.app` | Yes |
| Prerender.io token | `your-prerender-token-here` | Yes |
| Business name | `Acme Ltd` | Yes |
| Business description | One-line summary | Yes |
| Services (list) | Name + short description each | Yes |
| Contact (email, phone, address) | Full details | Yes |
| Founder/team names + titles | For Person schema | Yes |
| Site routes | List of live pages/paths | Yes |
| AI crawler policy | Allow All / Search Only / Custom | Yes |
| Opening hours | e.g. Mon-Fri 9-17 | Optional |
| Geo coordinates | lat/lng | Optional |
| Social media URLs | LinkedIn, X, etc. | Optional |
| OG image URL | `https://example.com/og-image.png` | Optional |
| Key use cases | For llms.txt sections | Optional |

### Phase 2: Generate the Kit

Create an output directory (e.g. `seo-kit/`) with these files:

#### 1. Cloudflare Worker (`worker.js`)

Read `assets/worker-template.js` and customise by replacing all `__PLACEHOLDER__` values:
- Build `SITEMAP_XML` from the user's route list
- Build `ROBOTS_TXT` using the user's AI crawler policy preference — see `references/robots-txt-template.md` for the three presets (Allow All, Search Only, Custom). Replace `__AI_CRAWLER_POLICY__` and `__AI_CRAWLER_RULES__` accordingly.
- Build spec-compliant `LLMS_TXT` with H1, blockquote, H2 sections (Services, Use Cases, Key Facts, Contact, Optional) from business info
- Build schema objects from gathered info — see `references/schema-patterns.md`
- Build `getSchemasForPath()` mapping each route to appropriate schemas
- Optionally enable MetaInjector if user wants OG/canonical injection — see `references/meta-injection-patterns.md`. Uncomment the MetaInjector class and its usage in handleRequest(), then customise `getMetaForPath()` with route-specific meta data.

#### 2. Checklist (`checklist.md`)

Read `references/checklist-template.md` and customise with the user's domain.

#### 3. Setup Guide (`setup-guide.md`)

Deployment instructions:
1. Move DNS to Cloudflare
2. Remove custom domain from hosting platform (prevents redirect loops)
3. Create Cloudflare Worker (`seo-prerender`), add secrets (`PRERENDER_TOKEN`, `ORIGIN_URL`)
4. Paste worker code, deploy
5. Attach custom domains (root + www)
6. **Disable Cloudflare "Managed robots.txt"** (Security > Bots > AI Crawl Control) — blocks AI crawlers by default
7. **Configure AI crawlers** per user's chosen policy in AI Crawl Control
8. Set SSL/TLS to Full (strict)
9. Verify Google Search Console (DNS TXT record)
10. Submit sitemap
11. Test with `curl -A "googlebot" https://domain.com`

### Phase 3: Verify

After user deploys, run:

```bash
curl -s https://DOMAIN/sitemap.xml | head -10        # Sitemap served
curl -s https://DOMAIN/robots.txt                      # Clean, shows crawler groups
curl -s https://DOMAIN/robots.txt | grep -c "AI Crawler"  # AI section present
curl -s https://DOMAIN/llms.txt                        # Spec-compliant (H1 + blockquote)
curl -s https://DOMAIN/llms.txt | head -5              # Should show H1 + blockquote
curl -A "googlebot" https://DOMAIN | head -50          # Full rendered HTML
curl -s https://DOMAIN/ | grep -c 'ld+json'           # Schema count > 0
curl -s -o /dev/null -w "%{http_code}" https://DOMAIN  # HTTP 200, no loops
```

## Key Gotchas

- **Cloudflare Managed robots.txt**: Blocks AI crawlers by default. Must disable under Security > Bots > AI Crawl Control.
- **Redirect loops**: Custom domain configured in BOTH hosting platform AND Cloudflare. Remove from hosting first.
- **Worker secret names**: Must use underscore (`PRERENDER_TOKEN`), not space.
- **SSL mode**: Must be "Full" or "Full (strict)" — "Flexible" causes loops.
- **HTMLRewriter**: Cloudflare Workers only. Uses `element.prepend()` on `<head>` tag.
- **AI crawler trade-off**: Allowing AI crawlers improves ChatGPT/Perplexity/Claude visibility but content may be used for model training. Default to "Search Only" preset for client work.
- **Duplicate meta tags**: If SPA already sets OG tags client-side, don't enable MetaInjector (creates duplicates).

## References

- **Schema patterns**: `references/schema-patterns.md` — JSON-LD templates for Organization, LocalBusiness, Person, FAQ, Breadcrumb, WebApplication, Product, HowTo
- **Checklist template**: `references/checklist-template.md` — Implementation checklist with all priorities
- **Worker template**: `assets/worker-template.js` — Complete Cloudflare Worker with placeholders to customise
- **Robots.txt configuration**: `references/robots-txt-template.md` — Crawler groups, trade-offs, and three preset configurations
- **Meta injection patterns**: `references/meta-injection-patterns.md` — HTMLRewriter patterns for OG, canonical, Twitter Cards
