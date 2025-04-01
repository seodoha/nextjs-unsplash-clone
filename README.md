# Next.js Unsplash Clone

Unsplash API를 활용한 이미지 갤러리 웹 애플리케이션입니다. Next.js 14의 최신 기능들을 활용하여 구현되었으며, 모던 웹 개발의 베스트 프랙티스를 따르고 있습니다.

## 기술 스택

- **Next.js 14**: App Router, Server Components, Server Actions 등 최신 기능 활용
- **TypeScript**: 타입 안정성과 개발 생산성 향상
- **Tailwind CSS**: 유틸리티 기반의 반응형 디자인
- **Zustand**: 가벼운 상태 관리 라이브러리
- **Unsplash API**: 고품질 무료 이미지 제공
- **Lighthouse**: 웹 성능, 접근성, SEO 분석
- **Jest**: 단위 테스트 및 통합 테스트
- **SVGR**: SVG 파일을 React 컴포넌트로 자동 변환

## 주요 기능

### 이미지 갤러리
- 토픽별 이미지 필터링 및 검색
- 무한 스크롤을 통한 이미지 로딩
- 이미지 상세 정보 표시
- 이미지 다운로드 및 공유 기능

### 모달 시스템
- 모달을 통한 이미지 상세 보기
- 모달 라우터를 통한 URL 기반 상태 관리
- 모달 상태에서 새로고침 시 상세 페이지로 자동 전환
- 키보드 네비게이션 지원

### 사용자 경험
- 북마크 기능
- 반응형 디자인 (모바일, 태블릿, 데스크톱)
- 로딩 상태 및 에러 처리

### 개발자 경험
- SVG 아이콘 컴포넌트 자동 변환 (SVGR)
- TypeScript를 통한 타입 안정성
- ESLint와 Prettier를 통한 코드 품질 관리
- Jest를 통한 테스트 자동화

## 프로젝트 구조

```
nextjs-unsplash-clone/
├── src/
│   ├── app/                    # Next.js 14 App Router
│   │   ├── layout.tsx         # 루트 레이아웃
│   │   ├── page.tsx           # 메인 페이지
│   │   ├── _not-found.tsx     # 404 페이지
│   │   ├── (topics)/          # 토픽별 이미지 목록
│   │   ├── bookmark/          # 북마크 페이지
│   │   ├── @modal/            # 모달 라우트
│   │   └── image/             # 이미지 상세 페이지
│   ├── components/            # 재사용 가능한 컴포넌트
│   ├── providers/             # React Context Provider
│   ├── store/                 # Zustand 스토어
│   ├── types/                 # TypeScript 타입 정의
│   ├── utils/                 # 유틸리티 함수
│   ├── hooks/                 # 커스텀 훅
│   ├── lib/                   # 외부 라이브러리 설정
│   ├── styles/                # 전역 스타일
│   ├── icons/                 # SVG 아이콘 컴포넌트
│   ├── middleware.ts          # Next.js 미들웨어
│   └── __tests__/             # 테스트 파일
├── public/                    # 정적 파일
├── .github/                   # GitHub Actions 설정
├── .next/                     # Next.js 빌드 결과물
├── node_modules/              # 의존성 패키지
├── next.config.ts            # Next.js 설정
├── tsconfig.json             # TypeScript 설정
├── tailwind.config.ts        # Tailwind CSS 설정
├── postcss.config.mjs        # PostCSS 설정
├── jest.config.ts            # Jest 설정
├── jest.setup.ts             # Jest 설정 파일
├── lighthouse.config.ts      # Lighthouse 설정
├── svgr.config.ts            # SVGR 설정
├── .eslintrc.json           # ESLint 설정
├── .eslintignore            # ESLint 제외 파일
├── .prettierrc              # Prettier 설정
└── package.json             # 프로젝트 설정 및 의존성
```

## 라우팅 구조

### 페이지 라우트
- `/`: 메인 페이지 - 인기 이미지 및 토픽 목록
- `/topics`: 토픽별 이미지 목록 - 카테고리별 이미지 필터링
- `/bookmark`: 북마크된 이미지 목록 - 사용자가 저장한 이미지
- `/image/[id]`: 이미지 상세 페이지 - 개별 이미지 상세 정보

### 모달 라우트
- `/@modal/image/[id]`: 이미지 상세 모달 - 오버레이 형태의 상세 보기

## CI/CD 설정

### GitHub Actions

프로젝트는 GitHub Actions를 통해 자동화된 CI/CD 파이프라인을 사용합니다.

#### 주요 워크플로우

1. **코드 품질 검사**
   - ESLint를 통한 코드 스타일 검사
   - TypeScript 타입 체크
   - 빌드 검증
   - 코드 복잡도 분석

2. **성능 테스트**
   - Lighthouse를 통한 성능 점수 측정
   - 성능 기준 충족 여부 확인
   - 성능 메트릭 리포트 생성
   - 번들 크기 분석

3. **단위 테스트**
   - Jest를 통한 단위 테스트 실행
   - 테스트 커버리지 리포트 생성
   - 컴포넌트 스냅샷 테스트

## 테스트

### Jest 설정

프로젝트는 Jest를 사용하여 단위 테스트와 통합 테스트를 수행합니다.

#### 테스트 실행

```bash
# 모든 테스트 실행
yarn test

# 특정 파일의 테스트만 실행
yarn test ImageCard.test.tsx

```

## 성능 테스트 실행

```bash
# 개발 환경에서 Lighthouse 테스트 실행
yarn lighthouse

```

## 개발 가이드

### 1. 브랜치 전략
- **main**: 프로덕션 브랜치
- **develop**: 개발 브랜치
- **feature/***: 기능 개발 브랜치
- **hotfix/***: 긴급 수정 브랜치
- **release/***: 릴리즈 브랜치

### 2. 커밋 메시지 컨벤션
- **feat**: 새로운 기능
- **fix**: 버그 수정
- **docs**: 문서 수정
- **style**: 코드 포맷팅
- **refactor**: 코드 리팩토링
- **test**: 테스트 코드
- **chore**: 빌드 업무 수정, 패키지 매니저 수정

### 3. 코드 리뷰 가이드라인
- PR 설명에 변경사항 상세 기술
- 관련 이슈 번호 링크
- 스크린샷 첨부 (UI 변경 시)
- 테스트 결과 첨부

### 4. 배포 프로세스
1. develop 브랜치에서 feature 브랜치 생성
2. 기능 개발 및 테스트
3. PR 생성 및 코드 리뷰
4. develop 브랜치로 머지
5. release 브랜치 생성
6. QA 테스트
7. main 브랜치로 머지 및 배포
