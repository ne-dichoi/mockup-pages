# mockup-pages

서비스운영팀 목업 페이지 저장소. `main`에 push하면 GitHub Actions가 자동으로 빌드해서 공개 주소에 배포합니다.

**공개 주소:** https://ne-dichoi.github.io/mockup-pages/

## 처음 공유받았다면 (빠른 시작)

폴더를 따로 복사할 필요 없이, 저장소 주소만 있으면 됩니다. 상황에 맞게 고르세요.

**A. Claude Code를 쓴다면** — 아래를 그대로 붙여넣으세요.

> 이 저장소를 내 컴퓨터에 세팅해줘: https://github.com/ne-dichoi/mockup-pages
> git clone 한 뒤 README와 CLAUDE.md를 읽고, 안내대로 온보딩 스크립트(macOS/Linux면 `bash scripts/init.sh`, 윈도우면 `./scripts/init.ps1`)를 실행해서 빌드까지 해줘. 끝나면 미리보기(`--serve` / `-Serve`)도 띄워줘.

**B. 터미널로 직접** — Git + Node.js v18+ 만 있으면 됩니다.

```bash
# macOS / Linux
git clone https://github.com/ne-dichoi/mockup-pages.git
cd mockup-pages && ./scripts/init.sh --serve
```

```powershell
# Windows (PowerShell)
git clone https://github.com/ne-dichoi/mockup-pages.git
cd mockup-pages; ./scripts/init.ps1 -Serve
```

→ 브라우저에서 `http://localhost:3000` 접속. 공개 저장소라 로그인·초대는 필요 없습니다.

**C. 결과물만 보면 된다면** — 설치 없이 공개 주소로: https://ne-dichoi.github.io/mockup-pages/

## 목업 추가하기

1. `mockups/` 아래에 폴더를 하나 만듭니다. 폴더 이름이 URL이 됩니다. (영문/숫자/하이픈 권장)
2. 그 안에 `index.html`을 넣습니다. 이미지, CSS 등 필요한 파일도 같은 폴더에 함께 넣으면 됩니다.
3. `<title>`에 적은 값이 목록 페이지에 표시되는 이름입니다.
4. `main`에 push하면 1~2분 뒤 자동 반영됩니다.

```
mockups/
  order-detail/
    index.html      → https://ne-dichoi.github.io/mockup-pages/mockups/order-detail/
    screenshot.png
```

목록 페이지(`index.html`)는 빌드 때 자동 생성되므로 직접 만들 필요 없습니다.

> **기획자용 (git 없이):** Claude Code에서 `/start`로 작업을 시작(전용 브랜치 자동 생성)하고, 목업을 만든 뒤 `/publish`로 올리면 자동 병합·배포됩니다. git 명령을 직접 칠 필요가 없습니다. **`main`에서 직접 작업하지 마세요** — 반드시 `/start`로 시작합니다(실수해도 `/publish`가 자동으로 브랜치로 옮겨 처리합니다).

## 로컬에서 확인하기

온보딩 스크립트 한 번이면 clone → 사전요건 확인 → 빌드까지 끝납니다.

**macOS / Linux (bash)**

```bash
# 저장소 없이 처음부터 (clone 포함)
curl -fsSL https://raw.githubusercontent.com/ne-dichoi/mockup-pages/main/scripts/init.sh | bash

# 이미 clone한 경우
./scripts/init.sh            # 세팅만
./scripts/init.sh --serve    # 세팅 후 http://localhost:3000 미리보기
```

**Windows (PowerShell)**

```powershell
# 저장소 없이 처음부터 (clone 포함)
irm https://raw.githubusercontent.com/ne-dichoi/mockup-pages/main/scripts/init.ps1 | iex

# 이미 clone한 경우
./scripts/init.ps1           # 세팅만
./scripts/init.ps1 -Serve    # 세팅 후 http://localhost:3000 미리보기
```

직접 실행하려면 `node scripts/build.mjs`로 `_site/`를 만든 뒤 `npx serve _site`를 띄우면 됩니다. Node 없이 확인하려면 `mockups/<폴더>/index.html`을 브라우저로 바로 열어도 됩니다.

## 트러블슈팅

**Windows에서 `init.ps1` 실행 시 파싱 에러 (`The string is missing the terminator: "`)**

- 원인: 스크립트가 BOM 없는 UTF-8로 저장되면 Windows PowerShell 5.1이 파일 안의 한글 주석을 시스템 코드페이지로 잘못 해석해서 깨집니다.
- 해결: 저장소의 `scripts/init.ps1`은 UTF-8 BOM 포함으로 저장되어 있어 정상 동작합니다. 로컬에서 파일을 다시 저장했는데도 같은 에러가 난다면, 에디터에서 인코딩을 "UTF-8 with BOM"으로 다시 저장하세요.

**push 시 `remote: Permission ... denied` / `403`**

- 원인: 로컬에 저장된 Git 자격증명 계정이 이 저장소에 쓰기 권한이 없습니다.
- 해결: 저장소 관리자에게 collaborator 추가를 요청하거나, 쓰기 권한이 있는 계정으로 Git 자격증명을 재인증한 뒤 다시 push하세요.

## 최초 1회 설정 (저장소 생성 직후)

GitHub 저장소 → **Settings → Pages → Build and deployment → Source** 를 **GitHub Actions**로 지정합니다. 이후 push는 자동 배포됩니다.

## 구조

| 경로 | 설명 |
| --- | --- |
| `mockups/` | 목업 원본. 폴더 하나가 목업 하나 |
| `scripts/build.mjs` | `mockups/`를 스캔해 `_site/`와 목록 페이지 생성 |
| `.github/workflows/deploy.yml` | main push → 빌드 → Pages 배포 |
| `_site/` | 빌드 산출물. 커밋하지 않음 |

## 주의

이 저장소는 **public**이며 배포된 페이지도 누구나 볼 수 있습니다. 실제 고객 정보나 내부 자격 증명은 올리지 마세요. 목업 데이터는 반드시 가짜 값을 사용합니다.
