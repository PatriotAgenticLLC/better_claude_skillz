# SEO Kit (v2)

> Originally created by [AAA Accelerator](https://aaaaccelerator.com).
> v2 enhanced by Nick Martin, [PatriotAgentic LLC](https://patriotagentic.com).

**Make your JS-rendered site visible to Google and AI search engines.**

Most sites built with Lovable, Bolt, Vercel, React, Next.js, or any JS-rendered framework are invisible to search engines because the content is rendered client-side with JavaScript. Google sees a blank page. AI crawlers (ChatGPT, Perplexity, Claude) see nothing.

This module fixes that in one session.

## What It Does

- Deploys a **Cloudflare Worker** that serves pre-rendered HTML to search bots via Prerender.io
- Generates **sitemap.xml**, **robots.txt**, and **llms.txt** served directly by the Worker
- Configurable **robots.txt** with separate controls for search engines, AI crawlers, and social bots
- Spec-compliant **llms.txt** (llmstxt.org format) for AI search discovery
- Injects **JSON-LD schema markup** (Organization, LocalBusiness, Person, FAQ, Breadcrumbs, WebApplication, Product, HowTo) into every page
- Optional **meta tag injection** (canonical URLs, Open Graph, Twitter Cards) via Cloudflare HTMLRewriter
- Expanded **schema markup** for SaaS/AI businesses (WebApplication, Product, HowTo)
- Walks you through **Google Search Console** verification and sitemap submission
- Manages Cloudflare's **AI crawler controls** with documented trade-offs

## What You Need

- A live website on any JS-rendered platform (Lovable, Vercel, Bolt, React, Next.js, etc.)
- A custom domain you own
- A free Cloudflare account
- A free Prerender.io account (250 renders/month free)
- ~45 minutes

## How to Use

The skill is globally installed. Claude will invoke it when you mention SEO setup, site indexability, or related topics. You can also trigger it directly by describing what you need:

> "Set up SEO for my site" / "Make my site indexable" / "Fix SEO for my JS app"

Claude will ask for your business details, generate everything, and walk you through deployment step by step.

## What You Get

| File | Purpose |
|------|---------|
| `worker.js` | Cloudflare Worker — prerender, SEO files, schema injection |
| `checklist.md` | Prioritised implementation checklist |
| `setup-guide.md` | Step-by-step deployment instructions |

### Reference Files (in skill)

| File | Purpose |
|------|---------|
| `references/schema-patterns.md` | JSON-LD templates for all schema types |
| `references/robots-txt-template.md` | Crawler groups, trade-offs, and presets |
| `references/meta-injection-patterns.md` | OG, canonical, and Twitter Card patterns |
| `references/checklist-template.md` | Implementation checklist template |

## What's New in v2

- **Security hardening** — fixed stack trace leak, added security headers (nosniff, X-Frame-Options, Referrer-Policy), HTTPS validation on upstream URL
- **Platform-agnostic** — `ORIGIN_URL` replaces Lovable-specific env var, works with any JS-rendered platform
- **Configurable robots.txt** — three crawler groups (search, AI, social) with presets: Allow All, Search Only, Custom
- **llms.txt upgraded** — follows llmstxt.org spec (H1, blockquote, structured H2 sections)
- **Optional meta tag injection** — canonical URLs, Open Graph, Twitter Cards via HTMLRewriter (opt-in)
- **Expanded schema patterns** — WebApplication, Product (multi-type), HowTo for SaaS/AI businesses
- **Global skill placement** — installed once, available across all projects
- **Cache optimization** — HTML response caching with stale-while-revalidate for improved crawl efficiency

## Proven Pattern

This exact setup is running in production on live sites. The Worker handles prerendering, static SEO files, and schema markup injection — all without touching the hosting platform.

---
**Based on:** [AAA Accelerator](https://aaaaccelerator.com)'s SEO kit (v1)
**v2 by:** Nick Martin, Founder - [PatriotAgentic LLC](https://patriotagentic.com)
**License:** MIT
