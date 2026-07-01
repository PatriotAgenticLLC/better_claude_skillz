# `/stats` -- Session and System Statistics

Displays comprehensive statistics about your Claude Code session, context window usage, MCP servers, installed components, and system health.

## Usage

```
/stats [category]
```

Categories: `context`, `mcps`, `system`, `session`, `all` (default)

## Features

- Estimates context window token usage based on message count, MCP overhead, and base context
- Lists configured MCP servers with estimated tool counts and context impact assessment
- Counts installed system components: agents, skills, rules, commands, and hooks
- Shows current session information: model, working directory, duration, and project
- Runs a health check with status indicators and actionable recommendations
- Supports filtering by category to show only the information you need

## Installation

Copy to your Claude Code commands directory:

**Linux/macOS:**
```bash
mkdir -p ~/.claude/commands/
cp stats.md ~/.claude/commands/
```

**Windows PowerShell:**
```powershell
New-Item -ItemType Directory -Force -Path "$env:USERPROFILE\.claude\commands"
Copy-Item stats.md "$env:USERPROFILE\.claude\commands\"
```

## Related

- Useful before deciding whether to compact context or start a new session
- Pairs with `/prime-quick` and `/prime-full` for understanding token budget impact

---
**Author:** Nick Martin, Founder - [PatriotAgentic LLC](https://patriotagentic.com)
**License:** MIT
