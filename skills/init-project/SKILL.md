---
name: init-project
description: Initialize new project with standard structure
argument-hint: "[path]"
disable-model-invocation: true
---

# Init Project: Initialize Project Structure

## Overview

Set up a new project with the standard directory structure and configuration files for an AI development workflow.

## Usage

```bash
/init-project [project-path]
```

Example:
```bash
/init-project ~/projects/my-new-project
```

## What This Command Does

Creates the following structure in the target directory:

```
project-name/
├── .claude/
│   ├── plans/              # Implementation plans
│   ├── code-reviews/       # Code review outputs
│   ├── system-reviews/     # System evolution reviews
│   └── PRD.md              # Product requirements (if applicable)
│
├── CLAUDE.md               # Project-specific configuration
├── README.md               # Project overview
├── .gitignore              # Standard gitignore
└── [project files]
```

## Generated Files

### 1. CLAUDE.md Template

```markdown
# [Project Name] - Project Configuration

## Project Overview
[Brief description of what this project does]

## Tech Stack
- [Primary language and version]
- [Frameworks and major libraries]
- [Database/storage solution]

## Current Focus
[What we're working on right now]

## Key Files
- `[path]` - [Description]
- `[path]` - [Description]

## Development Commands

\`\`\`bash
# Start development server
[command]

# Run tests
[command]

# Build for production
[command]
\`\`\`

## Reference Documentation

**Read when working on:**
- [Topic]: `[path to relevant reference doc, if any]`

## Validation Commands

### Syntax & Style
\`\`\`bash
[linting command]
\`\`\`

### Unit Tests
\`\`\`bash
[test command]
\`\`\`

### Integration Tests
\`\`\`bash
[integration test command]
\`\`\`

## Code Conventions
- [Convention 1]
- [Convention 2]
- [Convention 3]
```

### 2. README.md Template

```markdown
# [Project Name]

[Brief project description]

## Status

**Status:** Active | Paused | Archived
**Type:** Application | Internal Tool | Experiment
**Started:** YYYY-MM-DD

## Quick Start

\`\`\`bash
# Installation
[install commands]

# Development
[dev commands]

# Testing
[test commands]
\`\`\`

## Documentation

- [Architecture Documentation](docs/architecture.md)
- [API Documentation](docs/api.md)
- [Deployment Guide](docs/deployment.md)

## Development

See [CLAUDE.md](CLAUDE.md) for AI development workflow context.

## License

[License information]
```

### 3. .gitignore Template

Based on detected tech stack or user input:

**Python:**
```
__pycache__/
*.py[cod]
*$py.class
.venv/
venv/
*.egg-info/
dist/
build/
.pytest_cache/
.coverage
htmlcov/
```

**Node.js:**
```
node_modules/
npm-debug.log*
yarn-error.log*
dist/
build/
.env
.env.local
coverage/
```

**General:**
```
.DS_Store
Thumbs.db
*.swp
*.swo
.idea/
.vscode/
.claude/settings.local.json
```

## Process

1. **Gather Information**
   - Project name
   - Project type (application, internal tool, experiment)
   - Tech stack
   - Brief description

2. **Create Directory Structure**
   - Create all standard directories
   - Create `.claude/` subdirectories

3. **Generate Configuration Files**
   - Create CLAUDE.md with templates
   - Create README.md with project info
   - Create appropriate .gitignore

4. **Initialize Git** (if not already a repo)
   ```bash
   git init
   git add .
   git commit -m "chore: initialize project structure"
   ```

5. **Confirmation**
   - List created files
   - Provide next steps

## Interactive Questions

Ask the user:

1. **Project name?** (infer from path if possible)
2. **Project type?**
   - Application
   - Internal Tool
   - Experiment
3. **Tech stack?**
   - Python (FastAPI, Flask, Django)
   - Node.js (Express, NestJS, Next.js)
   - PHP (WordPress, Laravel)
   - Other
4. **Brief description?** (one sentence)
5. **Initialize git repository?** (yes/no)

## Output

After initialization, provide:

```
Project initialized successfully

Location: [full path]
Type: [project type]
Tech Stack: [stack]

Created:
- .claude/ (plans, code-reviews, system-reviews)
- CLAUDE.md (project configuration)
- README.md (project overview)
- .gitignore (tech stack specific)

Next steps:
1. Review and customize CLAUDE.md
2. Create PRD if needed: /create-prd .claude/PRD.md
3. Start development!

To prime the AI agent on this project:
/prime
```

## Notes

- Don't overwrite existing files without asking
- Adapt templates based on tech stack
- Include relevant reference doc paths in CLAUDE.md
- Suggest appropriate reference docs based on tech stack
