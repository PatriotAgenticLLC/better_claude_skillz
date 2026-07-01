# `build-error-resolver` -- Build and TypeScript Error Fixer

Build and TypeScript error resolution specialist. Fixes build/type errors with minimal diffs and no architectural changes. Focuses on getting the build green quickly.

## Capabilities

- Resolve TypeScript type errors, inference issues, and generic constraints
- Fix compilation failures and module resolution problems
- Handle dependency issues (missing packages, version conflicts)
- Fix tsconfig.json, webpack, and Next.js configuration errors
- Apply minimal diffs to fix errors without refactoring
- Generate detailed build error resolution reports

## Tools Used

`Read`, `Write`, `Edit`, `Bash`, `Grep`, `Glob`

## Model

Recommended: `opus`

## When to Use

- `npm run build` fails
- `npx tsc --noEmit` shows errors
- Type errors are blocking development
- Import/module resolution errors occur
- Configuration errors need fixing
- Dependency version conflicts arise

## Installation

Copy to your Claude Code agents directory:

**Linux/macOS:**
```bash
mkdir -p ~/.claude/agents/
cp build-error-resolver.md ~/.claude/agents/
```

**Windows PowerShell:**
```powershell
New-Item -ItemType Directory -Force -Path "$env:USERPROFILE\.claude\agents"
Copy-Item build-error-resolver.md "$env:USERPROFILE\.claude\agents\"
```

---
**Author:** Nick Martin, Founder - [PatriotAgentic LLC](https://patriotagentic.com)
**License:** MIT
