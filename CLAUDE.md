# CLAUDE.md

목업 페이지 저장소. 정적 HTML 목업을 모아 GitHub Pages로 자동 배포한다.

- **공개 주소:** https://ne-dichoi.github.io/mockup-pages/
- **로컬 세팅:** macOS/Linux는 `bash scripts/init.sh`, Windows는 `./scripts/init.ps1` (clone→확인→빌드, 비블로킹 종료) / 미리보기는 각각 `--serve` · `-Serve`

## 목업 추가하기

1. `mockups/<폴더명>/index.html` 생성 — **폴더명이 URL**이 된다 (영문/숫자/하이픈).
2. `<title>` 값이 목록 페이지에 표시되는 **이름**이다.
3. `main`에 push하면 GitHub Actions가 자동 빌드·배포한다 (1~2분).

목록 페이지(`_site/index.html`)는 `scripts/build.mjs`가 `mockups/`를 스캔해 자동 생성한다. 직접 만들지 말 것.

## 기획자용 스킬 (git 없이) — 브랜치 작업 흐름

Claude Code에서 슬래시 명령으로 작업하며, 형상관리는 에이전트가 대신한다.

> **실행 위치 주의:** Claude Code는 반드시 **저장소 루트(`mockup-pages`, `.claude/`가 있는 폴더)**에서 열어야 스킬·`git-helper` 에이전트가 로드된다. 상위 디렉터리에서 열면 `/start`·`/publish`·`git-helper`가 안 잡힌다. `/agents`에 `git-helper`가 보이는지로 확인.

**반복 작업(기본):** 목업을 편집하고 `/publish`만 하면 된다. `/publish`가 최신화·작업 브랜치 생성·병합·배포를 자동 처리하므로, 사용자는 브랜치를 의식하지 않아도 된다. 이 사이클을 반복한다.

- **목업 만들기/고치기:** Claude에게 요청 (예: "'주문 상세' 목업 만들어줘" → `mockups/order-detail/index.html`).
- **반영:** `/publish` — `main`에 자동 병합·배포(1~2분 뒤). 반복.
- **되돌리기:** `/rollback` — 최근 올리기 목록에서 골라 그 변경을 취소(revert)한다.
- (선택) `/start` — 새 목업/새 작업을 **폴더명으로 명시**해 시작하고 싶을 때. 최신 상태에서 `<폴더>-<시각>` 브랜치를 만든다.
- (필요 시) `/sync` — `main`을 최신으로 갱신.

### 가드 (반드시 지킬 것)

**`main`에서 직접 작업한 변경의 직접 push는 허용되지 않는다.** `main` 반영은 항상 작업 브랜치를 거친 `/publish`의 자동 병합으로만 이뤄진다. `main`에서 편집한 경우에도 `/publish`가 자동으로 폴더명 작업 브랜치로 옮겨 병합 처리한다(사용자는 신경 쓸 필요 없음). 형상관리는 `git-helper` 에이전트가 대신하며, 사람이 직접 git 명령을 실행하지 않는다.

> 작업 브랜치는 병합 후 **자동 삭제**한다. 커밋은 병합으로 `main` 이력에 보존되므로 삭제해도 안전하며, 되돌리기는 브랜치 복원이 아니라 `/rollback`(해당 병합 커밋 `git revert`)으로 한다.

스킬 정의는 `.claude/skills/`에 있다. 실제 git 작업은 `git-helper` 서브에이전트(Sonnet 고정, `.claude/agents/`)가 결정론적 스크립트(`scripts/git-start.sh`·`scripts/git-sync.sh`·`scripts/git-publish.sh`·`scripts/git-rollback.sh`)를 실행해 안전하게 처리하므로, 메인 세션은 Haiku로 고정해도 된다.

## 문제 자동 기록

작업 중 **의미 있는 문제**(`BLOCKED_*`/`ERROR` 마커, 빌드 실패, 인코딩/경로 문제 등)가 발생하고 **해결·파악되면**, Claude는 `TROUBLESHOOTING.md`의 "사례"에 템플릿(증상/원인/해결/관련)으로 **간결히 자동 추가**하고, 사용자에겐 **"이 문제는 TROUBLESHOOTING.md에 기록해뒀어요"** 정도로 한 줄만 통지한다. 파일 편집만 해두면 **다음 `/publish`에 자동 포함**된다.

- 같은 제목/증상이 이미 있으면 **중복 추가하지 않는다.**
- 사소하거나 일시적인 상황(정상 `NOCHANGE` 등)은 기록하지 않는다. 비밀값은 적지 않는다. 몇 줄로 간결히.
- git이 **블록/충돌 진행 중**이면 기록용 publish를 강행하지 않고, 원문제를 해소·파악한 뒤 반영한다.
- 사용자가 명시적으로 남기고 싶을 때는 `/trouble` 수동 스킬을 쓴다. 마커 의미는 `TROUBLESHOOTING.md` 상단 표 참고.

## 구조

- `mockups/` — 목업 원본 (폴더 하나 = 목업 하나)
- `scripts/build.mjs` — 빌드: `mockups/` → `_site/` + 목록 생성
- `scripts/init.sh` — 로컬 온보딩 스크립트
- `.github/workflows/deploy.yml` — main push → 빌드 → Pages 배포
- `_site/` — 빌드 산출물, 커밋하지 않음(.gitignore)

## 주의

이 저장소는 **public**이다. 실제 고객 데이터·자격 증명을 절대 넣지 말 것. 목업 데이터는 반드시 가짜 값을 사용한다.
