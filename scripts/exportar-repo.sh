#!/usr/bin/env bash
set -eu
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
DEST="${1:-$ROOT/../mis-gastos-personales}"
echo "Exportando a: $DEST"
rm -rf "$DEST"
mkdir -p "$DEST"
copy_tree() {
  src="$1"
  name="$(basename "$src")"
  mkdir -p "$DEST/$name"
  tar -C "$src" --exclude=node_modules --exclude=bin --exclude=obj --exclude=dist --exclude=.expo --exclude=.env --exclude=appsettings.Development.json -cf - . | tar -C "$DEST/$name" -xf -
}
for item in backend gastos-personales mobile scripts docs; do
  copy_tree "$ROOT/$item"
done
cp "$ROOT/docker-compose.yml" "$ROOT/GastosPersonales.sln" "$ROOT/README.md" "$ROOT/.gitignore" "$DEST/"
cp "$ROOT/mis-gastos-personales/EXPORTAR.md" "$DEST/" 2>/dev/null || true
echo "Listo: $DEST"
