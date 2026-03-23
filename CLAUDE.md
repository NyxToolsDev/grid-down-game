# Development Guidelines for Claude Code

## Quick Reference

**Claude Code tips:** See [claude-code-tips.md](./claude-code-tips.md)

**Key shortcuts:** `Shift+Tab` (cycle modes) | `Ctrl+G` (edit prompt) | `/clear` (reset context)

---

## Rule Files (Loaded Contextually)

| File | When to Load |
|------|--------------|
| `.claude/rules/security.md` | Auth, APIs, user input, deployment |
| `.claude/rules/python.md` | Python projects |
| `.claude/rules/javascript.md` | JS/TS projects |
| `.claude/rules/healthcare.md` | PHI/PII handling, HIPAA |

**Reference docs** (lookup only): `docs/security-patterns.md`, `docs/command-reference.md`, `docs/dependency-troubleshooting.md`

---

## Package Manager Detection

**JavaScript:** Check lock file → use appropriate manager
- `package-lock.json` → npm
- `yarn.lock` → yarn
- `pnpm-lock.yaml` → pnpm
- `bun.lockb` → bun

**Python:** Always check `python --version` first. Use virtual environments.

---

## Core Workflow

1. **Make focused, atomic changes** - test incrementally
2. **Type check** (if applicable): `npm run typecheck` or `mypy .`
3. **Run tests**: `npm test` or `pytest`
4. **Lint before committing**: `npm run lint` or `flake8 .`
5. **Before PR**: Verify all checks pass

---

## Code Style Principles

### TypeScript/JavaScript
- **Never use `enum`** - use string literal unions
- Prefer `type` over `interface`
- `const` by default, `let` only when needed, **never `var`**
- Arrow functions for callbacks
- Optional chaining (`?.`) and nullish coalescing (`??`)

### Python
- Type hints for public functions
- `async`/`await` over raw threading
- `secrets` module for cryptographic randomness (not `random`)

### General
- Functions < 50 lines
- One responsibility per function
- Meaningful, descriptive names
- Extract magic numbers to constants

---

## Security Essentials

**Always:**
- Validate all input server-side
- Use parameterized queries (never string concatenation for SQL)
- Externalize secrets to environment variables
- Hash passwords with bcrypt/argon2

**Never:**
- Commit secrets, API keys, or credentials
- Use `eval()` with user input
- Trust client-provided user IDs
- Store tokens in localStorage (use HttpOnly cookies)

**See `.claude/rules/security.md` for full checklist.**

---

## File Naming

- `kebab-case` for files: `user-service.ts`
- `PascalCase` for components/classes: `UserProfile.tsx`
- `camelCase` for functions/variables: `getUserById()`
- `UPPER_CASE` for constants: `MAX_RETRIES`

---

## Git Conventions

### Commit Messages
Use conventional commits:
```
feat: add user authentication
fix: resolve race condition in payment processing
docs: update API documentation
refactor: simplify error handling logic
```

### Branch Naming
```
feature/user-auth
bugfix/payment-race-condition
hotfix/security-patch
```

---

## Notes for Claude Code

### Before Writing Code
- Read existing code before suggesting modifications
- Check for security issues first
- Consider error cases and edge conditions

### When Suggesting Code
- Run typecheck/lint before marking ready
- Show commands you'll run
- If tests fail, analyze and suggest specific fixes

### Dependencies
- **Python:** Check Python version first, don't blindly update all packages
- **JavaScript:** Check lock files, use `npm ci` in CI/CD
- Don't pin transitive dependencies
- Use version ranges unless specific reason to pin

### Planning
- Enter planning mode for complex changes
- Break large tasks into steps
- Validate approach before implementation

### Response Authority
- Default to the most qualified subject matter expert perspective for the domain
- Lead with confident, authoritative answers; reserve caveats for when genuinely warranted
- Match the user's technical depth — don't simplify unless asked
- When working across domains (healthcare IT, automation, cloud, business), adjust expertise per domain rather than defaulting to generalist explanations

### Accuracy & Verification
- If uncertain, state "I don't have enough information" — don't fill gaps with assumptions
- For claims about project files, cite supporting quotes; flag unsupported claims
- When referencing external standards (DICOM, HL7, HIPAA), flag whether from project docs or general knowledge
- For critical outputs (specs, migration plans), re-read source files before finalizing
- Verify cross-file references are consistent before completing multi-file tasks
- Confirm project-specific APIs, configs, or schemas exist in codebase before generating code that references them

---

## Healthcare IT (When Applicable)

- **Never log PHI/PII** - use hashed identifiers
- Encryption required for sensitive data at rest
- Audit trails for all PHI access
- See `.claude/rules/healthcare.md` for HIPAA requirements

---

**Last Updated:** March 23, 2026
**Maintained by:** Lindsey
