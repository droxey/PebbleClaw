# AGENTS.md

## Mandatory SDK + Platform Policy
- Use **Alloy JavaScript SDK (2026 guides)** for all watch application logic by default.
- Default emulator target is **Pebble Round 2 (`gabbro`)**.
- Secondary target is **Pebble Time 2 (`emery`)**.
- Do not introduce pre-2026 legacy JS SDK patterns.

## TDD Policy
- Tests must be written **before** implementation for each feature.
- Minimum workflow: failing test -> minimal implementation -> refactor -> full test pass.

## Development Workflow
1. Run `npm run lint`.
2. Run `npm run test`.
3. Run `npm run build`.
4. Run `npm run emulate:r2` (default) and `npm run emulate:t2`.

## C + Alloy Guidance
- Prefer Alloy JS for UI, app flow, networking, and storage.
- Use C only for low-level integration or performance-sensitive logic.
- Keep JS/C message contracts explicit and versioned.
