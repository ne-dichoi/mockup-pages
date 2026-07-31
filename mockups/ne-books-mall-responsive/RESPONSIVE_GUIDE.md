# NE Books 자사몰 반응형 가이드 (개발용)

피그마 export(PC 1440px 기준) 목업을 PC·태블릿·모바일 반응형으로 만들 때 따르는 규칙.
파일럿 2페이지(`index.html`, `리스트_교재구매.html`)를 실제로 완성하며 검증한 내용을 기준으로 정리했다.
디자이너용 판단 경계는 `FIGMA_RESPONSIVE_GUIDE.md`를 함께 볼 것.

---

## 0. 파일럿 결과 요약 (실측)

3뷰포트(모바일 375 · 태블릿 768 · PC 1440)에서 가로 오버플로/잘림 측정. Playwright 실측.

| 페이지 | 모바일 | 태블릿 | PC |
|---|---|---|---|
| `index.html` | PASS (0px) | PASS (0px) | PASS |
| `리스트_교재구매.html` | PASS (0px) | PASS (0px) | PASS |

수정 전에는 태블릿 165px·모바일 142px 오버플로가 있었고, **공통 CSS(`layout.css`) 6줄 수정 + 태블릿 헤더 블록 1개 추가**만으로 해결했다.
페이지별 HTML은 한 줄도 건드리지 않았다.

---

## 1. Breakpoint 정의

`tokens.css`에 이미 `--bp-tablet:768px`가 있다. 아래 3구간을 표준으로 한다.

| 구간 | 범위 | 좌우 여백(container) |
|---|---|---|
| 모바일 | `≤ 767px` | `--pad-mobile` = 20px |
| 태블릿 | `768px ~ 1023px` | 20px |
| PC | `≥ 1024px` | `--pad-desktop` = 40px |

- 모바일 규칙: `@media (max-width:767px)` (기존 블록 유지)
- **태블릿 전용 규칙: `@media (min-width:768px) and (max-width:1023px)`**
  - 반드시 `min-width:768px` 하한을 둘 것. 그래야 이미 통과 중인 모바일 출력을 덮지 않는다.
- 기존 목업에는 `900/960/1000/1100/560` 등 비표준 분기점이 산재한다. **삭제하지 말고**(각자 특정 컴포넌트를 담당) 위 3구간을 추가로 얹는다.

---

## 2. 가장 중요한 함정 — 명시도(specificity)로 죽는 오버라이드

**목업에서 실제로 발견된 최대 버그.** 모바일 블록에 오버라이드를 써도 base 규칙보다 명시도가 낮으면 **적용되지 않는다.**

```css
/* base (명시도 0,2,0) */
.page-buy .pcover{width:245px;}

/* 모바일 블록 — 명시도 0,1,0 → base에 짐 → 245px 그대로! */
@media (max-width:767px){ .pcover{width:140px;} }   /* ❌ 죽은 규칙 */
```

리스트 페이지의 커버(245px)·액션열(`.pactions` absolute 190px)이 모바일에서 안 줄어들고 잘리던 원인이 정확히 이것이었다.

**규칙: 미디어 블록의 오버라이드는 base와 동일하거나 높은 명시도로 쓴다.**

```css
@media (max-width:767px){
  .page-buy .pcover, .page-study .pcover{width:140px;}          /* ✅ */
  .page-buy .pactions, .page-study .pactions{position:static;}  /* ✅ */
}
```

새 페이지에 규칙을 추가할 때 **base가 `.page-xxx .클래스` 형태로 접두어를 달고 있는지 먼저 확인**하고, 그렇다면 오버라이드도 같은 접두어를 붙일 것.

---

## 3. 고정폭 → 유동 전환 패턴

목업에는 px 고정폭 컴포넌트가 다수. 유형별 처리:

| 유형 | 예시(실제 클래스) | 처리 |
|---|---|---|
| 콘텐츠 컨테이너 | `.container{max-width:1440px}` | 이미 `width:100%`+`max-width` → 그대로 두면 유동. OK |
| 사이드 고정 컬럼 | `.body-grid{grid-template-columns:220px 1fr}` | 태블릿/모바일에서 `grid-template-columns:1fr`로 1열 접기(이미 900 블록에 있음) |
| 중앙 고정폭 요소 | 헤더 `.search{width:449px}` | `max-width:100%` 유지 + 좁은 구간에선 `flex-basis:100%`로 별도 행 |
| 이미지 카드 고정폭 | `.pcover{width:245px}` | 구간별 축소(245→140) + **§2 명시도 준수** |
| 절대배치 열 | `.pactions{position:absolute;right:0;width:190px}` | 좁은 구간에서 `position:static;width:100%`로 문서 흐름 복귀 후 아래로 재배치 |
| JS 결합 고정폭 | `.hero2-card{width:405px}` | CSS로 만지지 말 것 — `js/layout.js`의 `sizes()`가 `innerWidth` 보고 230/320/405로 세팅. **JS 분기점을 고쳐야 함** |

전역 안전장치는 이미 걸려 있다:
```css
html{overflow-x:clip;}                 /* 가로 스크롤바 방지 (단, 넘친 콘텐츠는 잘림 → 근본 수정 필요) */
img{max-width:100%;height:auto;}       /* 이미지 유동 */
```
> `overflow-x:clip`은 스크롤바만 없앨 뿐, **넘친 콘텐츠는 보이지 않게 잘린다.** "가로 스크롤 없음 = 완성"이 아니다. 스크린샷으로 잘림을 눈으로 확인할 것(§7).

---

## 4. 그리드 재배치 규칙

`display:grid` + 고정 트랙(px) 레이아웃은 좁은 구간에서 트랙을 접는다.

```css
/* PC */ .cart-grid{grid-template-columns:minmax(0,1fr) 360px;}
/* 좁게 */ @media(max-width:900px){ .cart-grid{grid-template-columns:1fr;} }
```

- **2단 본문(본문+사이드)**: `1fr`로 접고 사이드를 위나 아래로. (`.body-grid`,`.cart-grid`,`.co-grid`,`.dt-hero`,`.dt-body` — 이미 처리됨)
- **다열 테이블형 그리드**(`.rgrid-row`,`.tb-row`,`.oi-row`,`.br-tr`,`.citem`): §5 참고. 단순 1열 접기로는 안 되고 **카드화(card-ification)** 필요. `.citem`(장바구니)만 처리돼 있고 나머지는 미처리.
- **N열 카드 그리드**(`.res-grid`,`.mb-grid`,`.ev-grid` = 3~4열): `repeat(2,1fr)`(태블릿)→`1fr`(모바일)로 단계 축소.
- **달력**(`.dp-week`,`.dp-days` = `repeat(7,1fr)`): **1열로 접을 수 없다.** 폰트/셀만 축소.

---

## 5. 테이블형 레이아웃 — 카드화 패턴

`display:grid` 다열 행을 모바일에서 세로 카드로 바꾼다. 라벨을 인라인으로 주입한다.

```css
@media(max-width:767px){
  .oi-row{grid-template-columns:1fr;gap:6px;padding:16px 0;}
  .oi-row .col-price::before{content:"금액 ";color:var(--weak);}  /* 헤더행이 사라지므로 라벨 주입 */
}
```

⚠️ **어느 열을 제목으로 올리고, 어느 열에 라벨을 붙이고, 어느 열을 버릴지는 CSS가 결정할 수 없다 — 디자인 판단이다.** 코더가 임의로 정하면 안 된다. `FIGMA_RESPONSIVE_GUIDE.md` 참고.

---

## 6. 이미지·폰트 스케일, 터치 타깃

- **폰트**: 타이틀만 구간별 축소. `--fs-h1:40 → 28`, `.ptitle:28 → 19`. 본문(14px)은 유지.
  clamp 사용 권장: `font-size:clamp(24px,5vw,40px)`.
- **이미지**: `img{max-width:100%}` 전역 적용됨. 커버 등 고정 컨테이너는 `aspect-ratio`로 비율 유지(`.dh-cover`가 사례).
- **터치 타깃 최소 44×44px** (WCAG/모바일 표준):
  - ⚠️ **파일럿 미해결**: `.pic-btn .ico`(22px), `.float-card .ico`(30px), 체크박스 `.chk`(16px)는 44px 미만.
  - 이는 히트 영역 확대(패딩/`::before` 투명 확장) 또는 재설계가 필요한 **디자인 결정 항목**. 가이드가 강제하는 규칙을 파일럿이 이미 위반 중이므로, 나머지 페이지 작업 시 별도 처리할 것.

---

## 7. 검증 방법 (필수)

> **⚠️ 핵심 교훈: "페이지 body 가로 스크롤 0" ≠ "잘림 없음".**
> `html{overflow-x:clip}`이 걸려 있어 `documentElement.scrollWidth - clientWidth`는 **거의 항상 0**을 보고한다. 하지만 그 안에서 **개별 요소는 뷰포트를 넘어 잘린 채** 있을 수 있다(로고 좌측 잘림, GNB 메뉴 우측 잘림, 히어로 카드 인접분 노출 등 — 실제로 파일럿 1차에서 이 방식으로 놓쳤다).
> **반드시 "요소 우측 넘침"까지 측정하라.**

검증은 아래 2단계 지표 + 육안:

1. `python3 -m http.server <포트>`로 로컬 서빙.
2. **body overflow** = `documentElement.scrollWidth - clientWidth` (= 0 필수, 하지만 이것만으론 불충분).
3. **요소 넘침** = `getBoundingClientRect().right > innerWidth+2` 또는 `left < -2`인 **유의미 요소(width>30) 개수 = 0**.
   - **예외**: 의도적 가로 캐러셀(예: `.bs-list`, `.cat-row`, `.hero2-stage`)은 허용하되, **반드시 컨테이너에 `overflow-x:auto|hidden|clip`이 걸려 그 안에서만 스크롤/클리핑**되게 할 것(페이지 자체가 늘어나면 안 됨). 판정 스크립트에서 "조상 중 클리핑 컨테이너가 있으면 예외" 규칙으로 거른다.
4. **overflow·요소넘침 0 이어도 스크린샷을 눈으로 확인** — 잘린 텍스트, 겹친 요소, 깨진 정렬. (파일럿에서 태블릿 `.floating` 겹침은 스크립트가 아니라 눈으로 발견.)

요소 넘침 판정 스니펫(조상 클리핑=예외):
```js
const bad = await p.evaluate((vw) => {
  const out = [];
  for (const el of document.querySelectorAll('body *')) {
    const r = el.getBoundingClientRect();
    if (r.width <= 30 || r.height <= 0) continue;
    if (r.right <= vw + 2 && r.left >= -2) continue;       // 뷰포트 안 → OK
    let a = el.parentElement, clipped = false;
    while (a && a !== document.body) {                      // 조상에 클리핑 컨테이너?
      if (['auto','scroll','hidden','clip'].includes(getComputedStyle(a).overflowX)) { clipped = true; break; }
      a = a.parentElement;
    }
    if (!clipped) out.push(el.className || el.tagName);     // 클리핑 없이 잘림 → 진짜 버그
  }
  return out;
}, innerWidth);
// bad.length === 0 이어야 통과 (캐러셀은 clipped=true라 자동 제외)
```

오버플로 측정 최소 스니펫(페이지별로 실행):
```js
// createRequire로 외부 node_modules의 playwright 로드 (프로젝트에 미설치 시)
import { createRequire } from 'module';
const require = createRequire('/path/to/project-with-playwright/');
const { chromium } = require('@playwright/test');
const b = await chromium.launch();
for (const [w,h] of [[375,812],[768,1024],[1440,900]]) {
  const p = await (await b.newContext({viewport:{width:w,height:h}})).newPage();
  await p.goto('http://localhost:PORT/페이지.html', {waitUntil:'networkidle'});
  const ov = await p.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  await p.screenshot({path:`shot_${w}.png`, fullPage:true});
  console.log(w, 'overflow=', ov);   // ov>0 이면 잘림 발생 → 스크린샷 확인
}
await b.close();
```

---

## 8. 파일럿에서 실제로 바꾼 것 (참고 diff 요약)

`css/layout.css`만 수정:

1. `@media(max-width:767px)` — `.pcover`/`.pcover img` → `.page-buy .pcover, .page-study .pcover`로 명시도 보정 (§2)
2. `@media(max-width:767px)` — `.search` → `.header .search, .lheader .search`로 보정
3. `@media(max-width:767px)` — `.cart-head-row{flex-wrap:wrap;}` 추가 (타이틀+브레드크럼 줄바꿈)
4. `@media(max-width:900px)` — `.pactions`/`.picons` → `.page-buy/.page-study` 접두어로 명시도 보정 (§2)
5. **신규** `@media(min-width:768px) and (max-width:1023px)` 블록 — 헤더 flex 재배치(검색창 별도 행) + `.floating` 우하단 고정. 헤더 grid의 min-content(≈933px)가 768px를 넘어 잘리던 문제 해결. **이 한 블록이 태블릿 PASS 페이지를 3→18로 전환**(공통 헤더이기 때문, 실측).

> 헤더 수정 시 `.lheader .header-top`의 `padding-inline:calc(50vw - 50%)`(full-bleed 트릭)를 지우지 않도록 `padding` 단축 속성을 쓰지 말 것. `padding-block`만 만진다.

**2차(요소 넘침 검증 강화 후) 추가 수정:**

6. `@media(max-width:767px)` — `.lheader/.header .header-top`의 `padding:16px 0` → `padding-block:16px`. 단축 속성이 base의 full-bleed `padding-inline`을 지워 **로고가 뷰포트 좌측에 붙어 잘리던 문제**(L=0) 해결. (§7 교훈의 실제 사례)
7. **신규** `@media(max-width:1023px)` — `.gnb-in nav{display:none}`. 인라인 GNB 메뉴(nav 8개 ≈ 606px)가 우측으로 잘리고 햄버거(≡)와 중복 → 인라인 메뉴 숨기고 햄버거만 노출. (HTML 무수정)
8. `@media(max-width:767px)` — `.floating{right:12px}`로 우측 여백 확보.
9. **`index.html` 인라인 JS** `sizes()` — 히어로 캐러셀(`.hero2`)이 모바일/태블릿(`w<=1000`)에서 **카드=스테이지 폭, gap=0**이 되어 인접 카드 노출 없이 1장만 표시. CSS로는 JS 인라인 스타일을 못 이기므로 JS를 고침(HTML 내 스크립트 1함수만).

> `.hero2`(clip)·`.bs-list`/`.cat-row`(auto scroll)는 **의도적 캐러셀**이라 뷰포트를 넘는 자식이 남지만, 컨테이너가 클리핑/스크롤하므로 페이지는 늘어나지 않는다(§7 예외). 실측: 파일럿 2페이지 × 모바일·태블릿에서 **클리핑 컨테이너 밖으로 잘리는 요소 = 0**.

---

# REVIEW — 21페이지 전체 반응형화 실난이도 (실측 기반)

## 전 페이지 오버플로 계측 (수정 전 baseline)

21페이지 × 2뷰포트를 **수정 전/후 실측**(`documentElement.scrollWidth - clientWidth`).

### 태블릿(768) — 공통 헤더 수정 1건의 효과 (실측)

수정 전 거의 전 페이지가 `T_ov=165px`(공통 헤더 grid) → 헤더 블록 추가 후 재측정:

| | 수정 전 | 수정 후 |
|---|---|---|
| 태블릿 오버플로 0(PASS) | 3 / 21 | **18 / 21** |
| 잔여(0 아님) | 18페이지(대부분 165) | **3페이지**: 교재상세(1665), oxford(212), 주문상세(93) |

→ **공통 CSS 1블록으로 태블릿 15페이지가 동시에 PASS로 전환됨(3→18).** 리스트_학습자료도 `.page-study .pcover` 바인딩 덕에 165→0. "공통 CSS 커버 비율"의 정량 근거.

### 모바일(375) — 수정 후 실측

| 구간 | 페이지(수정 후 M_ov) |
|---|---|
| PASS(0) — 9페이지 | index, **리스트_교재구매(142→0, 수정)**, 메인_1, 공지사항상세, 문의답변상세, 신간개정상세, 오류정정상세, 이벤트상세, 장바구니 |
| 경미(<250) — 6페이지 | 고객센터(153), 비회원문의(206), 세미나상세(66), 주문완료(130), 후기작성(188), 후기수정(188) |
| 중간(250~600) — 4페이지 | 리스트_학습자료(357), 마이페이지(291), 주문결제(261), 주문상세(466) |
| 대형(>600) — 2페이지 | oxford(605), **교재상세(2038)** |

- **시각 검증 완료(스크린샷 확인)**: index, 리스트_교재구매(3뷰포트), 메인_1(모바일), 장바구니(모바일). 나머지 PASS(0) 페이지는 **가로 오버플로 0이나 시각 검증 미실시** — 최종 적용 시 스크린샷 확인 필요(§7).
- **메인_1.html**: 모바일·태블릿 0이고 스크린샷상 깨끗 — `.hslide` 계열 규칙으로 이미 대응. `index.html`과 별개 구현.
- **장바구니.html**: `.citem` 7열 그리드가 모바일에서 카드로 정상 접힘(스크린샷 확인) — **테이블도 규칙만 있으면 CSS로 됨**을 입증하는 사례(§5).
- **교재상세.html**: 태블릿 1665·모바일 2038 — 최대 난제. `.dt-hero`(580px)+`.dtabs-inner`(1040px)+리뷰 테이블(`.rgrid-row`) 복합. 태블릿 1665가 남은 건 §2 명시도 버그의 또 다른 사례일 가능성(예: `.page-detail .dt-hero` base) — 개별 조사 필요.
- **oxford.html**: 269KB로 나머지의 약 10배. 평균에 섞지 말고 **별도 라인 아이템**으로 잡을 것.

## 커버리지: 공통 CSS vs 페이지별 작업

- **공통 CSS로 커버**(1회 수정, 전 페이지 혜택):
  - 헤더(태블릿) → 태블릿 PASS 3→18페이지(실측)
  - `.container`/`img`/`overflow-x` 유동화 → 이미 적용
  - 2단 본문 grid 접기(`.body-grid`,`.cart-grid`,`.co-grid`,`.dt-*`) → 대부분 적용
  - 제품 카드(`.prow`) → 리스트 2페이지 공통
  - 대략 **모바일 페이지의 60~70%**가 공통 CSS + 경미 수정으로 통과.
- **페이지별 개별 작업 필수**(디자인 판단 동반):
  - 테이블형 4종: `.rgrid-row`(리뷰), `.tb-row`, `.oi-row`(주문항목), `.br-tr`(신간/개정) → **카드화 미처리**
  - `.dp-week`/`.dp-days` 달력 → 1열 불가, 축소만
  - 교재상세·oxford 상세 페이지
  - 대략 **모바일 페이지의 30~40%**.

## 구조적 걸림돌

1. **명시도로 죽은 오버라이드**(§2) — 목업 전반에 `.page-xxx .클래스` 접두어 base가 깔려 있어, 무접두어 오버라이드가 조용히 무시됨. 전 페이지 점검 필요.
2. **절대배치 요소**: `.pactions`(right:0), `.floating`(right:0), `.co-side`/`.dh-buy` sticky 등 → 좁은 구간마다 흐름 복귀 처리.
3. **테이블형 grid 다열**: 헤더행+데이터행 구조라 단순 접기 불가, 카드화+인라인 라벨 필요(디자인 결정).
4. **JS 결합 고정폭**: `hero2` 캐러셀은 `layout.js`가 폭을 계산 — CSS만 고치면 페이징이 깨짐. JS 분기점도 함께 손대야 함.
5. **터치 타깃 미달**: 아이콘 버튼 22~30px, 체크박스 16px — 모바일 재설계 항목.
6. **비표준 분기점 난립**(560/900/960/1000/1100) — 신규 규칙과 충돌 주의.

## "간단히 금방 되는가?" — 정직한 답

**부분적으로 Yes, 전체는 No.**

- **태블릿**은 사실상 금방 된다. 공통 헤더 수정 1건으로 태블릿 PASS가 3→18페이지로 전환됐다(전 페이지 실측). 남은 3페이지는 교재상세·oxford·주문상세.
- **모바일 단순 페이지**(정적/상세 8~15개)도 공통 CSS + 경미한 줄바꿈으로 빠르게 통과한다.
- 하지만 **테이블형·상세형·폼 복합 페이지**(교재상세, 주문상세, 마이페이지, 리뷰/주문/신간 테이블, oxford)는 "무엇을 숨기고/접고/재배열할지"라는 **디자인 결정 없이는 완성할 수 없다.** 여기서 "금방"이 깨진다.

### 공수 추정 (파일럿 실측 기반)

파일럿: 2페이지 = 공통 CSS 6줄 + 태블릿 블록 1개, 순수 구현 약 30~40분(진단 제외). 공통 수정은 1회성이고 전 페이지가 혜택.

| 항목 | 추정 |
|---|---|
| 공통 CSS 보강(헤더·명시도·유동화 전 페이지 점검) | 0.5 ~ 1일 |
| 단순/정적 페이지 일괄(~10페이지) | 0.5일 |
| 테이블형 카드화(4종 × 재사용) | 1 ~ 2일 (+디자인 결정) |
| 폼·중간 페이지 개별(리스트_학습자료, 마이페이지, 주문결제/상세, 문의·후기 등) | 1 ~ 1.5일 |
| **교재상세.html** (최대 난제, JS 결합 포함) | 0.5 ~ 1일 |
| **oxford.html** (269KB, 별도) | 0.5 ~ 1일 |
| 터치 타깃·QA·3뷰포트 스크린샷 회귀 | 0.5일 |
| **합계(개발)** | **약 4 ~ 7 실작업일** |

> 위 추정은 **디자이너가 태블릿/모바일 프레임(정보 우선순위·숨김/재배열·네비 변형)을 확정해 준 뒤**의 개발 공수다. 프레임 미확정 상태에서 개발이 디자인까지 겸하면 페이지당 2~3배로 늘고 재작업 위험이 크다. 핸드오프 순서는 `FIGMA_RESPONSIVE_GUIDE.md` 참고.
