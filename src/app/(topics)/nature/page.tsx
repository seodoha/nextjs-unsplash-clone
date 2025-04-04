import { Metadata, Viewport } from 'next'
import CardList from '@/components/layout/CardList'
import { api } from '@/lib/api'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
}

export const metadata: Metadata = {
  title: '자연 사진 | Unsplash Clone',
  description: '아름다운 자연 사진을 무료로 다운로드하세요',
  keywords: '자연, 풍경, 사진, 고화질, 무료',
}

// 정적 생성 설정
export const revalidate = 3600 // 1시간마다 재생성

async function getInitialImages() {
  try {
    const { data } = await api.get('topics/nature/photos', {
      params: {
        per_page: 30,
        page: 1
      }
    })
    return data
  } catch (error) {
    console.error('Failed to fetch nature images:', error)
    return []
  }
}

export default async function NaturePage() {
  const initialImages = await getInitialImages()
  return <CardList topic="nature" initialImages={initialImages} />
} 