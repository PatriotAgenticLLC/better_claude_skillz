# `/prime-quick` -- Quick Project Context Loading

Loads essential project context efficiently using approximately 35-40K tokens (60% fewer than `/prime-full`). The recommended default for most sessions.

## Usage

```
/prime-quick
```

## Features

- Analyzes project structure with compact file listing (first 50 tracked files, depth-2 directory tree)
- Reads CLAUDE.md in full and README with a 100-line limit for efficient context usage
- Uses grep to extract function and class signatures instead of reading full source files
- Checks recent git activity (5 commits) and current branch status
- Lists test infrastructure without reading test file contents
- Respects `.primeignore` filters with the same pattern syntax and protected files as `/prime-full`
- Produces the same structured report as `/prime-full`: Project Overview, Architecture, Tech Stack, Core Principles, Current State, and Key Files Identified
- Captures approximately 95% of useful context for most development tasks

## Installation

Copy to your Claude Code commands directory:

**Linux/macOS:**
```bash
mkdir -p ~/.claude/commands/
cp prime-quick.md ~/.claude/commands/
```

**Windows PowerShell:**
```powershell
New-Item -ItemType Directory -Force -Path "$env:USERPROFILE\.claude\commands"
Copy-Item prime-quick.md "$env:USERPROFILE\.claude\commands\"
```

## Related

- `/prime-full` -- Comprehensive alternative for deep dives, onboarding, or major refactors

---
**Author:** Nick Martin, Founder - [PatriotAgentic LLC](https://patriotagentic.com)
**License:** MIT
