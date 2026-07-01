# `/plan-ecc` -- Implementation Planning with Confirmation

Restate requirements, assess risks, and create a step-by-step implementation plan. Waits for explicit user confirmation before touching any code.

## Usage

```
/plan-ecc Add real-time notifications when orders complete
```

## Features

- Restates requirements in clear, unambiguous terms
- Breaks implementation into phased steps with dependencies
- Identifies risks and blockers with severity ratings
- Estimates complexity (High/Medium/Low) with time estimates
- Blocks code generation until user explicitly confirms the plan

## Installation

Copy to your Claude Code skills directory:

**Linux/macOS:**
```bash
cp -r plan-ecc ~/.claude/skills/
```

**Windows PowerShell:**
```powershell
Copy-Item -Recurse plan-ecc "$env:USERPROFILE\.claude\skills\"
```

---
**Author:** Nick Martin, Founder - [PatriotAgentic LLC](https://patriotagentic.com)
**License:** MIT
