---
name: config-audit
description: Evaluate the full Claude Code configuration stack for duplication, security, staleness, consistency, coverage gaps, optimization, and innovation opportunities.
version: 1.0.0
---

# Config Stack Audit

A comprehensive, prompt-driven audit of the entire Claude Code configuration at `~/.claude/` and all project-level `.claude/` directories. Produces a scored report with delta tracking across runs and a self-improving heuristics loop.

## 1. Modes

Parse the arguments passed to `/config-audit`:

| Flag | Behavior |
|------|----------|
| (no flag) or `--full` | Run all 7 dimensions. Default mode. |
| `--quick` | Run dimensions 1-3 only (Duplication, Security, Staleness). |
| `--dimension N` | Run only dimension N (1-7). Still requires inventory phase. |
| `--fix` | After report generation, enter auto-remediation flow for automatable findings. Can combine with any mode above. |

**First-run handling:** Before starting, check if `~/.claude/config-audit-reports/` contains any previous reports. If not, this is a baseline audit — skip delta comparison in Section 5 and note "Baseline audit — no prior data for comparison" in the Delta section of the report.

## 2. Inventory Phase

**Runs for ALL modes.** Build the complete config inventory before any analysis.

Execute these tool calls (parallelize where independent):

**Batch 1 — Global config (all parallel):**
1. `Glob("~/.claude/rules/*.md")` — list all global rules
2. `Glob("~/.claude/agents/*.md")` — list all global agents
3. `Glob("~/.claude/skills/*/")` — list all global skill directories
4. `Glob("~/.claude/commands/*.md")` — list all global commands
5. `Read("~/.claude/settings.json")` — extract hooks, permissions, MCP config
6. `Read("~/.claude/mcp.json")` — extract MCP server registrations

**Batch 2 — Project-level config (all parallel):**
7. `Glob("~/projects/**/.claude/settings.json")` — all project settings
8. `Glob("~/projects/**/.claude/rules/*.md")` — all project rules
9. `Glob("~/projects/**/.claude/agents/*.md")` — all project agents
10. `Glob("~/projects/**/.claude/skills/*/")` — all project skills
11. `Glob("~/projects/**/.claude/commands/*.md")` — all project commands
12. `Glob("~/projects/**/CLAUDE.md")` — all CLAUDE.md files

> Adjust the `~/projects/**` glob root to wherever you keep your repositories if it differs.

Store the file lists and counts. These are the inputs for all dimension analyses.

**Token discipline:**
- Use Glob/Grep for discovery — never `find` or `ls` via Bash
- Only Read file contents when comparison requires it (e.g., duplication checks)
- Read first 100 lines max per file during comparison
- Use parallel Agent calls (model: haiku) for independent dimensions to keep main context clean
- Budget: `--quick` ~20-30K tokens, `--full` ~40-60K tokens

## 2a. Project Scope Policy

Not every repo earns full config scrutiny. Scoping prevents coverage dimensions (GAP/SEC) from inflating with every throwaway experiment — a recurring false signal (see heuristic H-003). Apply these tiers:

| Tier | What | Expectation | Audit treatment |
|------|------|-------------|-----------------|
| **Client / secret-handling** | Active deliverables that handle secrets or sensitive data | MUST have `CLAUDE.md` + `.primeignore` + `.claude/settings.json` with `.env*`/credentials/secrets deny rules | Full scope; missing config = GAP/SEC finding |
| **Internal tools (shipped)** | Used but lower-risk | SHOULD have `CLAUDE.md`; deny rules if secrets present | Full scope; severity scaled down |
| **Experiment / scratch / superseded** | scratch dirs, empty repos, superseded versions | None required | **EXEMPT** from GAP/SEC |

**Exemption mechanism:** A project is out of scope for the dimensions listed in its marker if EITHER:
- it contains an `.audit-ignore` file at its root (format: `exempt_dimensions: GAP, SEC` — comma-separated dimension codes, or `ALL`), OR
- it lives under a scratch/experiments root (e.g. `~/projects/experiments/`).

During the inventory phase, record exempt projects separately and list them under "Suppressed Findings" in the report (e.g., "3 projects exempt by `.audit-ignore`"). Do not generate GAP/SEC findings for exempt projects. New projects start compliant if your project scaffolding sets up the deny-ruled `settings.json` by default.

## 3. The 7 Audit Dimensions

Each dimension produces: (a) findings with severity and deterministic IDs, (b) a score 1-10.

### Dimension Dependency Graph

```
Inventory Phase (must complete first)
     │
     ├──► Dim 1: Duplication  ─┐
     ├──► Dim 2: Security     ─┤  Batch A — launch as parallel Agents (haiku)
     ├──► Dim 3: Staleness    ─┤
     └──► Dim 4: Consistency  ─┘
                                │
                                ▼  (wait for Batch A results)
     ├──► Dim 5: Coverage Gaps ─┐
     ├──► Dim 6: Optimization  ─┤  Batch B — launch as parallel Agents (haiku)
     └──► Dim 7: Innovation    ─┘
```

- **`--quick`**: Run dims 1-3 from Batch A only. Skip dim 4 and all of Batch B.
- **`--dimension N`**: Run only that dimension (still requires inventory).

---

### Dimension 1: Duplication

**What to check:** Identical or diverged copies of rules, agents, skills, and commands across the global ↔ project layers.

**How to check:**
1. For each file type (rules, agents, commands), extract filenames from the global inventory and each project inventory.
2. Find same-named files across layers.
3. For each match, Read first 100 lines of both files.
4. Classify as:
   - **IDENTICAL** — content matches → recommend consolidating to global
   - **DIVERGED** — same name, different content → recommend syncing or documenting the fork
   - **INTENTIONAL FORK** — file contains `# audit:ignore` or `# audit:ignore:DUP` → suppress

**Scoring rubric:**
| Score | Criteria |
|-------|----------|
| 10 | Zero untracked duplicates across all layers |
| 7 | Duplicates exist but all are marked intentional via `audit:ignore` |
| 4 | Multiple untracked diverged copies in active projects |
| 1 | Widespread unmanaged duplication with security-critical divergences (e.g., security rules missing sections) |

**Finding ID format:** `DUP-{project-slug}-{dir}-{filename}`
Example: `DUP-devenv-rules-security-md`

---

### Dimension 2: Security

**What to check:** Hook scripts with risky patterns, missing deny rules, exposed paths, overly broad permissions.

**How to check:**
1. Read each `settings.json` found in inventory. Check `permissions.allow` — flag `Bash(*)` in project configs as overly broad.
2. Grep all hook scripts (`.js`, `.sh` files referenced in settings.json hooks) for `execSync`, `exec(`, `eval(`, `spawn` with string concatenation or template literals (injection vectors).
3. For each project with a dependency file (`package.json`, `requirements.txt`, `pyproject.toml`), check if its `.claude/settings.json` has deny rules for `.env*`, `credentials*`, `secrets*`.
4. Read `~/.claude/mcp.json` — check that no tokens, passwords, or API keys appear in plain text (look for patterns: `sk-`, `ghp_`, `Bearer `, base64 strings >40 chars).
5. If a session-observer hook exists (e.g. a continuous-learning `observe.sh`), check it sanitizes untrusted input before persisting it — grep for sanitiz/truncat/stdin handling.

**Scoring rubric:**
| Score | Criteria |
|-------|----------|
| 10 | All projects have deny rules, no injection vectors, no exposed credentials |
| 7 | Minor gaps in non-critical or experimental projects only |
| 4 | Missing deny rules on client projects OR injection vectors in hook scripts |
| 1 | Credentials exposed in config OR critical injection vectors in global hooks |

**Finding ID format:** `SEC-{scope}-{issue-type}`
Examples: `SEC-global-settings-broad-allow`, `SEC-myproject-no-env-deny`

---

### Dimension 3: Staleness

**What to check:** Broken paths, outdated references, unfilled templates, stale CLAUDE.md dates.

**How to check:**
1. Grep all files under `~/.claude/` and all `CLAUDE.md` files for stale machine paths — references to home directories, usernames, or drive paths from a *prior* machine or OS that no longer exist on the current host. Common shapes:
   - Old Linux/WSL home dirs (`/home/<old-user>/…`, `/mnt/c/Users/<old-user>/…`)
   - Old Windows paths (`C:\Users\<old-user>\…`)
   - Any absolute path under a home dir that fails a `test -e` check on the current machine

   Build the list of "known old" prefixes from whatever prior setups this config has migrated through, and treat any surviving reference as stale. **Remote-scope exception:** paths that intentionally document a *remote* host (SSH targets, VPS/CI runners, docs inside a `remote-*` skill) are not stale — exclude files whose purpose is remote-host documentation.
2. For each CLAUDE.md, grep for "Last Updated" — parse the date and flag if >30 days old. If the project is a git repo, check `git log -1 --format=%ci` and flag if >20 commits since the Last Updated date.
3. Grep CLAUDE.md and command files for placeholder text: `[PROJECT NAME]`, `[CLIENT NAME]`, `[CLIENT]`, `TODO:`, `FIXME:`.
4. For each settings.json with hooks, extract all script paths from hook `command` fields. Verify each path exists using `test -f`.

**Scoring rubric:**
| Score | Criteria |
|-------|----------|
| 10 | No stale paths, all CLAUDE.md current, no placeholders, all hooks resolve |
| 7 | Minor staleness in archived or experiment projects only |
| 4 | Stale paths in active projects OR broken hook references |
| 1 | Widespread broken paths in global config or critical hooks pointing to nonexistent scripts |

**Finding ID format:** `STL-{file-slug}-{issue-type}`
Examples: `STL-myproject-claude-md-stale-path`, `STL-devenv-settings-broken-hook`

---

### Dimension 4: Consistency

**What to check:** Name collisions, contradicting rules, settings mismatches.

**How to check:**
1. Group all command files by filename across global + all project layers. For groups with >1 file, Read the `description` frontmatter (first 5 lines) of each. Flag if same name serves different purposes.
2. Group all rules files by filename across layers. Compare first 5 lines (title/heading). Flag same-name-different-purpose.
3. In global `settings.json`, check hook matchers for overlapping patterns that could cause double-firing on the same event (e.g., two PreToolUse hooks both matching `tool == "Bash"`).
4. Read agent description fields. For agents that say "MUST BE USED for {language} projects", check if there are projects using that language (grep for corresponding dependency files) that don't reference or invoke that agent.

**Scoring rubric:**
| Score | Criteria |
|-------|----------|
| 10 | No name collisions, no contradictions, no redundant hooks |
| 7 | Minor collisions in experimental/archived projects only |
| 4 | Name collisions in active commands OR contradicting rules across layers |
| 1 | Contradicting global rules OR security-relevant inconsistencies |

**Finding ID format:** `CON-{item-type}-{name}-{issue}`
Examples: `CON-cmd-review-name-collision`, `CON-rule-patterns-different-purpose`

---

### Dimension 5: Coverage Gaps

**What to check:** Missing config, unmatched agents/commands, workflow gaps.

**How to check:**
1. List all project directories under `~/projects/` (excluding archived ones). **Apply the Scope Policy (Section 2a):** skip any project that contains an `.audit-ignore` file or lives under a scratch/experiments root. For each remaining (in-scope) project, check existence of: `CLAUDE.md`, `.primeignore`, `.claude/settings.json`. Flag any active project missing these.
2. Compare the global agent roster (filenames without `.md`) against the global command roster. Flag agents with no corresponding command that users could invoke (e.g., a `database-reviewer` agent but no `/db-review` command).
3. Check if these common workflows have commands: deploy, test, lint, format, migrate, backup. Flag gaps.
4. Meta-check: verify the audit skill itself is present in your config.

**Scoring rubric:**
| Score | Criteria |
|-------|----------|
| 10 | All active projects have CLAUDE.md + primeignore + deny rules; all agents have commands |
| 7 | Coverage gaps only in experiments/archived projects |
| 4 | Active client projects missing key config files |
| 1 | Most active projects missing basic configuration |

**Finding ID format:** `GAP-{project-or-item}-{what-is-missing}`
Examples: `GAP-myproject-no-primeignore`, `GAP-database-reviewer-no-command`

---

### Dimension 6: Optimization

**What to check:** Oversized files, underused hooks, context budget waste.

**How to check:**
1. For all files in the inventory (rules, skills, commands, agents), count lines. Flag any file >800 lines.
2. In global `settings.json`, count hooks with matcher `"*"` per event type. Flag if >3 wildcard hooks on any single event.
3. Count total lines across all `~/.claude/rules/*.md` files — this estimates the token cost of rules loaded every session. Flag if >2000 total lines.
4. Read `description` fields from all skill SKILL.md files. Identify pairs with >80% keyword overlap (potential consolidation candidates). Use simple word overlap comparison, not semantic analysis.
5. For projects with >50 tracked git files, check if `.primeignore` exists. Flag missing.

**Scoring rubric:**
| Score | Criteria |
|-------|----------|
| 10 | Lean config: no oversized files, ≤2 wildcard hooks per event, rules under 2000 total lines |
| 7 | Minor bloat in non-critical areas (e.g., one oversized skill file) |
| 4 | Multiple oversized files OR >4 wildcard hooks causing latency |
| 1 | Severe bloat measurably affecting session performance |

**Finding ID format:** `OPT-{target}-{issue-type}`
Examples: `OPT-observe-sh-wildcard-hook`, `OPT-rules-total-lines-2500`

---

### Dimension 7: Innovation

**What to check:** Opportunities for new skills, commands, or agents based on observed patterns.

**How to check:**
1. Check if `~/.claude/homunculus/instincts/` exists and has files (this is the layout used by the `continuous-learning-v2` skill). If so, read instincts with `confidence` ≥ 0.7. Cross-reference against `~/.claude/homunculus/evolved/` to find high-confidence instincts not yet evolved into skills.
2. Check if a legacy learned-patterns directory exists (e.g. `~/.claude/homunculus/legacy-learned-md/`) with `.md` files. These are legacy patterns not yet promoted to full skills. List them.
3. Compare the agent roster against the command roster — identify agent capabilities that have no user-facing command. These are potential new commands.
4. For each active project (non-archived) that is a git repo, run `git -C {path} log -20 --oneline 2>/dev/null` to scan for recurring workflow patterns (e.g., repeated manual steps that could be automated).
5. Synthesize inputs 1-4 into 3-5 concrete suggestions. Each suggestion must have: name, purpose, rationale grounded in the inputs, estimated complexity (Low/Medium/High).

**Handle gracefully** if the instincts or learned directories are empty or don't exist — still produce suggestions from inputs 3-4.

**Scoring rubric:**
| Score | Criteria |
|-------|----------|
| 10 | Rich innovation pipeline: high-confidence instincts ready for evolution, clear command gaps identified |
| 7 | Some opportunities identified from multiple input sources |
| 4 | Few signals available — limited instincts, few learned patterns |
| 1 | No instincts, no learned patterns, no gaps found (may indicate the learning system itself needs attention) |

**Finding ID format:** `INN-{suggested-item-name}`
Examples: `INN-db-review-command`, `INN-deploy-workflow-skill`

---

## 4. `audit:ignore` Support

Before reporting any finding, check if the target file contains suppression markers:

- `# audit:ignore` or `<!-- audit:ignore -->` — suppress ALL findings for this file
- `# audit:ignore:DUP` or `<!-- audit:ignore:DUP -->` — suppress only Duplication findings
- `# audit:ignore:SEC` — suppress only Security findings
- Pattern: `audit:ignore:{DIM}` where DIM is one of: `DUP`, `SEC`, `STL`, `CON`, `GAP`, `OPT`, `INN`

Use Grep to check for `audit:ignore` in a file before generating findings for it.

At the end of the report, include a "Suppressed Findings" section listing the count and files where suppression was applied.

## 5. Delta Tracking

After generating all findings for this audit:

1. List files in `~/.claude/config-audit-reports/` matching `config-audit-*.md`.
2. Sort by filename (lexicographic = chronological due to date format).
3. Read the most recent previous report (not the current one being generated).
4. Extract all finding IDs from the previous report — grep for patterns matching `(DUP|SEC|STL|CON|GAP|OPT|INN)-[a-zA-Z0-9_-]+`.
5. Classify each current finding:
   - **NEW** — ID not present in previous report
   - **PERSISTENT** — ID present in both current and previous
   - **REGRESSED** — ID was absent in previous report but present in the one before that (came back after being resolved)
6. Classify previous-only findings as **RESOLVED** (present in previous, absent in current).

**First-run handling:** If no previous report exists, output:
```
## Delta from Previous Audit
Baseline audit — no prior data for comparison. All findings are new.
```

## 6. Heuristic Promotion

After delta tracking:

1. Read `~/.claude/config-hygiene-heuristics.md`.
2. List the 3 most recent report files (including the current one being generated).
3. For each finding ID that appears as PERSISTENT in all 3 reports, check if it already has a heuristic entry.
   - If not: create a new Active heuristic entry (H-{NNN}) with the finding pattern, IDs, and dates.
   - If yes: update `Seen` count and `Last seen` date.
4. For Active heuristics whose finding IDs do NOT appear in the last 2 consecutive reports, move to Retired with today's date.
5. Cap the Active section at 20 entries. If full, retire the oldest by `Last seen` date.
6. Write the updated heuristics file.

## 7. Report Template

Write the report to `~/.claude/config-audit-reports/config-audit-YYYY-MM-DD-HH.md` (use current date and hour in 24h format).

```markdown
# Config Stack Audit — {YYYY-MM-DD-HH}

**Health Score: {N}/70** (prev: {P}/70, delta: {+/-D})

## Executive Summary
- {Most important finding 1}
- {Most important finding 2}
- {Most important finding 3}
- {Trend observation if delta data available}

## Inventory
| Layer | Count |
|-------|-------|
| Global rules | {N} |
| Global agents | {N} |
| Global skills | {N} |
| Global commands | {N} |
| Global hooks (across all events) | {N} |
| MCP servers | {N} |
| Projects with .claude/ config | {N} |
| CLAUDE.md files | {N} |

## Dimension Scores
| # | Dimension | Score | Prev | Delta | Top Finding |
|---|-----------|-------|------|-------|-------------|
| 1 | Duplication | {S}/10 | {P}/10 | {+/-D} | {finding ID} |
| 2 | Security | {S}/10 | {P}/10 | {+/-D} | {finding ID} |
| 3 | Staleness | {S}/10 | {P}/10 | {+/-D} | {finding ID} |
| 4 | Consistency | {S}/10 | {P}/10 | {+/-D} | {finding ID} |
| 5 | Coverage Gaps | {S}/10 | {P}/10 | {+/-D} | {finding ID} |
| 6 | Optimization | {S}/10 | {P}/10 | {+/-D} | {finding ID} |
| 7 | Innovation | {S}/10 | {P}/10 | {+/-D} | {finding ID} |

## Findings by Dimension

### 1. Duplication
| ID | Severity | Finding | Files | Action |
|----|----------|---------|-------|--------|
| {DUP-xxx} | {CRITICAL/HIGH/MEDIUM/LOW} | {description} | {file paths} | {recommended action} |

### 2. Security
| ID | Severity | Finding | Files | Action |
|----|----------|---------|-------|--------|

### 3. Staleness
| ID | Severity | Finding | Files | Action |
|----|----------|---------|-------|--------|

### 4. Consistency
| ID | Severity | Finding | Files | Action |
|----|----------|---------|-------|--------|

### 5. Coverage Gaps
| ID | Severity | Finding | Files | Action |
|----|----------|---------|-------|--------|

### 6. Optimization
| ID | Severity | Finding | Files | Action |
|----|----------|---------|-------|--------|

### 7. Innovation
**Suggested New Skills/Commands:**
| ID | Name | Purpose | Rationale | Complexity |
|----|------|---------|-----------|------------|
| {INN-xxx} | {name} | {one-line purpose} | {grounded in inventory/instinct data} | {Low/Med/High} |

## Delta from Previous Audit
### New Findings ({count})
{Bulleted list of new finding IDs with one-line descriptions}

### Resolved ({count})
{Bulleted list of finding IDs from previous report that are now gone}

### Regressed ({count})
{Bulleted list of finding IDs that were previously resolved but returned}

### Persistent ({count})
{Bulleted list of finding IDs present in both reports — heuristic promotion candidates}

## Suppressed Findings
{N} findings suppressed by `audit:ignore` markers.
{If N > 0, list: file path → suppressed dimension(s)}

## Heuristic Promotions
{List any findings promoted to ~/.claude/config-hygiene-heuristics.md this cycle}
{List any heuristics retired this cycle}
{If none: "No promotions or retirements this cycle."}

## Recommended Actions (Priority Order)
1. **[{severity}]** {specific action} — fixes {finding ID(s)}
2. **[{severity}]** {specific action} — fixes {finding ID(s)}
3. ...
```

## 8. `--fix` Mode (Auto-Remediation)

When `--fix` is passed, after generating and presenting the report summary, iterate through findings and offer auto-remediation for automatable issues.

### Automatable Fix Categories

**Stale paths** (STL findings) — search-and-replace using a project-local patterns registry. Maintain a small table mapping each known-old path prefix to its current equivalent, and apply **most-specific first** so a broad prefix doesn't partially rewrite a more specific one. Fill the registry in from the prior machines/usernames this config has migrated through; the shape is:

| Stale Pattern (example) | Replacement (example) | Match Order |
|---|---|---|
| `/home/<old-user>/builds/` | `~/projects/` | 1 (most specific) |
| `C:\Users\<old-user>\builds\` | `~/projects/` | 2 |
| `/home/<old-user>/` | `~/` | 3 |
| `C:\Users\<old-user>\` | `~/` | 4 (least specific) |

Apply in order (most specific first) to avoid partial replacements. **Remote-scope exception:** do NOT rewrite home-dir paths inside files that intentionally document remote Linux hosts (SSH/VPS/CI docs, `remote-*` skills) — those are intentional. When new stale patterns are discovered during an audit, suggest adding them to this registry.

**Identical copies** (DUP findings classified as IDENTICAL) — offer to delete the project-level copy since global is authoritative.

**Missing directories** (GAP findings for missing `.primeignore` or `config-audit-reports`) — offer to create them.

**Broken hook paths** (STL findings where hook scripts don't exist at the referenced path) — offer to update the path in the relevant `settings.json` if the script exists at a correctable location.

### Fix Flow

For each automatable finding:
1. Present the proposed change with before/after preview
2. Ask for user confirmation: "Apply this fix? (yes/no/skip all)"
3. On approval: apply the change using Edit tool
4. Log the fix in the report under `## Auto-Remediation Log`

**Non-automatable findings** are listed as "Manual action required" with pointers:
- Security gaps → "Run a deeper security review"
- Consistency issues → "Review and resolve manually"
- Coverage gaps → "Run `/optimize-context` in {project}" or "Create CLAUDE.md for {project}"
- Innovation suggestions → "Run `/brainstorm` to explore further" or "Run `/evolve` to promote instincts"

### Auto-Remediation Log (appended to report)

```markdown
## Auto-Remediation Log
| # | Finding ID | Action Taken | File Modified |
|---|-----------|-------------|---------------|
| 1 | {STL-xxx} | Replaced stale path | {file path} |
| 2 | {DUP-xxx} | Deleted identical copy | {file path} |
```
