#!/usr/bin/env bash
# 목적: mockup-pages 저장소를 로컬에 세팅한다 (clone → 사전요건 확인 → 빌드).
# 실행: bash scripts/init.sh          (세팅만, 비블로킹으로 종료)
#       bash scripts/init.sh --serve  (세팅 후 http://localhost:3000 미리보기)
# 성공: "built N mockup(s) -> _site/" 로그 + _site/index.html 생성 + exit 0
# 주의: public 저장소. 실제 고객 데이터/자격 증명 금지.
set -euo pipefail

REPO="https://github.com/ne-dichoi/mockup-pages.git"
SITE="https://ne-dichoi.github.io/mockup-pages/"
SERVE=false
[ "${1:-}" = "--serve" ] && SERVE=true

# 1. 저장소 밖에서 실행되면 clone (curl | bash 부트스트랩 지원)
if [ ! -f scripts/build.mjs ]; then
  echo "▶ 저장소를 clone합니다..."
  git clone "$REPO"
  cd mockup-pages
else
  echo "▶ 저장소 안에서 실행 중 (clone 생략)"
fi

# 2. Node.js 확인
if ! command -v node >/dev/null 2>&1; then
  echo "✗ Node.js가 필요합니다. https://nodejs.org 에서 v18 이상 설치 후 다시 실행하세요." >&2
  exit 1
fi
echo "▶ Node.js $(node --version) 확인됨"

# 3. 빌드 (_site/ 생성)
echo "▶ 빌드 실행..."
node scripts/build.mjs

# 4. 완료
echo ""
echo "✅ 세팅 완료"
echo "   공개 주소: $SITE"
echo "   미리보기 : bash scripts/init.sh --serve  (http://localhost:3000)"

# 5. --serve일 때만 로컬 미리보기 서버 기동
if [ "$SERVE" = true ]; then
  echo "▶ 로컬 미리보기: http://localhost:3000  (Ctrl+C로 종료)"
  if command -v npx >/dev/null 2>&1; then
    npx --yes serve _site
  elif command -v python3 >/dev/null 2>&1; then
    python3 -m http.server 3000 --directory _site
  else
    echo "✗ npx 또는 python3가 없어 미리보기 서버를 띄울 수 없습니다." >&2
    exit 1
  fi
fi
