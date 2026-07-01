# `/rca` -- Root Cause Analysis

Perform systematic root cause analysis for a bug to understand the underlying issue before implementing a fix.

## Usage

```
/rca Fix the authentication token expiry bug
/rca 42
```

## Features

- Structured 7-step analysis: gather, reproduce, investigate, check related systems, analyze, assess impact, identify fix
- Accepts bug descriptions or GitHub issue numbers
- Classifies root causes: logic error, state management, data validation, error handling, integration, configuration
- Severity and urgency assessment with impact scope
- Fix strategy comparison with pros/cons analysis
- Prevention recommendations to avoid similar bugs
- Generates RCA document in `.claude/plans/` directory

## Installation

Copy to your Claude Code skills directory:

**Linux/macOS:**
```bash
cp -r rca ~/.claude/skills/
```

**Windows PowerShell:**
```powershell
Copy-Item -Recurse rca "$env:USERPROFILE\.claude\skills\"
```

---
**Author:** Nick Martin, Founder - [PatriotAgentic LLC](https://patriotagentic.com)
**License:** MIT
