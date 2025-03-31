import { render, screen, waitFor } from '@testing-library/react'
import ImageModal from '@/components/ui/ImageModal'
import userEvent from '@testing-library/user-event'
import { useRouter } from 'next/navigation'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

// Next.js의 useRouter 모킹
jest.mock('next/navigation', () => ({
  useRouter: jest.fn()
}))

// usePhotoByIdQuery 모킹
jest.mock('@/hooks/useImageQuery', () => ({
  usePhotoByIdQuery: jest.fn().mockReturnValue({
    data: {
      id: '1',
      urls: {
        regular: 'https://example.com/image.jpg',
        thumb: 'https://example.com/image-thumb.jpg'
      },
      alt_description: 'Test image',
      user: {
        name: 'Test User',
        username: 'testuser',
        profile_image: {
          small: 'https://example.com/profile.jpg',
          medium: 'https://example.com/profile-medium.jpg'
        },
      },
      likes: 100,
      views: 1000,
      width: 800,
      height: 600,
      downloads: 50,
      description: 'Test Description'
    },
    isLoading: false,
    isError: false
  })
}))

const mockRouter = {
  back: jest.fn()
}

const mockImage = {
  id: '1',
  urls: {
    regular: 'https://example.com/image.jpg',
    thumb: 'https://example.com/image-thumb.jpg'
  },
  alt_description: 'Test image',
  user: {
    name: 'Test User',
    username: 'testuser',
    profile_image: {
      small: 'https://example.com/profile.jpg',
      medium: 'https://example.com/profile-medium.jpg'
    },
  },
  likes: 100,
  views: 1000,
  width: 800,
  height: 600,
  downloads: 50,
  description: 'Test Description'
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
})

// HTMLDialogElement 메서드 모킹
beforeAll(() => {
  HTMLDialogElement.prototype.showModal = jest.fn()
  HTMLDialogElement.prototype.close = jest.fn()
})

afterAll(() => {
  jest.restoreAllMocks()
})

const renderWithProviders = (ui: React.ReactElement) => {
  return render(
    <QueryClientProvider client={queryClient}>
      {ui}
    </QueryClientProvider>
  )
}

describe('ImageModal', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    ;(useRouter as jest.Mock).mockReturnValue(mockRouter)
  })

  it('renders image details correctly', async () => {
    renderWithProviders(<ImageModal image={mockImage} />)

    const dialog = screen.getByTestId('image-modal-dialog')
    expect(dialog).toBeInTheDocument()

    await waitFor(() => {
      const image = screen.getByTestId('main-image')
      expect(image).toBeInTheDocument()
      expect(image).toHaveAttribute('src', expect.stringContaining('/_next/image'))
      expect(image).toHaveAttribute('src', expect.stringContaining(encodeURIComponent(mockImage.urls.regular)))
      expect(image).toHaveAttribute('alt', mockImage.alt_description)
    })
  })

  it('renders with correct container classes', () => {
    renderWithProviders(<ImageModal image={mockImage} />)

    const dialog = screen.getByTestId('image-modal-dialog')
    expect(dialog).toHaveClass('bg-transparent')
    expect(dialog).toHaveClass('p-0')
    expect(dialog).toHaveClass('m-0')
  })

  it('calls router.back() when close button is clicked', async () => {
    const user = userEvent.setup()
    renderWithProviders(<ImageModal image={mockImage} />)

    const closeButton = screen.getByLabelText('모달 닫기')
    await user.click(closeButton)

    expect(mockRouter.back).toHaveBeenCalled()
  })
}) 