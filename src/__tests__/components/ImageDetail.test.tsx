import React from 'react'
import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import { screen } from '@testing-library/dom'
import ImageDetail from '../../components/layout/ImageDetail'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { usePhotoByIdQuery } from '@/hooks/useImageQuery'

// usePhotoByIdQuery 훅 모킹
jest.mock('@/hooks/useImageQuery', () => ({
  usePhotoByIdQuery: jest.fn()
}))

const queryClient = new QueryClient()

describe('ImageDetail', () => {
  const mockImage = {
    id: '1',
    urls: { regular: 'https://example.com/test.jpg' },
    alt_description: 'Test Image',
    user: {
      name: 'Test User',
      username: 'testuser',
      profile_image: { medium: 'https://example.com/profile.jpg' },
      links: { html: 'https://test.com' }
    },
    width: 800,
    height: 600,
    likes: 100,
    downloads: 50,
    views: 200,
    description: 'Test Description'
  }

  beforeEach(() => {
    // 각 테스트 전에 모킹 초기화
    jest.clearAllMocks()
  })

  it('renders loading state correctly', () => {
    // 로딩 상태 모킹
    (usePhotoByIdQuery as jest.Mock).mockReturnValue({
      data: undefined,
      isLoading: true,
      isError: false
    })

    render(
      <QueryClientProvider client={queryClient}>
        <ImageDetail image={mockImage} />
      </QueryClientProvider>
    )
    
    // 스켈레톤 UI 요소들이 있는지 확인
    expect(screen.getByTestId('skeleton-header')).toBeInTheDocument()
    expect(screen.getByTestId('skeleton-image')).toBeInTheDocument()
    expect(screen.getByTestId('skeleton-stats')).toBeInTheDocument()
  })

  it('renders user information correctly', () => {
    // 실제 데이터 상태 모킹
    (usePhotoByIdQuery as jest.Mock).mockReturnValue({
      data: mockImage,
      isLoading: false,
      isError: false
    })

    render(
      <QueryClientProvider client={queryClient}>
        <ImageDetail image={mockImage} />
      </QueryClientProvider>
    )
    
    // 사용자 정보가 있는지 확인
    expect(screen.getByText('Test User')).toBeInTheDocument()
    expect(screen.getByText('@testuser')).toBeInTheDocument()
  })

  it('renders error state correctly', () => {
    // 에러 상태 모킹
    (usePhotoByIdQuery as jest.Mock).mockReturnValue({
      data: undefined,
      isLoading: false,
      isError: true
    })

    render(
      <QueryClientProvider client={queryClient}>
        <ImageDetail image={mockImage} />
      </QueryClientProvider>
    )
    
    // 에러 메시지가 있는지 확인
    expect(screen.getByText(/이미지를 불러오는데 실패했습니다/)).toBeInTheDocument()
  })
})
