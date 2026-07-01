# `/instinct-export` -- Export Learned Instincts

Export instincts to a shareable format for teammates, new machines, or project conventions with privacy-preserving filtering.

## Usage

```
/instinct-export [--domain <name>] [--min-confidence <n>] [--output <file>]
```

## Features

- Exports learned instincts to YAML, JSON, or Markdown format
- Filters by domain and minimum confidence threshold
- Strips sensitive information (session IDs, file paths, old timestamps)
- Preserves trigger patterns, actions, confidence scores, and observation counts
- Privacy-first: never exports actual code snippets or session transcripts

## Installation

Copy to your Claude Code skills directory:

**Linux/macOS:**
```bash
cp -r instinct-export ~/.claude/skills/
```

**Windows PowerShell:**
```powershell
Copy-Item -Recurse instinct-export "$env:USERPROFILE\.claude\skills\"
```

---
**Inspired by:** [Homunculus](https://github.com/humanplane/homunculus) by humanplane and [The Longform Guide](https://x.com/affaanmustafa) by @affaanmustafa
**Augmented by:** Nick Martin, Founder - [PatriotAgentic LLC](https://patriotagentic.com)
**License:** MIT
