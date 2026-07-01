# `/instinct-import` -- Import Shared Instincts

Import instincts from teammates, Skill Creator repo analysis, community collections, or previous machine backups with conflict detection and merge strategies.

## Usage

```
/instinct-import <file-or-url> [--dry-run] [--force] [--min-confidence <n>]
```

## Features

- Imports instincts from local YAML files or remote URLs
- Detects duplicates and conflicts with existing instincts automatically
- Merge strategies: higher confidence wins, merge evidence, or manual resolution
- Dry-run mode to preview imports without making changes
- Skill Creator integration for importing repo-analyzed instincts

## Installation

Copy to your Claude Code skills directory:

**Linux/macOS:**
```bash
cp -r instinct-import ~/.claude/skills/
```

**Windows PowerShell:**
```powershell
Copy-Item -Recurse instinct-import "$env:USERPROFILE\.claude\skills\"
```

---
**Inspired by:** [Homunculus](https://github.com/humanplane/homunculus) by humanplane and [The Longform Guide](https://x.com/affaanmustafa) by @affaanmustafa
**Augmented by:** Nick Martin, Founder - [PatriotAgentic LLC](https://patriotagentic.com)
**License:** MIT
