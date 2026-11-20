#!/usr/bin/env bash
# Encodes a plugin's short film for the web and drops it where /plugins picks
# it up. Encoding IS the wiring: src/plugins-hub.js globs src/assets/video/
# and a card switches from its screenshot to the video as soon as all four
# files for a language exist (16:9 + 4:5 MP4, each with its poster).
#
# Usage:
#   scripts/encode-plugin-video.sh <name> <source-dir> [es|en ...]
#   scripts/encode-plugin-video.sh containers ../marketing/video-containers
#   scripts/encode-plugin-video.sh trace ../marketing/video-trace en
#
# <name> is the file prefix: warehouse | containers | trace.
# Sources, per language (the first one found wins; originals are never touched):
#   16:9  <name>-short-<lang>-musica.mp4  |  <name>-short-<lang>.mp4
#   4:5   <name>-short-<lang>-4x5-musica.mp4  |  <name>-short-<lang>-4x5.mp4
#   posters <name>-short-<lang>.jpg, <name>-short-<lang>-4x5.jpg (a frame at
#           3.2 s is taken if missing)
#   captions <name>-short-<lang>.vtt (optional; copied as is)
# Output (src/assets/video/):
#   <name>-short-<lang>-16x9.mp4  1280 wide   H.264 High + AAC 96k, faststart
#   <name>-short-<lang>-4x5.mp4   720 wide
#   <name>-short-<lang>-{16x9,4x5}.jpg, <name>-short-<lang>.vtt
#   <name>-short.json  {"duration": seconds}  (used for the "0:34" label)
set -euo pipefail

name="${1:?name (warehouse|containers|trace)}"
src="${2:?source directory}"
shift 2
if [ $# -gt 0 ]; then langs=("$@"); else langs=(es en); fi

here="$(cd "$(dirname "$0")/.." && pwd)"
out="$here/src/assets/video"
mkdir -p "$out"

pick() { for f in "$@"; do [ -f "$f" ] && { echo "$f"; return 0; }; done; return 1; }

encode() { # in out width maxrate-kbps
  ffmpeg -y -v error -i "$1" -vf "scale=$3:-2:flags=lanczos" \
    -c:v libx264 -profile:v high -preset slow -crf 23 -maxrate "${4}k" -bufsize "$(( $4 * 2 ))k" \
    -pix_fmt yuv420p -c:a aac -b:a 96k -ac 2 -movflags +faststart "$2"
}

poster() { # poster-src video-src out width
  if [ -f "$1" ]; then ffmpeg -y -v error -i "$1" -vf "scale=$4:-2" -q:v 5 "$3"
  else ffmpeg -y -v error -ss 3.2 -i "$2" -frames:v 1 -vf "scale=$4:-2" -q:v 5 "$3"; fi
}

duration=""
for lang in "${langs[@]}"; do
  base="$src/$name-short-$lang"
  wide=$(pick "$base-musica.mp4" "$base.mp4") || { echo "skip $lang: no 16:9 source in $src" >&2; continue; }
  tall=$(pick "$base-4x5-musica.mp4" "$base-4x5.mp4") || { echo "skip $lang: no 4:5 source in $src" >&2; continue; }
  o="$out/$name-short-$lang"
  echo "$lang: $(basename "$wide") + $(basename "$tall")"
  encode "$wide" "$o-16x9.mp4" 1280 1100
  encode "$tall" "$o-4x5.mp4" 720 1000
  poster "$base.jpg" "$wide" "$o-16x9.jpg" 1280
  poster "$base-4x5.jpg" "$tall" "$o-4x5.jpg" 720
  [ -f "$base.vtt" ] && cp "$base.vtt" "$o.vtt"
  duration=$(ffprobe -v error -show_entries format=duration -of csv=p=0 "$o-16x9.mp4")
  ls -lh "$o"-16x9.* "$o"-4x5.* | awk '{print "  " $5 "  " $NF}'
done

if [ -n "$duration" ]; then
  printf '{ "duration": %.1f }\n' "$duration" > "$out/$name-short.json"
fi
