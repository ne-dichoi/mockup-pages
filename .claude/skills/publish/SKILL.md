---
name: publish
description: 작업한 목업을 저장소에 올려서 사이트에 반영한다(올리기·배포). "올리기", "배포", "반영", "게시", "push", "공개"를 원할 때 사용.
---

# 올리기 (publish)

git 작업은 **`git-helper` 서브에이전트(Sonnet)**가 안전하게 처리한다. 메인 세션 모델과 무관하게 이 에이전트로 위임한다.

## 지시

Agent 도구를 `subagent_type: git-helper`로 호출하고, 다음을 전달한다:

> task=`publish`. 저장소 루트에서 `bash scripts/git-publish.sh`를 실행하고, 출력 마지막 줄 마커에 따라 한국어로 결과를 보고해줘. `BLOCKED_REMOTE_UPDATED`면 최신받기(sync) 후 다시 올리기를 제안해줘.

에이전트가 돌려준 결과를 사용자에게 그대로 전한다. 직접 git 명령을 실행하지 않는다.
