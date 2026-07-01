---
name: wrapup
description: End-of-session workflow that runs security review, code review, commit, push, Git hygiene, and a memory/learnings capture with user checkpoints between each phase.
---

# /wrapup — End-of-Session Workflow

Run security review, code review, commit, push, Git hygiene, and a memory/learnings capture in sequence with user checkpoints between phases. The session is cleanly closed when work is committed and pushed, the repo leaves no debris (dead worktrees, orphaned branches), and any new learnings are anchored in memory.

> This workflow invokes `/security-review`, `/code-review`, and `/commit` between phases. If your setup names those differently, swap in your own equivalents.

## Phase 0: Context Window Guard

Evaluate whether this session has significant prior context loaded. Consider:
- Has there been multiple rounds of edits, large files read, or extended tool usage?
- Does the conversation feel lengthy with many back-and-forth exchanges?

If this session has involved significant prior work and context appears >50% used:

1. **HALT immediately** — do not proceed with any phase.
2. Output:
   ```
   **CONTEXT GATE**: This session has significant prior context loaded.
   The /wrapup workflow needs fresh context to run all 4 phases reliably.

   Please run these commands in order:
   1. /clear
   2. /prime
   3. /wrapup
   ```
3. **STOP.** Do not continue.

If context appears sufficient, proceed to Phase 0b.

## Phase 0b: Pre-flight Check

1. Run `git rev-parse --is-inside-work-tree` to confirm this is a git repository.
   - If NOT a git repo → output "Not a git repository. Nothing to wrap up." and **STOP**.
2. Run `git status --short` to check for changes.
   - If working tree is clean with nothing staged → output "Working tree clean. Nothing to wrap up." and **STOP**.
3. Run `git diff --stat HEAD` to summarize the scope of changes.
4. Present the summary to the user and confirm they want to proceed with the wrapup workflow.

## Phase 1: Security Review

1. Invoke `/security-review` via the Skill tool.
2. If the skill invocation fails (skill not found, error), present the error and offer the user: **skip this phase** or **abort**.
3. Evaluate findings:
   - **No issues found** → Auto-proceed: "Security review: clean. Proceeding to code review."
   - **Issues found** → Present findings, then **CHECKPOINT**:

     ```
     ## Phase 1: Security Review — Complete

     [Findings above]

     {If CRITICAL issues: "**WARNING**: CRITICAL security issues found. Strongly recommended to fix before committing."}

     **CHECKPOINT**: What would you like to do?
     - **proceed** — Continue to code review (Phase 2)
     - **fix** — I'll address the findings now. Say "re-run security" when ready to re-check, or "proceed" to move on.
     - **skip** — Skip to code review without addressing findings
     - **abort** — Stop the wrapup workflow
     ```

4. If user says "fix": Address the findings (edit code to resolve issues). User then says "re-run security" to repeat Phase 1, or "proceed" to continue.

## Phase 2: Code Review

1. Invoke `/code-review` via the Skill tool.
2. If the skill invocation fails, present the error and offer: **skip** or **abort**.
3. Note: `/code-review` runs against `git diff HEAD`, which covers all uncommitted changes — including any fixes made during Phase 1.
4. Evaluate findings:
   - **No issues found** → Auto-proceed: "Code review: clean. Proceeding to commit."
   - **Issues found** → Present findings (including any saved report path), then **CHECKPOINT**:

     ```
     ## Phase 2: Code Review — Complete

     [Findings above]

     **CHECKPOINT**: What would you like to do?
     - **proceed** — Continue to commit (Phase 3)
     - **fix** — I'll address the findings now. Say "re-run code review" when ready to re-check, or "proceed" to move on.
     - **skip** — Skip to commit without addressing findings
     - **abort** — Stop the wrapup workflow
     ```

## Phase 3: Commit

1. Invoke `/commit` via the Skill tool.
2. If the skill invocation fails, present the error and offer: **retry** or **abort**.
3. Present commit result (hash, message, files changed).
4. **CHECKPOINT**:

   ```
   ## Phase 3: Commit — Complete

   [Commit details]

   **CHECKPOINT**: Commit created locally.
   - **proceed** — Continue to push (Phase 4)
   - **abort** — Stop here (commit is preserved locally)
   ```

## Phase 4: Git Push

1. Check for remote: `git remote -v`
2. If **no remote configured**:
   ```
   ## Phase 4: Push — Skipped

   No git remote configured. Your commit is saved locally.
   To add a remote later: `git remote add origin <url>`
   ```
   Skip to Phase 5.

3. If **remote exists**:
   a. Determine target: check tracking branch with `git rev-parse --abbrev-ref --symbolic-full-name @{u} 2>/dev/null`
   b. Count commits to push: `git rev-list @{u}..HEAD --count 2>/dev/null` (or `git log --oneline` if no tracking)
   c. **Confirm before pushing** using AskUserQuestion:
      ```
      About to push to: origin/{branch}
      Commits to push: {N}

      Proceed with push? (yes/no)
      ```
   d. Execute push:
      - If tracking exists: `git push`
      - If no tracking: `git push -u origin $(git branch --show-current)`
   e. If push **fails** (rejected, permission denied, etc.):
      - Present the error clearly
      - Suggest remediation (e.g., `git pull --rebase` for rejected pushes, check credentials for auth failures)
      - Offer: **retry** or **skip push**

4. Present push result.

## Phase 5: Git Hygiene (worktrees & branches)

Leave no debris — dead worktrees, orphaned or already-merged branches — without destroying anything blindly. This phase is **scan → present → act on confirmation only**.

### 5a: Scan (read-only — take no action)

```bash
# Resolve the default branch (e.g. main or master)
DEFAULT=$(git symbolic-ref --quiet --short refs/remotes/origin/HEAD 2>/dev/null | sed 's@^origin/@@'); DEFAULT=${DEFAULT:-main}
echo "default: $DEFAULT  |  current: $(git branch --show-current)  |  pwd: $(pwd)"
git worktree list
git branch --merged "$DEFAULT"    | grep -v '^\*' | grep -v " $DEFAULT$"   # merged → safe to delete
git branch --no-merged "$DEFAULT" | grep -v '^\*' | grep -v " $DEFAULT$"   # unmerged → needs a decision
```

If there are no extra worktrees and no stale branches → output "Git hygiene: clean. Nothing to tidy." and proceed to Phase 6.

### 5b: Present & classify

```
## Phase 5: Git Hygiene

🧹 Safe to remove (merged into {DEFAULT}, no worktree):
  - {branch} ...

🛑 Needs your decision (not merged, may hold unique work):
  - {branch} ...

🌳 Worktrees other than main:
  - {path} → {branch}
```

### 5c: Act — one item at a time, with confirmation

**Merged branches (no worktree):** safe — their commits already live in `{DEFAULT}`.
- Confirm, then delete with the safe flag only: `git branch -d <branch>`.

**Unmerged branches:** show what's inside **before** any deletion: `git log <branch> --not "$DEFAULT" --oneline`.
- If the content already exists in `{DEFAULT}` via another commit → tell the user, and on explicit OK delete with `git branch -d` (let Git's safety check stand; do not reach for `-D` unless the user, having seen the content, explicitly accepts the loss).
- If the content exists nowhere else → it must be merged or kept. Do **not** delete. Offer to bring it in:
  - **Fast-forward possible** (`git merge-base --is-ancestor "$DEFAULT" <branch>` succeeds): offer `git merge --ff-only <branch>` from the main checkout.
  - **Diverged:** offer a PR instead — `gh pr create --base "$DEFAULT" --head <branch>`.
  - Pushing `{DEFAULT}` after a merge requires a **separate, explicit** confirmation (see Critical rules).

**Worktrees:** after a branch is merged + pushed, its worktree can be removed — but only from the main repo, never from inside the worktree path itself.
- If `pwd` is inside the worktree → do not remove it. Hand the user the one-liner to run later:
  ```
  cd "$(git rev-parse --show-toplevel)" && git worktree remove .claude/worktrees/<name> && git branch -d <branch>
  ```
- If `/wrapup` is running from the main repo → on confirmation: `git worktree remove <path>` (never `--force`; if it fails because the worktree is dirty, stop and report what's inside).

### Critical rules (non-negotiable)

- **Never push `{DEFAULT}` without explicit, specific approval.** "Tidy everything up" is NOT approval — the user must say, in effect, "yes, push {DEFAULT}".
- **Never force-delete (`-D`) without showing `git log <branch> --not {DEFAULT}` first.** Prefer `-d` and let Git's merge check protect you.
- **Never `--force` a worktree removal.** Dirty worktree → stop, report, let the user decide.
- **Never remove the worktree you are standing in** — give the user the deferred one-liner instead.
- **Never discard uncommitted work** (already handled in Phase 3, but holds here too).

If everything in this phase is clean or deferred to the user, proceed to Phase 6.

## Phase 6: Memory & Learnings Capture

Anchor anything worth keeping from this session into your memory system (learnings go to memory, not a repo `HISTORY.md`).

1. **Proactively scan the session** for 0–2 durable learnings — a workaround, a new rule or preference, a non-obvious decision and its rationale, a pattern worth repeating. Draft them as candidates; do not invent filler.

2. **Soft prompt** the user:
   ```
   ## Phase 6: Memory & Learnings

   Anything from this session worth keeping in memory?
   {If candidates found, list them as suggestions:}
   Suggested:
     - {one-line candidate} ({type})
     - {one-line candidate} ({type})

   Reply with what to save (or edit my suggestions), or say **skip** if nothing needs anchoring.
   ```

3. **If the user names something (or accepts a suggestion):** save it following whatever memory conventions your setup uses.
   - Prefer one durable fact per entry, scoped to the relevant project.
   - **Check for an existing entry** that already covers the fact and update it rather than duplicating.
   - Don't save what the repo, git history, or CLAUDE.md already records.

4. **If the user says "skip" / "no":** move on — memory updates often already happened mid-session.

## Wrapup Summary

After all phases complete (or after abort), ALWAYS present the final summary:

```
## Wrapup Summary

| Phase | Status |
|-------|--------|
| Security Review | {Completed (clean) / Completed (issues found) / Skipped / Aborted} |
| Code Review | {Completed (clean) / Completed (issues found) / Skipped / Aborted} |
| Commit | {Completed ({hash}) / Skipped / Aborted} |
| Push | {Completed ({remote/branch}) / Skipped / N/A (no remote) / Failed} |
| Git Hygiene | {Clean / Tidied ({N} branches, {M} worktrees) / Deferred to user / Skipped} |
| Memory | {Saved ({N} entries) / Nothing to anchor / Skipped} |
```

End with a clear close line once all phases are done: **"Session cleanly wrapped up — you can safely close now."** If anything was deferred to the user (e.g. a worktree to remove from the main repo, an unmerged branch), restate the exact copy-paste one-liner(s) for later.
