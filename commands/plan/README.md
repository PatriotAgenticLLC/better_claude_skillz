# `/plan` -- Implementation Planning Before Code

Restates requirements, assesses risks, and creates a step-by-step implementation plan. Waits for explicit user confirmation before any code is written.

## Usage

```
/plan [description of what to build]
```

## Features

- Restates requirements in clear, unambiguous terms to verify understanding
- Breaks implementation into phased steps with specific, actionable items
- Identifies dependencies between components and external services
- Assesses risks by severity (HIGH, MEDIUM, LOW) with mitigation notes
- Estimates complexity and time for backend, frontend, and testing work
- Blocks all code generation until the user explicitly confirms the plan
- Supports iterative modification ("modify:", "different approach:", "skip phase N")

## Installation

Copy to your Claude Code commands directory:

**Linux/macOS:**
```bash
mkdir -p ~/.claude/commands/
cp plan.md ~/.claude/commands/
```

**Windows PowerShell:**
```powershell
New-Item -ItemType Directory -Force -Path "$env:USERPROFILE\.claude\commands"
Copy-Item plan.md "$env:USERPROFILE\.claude\commands\"
```

## Related

- `/challenge` -- Validate the plan before executing it
- Agent: `agents/planner.md`

---
**Author:** Nick Martin, Founder - [PatriotAgentic LLC](https://patriotagentic.com)
**License:** MIT
