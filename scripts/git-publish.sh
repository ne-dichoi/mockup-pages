#!/usr/bin/env bash
# 목적: work 브랜치의 작업을 main에 안전하게 병합·배포한다(자동 병합).
# 가드: main에서 만든 변경의 "직접 push"는 허용하지 않는다(자동으로 브랜치로 이동).
# 로컬 main은 매 시도마다 origin/main에서 새로 만드는 "일회용 통합 브랜치"로 취급한다.
# 마커(마지막 줄): OK / NOCHANGE / BLOCKED_CONFLICT / BLOCKED_REMOTE_UPDATED / BLOCKED_DIRTY / ERROR
# 안전: force push, reset --hard, stash 미사용. 브랜치→main은 merge --no-ff, 충돌 시 abort.
set -euo pipefail

fail() { echo "$1"; echo "ERROR"; exit 1; }

# 커밋 메시지 자동 생성 (한글·공백 안전: NUL 구분 + quotepath 해제)
build_message() {
  local folders=() joined="" f e dup path
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
    for f in "${folders[@]}"; do [ -n "$joined" ] && joined="$joined, "; joined="$joined$f"; done
    echo "목업 추가/수정: ${joined}"
  else
    echo "내용 수정"
  fi
}

# origin/main 확보
git fetch origin main 2>&1 >/dev/null || fail "원격(origin/main)에서 정보를 가져오지 못했습니다."
git show-ref --verify --quiet refs/remotes/origin/main || fail "원격 main(origin/main)을 찾을 수 없습니다."

branch="$(git symbolic-ref --quiet --short HEAD || echo '')"
[ -z "$branch" ] && fail "지금 특정 브랜치에 있지 않습니다(detached HEAD). 담당 개발자에게 문의하세요."

# ── (B) main에서 실행: 직접 push 금지 가드 → 자동 브랜치 이동 ──
if [ "$branch" = "main" ]; then
  ahead=0
  git merge-base --is-ancestor origin/main HEAD && \
    [ "$(git rev-parse HEAD)" != "$(git rev-parse origin/main)" ] && ahead=1
  if [ -z "$(git status --porcelain)" ] && [ "$ahead" -eq 0 ]; then
    echo "올릴 변경이 없습니다."
    echo "NOCHANGE"; exit 0
  fi
  # 변경된 mockups/<폴더>를 감지해 브랜치명에 사용(없으면 edit)
  base="$( { git -c core.quotepath=false status --porcelain | sed -E 's/^...//'; git -c core.quotepath=false diff --name-only origin/main..HEAD 2>/dev/null; } \
    | sed -n -E 's|^mockups/([^/]+)/.*|\1|p' | head -1 \
    | tr '[:upper:]' '[:lower:]' | tr ' ' '-' | sed -E 's/[^a-z0-9가-힣._-]//g; s/-+/-/g; s/^[-.]+//; s/[-.]+$//')"
  [ -z "$base" ] && base="edit"
  auto="${base}-$(date +%m%d-%H%M)"
  n=2; while git show-ref --verify --quiet "refs/heads/${auto}"; do auto="${base}-$(date +%m%d-%H%M)-${n}"; n=$((n+1)); done
  git checkout -b "$auto" 2>&1 || fail "작업 브랜치로 이동하지 못했습니다."
  git branch -f main origin/main
  echo "main에서 작업이 감지되어 자동으로 브랜치(${auto})로 옮겨 처리합니다. 다음부터 '작업 시작(start)'을 먼저 쓰세요."
  branch="$auto"
fi

# ── (A) 작업 브랜치 표준 경로 (main이 아니면 작업 브랜치로 취급) ──
[ "$branch" = "main" ] && fail "예상치 못한 상태입니다(main). 담당 개발자에게 문의하세요."

# 작업 브랜치가 main 계열에서 갈라진 게 맞는지 확인
git merge-base origin/main "$branch" >/dev/null 2>&1 || fail "이 브랜치는 main에서 시작한 작업 브랜치가 아닙니다. '작업 시작(start)'으로 브랜치를 먼저 만들어 주세요."

# 1. 스테이징
git add -A

# 2. 올릴 게 있는지: 스테이징 변경 없고 origin/main 대비 앞선 커밋도 없으면 NOCHANGE
if git diff --cached --quiet && git merge-base --is-ancestor "$branch" origin/main; then
  echo "올릴 변경이 없습니다."
  echo "NOCHANGE"; exit 0
fi

# 3. 변경이 있으면 work 브랜치에 커밋
if ! git diff --cached --quiet; then
  msg="$(build_message)"
  if ! out="$(git commit -m "$msg" 2>&1)"; then
    echo "$out"; fail "커밋에 실패했습니다(예: git 사용자 정보 미설정, 훅 실패)."
  fi
  echo "커밋: $msg"
else
  msg="$(git log -1 --pretty=%s "$branch")"
fi

# 4. 통합·푸시 루프 (최대 3회). 매 시도는 work 브랜치에서 시작.
attempt=1; max=3
while [ "$attempt" -le "$max" ]; do
  git fetch origin main 2>&1 >/dev/null || fail "원격에서 정보를 가져오지 못했습니다."
  git checkout "$branch" 2>&1 >/dev/null || fail "작업 브랜치로 이동하지 못했습니다."
  git branch -f main origin/main
  git checkout main 2>&1 >/dev/null || fail "main으로 이동하지 못했습니다."

  if ! git merge --no-ff -m "$msg" "$branch" 2>/tmp/pub_merge.err; then
    conflicts="$(git -c core.quotepath=false diff --name-only --diff-filter=U 2>/dev/null | tr '\n' ' ')"
    git merge --abort 2>&1 || { echo "병합 취소에 실패했습니다."; git checkout "$branch" 2>&1 >/dev/null || true; fail "병합 상태가 비정상입니다. 담당 개발자에게 문의하세요."; }
    git checkout "$branch" 2>&1 >/dev/null || true
    echo "충돌이 발생했습니다: ${conflicts}"
    echo "임의로 해결하지 않고 중단했습니다. 담당 개발자에게 문의하세요."
    echo "BLOCKED_CONFLICT"; exit 7
  fi

  if git push origin main 2>/tmp/pub_push.err; then
    git branch -d "$branch" 2>&1 >/dev/null || true
    echo "올렸습니다. 1~2분 뒤 https://ne-dichoi.github.io/mockup-pages/ 에 자동 반영됩니다."
    echo "OK"; exit 0
  fi

  # push 거부 → 다음 시도(다음 루프 시작에서 work로 복귀하며 throwaway 병합 폐기)
  attempt=$((attempt+1))
done

git checkout "$branch" 2>&1 >/dev/null || true
echo "올리는 사이 다른 사람이 계속 먼저 올렸습니다. 잠시 후 다시 '올리기(publish)'를 실행해 주세요."
echo "BLOCKED_REMOTE_UPDATED"; exit 6
