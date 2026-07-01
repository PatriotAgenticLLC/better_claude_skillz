# `/brainstorm` -- Workspace Opportunity Discovery

Divergent discovery that scans a project for automation, improvement, and build opportunities, then ranks them — the "what should I build?" step that sits before `/plan`.

## Usage

```
/brainstorm            # analyze the current working directory
/brainstorm [path]     # analyze a specific project directory
/brainstorm [topic]    # focus the scan on an area (e.g. "testing", "CI/CD", "API layer")
```

## Features

- **Grounded context load** — auto-primes the session, reads project memory, and scans code debt, pending plans, git hotspots, test health, dependency state, and CI/CD coverage.
- **Six-category opportunity scan** — incomplete work, automation gaps, technical debt, new capabilities, developer experience, and best-practice gaps.
- **Agent-backed feasibility triage** — dispatches the `architect` agent (haiku) per opportunity for a quick buildable / effort / blockers verdict.
- **Ranked output** — groups findings into High Impact, Quick Wins, Strategic Bets, plus an Anomalies & Observations section.
- **Deep dive on demand** — runs the `architect` agent (opus) on your chosen opportunity with design options, trade-offs, and an MVP-vs-full-vision framing.
- **Clean handoff** — writes a timestamped brainstorm doc and points you at the exact `/plan --lite` or `/plan --full` command to run next. Interactive by design; never runs all stages autonomously and never writes code.

## Installation

Copy to your Claude Code commands directory:

**Linux/macOS:**
```bash
mkdir -p ~/.claude/commands/
cp brainstorm.md ~/.claude/commands/
```

**Windows PowerShell:**
```powershell
New-Item -ItemType Directory -Force -Path "$env:USERPROFILE\.claude\commands"
Copy-Item brainstorm.md "$env:USERPROFILE\.claude\commands\"
```

---
**Author:** Nick Martin, Founder - [PatriotAgentic LLC](https://patriotagentic.com)
**License:** MIT
