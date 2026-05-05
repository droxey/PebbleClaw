# PebbleClaw

Alloy-first Pebble app for connecting to OpenClaw gateways from Pebble Round 2 and Pebble Time 2.

## 2026 Targets
- Default: **Pebble Round 2** (`gabbro`)
- Secondary: **Pebble Time 2** (`emery`)

## SDK Policy
This project uses the 2026 **Alloy JavaScript SDK** model:
- Watch code in `src/embeddedjs/`
- Phone proxy code in `src/pkjs/`
- Optional native bridge code in `src/c/`

## TDD Workflow (Required)
1. Add/adjust tests in `tests/`.
2. Run `npm run test` and confirm failure first.
3. Implement minimal code changes.
4. Run `npm run lint && npm run test`.
5. Build and emulate.

## Commands
- `npm run lint` - JS formatting + lint checks
- `npm run test` - node test suite
- `npm run build` - pebble build
- `npm run emulate:r2` - run on Round 2 emulator (`gabbro`)
- `npm run emulate:t2` - run on Time 2 emulator (`emery`)
- `npm run verify` - lint + test + build

## C with Alloy (Best Practice)
- Keep UI + app orchestration in Alloy JS.
- Keep C focused on low-level watch integration.
- Use explicit message contract constants shared in docs and tests.

See:
- `docs/alloy-2026-notes.md`
- `docs/c-with-alloy.md`

## Codex environment bootstrap
Use the project script to install only required runtime pieces and cache tools in a Codex-local directory:

```bash
./scripts/setup-codex-env.sh
```

What it does:
- Installs required shared libs via apt without a full system upgrade.
- Installs `uv` (if missing).
- Installs `pebble-tool` using Python 3.12.
- Creates a `pebble` shim that points to `pebble-tool` so existing npm scripts work.
- Installs the latest Pebble SDK.
- Writes `~/.codex-env` so future Codex tasks reuse caches.

To make Codex use the cached toolchain, load the generated env file in shell init for tasks:

```bash
source ~/.codex-env
```

Quick verification:

```bash
uv --version
pebble-tool --version
pebble --version
```
