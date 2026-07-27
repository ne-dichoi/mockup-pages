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

### 기획자용 — 이렇게 반복하세요 (git 없이)

Claude Code에서 슬래시 명령만 쓰면 됩니다. 형상관리(브랜치·커밋·병합)는 Claude가 대신합니다.

1. **편집:** Claude에게 요청 — 예: "'주문 상세' 목업 만들어줘" / "그 페이지 버튼 색 바꿔줘"
2. **올리기:** `/publish` → 1~2분 뒤 사이트 반영
3. 위 1~2를 **반복**하면 됩니다.

- `/publish`가 최신화·브랜치 생성·병합·배포를 자동 처리하므로 **브랜치를 신경 쓸 필요가 없습니다.**
- **되돌리기:** 잘못 올렸으면 `/rollback` → 최근 올리기 목록에서 골라 취소합니다.
- (선택) `/start` — 새 목업을 **폴더명으로 명시**해 시작하고 싶을 때. 안 써도 됩니다.
- `main`에서 직접 작업해도 `/publish`가 자동으로 작업 브랜치로 옮겨 안전하게 반영합니다(직접 push는 막혀 있음).

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

작업 중 만나는 문제·해결과 마커 의미는 **[TROUBLESHOOTING.md](./TROUBLESHOOTING.md)**에서 별도로 관리합니다. 의미 있는 문제가 **해결되면 Claude가 자동으로** 사례를 남기며(한 줄 통지), 그 기록은 다음 올리기에 함께 반영됩니다. 직접 남기고 싶을 때는 `/trouble`이라고 하면 됩니다.

## 최초 1회 설정 (저장소 생성 직후)

GitHub 저장소 → **Settings → Pages → Build and deployment → Source** 를 **GitHub Actions**로 지정합니다. 이후 push는 자동 배포됩니다.

## 에이전트 위임 검증 (재시작 후, 선택)

`git-helper` 에이전트/스킬을 새로 추가·수정했거나, 기획자에게 인계하기 직전에 한 번 확인하는 절차입니다. 에이전트·스킬은 **세션 시작 시 로드**되므로, 반드시 **Claude Code를 저장소 루트에서 새로 열고** 아래를 순서대로 붙여넣습니다.

**0단계 — 등록 확인**

```text
/agents
```
→ 목록에 **git-helper**가 보이면 로드됨. (안 보이면 저장소 루트에서 열었는지 확인)
스킬은 `/start` `/publish` `/sync` `/trouble` 이 인식되는지 확인.

**1단계 — start 위임** (브랜치명은 `<폴더>-<시각>` 형식)

```text
git-helper 에이전트로 "reload-test" 목업 작업을 시작해줘.
subagent_type=git-helper 로 task=start, 목업 폴더명="reload-test" 로
scripts/git-start.sh 를 실행한 결과(마커·브랜치명)를 알려줘.
```
→ 기대: `START_OK`, 브랜치 `reload-test-<MMDD-HHMM>`

**2단계 — 목업 생성**

```text
mockups/reload-test/index.html 에 제목이 "재시작 검증"인 간단한 목업 하나 만들어줘.
```

**3단계 — publish 위임**

```text
git-helper 에이전트로 지금 작업을 올려줘. subagent_type=git-helper 로 task=publish
위임해서 scripts/git-publish.sh 실행하고 마커·커밋 메시지·실행 후 브랜치를 알려줘.
```
→ 기대: `OK`, 커밋 메시지 `목업 추가/수정: reload-test`, main 병합·배포, 브랜치 `main` 복귀

**4단계 — 정리**

```text
방금 만든 mockups/reload-test 를 삭제하고, git-helper 로 publish 해서 사이트에서 내려줘.
```

**5단계 — (선택) 문제 기록 스킬 확인**

```text
/trouble  방금 절차에서 특이사항이 있었으면 TROUBLESHOOTING.md 에 사례로 남겨줘.
```

**확인 포인트**
- `subagent_type: git-helper`가 **"not found" 없이** 실행됨 (= 등록됨)
- 에이전트가 **Sonnet**으로 돔
- `start`→`publish`가 **브랜치(`<폴더>-<시각>`) 생성 → 자동 병합 → 배포**로 끝남
- 실패 시: 타입을 못 찾으면 저장소 루트에서 열었는지 확인, 그 외 오류는 [TROUBLESHOOTING.md](./TROUBLESHOOTING.md) 참고

## 커밋 메시지 컨벤션

커밋·브랜치·병합은 `/publish`(→ `scripts/git-publish.sh`)가 **자동으로** 처리하므로, 기획자가 직접 메시지를 쓸 필요는 없습니다. 규칙은 다음과 같습니다.

**커밋 메시지 (자동 생성)**

| 변경 내용 | 메시지 형식 | 예 |
| --- | --- | --- |
| `mockups/` 아래 폴더 변경(추가·수정·삭제) | `목업 추가/수정: <폴더1>, <폴더2>` | `목업 추가/수정: order-detail` |
| 그 외(스크립트·문서 등) | `내용 수정` | `내용 수정` |

- 폴더명은 변경된 `mockups/<폴더>` 경로에서 자동 추출하며, 중복은 제거합니다(한글·공백 폴더명 안전).
- 브랜치를 `main`에 합칠 때 생기는 병합 커밋(`--no-ff`)도 같은 메시지를 사용합니다.

**브랜치 이름 (자동 생성)**

| 상황 | 형식 | 예 |
| --- | --- | --- |
| `/start`로 시작 | `<폴더>-<MMDD-HHMM>` | `order-detail-0727-1530`, `주문상세-0727-1612` |
| `main`에서 실수로 작업 → 자동 이동 | `<폴더>-<MMDD-HHMM>` (감지 실패 시 `edit-<MMDD-HHMM>`) | `order-detail-0727-1530`, `edit-0727-1530` |

슬러그는 입력한 작업 이름을 소문자화하고 공백을 `-`로 바꾼 뒤 git 브랜치명에 쓸 수 없는 문자를 제거해 만듭니다. 작업 브랜치는 `main` 병합 후 자동 삭제됩니다.

## 구조

| 경로 | 설명 |
| --- | --- |
| `mockups/` | 목업 원본. 폴더 하나가 목업 하나 |
| `scripts/build.mjs` | `mockups/`를 스캔해 `_site/`와 목록 페이지 생성 |
| `.github/workflows/deploy.yml` | main push → 빌드 → Pages 배포 |
| `_site/` | 빌드 산출물. 커밋하지 않음 |

## 주의

이 저장소는 **public**이며 배포된 페이지도 누구나 볼 수 있습니다. 실제 고객 정보나 내부 자격 증명은 올리지 마세요. 목업 데이터는 반드시 가짜 값을 사용합니다.
