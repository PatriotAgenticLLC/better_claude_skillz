# `/challenge` -- Quality Gate for Any Work Product

A rigorous self-critique command that pressure-tests plans, prompts, deliverables, scripts, or any output before considering it final. Based on the philosophy: "Is this the best you can do?"

## Usage

```
/challenge path/to/file.md                  # full critique with up to 3 iteration cycles
/challenge                                  # paste content, OR (no path, no paste) defaults to challenging the last assistant turn
/challenge --quick path/to/file             # single-pass gut-check, no iteration, lightweight heuristic learning
/challenge --check [path]                   # audit Challenge Criteria freshness
/challenge --sync path/to/project           # set up or update Challenge Criteria for one project
/challenge --sync                           # batch sync all projects (with cost preview and dry-run option)
/challenge --prune                          # retire low-activity heuristics with consent
```

Modes are mutually exclusive. Priority: `--quick` > `--check` > `--sync` > `--prune`. With no flag, runs the full critique.

## Features

- **Six-dimension critique** — Completeness, Clarity, Logic & Structure, Fit for Purpose, Risk & Blind Spots, The Bar.
- **Four verdicts** — `SHIP IT` (clean) / `REWORK` (real gaps, fix and retry) / `RETHINK` (approach itself flawed) / `ESCALATE` (3-cycle cap reached and still not shippable — surface for human redesign).
- **Auto-iteration with hard cap** — Up to 3 cycles total on Claude-generated work, applying fixes between rounds. The cap counts every rebuild — REWORK or RETHINK — so the approach can't loop indefinitely. A second RETHINK before the cap also emits `ESCALATE`. Cap-reached while still REWORK emits `ESCALATE` rather than silently giving up.
- **No-arg default target** — `/challenge` with no path and no paste challenges the last assistant turn in the current session. Useful for gut-checking the response you just got. If the last turn wasn't reviewable (tool result, trivial reply), `/challenge` asks you to provide a path or paste content.
- **Heuristic system** — `/challenge` reads `challenge-heuristics.md` and applies relevant entries during the dimensional review (filtered by artifact type and project stack). New systemic findings get extracted as heuristics; entries with `seen: 3+` become promotion candidates that get absorbed into `/plan` or other target files. Stale entries can be retired via `--prune`. **`--quick` mode keeps the learning loop alive** — it extracts new heuristics and increments `seen` counts but skips the heavy promotion-candidate prompts.
- **Project-specific Challenge Criteria** — `--sync` analyzes a project's tech stack, business stakes, deployment model, and security posture, then writes tailored review standards into the project's `CLAUDE.md`. Batch mode clusters projects by stack and shares baseline criteria. **Cost-aware batches** — before analysis, `--sync` shows a token estimate and offers a dry-run; defaults to dry-run when N > 10 projects.
- **Freshness tracking** — `--check` reads a `<!-- last-updated: YYYY-MM-DD -->` metadata comment in the criteria block (written by `--sync`) to score staleness as Fresh / Drifting / Stale.
- **Code-aware** — Source code artifacts dispatch a language-specific reviewer agent (Python / Go / TypeScript) concurrently with the dimensional critique; security-sensitive code additionally invokes a security-reviewer agent.
- **Final Challenge Report** — Always produced. Includes iteration summary, improvements made across cycles, remaining findings with severity, and a "Your Call" section that returns control to you.

## Installation

This package ships two files. They install to **different locations**:

| File | Destination | Purpose |
|------|-------------|---------|
| `challenge.md` | `~/.claude/commands/` | Command definition |
| `challenge-heuristics.md` | `~/.claude/` (root) | Heuristic ledger — read by `/challenge`, `/plan`, and the planner agent |

**Linux/macOS:**
```bash
mkdir -p ~/.claude/commands/
cp challenge.md ~/.claude/commands/
cp challenge-heuristics.md ~/.claude/        # heuristic ledger lives at .claude root
```

**Windows PowerShell:**
```powershell
New-Item -ItemType Directory -Force -Path "$env:USERPROFILE\.claude\commands"
Copy-Item challenge.md "$env:USERPROFILE\.claude\commands\"
Copy-Item challenge-heuristics.md "$env:USERPROFILE\.claude\"
```

If you already have a `challenge-heuristics.md` at `~/.claude/`, **do not overwrite** it — your file contains live `seen` counts and `last_seen` dates accumulated from your own work. Either skip copying it, or merge entries manually.

## About the heuristics file

`challenge-heuristics.md` ships pre-populated with example entries — real failure cases extracted from prior plan reviews. Each entry follows a schema:

```yaml
- Check: what to verify in the artifact
- Why: what goes wrong when this is missed
- Applies when: scope conditions
- Artifact types: plan, skill, agent, prompt, workflow, script
- Stack: python, react, shell, generic, etc.
- Cluster: short label grouping related heuristics
- Source: path of the artifact that produced this heuristic
- Seen: count | First seen: date | Last seen: date
```

Entries flow through a lifecycle:
- **Active** → ordinary state, surfaced during reviews when `Applies when` matches.
- **Approaching Promotion** (`seen: 2`) → one trigger from promotion. Auto-listed in a dedicated section.
- **Promoted** (`seen: 3+`) → absorbed into the relevant permanent file (e.g., `/plan` command, planner agent) and removed from Active. Heuristic stops re-firing because the lesson is now baked in.
- **Retired** → low-activity entries pruned via `/challenge --prune` with per-entry consent. Preserved for audit, never deleted.

The shipped entries reference projects the author worked on. They're useful as worked examples of the schema and as a starter set of plan-review heuristics. Run `/challenge --prune` after a few months to retire ones that don't fire on your workflow.

## Related

- `/plan` — `/challenge` validates plans before execution. `/plan` reads the same `challenge-heuristics.md` to prevent recurring gaps.
- Agent: `agents/planner.md` — also reads heuristics during plan drafting.
- Code reviewer agents (`python-reviewer`, `go-reviewer`, `code-reviewer`, `security-reviewer`) — dispatched automatically when `/challenge` runs against source code.

---
**Author:** Nick Martin, Founder - [PatriotAgentic LLC](https://patriotagentic.com)
**License:** MIT
