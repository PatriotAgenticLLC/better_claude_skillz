# `/refactor-clean` -- Dead Code Cleanup

Safely identify and remove dead code with test verification at every step.

## Usage

```
/refactor-clean
```

## Features

- Runs dead code analysis tools (knip, depcheck, ts-prune)
- Generates comprehensive report in .reports/dead-code-analysis.md
- Categorizes findings by severity: SAFE, CAUTION, DANGER
- Only proposes safe deletions
- Runs full test suite before and after each deletion
- Automatic rollback if tests fail after removal

## Installation

Copy to your Claude Code skills directory:

**Linux/macOS:**
```bash
cp -r refactor-clean ~/.claude/skills/
```

**Windows PowerShell:**
```powershell
Copy-Item -Recurse refactor-clean "$env:USERPROFILE\.claude\skills\"
```

---
**Author:** Nick Martin, Founder - [PatriotAgentic LLC](https://patriotagentic.com)
**License:** MIT
