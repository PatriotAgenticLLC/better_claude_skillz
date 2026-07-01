# `refactor-cleaner` -- Dead Code Cleanup Specialist

Dead code cleanup and consolidation specialist. Identifies and removes unused code, duplicates, and unused exports to keep the codebase lean and maintainable.

## Capabilities

- Detect dead code using knip, depcheck, and ts-prune
- Identify and consolidate duplicate components and utilities
- Remove unused npm dependencies and imports
- Perform safe refactoring with risk assessment (SAFE/CAREFUL/RISKY)
- Generate detailed deletion logs for audit trails
- Provide error recovery guidance if removals break functionality

## Tools Used

`Read`, `Write`, `Edit`, `Bash`, `Grep`, `Glob`

## Model

Recommended: `opus`

## When to Use

- Regular codebase maintenance and cleanup
- After removing or replacing features
- When bundle size needs reduction
- When duplicate code is suspected
- Before major releases (cleanup pass)

## Installation

Copy to your Claude Code agents directory:

**Linux/macOS:**
```bash
mkdir -p ~/.claude/agents/
cp refactor-cleaner.md ~/.claude/agents/
```

**Windows PowerShell:**
```powershell
New-Item -ItemType Directory -Force -Path "$env:USERPROFILE\.claude\agents"
Copy-Item refactor-cleaner.md "$env:USERPROFILE\.claude\agents\"
```

---
**Author:** Nick Martin, Founder - [PatriotAgentic LLC](https://patriotagentic.com)
**License:** MIT
