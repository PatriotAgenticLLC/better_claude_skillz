# `/eval` -- Eval-Driven Development Workflow

Manage eval-driven development workflow with define, check, report, and list operations for tracking feature capabilities and regressions.

## Usage

```
/eval [define|check|report|list] [feature-name]
```

## Features

- Define eval criteria before implementation with capability and regression evals
- Check eval pass/fail status with detailed logging
- Generate comprehensive eval reports with pass@k and pass^k metrics
- List all eval definitions with current status across the project
- Track eval history with automatic log management

## Installation

Copy to your Claude Code skills directory:

**Linux/macOS:**
```bash
cp -r eval ~/.claude/skills/
```

**Windows PowerShell:**
```powershell
Copy-Item -Recurse eval "$env:USERPROFILE\.claude\skills\"
```

---
**Author:** Nick Martin, Founder - [PatriotAgentic LLC](https://patriotagentic.com)
**License:** MIT
