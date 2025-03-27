import React from 'react'
import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import { screen } from '@testing-library/dom'
import ImageCard from '../../components/ui/ImageCard'

describe('ImageCard', () => {
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

  it('renders image correctly', () => {
    render(<ImageCard image={mockImage} />)
    const image = screen.getByAltText('Test Image')
    expect(image).toBeInTheDocument()
    expect(image).toHaveAttribute('src')
  })

  it('renders like button', () => {
    render(<ImageCard image={mockImage} />)
    const likeButton = screen.getByRole('button')
    expect(likeButton).toBeInTheDocument()
    expect(likeButton).toHaveClass('absolute')
  })
})