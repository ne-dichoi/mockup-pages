# 트러블슈팅

작업(최신받기·작업시작·올리기) 중 만난 문제와 해결을 모아두는 문서입니다. 새 사례는 아래 **기록 템플릿**에 맞춰 추가하세요. 문제가 생기면 Claude에게 "이 문제 트러블슈팅에 남겨줘"(`/trouble`)라고 하면 초안을 만들어 브랜치 흐름으로 반영합니다.

## 마커 빠른 참조

`/start`·`/publish`·`/sync`는 스크립트 실행 결과를 **마지막 줄 마커**로 알립니다. 의미와 대처는 다음과 같습니다.

| 마커 | 의미 | 워커 대처 |
| --- | --- | --- |
| `START_OK` | 작업 브랜치 생성됨 | 목업을 만든 뒤 `/publish` |
| `OK` | 성공(최신받기/올리기 완료) | 끝. 올리기면 1~2분 뒤 사이트 반영 |
| `LIST_OK` | 되돌리기 후보 목록 표시됨 | 되돌릴 항목 번호를 고름 |
| `ROLLBACK_OK` | 되돌리기 완료 | 끝. 1~2분 뒤 사이트에 반영 |
| `NOCHANGE` | 올릴 변경이 없음 | 변경을 만들었는지 확인 |
| `BLOCKED_DIRTY` | 저장 안 된 변경 때문에 이동 불가 | 먼저 `/publish`로 올리거나, 담당자에게 문의 |
| `BLOCKED_DIVERGED` | 로컬과 원격이 갈라짐 | **임의 조치 금지.** 담당 개발자에게 문의 |
| `BLOCKED_CONFLICT` | 같은 파일을 다른 사람이 바꿔 병합 충돌 | **임의 조치 금지.** 어떤 파일인지 확인 후 담당 개발자에게 문의 |
| `BLOCKED_REMOTE_UPDATED` | 올리는 사이 다른 사람이 먼저 올림 | 잠시 후 `/publish` 다시 실행 |
| `ERROR` | git 오류(인증·설정 등) | 출력된 원문 오류 확인 후 담당 개발자에게 문의 |

## 기록 템플릿

```
## <짧은 제목>
- 증상:
- 원인:
- 해결:
- 관련: (마커/명령/상황, 선택)
```

---

## 사례

## 에이전트·스킬이 안 보임 (`git-helper` not found, `/start`·`/publish` 없음)
- 증상: `/start`·`/publish`·`/rollback` 슬래시 명령이 없거나, `subagent_type: git-helper`가 "not found"로 실행되지 않는다.
- 원인: Claude Code를 **저장소 루트가 아닌 상위 디렉터리**에서 실행했다. 에이전트/스킬은 `.claude/`가 있는 디렉터리를 기준으로 세션 시작 시 로드되므로, 상위에서 열면 로드되지 않는다.
- 해결: `mockup-pages` **저장소 루트 폴더에서** Claude Code를 새로 연다(그 폴더 안에 `.claude/`가 보여야 함). `/agents` 목록에 `git-helper`가 뜨면 정상.
- 관련: 세션 시작 위치

## Windows에서 `init.ps1` 실행 시 파싱 에러 (`The string is missing the terminator: "`)
- 증상: Windows PowerShell에서 `init.ps1` 실행 시 문자열 종결 관련 파싱 에러.
- 원인: 스크립트가 BOM 없는 UTF-8로 저장되면 Windows PowerShell 5.1이 파일 안의 한글 주석을 시스템 코드페이지로 잘못 해석해 깨진다.
- 해결: 저장소의 `scripts/init.ps1`은 UTF-8 BOM 포함으로 저장돼 정상 동작한다. 로컬에서 다시 저장했는데도 같은 에러가 나면, 에디터에서 인코딩을 "UTF-8 with BOM"으로 다시 저장한다.
- 관련: Windows / PowerShell 5.1

## push 시 `remote: Permission ... denied` / `403`
- 증상: 올리기(push) 단계에서 권한 거부(403).
- 원인: 로컬에 저장된 Git 자격증명 계정이 이 저장소에 쓰기 권한이 없다.
- 해결: 저장소 관리자에게 collaborator 추가를 요청하거나, 쓰기 권한이 있는 계정으로 Git 자격증명을 재인증한 뒤 다시 push한다.
- 관련: `ERROR` 마커
