# `/system-review` -- Process Improvement Analysis

Analyze implementation against plan for process improvements. This is NOT code review -- it finds bugs in the process, not the code.

## Usage

```
/system-review path/to/plan.md path/to/execution-report.md
```

## Features

- Compares planned vs actual implementation to classify divergences
- Identifies good divergences (justified) vs bad divergences (problematic)
- Traces root causes: unclear plans, missing context, missing validation
- Generates actionable improvement suggestions for CLAUDE.md, reference docs, and commands
- Overall alignment scoring (1-10 scale)
- Pattern compliance assessment against documented conventions
- Saves analysis to `.claude/system-reviews/` directory

## Installation

Copy to your Claude Code skills directory:

**Linux/macOS:**
```bash
cp -r system-review ~/.claude/skills/
```

**Windows PowerShell:**
```powershell
Copy-Item -Recurse system-review "$env:USERPROFILE\.claude\skills\"
```

---
**Author:** Nick Martin, Founder - [PatriotAgentic LLC](https://patriotagentic.com)
**License:** MIT
