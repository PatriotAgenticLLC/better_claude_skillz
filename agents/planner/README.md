# `planner` -- Implementation Planning Specialist

Expert planning specialist for complex features and refactoring. Use proactively when users request feature implementation, architectural changes, or complex refactoring.

## Capabilities

- Analyze requirements and create detailed implementation plans
- Break down complex features into manageable phases and steps
- Identify dependencies, risks, and potential blockers
- Suggest optimal implementation order with dependency tracking
- Consider edge cases and error scenarios
- Create testing strategies (unit, integration, E2E)
- Plan backwards-compatible refactoring migrations

## Tools Used

`Read`, `Grep`, `Glob`

## Model

Recommended: `opus`

## When to Use

- Complex feature requests requiring multi-step implementation
- Architectural changes or large-scale refactoring
- When you need to understand dependencies between changes
- Before starting work that spans multiple files or modules
- When risk assessment is needed before implementation

## Installation

Copy to your Claude Code agents directory:

**Linux/macOS:**
```bash
mkdir -p ~/.claude/agents/
cp planner.md ~/.claude/agents/
```

**Windows PowerShell:**
```powershell
New-Item -ItemType Directory -Force -Path "$env:USERPROFILE\.claude\agents"
Copy-Item planner.md "$env:USERPROFILE\.claude\agents\"
```

---
**Author:** Nick Martin, Founder - [PatriotAgentic LLC](https://patriotagentic.com)
**License:** MIT
