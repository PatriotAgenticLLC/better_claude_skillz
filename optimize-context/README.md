# `/optimize-context` — Smart Context Exclusion for Claude Code

A Claude Code skill that intelligently manages which files are loaded during `/prime` context gathering, saving 20-50% of tokens while keeping all files accessible.

## Overview

This skill implements a **three-layer file exclusion model** for Claude Code projects:

| Layer | Mechanism | Effect | Use For |
|-------|-----------|--------|---------|
| **Hard Block** | `permissions.deny` | Cannot read at all | Secrets (.env, credentials) |
| **Noise Filter** | `.gitignore` | Not tracked, not visible | Build artifacts (node_modules, dist) |
| **Soft Skip** | `.claudeignore` | Tracked & readable, skipped by `/prime` | Large tracked files (workflows, migrations, archives) |

The skill manages Layer 3 — **soft skips** via a project-level `.claudeignore` file.

## Key Features

- **Three operating modes**: create, analyze, sync
- **Project scanning**: Identifies large files, dense directories, and known low-signal patterns
- **Smart filtering**: Never duplicates patterns already in `.gitignore`
- **Soft exclusion**: Files remain fully accessible, just not loaded by default
- **Token savings**: Typically 15K-115K tokens per `/prime` run depending on project
- **Reference library**: Common patterns for Node.js, Python, Docker, Database projects
- **Integration ready**: Works with updated `/prime` skill to respect `.claudeignore`

## What Gets Soft-Skipped?

Common candidates automatically identified:

- **Large JSON/YAML exports** (n8n workflows, API specs, OpenAPI docs)
- **Archive directories** (`_archive/`, `old/`, `deprecated/`)
- **Database migrations** (historical migration files)
- **Test fixtures** (large data files for testing)
- **Generated code** (Prisma client, GraphQL types)
- **PageIndex data** (ingested/indexed documents)
- **Lock files** (if tracked: package-lock.json, yarn.lock)
- **Minified assets** (if tracked: *.min.js, *.min.css)

## Installation

### 1. Copy Skill Files

```bash
# Copy to your Claude Code skills directory
cp -r optimize-context ~/.claude/skills/

# Or on Windows:
xcopy /E /I optimize-context C:\Users\<username>\.claude\skills\optimize-context
```

### 2. Update `/prime` Skill (REQUIRED)

**Note:** The `/prime` skill is part of Cole Medin's PIV Loop methodology. This integration extends `/prime` with `.claudeignore` support.

The skill needs an updated `/prime` that reads `.claudeignore`. Add this section to your `~/.claude/skills/prime/SKILL.md` after the frontmatter (before "Check $ARGUMENTS"):

```markdown
## .claudeignore Integration

**Before any context loading**, check for a `.claudeignore` file:

1. Look for `.claudeignore` in the project root (same directory as CLAUDE.md or package.json)
2. If found, read it and parse the patterns (skip comment lines starting with `#` and blank lines)
3. During all subsequent file discovery and reading steps:
   - When listing files (git ls-files, find, ls), mentally filter out paths matching `.claudeignore` patterns
   - When deciding which files to read, skip matches
   - Track what was skipped for the output report
4. At the end of the prime output, add:

\`\`\`
## Context Optimization (.claudeignore)
Skipped N files/directories matching .claudeignore patterns:
- [pattern]: [description of what was skipped]
Files remain fully accessible — ask to read any of them directly.
To update: /optimize-context sync
\`\`\`

**Pattern matching rules (simplified gitignore):**
- `directory/` — skip entire directory and all contents
- `*.ext` — skip all files with that extension
- `path/to/file` — skip that specific file
- Patterns are relative to project root

**Important:**
- `.claudeignore` is a SOFT SKIP. It only affects /prime context loading.
- If the user asks to read a skipped file, read it normally.
- Do NOT confuse this with `permissions.deny` (hard block) or `.gitignore` (untracked files).
- If no `.claudeignore` exists, proceed normally (no warning needed).
```

Also update the Token Budget sections in both Quick Mode and Full Mode:

```markdown
**With .claudeignore**: Token usage may be 20-50% lower depending on how many large tracked files are skipped.
```

### 3. Verify Installation

```bash
# List available skills - should include optimize-context
claude code
# Then type /optimize-context [tab] to see if it autocompletes
```

## Usage

### Mode 1: Analyze (Safe, Read-Only)

Preview what would be skipped without writing any files:

```
/optimize-context analyze
```

This scans your project and reports findings:
- Large files (>2000 lines)
- Dense directories (>50 files)
- Known low-signal patterns (archives, migrations, fixtures)
- Estimated token savings

### Mode 2: Create (First-Time Setup)

Generate `.claudeignore` for a project:

```
/optimize-context create
```

**Process:**
1. Checks for existing `.claudeignore` (warns if found)
2. Reads `.gitignore` to avoid duplicates
3. Scans tracked files for soft-skip candidates
4. Presents findings with token estimates
5. Asks for confirmation
6. Writes `.claudeignore` to project root

### Mode 3: Sync (Update Existing)

Update an existing `.claudeignore` with fresh scan results:

```
/optimize-context sync
```

**Process:**
1. Reads existing `.claudeignore`
2. Separates user-added patterns from auto-generated ones
3. Re-scans project
4. Merges: keeps user patterns, replaces auto-generated
5. Presents diff
6. Updates file after confirmation

**User vs Auto Patterns:**
- Auto-generated lines have `# [auto]` tag
- User-added lines have no tag
- `sync` preserves all user patterns

## `.claudeignore` Format

Gitignore-style syntax:

```gitignore
# .claudeignore — Soft Context Exclusion
# Files remain accessible, just not loaded by /prime

# Large workflow exports
n8n/workflows/*.json              # [auto] 4 files, ~50K tokens

# Archive directories
_archive/                          # [auto] deprecated code

# Database migrations
db/migrations/                     # [auto] historical migrations

# Custom user pattern (no tag)
docs/massive-api-spec.yaml
```

**Pattern rules:**
- `#` for comments
- `directory/` to skip entire directory
- `*.ext` for file type patterns
- `path/to/file` for specific files
- One pattern per line
- No negation patterns (keep it simple)

## Example Workflow

### First-Time Project Setup

```bash
# 1. Navigate to project
cd ~/projects/my-app

# 2. Analyze first (optional, but recommended)
/optimize-context analyze

# 3. Review findings, then create
/optimize-context create

# 4. Test with prime
/prime

# Expected: "Context Optimization" section showing skipped files
```

### Quarterly Maintenance

```bash
# Re-sync after adding large files or data
/optimize-context sync
```

## Integration with `/prime`

After creating `.claudeignore`, `/prime` will:

1. ✅ Read `.claudeignore` at startup
2. ✅ Skip matched files during discovery
3. ✅ Skip matched files during reading
4. ✅ Report what was skipped in output summary
5. ✅ Keep files fully accessible for explicit reads

**Example `/prime` output with `.claudeignore`:**

```
## Context Optimization (.claudeignore)
Skipped 18 files/directories matching .claudeignore patterns:
- n8n/workflows/*.json: 4 workflow exports (~50K tokens)
- pageindex/data/: 6 ingested documents (~10K tokens)
- _archive/: 8 deprecated files (~15K tokens)

Files remain fully accessible — ask to read any of them directly.
To update: /optimize-context sync
```

## Token Savings

Real-world examples:

| Project Type | Patterns | Est. Savings | % Reduction |
|--------------|----------|--------------|-------------|
| Full-stack app with n8n | 5 patterns | 40K-60K tokens | 25-35% |
| Monorepo with migrations | 8 patterns | 60K-90K tokens | 35-45% |
| Large Node.js API | 6 patterns | 50K-80K tokens | 30-40% |

**Note:** `.gitignore` already saves 50K-100K tokens by excluding node_modules. These are *additional* savings from tracked files.

## Files in This Package

```
optimize-context/
├── README.md                  # This file
├── SKILL.md                   # Main skill definition
├── default-patterns.md        # Reference library by project type
└── example.claudeignore       # Example file
```

## Best Practices

### DO:
- ✅ Run `analyze` before `create` to preview
- ✅ Commit `.claudeignore` to git (it's project config)
- ✅ Use `sync` after adding large data files
- ✅ Review patterns quarterly
- ✅ Add custom patterns for project-specific needs
- ✅ Keep patterns focused on large/low-signal files

### DON'T:
- ❌ Put secrets in `.claudeignore` (use `permissions.deny`)
- ❌ Duplicate `.gitignore` patterns (redundant)
- ❌ Skip source code (defeats the purpose)
- ❌ Skip configs/docs (usually small and valuable)
- ❌ Use for security (it's context optimization, not access control)

## FAQ

### Q: Can I still read files in `.claudeignore`?

**A:** Yes! `.claudeignore` is a **soft skip**. Files remain fully accessible. Just ask Claude to read them explicitly:

```
Read n8n/workflows/chat_pipeline_v6.json
```

### Q: What's the difference between `.claudeignore` and `permissions.deny`?

**A:**
- **`.claudeignore`** = Soft skip, only affects `/prime`, files remain readable
- **`permissions.deny`** = Hard block, prevents ALL access, use for secrets

### Q: Will this break my workflow?

**A:** No. If you need a skipped file, Claude can read it on request. `/prime` just won't load it automatically.

### Q: Should I commit `.claudeignore` to git?

**A:** Yes! It's project configuration that helps the whole team. Like `.gitignore`, it should be shared.

### Q: Can I manually edit `.claudeignore`?

**A:** Absolutely! Add any patterns you want. Use `sync` to refresh auto-generated patterns while keeping your additions.

### Q: How do I remove this feature?

**A:** Just delete `.claudeignore` from your project. `/prime` will work normally without it.

## Troubleshooting

### Issue: Skill not showing up

**Solution:** Verify installation path:
```bash
ls ~/.claude/skills/optimize-context/SKILL.md
```

### Issue: `/prime` not skipping files

**Solution:** Check if you updated `/prime` skill with `.claudeignore` integration (see Installation step 2).

### Issue: Pattern not matching

**Solution:** Check pattern syntax:
- Directories need trailing slash: `migrations/`
- Globs work: `*.json`
- Paths relative to project root: `src/data/` not `./src/data/`

## Version History

**v1.0.0** (2026-02-10)
- Initial release
- Three modes: create, analyze, sync
- Reference library for common patterns
- Integration with `/prime` skill
- Supports gitignore-style patterns

## License

This skill is part of the Everything Claude Code methodology and is provided as-is for personal and team use.

## Credits

**Author:** Nick Martin, Founder - [PatriotAgentic LLC](https://patriotagentic.com)
**Date:** February 10, 2026

**Integrates with:**
- [`/prime` skill](https://github.com/coleam00) by Cole Medin — Part of the PIV Loop methodology
- Everything Claude Code by Affaan Mustafa

**Note:** This skill extends Cole Medin's `/prime` skill with `.claudeignore` support for context optimization. The original `/prime` skill and PIV Loop methodology were created by Cole Medin.

---

**License:** MIT
