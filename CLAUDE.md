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

- **작업 시작:** `/start` — 최신 상태에서 전용 작업 브랜치(`work/*`)를 자동 생성한다.
- **목업 만들기:** Claude에게 요청 (예: "'주문 상세' 목업 만들어줘" → `mockups/order-detail/index.html`).
- **다 만든 후:** `/publish` — 작업 브랜치를 `main`에 자동 병합·push해서 사이트에 반영(1~2분 뒤 자동 배포).
- (필요 시) `/sync` — `main`을 최신으로 갱신.

### 가드 (반드시 지킬 것)

**`main`에서 직접 작업·커밋하지 말 것. `main`에서 만든 변경의 직접 push는 허용되지 않는다.** 모든 작업은 `/start`로 만든 `work/*` 브랜치에서 하며, `main` 반영은 `/publish`의 자동 병합으로만 이뤄진다. 실수로 `main`에서 수정한 경우 `/publish`가 자동으로 작업 브랜치로 옮겨 병합 처리한다. 형상관리는 `git-helper` 에이전트가 대신하며, 사람이 직접 git 명령을 실행하지 않는다.

스킬 정의는 `.claude/skills/`에 있다. 실제 git 작업은 `git-helper` 서브에이전트(Sonnet 고정, `.claude/agents/`)가 결정론적 스크립트(`scripts/git-start.sh`·`scripts/git-sync.sh`·`scripts/git-publish.sh`)를 실행해 안전하게 처리하므로, 메인 세션은 Haiku로 고정해도 된다.

## 문제 대응

git-helper가 `BLOCKED_*`/`ERROR` 마커를 반환하거나 같은 오류가 반복되면, 사용자에게 **[TROUBLESHOOTING.md](./TROUBLESHOOTING.md)에 사례를 남길지 제안**하고, 동의하면 `/trouble` 스킬로 증상·원인·해결 초안을 추가한다. 기록은 문제를 **해소하거나 파악한 뒤** 별도 브랜치 사이클로 반영한다 — 진행 중 블록/충돌 상태에서 기록용 publish를 강행하지 않는다. 마커 의미와 워커 대처는 `TROUBLESHOOTING.md` 상단 표를 참고한다.

## 구조

- `mockups/` — 목업 원본 (폴더 하나 = 목업 하나)
- `scripts/build.mjs` — 빌드: `mockups/` → `_site/` + 목록 생성
- `scripts/init.sh` — 로컬 온보딩 스크립트
- `.github/workflows/deploy.yml` — main push → 빌드 → Pages 배포
- `_site/` — 빌드 산출물, 커밋하지 않음(.gitignore)

## 주의

이 저장소는 **public**이다. 실제 고객 데이터·자격 증명을 절대 넣지 말 것. 목업 데이터는 반드시 가짜 값을 사용한다.
