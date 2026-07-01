# `/execute` -- Plan Execution Engine

Execute an implementation plan file step by step, with validation, testing, and automatic plan archival on completion.

## Usage

```
/execute [plan-file]
```

## Features

- Reads and executes implementation plans in sequential task order
- Verifies syntax, imports, and types after each file change
- Runs all validation commands specified in the plan
- Implements testing strategy and ensures all tests pass
- Archives completed plans to `plans/archive/` directory

## Installation

Copy to your Claude Code skills directory:

**Linux/macOS:**
```bash
cp -r execute ~/.claude/skills/
```

**Windows PowerShell:**
```powershell
Copy-Item -Recurse execute "$env:USERPROFILE\.claude\skills\"
```

---
**Author:** Nick Martin, Founder - [PatriotAgentic LLC](https://patriotagentic.com)
**License:** MIT
