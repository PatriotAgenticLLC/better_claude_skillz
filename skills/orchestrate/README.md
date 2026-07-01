# `/orchestrate` -- Sequential Agent Workflow

Sequential agent workflow for complex tasks, chaining multiple specialized agents with structured handoff documents.

## Usage

```
/orchestrate feature "Add user authentication"
/orchestrate bugfix "Fix login timeout"
/orchestrate refactor "Redesign caching layer"
/orchestrate security "Audit payment endpoints"
/orchestrate custom "architect,tdd-guide,code-reviewer" "Task description"
```

## Features

- Pre-defined workflows: feature, bugfix, refactor, security
- Custom agent sequences with comma-separated agent names
- Structured handoff documents between agents
- Parallel execution for independent checks
- Aggregated final report with ship/needs-work/blocked recommendation

## Installation

Copy to your Claude Code skills directory:

**Linux/macOS:**
```bash
cp -r orchestrate ~/.claude/skills/
```

**Windows PowerShell:**
```powershell
Copy-Item -Recurse orchestrate "$env:USERPROFILE\.claude\skills\"
```

---
**Author:** Nick Martin, Founder - [PatriotAgentic LLC](https://patriotagentic.com)
**License:** MIT
