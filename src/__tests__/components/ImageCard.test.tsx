import React from 'react'
import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import { screen } from '@testing-library/dom'
import ImageCard from '../../components/ui/ImageCard'
import { useImageStore } from '@/store/useStore'
import { jest } from '@jest/globals'

// useImageStore 훅을 모킹하여 테스트에서 사용할 수 있도록 설정
jest.mock('@/store/useStore', () => ({
  useImageStore: jest.fn()
}))

describe('ImageCard', () => {
  // 테스트에 사용할 모의 이미지 데이터
  const mockImage = {
    id: '1',
    urls: { regular: 'https://example.com/test.jpg' }, // Next.js Image 컴포넌트를 위한 절대 URL
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
    // useImageStore의 기본 모킹 설정
    (useImageStore as unknown as jest.Mock).mockReturnValue({
      isImageLiked: () => false,
      addLikedImage: jest.fn(),
      removeLikedImage: jest.fn(),
      setCurrentTopic: jest.fn()
    })
  })

  // 이미지 렌더링 테스트
  it('renders image correctly', () => {
    // 컴포넌트 렌더링
    render(<ImageCard image={mockImage} />)
    
    // 이미지 요소가 존재하는지 확인
    const image = screen.getByAltText('Test Image')
    expect(image).toBeInTheDocument()
    expect(image).toHaveAttribute('src')
  })

  // 좋아요 버튼 렌더링 테스트
  it('renders like button', () => {
    // 컴포넌트 렌더링
    render(<ImageCard image={mockImage} />)
    
    // 좋아요 버튼이 존재하고 올바른 스타일을 가지고 있는지 확인
    const likeButton = screen.getByRole('button')
    expect(likeButton).toBeInTheDocument()
    expect(likeButton).toHaveClass('absolute')
  })
})