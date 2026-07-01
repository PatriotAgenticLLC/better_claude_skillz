# `/instinct-status` -- Show Learned Instincts

Display all learned instincts with their confidence scores, grouped by domain.

## Usage

```
/instinct-status
/instinct-status --domain code-style
/instinct-status --low-confidence
```

## Features

- Shows instincts grouped by domain (code-style, testing, workflow, git)
- Displays confidence scores as percentage bars
- Filters by domain, confidence level, or source type
- JSON output mode for programmatic use
- Reads from both personal and inherited instinct directories

## Installation

Copy to your Claude Code skills directory:

**Linux/macOS:**
```bash
cp -r instinct-status ~/.claude/skills/
```

**Windows PowerShell:**
```powershell
Copy-Item -Recurse instinct-status "$env:USERPROFILE\.claude\skills\"
```

---
**Inspired by:** [Homunculus](https://github.com/humanplane/homunculus) by humanplane and [The Longform Guide](https://x.com/affaanmustafa) by @affaanmustafa
**Augmented by:** Nick Martin, Founder - [PatriotAgentic LLC](https://patriotagentic.com)
**License:** MIT
