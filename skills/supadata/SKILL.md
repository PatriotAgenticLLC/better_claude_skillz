---
name: supadata
description: >
  Fetch video transcripts and transcriptions from external URLs — YouTube transcripts, TikTok transcripts,
  Instagram, X, Facebook. Pull a transcript, get a transcription, extract captions from any video URL.
  Also: YouTube search (find videos, keyword research, competitor discovery), web scraping (scrape a page
  to markdown, crawl a website), social media metadata (views, likes, engagement stats), channel and
  playlist data.
user-invocable: false
---

# Supadata API

Content extraction API for YouTube, social media, and web pages. 21 endpoints, credit-based pricing.

## Authentication

- **API key env var:** `SUPADATA_API_KEY`
- **Header:** `x-api-key: <key>`
- **Base URL:** `https://api.supadata.ai/v1`

Set your `SUPADATA_API_KEY` (via env or your secrets manager, e.g. Doppler) before calling the API. If your secrets are injected by a manager, run inside that manager's shell (for example, `doppler run -- ...`).

## Calling the API

Use `curl` or Python `requests`/`httpx` directly. All endpoints accept the `x-api-key` header.

```bash
# Example: get a transcript
curl -s -H "x-api-key: $SUPADATA_API_KEY" \
  "https://api.supadata.ai/v1/transcript?url=https://youtube.com/watch?v=VIDEO_ID&text=true"
```

## Endpoint Reference

| Endpoint | Method | What It Does | Credits |
|----------|--------|-------------|---------|
| `/v1/transcript?url=&text=true` | GET | Transcript as plain text (YouTube, TikTok, IG, X, FB) | 1 |
| `/v1/transcript?url=` | GET | Transcript with timestamps/chunks | 1 |
| `/v1/transcript/{jobId}` | GET | Poll async transcript job | 0 |
| `/v1/youtube/transcript/translate?url=&lang=` | GET | Translate YouTube transcript | 30/min |
| `/v1/youtube/transcript/batch` | POST | Batch transcript extraction | 1 + 1/video |
| `/v1/youtube/video?id=` | GET | Video metadata (title, views, duration, channel) | 1 |
| `/v1/youtube/video/batch` | POST | Batch video metadata | 1 + 1/video |
| `/v1/youtube/batch/{jobId}` | GET | Poll batch job | 0 |
| `/v1/youtube/channel?id=` | GET | Channel stats (subscribers, videos, total views) | 1 |
| `/v1/youtube/channel/videos?id=` | GET | List video IDs from a channel | 1 |
| `/v1/youtube/playlist?id=` | GET | Playlist metadata | 1 |
| `/v1/youtube/playlist/videos?id=` | GET | List video IDs from a playlist | 1 |
| `/v1/youtube/search?query=` | GET | Search YouTube (title, views, duration, channel) | 1/page |
| `/v1/metadata?url=` | GET | Social post metadata (views, likes, author) | 1 |
| `/v1/extract` | POST | AI-powered structured extraction from video | FREE (beta) |
| `/v1/extract/{jobId}` | GET | Poll extraction job | 0 |
| `/v1/web/scrape?url=` | GET | Scrape webpage to clean markdown | 1 |
| `/v1/web/map?url=` | GET | Discover all URLs linked from a page | 1 |
| `/v1/web/crawl` | POST | Async full-site crawl | 1 + 1/page |
| `/v1/web/crawl/{jobId}` | GET | Poll crawl job | 0 |
| `/v1/me` | GET | Account info (plan, credits used/remaining) | 1 |

## YouTube Search Parameters

| Param | Values |
|-------|--------|
| `uploadDate` | `all`, `hour`, `today`, `week`, `month`, `year` |
| `type` | `all`, `video`, `channel`, `playlist`, `movie` |
| `duration` | `short` (<4m), `medium` (4-20m), `long` (>20m) |
| `sortBy` | `relevance`, `rating`, `date`, `views` |

## Async Jobs

Videos longer than 20 minutes and batch/crawl operations return `{"jobId": "..."}`. Poll the corresponding status endpoint until `status == "completed"`.

## Supported Platforms

- **Transcripts:** YouTube, TikTok, Instagram, X (Twitter), Facebook
- **Metadata:** YouTube, TikTok, Instagram, X, Facebook
- **Not supported:** Live streams in progress, private/unlisted videos, YouTube Music

## Error Reference

| Code | Meaning |
|------|---------|
| 401 | Invalid API key |
| 402 | Out of credits or plan limit |
| 429 | Rate limit hit — slow down |
| `transcript-unavailable` | No transcript exists (still costs 1 credit) |
