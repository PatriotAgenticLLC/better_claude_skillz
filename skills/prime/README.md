# `/prime` -- Load Project Context

Load project context at the start of every session. Supports quick (default) and full modes for efficient codebase understanding.

## Usage

```
/prime
/prime quick
/prime full
```

## Features

- Quick mode (default): ~35-40K tokens, captures 95% of useful context
- Full mode: ~85K+ tokens for deep architectural understanding
- Analyzes project structure, documentation, and key files
- Identifies tech stack, frameworks, and testing infrastructure
- Reports current git state and recent development activity
- Outputs scannable summary with actionable information

## Installation

Copy to your Claude Code skills directory:

**Linux/macOS:**
```bash
cp -r prime ~/.claude/skills/
```

**Windows PowerShell:**
```powershell
Copy-Item -Recurse prime "$env:USERPROFILE\.claude\skills\"
```

---
**Author:** Nick Martin, Founder - [PatriotAgentic LLC](https://patriotagentic.com)
**License:** MIT
