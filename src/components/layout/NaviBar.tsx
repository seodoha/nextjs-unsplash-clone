'use client'

import { useImageStore } from '@/store/useStore'
import { Navbar, NavbarContent, NavbarItem } from '@nextui-org/react'
import NextLink from 'next/link'

interface NavMenuItem {
  name: string
  href: string
  active: boolean
}

interface NaviBarProps {
  items: NavMenuItem[]
}

export default function NaviBar({ items }: NaviBarProps) {
  const { currentTopic, setCurrentTopic } = useImageStore();

  const updatedItems = items.map(item => ({
    ...item,
    active: item.href === '/' + currentTopic
  }));

  const linkStyle = 'flex items-center h-[4rem] text-[1.4rem] transition duration-300';

  const handleClick = (href: string) => {
    const topic = href.slice(1); // 앞의 '/' 제거
    setCurrentTopic(topic);
  };

  return (
    <Navbar className="top-[6.2rem] bg-white px-[0.5rem]" maxWidth="full">
      <NavbarContent className="gap-[2.4rem]">
        {updatedItems.map((menu) => (
          <NavbarItem 
            key={menu.name} 
            isActive={menu.active} 
            className={`${menu.active ? 'border-b-2 border-[#000000]' : ''}`}
          >
            <NextLink
              href={menu.href}
              className={`${menu.active ? `${linkStyle} font-bold text-[#000000]` : `${linkStyle} text-foreground`}`}
              aria-current={menu.active ? 'page' : undefined}
              onClick={() => handleClick(menu.href)}
            >
              {menu.name}
            </NextLink>
          </NavbarItem>
        ))}
      </NavbarContent>
    </Navbar>
  )
}
