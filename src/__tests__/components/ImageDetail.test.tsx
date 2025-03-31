import { render, screen, fireEvent } from '@testing-library/react'
import ImageDetail from '@/components/layout/ImageDetail'
import { QueryClient, QueryClientProvider, UseQueryResult } from '@tanstack/react-query'
import { ImageState } from '@/store/useStore'
import { UnsplashImage } from '@/types/unsplash'
import * as useImageQuery from '@/hooks/useImageQuery'

jest.mock('@/store/useStore', () => ({
  useImageStore: jest.fn()
}))

jest.mock('@/hooks/useImageQuery', () => ({
  usePhotoByIdQuery: jest.fn()
}))

const mockUseImageStore = jest.requireMock('@/store/useStore').useImageStore

const mockUser = {
  name: '테스트 유저',
  username: 'testuser',
  profile_image: {
    medium: 'https://example.com/profile.jpg'
  }
}

const mockImage: UnsplashImage = {
  id: '123',
  urls: {
    regular: 'https://example.com/image.jpg',
    thumb: 'https://example.com/image-thumb.jpg'
  },
  alt_description: '테스트 이미지',
  description: '테스트 이미지 설명',
  user: mockUser,
  likes: 100,
  downloads: 50,
  views: 1000,
  width: 1920,
  height: 1080
}

const mockState: Omit<ImageState, 'currentTopic'> & { currentTopic: string | null } = {
  likedImages: [],
  loadedImages: [],
  currentTopic: null,
  addLikedImage: jest.fn(),
  removeLikedImage: jest.fn(),
  isImageLiked: () => false,
  setLoadedImages: jest.fn(),
  setCurrentTopic: jest.fn()
}

describe('ImageDetail', () => {
  let queryClient: QueryClient

  beforeEach(() => {
    queryClient = new QueryClient()
    mockUseImageStore.mockImplementation((selector?: (state: ImageState) => unknown) => {
      return selector ? selector(mockState as ImageState) : mockState
    })
  })

  it('renders loading state correctly', () => {
    jest.spyOn(useImageQuery, 'usePhotoByIdQuery').mockReturnValue({
      data: undefined,
      isLoading: true,
      isError: false
    } as UseQueryResult<UnsplashImage, Error>)
    
    render(
      <QueryClientProvider client={queryClient}>
        <ImageDetail image={mockImage} />
      </QueryClientProvider>
    )
    
    expect(screen.getByTestId('skeleton-header')).toBeInTheDocument()
    expect(screen.getByTestId('skeleton-image')).toBeInTheDocument()
    expect(screen.getByTestId('skeleton-stats')).toBeInTheDocument()
  })

  it('renders error state correctly', () => {
    jest.spyOn(useImageQuery, 'usePhotoByIdQuery').mockReturnValue({
      data: undefined,
      isLoading: false,
      isError: true
    } as UseQueryResult<UnsplashImage, Error>)
    
    render(
      <QueryClientProvider client={queryClient}>
        <ImageDetail image={mockImage} />
      </QueryClientProvider>
    )
    
    expect(screen.getByText('이미지를 불러오는데 실패했습니다.')).toBeInTheDocument()
  })

  it('renders image details correctly', () => {
    jest.spyOn(useImageQuery, 'usePhotoByIdQuery').mockReturnValue({
      data: mockImage,
      isLoading: false,
      isError: false
    } as UseQueryResult<UnsplashImage, Error>)

    render(
      <QueryClientProvider client={queryClient}>
        <ImageDetail image={mockImage} />
      </QueryClientProvider>
    )

    expect(screen.getByTestId('profile-image')).toBeInTheDocument()
    expect(screen.getByTestId('main-image')).toBeInTheDocument()
    expect(screen.getByText('테스트 유저')).toBeInTheDocument()
    expect(screen.getByText('@testuser')).toBeInTheDocument()
    expect(screen.getByText('1000')).toBeInTheDocument()
    expect(screen.getByText('50')).toBeInTheDocument()
  })

  it('toggles bookmark when heart icon is clicked', () => {
    jest.spyOn(useImageQuery, 'usePhotoByIdQuery').mockReturnValue({
      data: mockImage,
      isLoading: false,
      isError: false
    } as UseQueryResult<UnsplashImage, Error>)

    const addLikedImage = jest.fn()
    const removeLikedImage = jest.fn()
    const customState = {
      ...mockState,
      addLikedImage,
      removeLikedImage
    }
    mockUseImageStore.mockImplementation((selector?: (state: ImageState) => unknown) => {
      return selector ? selector(customState as ImageState) : customState
    })

    render(
      <QueryClientProvider client={queryClient}>
        <ImageDetail image={mockImage} />
      </QueryClientProvider>
    )

    const bookmarkButton = screen.getByLabelText('북마크 추가')
    fireEvent.click(bookmarkButton)
    expect(addLikedImage).toHaveBeenCalledWith(mockImage)
  })

  it('shows filled heart icon when image is bookmarked', () => {
    jest.spyOn(useImageQuery, 'usePhotoByIdQuery').mockReturnValue({
      data: mockImage,
      isLoading: false,
      isError: false
    } as UseQueryResult<UnsplashImage, Error>)

    const customState = {
      ...mockState,
      isImageLiked: () => true
    }
    mockUseImageStore.mockImplementation((selector?: (state: ImageState) => unknown) => {
      return selector ? selector(customState as ImageState) : customState
    })

    render(
      <QueryClientProvider client={queryClient}>
        <ImageDetail image={mockImage} />
      </QueryClientProvider>
    )

    const heartIcon = screen.getByTestId('heart-icon')
    expect(heartIcon).toHaveClass('fill-red-500')
  })

  it('shows outline heart icon when image is not bookmarked', () => {
    jest.spyOn(useImageQuery, 'usePhotoByIdQuery').mockReturnValue({
      data: mockImage,
      isLoading: false,
      isError: false
    } as UseQueryResult<UnsplashImage, Error>)

    const customState = {
      ...mockState,
      isImageLiked: () => false
    }
    mockUseImageStore.mockImplementation((selector?: (state: ImageState) => unknown) => {
      return selector ? selector(customState as ImageState) : customState
    })

    render(
      <QueryClientProvider client={queryClient}>
        <ImageDetail image={mockImage} />
      </QueryClientProvider>
    )

    const heartIcon = screen.getByTestId('heart-icon')
    expect(heartIcon).toHaveClass('fill-[#d1d1d1]')
  })

  it('renders with correct container classes', () => {
    jest.spyOn(useImageQuery, 'usePhotoByIdQuery').mockReturnValue({
      data: mockImage,
      isLoading: false,
      isError: false
    } as UseQueryResult<UnsplashImage, Error>)

    render(
      <QueryClientProvider client={queryClient}>
        <ImageDetail image={mockImage} />
      </QueryClientProvider>
    )

    const article = screen.getByRole('article')
    expect(article).toBeInTheDocument()
  })
})
