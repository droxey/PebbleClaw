import test from 'node:test';
import assert from 'node:assert/strict';
import { access, readFile } from 'node:fs/promises';
import { constants } from 'node:fs';
import { resolve } from 'node:path';

const scriptPath = resolve('scripts/setup-codex-env.sh');

test('codex setup script exists and is executable', async () => {
  await access(scriptPath, constants.F_OK | constants.X_OK);
});

test('codex setup script pins required commands and cache env', async () => {
  const content = await readFile(scriptPath, 'utf8');
  assert.match(content, /apt-get install -y --fix-missing[\s\S]*libsdl2-2\.0-0/);
  assert.match(content, /wget -qO- https:\/\/astral\.sh\/uv\/install\.sh \| sh/);
  assert.match(content, /uv tool install pebble-tool --python 3\.12 -v/);
  assert.match(content, /pebble sdk install latest/);
  assert.match(content, /UV_TOOL_BIN_DIR/);
  assert.match(content, /XDG_CACHE_HOME/);
});

test('codex setup script creates pebble shim from pebble-tool', async () => {
  const content = await readFile(scriptPath, 'utf8');
  assert.match(content, /ln -sf "\$\(command -v pebble-tool\)" "\$UV_TOOL_BIN_DIR\/pebble"/);
});
