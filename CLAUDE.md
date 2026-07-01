# Better Claude Skillz

## Overview
Shareable collection of Claude Code agents, commands, and skills. Packaged for distribution and installation into other Claude Code setups.

## Structure
```
agents/       — Agent definitions (architect, code-reviewer, etc.)
commands/     — Command definitions (challenge, plan, go-build, etc.)
skills/       — Skill definitions (various)
optimize-context/ — Context optimization tooling
```

## Tech Stack
- Markdown (agent/command/skill definitions)
- JavaScript (optimize-context scripts)

## Challenge Criteria

When `/challenge` runs in this project, additionally evaluate:
- **Consumer environment compatibility** — Skills, agents, and commands install into arbitrary `~/.claude/` setups. Verify no definition references hardcoded paths, machine-specific tools, or project-specific files that won't exist in consumer environments.
- **Source sync drift** — This repo mirrors `~/.claude/` originals. Verify exports match the current live source and no stale or renamed definitions are distributed as current.

## Development
This is a distribution repo — changes should be tested in `~/.claude/` first, then synced here for sharing.
