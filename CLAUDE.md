# CLAUDE.md

목업 페이지 저장소. 정적 HTML 목업을 모아 GitHub Pages로 자동 배포한다.

- **공개 주소:** https://ne-dichoi.github.io/mockup-pages/
- **로컬 세팅:** `bash scripts/init.sh` (clone→확인→빌드, 비블로킹 종료) / 미리보기는 `bash scripts/init.sh --serve`

## 목업 추가하기

1. `mockups/<폴더명>/index.html` 생성 — **폴더명이 URL**이 된다 (영문/숫자/하이픈).
2. `<title>` 값이 목록 페이지에 표시되는 **이름**이다.
3. `main`에 push하면 GitHub Actions가 자동 빌드·배포한다 (1~2분).

목록 페이지(`_site/index.html`)는 `scripts/build.mjs`가 `mockups/`를 스캔해 자동 생성한다. 직접 만들지 말 것.

## 구조

- `mockups/` — 목업 원본 (폴더 하나 = 목업 하나)
- `scripts/build.mjs` — 빌드: `mockups/` → `_site/` + 목록 생성
- `scripts/init.sh` — 로컬 온보딩 스크립트
- `.github/workflows/deploy.yml` — main push → 빌드 → Pages 배포
- `_site/` — 빌드 산출물, 커밋하지 않음(.gitignore)

## 주의

이 저장소는 **public**이다. 실제 고객 데이터·자격 증명을 절대 넣지 말 것. 목업 데이터는 반드시 가짜 값을 사용한다.
