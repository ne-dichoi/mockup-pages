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

3열 그리드(`gap:40px 24px`). 카드 = 이미지(aspect ~437/300, radius 12) + 배지 2개 + 제목 + 설명 + 상태.

| 요소 | 규칙 |
|------|------|
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

## 25. 부분환불 상품·권수 선택 (1:1문의 · 주문번호)

회원 1:1문의 > 주문·배송 문의에서 **주문번호 선택 시** 노출되는 `.pr-*` 패널.

| 요소 | 규칙 |
|------|------|
| 헤더 | `상품 · 수량 부분 선택`(Bold) + 우측 안내(`--weak` 12) |
| 목록 박스 | 테두리 8px, **상하 패딩 24 고정**, 내부 리스트 `max-height:152` 스크롤 |
| 행 | 체크박스(선택 시 `--red`+흰 체크) + 교재명 + `구매 N권`(`--weak`) · 우측 `환불 [− 수량 +] 권` 스텝퍼 |
| 선택/미선택 | 선택 = 교재명 Bold `--ink`·스텝퍼 활성 / 미선택 = `--muted`·수량 0·스텝퍼 `#c9c9c9` |
| 스텝퍼 | 3칸(−·수량·+) 각 36, 칸 구분선 `--line`, **끝(+) 테두리 없음** |
| 합계 | `총 환불 요청 수량` + `N 권`(Bold), 배경 `--gray-bg`. 값 = 체크된 행 수량 합계 |

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
