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
  title: 'Unsplash Clone',
  description: 'Unsplash API를 활용한 이미지 갤러리 웹 애플리케이션입니다.',
  icons: {
    icon: [
      {
        url: '/favicon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: [
      {
        url: '/favicon.svg',
        type: 'image/svg+xml',
      },
    ],
  },
  manifest: '/manifest.json',
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
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
