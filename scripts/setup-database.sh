#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
API_DIR="$ROOT_DIR/backend/GastosPersonales.Api"

export DOTNET_ROOT="${DOTNET_ROOT:-$HOME/.dotnet}"
export PATH="$PATH:$DOTNET_ROOT:$DOTNET_ROOT/tools"

cd "$API_DIR"

echo "==> Creando base de datos y tablas con Entity Framework..."
dotnet ef database update

echo ""
echo "Listo. Base de datos 'GastosPersonales' creada/actualizada."
echo "Ahora puedes iniciar la API con: ./run.sh"
