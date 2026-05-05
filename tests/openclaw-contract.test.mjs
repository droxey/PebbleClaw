import test from 'node:test';
import assert from 'node:assert/strict';
import { parseGatewayDescriptor, validateGatewayEvent } from '../src/embeddedjs/lib/openclaw.js';

test('parseGatewayDescriptor parses host and port', () => {
  const parsed = parseGatewayDescriptor('10.0.0.2:443');
  assert.equal(parsed.host, '10.0.0.2');
  assert.equal(parsed.port, 443);
});

test('parseGatewayDescriptor rejects invalid descriptor', () => {
  assert.throws(() => parseGatewayDescriptor('bad'), /Invalid gateway descriptor/);
});

test('validateGatewayEvent accepts connect', () => {
  const event = { type: 'connect', requestId: 'abc' };
  assert.equal(validateGatewayEvent(event), true);
});

test('validateGatewayEvent rejects unknown type', () => {
  assert.throws(() => validateGatewayEvent({ type: 'x', requestId: '1' }), /Unsupported event type/);
});
