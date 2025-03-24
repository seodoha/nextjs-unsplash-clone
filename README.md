# Next.js Unsplash Clone

Unsplash API를 활용한 이미지 갤러리 웹 애플리케이션입니다.

## 기술 스택

- Next.js 14
- TypeScript
- Tailwind CSS
- Zustand
- Unsplash API

## 주요 기능

- 토픽별 이미지 필터링
- 이미지 상세 보기
- 모달을 통한 이미지 상세 보기
- 모달 라우터를 통한 URL 기반 상태 관리
- 모달 상태에서 새로고침 시 상세 페이지로 자동 전환

## 프로젝트 구조

nextjs-unsplash-clone/
├── app/
│ ├── layout.tsx
│ ├── page.tsx
│ └── [topic]/
│ └── page.tsx
├── components/
│ ├── ImageCard.tsx
│ ├── ImageDetail.tsx
│ ├── ImageModal.tsx
│ └── NaviBar.tsx
├── store/
│ └── useStore.ts
├── providers/
│ └── StoreProvider.tsx
├── types/
│ └── unsplash.ts
└── utils/
└── unsplash.ts