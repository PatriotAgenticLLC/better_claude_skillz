# `/voice` -- VOICE Pass for High-Stakes Prose

Runs five checks (Verified, Owned, Insightful, Clear, Engaging) on posts, proposals, sales copy and client-facing emails so they say something true, specific and yours. Adapted from Sandeep Swadia's VOICE method.

## Usage

```
/voice
```

Or ask for a "voice pass", or say "make this sound like me" while drafting a post or proposal.

## Features

- **Verified:** lists every factual claim and traces it to a source seen in the session; untraceable claims get cut or flagged, never invented
- **Owned:** pulls real specifics from your own notes, brand files, memory and git history, and leaves `[AUTHOR: ...]` slots instead of made-up anecdotes
- **Insightful:** forces a real take and argues against it once; no take, no post
- **Clear:** two-sentence restatement test and a read-through as the named reader
- **Engaging:** a sentence-by-sentence cut test and opening/closing placement rules
- Delivers the piece clean, with a one-line note only when something needs your attention

## Setup

Open `SKILL.md` and edit the **Your sources** block to point at your own material: a notes vault, a knowledge-base CLI or MCP, brand files. Anything you don't have can be deleted; missing sources are skipped.

Works best alongside [`/writing-style`](../writing-style/), which handles word-level AI tells. `/voice` runs without it.

## Installation

Copy to your Claude Code skills directory:

**Linux/macOS:**
```bash
cp -r voice ~/.claude/skills/
```

**Windows PowerShell:**
```powershell
Copy-Item -Recurse voice "$env:USERPROFILE\.claude\skills\"
```

---
**Author:** Nick Martin, Founder - [PatriotAgentic LLC](https://patriotagentic.com)
**Method:** Sandeep Swadia, "Everyone Can Spot AI Writing, Here's How To Fix It" (YouTube)
**License:** MIT
