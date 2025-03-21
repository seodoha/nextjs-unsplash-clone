'use client'

import { Navbar, NavbarContent, NavbarItem } from '@nextui-org/react'
import NextLink from 'next/link'
import { usePathname } from 'next/navigation'

interface NavMenuItem {
  name: string
  href: string
  active: boolean
}

interface NaviBarProps {
  items: NavMenuItem[]
}

export default function NaviBar({ items }: NaviBarProps) {
  const pathname = usePathname()
  
  const updatedItems = items.map(item => ({
    ...item,
    active: pathname === item.href
  }))

  const linkStyle = 'flex items-center h-[4rem] text-[1.4rem] transition duration-300'

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
            >
              {menu.name}
            </NextLink>
          </NavbarItem>
        ))}
      </NavbarContent>
    </Navbar>
  )
}
