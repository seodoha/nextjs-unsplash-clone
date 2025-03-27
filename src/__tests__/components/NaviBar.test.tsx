// __tests__/components/NaviBar.test.tsx
import React from 'react'
import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import { screen } from '@testing-library/dom'
import NaviBar from '../../components/layout/NaviBar'
import { useImageStore } from '@/store/useStore'
import { jest } from '@jest/globals'

// useImageStore 훅을 모킹하여 테스트에서 사용할 수 있도록 설정
jest.mock('@/store/useStore', () => ({
  useImageStore: jest.fn()
}))

describe('NaviBar', () => {
  // 테스트에 사용할 모의 네비게이션 메뉴 데이터
  const mockItems = [
    { name: '홈', href: '/', active: false },
    { name: '인기', href: '/popular', active: false },
    { name: '최신', href: '/latest', active: false }
  ]

  // 각 테스트 케이스 실행 전에 모킹 초기화
  beforeEach(() => {
    // useImageStore의 기본 모킹 설정
    (useImageStore as unknown as jest.Mock).mockReturnValue({
      currentTopic: '',
      setCurrentTopic: jest.fn()
    })
  })

  // 네비게이션 메뉴 렌더링 테스트
  it('renders navigation items correctly', () => {
    // 컴포넌트 렌더링
    render(<NaviBar items={mockItems} />)
    
    // 모든 메뉴 아이템이 렌더링되는지 확인
    mockItems.forEach(item => {
      expect(screen.getByText(item.name)).toBeInTheDocument()
    })
  })

  // 활성 메뉴 아이템 스타일 테스트
  it('applies correct styles to active menu item', () => {
    // 현재 활성화된 토픽 설정
    (useImageStore as unknown as jest.Mock).mockReturnValue({
      currentTopic: 'popular',
      setCurrentTopic: jest.fn()
    })

    // 컴포넌트 렌더링
    render(<NaviBar items={mockItems} />)
    
    // 활성 메뉴 아이템의 스타일 확인
    const activeItem = screen.getByText('인기')
    expect(activeItem).toHaveClass('font-bold')
    expect(activeItem).toHaveClass('text-[#000000]')
  })

  // 메뉴 클릭 이벤트 테스트
  it('calls setCurrentTopic when menu item is clicked', () => {
    // useImageStore의 setCurrentTopic 함수 모킹
    (useImageStore as unknown as jest.Mock).mockReturnValue({
      currentTopic: '',
      setCurrentTopic: jest.fn()
    })

    // 컴포넌트 렌더링
    render(<NaviBar items={mockItems} />)
    
    // 메뉴 아이템 클릭
    const menuItem = screen.getByText('인기')
    menuItem.click()
    
    // setCurrentTopic이 올바른 인자와 함께 호출되었는지 확인
    expect(useImageStore).toHaveBeenCalledWith('popular')
  })
})