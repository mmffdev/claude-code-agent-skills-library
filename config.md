# Global Configuration for Claude Code

## Security Audit Trigger

When the user types any of the following shortcuts:
- `<sec_front>`
- `<sec_back>`
- `<sec_pen>`
- `<sec_api>`
- `<sec_full>`

Or asks for a security audit of the codebase, you MUST load and follow the instructions in `c_securityAudit.md`.

Do not run any security checks unless these triggers are used or the user explicitly asks.

Lazy-loading rule: Only read `c_securityAudit.md` when one of the above triggers happens. Do not pre-load it.
