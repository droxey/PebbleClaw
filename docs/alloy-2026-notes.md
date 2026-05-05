# Alloy 2026 Notes (Reviewed)

Reviewed Alloy guide pages:
- Getting Started
- Piu UI Framework
- Poco Graphics
- Sensors and Input
- Storage
- Networking
- App Messages
- Watchfaces
- Animations
- Port (Custom Drawing)
- Advanced Networking

## Key decisions for PebbleClaw
1. Use split-runtime model:
   - watch logic in `src/embeddedjs/main.js`
   - phone proxy wiring in `src/pkjs/index.js`
2. Default platform: `gabbro` (Pebble Round 2), also support `emery`.
3. Network requests should wait for PebbleKit proxy readiness.
4. Use App Messages for watch/phone command envelopes.
