#!/usr/bin/env bash
# 목적: 작업한 변경을 안전하게 원격 main에 올린다(동기화-선행, 자동 병합 없음).
# 순서: main 보장 → 원격 최신화(ff-only) → add → commit(메시지 자동) → push
# 마커(마지막 줄): OK / NOCHANGE / BLOCKED_DIRTY / BLOCKED_DIVERGED / BLOCKED_REMOTE_UPDATED / ERROR
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

# 2. 원격 최신 정보
git fetch origin main 2>&1 || fail "원격(origin/main)에서 정보를 가져오지 못했습니다."

# 3. 커밋 전에 원격 최신화 (behind면 ff-only, diverged면 중단)
if ! git merge-base --is-ancestor origin/main HEAD; then
  # origin/main이 HEAD의 조상이 아님 → 받아올 게 있음
  if git merge-base --is-ancestor HEAD origin/main; then
    git pull --ff-only origin main 2>&1 || fail "최신 내용을 받아오지 못했습니다."
  else
    echo "로컬과 원격이 갈라졌습니다. 임의 병합은 하지 않습니다. 담당자에게 문의하세요."
    echo "BLOCKED_DIVERGED"; exit 5
  fi
fi

# 4. 스테이징
git add -A

# 5. 올릴 변경이 있는지
if git diff --cached --quiet; then
  echo "올릴 변경이 없습니다."
  echo "NOCHANGE"; exit 0
fi

# 6. 커밋 메시지 자동 생성 (한글·공백 안전: NUL 구분 + quotepath 해제)
folders=()
while IFS= read -r -d '' path; do
  case "$path" in
    mockups/*/*)
      f="${path#mockups/}"; f="${f%%/*}"
      dup=0; for e in "${folders[@]:-}"; do [ "$e" = "$f" ] && dup=1 && break; done
      [ "$dup" -eq 0 ] && folders+=("$f")
      ;;
  esac
done < <(git -c core.quotepath=false diff --cached --name-only -z)

if [ "${#folders[@]}" -gt 0 ]; then
  joined=""
  for f in "${folders[@]}"; do
    [ -n "$joined" ] && joined="$joined, "
    joined="$joined$f"
  done
  msg="목업 추가/수정: ${joined}"
else
  msg="내용 수정"
fi

# 7. 커밋
if ! out="$(git commit -m "$msg" 2>&1)"; then
  echo "$out"
  fail "커밋에 실패했습니다(예: git 사용자 정보 미설정, 훅 실패)."
fi
echo "커밋: $msg"

# 8. 푸시 (거부되면 자동 병합하지 않음)
if ! out="$(git push origin main 2>&1)"; then
  echo "$out"
  if echo "$out" | grep -qi 'rejected\|fetch first\|non-fast-forward'; then
    echo "올리는 사이 다른 사람이 먼저 올렸습니다. '최신받기(sync)' 후 다시 올려주세요."
    echo "BLOCKED_REMOTE_UPDATED"; exit 6
  fi
  fail "푸시에 실패했습니다."
fi

echo "올렸습니다. 1~2분 뒤 https://ne-dichoi.github.io/mockup-pages/ 에 자동 반영됩니다."
echo "OK"; exit 0
