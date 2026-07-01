# `/prime-full` -- Comprehensive Project Context Loading

Builds deep understanding of a codebase by analyzing structure, documentation, and key files in full. Uses approximately 85K+ tokens for thorough coverage.

## Usage

```
/prime-full
```

## Features

- Reads all tracked files via `git ls-files` with full directory tree visualization
- Reads all documentation in full: CLAUDE.md, README files, architecture docs, PRDs
- Reads main entry points, configuration files, model/schema definitions, and service files in their entirety
- Checks recent git activity (10 commits) and current branch status
- Respects `.primeignore` filters to exclude low-value files, with support for negation patterns and protected files
- Produces a structured report covering: Project Overview, Architecture, Tech Stack, Core Principles, and Current State
- Supports cross-platform directory listing (tree or ls fallback)

## Installation

Copy to your Claude Code commands directory:

**Linux/macOS:**
```bash
mkdir -p ~/.claude/commands/
cp prime-full.md ~/.claude/commands/
```

**Windows PowerShell:**
```powershell
New-Item -ItemType Directory -Force -Path "$env:USERPROFILE\.claude\commands"
Copy-Item prime-full.md "$env:USERPROFILE\.claude\commands\"
```

## Related

- `/prime-quick` -- Lighter alternative using 60% fewer tokens (recommended for most sessions)

---
**Author:** Nick Martin, Founder - [PatriotAgentic LLC](https://patriotagentic.com)
**License:** MIT
