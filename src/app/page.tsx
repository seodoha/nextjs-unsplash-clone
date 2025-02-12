import NaviBar from './../components/layout/NaviBar'
import CardList from 'components/layout/CardList'

const menuItems = [
  { name: '배경화면', href: '/background', active: true },
  { name: '자연', href: '/natural', active: false },
  { name: '텍스쳐쳐', href: '/texture', active: false },
]

export default function Home() {
  return (
    <>
      <NaviBar items={menuItems} />
      <div className="pt-[4rem]">
        <CardList />
      </div>
    </>
  )
}
