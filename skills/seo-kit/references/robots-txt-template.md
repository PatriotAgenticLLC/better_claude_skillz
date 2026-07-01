# Robots.txt Configuration Reference

> Originally created by [AAA Accelerator](https://aaaaccelerator.com).
> v2 enhanced by Nick Martin, [PatriotAgentic LLC](https://patriotagentic.com).

This reference documents the three crawler groups used in the SEO Kit v2 robots.txt template and the trade-offs of each configuration preset.

## Crawler Groups

### Group 1: Traditional Search Engines

**Recommendation:** Always allow. These are the primary drivers of organic search traffic.

| User-Agent | Engine |
|-----------|--------|
| `Googlebot` | Google Search |
| `Bingbot` | Microsoft Bing |
| `Yandex` | Yandex (Russia) |
| `Baiduspider` | Baidu (China) |
| `DuckDuckBot` | DuckDuckGo |
| `Applebot` | Apple (Siri, Spotlight) |

### Group 2: AI / LLM Crawlers

**Recommendation:** Opt-in based on business goals. See trade-offs below.

| User-Agent | Service | Notes |
|-----------|---------|-------|
| `GPTBot` | OpenAI (training) | Used for model training data collection |
| `OAI-SearchBot` | OpenAI (search) | Powers ChatGPT search results |
| `ChatGPT-User` | ChatGPT (browsing) | When a user asks ChatGPT to browse |
| `ClaudeBot` | Anthropic Claude | Claude web search |
| `Amazonbot` | Amazon Alexa / AI | Amazon's AI crawler |
| `PerplexityBot` | Perplexity AI | Perplexity search engine |
| `Google-Extended` | Google AI (training) | Gemini training, separate from Googlebot |
| `Meta-ExternalAgent` | Meta AI | Meta's AI training crawler |
| `Bytespider` | ByteDance / TikTok | TikTok's parent company AI |
| `FacebookBot` | Meta (AI training) | Distinct from facebookexternalhit (preview) |

### Group 3: Social / Preview Bots

**Recommendation:** Always allow. These generate link previews when your URL is shared.

| User-Agent | Platform |
|-----------|----------|
| `facebookexternalhit` | Facebook / Meta link previews |
| `Twitterbot` | X (Twitter) card previews |
| `LinkedInBot` | LinkedIn post previews |
| `WhatsApp` | WhatsApp link previews |
| `Slackbot` | Slack unfurls |
| `Discordbot` | Discord embeds |
| `TelegramBot` | Telegram previews |
| `Pinterestbot` | Pinterest pins |

## Trade-Offs: AI Crawler Access

### Allowing AI Crawlers

**Benefits:**
- Your content appears in AI search results (ChatGPT, Perplexity, Claude)
- AI assistants can accurately describe your business and services
- Increased visibility in the growing AI search ecosystem
- Your `llms.txt` file gets discovered and consumed

**Risks:**
- Content may be used to train AI models (GPTBot, Google-Extended, Meta-ExternalAgent)
- No control over how AI models represent your content
- Competitors could use AI-generated summaries of your content

### Blocking AI Crawlers

**Benefits:**
- Full control over content usage rights
- Content not used for AI model training
- Protects proprietary or premium content

**Risks:**
- Invisible in AI search results (ChatGPT, Perplexity, Claude)
- AI assistants cannot accurately describe your services
- Miss the growing AI-first search audience

### Hybrid Approach

You can selectively allow AI **search** bots while blocking AI **training** bots:
- Allow: `OAI-SearchBot`, `ChatGPT-User`, `ClaudeBot`, `PerplexityBot` (search/browsing)
- Block: `GPTBot`, `Google-Extended`, `Meta-ExternalAgent`, `Bytespider` (training)

This maximises visibility while minimising training data exposure.

## Preset Configurations

### Preset 1: Allow All (Maximum Visibility)

Use when: You want maximum exposure across all search and AI platforms.

```
# AI Crawlers — Allow All
User-agent: GPTBot
User-agent: OAI-SearchBot
User-agent: ChatGPT-User
User-agent: ClaudeBot
User-agent: Amazonbot
User-agent: PerplexityBot
User-agent: Google-Extended
User-agent: Meta-ExternalAgent
User-agent: Bytespider
User-agent: FacebookBot
Allow: /
```

Replace `__AI_CRAWLER_POLICY__` with `Allow All` and `__AI_CRAWLER_RULES__` with the block above.

### Preset 2: Search Only (No Training)

Use when: You want AI search visibility but don't want content used for model training.

```
# AI Crawlers — Search Only (no training)
User-agent: OAI-SearchBot
User-agent: ChatGPT-User
User-agent: ClaudeBot
User-agent: PerplexityBot
User-agent: Amazonbot
Allow: /

User-agent: GPTBot
User-agent: Google-Extended
User-agent: Meta-ExternalAgent
User-agent: Bytespider
User-agent: FacebookBot
Disallow: /
```

Replace `__AI_CRAWLER_POLICY__` with `Search Only (no training)` and `__AI_CRAWLER_RULES__` with the block above.

### Preset 3: Custom

Use when: The user wants to pick specific crawlers to allow/block.

Ask the user which AI crawlers to allow from the Group 2 list. Generate the appropriate `Allow: /` and `Disallow: /` rules per their choices.

Replace `__AI_CRAWLER_POLICY__` with `Custom` and `__AI_CRAWLER_RULES__` with the user's specific rules.

## How Claude Should Generate

During Phase 1 (Gather Info), ask:

> "How would you like to handle AI crawlers? Your options:
> 1. **Allow All** — maximum visibility in AI search (ChatGPT, Perplexity, Claude) + training
> 2. **Search Only** — visible in AI search results, but block training crawlers
> 3. **Custom** — you pick which AI crawlers to allow
>
> Most businesses benefit from option 2 (Search Only) as the default."

Then replace `__AI_CRAWLER_POLICY__` and `__AI_CRAWLER_RULES__` in the worker template accordingly.
