---
name: rollback
description: 이전에 올린 변경을 되돌린다(롤백). "되돌리기", "롤백", "이전 상태로", "방금 올린 거 취소", "복구"를 원할 때 사용.
---

# 되돌리기 (rollback)

이전에 올린 변경을 안전하게 되돌린다. 브랜치를 되살리는 게 아니라 해당 **올리기(병합 커밋)를 `git revert`**로 되돌린다(force/reset 없음). git 작업은 **`git-helper` 서브에이전트(Sonnet)**가 처리한다.

## 지시

Agent 도구를 `subagent_type: git-helper`로 호출하고, 다음을 전달한다:

> task=`rollback`. 먼저 저장소 루트에서 `bash scripts/git-rollback.sh --list`를 실행해 최근 올리기 목록(`LIST_OK`)을 사용자에게 번호로 제시하고, 어느 것을 되돌릴지 물어봐줘. 사용자가 고르면 그 해시로 `bash scripts/git-rollback.sh <해시>`를 실행하고, 마커(`ROLLBACK_OK`/`BLOCKED_CONFLICT`/`BLOCKED_REMOTE_UPDATED`/`ERROR`)에 따라 한국어로 결과를 보고해줘.

에이전트가 돌려준 결과를 사용자에게 그대로 전한다. 직접 git 명령을 실행하지 않는다. 충돌(`BLOCKED_CONFLICT`)이면 임의로 해결하지 말고 담당 개발자에게 문의하도록 안내한다.
