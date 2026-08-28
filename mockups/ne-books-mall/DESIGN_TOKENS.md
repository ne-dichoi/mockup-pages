# NE_Books · 디자인 토큰

이 문서는 실제 화면에 **사용된 값만** 정리한 것입니다.
CSS 변수는 [`css/tokens.css`](css/tokens.css) 에 정의되어 있습니다.
사용하지 않은 라인/배경 컬러, 규격 외 폰트 크기, 8px 그리드에서 벗어난 여백값은
혼선을 막기 위해 의도적으로 **제외**했습니다.

---

## 1. 색상 (Color)

| 토큰 | 값 | 용도 |
|------|------|------|
| `--ink` | `#1D1717` | 검정 · 타이틀/강조 텍스트, 다크 아이콘·버튼 |
| `--red` | `#E83828` | 포인트(빨강) · 할인율, 강조, 활성 링크·라벨 |
| `--btn` | `#4D4E4D` | 어두운 버튼 테두리/배경 |
| `--muted` | `#666666` | 기본 본문 텍스트 |
| `--weak` | `#A9A9A9` | 저중요 텍스트(캡션, 비활성, 보조 정보) |
| `--line` | `#E5E5E5` | 흐린 구분선 — **유일한 라인 컬러** |
| `--gray-bg` | `#F3F3F3` | 섹션/카드 배경 |
| `--white` | `#FFFFFF` | 페이지 기본 배경 |
| `--footer` | `#0D0D0D` | 푸터 배경 |
| `--blue` | `#2272DD` | NE Tutor · 선생님 테마 액센트(별도 컴포넌트) |

> **라인 컬러는 `#E5E5E5` 하나만** 사용합니다. `#eeeeee` 등 다른 회색 라인은 쓰지 않습니다.
> **배경은 `#FFFFFF`(기본) 와 `#F3F3F3`(섹션)** 두 가지만 사용합니다.

---

## 2. 타이포그래피 (Typography)

**폰트 패밀리**

| 토큰 | 스택 | 용도 |
|------|------|------|
| `--sans` | `'Pretendard','Noto Sans KR',sans-serif` | 기본 UI·본문 |
| `--display` | `'Paperlogy','Pretendard','Noto Sans KR',sans-serif` | 큰 제목/디스플레이 |

**폰트 크기** — 아래 7단계만 사용합니다.

| 토큰 | 값 | 용도 |
|------|------|------|
| `--fs-caption` | `12px` | 캡션 · 보조 라벨 |
| `--fs-sm` | `13px` | 설명 텍스트 |
| `--fs-base` | `14px` | **기본 본문(기본값)** |
| `--fs-h4` | `16px` | 소제목 |
| `--fs-h3` | `24px` | 제목 |
| `--fs-h2` | `32px` | 큰 제목 |
| `--fs-h1` | `40px` | 최상위 제목 |

> 기본 텍스트는 `14px / #666666`, 저중요 텍스트는 `#A9A9A9` 입니다.
> 위 7단계(12·13·14·16·24·32·40) 외의 크기는 사용하지 않습니다.

> **모바일 폰트 규칙**
> - **15px는 사용하지 않습니다** (15 → 14로 통일). 기본 본문은 14px.
> - 모바일에서 사용하는 크기: `11`(배지) · `12`(캡션·일자) · `14`(본문·라벨·탭) · `16`(소제목·요약 라벨) · `24`(포인트 값 등 강조) · `28`.

---

## 3. 여백 (Spacing) — 8px 그리드

| 토큰 | 값 |
|------|------|
| `--sp-8` | `8px` |
| `--sp-16` | `16px` |
| `--sp-24` | `24px` |
| `--sp-32` | `32px` |
| `--sp-40` | `40px` |
| `--sp-48` | `48px` |
| `--sp-56` | `56px` |
| `--sp-80` | `80px` |

> 여백·간격은 위 8단계에서만 선택합니다.

> **모바일 여백 스케일 (4px 단위)**
> 모바일(≤1023px)에서는 데스크톱보다 세밀한 4px 단위 스케일을 사용합니다:
> `4 · 8 · 12 · 16 · 20 · 24 · 40`
> - 24 이하는 4px 단위로 촘촘히, 그 위는 40으로 점프(28·32는 시트/가이드 등 예외적 큰 여백에만 제한적으로 사용).
> - **2·6·10·14 등 4의 배수가 아닌 값은 사용하지 않습니다.**

---

## 4. 레이아웃 (Layout)

| 토큰 | 값 | 설명 |
|------|------|------|
| `--screen-max` | `1440px` | 데스크톱 화면 기준 폭 |
| `--content-max` | `1360px` | 콘텐츠 최대 폭(좌우 40px 여백 제외) |
| `--pad-desktop` | `40px` | 데스크톱 좌우 여백 |
| `--pad-mobile` | `20px` | 모바일 좌우 여백 |
| `--bp-tablet` | `768px` | 태블릿 분기점 |

**컨테이너 규칙**

```css
.container{ width:100%; max-width:1440px; margin:0 auto; padding-inline:40px; }
@media (max-width:767px){ .container{ padding-inline:20px; } }
```

- 데스크톱: 화면 1440 · 좌우 여백 40 · 콘텐츠 1360
- 모바일: 좌우 여백 20 · 콘텐츠 350
- 모든 배치는 **8px 그리드**를 기준으로 합니다.

### 헤더 / GNB 라인

헤더와 GNB의 가로 라인은 **콘텐츠는 가운데 정렬(1360)** 하되 **라인만 화면 전체 폭(full-bleed)** 으로 이어집니다.

| 위치 | 색상 | 두께 |
|------|------|------|
| 헤더(BI 행) 하단 구분선 | `#E5E5E5` (`--line`) | `1px` |
| GNB 메뉴 하단 라인 | `#1D1717` (`--ink`) | `2px` |

```css
/* 라인은 full-bleed, 내부 콘텐츠(.gnb-in)는 가운데 정렬 */
.full-bleed{ margin-inline:calc(50% - 50vw); }        /* 화면 전체 폭 */
.header-line{ border-bottom:1px solid var(--line); }  /* 헤더 회색 라인 */
.gnb-line{ border-bottom:2px solid var(--ink); }      /* GNB 검정 라인 */
```

> 라인이 좌우에서 끊겨 보이면, 라인을 가진 요소가 좌우 패딩(40px)이 있는 컨테이너 안에 갇힌 것입니다. 해당 요소에 `.full-bleed`(`margin-inline:calc(50% - 50vw)`)를 적용해 화면 끝까지 빼주세요.

### 푸터 (하단 고정)

콘텐츠가 짧아 화면을 다 채우지 못해도 **푸터는 항상 뷰포트 하단에 붙습니다.** `body`를 세로 flex로 만들고 푸터에 `margin-top:auto`를 줍니다.

```css
body{ min-height:100vh; display:flex; flex-direction:column; }
.footer{ margin-top:auto; }   /* 남는 공간을 밀어내 하단 고정 */
```

### 로케이션 (Breadcrumb)

모든 서브페이지 상단의 위치 경로(로케이션) 헤드는 **공용 컴포넌트**입니다.
페이지별로 스타일을 다시 정의하지 말고 아래 공용 클래스를 그대로 사용합니다.
(페이지별로 스코프하면 새 페이지에서 스타일이 누락되어 로케이션이 깨집니다.)

**구조**: 좌측 타이틀 + 우측 브레드크럼(홈 아이콘 · 구분점 · 현재위치 pill), `justify-content:space-between`.

| 항목 | 값 |
|------|------|
| 헤드 여백 | 위 `56px` · 아래 `24px` |
| 타이틀 | `--display`(Paperlogy) · **700(Bold)** · `32px` · `#1D1717` |
| 브레드크럼 글자 | `12px` · `#A9A9A9`(`--weak`) · 항목 간격 `8px` |
| 홈 아이콘 | `15 × 15` |
| 구분점 `·` | `#A9A9A9`(`--weak`) |
| 현재 위치 pill | 배경 `#F3F3F3` · `border-radius:9999px` · 패딩 `4px 12px` · 글자 `12px` · `#1D1717` |

```css
.pagehead{ padding:56px 0 24px; }                 /* 모든 서브페이지 공용 */
.ph-title{ font-family:var(--display); font-weight:700; font-size:32px; color:var(--ink); }
.crumb{ display:flex; align-items:center; gap:8px; font-size:12px; color:var(--weak); }
.crumb .home{ width:15px; height:15px; }
.crumb .sep{ color:var(--weak); }
.crumb .cur{ background:var(--gray-bg); border-radius:9999px; padding:4px 12px; color:var(--ink); }
```

> 교재상세는 `.dt-head`(하단 정렬형)로 감싸지만 동일 여백(`56px 0 24px`)과 동일 `.ph-title`·`.crumb`를 씁니다.

---

## 5. 폼 필드 (Input · Textarea)

입력 요소는 `.field` 클래스로 통일하며, 상태는 4가지입니다.
(정의: [`css/tokens.css`](css/tokens.css) → *Form fields*)

| 상태 | 조건 | 테두리 | 텍스트 | 배경 |
|------|------|--------|--------|------|
| **기본** | 비어 있음(placeholder) | `#E5E5E5` (`--line`) | placeholder `#A9A9A9` (`--weak`) | `#FFFFFF` |
| **입력됨** | 값이 있고 포커스 아님 | `#E5E5E5` (`--line`) | `#1D1717` (`--ink`) | `#FFFFFF` |
| **쓰는 중(focus)** | 포커스 상태 | `#1D1717` (`--ink`) · 우측 지우기(X) | `#1D1717` (`--ink`) | `#FFFFFF` |
| **쓰지 못할 때(disabled)** | `disabled` | `#F3F3F3` | `#A9A9A9` (`--weak`) | `#F3F3F3` (`--gray-bg`) |

- 공통: `radius 12px`, `padding 16px 20px`, `font-size 14px`, `hover` 시 테두리 `#C9C9C9`
- **textarea**: `.field.field-area`(또는 `textarea.field`) — `min-height 120px`, 세로 리사이즈
- 지우기(X) 버튼은 `.field-wrap`으로 감싸면 **포커스 시** 우측에 노출됩니다.

```html
<!-- 기본 / 입력됨 / 쓰는 중 (지우기 포함) -->
<div class="field-wrap">
  <input class="field" placeholder="이름을 입력해 주세요.">
  <button class="field-clear" aria-label="지우기"></button>
</div>

<!-- 비활성 -->
<input class="field" value="홍길동" disabled>

<!-- 텍스트박스 -->
<textarea class="field field-area" placeholder="내용을 입력해 주세요."></textarea>
```

> 실제 적용 예: [교재상세.html](교재상세.html) 후기 작성 모달의 제목(input)·내용(textarea).

---

## 6. 버튼 (Button)

모든 버튼 공통 규칙 (예외 없음):

- `font-size` : **14px**
- `font-weight` : **500 (medium)**
- 좌우 `padding` : **24px 고정**
- `border-radius` : **8px**

> 세로 padding은 버튼 크기에 따라 달라질 수 있으나, 위 네 가지(14px · medium · 좌우 24px · radius 8)는 모든 버튼에 동일하게 적용합니다.
> 기준 컴포넌트 `.btn`은 `padding:16px 24px`.
(정의: [`css/tokens.css`](css/tokens.css) → *Buttons*)

| 종류 | 클래스 | 배경 | 글자 | 용도 |
|------|--------|------|------|------|
| **Primary** | `.btn-primary` | `#E83828` (`--red`) | `#FFFFFF` | 등록 · 수정 · 바로구매 |
| **Dark** | `.btn-dark` | `#4D4E4D` (`--btn`) | `#FFFFFF` | 작성 취소 · 장바구니 |
| **Outline** | `.btn-outline` | `#FFFFFF` · 테두리 `#1D1717` | `#1D1717` | 목록 · 삭제 · 학습자료(교재구매 카드) |
| **Outline-Red** | `.btn-outline-red` | `#FFFFFF` · 테두리 `#E83828`(`--red`) | `#E83828` | 장바구니(교재구매 카드) |
| **품절(soldout)** | `.btn-soldout` / `:disabled` | `#D3D3D3` | `#FFFFFF` | 품절 · 비활성 (클릭 불가) |

### ★ 나란히 놓이면 항상 같은 크기

두 개 이상 버튼이 가로로 붙어 나오면 **폭·높이를 동일하게** 맞춥니다.

```html
<div class="btn-pair">
  <button class="btn btn-dark">작성 취소</button>
  <button class="btn btn-primary">등록</button>
</div>
<!-- 목록/수정, 장바구니/품절 등도 동일 -->
```
```css
.btn-pair{ display:flex; gap:8px; }
.btn-pair .btn{ flex:1 1 0; }   /* 동일 폭 */
```

- 폭이 유동일 땐 `flex:1 1 0`, 콤팩트한 목록형 버튼은 동일 `min-width`로 맞춥니다.
- 품절 상품은 `바로구매` 버튼을 `품절`(`.btn-soldout`)로 바꾸고, `장바구니`는 그대로 둡니다.

> 실제 적용 예: [교재상세.html](교재상세.html) 후기 모달(작성 취소/등록·목록/수정·삭제), [리스트_교재구매.html](리스트_교재구매.html) 품절 상품(장바구니/품절).

**교재목록 리스트 카드 버튼 (`.pbtns`, 2026-07-30)** — 카드 하단 3버튼:
`학습자료`(`.study`, 아웃라인 `#4D4E4D`·글자 `--ink`) · `장바구니`(`.cart`, **빨강 아웃라인** 테두리·글자 `--red` = `.btn-outline-red`) · `바로구매`(`.buy`, 빨강 채움). 일시품절 카드는 `바로구매`→`일시품절`(회색 비활성), 절판 카드는 단독 `절판`(회색).
**학습자료 리스트 카드** 는 **교재 커버 이미지 우하단에 반쯤 걸치는 검은 원형 장바구니 버튼**(`.pcover-cart` — 48px 원 배경 `--ink` + 흰 카트 아이콘 `ic_cart_black.svg` 20px)을 오버레이한다. 왼쪽 절반은 커버 위, 오른쪽 절반은 회색 여백에 놓이며 **회색 박스(`.pcover`) 밖으로는 나가지 않는다**(overflow:hidden 유지, `right:40 / bottom:22`로 커버 우하단 코너에 위치). 카트 `<img>`는 커버 이미지용 `.page-study .pcover img{width:148px}` 규칙에 걸리지 않도록 `.pcover .pcover-cart img{width:20px}`로 명시도를 높인다.

---

## 7. 라벨 알약 (Label Pill · Badge)

내용을 **표시(라벨링)** 하는 알약 모양 칩/뱃지는 **안쪽 패딩을 항상 `4px 12px`(위아래 4px · 좌우 12px)** 로 통일합니다. (예외 없음)

| 항목 | 값 |
|------|------|
| 안쪽 패딩(상하) | **`4px`** |
| 안쪽 패딩(좌우) | **`12px`** |
| 모서리 | `border-radius:9999px` (완전 둥근 알약) |
| 글자 | 기본 `12px` |

```css
.label-pill{ padding:4px 12px; border-radius:9999px; font-size:12px; }
```

- 적용 대상(표시용 라벨/뱃지): 구분 라벨(`.gubun` 전체/회원/선생님), 상태 뱃지(`.badge`·`.badge-course`·`.badge-level`·`.badge-lexile`), 품절(`.soldout-badge`), 기본 배송지(`.ai-badge`), 브레드크럼 현재 위치(`.crumb .cur`), 프로모 라벨(`.bs-promo .label`), 안내 태그(`.dh-notice .msg .tag`) 등.
- **제외**(클릭 가능한 알약형 컨트롤): 탭 알약(`.bs-tabs .tab` 8/24, `.ship-tabs a` 6/20), 필터 칩(`.rfilter a`), 선택 드롭다운(`.cur-wrap .cur`), 페이지네이션 원형 셀(`.pager a`). 이들은 컨트롤이므로 별도 규격을 씁니다.

### 7-1. 모바일·태블릿 컴팩트 배지 (≤1023px, Figma 2016-10632) ★2026-08

**모바일·태블릿(≤1023px)에서는 데스크탑(12px)보다 작은 컴팩트 규격**을 씁니다. **좌우 패딩은 공통 8px**(상하 4px). PC(≥1024)는 위 §7 기본 규격(12px·좌우 12px) 유지.

**① 교재 관련 라벨 (통일 토큰)** — **9px · SemiBold(600) · `line-height:1` · `border-radius:999px` · 패딩 상하4·좌우8 · 가로 auto** → **색만 다르고 높이 전부 17px 동일**. (2026-08 통일)
| 라벨 | 색 | 테두리 |
|------|------|------|
| HOT | 배경 `#E83828` · 흰 글자 | 없음 |
| NEW | 배경 `#2F74D1` · 흰 글자 | 없음 |
| 절판 · 일시품절 | 배경 `#999` · 흰 글자 | 없음 |
| Coursebook · Phonics | 아웃라인·글자 `#E83828` | **1px** |
| 유치~초등(저) | 배경 `#F3F3F3` · 글자 `#666` | 없음 |
| Lexile® 400L | 아웃라인·글자 `#2F74D1` | **1px** |

> **테두리 라벨(Coursebook·Phonics·Lexile·sr-cat·mb-badge)은 `border` 대신 `outline` 사용**(outline은 레이아웃 높이에 영향 없음) → **여백 상하 4px 그대로**이면서 무테두리 라벨과 **높이 정확히 동일(17px)**. `border:0; outline:1px solid; outline-offset:-1px`(outline 색 = `currentColor` = 글자색). (`box-sizing:border-box; display:inline-flex; align-items:center`)

적용(전 페이지 공통 — 리스트·상세·찜·홈·검색·시리즈): `.pcorner`·`.sr-corner`·`.mc-badge`(상태) · `.mc-tag`(리스트 course/level) · `.sr-cat`(검색 카테고리) · `.mb-badge`(찜/홈) · `.badge-course/.badge-level/.badge-lexile` · `.badge.course/.badge.level/.badge.lexile`(상세) · `.page-detail .dh-badges .badge`. 구현: `css/layout.css` `@media (max-width:1023px)` 상단 "교재 라벨 디자인 토큰" 블록 하나로 통합.

**② 구분 배지** — `border-radius:30px`(=완전 둥금), 패딩 `4px 8px`, **10px SemiBold(600)**
| 그룹 | 예 | 색 |
|------|------|------|
| 빨강 | 공지·이벤트·신간·개정·세미나·신간·회원 | 아웃라인·글자 `#E83828` |
| 회색 | 공통·초중고(영어)·교재/ELT·ELT·수험/일반·수학/국어·교과서 관련 | 아웃라인·글자 `#A9A9A9` |
| 지역 | 서울·경기·인천·강원·제주·충청·경상·전라 | 배경 `#F3F3F3` · 글자 `#666` |
| 검정 | 전체 | 아웃라인·글자 `#1D1717` |
| 파랑 | 선생님 | 아웃라인·글자 `#2F74D1` |

적용: `.gubun`(전체/회원/선생님) · `.badge` · `.ev-badge`(이벤트 유형) · `.rv-badge`(후기 분류).

**신간 라벨**(`.mega-new`, GNB·햄버거 펼침메뉴 시리즈): 구분 배지 빨강 규격(10px SemiBold · 4px 8px · radius 30 · 아웃라인/글자 `#E83828` · 흰 배경) + **깜빡임**(`megaNewBlink` 1.1s, opacity 1↔0.25 반복). 신간 시리즈 목록은 `js/layout.js`의 `NE_MEGA_NEW`.

> 구현: `css/layout.css`의 `@media (max-width:1023px)`(모바일) / `@media (min-width:1024px)`(PC) "교재 라벨 디자인 토큰" 블록.

### 7-2. PC 교재 라벨 (≥1024px) ★2026-08

PC에서도 교재 라벨 통일. **좌우 12 · `radius:999` · `line-height:1` · 가로 auto · 색만 차이**. **세로 여백은 그룹별로: 카테고리 `6px` / 상태(HOT·NEW·절판·일시품절) `4px`.** 테두리 라벨은 `border` 대신 `outline`(높이 미영향, `outline-offset:-1px`) → 여백 그대로이면서 무테두리와 높이 동일.

| 그룹 | 폰트 | 세로여백 | 높이 | 대상 |
|------|------|------|------|------|
| **교재 카테고리** | **12px** (500) | 6px | 24px | Coursebook·Phonics·유치~초등(저)·Lexile — `.badge-course/.badge-level/.badge-lexile`·`.sr-cat`·`.mb-badge`·`.badge.course/.level/.lexile`·`.page-detail .dh-badges .badge` |
| **상태** | **10px** Bold(700) | 4px | 18px | HOT·NEW·절판·일시품절 — `.pcorner`·`.sr-corner` |

- Lexile ⓘ 아이콘은 `12px`(텍스트와 동일)로 맞춰 높이 어긋남 방지.

---

## 8. 페이지네이션 (Pagination)

| 항목 | 값 |
|------|------|
| 셀 크기(숫자·화살표 공통) | **36 × 36** |
| 항목 간격 | **4px** |
| 숫자(기본) | `#A9A9A9` (`--weak`) |
| 숫자(hover) | `#1D1717` (`--ink`) |
| 활성(현재 페이지) | 배경 `#1D1717` · 글자 `#FFFFFF` · 원형(`border-radius:9999px`) |
| 화살표(‹ ›) | 색 `#666666` (`--muted`) · `font-size 18px` |

```css
.pager{ display:flex; align-items:center; justify-content:center; gap:4px; }
.pager a{ width:36px; height:36px; display:flex; align-items:center; justify-content:center;
  font-size:14px; color:var(--weak); border-radius:9999px; cursor:pointer; }
.pager a:hover{ color:var(--ink); }
.pager a.on{ background:var(--ink); color:#fff; font-weight:700; }
.pager .arw{ color:var(--muted); font-size:18px; }
```

---

## 9. 탭 (Tab)

두 가지 탭 유형을 사용합니다.

### 9-1. 알약 탭 (Pill) — 페이지/화면 전환용
마이페이지 대탭, 도서 리스트 탭(`.bs-tabs .tab`), 배송 상태 탭(`.ship-tabs a`) 등. 텍스트가 알약 배경 안에 들어가며 활성 시 배경이 채워집니다.

| 항목 | 값 |
|------|------|
| 글자(기본) | `14px` · `#666666` (`--muted`) |
| 활성 | 배경 `#1D1717` · 글자 `#FFFFFF` · Bold · 알약(`border-radius:9999px`) |
| 패딩 | `8px 20~24px` |

### 9-2. 밑줄 탭 (Underline) — 목록 내부 필터용 ★신규
같은 목록 안에서 데이터만 걸러내는 하위 탭(예: 포인트 내역 **전체 / 적립 / 사용 / 소멸**). 배경 없이 **텍스트 + 활성 하단 밑줄**만 사용합니다.

| 항목 | 값 |
|------|------|
| 글자(기본) | Medium `14px` · `#A9A9A9` (`--weak`) |
| 글자(활성) | Bold `14px` · `#1D1717` (`--ink`) |
| **hover** | **활성과 동일**: Bold `#1D1717` + 하단 `3px solid #1D1717` |
| 활성 밑줄 | 하단 `3px solid #1D1717` |
| 탭 간격 | `32px` |
| 정렬 | 하단 정렬(`align-items:flex-end`) |

```css
/* 구현: 마이페이지 포인트 탭 .pt-tabs */
.tab-underline{ display:flex; gap:32px; align-items:flex-end; }
.tab-underline a{ font-size:14px; font-weight:500; color:var(--weak);
  padding-bottom:6px; border-bottom:3px solid transparent; cursor:pointer; line-height:1; }
/* hover 시에도 선택과 동일한 효과 */
.tab-underline a.on,.tab-underline a:hover{ font-weight:700; color:var(--ink); border-bottom-color:var(--ink); }
```

> 목록 상단 배치 시: 왼쪽에 밑줄 탭, 오른쪽에 기간/필터 컨트롤을 두고 `justify-content:space-between; align-items:flex-end` 로 정렬.

---

## 10. 레이어 팝업 (모달)

화면 전체를 덮는 **레이어 팝업(모달)의 큰 박스는 안쪽 패딩을 항상 `40px`** 로 통일합니다. (예외 없음)

| 항목 | 값 |
|------|------|
| 박스 안쪽 패딩(상하좌우) | **`40px`** |
| 박스 모서리 | `border-radius:16px` |
| 배경(딤) | `rgba(13,13,13,.45)` |
| 타이틀 | `--display`(Paperlogy) · `700` · `24px` |
| 닫기(X) | `24×24`, 선 `#1D1717` |

```css
.modal-box{ background:#fff; border-radius:16px; padding:40px; }   /* 큰 박스 안 패딩은 항상 40px */
```

- 내용이 길어 스크롤이 필요하면 **타이틀은 고정**하고 그 아래 **본문 영역만** 스크롤시킵니다.
  박스를 세로 flex(`display:flex;flex-direction:column;max-height:80vh`)로 만들고, 타이틀 헤더는 `flex:none`,
  본문은 `flex:1;min-height:0;overflow-y:auto` 로 처리합니다.
- 적용 예: 후기 작성 모달([교재상세.html](교재상세.html)), 최근 배송지·이용규정 및 환불 안내 팝업([주문결제.html](주문결제.html)).

> 화면에 고정 앵커되는 작은 드롭다운/툴팁(공유 팝오버, Lexile 안내 등)은 여기서 말하는 "레이어 팝업 큰 박스"가 아니며 별도 패딩을 사용합니다.

---

## 12. 컴포넌트 전용 액센트 색상

범용 색이 아니라 **아래 컴포넌트에서만** 쓰는 값입니다(고객센터·문의 모듈). 라인 컬러는 여전히 `--line`(#E5E5E5)이 기본이며, 아래는 예외적으로 지정된 경우입니다.

| 토큰 | 값 | 용도 |
|------|------|------|
| `--check` | `#D94A34` | 체크박스 흰 체크 배경 |
| `--answer` | `#2F74D1` | FAQ 아코디언 답변(A) 마커(파랑) |
| `--border-2` | `#C4C4C4` | 보조 테두리 · 유형/분류 배지 아웃라인 |
| `--captcha-bg` | `#EAEAEA` | 자동등록방지 코드 박스 배경 |

---

## 13. 셀렉트 드롭다운 (`.oh-sel`)

기간/분류/상태 선택 등에 쓰는 커스텀 셀렉트. h44 · radius 8 · 테두리 `--line`.

| 상태 | 규칙 |
|------|------|
| 펼침(open) | **테두리 `--ink`(#1D1717)**, 메뉴 박스도 `--ink` 테두리(위쪽 열림) |
| 미선택(placeholder) | 라벨 색 `--weak`(#A9A9A9) — "…선택해 주세요" 문구일 때 |
| 값 선택 후 | 라벨 색 `--ink` |
| 메뉴 항목 | 색 `--muted`(#666), hover 시 `--gray-bg` 배경 |

> placeholder 판별은 옵션에 `data-ph` 표시. 폭은 상황별(140/200/320/flex)로 지정.

---

## 14. 목록 표 (게시판형)

공지사항·교재 오류정정·마이페이지 문의 등 공통 규칙.

| 요소 | 규칙 |
|------|------|
| 헤더(th) | 배경 `--gray-bg`, 상하 `--line`, 높이 50, **Bold `--ink`**, 가운데 정렬(제목 라벨 포함) |
| 데이터 행 | 높이 54, 하단 `--line`, hover `#FAFAFA`, 커서 pointer |
| 분류 | **기본 굵기(400) · `--muted`(#666)** |
| 제목 | **두껍게(600) · `--ink`** · 좌측 정렬 |
| 상세 라벨/값 테이블 | 라벨 셀 폭 160 · `--gray-bg` · Bold |

---

## 15. 아코디언 (FAQ · 클릭 펼침 목록)

질문 행 클릭 → 답변 펼침. **Q 마커 `--red`(#E83828) · A 마커 `--answer`(#2F74D1)**, 둘 다 SemiBold 16.
답변 패널은 `padding:40px 80px`. chevron은 열림 시 180° 회전.

- **헤더(th) 행 없음**: `NO/분류/제목` 회색 헤더 박스는 쓰지 않습니다. 목록은 필터 바로 아래에서 바로 첫 행으로 시작합니다.
- **상단선은 진하게**: 목록 맨 위 경계선은 `.faq-table`의 `border-top` = **`--ink`(#1D1717)**. 행과 행 사이 구분선(`.faq-item`의 `border-bottom`)은 **`--line`(#E5E5E5)**. → 상단만 진한 두톤 처리.
- 각 행은 `NO(80) · 분류(140) · Q+제목(flex)` + 우측 chevron.
- 이 **헤더 없는 클릭-펼침(아코디언) 형태**를 클릭 시 아래로 펼쳐지는 목록의 표준으로 사용합니다.

---

## 16. 폼 요소 (1:1 문의)

| 요소 | 규칙 |
|------|------|
| 라벨 행 | 라벨 160 · `--gray-bg` · Bold, 필수 `*`는 `--red`, 세로 가운데 정렬 |
| 라디오 | 18×18, 선택 시 테두리+점 `--red` |
| 체크박스 | 18×18 radius 5, 선택 시 배경 `--check`(#D94A34) + **가운데 정렬 흰 SVG 체크**(테두리형 ::after 금지) |
| 인풋 X(clear) | `.iq-clear` 지정 시 값이 있을 때만 우측 X 노출 |
| 자동등록방지 | 코드 박스 배경 `--captcha-bg` · 글자 `#7A7A7A` tracking 4 + 새로고침 + 입력 |
| 개인정보 동의 | **테두리만(bg 없음) 스크롤 박스**(고정 높이 + `overflow-y:auto`) + 동의 체크박스 |
| 하단 | 필수 안내 텍스트는 테이블 바로 아래(상단 정렬), 목록/등록 버튼은 우측 유지 |

---

## 17. 자동완성 레이어 (교재/GNB 검색)

입력 시 `.search-pop` 레이어: **좌측 제목 리스트 + 우측 커버 미리보기**(호버 시 이미지·제목 변경).
교재명 검색은 팝업 폭 = 입력창 폭(100%), 리스트:미리보기 **1:1**. 선택 시 셀렉트+인풋+검색버튼 → 커버+교재명+삭제로 전환.

---

## 18. 이벤트/세미나 카드 그리드

3열 그리드(`gap:40px 24px`). 카드 = 썸네일(`.ev-thumb`) + 배지 2개 + 제목 + 설명 + 상태.

| 요소 | 규칙 |
|------|------|
| 썸네일 크롭 | **원본 이미지는 세로 긴 `7:8` 비율(리스트 437×499).** 목록 카드에서는 **가로 짧은 프레임 `aspect-ratio:437/280`, `radius 16`** 에 `object-fit:cover; object-position:top` 으로 담아 **원본 상단 437×280만** 노출(하단 218 잘림). 신간/이벤트/세미나 카드 공통. 구현: `.ev-thumb` / `.ev-thumb img` (layout.css). |
| 이미지 소스 규격(공용 1장) | **메인 롤링 배너**: `350×400`(7:8) 전체 노출 · radius 16 / **이벤트·신간·세미나 리스트**: `437×499`(7:8), 상단 `437×280` 노출(하단 218 잘림) · radius 16. 핵심요소(제품·타이틀·로고)는 **원본 상단**에 배치. |
| 모바일 카드 폭 | `#tab-event .ev-thumb`는 모바일에서도 **`437/280` 비율 유지 + object-position:top**(화면이 넓어져도 비율 그대로), 단 **`max-width:437`** 로 설계폭 초과 확대 방지(휴대폰은 폭에 맞춰 축소). |
| 유형 배지 | 아웃라인 `--red` · 글자 `--red` · radius 9999 · 12px |
| 분류 배지 | 아웃라인 `--border-2` · 글자 `--muted` |
| 제목 | `--display`(Paperlogy) Bold 22 · `--ink` |
| 상태 | 진행중·당첨자발표 = `--red` SemiBold, 종료 = `--muted` / 기간 = `--muted` |

---

## 19. GNB 유틸 드롭다운 (MY · 고객센터) & 장바구니 뱃지

헤더 우측 아이콘(MY · 고객센터)에 **마우스오버 시 아래로 펼쳐지는 메뉴**.

| 요소 | 규칙 |
|------|------|
| 로그인 아이콘(`.head-ic` 로그인) | 아이콘 그룹 **맨 앞**에 원+화살표 아이콘(`ic_login_d.svg`) + `로그인` 라벨. **비로그인 상태** 표기(로그인 후엔 MY·장바구니·고객센터 노출). 지금은 인증 미연동이라 로그인·MY 함께 노출, 링크 `index.html` |
| 드롭다운(`.my-drop`) | 흰 박스 · radius 12 · padding 25 · 그림자, 항목 `--muted`(hover `--ink`) 14px |
| 호버 끊김 방지 | 아이콘↔메뉴 6px 간격을 투명 브릿지(`.my-drop::before`, h10)로 이어 연속 호버 |
| 고객센터(`.cs-drop`) | GNB 오른쪽 끝이라 **우측 정렬**(`right:0`)로 화면 밖 넘침 방지 |
| 펼침메뉴 링크 동작 | 대상 페이지(마이페이지·고객센터)에 **이미 있을 때도** 링크 클릭 시 탭이 전환되도록, 로드 시뿐 아니라 `window.onhashchange`로도 해시→탭 활성 처리 |
| 장바구니 뱃지(`.cart-badge`) | 아이콘 우상단 빨강 원형 + 흰 숫자. 수량 0이면 숨김, 99 초과 `99+`. `window.CART_COUNT`로 수량 지정 |

> 뱃지 글자색은 `.head-ic span`(라벨용 `--ink`)보다 명시도가 낮으면 검게 나오므로 `.head-ic .cart-badge`로 지정.

---

## 20. 별점 선택 (후기 작성)

★ 5개 클릭형(`.rw-star`) — 기본 `#d9d9d9`, 선택 시 `--red`(#E83828). 옆에 `n.0 / 5.0` 점수와 안내 문구(`* 해당 교재의 평점을 선택해주세요.`).

---

## 21. 후기 목록 (아코디언) & 후기 작성·수정

두 곳의 후기 목록 모두 **클릭 시 인라인 펼침**(FAQ와 동일 UX). 행 구분선 `--line`, chevron은 펼침 시 180° 회전.

### 21-1. 교재상세 후기(`.rev-*`) — 인라인 펼침
과거 레이어 팝업(상세 모달) 방식에서 **인라인 아코디언**으로 전환(마이페이지 후기와 동일하게 리스트를 눌러 펼침).

| 요소 | 규칙 |
|------|------|
| 항목(`.rev-item`) | 하단 구분선 `--line`. 행 클릭 시 `.open` 토글 + 펼침 표시 |
| 행(`.rev-row`) | 별점(`--red`) + 제목(Bold `--ink`) · 우측 유저(`--muted`)/날짜(`--weak`) · chevron. **회색 썸네일 없음**(펼치면 이미지가 나오므로 리스트에선 생략) |
| 펼침(`.rev-detail`) | **상단 구분선 `--line`(제목↔내용 사이)** + 상하 패딩 24. 본문(`--muted` 14) + 첨부 이미지(max-w 400, radius 8) |
| 후기 작성하기(`.rev-write`) | **'선택 장바구니 담기'와 동일 아웃라인 버튼** — 배경 투명 · `1px solid #4D4E4D` · `--ink` · radius 8 · padding 16/24. → `후기작성.html?from=book` |

### 21-2. 마이페이지 후기(`.rv-*`) & 작성·수정 폼
| 요소 | 규칙 |
|------|------|
| 행 헤더(`.rv-q`) | 분류 배지(알약 `--border-2`) + 교재명(`--muted`) · 가운데 ★(`--red`) + 제목(Bold `--ink`) · 우측 날짜(`--weak`) + chevron |
| 펼침(`.rv-a`) | 본문(`--muted`) + 첨부 이미지 + 우측 **수정·삭제 버튼(둘 다 `--border-2` 아웃라인)**. 본문↔버튼 간격 24 |
| 작성(`후기작성.html`) | 안내 박스 우측 빨강 버튼으로 진입. 폼: 상품명(교재검색) / 별점 / 제목 / 내용 / 상품이미지 |
| 수정(`후기수정.html`) | **수정** 버튼으로 진입. 작성폼과 동일하되 **안내박스 없음** · 상품명 **선택완료 상태**(`.iq-bk-selected`) · 값 프리필 · 첨부파일 표시. 하단 **취소(`.iq-btn-cancel`, 차콜 채움 `--btn`) + 등록(빨강)** |
| 첨부 표시 상태 | `.iq-file-name.has-file`(글자 `--ink`) 우측에 `.iq-file-del`(삭제 ✕) — 클릭 시 첨부 해제 |
| 진입경로별 복귀 | 교재상세에서 온 작성(`?from=book`)은 등록 후 **교재상세 후기(`#s-review`)**, 마이페이지에서 온 작성/수정은 **마이페이지 후기 목록(`마이페이지.html#review`)**으로 이동 |

---

## 22. 라벨별 상세 & 세미나 신청 팝업

이벤트/신간·개정/세미나 카드 → 유형 배지 기준으로 각 상세로 라우팅.

| 요소 | 규칙 |
|------|------|
| 상세 라벨/값 테이블(`.ev-d-*`) | 라벨(160 `--gray-bg` Bold)/값(`--muted`) + 관리자 등록 이미지 본문 + 목록 버튼. 표 하단 겹선 방지: `.nd-table>*:last-child{border-bottom:none}` |
| 세미나 분할행(`.ev-d-split`) | 좌 **장소** / 우 **기간·강사 세로 스택** |
| 세미나 신청 버튼 | 본문 하단 빨강 버튼 → 세미나 신청 팝업 |
| 세미나 신청 팝업(`.sm-*`) | 레이어 팝업(패딩 40·타이틀 24). 인풋 `.iq-in`·셀렉트 `.oh-sel` 사용, 위아래 여백 16. 취소하기(아웃라인)+등록하기(빨강) |

---

## 23. 취소 팝업 (결제취소 · 입금취소)

주문내역 상태 버튼(결제취소·입금취소)에서 열리는 `.cx-*` 레이어 팝업(패딩 41·타이틀 22·라벨 108 `--gray-bg`). 버튼 = 취소하기(아웃라인)+등록하기(빨강).

- **결제취소**(카드·계좌이체·간편결제) : 취소사유 + 환불계좌(은행선택+계좌) + 예금주명
- **입금취소**(무통장 입금대기) : 취소사유만

---

## 24. 빈 상태 화면 (검색 결과 없음 · 장바구니 비어있음)

공용 `.no-result` — 세로 중앙 정렬, gap 24.

| 요소 | 규칙 |
|------|------|
| 아이콘 | `92×92` 원형 배경 `--gray-bg`, 안에 회색 `!` (SVG, `#d1d1d1`) |
| 타이틀 | `24px` Bold `--ink` |
| 서브 | `14px` `--weak` |
| 버튼(장바구니용) | `.nr-btn` — 빨강 `--red`, 흰 글자, h52·min-w234 (예: `쇼핑계속하기`) |

- **검색 결과 없음**: `리스트_교재구매.html?q=` 로 진입해 매칭이 없으면 리스트·페이징 숨기고 `.no-result` 표시 + `총 0개 상품`. GNB 검색 Enter/돋보기도 이 결과 페이지로 이동.
- **장바구니 비어있음**: 상품 전부 삭제 시 `.cart-empty`(=`.no-result` + `쇼핑계속하기` 버튼) 노출.

---

## 25. 환불 문의 상품·수량 선택 표 (1:1문의 · 회원) ★개편 2026-08

회원 1:1문의(고객센터 `#qna`, `.page-my`)에서 **① 상담유형=주문·배송 관련 문의 → ② 상담분류=취소/환불 선택** 시에만 `주문번호/상품` 안에 **`문의 상품 선택` 버튼(`#iqPickBtn`, `.btn-line`) + 안내문**(`* 원활한 상담을 위한 상품 선택으로 본 페이지에서 바로 반품/환불처리가 되지 않습니다.`)이 노출(`.iq-order-pick`). **버튼 클릭 시** `.pr-refund` 표가 펼쳐짐. (비회원문의는 미적용)

| 요소 | 규칙 |
|------|------|
| 노출 게이팅 | 상담분류 라벨이 `취소/환불`일 때만 버튼 노출(JS `syncPick`), 분류 변경 시 표도 숨김 |
| 헤더 | `환불 문의 상품·수량 선택`(Bold 14) + 안내문(`--weak` 12) 인라인 |
| 표 틀 `.pr-table` | **박스 테두리 없음(좌우 세로선 X)**, 가로 구분선만(`.pr-item{border-top:1px --line}`). 스크롤 없이 **전체 행 노출** |
| 열 | 3열 grid `140px / 1fr / 220px` = `선택`·`상품명`·`수량`(헤더 회색바 `--gray-bg` h52, 라벨 중앙정렬 Bold) |
| 행 `.pr-item` | 체크박스(선택 시 `--red`+흰 체크, 20px) + 상품명(좌측, 미선택 `--muted`·선택 `--ink`) + 스텝퍼(중앙) |
| 스텝퍼 | 3칸(−·수량·+) 각 36, 칸 구분선 `--line`, 미선택 시 수량 0·`#c9c9c9` |
| 합계 푸터 `.pr-foot` | 회색바(`--gray-bg` h60), 좌 `문의 상품 수량 합계`(Bold) · 우 값(`#prTotal`, Bold 16) = 체크된 행 수량 합계 |

---

## 26. 지사안내 표

고객센터 지사안내 탭(`#cc-branch`). 안내 박스(`.iq-preinfo`) + 필터(`.qa-filter` = 밑줄탭 + 지역 `.oh-sel`) + `.br-table` + 페이지네이션.

| 요소 | 규칙 |
|------|------|
| 안내 박스 | 좌 안내문구 / 우 `고객센터 1833-8368`(`--red` 20 Bold) + 이용시간 |
| 표 컬럼 | `grid 120 / 160 / 160 / 240 / 1fr` = 구분·담당지역·지사명·전화·주소 |
| 헤더(th) | 배경 `--gray-bg`, 높이 50, Bold 가운데 |
| 데이터 행 | 높이 54, 하단 `--line`, **주소만 좌측 정렬**·나머지 가운데 |
| 지역 셀렉트 | 지역 전체 · 서울 · 경기·인천 · 강원 · 충청·대전·세종 · 경상·부산·대구 · 전라·광주 · 제주 |

---

## 27. 스티키 푸터 (짧은 페이지 하단 고정)

`body`는 `min-height:100vh; display:flex; flex-direction:column`. **직접 flex 자식인 `#site-footer`에 `margin-top:auto`** 를 줘야 짧은 페이지에서도 푸터가 하단에 붙는다. (`.footer` 안쪽 요소에 주면 동작 안 함)

---

## 28. 사용법

각 페이지 `<head>` 에서 인라인 `<style>` 보다 먼저 링크합니다.

```html
<link rel="stylesheet" href="css/tokens.css">
```

이후 스타일에서 값 대신 토큰을 사용합니다.

```css
.price      { color:var(--red);  font-size:var(--fs-h3); }
.desc       { color:var(--muted);font-size:var(--fs-base); }
.card       { background:var(--gray-bg); padding:var(--sp-24); }
.divider    { border-top:1px solid var(--line); }
```

---

## 29. 모바일 반응형 컴포넌트 (≤767px, 2026-08)

`@media (max-width:767px)` 공통. `.only-mo`(기본 `display:none` → 모바일 노출) / `.only-pc`(모바일 `display:none !important`). **모바일 전용 요소는 전역에서 `display:none` 먼저 선언**해야 PC로 새지 않음.

**공용 헤더 (js/layout.js)**
- GNB 74px sticky, 스크롤 방향 자동 숨김(아래로=숨김 / 위로=표시+그림자).
- 서브GNB 카테고리 드롭다운 `.mcat-panel`(fixed top:74 풀폭·하단 라운드 20+그림자·항목 11/40, 활성=현재 카테고리 볼드), dim `.mcat-dim`은 `top:74`. 펼침 시 우측 아이콘 검색/장바구니/닫기(X).

**교재상세**
- 하단 플로팅 CTA `.pdp-bar`(찜하기·장바구니 담기·**구매하기**). **푸터 도킹**(스크롤 시 푸터 위 20px, `.docked` 그림자 제거).
- **수량선택 바텀시트 `.qty-sheet`**(구매하기 탭): 라운드 12, 그래버 40×4 #ccc, 제목 Paperlogy 22, 스테퍼 `.qty-step`(100×36) + 금액(단가×수량), 전체폭 빨강 구매하기. dim/그래버/ESC 닫힘.
- **렉사일 바텀시트 `.lex-sheet`**: 라운드 20, 그래버, 제목 22/lh26.4, 본문 14/lh22 + 학년별 표.

**장바구니 (모바일)**
- 상품행 grid-area 리플로우: `"thumb title del" / "thumb qty price"`. 회색박스 썸네일 105×105(책 55×72), **체크박스는 썸네일 좌상단 오버레이**. 하단 스테퍼 100×36 + `10%`/단가.
- 상단바 = 전체선택 + **삭제** 단일. PC 요약 사이드바 미노출 → 하단 고정 CTA `.cart-cta`(빨강 `총 N원 주문하기`, 푸터 도킹).
- **빈 장바구니 `.cart-empty`**(모바일): 회색 원 80 + `!` 아이콘, 타이틀 14 SemiBold, 서브 12 #a9a9a9, 빨강 버튼 234·radius10·16 Bold, `min-height:550` 중앙. 빈 상태 시 상단바·안내문·CTA 숨김(`body.cart-is-empty`).
- **확인 팝업 `.cart-modal`**: 흰 박스 radius16·pad32/24, 메시지 16, [취소(아웃라인)]·[삭제(빨강)] 48h. 토스트 `.cart-toast`(하단 알약). 삭제확인·품절주문차단·절판 자동삭제 안내에 재사용.

**목록 더보기 `.mo-more`**(모바일): 기본 10개 + `10개 더보기(N/414)` 버튼(전체폭·테두리 #4D4E4D·Pretendard Medium 14·radius12). PC는 페이징 유지.

**주문상세 상태 버튼 `.od-status-btns`**: 상태 라벨 아래 목록과 동일한 `.oh-btn`(콘텐츠 폭·높이 36) 세로 배치.

**주문결제 (모바일, `.page-order`)** — Figma 1856-3800 / 2170-14061
- **아코디언 카드 스택**: PC 2단(`.co-main`+`.co-side`)을 모바일에서 `.co-main,.co-side{display:contents}` + `.co-grid{display:flex;align-items:stretch}` 로 평탄화하고 `order`로 Figma 순서 재배열(주문상품→주문자→배송지→할인→결제수단→주문금액→결제수단안내→이용규정). ⚠️ `.co-grid` 기본 `align-items:start`가 flex에선 섹션을 콘텐츠폭으로 만들어 우측 회색이 새므로 **`align-items:stretch` 필수**.
- 섹션 = 흰 배경, **상하 padding 24 · 사이 1px 회색라인(#e5e5e5)**. 헤더 탭 → 펼침/접기(chevron CSS 보더), 결제수단 안내만 기본 접힘. **기본 폰트 14 / 행간 22**.
- 섹션 타이틀 **Paperlogy 18px**. 주문자 정보·주문완료 정보 = **읽기전용 라벨/값**(라벨 볼드 #1D1717 / 값 #666, 라벨열 88px). 주문상품 카드: 썸네일 105×105(책 56×73), 우하단 `수량 2개 ┃ 27,000원`(금액 Paperlogy 18 빨강, 구분선 `::before` 1×14 가로·세로 정중앙).
- 결제수단 3열 박스: 미선택=회색테두리·글자 #666 기본굵기, 선택=1px 진한 테두리·글자 볼드 #1D1717, 폰트 14, 상하 padding 24.
- 하단 결제 CTA `.order-cta`(빨강 안내문+버튼): 약관 체크 전 `.is-disabled`(회색) → 체크 시 빨강, 푸터 20px 위 도킹. 안내문 위/버튼 아래 여백 24.

**모바일 바텀시트(렉사일 틀 재사용)**: 중앙 모달(`.terms-modal`·`.addr-modal`)을 `@media`에서 **아래→위 슬라이드 시트**로 전환 — `translateY(100%)→0`, 그래버 40×4 #ccc, dim rgba(0,0,0,.4), 라운드 20 0 0, **z-index 1100(하단 CTA 900 위)**, X버튼 숨김, 그랩/딤/ESC 닫힘 + `body overflow:hidden`, 스크롤바 숨김. 내용은 PC와 동일. 최근배송지 카드=흰 배경·1px 회색테두리·pad24, 이름14 볼드/주소14 #a9a9a9.

**주문완료 (모바일, `.page-done`)** — Figma 2182-14875
- 성공 히어로(빨강 원 체크 88 + Paperlogy 22 타이틀 + #666 안내 + 주문번호 회색 pill), 결제/배송 = 라벨/값 리스트(PC 회색 테이블→평문). **하단 액션버튼 미노출**.
- **유의사항 `.oc-notice` = 회색 전체 박스**(#F3F3F3, pad 40/20), 타이틀 14 볼드·본문 12 #666·간격 16. `cowrap` 하단 패딩 0(박스가 푸터에 붙음), 위 섹션 border 제거.

**마이페이지 홈 (모바일, `.page-my`)** — Figma 2175-15398
- PC 탭 레이아웃 → 모바일은 **탭 숨김 → 홈 허브**(섹션별 `›` chevron 링크로 이동). 섹션 타이틀 Paperlogy 18, **타이틀 위 여백 40**, 흰 배경.
- 인사 배너 `.my-hello`(핑크 그라데이션, 풀폭): 이름+회원정보수정(알약) 한 줄 + 통계 4카드(문의·답변·세미나·후기).
- 주문현황 `.os-row`·포인트 `.pt-row`·최근본학습자료 `.res-grid` = **테두리 박스 안 여백 24**, 최근본학습자료 행 사이 16·구분선 없음. 포인트는 라벨 좌/값 우.
- 찜한 상품·최근 본 상품 `.mb-grid` = **가로 스크롤**(카드 160px, 커버↔정보 24, 교재명 1줄 말줄임, 스크롤바 숨김).

**주문상세 취소/환불 정보 (`#odCancel`, 상태 주입)**: JS `STATUS[st].box`로 상태별 박스 주입 — `cancel`(결제취소)·`wcancel`(입금취소)=**취소 정보**(취소일자·취소사유) / `refund`(환불완료)=**환불 정보**(취소일자·환불사유·환불계좌). box 없는 상태는 섹션 제거. **`구매확정(confirm)`은 상태·목록 버튼 없음**. 취소/환불 사유는 공통 옵션 목록(고객변심…직접입력). 주문내역 목록에 입금취소·결제취소·환불완료 행 추가(회색 배지 `.oh-badge.cancel`, 버튼 없음).

**모바일 서브헤더 화살표·드롭다운 제거 `.loc-nomenu`**: 카테고리 뎁스 없는 simple 페이지(장바구니·주문결제·주문완료 등)는 layout.js가 `.loc-nomenu` 부여 → `.m-loc-caret{display:none}` + `.m-loc-btn{pointer-events:none}`. cat 타입(교재상세·리스트)은 화살표/드롭다운 유지.

**버튼 내부 패딩(폰트 기준, 4단위 예외)**: 18px→좌우24/상하16, 16px→좌우14/상하16, 14px→좌우24/상하12, 12px→좌우12/상하4. 행간 14→22 · 12→18 · 16→22. (입력창 옆 버튼은 입력창 높이에 맞춤)

**모바일 전체메뉴 드로어 `.m-drawer` (햄버거 → 좌 카테고리 / 우 하위목록)** — Figma 2719-7816
- 상단 `.md-top`: 홈 아이콘 + `로그인`(SemiBold 16) + 검색/장바구니/닫기(X). md-top 자체 하단선 없음(아래 빠른아이콘 행의 `border-top`이 구분선 역할).
- 빠른 아이콘 `.md-quick` 4종(원형 79 · 테두리 `--line` · 아이콘 28 · 라벨 11 Bold): **교재 추천·찜·주문내역·1:1문의**. 행 상하 `border --line`.
- 본문 `.md-body` 좌우 분할: 좌 `.md-cats`(bg `#f5f5f5` · 폭 130 · 항목 14 `--weak` · pad 16/20) / 우 `.md-subs`(하위목록 14 Medium `--muted` · 세로 간격 16 · pad 16/24/40).
- 활성 카테고리 `.md-cat.on` = **빨강 알약**: `width:calc(100% + 14px)`로 회색 컬럼을 넘어 **흰색 영역으로 14px 돌출** + 오른쪽 라운드 999. ⚠️ `.md-cats{overflow:visible}` + `.md-body{overflow:hidden}` 필수(가로 클리핑 해제·세로 컨테인).
- 좌 카테고리 10종: ELT · 초등/중등 · 고등 · 교과서/자습서 · 수험/일반 · 수학/국어 · 학습자료실 · 도서몰 · 고객센터 · 마이페이지.
- **학습자료실·도서몰**: ELT~수학/국어 **전체를 아코디언 `.md-acc`**로 노출(헤더 Bold 14 + chevron, **기본 전부 펼침**, 헤더 클릭 시 접기/펼치기, 섹션 사이 `--line`).
- 고객센터·마이페이지: 실제 앵커 링크(`고객센터.html#notice/faq/event/errata/qna/branch`, `마이페이지.html#orders/points/wish/qna/review/event`). 데이터·렌더는 `js/layout.js`의 `BOOKCATS`/`MENU`.

**후기 작성/수정 (모바일, `.page-rvwrite`)** — Figma 2641-5037 / 2719-7931
- PC 좌우 테이블 폼(라벨 좌 160) → 모바일은 **라벨 위·인풋 아래 세로 스택**(그룹 간격 24, 좌우 20). 상단 **안내 밴드 전체폭 회색**(`#F3F3F3` · pad 40/20 · 단일 불릿).
- 상품명: (작성) 분류 셀렉트 + 검색 인풋 세로 스택 / (수정) **선택완료 카드** `.iq-bk-selected`(회색 커버 105×105·책 그림자 + 제목 + 삭제 버튼 세로). 별점/제목/내용(250) 전체폭.
- 상품 이미지: 좌 안내/파일명 박스 + 우 파일첨부 버튼. 등록 버튼 = (작성) 단독 전체폭 / (수정) **취소(차콜 `--btn`) + 등록(빨강) 반반**(`.iq-actions-btns` flex gap 10, 버튼 `flex:1`).

**상품 검색 바텀시트 `.cs-sheet`** (os-sheet 공용 베이스 재사용) — Figma 2719-7249
- 후기작성 상품명의 분류 셀렉트/검색 인풋 탭 시 오픈. 검색 헤더(Paperlogy 22) + **카테고리 세그먼트**(알약, 활성=`#fff2f0` 배경·`--red` 테두리/글자) + **알약형 검색 인풋**(검정 테두리 9999) + 결과 리스트.
- ⭐ **결과는 검색어 입력 시에만 노출**(빈값=전부 숨김, 한 글자부터 부분일치, **열 때마다 초기화**). 결과 선택 → 상품명 인풋 반영 + 닫힘. dim/그랩/ESC 닫힘.

**마이페이지 후기 리스트 (모바일, `#tab-review .rv-q`)**: 헤더 = grid 2행 `"별+제목(좌) / 작성자·날짜(우) · chevron"`. **별↔윗 구분선 / 제목↔아래 구분선 24**, **작성자↔날짜 4**, 우측열↔chevron 24. 안내박스 단일 불릿. 페이징 대신 `.mo-more` 더보기(10건 초과).

> 상세 Figma 실측값·구현 노트는 프로젝트 메모리 `ne-books-mobile.md` 참조.

---

## 30. 반응형 브레이크포인트 (2026-08)

**경계 = 1024px.** `@media (max-width:1023px)` = **모바일 뷰(풀폭)**, `≥1024` = **PC 뷰**. (태블릿 세로=모바일 풀폭 / 태블릿 가로=PC)
- 흩어져 있던 브레이크포인트(767·900·960·1000·1100)를 **1023으로 통일**.
- 태블릿에서 모바일 레이아웃은 **화면 폭을 채움(풀폭)** — 별도 프레임 캡 없음.

**메인(index) — 넓어지면 채우고, 가로 요소는 한 줄 유지**
- **헤더**: 로고 왼쪽 끝 / 유틸 아이콘 오른쪽 끝(풀폭).
- 롤링배너·프로모션 카드·회색 큐레이션 박스: **풀폭**.
- **주요 아이콘 `.mainicons .row`**: `flex-wrap:nowrap; overflow-x:auto` + 마우스 드래그 스크롤. `justify-content:safe center`(**맞으면 가운데, 넘치면 좌측+스크롤**). 태블릿(768~1023)에서 아이콘 **79 → 110px** 확대.
- **베스트셀러 탭 `.bs-tabs`**: 동일(한 줄 nowrap + 드래그 + safe center).
- **NE Tutor `.netutor`**: **≥1024 = 아크(회전) 데스크톱**(`scale(0.9)`·양옆 clip, JS `isArc()=innerWidth>1023`) / **≤1023 = 카드 2열 그리드**. isArc()와 CSS reflow 경계를 **1024로 일치**시켜 그리드/아크 충돌(카드 누락) 해결.

**교재 리스트(태블릿)**: 1열 풀폭(가로 카드). PC(≥1024) 카드는 `.pinfo{padding-right:210px}`로 제목·가격 겹침 방지.

**Known 이슈**: 공지/고객센터 2단은 ≥1024에서 고객센터 칼럼(약 480px)이 좁아 카드 채널 아이콘이 tel 아래로 wrap됨(1360 설계 기준) — PC 좁은 구간 스택 or 칼럼 비율 조정 여지.

---

## 31. 교재상세 PDP 히어로 · 구매박스 (`.dt-hero` / `.dh-*`)

교재상세 상단 2단 히어로 + 구매 영역. (`교재상세.html`, layout.css)

| 요소 | 규칙 |
|------|------|
| 히어로 `.dt-hero` | grid `580px / 1fr`, column-gap **140**, 하단 padding **80** |
| 커버 `.dh-cover` | **580×580** 회색 박스(radius 12), 책 이미지 폭 **56%**+그림자, 미리보기 `.prev`=우하단 **52px** `--ink` 원형 |
| 정보 `.dh-info` | 높이 580 · 내부 스크롤(스크롤바 숨김) |
| 제목 `.dh-title` | Paperlogy **800 / 32** |
| 가격 `.dh-price` | `.pct`(빨강 800 24) · `.now`(Paperlogy 800 24) · `.was`(14 취소선 `--weak`), 위 여백 40 |
| 배지 `.badge` | course=빨강 아웃라인 / level=회색 배경 / lexile=`--blue` 아웃라인(+i아이콘), 알약 4/12 |
| 구매박스 `.dh-buy` | 하위 상세에서 **sticky**(`.dt-body .dh-buy{position:sticky;top:76px}`). 행=라벨 60+값, 합계 Paperlogy 800 24, 버튼 `.cart`(#4d4e4d)+`.buy`(빨강) `flex:1` |
| 정보고시 `.dh-notice` | 회색 박스 radius 10, padding 20/30 |
| NE Tutor 띠 `.dh-tutor` | `--blue` 배경 radius 10, 흰 글씨 |

## 32. 수량 스테퍼 (`.qty` / `.dh-qty`)

+/− 버튼 + 수량. 테두리 `--line` · radius 8 · overflow hidden.

| 위치 | 버튼 | 값칸 |
|------|------|------|
| 교재상세 `.dh-qty` | 34×38 | 44 (bold) |
| 장바구니 `.qty` | 36×40 | input 44(좌우 `--line` 구분선) |

> 모바일은 `.qty-step`(100×36, §29) 사용.

## 33. 상품 카드 (베스트셀러·추천 `.bs-card`)

메인 베스트셀러/교재상세 추천 캐러셀 카드. `280×428` 흰 카드(border `--line`, radius 12).

| 요소 | 규칙 |
|------|------|
| 이미지 영역 `.img` | 280×292, 책 `.book` 162×212(그림자) |
| 체크박스 `.chk` | 좌상단 18×18 radius 5, 선택 시 `--check`(#D94A34)+흰 SVG 체크 |
| 담기 `.cart` | 우하단 **48px** `--ink` 원형 + 흰 카트 20px |
| 메타 `.bs-meta` | padding `0 0 40 40`, 코스 알약 `.ph`(빨강 아웃라인) · 이름 16 medium · 가격 now(Paperlogy 22)/was(14 취소선) |

## 34. 교재 리스트 카드 행 (`.prow`)

교재구매/학습자료 리스트의 가로 카드 행. `display:flex; gap 40; padding 40 0; border-bottom --line`.

| 요소 | 규칙 |
|------|------|
| 커버 `.pcover` | 구매 **245²** / 학습자료 **276²** 회색 radius 12, 책 이미지+그림자 |
| 코너 배지 `.pcorner` | 좌상단 12/12, **hot=`--red` · new=`--blue` · soldout/off=`#8a8a8a`**, 10px bold radius 10 pad 3/9 |
| 제목 `.ptitle` | Paperlogy **28** |
| 액션 `.pactions` | 우측 절대배치(width 190), 구매 리스트는 `.pinfo{padding-right:210}`로 겹침 방지 |
| 버튼 `.pbtns` | §6 참조(학습자료/장바구니 빨강 아웃라인/바로구매) |
| 학습자료 카트 `.pcover-cart` | 커버 우하단 48px `--ink` 원형(§6) |

## 35. 가격 블록 (공통 패턴)

할인율·현재가·정가 3요소는 화면 전역에서 동일 패턴으로 반복(`.dh-price` · `.bs-meta` · `.pprice` · `.mb-price` · `.cprice` · `.od-final`).

| 요소 | 규칙 |
|------|------|
| 현재가 `.now` | **`--display`(Paperlogy)** Bold, 크기는 맥락별(16~28), 단위(원/small)는 `--sans` 14 |
| 정가 `.was` | 14 · `--weak` · **취소선** |
| 할인율 `.pct` | Bold(800), 강조 시 `--red` |
| 할인/적립 태그 `.pdiscount .tag` | 20×20 radius 10, 할인(`.hal`)=`--red` · 적립(`.jeok`)=`#666`, 흰 글씨 11 |

## 36. 주문/장바구니 요약 카드 & 결제 스텝

**요약 카드 `.co-side`**(장바구니 `.cart-side` · 주문결제 `.order-side`): padding `56/40`, 버튼 width 100%.

| 요소 | 규칙 |
|------|------|
| 금액 라인 `.pay-line .v` | 숫자 16 `--ink` + 원 14 `--muted` |
| 총액 `.pay-total` | 값 = `--red` Paperlogy(**b 28 / 단위 24**), 라벨 16(주문측 Paperlogy 700), 위 여백/선 40 |
| 적립예정 `.pay-earn` | 좌우 양끝, 14 `--muted` |

**결제 스텝 `.steps`**: flex center, gap 16, padding `24/0/40`. `.step .no`=28 원형(기본 회색/`--weak`, 활성 `--ink`/흰색), 화살표 `.arw` `#cfcfcf` 16. 순서 장바구니 → 주문/결제 → 주문완료.

## 37. 앵커 팝오버·툴팁 & 데이트피커

§10(레이어 팝업 큰 박스)과 별개인, 요소에 고정 앵커되는 작은 팝오버.

| 컴포넌트 | 규칙 |
|------|------|
| 정보 툴팁 `.tip-pop` | radius 14, padding **22/26**, 화살표 `::after`(위치별 상/하), i아이콘 15 원형 `#9a9a9a` |
| 공유 `.share-pop` | radius 8~16, padding 24, gap 24, 회전 사각형 화살표 `::before` |
| 렉사일 `.lexile-tip` | **450px** radius 16, `.lt-body` padding **40**, h4 18 Bold, `.lt-table`(grade열 84 회색 헤더 radius) |
| 데이트피커 `.datepicker` | **320px** radius 12 padding 20, `.dp-days button` aspect-1 원형, 선택 `.sel`=`--red`/흰 Bold, 흐림 `.mut`=`--weak` (주문내역 기간필드에 앵커) |

## 38. 학습자료 다운로드 표 & 교강사 자료 배너

**다운로드 표 `.rgrid`**(교재상세 학습자료): grid `100/90/170/1fr/130`, 헤더 회색 radius 8 Bold, 체크박스 `.rchk` 18 radius 5(선택 `--check`+흰 체크), 구분 `.gubun` 알약(전체=`--ink`/회원=`--red`/선생님=`--blue`).

**교강사 자료 배너 `.teacher-banner`**: `--blue` **1.5px** 테두리 + 파란 그림자, 좌측 표행(`.tb-row`)+우측 CTA 칼럼(`.tb-cta` 360, 파란 문구+버튼). **체크박스 비활성**(표시용, 선택 불가).

## 39. 주문 상세내역 & 장바구니 아이템 행

**주문 상세내역 `.od-order`**(`주문상세.html`): flex 카드(상/하 `--line`) = `.od-order-info`(300, 일자/주문번호) · `.od-items`(썸네일 120 회색, 책 63×83) · `.od-status`(200). 결제/취소/배송 표 `.od-table`(`.od-th` 240 회색 라벨). 결제요약 `.od-pay`(좌 741/우), 최종금액 `.od-final`=`--red` Paperlogy(b 28/em 24). 목록 버튼 `.od-btn` 280×52 차콜.

**장바구니 아이템 행 `.citem`**: grid `24/120/1fr/150/132/150/32`. 썸네일 `.cthumb` 120 회색, 품절 `.soldout-badge` 오버레이, 이름 `.cname` 16 Bold, 가격 `.cprice`(now 16 Bold/was 13 취소선), 스테퍼 `.qty`, 소계 `.csum`(금액 18 `--red`), 삭제 `.cdel` 32.
**확인 팝업 `.cart-modal`**: 중앙 박스 radius 16 pad 32/24, 메시지 16, 버튼 `.cm-btn` 48(취소=아웃라인/삭제=빨강). 토스트 `.cart-toast`=하단 어두운 알약. (담기·삭제확인·품절차단 재사용)

## 40. 상세 앵커 탭·필터칩 & 메인(index) 컴포넌트

**상세 앵커 탭 `.dtabs`**(교재상세): sticky·풀블리드, `a{flex:1}` 16px, 활성/hover 하단 **3px `--ink`** 밑줄(§9-2 밑줄탭과 별개). **필터칩 `.rfilter`**: 알약 칩 8/16, 활성/hover `--ink` 채움(가로 드래그 스크롤).

**메인(index) 주요 컴포넌트** (layout.css 상단, 반응형은 §30):

| 컴포넌트 | 규칙 |
|------|------|
| 히어로 캐러셀 `.hero2` | 카드 405×460 중앙 포커스 트랙, 진행바 네비 `.hero2-nav .bar i` |
| 주요 아이콘 `.mainicons .pill` | 140 원형, 아이콘 45, 한 줄 nowrap+드래그 |
| 베스트셀러 `.bestseller` | 알약 탭 `.bs-tabs`, 프로모 `.bs-promo`(라벨=빨강 아웃라인 알약, 타이틀 Paperlogy 32 `--red`) |
| 큐레이션 `.curation` | `--ink` 배경, `.cur-card` 405² opacity 포커스 |
| NE Tutor `.netutor` | `--blue` 액센트, `.nt-card` 351×178(red variant), 아크 회전 ≥1024(§30) |
| 공지/CS `.notices` | 2단(`.notice-list` + `.cs-cards`), 카드 `.cs-card` radius 16 |

## 41. 회색 정사각 박스 카드 — 교재 표지 비율 (2026-08)

검색결과·찜·홈(찜한/최근본)·연관교재·메인 ELT 등 **회색 정사각(`aspect-ratio:1/1`) 박스 안에 교재 표지**를 담는 카드 공통 규칙.

| 항목 | 규칙 |
|------|------|
| 표지 높이 | **박스 높이의 `63%`** (`top:18.5%` · `bottom:18.5%`) — **비율(%) 고정** |
| 표지 폭 | `width:auto` + `aspect-ratio:171/223` → 자동(≈박스폭의 **48%**) |
| 정렬 | 가로 중앙(`left:50%; transform:translateX(-50%)`) |
| 카트 버튼 | 박스 기준 **`%`로 배치**(표지 우하단 모서리에 반쯤 걸침) |

> ⚠️ **고정 px 금지**: `top:45px / height:calc(100% - 90px)` 같은 고정값은 카드 폭이 반응형으로 줄면 회색박스 대비 표지가 **작아 보이는** 문제가 생김(90px 패딩이 작은 박스에서 큰 비중). **반드시 `%` 비율**로 지정해 카드 크기가 달라져도 표지가 항상 박스의 63%로 **일정**하게.
>
> 적용 셀렉터: `.sr-book`(검색결과) · `:is(#tab-wish .wl-grid,#tab-home .mb-grid) .mb-cover img`(찜·홈) · `.rel-card .img .book`(연관교재) · `.m2-card .box>img`(메인 ELT). 데스크탑·모바일 동일하게 63%.

---

> 문서 번호는 §11이 비어 있음(§10 → §12) — 과거 편집 흔적, 내용 누락 아님.
