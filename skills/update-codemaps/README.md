# `/update-codemaps` -- Architecture Documentation

Analyze codebase structure and update architecture documentation codemaps.

## Usage

```
/update-codemaps
```

## Features

- Scans source files for imports, exports, and dependencies
- Generates token-lean codemaps: architecture, backend, frontend, data models
- Calculates diff percentage from previous codemap version
- Requests user approval if changes exceed 30%
- Adds freshness timestamps to each codemap
- Saves diff reports to .reports/codemap-diff.txt
- Focuses on high-level structure, not implementation details

## Installation

Copy to your Claude Code skills directory:

**Linux/macOS:**
```bash
cp -r update-codemaps ~/.claude/skills/
```

**Windows PowerShell:**
```powershell
Copy-Item -Recurse update-codemaps "$env:USERPROFILE\.claude\skills\"
```

---
**Author:** Nick Martin, Founder - [PatriotAgentic LLC](https://patriotagentic.com)
**License:** MIT
