import { render, screen, fireEvent } from '@testing-library/react'
import ImageCard from '@/components/ui/ImageCard'
import { ImageState } from '@/store/useStore'

jest.mock('@/store/useStore', () => ({
  useImageStore: jest.fn()
}))

const mockUseImageStore = jest.requireMock('@/store/useStore').useImageStore

const mockImage = {
  id: '1',
  urls: {
    regular: 'https://example.com/test.jpg',
    thumb: 'https://example.com/test-thumb.jpg'
  },
  alt_description: 'Test Image',
  description: 'Test Description',
  user: {
    name: 'Test User',
    username: 'testuser',
    profile_image: {
      medium: 'https://example.com/profile.jpg'
    },
    links: {
      html: 'https://test.com'
    }
  },
  likes: 100,
  downloads: 50,
  views: 200,
  width: 800,
  height: 600
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

describe('ImageCard', () => {
  beforeEach(() => {
    mockUseImageStore.mockImplementation((selector?: (state: ImageState) => unknown) => {
      return selector ? selector(mockState as ImageState) : mockState
    })
  })

  it('renders image with correct props', () => {
    render(<ImageCard image={mockImage} />)

    const image = screen.getByAltText(mockImage.alt_description)
    expect(image).toBeInTheDocument()
    expect(image).toHaveAttribute('alt', mockImage.alt_description)
    expect(image).toHaveClass('w-full')
    expect(image).toHaveClass('h-full')
    expect(image).toHaveClass('object-cover')
  })

  it('toggles bookmark when heart icon is clicked', () => {
    const addLikedImage = jest.fn()
    const removeLikedImage = jest.fn()
    const customState = {
      ...mockState,
      addLikedImage,
      removeLikedImage,
      isImageLiked: () => false
    }

    mockUseImageStore.mockImplementation((selector?: (state: ImageState) => unknown) => {
      return selector ? selector(customState as ImageState) : customState
    })

    render(<ImageCard image={mockImage} />)

    const heartButton = screen.getByLabelText('북마크 추가')
    fireEvent.click(heartButton)

    expect(addLikedImage).toHaveBeenCalledWith(mockImage)
  })

  it('shows filled heart icon when image is bookmarked', () => {
    const customState = {
      ...mockState,
      isImageLiked: () => true
    }

    mockUseImageStore.mockImplementation((selector?: (state: ImageState) => unknown) => {
      return selector ? selector(customState as ImageState) : customState
    })

    render(<ImageCard image={mockImage} />)

    const heartButton = screen.getByLabelText('북마크 취소')
    const svg = heartButton.querySelector('svg')
    expect(svg).toHaveClass('fill-red-500')
  })

  it('shows outline heart icon when image is not bookmarked', () => {
    const customState = {
      ...mockState,
      isImageLiked: () => false
    }

    mockUseImageStore.mockImplementation((selector?: (state: ImageState) => unknown) => {
      return selector ? selector(customState as ImageState) : customState
    })

    render(<ImageCard image={mockImage} />)

    const heartButton = screen.getByLabelText('북마크 추가')
    const svg = heartButton.querySelector('svg')
    expect(svg).toHaveClass('fill-[#d1d1d1]')
  })

  it('renders with correct container classes', () => {
    render(<ImageCard image={mockImage} />)

    const container = screen.getByTestId('image-card')
    expect(container).toHaveClass('group')
    expect(container).toHaveClass('relative')
    expect(container).toHaveClass('overflow-hidden')
    expect(container).toHaveClass('rounded-lg')
  })
}) 