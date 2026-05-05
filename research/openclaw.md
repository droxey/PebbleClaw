# OpenClaw Gateway Method Inventory Matrix

## Goal
Produce a practical method matrix: `method → role/scope → Pebble relevance`.

## Constraints
- OpenClaw docs explicitly say this is **not a generated full dump** of every callable helper; it’s the public/main WS surface + families.
- Some methods have explicit scope docs; others require inference from family and reserved prefixes.
- Pebble relevance is for a watch client + companion flow (not server admin panel).

## Approach
- Extracted all named methods and families from the Gateway Protocol page sections.
- Applied explicit scope rules where documented.
- Marked inference where docs don’t state exact per-method scope.

## Scope legend (from docs)
- `operator.read`, `operator.write`, `operator.admin`, `operator.approvals`, `operator.pairing`, `operator.talk.secrets`.
- Reserved admin prefixes: `config.*`, `exec.approvals.*`, `wizard.*`, `update.*` → `operator.admin`.
- `talk.config(includeSecrets:true)` requires `operator.talk.secrets` or `operator.admin`.
- `node.pair.approve` has extra conditional scope checks.

## Inventory matrix

> Relevance scale: **High** (likely in watch UX), **Med** (companion/admin assist), **Low** (mostly backend/operator console).

### 1) Handshake / lifecycle
| Method | Role | Scope | Pebble relevance | Notes |
|---|---|---|---|---|
| `connect` | operator/node | role-declared + auth token | **High** | Required first request on WS. |
| `health` | operator | likely `operator.read` | **Med** | Good startup probe. |
| `status` | operator | read/admin (sensitive fields admin) | **Med** | Use for diagnostics screens. |
| `system-presence` | operator | likely `operator.read` | **Med** | Device/session presence view. |
| `system-event` | operator | likely write | **Low** | Event append/broadcast. |
| `last-heartbeat` | operator | likely read | **Low** | Infra diagnostics. |
| `set-heartbeats` | operator | likely write/admin | **Low** | Infra toggle. |

### 2) Identity / pairing base
| Method | Role | Scope | Relevance | Notes |
|---|---|---|---|---|
| `gateway.identity.get` | operator | likely read | **Med** | Useful for pairing flows. |

### 3) Models / usage
| Method | Role | Scope | Relevance | Notes |
|---|---|---|---|---|
| `models.list` | operator | read | **High** | Model picker in app settings. |
| `usage.status` | operator | read | **Low** | Quota dashboard. |
| `usage.cost` | operator | read | **Low** | Cost reporting. |
| `doctor.memory.status` | operator | read | **Low** | Operator diagnostics. |
| `sessions.usage` | operator | read | **Low** | Session analytics. |
| `sessions.usage.timeseries` | operator | read | **Low** | Session analytics. |
| `sessions.usage.logs` | operator | read | **Low** | Session analytics. |

### 4) Channels / login helpers
| Method | Role | Scope | Relevance | Notes |
|---|---|---|---|---|
| `channels.status` | operator | read | **Med** | Show channel readiness. |
| `channels.logout` | operator | write | **Low** | Admin/account action. |
| `web.login.start` | operator | write | **Med** | Useful in phone companion login onboarding. |
| `web.login.wait` | operator | write/read | **Med** | Completes login flow. |
| `push.test` | operator | write | **Low** | iOS-node diagnostic. |
| `voicewake.get` | operator | read | **Low** | Voicewake config. |
| `voicewake.set` | operator | write | **Low** | Voicewake config write. |

### 5) Messaging / logs
| Method | Role | Scope | Relevance | Notes |
|---|---|---|---|---|
| `send` | operator | write | **High** | Direct outbound delivery. |
| `logs.tail` | operator | read/admin | **Low** | Troubleshooting. |

### 6) Talk / TTS
| Method | Role | Scope | Relevance | Notes |
|---|---|---|---|---|
| `talk.config` | operator | read; secrets need `operator.talk.secrets`/admin | **Med** | Needed for feature toggles. |
| `talk.mode` | operator | write | **Med** | Session modality control. |
| `talk.speak` | operator | write | **High** | Watch-triggered TTS actions. |
| `tts.status` | operator | read | **Med** | Provider/enable state. |
| `tts.providers` | operator | read | **Low** | Setup screen. |
| `tts.enable` | operator | write | **Low** | Admin pref toggle. |
| `tts.disable` | operator | write | **Low** | Admin pref toggle. |
| `tts.setProvider` | operator | write | **Low** | Setup action. |
| `tts.convert` | operator | write | **Med** | One-shot audio generation. |

### 7) Secrets / config / updates / wizard
| Method | Role | Scope | Relevance | Notes |
|---|---|---|---|---|
| `secrets.reload` | operator | likely admin | **Low** | Runtime secret refresh. |
| `secrets.resolve` | operator | likely admin/read | **Low** | Secret assignment resolution. |
| `config.get` | operator | admin (reserved prefix) | **Low** | Config snapshot. |
| `config.set` | operator | admin | **Low** | Full write. |
| `config.patch` | operator | admin | **Low** | Partial write. |
| `config.apply` | operator | admin | **Low** | Validate + replace full config. |
| `config.schema` | operator | admin/read (prefix admin rule applies) | **Low** | UI schema tooling. |
| `config.schema.lookup` | operator | admin | **Low** | Path-specific schema inspect. |
| `update.run` | operator | admin | **Low** | Gateway update orchestration. |
| `wizard.start` / `wizard.next` / `wizard.status` / `wizard.cancel` | operator | admin | **Low** | Onboarding/admin wizard. |

### 8) Agents / workspace
| Method | Role | Scope | Relevance | Notes |
|---|---|---|---|---|
| `agents.list` | operator | read | **Med** | Multi-agent watch switcher support. |
| `agents.create` / `agents.update` / `agents.delete` | operator | write/admin | **Low** | Admin lifecycle. |
| `agents.files.list` / `agents.files.get` / `agents.files.set` | operator | write/admin | **Low** | Workspace file mgmt. |
| `agent.identity.get` | operator | read | **Med** | Display assistant identity. |
| `agent.wait` | operator | read | **Med** | Poll/wait for completion. |

### 9) Session/chat control
| Method | Role | Scope | Relevance | Notes |
|---|---|---|---|---|
| `sessions.list` | operator | read | **High** | Conversation picker. |
| `sessions.subscribe` / `sessions.unsubscribe` | operator | read | **High** | Live session updates. |
| `sessions.messages.subscribe` / `sessions.messages.unsubscribe` | operator | read | **High** | Transcript streaming. |
| `sessions.preview` | operator | read | **High** | Watch-friendly previews. |
| `sessions.resolve` | operator | read | **Med** | Canonical target handling. |
| `sessions.create` | operator | write | **High** | New conversation from watch. |
| `sessions.send` | operator | write | **High** | Primary message send. |
| `sessions.steer` | operator | write | **Med** | Interrupt/steer active run. |
| `sessions.abort` | operator | write | **High** | Stop command for watch UX. |
| `sessions.patch` | operator | write | **Low** | Metadata edits. |
| `sessions.reset` / `sessions.delete` / `sessions.compact` | operator | write/admin | **Low** | Maintenance/admin. |
| `sessions.get` | operator | read | **High** | Load full session detail. |
| `chat.history` | operator | read | **Med** | Legacy/compat transcript path. |
| `chat.send` | operator | write | **Med** | Legacy/compat send path. |
| `chat.abort` | operator | write | **Med** | Legacy abort path. |
| `chat.inject` | operator | write | **Low** | System injection/testing. |

### 10) Device pairing + tokens
| Method | Role | Scope | Relevance | Notes |
|---|---|---|---|---|
| `device.pair.list` | operator | pairing/read | **Med** | Device management UI. |
| `device.pair.approve` / `device.pair.reject` / `device.pair.remove` | operator | pairing/admin | **Low** | Admin operations. |
| `device.token.rotate` | operator | pairing/admin | **Low** | Security lifecycle. |
| `device.token.revoke` | operator | pairing/admin | **Low** | Security lifecycle. |

### 11) Node pairing / invoke / pending work
| Method | Role | Scope | Relevance | Notes |
|---|---|---|---|---|
| `node.pair.request` / `node.pair.list` / `node.pair.reject` / `node.pair.verify` | operator/node | pairing | **Med** | Companion/node bootstrap. |
| `node.pair.approve` | operator | pairing (+write/admin conditionally) | **Med** | Conditional scope rules documented. |
| `node.list` / `node.describe` | operator | read | **Med** | Node status screens. |
| `node.rename` | operator | write | **Low** | Label management. |
| `node.invoke` | operator→node | write/admin (command dependent) | **High** | Core remote capability trigger. |
| `node.invoke.result` | operator | read | **High** | Invocation completion path. |
| `node.event` | node | node role auth | **Med** | Node-originated telemetry/events. |
| `node.canvas.capability.refresh` | operator/node | write | **Low** | Capability token maintenance. |
| `node.pending.pull` / `node.pending.ack` | node | node role | **Med** | Reliable queue drain for node. |
| `node.pending.enqueue` / `node.pending.drain` | operator | write/admin | **Low** | Offline work queue ops. |

### 12) Exec + plugin approvals
| Method | Role | Scope | Relevance | Notes |
|---|---|---|---|---|
| `exec.approval.request` / `exec.approval.get` / `exec.approval.list` | operator | approvals/read | **Low** | Human-in-loop safety flows. |
| `exec.approval.resolve` | operator | `operator.approvals` | **Low** | Explicitly documented. |
| `exec.approval.waitDecision` | operator | approvals | **Low** | Pending decision wait. |
| `exec.approvals.get` / `exec.approvals.set` | operator | admin (reserved prefix) | **Low** | Approval policy config. |
| `exec.approvals.node.get` / `exec.approvals.node.set` | operator | admin | **Low** | Node policy relay. |
| `plugin.approval.request` / `plugin.approval.list` / `plugin.approval.waitDecision` / `plugin.approval.resolve` | operator | approvals/plugin-defined | **Low** | Plugin-specific governance. |

### 13) Automation / cron
| Method | Role | Scope | Relevance | Notes |
|---|---|---|---|---|
| `wake` | operator | write | **Med** | Useful to trigger watch-side prompts. |
| `cron.list` / `cron.status` / `cron.runs` | operator | read | **Low** | Scheduler introspection. |
| `cron.add` / `cron.update` / `cron.remove` / `cron.run` | operator | write/admin | **Low** | Scheduler management. |

### 14) Skills / tools / commands
| Method | Role | Scope | Relevance | Notes |
|---|---|---|---|---|
| `commands.list` | operator | `operator.read` | **Med** | Command discovery for UI hints. |
| `tools.catalog` | operator | `operator.read` | **Med** | Tool inventory for feature gating. |
| `tools.effective` | operator | `operator.read` | **Med** | Session-effective tool set. |
| `skills.status` | operator | `operator.read` | **Low** | Skill health inventory. |
| `skills.search` / `skills.detail` | operator | `operator.read` | **Low** | Catalog browsing. |
| `skills.install` | operator | `operator.admin` | **Low** | Install action (admin). |
| `skills.bins` | node | node role | **Low** | Node helper for executable checks. |

## Event families to wire in Pebble client
Not RPC methods, but critical for UX stream handling:
- `chat`, `session.message`, `session.tool`, `sessions.changed`, `presence`, `tick`, `health`, `heartbeat`, `cron`, `shutdown`, pairing + approval lifecycle events.
For Pebble, prioritize: `session.message`, `sessions.changed`, `presence`, `health`, `tick`.

## What to implement first for PebbleClaw
1. **Must-have RPCs:** `connect`, `sessions.list`, `sessions.create`, `sessions.send`, `sessions.get`, `sessions.abort`, `models.list`, `node.invoke` (if you need node actions), `talk.speak` (if voice output matters).
2. **Must-have events:** `session.message`, `sessions.changed`, `tick`, `health`.
3. **Minimum scopes to request initially:** `operator.read`, `operator.write` (add others only as needed).

## Assumptions / unverified edges
- Some per-method scopes are inferred because docs provide family-level rules, not a strict ACL table for every method.
- Plugin-provided methods can add custom scopes beyond this matrix.
- `hello-ok.features.methods` is discovery-oriented, not a canonical exhaustive method registry.

## Sources
- Gateway protocol (method families, scopes, events, handshake): https://docs.openclaw.ai/gateway/protocol
- Gateway auth: https://docs.openclaw.ai/gateway/authentication
- Gateway discovery: https://docs.openclaw.ai/gateway/discovery
- Gateway Bonjour/DNS-SD: https://docs.openclaw.ai/gateway/bonjour
- Gateway health: https://docs.openclaw.ai/gateway/health
- Gateway CLI entry: https://docs.openclaw.ai/cli/gateway
