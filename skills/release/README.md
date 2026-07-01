# `/release` -- Version Bump, Changelog, and Tag

A one-command release workflow: detect the current version, bump it, generate a changelog from conventional commits, commit, and create an annotated git tag -- with an optional hand-off to your deployment step.

## Usage

```
/release [patch|minor|major|--changelog|--tag-only|--deploy]
```

- `patch` / `minor` / `major` -- semantic version bump (patch is the default)
- `--changelog` -- generate the changelog only, no bump or tag
- `--tag-only` -- tag the current version without bumping
- `--deploy` -- after tagging, push and hand off to your deploy workflow

## Features

- Auto-detects the current version from `package.json`, `pyproject.toml`, `CLAUDE.md`, or the latest git tag (first match wins)
- Semantic version bumping with clean in-place updates to the source file
- Changelog generated from conventional commits, grouped by Features / Bug Fixes / Refactoring / Documentation / Other
- Prepends to an existing `CHANGELOG.md`, or prints the changelog when there isn't one
- Annotated, `v`-prefixed git tags with a `chore: release vX.Y.Z` commit
- Safe by default: warns on dirty working tree, stops if the tag already exists, never force-pushes

## Installation

Copy to your Claude Code skills directory:

**Linux/macOS:**
```bash
cp -r release ~/.claude/skills/
```

**Windows PowerShell:**
```powershell
Copy-Item -Recurse release "$env:USERPROFILE\.claude\skills\"
```

---

**Author:** Nick Martin, Founder - [PatriotAgentic LLC](https://patriotagentic.com)

**License:** MIT
