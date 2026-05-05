# C with Alloy Best Practices

## When to use C
- Native lifecycle bootstrap and low-level integrations.
- Keep performance-sensitive routines in C only if profiling shows need.

## When to use Alloy JS
- UI, state machine, storage, networking orchestration.
- OpenClaw protocol serialization/validation.

## Bridge pattern
1. Keep C entrypoint minimal (`src/c/mdbl.c`).
2. Keep JS contracts explicit (event type + requestId + payload).
3. Validate every inbound/outbound event in JS before use.

## Example contract
```json
{ "type": "connect", "requestId": "abc-123", "payload": { "host": "10.0.0.2", "port": 443 } }
```
