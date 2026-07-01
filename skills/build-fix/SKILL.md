---
name: build-fix
description: Incrementally fix TypeScript and build errors one at a time with verification. Invokes the build-error-resolver agent.
---

# Build and Fix

This command invokes the **build-error-resolver** agent to incrementally fix TypeScript and build errors with minimal, surgical changes.

## How It Works

1. **Run build**: `npm run build`, `pnpm build`, `tsc --noEmit`, or project-specific build command
2. **Parse errors**: Group by file, sort by severity
3. **Fix incrementally** — for each error:
   - Show error context
   - Apply minimal fix (no architectural changes)
   - Re-run build to verify
   - Stop if fix introduces new errors or same error persists after 3 attempts
4. **Report**: Errors fixed, errors remaining, files modified

## When to Use

- After `tsc` or build fails
- After upgrading dependencies
- When type errors block deployment

## Related

- Agent: `~/.claude/agents/build-error-resolver.md`
- For Go builds: `/go-build` (invokes `go-build-resolver` agent)
- For review after fixing: `/code-review`
