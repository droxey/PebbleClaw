#!/usr/bin/env bash
set -euo pipefail

CODEx_CACHE_ROOT="${CODEX_CACHE_ROOT:-$HOME/.codex-cache}"
UV_CACHE_DIR="${UV_CACHE_DIR:-$CODEx_CACHE_ROOT/uv}"
UV_TOOL_BIN_DIR="${UV_TOOL_BIN_DIR:-$HOME/.local/bin}"
XDG_CACHE_HOME="${XDG_CACHE_HOME:-$CODEx_CACHE_ROOT/xdg}"
ENV_FILE="${ENV_FILE:-$HOME/.codex-env}"

export DEBIAN_FRONTEND=noninteractive
export UV_CACHE_DIR UV_TOOL_BIN_DIR XDG_CACHE_HOME

mkdir -p "$CODEx_CACHE_ROOT" "$UV_CACHE_DIR" "$XDG_CACHE_HOME" "$UV_TOOL_BIN_DIR"

if command -v sudo >/dev/null 2>&1; then
  APT_PREFIX=(sudo)
else
  APT_PREFIX=()
fi

"${APT_PREFIX[@]}" apt-get install -y --fix-missing \
  libsdl2-2.0-0 \
  libglib2.0-0 \
  libpixman-1-0 \
  zlib1g \
  libsndio7.0

if ! command -v uv >/dev/null 2>&1; then
  wget -qO- https://astral.sh/uv/install.sh | sh
fi

export PATH="$UV_TOOL_BIN_DIR:$HOME/.local/bin:$PATH"
uv tool install pebble-tool --python 3.12 -v
ln -sf "$(command -v pebble-tool)" "$UV_TOOL_BIN_DIR/pebble"

pebble sdk install latest

cat > "$ENV_FILE" <<EOT
export CODEX_CACHE_ROOT="$CODEx_CACHE_ROOT"
export UV_CACHE_DIR="$UV_CACHE_DIR"
export XDG_CACHE_HOME="$XDG_CACHE_HOME"
export UV_TOOL_BIN_DIR="$UV_TOOL_BIN_DIR"
export PATH="$UV_TOOL_BIN_DIR:$HOME/.local/bin:\$PATH"
EOT

printf 'Wrote %s\n' "$ENV_FILE"
printf 'To enable in Codex shells, set shell init command to: source %s\n' "$ENV_FILE"

cd /workspace/PebbleClaw
git status --short
