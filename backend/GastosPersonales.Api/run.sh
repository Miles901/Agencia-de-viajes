#!/usr/bin/env bash
set -euo pipefail

export DOTNET_ROOT="${DOTNET_ROOT:-$HOME/.dotnet}"
export PATH="$PATH:$DOTNET_ROOT:$DOTNET_ROOT/tools"

cd "$(dirname "$0")"

if [[ ! -f appsettings.Development.json ]]; then
  echo "Copia appsettings.Development.json.example y pon tu contraseña de SQL Server:"
  echo "  cp appsettings.Development.json.example appsettings.Development.json"
  exit 1
fi

dotnet run "$@"
