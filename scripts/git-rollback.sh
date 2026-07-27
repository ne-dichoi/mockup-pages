#!/usr/bin/env bash
# 목적: 이전에 올린 변경(병합 커밋)을 안전하게 되돌린다(git revert 기반).
# 사용: bash scripts/git-rollback.sh --list        # 최근 올리기 목록
#       bash scripts/git-rollback.sh <커밋해시>     # 해당 올리기 되돌리기
# 마커(마지막 줄): LIST_OK / ROLLBACK_OK / NOCHANGE / BLOCKED_CONFLICT / BLOCKED_REMOTE_UPDATED / ERROR
# 안전: force push, reset --hard, stash 미사용. main은 origin에서 ff로만 갱신.
set -euo pipefail

fail() { echo "$1"; echo "ERROR"; exit 1; }

ERR="$(mktemp)"; trap 'rm -f "$ERR"' EXIT

arg="${1:---list}"

# main 보장 + 최신화(ff)
current="$(git symbolic-ref --quiet --short HEAD || echo '')"
if [ "$current" != "main" ]; then
  git checkout main >/dev/null 2>&1 || fail "main 브랜치로 이동하지 못했습니다."
fi
git fetch origin main >/dev/null 2>&1 || fail "원격(origin/main)에서 정보를 가져오지 못했습니다."
git show-ref --verify --quiet refs/remotes/origin/main || fail "원격 main(origin/main)을 찾을 수 없습니다."
if git merge-base --is-ancestor HEAD origin/main; then
  git merge --ff-only origin/main >/dev/null 2>&1 || fail "로컬 main을 최신으로 맞추지 못했습니다."
elif ! git merge-base --is-ancestor origin/main HEAD; then
  fail "로컬 main과 원격이 갈라졌습니다. 담당 개발자에게 문의하세요."
fi

# ── 목록 모드 ── (되돌리기 커밋 자체는 후보에서 제외)
if [ "$arg" = "--list" ]; then
  echo "최근 올리기(되돌릴 수 있는 항목):"
  i=1
  while IFS='|' read -r h d s; do
    [ -z "$h" ] && continue
    case "$s" in 되돌리기:*) continue ;; esac
    printf "  %d) %s  %s  %s\n" "$i" "$h" "$d" "$s"
    i=$((i+1))
  done < <(git -c core.quotepath=false log origin/main --merges --first-parent -n 15 --pretty='%h|%cs|%s')
  [ "$i" -eq 1 ] && echo "  (되돌릴 올리기 내역이 없습니다.)"
  echo "되돌리려면 위 해시 중 하나로 다시 실행하세요."
  echo "LIST_OK"; exit 0
fi

# ── 되돌리기 모드 ──
target="$arg"
git rev-parse --verify --quiet "${target}^{commit}" >/dev/null || fail "해당 커밋($target)을 찾을 수 없습니다."
full="$(git rev-parse "${target}^{commit}")"
git merge-base --is-ancestor "$full" origin/main || fail "그 커밋은 현재 main 이력에 없습니다. 목록(--list)에서 다시 골라주세요."

orig_msg="$(git log -1 --pretty=%s "$full")"
# 부모 수 = (rev-list --parents 출력 단어수) - 1
words="$(git rev-list --parents -n 1 "$full" | wc -w | tr -d ' ')"
nparents=$((words - 1))
if [ "$nparents" -gt 2 ]; then
  fail "여러 갈래를 한 번에 합친 커밋이라 자동 되돌리기를 지원하지 않습니다. 담당 개발자에게 문의하세요."
fi

stamp="$(date +%m%d-%H%M)"
rb="revert-${stamp}"
n=2; while git show-ref --verify --quiet "refs/heads/${rb}"; do rb="revert-${stamp}-${n}"; n=$((n+1)); done
git checkout -b "$rb" >/dev/null 2>&1 || fail "되돌리기 브랜치를 만들지 못했습니다."

cleanup_branch() { git checkout main >/dev/null 2>&1 || true; git branch -D "$rb" >/dev/null 2>&1 || true; }

# 병합 커밋(부모 2개)이면 -m 1, 일반 커밋이면 그대로 revert
if [ "$nparents" -eq 2 ]; then
  ok=0; git revert -m 1 --no-edit "$full" >/dev/null 2>"$ERR" && ok=1 || true
else
  ok=0; git revert --no-edit "$full" >/dev/null 2>"$ERR" && ok=1 || true
fi
if [ "$ok" -ne 1 ]; then
  conflicts="$(git -c core.quotepath=false diff --name-only --diff-filter=U 2>/dev/null | tr '\n' ' ')"
  git revert --abort >/dev/null 2>&1 || true
  if [ -n "${conflicts// /}" ]; then
    cleanup_branch
    echo "되돌리는 중 충돌이 발생했습니다: ${conflicts}"
    echo "임의로 해결하지 않고 중단했습니다. 담당 개발자에게 문의하세요."
    echo "BLOCKED_CONFLICT"; exit 7
  fi
  # 충돌 파일이 없는 revert 실패 = 적용할 변경이 없음(대개 이미 되돌린 커밋)
  cleanup_branch
  echo "되돌릴 변경이 없습니다(이미 되돌렸을 수 있습니다)."
  echo "NOCHANGE"; exit 0
fi

# 통합·푸시 루프(최대 3회). 매 시도는 revert 브랜치에서 시작.
attempt=1; max=3
while [ "$attempt" -le "$max" ]; do
  git fetch origin main >/dev/null 2>&1 || fail "원격에서 정보를 가져오지 못했습니다."
  git checkout "$rb" >/dev/null 2>&1 || fail "되돌리기 브랜치로 이동하지 못했습니다."
  git branch -f main origin/main
  git checkout main >/dev/null 2>&1 || fail "main으로 이동하지 못했습니다."
  if ! git merge --no-ff -m "되돌리기: ${orig_msg}" "$rb" >/dev/null 2>"$ERR"; then
    git merge --abort >/dev/null 2>&1 || { git checkout "$rb" >/dev/null 2>&1 || true; fail "병합 상태가 비정상입니다. 담당 개발자에게 문의하세요."; }
    git checkout "$rb" >/dev/null 2>&1 || true
    echo "되돌리기 병합 중 충돌이 발생했습니다. 담당 개발자에게 문의하세요."
    echo "BLOCKED_CONFLICT"; exit 7
  fi
  if git push origin main >/dev/null 2>"$ERR"; then
    git checkout main >/dev/null 2>&1 || true
    git branch -d "$rb" >/dev/null 2>&1 || true
    echo "되돌렸습니다: ${orig_msg}"
    echo "1~2분 뒤 https://ne-dichoi.github.io/mockup-pages/ 에 반영됩니다."
    echo "ROLLBACK_OK"; exit 0
  fi
  # push 실패: race(non-fast-forward)면 재시도, 그 외(인증/네트워크 등)는 즉시 중단
  if ! grep -qi 'rejected\|fetch first\|non-fast-forward' "$ERR"; then
    git checkout "$rb" >/dev/null 2>&1 || true
    echo "$(cat "$ERR")"; fail "푸시에 실패했습니다."
  fi
  attempt=$((attempt+1))
done

git checkout "$rb" >/dev/null 2>&1 || true
echo "되돌리는 사이 다른 사람이 계속 먼저 올렸습니다. 잠시 후 다시 시도해 주세요."
echo "BLOCKED_REMOTE_UPDATED"; exit 6
