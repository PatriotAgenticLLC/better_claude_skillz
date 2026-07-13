# `/optimize-context` — Smart Context Exclusion for Claude Code

A Claude Code skill that manages which files are loaded during `/prime` context gathering — with every pattern **verified against git's own matcher** — saving 20-50% of tokens while keeping all files accessible.

## Overview

This skill implements a **three-layer file exclusion model** for Claude Code projects:

| Layer | Mechanism | Effect | Use For |
|-------|-----------|--------|---------|
| **Hard Block** | `permissions.deny` | Cannot read at all | Secrets (.env, credentials) |
| **Noise Filter** | `.gitignore` | Not tracked, not visible | Build artifacts (node_modules, dist) |
| **Soft Skip** | `.primeignore` | Tracked & readable, skipped by `/prime` | Large tracked files (archives, migrations, handoffs) |

The skill manages Layer 3 — **soft skips** via a project-level `.primeignore` file.

## What's New in 2.0

v2.0 is a ground-up rework driven by what a year of real usage revealed: append-only pattern files drift into lies. On one production repo, a pattern labeled "(1 file)" silently excluded 473 test files, and after eight append runs the survivors of `/prime` were mostly historical session handoffs and 2MB of PNGs — the exact files that should have been excluded.

- **Verify against the artifact.** Every count comes from `git ls-files -ci --exclude='PATTERN'`, never from reading the pattern. Post-write verification is mandatory.
- **Measured token estimates.** Bytes ÷ 4 on the actual matched files, not per-file guesses.
- **`--reconcile` mode.** Regenerates the whole file: collapses dated appendix sections, drops stale/subsumed patterns, corrects label drift. Auto-recommended when accretion is detected.
- **Allowlist flip.** When cumulative exclusion passes 70%, the skill proposes inverting to an allowlist (`*` / `!*/` / `!includes`) — shorter and drift-safe, since new files default to excluded instead of silently leaking into prime.
- **Derived protected set.** Entry points from manifests/Dockerfile/CLAUDE.md, files CLAUDE.md links to, and rule-mandated directories — not just a hardcoded filename list.
- **Environment-derived categories.** Scans for the project's own junk-drawer conventions (`archive|handoff|brainstorm|render|snapshot|deprecated`), >100KB and binary files, and dense data directories.
- **Active/archive split rule.** Never blanket-excludes a directory the project splits into active vs. archived (e.g. `plans/` vs `plans/archive/`).
- **Renamed to `.primeignore`** to match the `prime-quick`/`prime-full` commands in this repo, which already support it natively.

**Migrating from 1.x:** `mv .claudeignore .primeignore`, then run `/optimize-context --reconcile` to get verified counts. Your custom (untagged) patterns are preserved.

## What Gets Soft-Skipped?

Common candidates automatically identified:

- **Historical artifacts** (archived plans, session handoffs, past code reviews, brainstorm docs)
- **Archive directories** (`_archive/`, `old/`, `deprecated/`)
- **Large JSON/YAML exports** (n8n workflows, API specs, OpenAPI docs)
- **Database migrations** and **test fixtures**
- **Generated code** (Prisma client, GraphQL types)
- **Binary assets and >100KB files** (rendered PNGs, PDFs, media)
- **Lock files and minified assets** (if tracked)
- **Auto-loaded Claude config** (`.claude/commands/`, `.claude/agents/`, `.claude/rules/` — Claude Code loads these itself)

## Installation

```bash
# Copy to your Claude Code skills directory
cp -r optimize-context ~/.claude/skills/
```

Install the `prime-quick` and `prime-full` commands from this repo alongside it — they read `.primeignore` natively (Step 0 of their process). See `INSTALL.md` for details and for retrofitting an existing `/prime` skill.

## Usage

### Analyze (safe, read-only)

```
/optimize-context analyze
```

Scans the project and reports: verified per-pattern match counts, measured token estimates, large/binary survivors, cumulative exclusion %, and — if a `.primeignore` exists — stale, subsumed, and mislabeled patterns. Writes nothing.

### Default (create or append)

```
/optimize-context
```

Creates `.primeignore` if missing; otherwise proposes verified additions. Always presents recommendations and waits for explicit approval before writing. After writing, re-verifies with `git ls-files -ci --exclude-from=.primeignore` and reports the real numbers.

### Reconcile (regenerate)

```
/optimize-context --reconcile
```

Rebuilds the whole file from a fresh scan: one clean set of category sections, no dated appendices, every count re-verified. User-added patterns (lines without a `# [auto]` tag) are preserved verbatim. Run this periodically — a `.primeignore` older than ~30 days or ~50 commits in an active repo is presumptively stale.

## The Ground-Truth Commands

The skill's core discipline — never infer what a pattern matches by reading it; ask git:

```bash
git ls-files -ci --exclude-from=.primeignore    # everything excluded (ground truth)
git ls-files -ci --exclude='PATTERN'            # what one pattern matches
comm -23 <(git ls-files | sort) \
         <(git ls-files -ci --exclude-from=.primeignore | sort)  # survivors
```

Ignore-glob semantics surprise even careful authors: patterns don't cross `/`, a file can't be re-included if its parent directory is excluded, and anchoring rules differ by pattern shape. Verifying with git's own matcher makes those semantics irrelevant.

## `.primeignore` Format

Gitignore-compatible syntax:

```gitignore
# .primeignore — Soft Context Exclusion
# Files remain accessible, just not loaded by /prime

# Historical session handoffs (64 files verified, ~120K tokens measured)
.claude/handoffs/                  # [auto]

# Archived plans — active plans/ stays visible
plans/archive/                     # [auto]

# Custom user pattern (no tag — always preserved)
docs/massive-api-spec.yaml
```

**Allowlist mode** (recommended above 70% cumulative exclusion):

```gitignore
# Exclude everything, re-include what prime should read.
# The !*/ line is required — gitignore semantics cannot re-include
# a file whose parent directory is excluded.
*
!*/
!.primeignore
!CLAUDE.md
!README.md
!src/main.py
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
├── INSTALL.md                 # Installation guide
├── CHANGELOG.md               # Version history
├── VERSION                    # Current version
├── default-patterns.md        # Reference library by project type
└── example.primeignore        # Example file
```

## Best Practices

### DO:
- ✅ Run `analyze` first to preview
- ✅ Commit `.primeignore` to git (it's project config)
- ✅ Run `--reconcile` periodically — append-only growth accretes stale patterns
- ✅ Flip to allowlist mode when exclusion passes 70%
- ✅ Add custom patterns for project-specific needs (untagged lines are preserved)

### DON'T:
- ❌ Put secrets in `.primeignore` (use `permissions.deny`)
- ❌ Duplicate `.gitignore` patterns (redundant)
- ❌ Blanket-exclude a directory whose rules split active vs. archived contents
- ❌ Trust a pattern's comment over `git ls-files -ci` output
- ❌ Use for security (it's context optimization, not access control)

## FAQ

### Q: Can I still read files in `.primeignore`?

**A:** Yes. It's a **soft skip** — files remain fully accessible via Read, Grep, and Glob. Just ask for them.

### Q: What's the difference between `.primeignore` and `permissions.deny`?

**A:** `.primeignore` = soft skip, only affects `/prime`, files remain readable. `permissions.deny` = hard block, prevents ALL access, use for secrets.

### Q: I'm on 1.x with a `.claudeignore` — how do I migrate?

**A:** `mv .claudeignore .primeignore`, then `/optimize-context --reconcile`. Untagged patterns survive; auto patterns get re-verified.

### Q: Should I commit `.primeignore` to git?

**A:** Yes — it's shared project configuration, like `.gitignore`.

### Q: How do I remove this feature?

**A:** Delete `.primeignore` from your project. `/prime` works normally without it.

## Version History

**v2.0.0** (2026-07-12) — Verified counts, `--reconcile`, allowlist mode, derived protected set, renamed to `.primeignore`. See CHANGELOG.md.

**v1.0.0** (2026-02-10) — Initial release (`.claudeignore`, create/analyze/sync).

## Credits

**Author:** Nick Martin, Founder - [PatriotAgentic LLC](https://patriotagentic.com)

**Integrates with:**
- [`/prime` skill](https://github.com/coleam00) by Cole Medin — Part of the PIV Loop methodology
- Everything Claude Code by Affaan Mustafa

**Note:** This skill extends Cole Medin's `/prime` skill with `.primeignore` support for context optimization. The original `/prime` skill and PIV Loop methodology were created by Cole Medin.

---

**License:** MIT
