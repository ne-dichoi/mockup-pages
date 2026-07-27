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
| **Outline** | `.btn-outline` | `#FFFFFF` · 테두리 `#1D1717` | `#1D1717` | 목록 · 삭제 |
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

## 11. 사용법

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
