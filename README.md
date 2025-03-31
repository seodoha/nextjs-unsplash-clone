# Next.js Unsplash Clone

Unsplash API를 활용한 이미지 갤러리 웹 애플리케이션입니다.

## 기술 스택

- Next.js 14
- TypeScript
- Tailwind CSS
- Zustand
- Unsplash API
- Lighthouse (성능 테스트)
- Jest

## 주요 기능

- 토픽별 이미지 필터링
- 이미지 상세 보기
- 모달을 통한 이미지 상세 보기
- 모달 라우터를 통한 URL 기반 상태 관리
- 모달 상태에서 새로고침 시 상세 페이지로 자동 전환
- 북마크 기능
- 반응형 디자인

## 프로젝트 구조

```
nextjs-unsplash-clone/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   └── [topic]/
│       └── page.tsx
├── components/
│   ├── ImageCard.tsx
│   ├── ImageDetail.tsx
│   ├── ImageModal.tsx
│   └── NaviBar.tsx
├── store/
│   └── useStore.ts
├── providers/
│   └── StoreProvider.tsx
├── types/
│   └── unsplash.ts
├── utils/
│   └── unsplash.ts
├── public/
│   └── images/
│       └── unsplash-logo.svg
├── __tests__/
│   ├── components/
│   │   ├── ImageCard.test.tsx
│   │   └── ImageDetail.test.tsx
│   ├── utils/
│   │   └── unsplash.test.ts
│   └── store/
│       └── useStore.test.ts
└── lighthouse.config.ts
```

## CI/CD 설정

### GitHub Actions

프로젝트는 GitHub Actions를 통해 자동화된 CI/CD 파이프라인을 사용합니다.

#### 주요 워크플로우

1. **코드 품질 검사**
   - ESLint를 통한 코드 스타일 검사
   - TypeScript 타입 체크
   - 빌드 검증

2. **성능 테스트**
   - Lighthouse를 통한 성능 점수 측정
   - 성능 기준 충족 여부 확인
   - 성능 메트릭 리포트 생성

3. **단위 테스트**
   - Jest를 통한 단위 테스트 실행
   - 테스트 커버리지 리포트 생성

### Lighthouse 설정

`lighthouse.config.ts` 파일을 통해 성능 테스트 설정을 관리합니다.

```typescript
const config = {
  extends: 'lighthouse:default',
  settings: {
    screenEmulation: {
      mobile: true,
      disable: false,
      width: 360,
      height: 640,
      deviceScaleRatio: 2,
      isMobile: true,
      hasTouch: true,
    },
  },
  assertions: {
    'categories:performance': ['error', { minScore: 0.9 }],
    'categories:accessibility': ['error', { minScore: 0.9 }],
    'categories:best-practices': ['error', { minScore: 0.9 }],
    'categories:seo': ['error', { minScore: 0.9 }],
  },
} as const;
```

## 테스트

### Jest 설정

프로젝트는 Jest를 사용하여 단위 테스트와 통합 테스트를 수행합니다.

#### 테스트 실행

```bash
# 모든 테스트 실행
yarn test

# 특정 파일의 테스트만 실행
yarn test ImageCard.test.tsx

# 테스트 커버리지 리포트 생성
yarn test:coverage

# 테스트 감시 모드 실행
yarn test:watch
```

#### 테스트 파일 구조

```
__tests__/
├── components/
│   ├── ImageCard.test.tsx
│   └── ImageDetail.test.tsx
├── utils/
│   └── unsplash.test.ts
└── store/
    └── useStore.test.ts
```

#### 테스트 작성 가이드

1. **컴포넌트 테스트**
   ```typescript
   import { render, screen } from '@testing-library/react'
   import ImageCard from '@/components/ImageCard'

   describe('ImageCard', () => {
     it('renders image with correct props', () => {
       const image = {
         id: '1',
         urls: { regular: 'test.jpg' },
         alt_description: 'Test Image'
       }
       render(<ImageCard image={image} />)
       expect(screen.getByAltText('Test Image')).toBeInTheDocument()
     })
   })
   ```

2. **유틸리티 함수 테스트**
   ```typescript
   import { getPhotoById } from '@/utils/unsplash'

   describe('getPhotoById', () => {
     it('returns photo data for valid ID', async () => {
       const photo = await getPhotoById('test-id')
       expect(photo).toBeDefined()
       expect(photo.id).toBe('test-id')
     })
   })
   ```

3. **상태 관리 테스트**
   ```typescript
   import { renderHook, act } from '@testing-library/react'
   import useStore from '@/store/useStore'

   describe('useStore', () => {
     it('toggles bookmark state', () => {
       const { result } = renderHook(() => useStore())
       act(() => {
         result.current.toggleBookmark('test-id')
       })
       expect(result.current.bookmarks).toContain('test-id')
     })
   })
   ```

### 성능 테스트 실행

```bash
# 개발 환경에서 Lighthouse 테스트 실행
yarn lighthouse

# CI 환경에서 Lighthouse 테스트 실행
yarn lighthouse:ci
```

### 성능 기준

- Performance: 90점 이상
- Accessibility: 90점 이상
- Best Practices: 90점 이상
- SEO: 90점 이상

## 배포

- Vercel을 통한 자동 배포
- PR 생성 시 프리뷰 배포
- main 브랜치 머지 시 프로덕션 배포

## 환경 변수

```env
NEXT_PUBLIC_UNSPLASH_ACCESS_KEY=your_access_key
```

## 개발 가이드

1. 브랜치 전략
   - main: 프로덕션 브랜치
   - develop: 개발 브랜치
   - feature/*: 기능 개발 브랜치
   - hotfix/*: 긴급 수정 브랜치

2. 커밋 메시지 컨벤션
   - feat: 새로운 기능
   - fix: 버그 수정
   - docs: 문서 수정
   - style: 코드 포맷팅
   - refactor: 코드 리팩토링
   - test: 테스트 코드
   - chore: 빌드 업무 수정, 패키지 매니저 수정