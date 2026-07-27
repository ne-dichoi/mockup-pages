# 목적: mockup-pages 저장소를 로컬(Windows)에 세팅한다 (clone → 사전요건 확인 → 빌드).
# 실행: ./scripts/init.ps1          (세팅만, 비블로킹으로 종료)
#       ./scripts/init.ps1 -Serve   (세팅 후 http://localhost:3000 미리보기)
# 성공: "built N mockup(s) -> _site/" 로그 + _site/index.html 생성 + 정상 종료
# 주의: public 저장소. 실제 고객 데이터/자격 증명 금지.
param([switch]$Serve)
$ErrorActionPreference = 'Stop'

$Repo = 'https://github.com/ne-dichoi/mockup-pages.git'
$Site = 'https://ne-dichoi.github.io/mockup-pages/'

# 1. 저장소 밖에서 실행되면 clone (irm | iex 부트스트랩 지원)
if (-not (Test-Path 'scripts/build.mjs')) {
  Write-Host '▶ 저장소를 clone합니다...'
  git clone $Repo
  Set-Location 'mockup-pages'
} else {
  Write-Host '▶ 저장소 안에서 실행 중 (clone 생략)'
}

# 2. Node.js 확인
if (-not (Get-Command node -ErrorAction SilentlyContinue)) {
  Write-Host '✗ Node.js가 필요합니다. https://nodejs.org 에서 v18 이상 설치 후 다시 실행하세요.'
  exit 1
}
Write-Host "▶ Node.js $(node --version) 확인됨"

# 3. 빌드 (_site/ 생성)
Write-Host '▶ 빌드 실행...'
node scripts/build.mjs
if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }

# 4. 완료
Write-Host ''
Write-Host '✅ 세팅 완료'
Write-Host "   공개 주소: $Site"
Write-Host '   미리보기 : ./scripts/init.ps1 -Serve  (http://localhost:3000)'

# 5. -Serve일 때만 로컬 미리보기 서버 기동
if ($Serve) {
  Write-Host '▶ 로컬 미리보기: http://localhost:3000  (Ctrl+C로 종료)'
  if (Get-Command npx -ErrorAction SilentlyContinue) {
    npx --yes serve _site
  } elseif (Get-Command python -ErrorAction SilentlyContinue) {
    python -m http.server 3000 --directory _site
  } else {
    Write-Host '✗ npx 또는 python이 없어 미리보기 서버를 띄울 수 없습니다.'
    exit 1
  }
}
