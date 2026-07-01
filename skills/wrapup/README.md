# `/wrapup` -- End-of-Session Workflow

Cleanly close a coding session: security review, code review, commit, push, Git hygiene, and a memory/learnings capture, with a user checkpoint between every phase.

## Usage

```
/wrapup
```

## Features

- **Context gate** — halts and asks you to `/clear` + `/prime` first if the session is too loaded to run all phases reliably.
- **Sequenced review → ship** — runs `/security-review`, then `/code-review`, then `/commit`, with proceed / fix / skip / abort checkpoints at each step.
- **Guarded push** — confirms the target branch and commit count before pushing, and offers remediation when a push is rejected.
- **Safe Git hygiene** — scans for merged branches and dead worktrees, then acts only on confirmation, never force-deleting or removing the worktree you're standing in.
- **Memory capture** — proposes 0–2 durable learnings from the session and saves the ones you approve into your memory system.
- **Always-on summary** — ends with a per-phase status table and a clear "safe to close" line, restating any copy-paste one-liners deferred to you.

## Installation

Copy to your Claude Code skills directory:

**Linux/macOS:**
```bash
cp -r wrapup ~/.claude/skills/
```

**Windows PowerShell:**
```powershell
Copy-Item -Recurse wrapup "$env:USERPROFILE\.claude\skills\"
```

---
**Author:** Nick Martin, Founder - [PatriotAgentic LLC](https://patriotagentic.com)
**License:** MIT
