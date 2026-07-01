---
name: set-working-dir
description: Change working directory to a specified path or project location
argument-hint: "[path-or-project]"
---

# Set Working Directory

## Command
`/set-working-dir [path-or-project-name]`

## Purpose
Change the current working directory to a user-supplied path (or locate a project by name under a search root you provide) and verify it's correctly set — including the caveats around how working-directory changes do and don't persist between tool calls.

## Usage

### Option 1: Direct Path
```
/set-working-dir ~/projects/my-app
/set-working-dir /absolute/path/to/project
/set-working-dir C:\Users\you\projects\my-app
```

### Option 2: Project Name (searches under a root you provide)
```
/set-working-dir my-app
```
By default the search root is your home directory (`~`). Point it somewhere narrower — e.g. a `~/projects` or `~/builds` tree — by passing a root or setting one in your own config; there is no built-in project registry.

## Process

### 1. Parse Input

Determine if input is:
- **Absolute path**: Contains a drive letter (`C:\`) or starts with `/` or `~`
- **Relative path**: Starts with `./` or `../`
- **Project name**: Everything else (search for it)

### 2. Handle Direct Path

If an absolute or relative path is provided:

```bash
cd "[path]" && pwd && git branch --show-current
```

### 3. Handle Project Name

If a project name is provided, search under the user-supplied search root (default `~`), taking the first match:

```bash
# ROOT defaults to $HOME; override with a directory you want to search
ROOT="${SEARCH_ROOT:-$HOME}"
find "$ROOT" -type d -name "[project-name]" 2>/dev/null | head -1
```

If nothing matches, report that the project was not found and list a few candidate directories under the root so the user can pick.

### 4. Verify Directory

After changing directory, verify:
```bash
cd "[resolved-path]" && pwd && git branch --show-current
```

### 5. Persistence Verification

**CRITICAL:** Bash `cd` commands do NOT persist between tool calls. Each bash command starts fresh from the session's working directory.

To confirm the target is usable, run these checks:

**Test 1: Bash Command (with cd chain)**
```bash
cd "[resolved-path]" && ls -la | head -10
```

**Test 2: File Operations (absolute path)**
```
# Try to read CLAUDE.md or README.md
Read: [resolved-path]/CLAUDE.md
```

**Test 3: Git operations (with cd chain)**
```bash
cd "[resolved-path]" && git status --short
```

**Output Format:**
```
Found project at: [resolved-path]
Working directory set to: [resolved-path]
Current branch: main

Verification Tests:
Bash operations: Working (requires 'cd && ' prefix)
File operations: Working (using absolute paths)
Git operations: Working

IMPORTANT: Working directory persistence notes
- Bash commands: Directory does NOT persist between commands
  -> Always chain: cd [path] && [command]

- File operations (Read/Write/Edit/Glob): Use absolute paths
  -> Will work: [resolved-path]/CLAUDE.md
  -> Won't work reliably: CLAUDE.md (relative path)

- Best practice: For sustained work, open this folder in your editor
  (e.g. File -> Open Folder -> [resolved-path])

Project path stored in session memory: [resolved-path]
```

### 6. Handle Errors

**Directory not found:**
```
Error: Directory '[path]' does not exist
```

**Project not found:**
```
Error: Project '[name]' not found under [search-root]

Searched in: [search-root]
```

**Not a git repository:**
```
Working directory set to: [path]
Warning: Not a git repository (no branch info)
```

## Examples

### Example 1: Direct Path
```
User: /set-working-dir ~/projects/my-app

Agent executes:
cd ~/projects/my-app && pwd && git branch --show-current

Output:
Working directory set to: /home/you/projects/my-app
Current branch: main
```

### Example 2: Project Name Search (with Verification)
```
User: /set-working-dir my-app

Agent:
1. Searches for 'my-app' under the search root (default ~)
2. Finds: ~/projects/my-app
3. Executes: cd ~/projects/my-app && pwd && git branch --show-current
4. Runs verification tests (bash ls, file read, git status)
5. Displays persistence warnings and workarounds
```

### Example 3: Project Not Found
```
User: /set-working-dir non-existent-project

Agent:
1. Searches for 'non-existent-project' under the search root
2. No matches found

Output:
Error: Project 'non-existent-project' not found under ~
Searched in: ~
Tip: pass a full path, or point the search at a narrower root.
```

### Example 4: Relative Path
```
User: /set-working-dir ../other-project

Agent executes:
cd ../other-project && pwd && git branch --show-current
```

## Implementation

When this command is invoked:

```javascript
function handleSetWorkingDir(input) {
    const trimmed = input.trim();

    // Determine input type
    const isAbsolutePath = /^[A-Za-z]:[\\/]/.test(trimmed) ||
                          trimmed.startsWith('/') ||
                          trimmed.startsWith('~');
    const isRelativePath = trimmed.startsWith('./') || trimmed.startsWith('../');

    if (isAbsolutePath || isRelativePath) {
        return handleDirectPath(trimmed);
    } else {
        return handleProjectSearch(trimmed);
    }
}

function handleDirectPath(path) {
    // Convert a Windows path to a bash-compatible one if needed
    const bashPath = path
        .replace(/\\/g, '/')
        .replace(/^([A-Za-z]):/, (_, drive) => `/${drive.toLowerCase()}`);

    // Execute cd and verify
    const command = `cd "${bashPath}" && pwd && git branch --show-current`;
    // Run via the Bash tool
}

function handleProjectSearch(projectName) {
    // Search under a user-supplied root (default $HOME); no hardcoded registry
    const searchCommand =
        `find "\${SEARCH_ROOT:-$HOME}" -type d -name "${projectName}" 2>/dev/null | head -1`;

    // If found, cd to it and verify. If not, list candidate dirs under the root.
}
```

## Notes

- Use Unix-style paths for bash compatibility (`/c/Users/...` instead of `C:\Users\...` on Windows/Git Bash).
- **Directory does NOT persist in bash** — each bash command starts fresh from the session working directory.
- The resolved path is stored in the agent's session memory for reference.
- Project-name search recursively finds the first match under the search root; narrow the root to avoid slow scans and false matches.
- Git branch info is optional — it won't fail if the target isn't a git repo.

## Understanding Persistence

### What DOESN'T Persist
- Bash working directory (`cd` only affects that single command)
- Subsequent bash commands without a `cd &&` prefix run from the session working directory

### What DOES Work
- File operations (Read/Write/Edit/Glob) with absolute paths
- Bash commands that chain: `cd [path] && [command]`
- The agent remembering the resolved path for the session

### Workarounds
1. **Best solution:** Open the folder in your editor (File -> Open Folder)
2. **For bash:** Always prefix with `cd [path] &&`
3. **For files:** Always use absolute paths from the resolved path

## Related Commands

- `/prime` — Load project context (run it after changing directory)

## Success Criteria

- Successfully changes working directory
- Verifies the directory exists before changing
- Shows current git branch if available
- **Runs verification tests** for bash and file operations
- **Displays persistence warnings** and workarounds
- **Stores the resolved path** in session memory
- **Tests an actual file read** from the target directory
- Provides helpful error messages when a path/project isn't found
- Handles both Windows and Unix-style paths
