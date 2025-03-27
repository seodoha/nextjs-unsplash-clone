import React from 'react'
import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import { screen } from '@testing-library/dom'
import ImageCard from '../../components/ui/ImageCard'

describe('ImageCard', () => {
  const mockImage = {
    id: '1',
    urls: { regular: 'test.jpg' },
    alt_description: 'Test Image',
    user: {
      name: 'Test User',
      username: 'testuser',
      profile_image: { medium: 'test.jpg' },
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
    expect(screen.getByAltText('Test Image')).toBeInTheDocument()
  })

  it('renders user name correctly', () => {
    render(<ImageCard image={mockImage} />)
    expect(screen.getByText('Test User')).toBeInTheDocument()
  })
})
