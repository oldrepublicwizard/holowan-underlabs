#!/usr/bin/env bash
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)/site"
PORT="${PORT:-0}"
if [[ "$PORT" == "0" ]]; then
  PORT=$(python3 -c 'import socket; s=socket.socket(); s.bind(("127.0.0.1",0)); print(s.getsockname()[1]); s.close()')
fi
BASE="http://127.0.0.1:${PORT}"

python3 -m http.server "$PORT" --bind 127.0.0.1 --directory "$ROOT" &
PID=$!
trap 'kill $PID 2>/dev/null || true' EXIT
sleep 0.5

fail=0
for p in index.html play.html projects.html tools.html downloads.html specs.html contact.html legal.html mirrors.html 404.html; do
  code=$(curl -sI -o /dev/null -w '%{http_code}' "$BASE/$p")
  echo "$code $p"
  [[ "$code" == "200" ]] || fail=1
done

for u in \
  "https://play.swkotor.net/game/?key=kotor" \
  "https://play.swkotor.net/game/?key=tsl" \
  "https://play.swkotor.net/forge/" \
  "https://play.swkotor.net/launcher/" \
  "https://github.com/oldrepublicwizard/community-bots" \
  "https://github.com/oldrepublicwizard/pazaak-world" \
  "https://oldrepublicwizard.github.io/pazaak-world/" \
  "https://github.com/oldrepublicwizard/PyKotor" \
  "https://github.com/oldrepublicwizard/holowan-underlabs"
do
  code=$(curl -sI -L -o /dev/null -w '%{http_code}' --max-time 12 "$u" || echo ERR)
  echo "$code $u"
  [[ "$code" == 2* || "$code" == 3* ]] || fail=1
done

# Toolchain download tags must still ship binaries (empty tags = brochure lie).
if ! python3 "$(cd "$(dirname "$0")" && pwd)/verify_site.py" --check-release-assets; then
  echo "FAIL: release-asset integrity"
  fail=1
else
  echo "OK release-asset integrity"
fi

# Banned public brands + competitor website hosts (see DESIGN.md / verify_site.py).
if grep -RniE 'kotor\.js|kotorjs|kotor-js|reone|openkotor|borealis|kobaltblu|seedhartha|openkotor\.com|openkotor\.github\.io' "$ROOT" \
  --include='*.html' --include='*.js' --include='*.css' --include='*.txt' --include='*.xml' >/dev/null 2>&1; then
  echo "FAIL: banned brand token found in site/"
  fail=1
else
  echo "OK brand scrub"
fi

exit $fail
