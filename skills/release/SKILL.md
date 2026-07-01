---
name: release
description: Bump version, generate changelog from conventional commits, create git tag, and optionally trigger deployment.
argument-hint: "[patch|minor|major|--changelog|--tag-only]"
---

# Release Manager

Bump version, generate changelog from conventional commits, create a git tag, and optionally hand off to your deployment step.

Base directory for this skill: `~/.claude/skills/release`

## Arguments

Parse `$ARGUMENTS`:

- **`patch`:** Bump patch version (1.2.3 -> 1.2.4) — default if no level specified
- **`minor`:** Bump minor version (1.2.3 -> 1.3.0)
- **`major`:** Bump major version (1.2.3 -> 2.0.0)
- **`--changelog`:** Generate changelog only, no version bump or tag
- **`--tag-only`:** Create tag from current version without bumping
- **`--deploy`:** After tagging, push the tag and hand off to your project's deployment workflow

## Process

### Step 1: Detect Current Version

Search for version in these locations (first match wins):

1. **package.json:** `"version": "X.Y.Z"`
   ```bash
   python3 -c "import json; print(json.load(open('package.json'))['version'])" 2>/dev/null
   ```

2. **pyproject.toml:** `version = "X.Y.Z"`
   ```bash
   grep -m1 '^version' pyproject.toml 2>/dev/null | sed 's/.*"\(.*\)".*/\1/'
   ```

3. **CLAUDE.md:** Look for version patterns like `v1.2.3`, `Version: 1.2.3`, or `**Version:** 1.2.3`
   ```bash
   grep -m1 -oE '[vV]?[0-9]+\.[0-9]+\.[0-9]+' CLAUDE.md 2>/dev/null
   ```

4. **Latest git tag:**
   ```bash
   git describe --tags --abbrev=0 2>/dev/null
   ```

If no version found: report "No version found. Set an initial version first (e.g., add `version = \"0.1.0\"` to pyproject.toml)." and stop.

Report: `Current version: X.Y.Z (from <source>)`

### Step 2: Calculate New Version

Based on the bump level argument:

```
patch: X.Y.Z -> X.Y.(Z+1)
minor: X.Y.Z -> X.(Y+1).0
major: X.Y.Z -> (X+1).0.0
```

Report: `New version: X.Y.Z -> A.B.C`

If `--changelog` flag: skip to Step 4.
If `--tag-only` flag: skip to Step 5.

### Step 3: Update Version in Source

Update the version in the same file where it was found:

**package.json:**
```bash
# Use python to update JSON cleanly
python3 -c "
import json
with open('package.json', 'r') as f:
    data = json.load(f)
data['version'] = '<new-version>'
with open('package.json', 'w') as f:
    json.dump(data, f, indent=2)
    f.write('\n')
"
```

**pyproject.toml:** Use the Edit tool to replace the version line.

**CLAUDE.md:** Use the Edit tool to replace the version string.

Also update the `Last Updated` date in CLAUDE.md to today's date if it exists.

### Step 4: Generate Changelog

Generate a changelog from conventional commits since the last tag:

```bash
# Get the last tag
LAST_TAG=$(git describe --tags --abbrev=0 2>/dev/null || echo "")

# Get commits since last tag (or all commits if no tag)
if [ -n "$LAST_TAG" ]; then
  git log $LAST_TAG..HEAD --pretty=format:"%s|%h|%an" --no-merges
else
  git log --pretty=format:"%s|%h|%an" --no-merges -50
fi
```

Parse conventional commit prefixes and group:

```markdown
## <new-version> (<today's date>)

### Features
- feat: description (abc1234)

### Bug Fixes
- fix: description (def5678)

### Refactoring
- refactor: description (ghi9012)

### Documentation
- docs: description (jkl3456)

### Other
- chore: description (mno7890)
```

If `--changelog` flag only: output the changelog and stop. Don't write it to a file unless there's an existing CHANGELOG.md.

If CHANGELOG.md exists in the project root, prepend the new section to it.
If no CHANGELOG.md exists, just output the changelog to the user.

### Step 5: Create Git Tag

```bash
# Stage version changes
git add -A

# Commit version bump
git commit -m "chore: release v<new-version>"

# Create annotated tag
git tag -a "v<new-version>" -m "Release v<new-version>"
```

Report:
```
Created tag: v<new-version>
Commits in this release: N
```

### Step 6: Deploy (if --deploy)

If `--deploy` flag was provided:
1. Ask for confirmation: "Push tag and deploy v<new-version>? (y/n)"
2. If yes:
   ```bash
   git push origin main --tags
   ```
3. Then hand off to your project's deployment workflow (e.g. a `/deploy` command or CI pipeline).

If no `--deploy` flag: report "Tag created locally. Push with: `git push origin main --tags`"

## Output

```
## Release: <project-name> v<new-version>

Version: <old> -> <new> (<bump-level>)
Source: <where version was found>
Changelog: <N> commits since last release

### Changes
<grouped changelog>

### Actions Taken
- [x] Version bumped in <file>
- [x] CLAUDE.md Last Updated date set to <today>
- [x] Changelog generated (<N> entries)
- [x] Changes committed
- [x] Tag v<new-version> created
- [ ] Pushed to remote (run: git push origin main --tags)
- [ ] Deployed (run your deploy workflow)
```

## Error Handling

- If not in a git repo: report and stop
- If working directory is dirty: warn "Uncommitted changes. Commit or stash before releasing."
- If the tag already exists: report "Tag v<new-version> already exists" and stop
- If no conventional commits found: generate changelog with raw commit messages instead
- Never force-push or overwrite existing tags

## Notes

- This skill follows conventional commits format (feat:, fix:, refactor:, docs:, chore:, perf:, test:, ci:)
- Non-conventional commits are grouped under "Other"
- The version bump commit uses `chore: release v<version>` format
- Tags are always prefixed with `v` (e.g., `v1.2.3`)
