import Image from 'next/image'
import Link from 'next/link'
import { Button } from '../common/Button'

interface HeaderProps {
  user?: {
    name: string
    email: string
  }
}

export default function Header({ user }: HeaderProps) {
  return (
    <header className="sticky left-0 right-0 top-0 z-10 flex h-[6.2rem] items-center justify-between bg-white px-[4rem] py-0">
      <h1>
        <Link href="/" title="윌로그">
          <Image src="/images/logo_black.png" width={103} height={30} alt="윌로그 로고" />
        </Link>
      </h1>
      <div className="flex items-center gap-x-[2.4rem]">
        <Link href="/bookmark" className="group">
          <Button variant="secondary" title="북마크 화면 바로가기">
            북마크
            <svg className="relative ml-[0.5rem] h-[16px] w-[16px]" width="24" height="24" viewBox="0 0 24 24" version="1.1" aria-hidden="false">
              <desc lang="en-US">A heart</desc>
              <path d="M21.424 4.594c-2.101-2.125-5.603-2.125-7.804 0l-1.601 1.619-1.601-1.62c-2.101-2.124-5.603-2.124-7.804 0-2.202 2.126-2.102 5.668 0 7.894L12.019 22l9.405-9.513a5.73 5.73 0 0 0 0-7.893Z"></path>
            </svg>
          </Button>
        </Link>

        {user && 
          <strong className="flex items-center text-gray">
            <span className="mr-[0.5rem] border-r-2 border-solid border-gray pr-[0.5rem]">{user.name}</span>
            <span>{user.email}</span>
          </strong>
        }
      </div>
    </header>
  )
}
