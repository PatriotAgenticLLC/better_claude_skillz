---
name: optimize-context
description: Scan project, then generate or reconcile .primeignore patterns for smarter /prime loading
argument-hint: "[analyze|--reconcile]"
---

# /optimize-context — Generate or Reconcile .primeignore

## Purpose

Manage a `.primeignore` file that tells `/prime` which tracked files to skip during bulk context loading. Files listed in `.primeignore` remain **fully accessible** — they are not blocked, just not loaded by default.

This is Layer 3 of the exclusion model:

| Layer | Mechanism | Effect |
|-------|-----------|--------|
| Hard Block | `permissions.deny` | Cannot read at all (for secrets) |
| Noise Filter | `.gitignore` | Not tracked, not visible (for junk) |
| **Soft Skip** | **`.primeignore`** | **Tracked and readable, but skipped by `/prime`** |

## When to Use

- Setting up a new project for the first time
- After noticing `/prime` loaded large files that weren't useful
- After adding large data files, fixtures, or archives to the project
- When `/prime` feels slow or token-heavy

## Arguments

`$ARGUMENTS` options:
- *(none, default)* — Scan project; create `.primeignore` if missing, otherwise propose additions
- **`analyze`** — Scan and report findings without writing any files
- **`--reconcile`** — Regenerate the entire `.primeignore` from scratch: collapse dated appendix sections, drop subsumed and zero-match patterns, refresh every count against ground truth. User-added patterns (lines without a `# [auto]` tag) are always preserved.

**Auto-escalate to reconcile:** if the existing `.primeignore` has ≥3 dated "Added by /optimize-context" sections, OR verification (Step 3) finds any category whose real match count exceeds its labeled count by >2x, recommend `--reconcile` and get confirmation before proceeding in append mode. Append-only accretion is how pattern labels drift into lies.

## Core Principle: Verify Against the Artifact

**Never infer what a pattern matches by reading it. Ask git.** Ignore-glob semantics (patterns don't cross `/`, parent-dir exclusion blocks child re-inclusion, anchoring rules) routinely surprise even careful authors. Every count, every claim, every header comment in this skill's output must come from git's own matcher:

```bash
# Ground truth for the whole file:
git ls-files -ci --exclude-from=.primeignore          # what IS excluded
comm -23 <(git ls-files | sort) \
         <(git ls-files -ci --exclude-from=.primeignore | sort)   # what survives

# Ground truth for a single candidate pattern:
git ls-files -ci --exclude='PATTERN'
```

This principle **requires git** — it is the only faithful matcher for gitignore syntax and the only way to verify a count instead of guessing it. Outside a git repo the skill degrades to best-effort estimates (see Step 0); when that happens, say so plainly and never present an estimated count as verified.

## Process

### 0. Ground-Truth Source (git check — do this first)

Run `git rev-parse --is-inside-work-tree 2>/dev/null`.

- **Inside a git repo (default, verified path):** use the git-native flow below. All counts come from git's own matcher; the verification and `--reconcile` guarantees hold. This is strongly preferred.
- **Not a git repo:** do NOT hard-fail.
  1. **First recommend `git init`.** For any directory you prime repeatedly, this is the right fix — one non-destructive command that unlocks the fully-verified path plus version history. Weakening the analysis to avoid it is a bad trade.
  2. **If the user declines or can't init** (read-only mount, third-party tree, a synced vault where `.git` is unwelcome), run **best-effort mode** and label every output `no git — counts are ESTIMATES, unverified`:
     - **Discovery:** `find . -type f` minus a built-in junk-skip (`.git`, `node_modules`, `.venv`, `venv`, `__pycache__`, `dist`, `build`, `.next`, `target`, `.pytest_cache`) and minus anything matched by a local `.gitignore` if one exists (parse it).
     - **Matching:** approximate with `fnmatch`/glob — this is NOT gitignore-faithful (negation, `**`, anchoring, and parent-dir re-inclusion may differ). Never claim a verified count.
     - **Unavailable in this mode:** the verify-against-the-artifact guarantee, accurate `--reconcile` counts, and the allowlist-survivor check all depend on git — say so explicitly rather than fake them.

The rest of this process assumes the verified git path; in best-effort mode, substitute the fallbacks above and downgrade every "verified" claim to "estimated".

### 1. Detect Project Type

Check for manifest files: `package.json` (Node/TS), `requirements.txt`/`pyproject.toml` (Python), `composer.json` (PHP), `go.mod` (Go), `Cargo.toml` (Rust). None → generic. Use `default-patterns.md` (in this skill's directory) as the pattern reference library for the detected type.

### 2. Inventory and Existing State

- `git ls-files | wc -l` — total tracked files
- Read `.gitignore` (do NOT recommend patterns duplicating it — `git ls-files` already omits untracked files)
- Read `.claude/settings.json` deny rules if present
- If `.primeignore` exists, run the ground-truth commands above and record: **cumulative exclusion %**, the survivor list, and how old the file is (`git log -1 --format=%ci -- .primeignore`)

### 3. Audit the Existing File (if present)

For each existing pattern, check with `git ls-files -ci --exclude='PATTERN'`:
- **Zero-match patterns** → flag for removal (stale)
- **Subsumed patterns** (a later, broader pattern covers them entirely) → flag for removal
- **Label drift** (header comment count ≠ real count) → flag for correction
- **Rule conflicts** — a pattern that hides files project rules or CLAUDE.md depend on (see Step 4)

### 4. Derive the Protected Set (per-project, not hardcoded)

Never suggest excluding, and refuse patterns that match:
- `CLAUDE.md`, `README.md` (root), `.primeignore` itself
- All manifest files found in Step 1
- **The project's actual entry points** — derive from manifest `scripts`/`main` fields, Dockerfile `CMD`, and CLAUDE.md run instructions, not just a generic list (`app.py`, `index.ts`, `main.py`, `server.js`, `main.go`)
- **Files CLAUDE.md links to** — grep CLAUDE.md for relative file paths; anything it references is load-bearing context
- **Rule-mandated reads** — scan `.claude/rules/*.md` for directories the rules require reading

### 4b. Establish the Prime Cost Model (what actually gets read)

`.primeignore` savings depend entirely on **how `/prime` reads** — model it before estimating anything:

- **Full mode** full-reads every surviving doc and source file → savings ≈ `bytes ÷ 4` of what you exclude. This is where a bloated survivor set hurts most (a >100K prime is almost always full mode).
- **Quick mode** full-reads only CLAUDE.md + README (100 lines) + entry point (100 lines), then **greps signatures** from source (`^class |^def |^export |^function `) and merely *lists* everything else. A source file's quick-mode cost ≈ its signature-line count × ~12 tokens, NOT `bytes ÷ 4`. Docs/data/binary that quick mode never reads cost ~one listing line each.

Detect the user's usual mode (ask if unknown; default full, since that's where optimization pays). Estimate and prioritize against that mode:
- Full mode → rank candidates by `bytes ÷ 4`.
- Quick mode → excluding a doc/data file saves little (it wasn't read); the real quick-mode lever is **grep breadth** — the *count* of surviving source files, since each contributes signature lines. Rank by file-count of source subtrees, not byte size.

Always report the **fully-read floor** — the token cost of the protected, always-read set (CLAUDE.md + README head + entry point). Prime cannot go below this via `.primeignore`; if the user's target is under the floor, say so and point them at trimming CLAUDE.md / the injected rules stack / connected MCP servers instead.

### 5. Categorize Every Tracked File

**KEEP:** source files in the architectural core (the modules CLAUDE.md's architecture section actually names), configuration/manifests, primary docs, the protected set.

**SUGGEST EXCLUDE — built-in categories** (see `default-patterns.md` for the full library):
- **Historical artifacts:** archived plans, past code reviews, session handoffs, brainstorm docs (`plans/archive/`, `.claude/handoffs/`, `.claude/brainstorms/`, `.claude/code-reviews/`, `_archive/`, `old/`, `deprecated/`)
- **Reference documentation:** tech-stack docs, domain guides meant for on-demand lookup
- **Duplicative system docs:** files repeating CLAUDE.md content
- **Auto-loaded Claude config:** `.claude/commands/`, `.claude/agents/`, `.claude/rules/` (Claude Code loads these itself; reading them during prime is redundant)
- **Data files:** CSV, XLSX, SQLite, JSON data, fixtures, seed files, migration history
- **Generated docs, lock files, minified assets, IDE/workspace config, CI pipelines**

**SUGGEST EXCLUDE — derived by scan (not just the hardcoded list):**
- **Name-convention scan:** any tracked directory matching `archive|handoff|brainstorm|render|snapshot|deprecated|old` — the project's own junk-drawer conventions beat a canned list
- **Large single files (type-agnostic):** `git ls-files | tr '\n' '\0' | xargs -0 wc -c 2>/dev/null | sort -rn | head -20`; flag **any** surviving file over ~25K tokens (~100KB) regardless of extension — catches large tracked HTML/JSON/generated docs, not just binaries. Also flag all binary assets (`*.png`, `*.pdf`, `*.jpg`, media) as their own category.
- **Broad non-core source subtrees (opt-in, warned):** a source directory with many files that is NOT part of the architectural core CLAUDE.md names — e.g. a dozen per-provider integration/connector dirs, a self-contained sidecar, generated clients. In full mode these are full-read; excluding them can be the single largest win. Present as its own category with an explicit warning: "these are real source, read on-demand via Read/Grep — exclude only if they're not your current working surface." Never fold them silently into another category, and always leave the core (routers, main app, data layer, the modules CLAUDE.md describes) visible.
- **Dense directories:** `git ls-files | sed 's|/[^/]*$||' | sort | uniq -c | sort -rn | head -20`; directories with >50 tracked files of data, migrations, or fixtures
- **Git-cold directories (optional signal):** directories with no commits in 6+ months are exclusion candidates; mention but weight below the other signals

**Active/archive split rule:** never blanket-exclude a directory whose contents the project splits into active vs. archived (e.g. `plans/` when the workflow says active plans live there and completed ones move to `plans/archive/`). Exclude only the archive half. Check project rules before proposing any whole-directory pattern.

### 6. Verify and Measure Each Candidate

For every candidate pattern, before presenting it:
1. `git ls-files -ci --exclude='PATTERN'` → the **real** file count (this number goes in the header comment)
2. Pipe the matched list to `wc -c`, divide bytes by 4 → **measured** token estimate (no per-file guessing)

### 7. Cumulative Exclusion Check — Allowlist Flip

Compute the **cumulative** exclusion % (existing + proposed, via `--exclude-from` on the would-be file — not per-run).

- **>70% excluded:** recommend flipping to **allowlist form** — shorter, self-documenting, and drift-safe (new files default to excluded instead of silently leaking into prime):

  ```
  # Allowlist mode: exclude everything, re-include what prime should read.
  # The !*/ line is required — gitignore semantics cannot re-include a file
  # whose parent directory is excluded.
  *
  !*/
  !.primeignore
  !CLAUDE.md
  !README.md
  !src/main.py
  !docs/architecture.md
  ```

  Verify the allowlist the same way: the survivor list from `comm -23` must equal the intended include set.
- **>80% excluded and staying denylist:** warn explicitly and require confirmation.

### 8. Present Recommendations

Group by category. For each: name, **verified** file count, **measured** token estimate, exact patterns, and a sample of matched files. Then:

```
## .primeignore Recommendations for [project-name]

Prime mode optimized for: [full | quick]
Tracked files: X total
Currently excluded (verified): Y (Z%)
Survivor text prime can read/grep: ~AK tokens  →  ~BK after these patterns
Fully-read floor (CLAUDE.md + README head + entry, cannot be excluded): ~CK tokens
Survivors worth attention: [list any large/binary/historical files currently surviving]

### Category 1: ... (N files verified, ~XK tokens measured)
Pattern: `...`
Files matched (sample): ...

[If reconciling] ### Removals: M stale/subsumed patterns, K label corrections

---
Resulting exclusion: X% (Y files survive prime)
Projected prime cost: ~floor + read-survivors (state the number, and if it can't reach the user's target, name what else must shrink — CLAUDE.md, the injected rules stack, or connected MCP servers)
Approve categories? (numbers, "all", or "none")
```

**CRITICAL: Do NOT write anything until the user explicitly approves.** (`analyze` mode always stops here.)

### 9. Apply

- **Reconcile mode:** rewrite the whole file — one clean set of category sections, no dated appendices, header `# Reconciled by /optimize-context on YYYY-MM-DD`. Preserve user-added patterns (no `# [auto]` tag) verbatim.
- **Append mode:** append under a dated header, but first remove any existing `# [auto]` pattern the new ones subsume
- Every generated pattern carries a `# [auto]` tag; category header comments carry the **verified** count and **measured** tokens

### 10. Post-Write Verification (mandatory)

Rerun the ground-truth commands against the written file and report:
- Real excluded count and % (from `git ls-files -ci --exclude-from=.primeignore`, not arithmetic)
- Survivor summary by top-level directory
- Any protected-set file that ended up excluded → **fix immediately before finishing**
- Reminder: "Files are still accessible on-demand via Read, Grep, and Glob"

## `.primeignore` Format

Gitignore-compatible syntax:
- `#` for comments, blank lines ignored
- `directory/` to skip an entire directory
- `*.extension` for file type patterns
- `path/to/specific-file.json` for individual files
- `!pattern` negation to force-include (needed for allowlist mode; remember `!*/`)
- Auto-generated lines tagged `# [auto]`; untagged lines are user-added and always preserved

## Integration with `/prime`

The `prime-quick` and `prime-full` commands in this repo already read `.primeignore` at Step 0: they parse the patterns, filter all listing/reading, protect `CLAUDE.md`/manifests/entry points regardless of patterns, and report "X files excluded by .primeignore (~YK tokens saved)". Files are always readable on demand — if the user asks for a skipped file, read it normally.

## Notes

- `.primeignore` should be committed to git (project configuration, not a secret)
- Never put secret patterns here — use `permissions.deny` for that
- If `.gitignore` already covers a pattern, don't duplicate it here
- All commands above are git-native and BSD/GNU-portable
- Run `--reconcile` periodically; a `.primeignore` older than ~30 days or ~50 commits in an active repo is presumptively stale
