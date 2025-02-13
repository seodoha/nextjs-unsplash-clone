import type { Metadata } from 'next'
import { Noto_Sans_KR } from 'next/font/google'
import '@/styles/globals.css'

import Header from '@/components/layout/Header'

const notoSansKr = Noto_Sans_KR({
  subsets: ['latin'],
  weight: ['100', '400', '700', '900'],
})

// 메타데이터를 별도의 상수로 분리
export const metadata: Metadata = {
  title: 'Unsplash Clone',
  description: 'Unsplash Clone',
}

// props 타입을 별도로 정의
type RootLayoutProps = Readonly<{
  children: React.ReactNode
  modal: React.ReactNode
}>

export default function RootLayout({ children, modal }: RootLayoutProps) {
  return (
    <html lang="ko">
      <body className={`${notoSansKr.className} m-0`}>
        <div className="position-relative size-full">
          <Header user={{ name: 'Evie', email: 'evie@wilog.io' }} />
          <main className="size-full">
            {children}
            {modal}
          </main>
        </div>
      </body>
    </html>
  )
}
