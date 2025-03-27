// __tests__/components/NaviBar.test.tsx
import React from 'react'
import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import { screen } from '@testing-library/dom'
import NaviBar from '../../components/layout/NaviBar'

describe('NaviBar', () => {
  const mockItems = [
    { name: 'Home', href: '/', active: true },
    { name: 'Bookmark', href: '/bookmark', active: false }
  ]

  it('renders navigation items correctly', () => {
    render(<NaviBar items={mockItems} />)
    expect(screen.getByText('Home')).toBeInTheDocument()
    expect(screen.getByText('Bookmark')).toBeInTheDocument()
  })

  it('applies active styles to current item', () => {
    render(<NaviBar items={mockItems} />)
    const homeLink = screen.getByText('Home')
    expect(homeLink).toHaveClass('text-foreground')
  })
})