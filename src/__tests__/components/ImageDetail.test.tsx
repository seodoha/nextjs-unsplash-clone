import React from 'react'
import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import { screen } from '@testing-library/dom'
import ImageDetail from '../../components/layout/ImageDetail'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { usePhotoByIdQuery } from '@/hooks/useImageQuery'

// usePhotoByIdQuery 훅을 모킹하여 테스트에서 사용할 수 있도록 설정
jest.mock('@/hooks/useImageQuery', () => ({
  usePhotoByIdQuery: jest.fn()
}))

// React Query 클라이언트 인스턴스 생성
const queryClient = new QueryClient()

describe('ImageDetail', () => {
  // 테스트에 사용할 모의 이미지 데이터
  const mockImage = {
    id: '1',
    urls: { 
      regular: 'https://example.com/test.jpg',
      thumb: 'https://example.com/test-thumb.jpg'
    },
    alt_description: 'Test Image',
    user: {
      name: 'Test User',
      username: 'testuser',
      profile_image: { medium: 'https://example.com/profile.jpg' }, // 프로필 이미지 URL
      links: { html: 'https://test.com' }
    },
    width: 800,
    height: 600,
    likes: 100,
    downloads: 50,
    views: 200,
    description: 'Test Description'
  }

  // 각 테스트 케이스 실행 전에 모킹 초기화
  beforeEach(() => {
    jest.clearAllMocks()
  })

  // 로딩 상태 테스트
  it('renders loading state correctly', () => {
    // usePhotoByIdQuery 훅이 로딩 상태를 반환하도록 모킹
    (usePhotoByIdQuery as jest.Mock).mockReturnValue({
      data: undefined,
      isLoading: true,
      isError: false
    })

    // 컴포넌트 렌더링
    render(
      <QueryClientProvider client={queryClient}>
        <ImageDetail image={mockImage} />
      </QueryClientProvider>
    )
    
    // 로딩 상태일 때 스켈레톤 UI 요소들이 있는지 확인
    expect(screen.getByTestId('skeleton-header')).toBeInTheDocument()
    expect(screen.getByTestId('skeleton-image')).toBeInTheDocument()
    expect(screen.getByTestId('skeleton-stats')).toBeInTheDocument()
  })

  // 실제 데이터 상태 테스트
  it('renders user information correctly', () => {
    // usePhotoByIdQuery 훅이 실제 데이터를 반환하도록 모킹
    (usePhotoByIdQuery as jest.Mock).mockReturnValue({
      data: mockImage,
      isLoading: false,
      isError: false
    })

    // 컴포넌트 렌더링
    render(
      <QueryClientProvider client={queryClient}>
        <ImageDetail image={mockImage} />
      </QueryClientProvider>
    )
    
    // 사용자 정보가 올바르게 렌더링되는지 확인
    expect(screen.getByText('Test User')).toBeInTheDocument()
    expect(screen.getByText('@testuser')).toBeInTheDocument()
  })

  // 에러 상태 테스트
  it('renders error state correctly', () => {
    // usePhotoByIdQuery 훅이 에러 상태를 반환하도록 모킹
    (usePhotoByIdQuery as jest.Mock).mockReturnValue({
      data: undefined,
      isLoading: false,
      isError: true
    })

    // 컴포넌트 렌더링
    render(
      <QueryClientProvider client={queryClient}>
        <ImageDetail image={mockImage} />
      </QueryClientProvider>
    )
    
    // 에러 메시지가 올바르게 렌더링되는지 확인
    expect(screen.getByText(/이미지를 불러오는데 실패했습니다/)).toBeInTheDocument()
  })
})
