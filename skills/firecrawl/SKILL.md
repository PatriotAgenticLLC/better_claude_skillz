---
name: firecrawl
description: >
  Web scraping, search, and crawling via the Firecrawl CLI. Use when asked to scrape a URL,
  fetch a page, read an article, research a topic online, look something up, search the web,
  find information about a website, check a competitor, pull documentation, extract data from
  a site, get the content of a URL, web search, or fetch any webpage. Handles JS-heavy pages,
  bot-protected sites (Cloudflare), PDFs, and multi-page crawls. Trigger words: scrape, fetch,
  search the web, read this URL, get this page, crawl, research online, competitor research,
  pricing page, docs page, download a site, find articles about, web research, browse, extract
  from this URL.
user-invocable: false
---

# Firecrawl

Web scraping CLI. Turns any URL into clean LLM-ready markdown. 8 commands, all via the `firecrawl` CLI.

## Environment

The CLI reads its API key from the `FIRECRAWL_API_KEY` environment variable. Set your `FIRECRAWL_API_KEY` (via env or your secrets manager, e.g. Doppler) before running any command. If your secrets are injected by a manager, run the CLI inside that manager's shell (for example, `doppler run -- firecrawl ...`).

## Command Reference

| Command | What it does | When to use |
|---------|-------------|-------------|
| `firecrawl scrape "<url>"` | Single page → clean markdown | Have a URL, need its content |
| `firecrawl search "query" --scrape` | Search + pull full page content | No URL yet, need to find + read pages |
| `firecrawl crawl "<url>" --limit N` | Bulk extract entire site section | Need all /docs/ or all /blog/ pages |
| `firecrawl map "<url>"` | Discover all URLs in a domain | Need to find a specific subpage |
| `firecrawl agent "<url>" --prompt "..."` | AI-powered structured extraction | Need structured data (pricing, specs, contacts) |
| `firecrawl browser "<url>"` | Interactive — clicks, forms, scroll | Scrape failed, content needs interaction |
| `firecrawl download "<url>"` | Save entire site as local files | Offline reference, bulk archival |
| `firecrawl credit-usage` | Check credit consumption | Monitor usage |

## Escalation Pattern

Follow this order — start simple, escalate only if needed:

1. **No URL yet** → `firecrawl search "query" --scrape --limit 3`
2. **Have a URL** → `firecrawl scrape "<url>"`
3. **Large site, need a specific subpage** → `firecrawl map "<url>" --search "keyword"` then scrape the match
4. **Need bulk content from a section** → `firecrawl crawl "<url>" --limit 20`
5. **Scrape failed (JS gating, modals, login, pagination)** → `firecrawl browser "<url>"`

## Common Patterns

### Research a topic (no URL)
```bash
firecrawl search "AI agency pricing models 2025" --scrape --limit 5 -o .firecrawl/search-results.json
```

### Scrape a specific page
```bash
firecrawl scrape "https://competitor.com/pricing" -o .firecrawl/competitor-pricing.md
```

### Pull all docs from a site
```bash
firecrawl crawl "https://docs.example.com" --limit 50 -o .firecrawl/docs/
```

### Extract structured data with AI
```bash
firecrawl agent "https://example.com" --prompt "Extract: company name, pricing tiers, features per tier" -o .firecrawl/extracted.json
```

### Find a specific subpage on a large site
```bash
firecrawl map "https://example.com" --search "pricing"
# Then scrape the matching URL
```

### Parallel scrapes (faster)
```bash
firecrawl scrape "<url-1>" -o .firecrawl/1.md &
firecrawl scrape "<url-2>" -o .firecrawl/2.md &
firecrawl scrape "<url-3>" -o .firecrawl/3.md &
wait
```

## Output Rules

- Always write to a temp folder with `-o` — never dump large content inline into the conversation
- Use `.firecrawl/` as a scratch folder for session work
- For content worth keeping, move it somewhere permanent when done
- Never read entire large files at once — use `head -100` or search for specific sections first
- `search --scrape` already fetches full page content — don't re-scrape those same URLs

```bash
# Extract URLs from search output
jq -r '.data.web[].url' .firecrawl/search.json

# Check file size before reading
wc -l .firecrawl/file.md && head -100 .firecrawl/file.md

# Clean up temp files when done
rm -rf .firecrawl/*
```

## Important: Always Quote URLs

URLs with `?` and `&` characters must be quoted in bash — they're shell special characters:
```bash
# Correct
firecrawl scrape "https://example.com/page?id=123&ref=abc"

# Wrong — shell will break the URL
firecrawl scrape https://example.com/page?id=123&ref=abc
```

## Credits

Each scrape/search/crawl costs credits. Check balance:
```bash
firecrawl --status
firecrawl credit-usage
```

Top up at firecrawl.dev if you run low.
