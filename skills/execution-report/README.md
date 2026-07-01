# `/execution-report` -- Implementation vs Plan Documentation

Document what was actually implemented compared to the original plan, including divergences, challenges, and lessons learned.

## Usage

```
/execution-report [plan-file]
```

## Features

- Compares actual implementation against the original plan task by task
- Documents all files created and modified with line counts
- Captures validation results including tests, coverage, and linting
- Classifies divergences as justified or problematic with explanations
- Tracks acceptance criteria status and identifies remaining next steps

## Installation

Copy to your Claude Code skills directory:

**Linux/macOS:**
```bash
cp -r execution-report ~/.claude/skills/
```

**Windows PowerShell:**
```powershell
Copy-Item -Recurse execution-report "$env:USERPROFILE\.claude\skills\"
```

---
**Author:** Nick Martin, Founder - [PatriotAgentic LLC](https://patriotagentic.com)
**License:** MIT
