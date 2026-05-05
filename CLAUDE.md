# CLAUDE.md

## Project Rules
- Use **Alloy** APIs and patterns from 2026 documentation.
- Treat `gabbro` (Pebble Round 2) as default runtime target.
- Keep `emery` (Pebble Time 2) as compatibility target.

## Engineering Rules
- TDD required: create tests first.
- Keep scope minimal and reversible.
- Prefer small modules for protocol parsing and message validation.

## Command Checklist
- `npm run lint`
- `npm run test`
- `npm run build`
- `npm run emulate:r2`
- `npm run emulate:t2`
