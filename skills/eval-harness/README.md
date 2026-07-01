# `/eval-harness` -- Formal Evaluation Framework

A formal evaluation framework for Claude Code sessions implementing eval-driven development (EDD) principles with capability evals, regression evals, and pass@k metrics.

## Usage

```
/eval-harness
```

## Features

- Capability evals to test new functionality with success criteria checklists
- Regression evals to ensure changes don't break existing behavior
- Three grader types: code-based (deterministic), model-based (Claude), and human review
- pass@k and pass^k metrics for measuring reliability
- Structured eval workflow: Define, Implement, Evaluate, Report

## Installation

Copy to your Claude Code skills directory:

**Linux/macOS:**
```bash
cp -r eval-harness ~/.claude/skills/
```

**Windows PowerShell:**
```powershell
Copy-Item -Recurse eval-harness "$env:USERPROFILE\.claude\skills\"
```

---
**Author:** Nick Martin, Founder - [PatriotAgentic LLC](https://patriotagentic.com)
**License:** MIT
