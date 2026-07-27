---
name: publish
description: 작업한 목업을 저장소에 올려서 사이트에 반영한다(git add·commit·push → 자동 배포). "올리기", "배포", "반영", "게시", "push", "공개"를 원할 때 사용.
---

# 올리기 (publish)

기획자가 만든/수정한 목업을 저장소에 올려 공개 사이트에 반영하는 스킬이다. git을 몰라도 되게, 아래를 대신 수행하고 결과를 한국어로 보고한다.

## 절차

1. 올릴 변경이 있는지 확인한다.
   ```bash
   git status --porcelain
   ```
   출력이 비어 있으면 "올릴 변경이 없습니다."라고 안내하고 종료한다.

2. 모든 변경을 스테이징한다.
   ```bash
   git add -A
   ```

3. **커밋 메시지를 자동 생성한다.** 스테이징된 파일에서 `mockups/<폴더>`를 추출한다.
   ```bash
   git diff --cached --name-only
   ```
   - `mockups/<폴더>/...` 경로들에서 `<폴더>` 이름을 중복 없이 모은다.
   - 그 폴더들이 있으면 메시지: `목업 추가/수정: <폴더1>, <폴더2>`
   - mockups 외 변경만 있으면 메시지: `내용 수정` (또는 무엇이 바뀌었는지 한 줄 요약)

4. 커밋한다.
   ```bash
   git commit -m "<3번에서 만든 메시지>"
   ```

5. 올린다.
   ```bash
   git push origin main
   ```
   - **거부(rejected, "behind")되면** 다른 사람이 먼저 올린 것이다. 최신을 병합하고 다시 시도한다:
     ```bash
     git pull --no-rebase origin main
     git push origin main
     ```
   - **병합 충돌**이 나면 임의로 해결하지 말고, 어떤 파일이 충돌했는지 한국어로 설명한 뒤 사람에게 어떻게 할지 묻는다.

6. 완료를 한국어로 보고한다:
   - "올렸습니다. 1~2분 뒤 https://ne-dichoi.github.io/mockup-pages/ 에 자동 반영됩니다."
   - GitHub Actions가 빌드·배포를 처리하며, 목록 페이지는 자동 생성된다는 점을 덧붙인다.

## 원칙

- `--force` push, `git reset --hard` 등 되돌리기 어려운 동작은 하지 않는다.
- git 명령이 실패하면 원문 오류를 숨기지 말고 한국어 설명과 함께 보여준다.
- 이 저장소는 public이다. 올리기 전 실제 고객 데이터·자격 증명이 섞이지 않았는지 상식선에서 살핀다.
