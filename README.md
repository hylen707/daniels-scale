# ⚖ 다니엘의 저울

학교 학생회 상·벌점 관리 시스템

## Project Status

**Phase:** Initiation  
**Milestone:** Project initialization  
**Repository:** hylen707/daniels-scale

다니엘의 저울은 학교 학생회가 학생의 상점, 벌점, 반성문 제출 상태 및 처분을 관리하기 위한 내부 웹 애플리케이션이다.

## Core Roles

- **선도부** — 상·벌점 기록, 반성문 관리, 학생 상태 확인
- **사생회** — 상·벌점 기록, 주간 벌점 확인 및 처분 수동 등록

## Core Features

- 관리자 로그인 및 역할 기반 접근 제어
- 학생 기본 정보 관리
- 상점 / 벌점 기록
- **선도부와 사생회 모두 벌점 입력 가능**
- 벌점 항목 관리
- Excel 기반 벌점 항목 가져오기
- 반성문 제출 상태 관리
- 주간 / 월간 벌점 자동 계산
- 체력훈련 대상 자동 판정
- 징계위원회 대상 자동 판정
- 사생회 처분 수동 선택
- 3주 연속 주간 벌점 조건 확인
- 학생별 상세 기록
- 기록 수정 / 삭제
- 감사 로그

## Business Rules

### 선도부

- 주간 벌점 기록 **3회 이상 OR 주간 벌점 8점 이상** → '체력훈련 대상'
- 월간 벌점 **20점 이상** → '징계위원회 대상'

### 사생회

- **벌점 입력 가능**
- 벌점 입력 시 벌점 항목, 점수, 학생, 날짜, 기입자를 기록
- 주간 벌점 **5점 이상** → 운동금지 / 간식금지 / 면회금지 중 1개 수동 선택
- 주간 벌점 **10점 이상** → 위 처분 중 2개 수동 선택
- **3주 연속 주간 벌점 5점 이상** → '귀가금지 조건 충족'
- 적용된 처분 위반 기록 → '귀가금지'

### 반성문

- 벌점 입력 당일이 제출 기한
- 다음 날까지 미제출 → '2배 제출 대상'
- 제출 여부는 관리자가 직접 체크
- '기입자'는 로그인 계정과 무관하게 항상 직접 입력

## Role Permission Matrix

| 기능 | 선도부 | 사생회 |
|---|---|---|
| 학생 조회 | 가능 | 가능 |
| 벌점 입력 | 가능 | **가능** |
| 상점 입력 | 가능 | **가능** |
| 반성문 제출 상태 관리 | 가능 | 가능 |
| 주간 벌점 조회 | 가능 | 가능 |
| 월간 벌점 조회 | 가능 | 가능 |
| 사생회 처분 등록 | 가능 | 가능 |
| 벌점 항목 관리 | 관리자 권한 | 관리자 권한 |
| 학생 정보 관리 | 관리자 권한 | 관리자 권한 |

역할에 따른 접근 제한은 화면에서만 숨기지 않고 서버에서 검증한다.

## Data Principles

- 학생 정보는 이름과 학년 중심으로 최소 수집
- 상점과 벌점은 별도 값으로 관리
- 주간 초기화 시 과거 기록을 삭제하지 않음
- 과거 주간 기록은 연속 주간 조건 계산을 위해 보존
- 자동 상태는 데이터베이스 기록을 기반으로 서버에서 계산
- **기입자는 로그인 계정과 별개로 직접 입력하는 이름값**
- 선도부가 입력한 벌점과 사생회가 입력한 벌점은 동일한 벌점 기록 체계를 사용한다.
- 인증 역할은 '누가 시스템을 사용할 수 있는가'를 결정하고, 기입자는 '기록에 표시할 이름'으로 별도 저장한다.

## Planned Stack

- Next.js
- TypeScript
- React
- Tailwind CSS
- shadcn/ui
- PostgreSQL
- Prisma
- Secure authentication
- Zod validation

## Development Workflow

INITIATION
→ Architecture / Database Design
→ Authentication & Authorization
→ Student Management
→ Point Management
→ Reflection Management
→ Punishment Management
→ Automatic Business Rules
→ Excel Import
→ Testing / Security
→ Deployment

## Initial Git Workflow

The repository starts from this initialization milestone.

Recommended commit convention:

- chore(init): initialize project
- feat(auth): add authentication
- feat(students): add student management
- feat(points): add point management
- feat(reflection): add reflection management
- feat(punishment): add punishment management
- feat(rules): implement automatic business rules
- feat(import): add Excel import
- test: add application tests
- fix: resolve ...

## Next Milestone

**Project Foundation**

1. Create application scaffold
2. Add environment configuration
3. Set up database schema and Prisma
4. Implement authentication and role authorization
5. Create base design system
6. Establish development / feature branch workflow

---

**다니엘의 저울 — Project Initiation**
