#!/usr/bin/env bash
set -euo pipefail

SOURCE_DIR="$HOME/projects/rungle/ios/Rungle/Resources/Fonts"
PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
OUTPUT_DIR="$PROJECT_ROOT/public/fonts"
UNICODES='U+0020-007E,U+00A0-00FF,U+2018-201D,U+2026,U+AC00-D7A3'
FONT_NAMES=(
  NotoSansKR-Regular
  NotoSansKR-SemiBold
  BodoniModa-MediumItalic
  Anton-Regular
)
OG_FONT_NAMES=(
  NotoSansKR-SemiBold
  BodoniModa-MediumItalic
  Anton-Regular
)

command -v uv >/dev/null
for name in "${FONT_NAMES[@]}"; do
  if [[ ! -f "$SOURCE_DIR/$name.ttf" ]]; then
    printf '원본 폰트가 없습니다: %s\n' "$SOURCE_DIR/$name.ttf" >&2
    exit 1
  fi
done
mkdir -p "$OUTPUT_DIR"

for name in "${FONT_NAMES[@]}"; do
  uv tool run --from 'fonttools[woff]' pyftsubset "$SOURCE_DIR/$name.ttf" \
    --unicodes="$UNICODES" \
    --layout-features='*' \
    --flavor=woff2 \
    --output-file="$OUTPUT_DIR/$name.woff2"
done

for name in "${OG_FONT_NAMES[@]}"; do
  uv tool run --from 'fonttools[woff]' pyftsubset "$SOURCE_DIR/$name.ttf" \
    --unicodes="$UNICODES" \
    --layout-features='*' \
    --output-file="$OUTPUT_DIR/$name.ttf"
done

printf '\n서브셋 산출 크기 (bytes)\n'
for name in "${FONT_NAMES[@]}"; do
  test -s "$OUTPUT_DIR/$name.woff2"
  wc -c "$OUTPUT_DIR/$name.woff2"
done
for name in "${OG_FONT_NAMES[@]}"; do
  test -s "$OUTPUT_DIR/$name.ttf"
  wc -c "$OUTPUT_DIR/$name.ttf"
done
