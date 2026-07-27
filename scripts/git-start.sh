#!/usr/bin/env bash
# 목적: 새 작업을 시작할 때 최신 main에서 새 work 브랜치를 만든다.
# 사용: bash scripts/git-start.sh "<작업 이름/슬러그>"
# 마커(마지막 줄): START_OK / BLOCKED_DIRTY / BLOCKED_DIVERGED / ERROR
# 안전: force push, reset --hard, stash 미사용.
set -euo pipefail

fail() { echo "$1"; echo "ERROR"; exit 1; }

raw_slug="${1:-}"

# 1. 워킹트리 클린 확인 (진행 중인 작업 보호)
if [ -n "$(git status --porcelain)" ]; then
  echo "저장하지 않은 변경이 있습니다. 새 작업을 시작하기 전에 먼저 '올리기(publish)'로 반영하거나 정리해 주세요."
  echo "BLOCKED_DIRTY"; exit 4
fi

# 2. main 보장 + 최신화
current="$(git symbolic-ref --quiet --short HEAD || echo '')"
if [ "$current" != "main" ]; then
  git checkout main 2>&1 || fail "main 브랜치로 이동하지 못했습니다."
fi
git fetch origin main 2>&1 || fail "원격(origin/main)에서 정보를 가져오지 못했습니다."
if git merge-base --is-ancestor HEAD origin/main; then
  git pull --ff-only origin main 2>&1 || fail "최신 내용을 받아오지 못했습니다."
elif ! git merge-base --is-ancestor origin/main HEAD; then
  echo "로컬 main과 원격이 갈라졌습니다. 담당 개발자에게 문의하세요."
  echo "BLOCKED_DIVERGED"; exit 5
fi

# 3. 슬러그 정규화: 소문자화, 공백→-, 허용(영숫자/한글/._-) 외 제거, 중복 - 축약, 앞뒤 -/. 제거
slug="$(printf '%s' "$raw_slug" \
  | tr '[:upper:]' '[:lower:]' \
  | tr ' ' '-' \
  | sed -E 's/[^a-z0-9가-힣._-]//g; s/-+/-/g; s/^[-.]+//; s/[-.]+$//')"
[ -z "$slug" ] && slug="work"

stamp="$(date +%m%d-%H%M)"
branch="work/${slug}-${stamp}"
# 이름 충돌 시 접미 증가
n=2
while git show-ref --verify --quiet "refs/heads/${branch}"; do
  branch="work/${slug}-${stamp}-${n}"; n=$((n+1))
done

# 4. 브랜치 생성
git checkout -b "$branch" 2>&1 || fail "작업 브랜치를 만들지 못했습니다."
echo "작업 브랜치를 만들었습니다: ${branch}"
echo "이제 목업을 만들거나 수정한 뒤 '올리기(publish)'를 실행하세요."
echo "START_OK"
