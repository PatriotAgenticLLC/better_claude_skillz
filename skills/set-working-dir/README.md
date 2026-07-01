# `/set-working-dir` -- Change Working Directory or Switch Project

Point Claude at a different directory -- by absolute/relative path or by locating a project by name under a search root you supply -- then verify it's set, with clear guidance on how working-directory changes do and don't persist between tool calls.

## Usage

```
/set-working-dir [path-or-project-name]
```

- `/set-working-dir ~/projects/my-app` -- direct path (absolute, relative, `~`, or Windows)
- `/set-working-dir my-app` -- search for a project by name under your search root (default `~`)

## Features

- Accepts absolute, relative, `~`, and Windows-style paths, normalizing them for bash
- Locates a project by name under a user-supplied search root -- no hardcoded project registry
- Verifies the target with real checks: `ls`, a file read, and `git status`, and reports the current branch
- Explains working-directory persistence: `cd` does not carry between bash calls (chain `cd path &&`), and file ops should use absolute paths
- Helpful errors for missing directories, unfound projects, and non-git targets
- Stores the resolved path in session memory for the rest of the session

## Installation

Copy to your Claude Code skills directory:

**Linux/macOS:**
```bash
cp -r set-working-dir ~/.claude/skills/
```

**Windows PowerShell:**
```powershell
Copy-Item -Recurse set-working-dir "$env:USERPROFILE\.claude\skills\"
```

---

**Author:** Nick Martin, Founder - [PatriotAgentic LLC](https://patriotagentic.com)

**License:** MIT
