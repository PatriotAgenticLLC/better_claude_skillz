---
description: Scan workspace for automation, improvement, and build opportunities. Discover what to build next.
---

# /brainstorm

Divergent discovery — find the highest-value thing to build by analyzing what exists, what's missing, and what's possible.

This command sits **before** planning. It answers "what should I build?" so that `/plan` can answer "how do I build it?"

## Arguments

- `/brainstorm` — analyze the current working directory
- `/brainstorm [path]` — analyze a specific project directory
- `/brainstorm [topic]` — focus the scan on a specific area (e.g., "testing", "CI/CD", "API layer")

If the argument is a valid directory path, use it as the project root. Otherwise, treat it as a topic filter.

---

## Stage 1: CONTEXT LOAD

**Goal:** Build a complete picture of the workspace without the user explaining it.

**Actions:**

1. **Check if session is primed.** If no `/prime` or `/prime-quick` has been run this session, invoke `/prime-quick` automatically against the target directory. If already primed, skip.

2. **Read memory.** Check the session's memory index at `~/.claude/projects/<project-slug>/memory/MEMORY.md` (slug = working directory path with `/` replaced by `-`, e.g. `-home-user-projects-my-app`) and load any relevant project or reference memories. Note ongoing initiatives, known pain points, and recent decisions.

3. **Scan for signals.** Run these in parallel:
   - **Code debt:** Grep for `TODO`, `FIXME`, `HACK`, `WORKAROUND`, `XXX` across the codebase. Count and cluster by file/area.
   - **Pending work:** Check `.claude/plans/` for any non-archived plans. Read their status and scope.
   - **Git patterns:** Run `git log --oneline -30` and `git log --diff-filter=M --name-only -30` to identify hotspot files (frequently modified) and recent activity direction.
   - **Test health:** Look for test files, check if a test runner is configured, note any obvious gaps (source files without corresponding test files).
   - **Dependency state:** Check for outdated dependencies if a manifest exists (package.json, go.mod, requirements.txt, etc.) — scan for pinned versions, known deprecated packages.
   - **CI/CD state:** Check for workflow files (.github/workflows/, Makefile, Dockerfile, etc.) and assess coverage.

4. **Build the context map** internally. Do not present raw findings yet — synthesize in Stage 2.

---

## Stage 2: OPPORTUNITY SCAN

**Goal:** Identify and rank actionable opportunities.

**Actions:**

1. **Synthesize findings** from Stage 1 into distinct opportunities across these categories:

   | Category | What to Look For |
   |----------|-----------------|
   | Incomplete work | Pending plans, TODO clusters, half-built features, stale branches |
   | Automation gaps | Manual processes, missing scripts, repetitive git patterns, no CI/CD |
   | Technical debt | Code hotspots, missing tests, deprecated deps, HACK/WORKAROUND comments |
   | New capabilities | Features enabled by existing infrastructure but not yet built |
   | Developer experience | Missing tooling, slow workflows, gaps in commands/skills/agents |
   | Best practices | Industry patterns not yet adopted, architectural improvements, security hardening |

2. **Feasibility triage.** For each opportunity, use the **architect** agent (model: haiku) to make a quick judgment:
   - Is this buildable with what exists in the workspace?
   - What's the rough effort? (Small / Medium / Large)
   - Any hard blockers?

   Invoke via Agent tool with `subagent_type: "architect"` and `model: "haiku"`. Keep the prompt tight — one opportunity per assessment, parallel where possible.

3. **Present ranked opportunities.** Group by priority:

   ```
   ## Opportunities Found

   ### High Impact
   1. **{Name}** — Feasibility: {Easy/Medium/Hard}
      {One-line description of what it does and why it matters}

   2. **{Name}** — Feasibility: {Easy/Medium/Hard}
      {One-line description}

   ### Quick Wins
   3. **{Name}** — Feasibility: Easy
      {One-line description — could build this fast}

   ### Strategic (Bigger Bets)
   4. **{Name}** — Feasibility: Hard
      {One-line description — transformative but significant effort}

   ### Anomalies & Observations
   - {Anything surprising, unusual, or noteworthy found during the scan}
   - {Best practice gaps worth mentioning}
   - {Interesting patterns or potential risks}
   ```

4. **Be creative here.** Go beyond the obvious. If you see a pattern that suggests a better architectural approach, say so. If a common best practice is missing, flag it. If something looks anomalous, call it out. This is the stage where divergent thinking matters — surface options the user might not have considered.

**STOP and ask:** "Which of these interest you? Want to dig into any?"

---

## Stage 3: DEEP DIVE

**Goal:** Explore the user's chosen opportunity in enough detail to hand off cleanly.

**Actions:**

1. **Invoke the architect agent** (model: opus) via Agent tool with `subagent_type: "architect"` for a proper analysis of the selected opportunity:
   - Architectural feasibility and fit with existing codebase
   - Design options with trade-offs (if multiple approaches exist)
   - What existing code/systems to leverage
   - What new components are needed
   - Risks and unknowns

2. **Add brainstorm-specific context** on top of the architect's analysis:
   - How the opportunity connects to other workspace systems
   - The simplest viable version vs. the full vision
   - Whether this needs `/plan --full` (complex, multi-phase, needs deep codebase analysis) or `/plan --lite` (clear enough to plan directly) or is small enough to just build

3. **Present the deep dive:**

   ```
   ## Deep Dive: {Opportunity Name}

   **What it would look like:** {User-facing description of the end result}

   **Leverages:** {Existing code, systems, infrastructure}

   **Requires:** {New components, dependencies, configuration}

   **Design options:**
   - Option A: {approach} — {trade-off}
   - Option B: {approach} — {trade-off}
   - Recommendation: {which and why}

   **Simplest viable version:** {MVP description}

   **Full vision:** {Complete version}

   **Recommended next step:** `/plan --full {description}` or `/plan --lite {description}`
   ```

**STOP and ask for direction:**
- "Ready to plan this? I'd recommend `/plan --full {description}`"
- "Want to explore another opportunity?"
- "Want to go broader and look at a different area?"

---

## Stage 4: OUTPUT

**Goal:** Capture the session and set up the handoff.

**Actions:**

1. **Write the brainstorm doc** to `.claude/brainstorms/brs-{project-dir-name}-{topic}-{YYYY-MM-DD:HH}.md`:
   - `brs-` — brainstorm file prefix
   - `{project-dir-name}` — name of the project root directory
   - `{topic}` — 1-3 word kebab-case topic (e.g., `automation-gaps`, `testing-strategy`)
   - `{YYYY-MM-DD:HH}` — timestamp (e.g., `2026-03-23:14`)
   - Example: `brs-my-app-automation-gaps-2026-03-23:14.md`

   ```markdown
   # Brainstorm: {Topic}

   **Created:** YYYY-MM-DD
   **Status:** Complete
   **Directory:** {project path analyzed}

   ## Workspace Context
   - **Project:** {name, tech stack, purpose}
   - **Existing Systems:** {what's already built/automated}
   - **Recent Activity:** {relevant git patterns, direction of work}
   - **Pending Plans:** {any active plans in .claude/plans/}

   ## Opportunities Identified

   ### 1. {Selected Opportunity} ← SELECTED
   - **Impact:** High/Medium/Low
   - **Feasibility:** Easy/Medium/Hard
   - **Description:** {what it does}
   - **Leverages:** {existing code/systems}
   - **Requires:** {new components}
   - **Design Notes:** {key findings from deep dive}
   - **Next step:** `/plan --full {description}` or `/plan --lite {description}`

   ### 2. {Other Opportunity}
   - **Impact:** High/Medium/Low
   - **Feasibility:** Easy/Medium/Hard
   - **Description:** {what it does}

   ### 3-N. {Additional Opportunities}
   {Same format, briefer}

   ## Quick Wins
   {Easy, fast-to-build items worth grabbing}

   ## Technical Debt Noted
   {Items found during scan — TODOs, FIXMEs, test gaps, deprecated deps}

   ## Anomalies & Observations
   {Surprising findings, best practice gaps, interesting patterns}

   ## Decision
   {What the user chose to pursue and the exact command to run next}
   ```

2. **Report the file path** and the exact next command to run.

3. **Offer to save a project memory** if the user chose a direction:
   - "Want me to save a memory noting this decision so future sessions have context?"
   - If yes, write a project memory with the decision, the why, and the recommended next step.

---

## Critical Rules

- **Workspace-first.** Always ground findings in actual code, git history, and project state. Never brainstorm in a vacuum.
- **Technically direct.** No hand-holding or oversimplification. Speak at the user's level.
- **Creatively honest.** Surface non-obvious opportunities, flag anomalies, suggest best practices — but be honest about effort and trade-offs. Don't oversell.
- **Delegate, don't duplicate.** Use `/prime-quick` for context loading, `architect` agent for feasibility, and hand off to `/plan` for implementation planning. Never recreate what those tools already do.
- **Interactive.** Present findings at each stage, wait for input. Never run all four stages autonomously.
- **No code.** This command discovers and evaluates. It does not write code, create plans, or scaffold anything beyond the brainstorm doc.
- **Archive completed brainstorms.** When a brainstormed opportunity has been fully implemented, move the doc to `.claude/brainstorms/archive/`.

## Related Tools

| Tool | Role in Brainstorm | Invocation |
|------|-------------------|------------|
| `/prime-quick` | Stage 1 context loading | Skill: `prime-quick` |
| `architect` agent | Stage 2 feasibility triage (haiku), Stage 3 deep dive (opus) | Agent tool, `subagent_type: "architect"` |
| Memory system | Stage 1 context, Stage 4 optional save | Read/Write to memory dir |
| `/plan --lite` | Handoff for clear, well-scoped features | Command: `plan --lite` |
| `/plan --full` | Handoff for complex, multi-phase features needing deep analysis | Command: `plan --full` |
| `/create-prd` | Handoff if the opportunity needs full product requirements first | Skill: `create-prd` |
