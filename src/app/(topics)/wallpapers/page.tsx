import { Metadata } from 'next'
import CardList from '@/components/layout/CardList'
import { api } from '@/lib/api'

export const metadata: Metadata = {
  title: 'HD 배경화면 & 월페이퍼 | Unsplash Clone',
  description: '아름다운 HD 배경화면과 월페이퍼를 무료로 다운로드하세요',
  keywords: '배경화면, 월페이퍼, HD, 고화질, 무료',
}

// 정적 생성 설정
export const revalidate = 3600 // 1시간마다 재생성

// 정적 경로 생성
export async function generateStaticParams() {
  return [
    { topic: 'wallpapers' },
    { topic: 'nature' },
    { topic: 'travel' }
  ]
}

async function getInitialImages(topic: string) {
  const { data } = await api.get(`/topics/${topic}/photos`, {
    params: {
      per_page: 30,
      page: 1
    }
  })
  return data
}

export default async function WallpapersPage() {
  const initialImages = await getInitialImages('wallpapers')
  return <CardList topic="wallpapers" initialImages={initialImages} />
} 