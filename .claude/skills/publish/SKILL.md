---
name: publish
description: 작업한 목업을 저장소에 올려서 사이트에 반영한다(올리기·배포). "올리기", "배포", "반영", "게시", "push", "공개"를 원할 때 사용.
---

# 올리기 (publish)

작업 브랜치의 내용을 `main`에 자동 병합해 사이트에 반영한다. git 작업은 **`git-helper` 서브에이전트(Sonnet)**가 처리한다.

## 지시

Agent 도구를 `subagent_type: git-helper`로 호출하고, 다음을 전달한다:

> task=`publish`. 저장소 루트에서 `bash scripts/git-publish.sh`를 실행하고, 출력 마지막 줄 마커에 따라 한국어로 결과를 보고해줘. `BLOCKED_REMOTE_UPDATED`면 잠시 후 다시 올리기를 제안하고, `BLOCKED_CONFLICT`면 같은 파일을 다른 사람이 바꿨으니 담당 개발자에게 문의하라고 안내해줘.

에이전트가 돌려준 결과를 사용자에게 그대로 전한다. 직접 git 명령을 실행하지 않는다. (`main`에서 만든 변경은 자동으로 작업 브랜치로 옮겨져 병합된다.)
