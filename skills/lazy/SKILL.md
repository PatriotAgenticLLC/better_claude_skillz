---
name: lazy
description: Enforce minimal-code discipline — write the least code that fully works. Applies a YAGNI/stdlib-first decision ladder before generating code. Use when writing or revising code, reviewing a diff for over-engineering, or auditing a repo for needless complexity. Trigger words include lazy, minimize, simplify, YAGNI, over-engineered, "least code", "do we need this".
version: 1.0.0
---

# Lazy — Minimal-Code Discipline

Make the agent write like the laziest *competent* senior dev in the room: the best code is the code you never wrote. This skill is the on-demand entry point for the deeper modes (`review`, `audit`, `ultra`); `off` disables the discipline for the session. If you want the core ladder applied always-on, promote it to a standing rule in your instruction/rules layer rather than wiring an always-on hook (a hook is usually over-engineering here — escalate to one only on measured misses).

Origin / why-native: this is an independent implementation inspired by [ponytail](https://github.com/DietrichGebert/ponytail). That tool's entire value is a short (~30-line) prompt; its headline cost-savings benchmarks were single-shot vs a bare model and were contradicted by its own agentic A/B test (cost went *up*). So this skill keeps the philosophy and drops the third-party supply-chain surface — no plugin, no auto-pulled code.

## 1. Modes

Parse the argument passed to `/lazy`:

| Arg | Behavior |
|-----|----------|
| _(none)_ or `full` | **Default.** Apply the decision ladder strictly to the code being written/revised this turn. |
| `lite` | Build as requested, but add a one-line note suggesting a lazier alternative. Don't refactor unprompted. |
| `ultra` | YAGNI extremist — actively challenge whether the requested thing should exist, while still delivering the minimal working version. |
| `off` | Acknowledge and stop applying the ladder for the rest of the session. |
| `review` | Inspect the **current diff / uncommitted changes** and flag over-engineering. Report only — apply nothing. |
| `audit` | Scan the repo (or a named path) for needless complexity. **Suggest-only, never auto-delete** (see §5). |

If no arg, assume `full`.

## 2. The Decision Ladder

Before generating any code, walk this hierarchy and stop at the first rung that satisfies the need:

1. **Does it need to exist at all?** Skip speculative work, unused params, "future-proofing," config no one asked for. (YAGNI)
2. **Does the standard library do it?** Reach for stdlib before anything custom.
3. **Is there a native platform / framework feature?** Prefer built-ins over hand-rolled.
4. **Is it already an installed dependency?** Reuse what's in `package.json` / `requirements.txt` / `pyproject.toml` before adding code or deps.
5. **Can it be one line?** Write the one line.
6. **Otherwise:** the minimum code that fully works — nothing more.

## 3. Operating Rules

- Prefer **deletion over addition**, **boring over clever**, **fewer moving parts over flexible**.
- No unrequested abstractions, boilerplate, scaffolding, wrapper layers, or premature generalization.
- Keep diffs short; touch the fewest files necessary.
- For a complex request: ship the lazy version **and** surface the assumption you'd challenge, in the same turn.
- Output pattern: **code first**, then a brief note of what you deliberately skipped and the condition under which it should be added later.
- Mark intentional shortcuts with a `lazy:` comment recording the trade-off and the upgrade path, e.g.
  `// lazy: in-memory cache; swap for Redis if this runs multi-instance`.

## 4. Non-Negotiables — NEVER minimize these

Minimization pressure does **not** apply to:

- **Input validation** — keep it (always validate with schemas).
- **Error handling that prevents data loss or silent failure** — keep it comprehensive.
- **Security controls** — auth, parameterized queries, sanitization, secret handling. No shortcuts.
- **Accessibility** where relevant.
- **Tests** — TDD and your coverage floor override laziness. "Lazy" means *less production code*, never *fewer tests*. Include at least one runnable check for non-trivial logic.
- **Anything the user explicitly requested**, even if it looks redundant.

If laziness and a non-negotiable conflict, the non-negotiable wins — say so out loud.

## 5. Legacy / existing code — SUGGEST-ONLY (hard rule)

You often can't easily judge whether a deletion in working code is safe. Therefore:

- On `audit`, or any time the ladder is aimed at code that already exists and works, **only produce suggestions** — a ranked list with rationale, risk, and the exact diff each would make.
- **Never auto-delete or auto-rewrite working legacy code.** Wait for explicit per-item approval.
- For each finding, state *why the code might exist* (a guard, an edge case, a compatibility shim) before recommending anything. If you can't explain why it's there, that's a reason to leave it, not cut it.
- New or actively-revised code in the current task may be written lazily by default (still respecting §4).

**Classify every finding by action — removal is NOT the default.** Pick the leanest action that preserves behavior:

| Action | When | What to deliver |
|--------|------|-----------------|
| **remove** | The code is genuinely unused / speculative / dead (YAGNI). | The deletion diff + proof it's unreferenced. |
| **optimize-in-place** | The code *should* exist but is built heavier than needed (hand-rolled where stdlib/native/an existing dep does it; an abstraction collapsible to a few lines; a clearer/cheaper algorithm). | The concrete **leaner rewrite** — same behavior, fewer moving parts — as a diff, with what it replaces. |
| **keep** | It's already minimal, or the simplification's risk outweighs its gain. | Say so and why; don't manufacture a change. |

Prefer `optimize-in-place` over `remove` whenever the functionality is wanted — "make it leaner" is usually more valuable and far lower-risk to approve than "delete it." Reserve `remove` for code that truly shouldn't exist.

## 6. Composition with your existing config

This skill is additive — it fills the one gap most rule stacks don't cover (don't-write-it-in-the-first-place). It must not fight your existing rules:

- Small files, small functions, **immutability** rules still bind. Minimal ≠ mutable. Never introduce mutation to save a line.
- Process gates / TDD — laziness operates *inside* a task, never as an excuse to skip a gate, a test, or a review.
- When in doubt, the stricter rule wins.

## 7. Report format (for `review` / `audit`)

```
Lazy <review|audit> — <scope>
Mode: <full|ultra>

Findings (ranked by value ÷ risk):
1. [path:line] <what's over-engineered>
   action: <remove | optimize-in-place | keep>
   why-it-might-exist: <…>
   rationale: <why this action>   risk: <low|med|high>   gain: ~N lines / a dep / a file / clearer
   diff: <minimal patch — NOT applied>   (for optimize: the leaner rewrite, same behavior)
...

Skipped (looks reducible but left alone): <items + reason>
Non-negotiables touched: <none | list>
```

For `audit` on legacy code, end with: **"Nothing applied. Approve items by number to proceed."**
