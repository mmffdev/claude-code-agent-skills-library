# Security Audit — Trigger Config

**This file tells Claude Code when to load the security scanner. Do not delete it.**

## Shortcuts

When the user types any of these shortcuts, load and follow `c_securityAudit.md`:

| Shortcut | Scope |
|----------|-------|
| `<sec_front>` | Frontend scan |
| `<sec_back>` | Backend scan |
| `<sec_api>` | API scan |
| `<sec_pen>` | Penetration test scan |
| `<sec_full>` | Full scan (all of the above) |

The user may also ask in plain language (e.g. "run a security audit", "check my code for vulnerabilities"). Treat this the same as `<sec_full>`.

## Watch Mode

If `--watch` is appended to any shortcut (e.g. `<sec_full> --watch`), pass it as a parameter when loading `c_securityAudit.md`. The skill handles watch behaviour internally.

## Rules

- **Lazy-load only** — do not read `c_securityAudit.md` until one of the above triggers fires. Do not pre-load it.
- **No scans without a trigger** — never run security checks unless the user explicitly asks or uses a shortcut.
- **Return to normal after scan** — once the scan completes (and watch mode is not active), resume normal operation. Do not stay in security context.

## File Locations

| File | Purpose |
|------|---------|
| `config.md` | This file — trigger config (must be in project root or `.claude/`) |
| `c_securityAudit.md` | Full scan instructions — loaded on demand |
| `agent-config.md` | User settings (folder paths, severity filters, watch frequency) |
| `dev-mode/security/reports/` | Where JSON reports are saved |
