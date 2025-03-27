import { Viewport } from 'next'
import Link from 'next/link'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
}

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">404</h1>
        <p className="text-xl mb-8">페이지를 찾을 수 없습니다.</p>
        <Link 
          href="/" 
          className="text-blue-500 hover:text-blue-700 underline"
        >
          홈으로 돌아가기
        </Link>
      </div>
    </div>
  )
} 