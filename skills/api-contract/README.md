# `/api-contract` -- API Contract Manager

Generates OpenAPI specs from your code, validates live responses against the contract, and flags breaking changes between versions for FastAPI, Flask, and Express projects.

## Usage

```
/api-contract [--generate|--validate|--breaking|--endpoints]
```

## Features

- Endpoint discovery across FastAPI, Flask, and Express, rendered as a method / path / handler / file table
- OpenAPI 3.0 spec generation: extracted from the FastAPI runtime, or a skeleton scaffolded for Flask/Express
- Contract validation against a running API, plus schemathesis recommendations for automated testing
- Breaking-change detection versus the last git tag, classified as breaking / non-breaking / potentially breaking
- API surface diff since the last commit for fast pre-merge review
- Read-only analysis; only `--generate` writes an `openapi.yaml` skeleton

## Installation

Copy to your Claude Code skills directory:

**Linux/macOS:**
```bash
cp -r api-contract ~/.claude/skills/
```

**Windows PowerShell:**
```powershell
Copy-Item -Recurse api-contract "$env:USERPROFILE\.claude\skills\"
```

---
**Author:** Nick Martin, Founder - [PatriotAgentic LLC](https://patriotagentic.com)
**License:** MIT
