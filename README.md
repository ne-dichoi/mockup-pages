# mockup-pages

서비스운영팀 목업 페이지 저장소. `main`에 push하면 GitHub Actions가 자동으로 빌드해서 공개 주소에 배포합니다.

**공개 주소:** https://ne-ax.github.io/mockup-pages/

## 목업 추가하기

1. `mockups/` 아래에 폴더를 하나 만듭니다. 폴더 이름이 URL이 됩니다. (영문/숫자/하이픈 권장)
2. 그 안에 `index.html`을 넣습니다. 이미지, CSS 등 필요한 파일도 같은 폴더에 함께 넣으면 됩니다.
3. `<title>`에 적은 값이 목록 페이지에 표시되는 이름입니다.
4. `main`에 push하면 1~2분 뒤 자동 반영됩니다.

```
mockups/
  order-detail/
    index.html      → https://ne-ax.github.io/mockup-pages/mockups/order-detail/
    screenshot.png
```

목록 페이지(`index.html`)는 빌드 때 자동 생성되므로 직접 만들 필요 없습니다.

## 로컬에서 확인하기

```bash
node scripts/build.mjs   # _site/ 생성
npx serve _site          # http://localhost:3000
```

Node 없이 확인하려면 `mockups/<폴더>/index.html`을 브라우저로 바로 열어도 됩니다.

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
