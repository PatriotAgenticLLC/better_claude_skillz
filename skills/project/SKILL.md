---
name: project
description: Navigate and manage multiple projects. List, switch, check status, and find stale projects across the workspace.
argument-hint: "[list|status|stale|<project-name>]"
---

# Project Navigator

Navigate and manage multiple projects from anywhere in your workspace.

## Where projects come from

The navigator resolves your project list from one of two sources, in order:

1. **Optional registry** — if `~/.claude/skills/project/projects.json` exists, use it. Each entry has a `name`, optional `alias`, `path`, optional `category`, and optional `stack`. A template ships alongside this skill; copy it and fill in your own projects (or delete it to fall back to auto-discovery).
2. **Auto-discovery (default)** — if there is no registry, discover git repositories under a base directory. The base defaults to `~/projects`; override it by passing a path argument. Treat the immediate parent sub-directory of each repo as its **category** (e.g. a repo at `~/projects/web/my-app` gets category `web`). Derive the `name` from the repo directory name.

Projects can be matched by **name** (full or partial) or **alias** (short name). Matching is case-insensitive and supports partial matches (e.g., "api" matches "billing-api-service").

Whenever a path uses `~`, expand it to the current user's home (`$HOME`) before running any command.

## Arguments

Check `$ARGUMENTS` to determine the subcommand:

### `/project list`

List all known projects grouped by category. For each project:

1. Resolve the project list (registry or auto-discovery).
2. For each project, expand `~` to `$HOME` and run:
   ```bash
   git -C <path> log -1 --format="%ci|%s" 2>/dev/null
   git -C <path> branch --show-current 2>/dev/null
   git -C <path> status --porcelain 2>/dev/null | head -5
   ```
3. Display as a table grouped by category:

```
## web
| Project | Branch | Last Commit | Status |
|---------|--------|-------------|--------|
| my-app  | main   | 2d ago - fix: rate limiter | Clean |
| web-ui  | main   | 5h ago - feat: reports     | 3 modified |

## services
| Project | Branch | Last Commit | Status |
...
```

**Important:** Run git commands in parallel where possible (batch multiple projects). Use `2>/dev/null` to handle non-git directories gracefully.

### `/project status`

Show detailed git status across ALL projects. For each project:

1. Resolve the project list.
2. For each project run:
   ```bash
   git -C <path> status --porcelain 2>/dev/null
   git -C <path> branch -vv --no-color 2>/dev/null | head -3
   ```
3. Display only projects that have noteworthy status:
   - Uncommitted changes (modified, untracked, staged)
   - Branch ahead/behind remote
   - Detached HEAD
   - Not on main/master branch

Skip projects with clean status on main/master. At the end, report: "X of Y projects clean, Z need attention."

### `/project stale`

Find projects with no recent activity. For each project:

1. Resolve the project list.
2. For each project run:
   ```bash
   git -C <path> log -1 --format="%ci" 2>/dev/null
   ```
3. Calculate days since last commit.
4. Display projects with no commits in the last 30 days, sorted by staleness:

```
## Stale Projects (no commits in 30+ days)
| Project | Last Commit | Days Ago | Category |
|---------|-------------|----------|----------|
| old-tool   | 2026-02-16 | 58 | experiments |
| prototype  | 2026-02-16 | 58 | experiments |
...

X of Y projects are stale.
```

### `/project <name>` (switch to project)

Switch to a specific project by name or alias:

1. Resolve the project list.
2. Match `$ARGUMENTS` against project names and aliases (case-insensitive, partial match).
3. If exactly one match:
   - Expand `~` to `$HOME`.
   - Verify the directory exists using `test -d <path>`.
   - Use Bash to run: `cd <path> && pwd`.
   - Report: "Switched to **<project-name>** (`<path>`)".
   - Then automatically invoke `/prime` (quick mode) by calling the Skill tool with skill "prime".
4. If multiple matches: list them and ask the user to be more specific.
5. If no match: report "No project matching '<name>' found" and show available projects.

### `/project` (no arguments)

If `$ARGUMENTS` is empty, default to `/project list`.

## Error Handling

- If a project path doesn't exist, mark it as "MISSING" in output and continue.
- If a directory is not a git repo, mark it as "Not a git repo" and continue.
- Never fail the entire command because one project has an issue.

## Notes

- The optional registry file can be edited manually to add/remove projects, set aliases, and override categories.
- Paths use `~`, which must be expanded to `$HOME` before use.
- All git operations use `git -C <path>` to avoid changing the working directory.
