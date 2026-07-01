# `/supadata` -- Video Transcripts and Social/Web Extraction

Pulls transcripts and metadata from YouTube, TikTok, Instagram, X, and Facebook -- plus YouTube search, channel/playlist data, and web scraping -- through the Supadata API's 21 endpoints.

## Usage

```
# get a plain-text transcript
curl -s -H "x-api-key: $SUPADATA_API_KEY" \
  "https://api.supadata.ai/v1/transcript?url=<video-url>&text=true"
```

Invoked automatically when you ask Claude to pull a transcript, get captions, search YouTube, or grab video/post metadata.

## Features

- Video transcripts across YouTube, TikTok, Instagram, X (Twitter), and Facebook -- plain text or timestamped chunks
- YouTube search with upload-date, type, duration, and sort filters for keyword and competitor research
- Channel, playlist, and video metadata (subscribers, views, likes, duration, engagement stats)
- Web scraping, site mapping, and async full-site crawl endpoints
- AI-powered structured extraction from video (beta)
- Full endpoint reference with per-call credit costs, async job polling, and an error/status code table

## Installation

Copy to your Claude Code skills directory:

**Linux/macOS:**
```bash
cp -r supadata ~/.claude/skills/
```

**Windows PowerShell:**
```powershell
Copy-Item -Recurse supadata "$env:USERPROFILE\.claude\skills\"
```

---

**Author:** Nick Martin, Founder - [PatriotAgentic LLC](https://patriotagentic.com)

**Requires:** a [Supadata](https://supadata.ai) API key

**License:** MIT
