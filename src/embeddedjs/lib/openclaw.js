export function parseGatewayDescriptor(input) {
  const match = /^(?<host>[^:]+):(?<port>\d+)$/.exec(input);
  if (!match || !match.groups) {
    throw new Error('Invalid gateway descriptor');
  }

  const port = Number(match.groups.port);
  if (!Number.isInteger(port) || port < 1 || port > 65535) {
    throw new Error('Invalid gateway descriptor');
  }

  return { host: match.groups.host, port };
}

export function validateGatewayEvent(event) {
  const allowed = new Set(['connect', 'disconnect', 'status', 'command']);
  if (!event || typeof event !== 'object') throw new Error('Invalid event');
  if (!allowed.has(event.type)) throw new Error('Unsupported event type');
  if (typeof event.requestId !== 'string' || event.requestId.length === 0) {
    throw new Error('Invalid requestId');
  }
  return true;
}
