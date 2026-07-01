# `/build-fix` -- Incremental Build Error Fixer

Fixes TypeScript and build errors one at a time with minimal, surgical changes, verifying the build after each fix.

## Usage

```
/build-fix
```

## Features

- Runs your build (`npm run build`, `pnpm build`, `tsc --noEmit`, or a project-specific command)
- Parses and groups errors by file, sorted by severity
- Applies minimal fixes without architectural changes, re-running the build to verify each one
- Stops when a fix introduces new errors or an error persists after 3 attempts
- Delegates to the `build-error-resolver` agent for focused, low-risk edits
- Reports errors fixed, errors remaining, and files modified

## Installation

Copy to your Claude Code skills directory:

**Linux/macOS:**
```bash
cp -r build-fix ~/.claude/skills/
```

**Windows PowerShell:**
```powershell
Copy-Item -Recurse build-fix "$env:USERPROFILE\.claude\skills\"
```

---
**Author:** Nick Martin, Founder - [PatriotAgentic LLC](https://patriotagentic.com)
**License:** MIT
