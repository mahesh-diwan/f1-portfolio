#!/usr/bin/env bash
set -uo pipefail

OUTPUT="src/data/github-repos.json"

CACHED_FORKED="src/data/github-repos-cached.json"
CACHED_OWN="src/data/github-own-repos-cached.json"
if [ -f "$CACHED_FORKED" ] && [ -f "$CACHED_OWN" ] && [ -s "$CACHED_FORKED" ] && [ -s "$CACHED_OWN" ]; then
  cp "$CACHED_FORKED" "$OUTPUT"
  cp "$CACHED_OWN" "src/data/github-own-repos.json"
  echo "fetch-repos: using cached repo data"
  exit 0
fi

mkdir -p "$(dirname "$OUTPUT")"

DATA=$(curl -sf "https://api.github.com/users/mahesh-diwan/repos?per_page=50&sort=updated" 2>/dev/null)

if [ -z "$DATA" ]; then
  echo '[]' > "$OUTPUT"
  echo '[]' > "src/data/github-own-repos.json"
  echo "fetch-repos: GitHub API unreachable, wrote empty repo lists"
  exit 0
fi

echo "$DATA" | jq '[.[] | select(.fork == true) | select(.name != "f1-portfolio") | select(.description != null or .stargazers_count > 0) | {name: .name, description: .description, language: .language, stars: .stargazers_count, forks: .forks_count, updated_at: .updated_at, url: .html_url, topics: .topics}] | sort_by(.stars, .updated_at) | reverse' > "$OUTPUT"

echo "$DATA" | jq '[.[] | select(.fork == false) | select(.name != "f1-portfolio") | select(.description != null or .stargazers_count > 0) | {name: .name, description: .description, language: .language, stars: .stargazers_count, forks: .forks_count, updated_at: .updated_at, url: .html_url, topics: .topics}] | sort_by(.stars, .updated_at) | reverse' > "src/data/github-own-repos.json"

echo "Wrote $OUTPUT and src/data/github-own-repos.json"
