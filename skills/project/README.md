# `/project` -- Multi-Project Navigator

List, switch, check status, and find stale projects across your whole workspace from anywhere.

## Usage

```
/project                 # list all projects grouped by category (default)
/project list            # same as above
/project status          # show only projects with noteworthy git status
/project stale           # projects with no commits in 30+ days
/project <name|alias>    # switch to a project (partial match) and auto-prime it
/project list ~/code     # override the auto-discovery base directory
```

## Features

- **Two sources, zero required setup** — uses an optional `projects.json` registry if present, otherwise auto-discovers git repos under a base directory (default `~/projects`).
- **Grouped overview** — `list` shows branch, last commit, and working-tree status per project, grouped by category.
- **Attention filter** — `status` surfaces only repos with uncommitted changes, ahead/behind remotes, detached HEAD, or off-main branches.
- **Staleness report** — `stale` ranks projects by days since last commit.
- **Fuzzy switch + prime** — match a project by partial name or alias, `cd` into it, then auto-invoke `/prime` for instant context.
- **Fault-tolerant** — missing paths and non-git directories are flagged and skipped, never fatal.

## Configuration

`projects.json` is **optional**. A template ships with this skill — copy it to `~/.claude/skills/project/projects.json` and fill in your projects (name, optional alias, path, optional category and stack), or delete it to rely on auto-discovery.

## Installation

Copy to your Claude Code skills directory:

**Linux/macOS:**
```bash
cp -r project ~/.claude/skills/
```

**Windows PowerShell:**
```powershell
Copy-Item -Recurse project "$env:USERPROFILE\.claude\skills\"
```

---
**Author:** Nick Martin, Founder - [PatriotAgentic LLC](https://patriotagentic.com)
**License:** MIT
