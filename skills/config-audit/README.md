# `/config-audit` -- Claude Code Config Stack Audit

A prompt-driven audit of your entire Claude Code configuration (`~/.claude/` plus every project-level `.claude/`), scored across seven dimensions with delta tracking and a self-improving heuristics loop.

## Usage

```
/config-audit            # full audit — all 7 dimensions
/config-audit --quick    # dimensions 1-3 only (Duplication, Security, Staleness)
/config-audit --dimension N   # run a single dimension (1-7)
/config-audit --fix      # generate the report, then offer auto-remediation
```

## Features

- **Seven dimensions** — Duplication, Security, Staleness, Consistency, Coverage Gaps, Optimization, and Innovation, each scored 1-10 with deterministic finding IDs.
- **Token-disciplined inventory** — discovers config via Glob/Grep, reads only what comparisons require, and fans dimensions out to parallel haiku agents to keep main context clean.
- **Project scope tiers** — client/secret-handling repos get full scrutiny; scratch/experiment repos are exempt via `.audit-ignore`, so coverage findings don't inflate on throwaway work.
- **Delta tracking** — compares against the previous report to classify findings as New / Persistent / Regressed / Resolved.
- **Heuristic promotion loop** — findings that persist across three runs graduate into a hygiene-heuristics ledger the audit reads on future runs.
- **`--fix` auto-remediation** — offers before/after previews for stale paths, identical duplicate copies, missing directories, and broken hook references, applying only on confirmation.

## Installation

Copy to your Claude Code skills directory:

**Linux/macOS:**
```bash
cp -r config-audit ~/.claude/skills/
```

**Windows PowerShell:**
```powershell
Copy-Item -Recurse config-audit "$env:USERPROFILE\.claude\skills\"
```

---
**Author:** Nick Martin, Founder - [PatriotAgentic LLC](https://patriotagentic.com)
**License:** MIT
