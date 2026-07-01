# `/deps-audit` -- Dependency Vulnerability Audit

Scans one or more projects for dependency vulnerabilities, outdated packages, and cross-project version conflicts in a single report.

## Usage

```
/deps-audit [--python|--node|--all|<project-path>]
```

## Features

- Discovers Python, Node.js, and Go manifests across a project or a whole workspace
- Runs `pip-audit`/`safety` for Python and `npm`/`pnpm audit` for Node vulnerability scanning
- Flags outdated packages with major-version bumps available
- Detects cross-project version conflicts (same dependency, different major versions)
- Falls back gracefully when audit tools aren't installed, reporting how to install them
- Read-only: reports issues and action items without modifying any files

## Installation

Copy to your Claude Code skills directory:

**Linux/macOS:**
```bash
cp -r deps-audit ~/.claude/skills/
```

**Windows PowerShell:**
```powershell
Copy-Item -Recurse deps-audit "$env:USERPROFILE\.claude\skills\"
```

---
**Author:** Nick Martin, Founder - [PatriotAgentic LLC](https://patriotagentic.com)
**License:** MIT
