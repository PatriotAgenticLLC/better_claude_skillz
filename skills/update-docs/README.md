# `/update-docs` -- Documentation Sync

Sync documentation from source-of-truth files (package.json and .env.example).

## Usage

```
/update-docs
```

## Features

- Reads package.json scripts section and generates reference tables
- Extracts environment variables from .env.example with documentation
- Generates docs/CONTRIB.md with development workflow and testing procedures
- Generates docs/RUNBOOK.md with deployment, monitoring, and rollback procedures
- Identifies obsolete documentation (not modified in 90+ days)
- Shows diff summary of all documentation changes
- Single source of truth: package.json and .env.example

## Installation

Copy to your Claude Code skills directory:

**Linux/macOS:**
```bash
cp -r update-docs ~/.claude/skills/
```

**Windows PowerShell:**
```powershell
Copy-Item -Recurse update-docs "$env:USERPROFILE\.claude\skills\"
```

---
**Author:** Nick Martin, Founder - [PatriotAgentic LLC](https://patriotagentic.com)
**License:** MIT
