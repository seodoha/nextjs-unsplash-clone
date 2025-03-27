import { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import '@/styles/globals.css'
import Providers from '@/providers/QueryProviders'
import StoreProvider from '@/providers/StoreProvider'
import Header from '@/components/layout/Header'

const inter = Inter({ subsets: ['latin'] })

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
}

// 메타데이터를 별도의 상수로 분리
export const metadata: Metadata = {
  title: 'Unsplash Clone - 무료 고화질 이미지',
  description: 'Unsplash API를 활용한 무료 고화질 이미지 갤러리입니다. 배경화면, 자연, 여행 등 다양한 카테고리의 이미지를 제공합니다.',
  keywords: '무료 이미지, 고화질, 배경화면, 자연, 여행, unsplash',
  robots: 'index, follow',
  openGraph: {
    title: 'Unsplash Clone - 무료 고화질 이미지',
    description: 'Unsplash API를 활용한 무료 고화질 이미지 갤러리입니다.',
    type: 'website',
    locale: 'ko_KR',
  },
}

export default function RootLayout({
  children,
  modal
}: {
  children: React.ReactNode
  modal: React.ReactNode
}) {
  return (
    <html lang="ko">
      <body className={inter.className}>
        <Providers>
          <StoreProvider>
            <div className="position-relative size-full">
              <Header />
              <main className="size-full">
                {children}
              </main>
              {modal}
            </div>
          </StoreProvider>
        </Providers>
      </body>
    </html>
  )
}
