import NaviBar from '@/components/layout/NaviBar'

const menuItems = [
  { name: '배경화면', href: '/wallpapers', active: false },
  { name: '자연', href: '/natural', active: false },
  { name: '여행하다', href: '/travel', active: false },
]

export default function TopicsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <NaviBar items={menuItems} />
      <div className="pt-[4rem]">
        {children}
      </div>
    </>
  )
} 