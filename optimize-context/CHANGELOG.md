# Changelog

All notable changes to the `/optimize-context` skill will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

## [2.0.0] - 2026-07-12

Ground-up rework driven by a year of real usage: append-only pattern files drift into lies. On a production repo, a pattern labeled "(1 file)" silently excluded 473 test files, and after eight append runs the files *surviving* `/prime` were mostly historical session handoffs and megabytes of PNGs — exactly what should have been excluded.

### Changed (BREAKING)
- **Renamed `.claudeignore` → `.primeignore`** to match the `prime-quick`/`prime-full` commands in this repo, which support it natively. Migrate with `mv .claudeignore .primeignore` then `/optimize-context --reconcile`.
- Modes are now: *(default)* create/append, `analyze`, `--reconcile` (replaces `sync`)
- Negation patterns (`!`) are now supported — required for allowlist mode

### Added
- **Verify-against-the-artifact discipline**: every per-pattern count comes from `git ls-files -ci --exclude='PATTERN'`; whole-file ground truth from `git ls-files -ci --exclude-from=.primeignore`; mandatory post-write verification
- **Measured token estimates** (matched bytes ÷ 4) instead of per-file guesses
- **`--reconcile` mode**: full regeneration — collapses dated appendix sections, drops zero-match and subsumed patterns, corrects label drift; preserves untagged user patterns. Auto-recommended when ≥3 dated sections exist or any label is off by >2x
- **Allowlist flip**: at >70% cumulative exclusion, proposes inverting to `*` / `!*/` / `!includes` form (drift-safe: new files default to excluded)
- **Derived protected set**: entry points from manifest/Dockerfile/CLAUDE.md run instructions, files CLAUDE.md links to, rule-mandated directories
- **Environment-derived categories**: name-convention scan (`archive|handoff|brainstorm|render|snapshot|deprecated|old`), size/binary scan (>100KB, media), dense-directory scan, git-cold signal
- **Active/archive split rule**: never blanket-exclude a directory the project splits into active vs. archived halves
- New built-in historical-artifact categories: `.claude/handoffs/`, `.claude/brainstorms/`, `plans/archive/`
- Existing-file audit: flags stale (zero-match), subsumed, and mislabeled patterns before proposing additions

### Fixed
- Cumulative exclusion check (was per-run only, so repeated runs could sail past the 80% warning)
- Category labels that understate a pattern's real scope (the "(1 file)" → 473 files class of error)

## [1.0.0] - 2026-02-10

### Added
- Initial release of `/optimize-context` skill
- Three operating modes:
  - `create` - Generate new `.claudeignore` file
  - `analyze` - Preview candidates without writing files
  - `sync` - Update existing `.claudeignore` preserving user patterns
- Automatic project scanning:
  - Large files detection (>2000 lines)
  - Dense directories detection (>50 files)
  - Known low-signal pattern matching
  - Token savings estimation
- Reference library (`default-patterns.md`) with common patterns by project type:
  - Universal patterns (archives, large docs, generated code)
  - Node.js/TypeScript patterns (lock files, minified assets)
  - Python patterns (migrations, bytecode)
  - Docker/Infrastructure patterns (n8n workflows, data directories)
  - Database patterns (seed data, dumps, migrations)
  - Monorepo patterns (test fixtures, build configs)
- `.claudeignore` file format:
  - Gitignore-style syntax
  - Auto-generated patterns tagged with `# [auto]`
  - User patterns preserved during sync
- Integration with `/prime` skill:
  - Pre-context-loading `.claudeignore` check
  - Pattern matching during file discovery
  - Skipped files reporting in output
  - Graceful degradation when no `.claudeignore` exists
- Documentation:
  - Comprehensive README.md
  - Example `.claudeignore` file
  - Installation instructions
  - Usage examples
  - Troubleshooting guide
  - FAQ

### Features
- Smart filtering: never duplicates `.gitignore` patterns
- Soft exclusion: files remain fully accessible, just not loaded by `/prime`
- Token savings: 15K-115K tokens per `/prime` run (20-50% reduction)
- Project type detection: automatically identifies Node.js, Python, Docker, Database projects
- Estimated token savings per pattern category
- User confirmation before writing files

### Technical Details
- Skill type: Instruction-based (no executable scripts)
- Dependencies: None (uses native git commands)
- Platform: Cross-platform (Linux, macOS, Windows)
- Integration: Requires updated `/prime` skill

## [Unreleased]

### Planned Features
- Integration with `/learn` for session-informed patterns
- Support for project-specific pattern templates
- `/prime` staleness line: warn when .primeignore is older than N days/commits or new tracked files match no pattern
- Pattern impact analytics (actual token savings tracking across sessions)

---

## Version History

**v2.0.0** - Verified counts, `--reconcile`, allowlist mode, `.primeignore` rename
- Every pattern verified against `git ls-files -ci` (delivered the planned "validation command" and "auto-tagging with counts" as built-in steps)
- Tested on a 1,672-file production repo (found 87% cumulative exclusion with handoffs/PNGs as survivors)

**v1.0.0** - Initial public release
- Core functionality complete
- Tested on AI Concierge project (~115K token savings)
- Documentation complete
