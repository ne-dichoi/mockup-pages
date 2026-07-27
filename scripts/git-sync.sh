#!/usr/bin/env bash
# 목적: 저장소를 원격 main의 최신 상태로 안전하게 맞춘다(ff-only 전용).
# 마커(마지막 줄): OK / BLOCKED_DIRTY / BLOCKED_DIVERGED / ERROR
# 안전: force push, reset --hard, stash, 수동 merge를 절대 사용하지 않는다.
set -euo pipefail

fail() { echo "$1"; echo "ERROR"; exit 1; }

# 1. main 브랜치 보장
current="$(git symbolic-ref --quiet --short HEAD || echo '')"
if [ "$current" != "main" ]; then
  if ! out="$(git checkout main 2>&1)"; then
    echo "$out"
    if echo "$out" | grep -qi 'would be overwritten\|local changes'; then
      echo "저장하지 않은 변경 때문에 main으로 이동할 수 없습니다."
      echo "BLOCKED_DIRTY"; exit 4
    fi
    echo "main 브랜치로 이동하지 못했습니다."
    echo "ERROR"; exit 1
  fi
fi

# 2. 원격 최신 정보 가져오기
git fetch origin main 2>&1 || fail "원격(origin/main)에서 정보를 가져오지 못했습니다."

# 3. 로컬-원격 관계 판정
if git merge-base --is-ancestor origin/main HEAD; then
  # 원격이 HEAD의 조상 = 로컬이 같거나 앞섬
  if [ "$(git rev-parse HEAD)" = "$(git rev-parse origin/main)" ]; then
    echo "이미 최신 상태입니다."
    echo "OK"; exit 0
  fi
  # 로컬에만 커밋이 있음 → 올리기 필요
  echo "로컬에 아직 올리지 않은 커밋이 있습니다. 먼저 '올리기(publish)'가 필요합니다."
  echo "BLOCKED_DIVERGED"; exit 5
fi

if git merge-base --is-ancestor HEAD origin/main; then
  # HEAD가 원격의 조상 = 패스트포워드 가능(behind)
  before="$(git rev-parse HEAD)"
  git pull --ff-only origin main 2>&1 || fail "최신 내용을 받아오지 못했습니다."
  echo "받은 커밋:"
  git log --oneline "$before"..HEAD 2>/dev/null | head -10 || true
  echo "최신 내용을 받았습니다."
  echo "OK"; exit 0
fi

# 둘 다 아니면 로컬과 원격이 갈라짐(diverged)
echo "로컬과 원격이 갈라졌습니다(양쪽에 서로 다른 커밋 존재). 임의 병합은 하지 않습니다."
echo "BLOCKED_DIVERGED"; exit 5
