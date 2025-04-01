import Image from 'next/image'
import Link from 'next/link'
import { Button } from '../common/Button'
import { IconHeart } from '../icons'

export default function Header() {
  return (
    <header className="sticky left-0 right-0 top-0 z-10 flex h-[6.2rem] items-center justify-between bg-white px-[4rem] py-0">
      <h1>
        <Link 
          href="/wallpapers" 
          title="Unsplash"
          prefetch
          scroll={false}
        >
          <Image 
            src="/images/unsplash-logo.svg" 
            width={32} 
            height={32} 
            alt="Unsplash 로고"
            priority
            quality={100}
            loading="eager"
          />
        </Link>
      </h1>
      <div className="flex items-center gap-x-[2.4rem]">
        <Link href="/bookmark" className="group">
          <Button variant="secondary" title="북마크 화면 바로가기">
            북마크
            <IconHeart className="relative ml-[0.5rem] h-[16px] w-[16px]" aria-hidden="false" />
          </Button>
        </Link>

        <strong className="flex items-center text-gray">
          <span className="mr-[0.5rem] border-r-2 border-solid border-gray pr-[0.5rem]">Evie</span>
          <span>evie@wilog.io</span>
        </strong>
      </div>
    </header>
  )
}
