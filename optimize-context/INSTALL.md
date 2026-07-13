# Quick Installation Guide

## Prerequisites

- Claude Code installed
- Access to `~/.claude/skills/` directory (or `C:\Users\<username>\.claude\skills\` on Windows)

## Installation Steps

### Option 1: Manual Copy (Recommended)

**Linux/macOS:**
```bash
cp -r optimize-context ~/.claude/skills/
```

**Windows PowerShell:**
```powershell
Copy-Item -Recurse -Force optimize-context C:\Users\$env:USERNAME\.claude\skills\
```

### Option 2: Symbolic Link (For Development)

**Linux/macOS:**
```bash
ln -s "$(pwd)/optimize-context" ~/.claude/skills/optimize-context
```

**Windows PowerShell (Run as Administrator):**
```powershell
New-Item -ItemType SymbolicLink -Path "C:\Users\$env:USERNAME\.claude\skills\optimize-context" -Target "$PWD\optimize-context"
```

## Post-Installation: `/prime` Integration

`.primeignore` only has an effect if your `/prime` skill reads it.

### Easiest path: use this repo's prime commands

The `prime-quick` and `prime-full` commands in this repo already support `.primeignore` natively (Step 0 of their process: parse patterns, filter all listing/reading, protect `CLAUDE.md`/manifests/entry points, report savings). Install them alongside this skill and you're done.

### Retrofitting another `/prime` skill

**Note:** The original `/prime` skill is part of [Cole Medin's PIV Loop methodology](https://github.com/coleam00). If you use it (or any other prime variant), insert this block immediately after the frontmatter of its `SKILL.md`:

```markdown
## Step 0: Apply .primeignore Filters

Before listing or reading any files, check if `.primeignore` exists in the project root:

1. If `.primeignore` exists, read it and parse the patterns (skip lines starting with `#` and blank lines)
2. Apply these patterns as exclusion filters to ALL subsequent file listing and reading in this prime session
3. Support `!pattern` syntax to negate an exclusion (force-include a file)
4. **Protected files** — NEVER exclude regardless of patterns:
   - `CLAUDE.md` (project instructions)
   - Manifest files: `package.json`, `requirements.txt`, `pyproject.toml`, `composer.json`, `go.mod`, `Cargo.toml`
   - `.primeignore` itself
   - The project's entry points
5. In the output report, note: "X files excluded by .primeignore (estimated ~YK tokens saved)"

If `.primeignore` does not exist, proceed normally with no filtering.
```

## Migrating from v1.x (`.claudeignore`)

```bash
mv .claudeignore .primeignore
```

Then run `/optimize-context --reconcile` — auto patterns get re-verified with real counts; your custom (untagged) patterns are preserved.

## Verification

### 1. Check Skill is Available

In Claude Code, type `/optimize-context` and press Tab. It should autocomplete.

### 2. Test in a Project

```
/optimize-context analyze
```

You should see a scan with verified per-pattern counts, measured token estimates, and cumulative exclusion %.

### 3. Test `/prime` Integration

After creating a `.primeignore`:
```
/prime
```

The output should note how many files were excluded and the estimated savings.

### 4. Spot-Check a Pattern Yourself

The same ground-truth command the skill uses:
```bash
git ls-files -ci --exclude-from=.primeignore | wc -l
```

## Troubleshooting

### Skill not found

```bash
# Should show SKILL.md
ls ~/.claude/skills/optimize-context/SKILL.md
```

### `/prime` not skipping files

Verify your `/prime` skill has the `.primeignore` Step 0 integration (see above), or install this repo's `prime-quick`/`prime-full`.

### Pattern not matching

Don't debug by reading the pattern — ask git:
```bash
git ls-files -ci --exclude='your/pattern/'
```
Common causes: patterns don't cross `/` unless written to; a `!` re-include cannot resurrect a file whose parent directory is excluded (allowlist mode needs `!*/`); paths are relative to project root (`src/data/`, not `./src/data/`).

---

**Installation complete!** You can now use `/optimize-context` in your projects.
