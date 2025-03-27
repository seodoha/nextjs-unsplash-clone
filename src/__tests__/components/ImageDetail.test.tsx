import React from 'react'
import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import { screen } from '@testing-library/dom'
import ImageDetail from '../../components/layout/ImageDetail'

describe('ImageDetail', () => {
  const mockImage = {
    id: '1',
    urls: { regular: 'test.jpg' },
    alt_description: 'Test Image',
    user: {
      name: 'Test User',
      links: { html: 'https://test.com' }
    },
    likes: 100,
    downloads: 50,
    views: 200
  }

  it('renders image details correctly', () => {
    render(<ImageDetail image={mockImage} />)
    expect(screen.getByAltText('Test Image')).toBeInTheDocument()
    expect(screen.getByText('Test User')).toBeInTheDocument()
    expect(screen.getByText('100')).toBeInTheDocument()
    expect(screen.getByText('50')).toBeInTheDocument()
    expect(screen.getByText('200')).toBeInTheDocument()
  })
})
