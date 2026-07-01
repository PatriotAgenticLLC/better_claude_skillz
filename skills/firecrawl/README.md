# `/firecrawl` -- Web Scraping, Search, and Crawling

Turns any URL into clean, LLM-ready markdown via the Firecrawl CLI -- scrape, search, crawl, map, and extract structured data from JS-heavy and bot-protected sites without leaving your session.

## Usage

```
firecrawl scrape "<url>"
firecrawl search "query" --scrape
firecrawl crawl "<url>" --limit N
```

Invoked automatically when you ask Claude to scrape a URL, read a page, search the web, research a topic, or pull documentation.

## Features

- Eight CLI commands: `scrape`, `search`, `crawl`, `map`, `agent` (AI extraction), `browser` (interactive), `download`, and `credit-usage`
- Handles JS-heavy pages, Cloudflare-protected sites, PDFs, and multi-page crawls
- Built-in escalation ladder: search -> scrape -> map -> crawl -> interactive browser, starting simple and escalating only when needed
- AI-powered structured extraction (pricing tiers, specs, contacts) via the `agent` command
- Scratch-folder output conventions (`-o .firecrawl/`) that keep large content out of the conversation
- Parallel-scrape and URL-quoting patterns for fast, correct bulk fetches

## Installation

Copy to your Claude Code skills directory:

**Linux/macOS:**
```bash
cp -r firecrawl ~/.claude/skills/
```

**Windows PowerShell:**
```powershell
Copy-Item -Recurse firecrawl "$env:USERPROFILE\.claude\skills\"
```

---

**Author:** Nick Martin, Founder - [PatriotAgentic LLC](https://patriotagentic.com)

**Requires:** the [Firecrawl](https://firecrawl.dev) CLI and an API key

**License:** MIT
