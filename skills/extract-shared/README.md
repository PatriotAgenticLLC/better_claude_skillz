# `/extract-shared` -- Shared Utilities Extractor

Scans your projects for duplicated code patterns and identifies high-ROI candidates for extraction into a shared utility package.

## Usage

```
/extract-shared [--scan|--report|--python|--node]
```

## Features

- Scans across a workspace or an explicit set of project paths
- Detects eight duplication categories: health checks, error formats, config loading, auth/rate limiting, database utilities, encryption, audit logging, and Docker health checks
- Rates similarity and extraction effort (Easy / Medium / Hard) per pattern
- Prioritizes candidates found in 3+ projects for highest ROI
- Proposes a concrete shared-package structure for Python and Node
- Read-only: analyzes and recommends without modifying any project files

## Installation

Copy to your Claude Code skills directory:

**Linux/macOS:**
```bash
cp -r extract-shared ~/.claude/skills/
```

**Windows PowerShell:**
```powershell
Copy-Item -Recurse extract-shared "$env:USERPROFILE\.claude\skills\"
```

---
**Author:** Nick Martin, Founder - [PatriotAgentic LLC](https://patriotagentic.com)
**License:** MIT
