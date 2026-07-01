# `/checkpoint` -- Workflow Checkpoint Management

Create, verify, and manage checkpoints in your development workflow to track progress and enable safe rollbacks.

## Usage

```
/checkpoint [create|verify|list|clear] [name]
```

## Features

- Create named checkpoints tied to git state
- Verify current state against previous checkpoints
- Compare test pass rates and coverage between checkpoints
- List all checkpoints with status information
- Automatic checkpoint logging to `.claude/checkpoints.log`

## Installation

Copy to your Claude Code skills directory:

**Linux/macOS:**
```bash
cp -r checkpoint ~/.claude/skills/
```

**Windows PowerShell:**
```powershell
Copy-Item -Recurse checkpoint "$env:USERPROFILE\.claude\skills\"
```

---
**Author:** Nick Martin, Founder - [PatriotAgentic LLC](https://patriotagentic.com)
**License:** MIT
