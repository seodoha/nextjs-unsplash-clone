import { Metadata } from 'next'
import CardList from '@/components/layout/CardList'
import { api } from '@/lib/api'

export const metadata: Metadata = {
  title: '여행 사진 | Unsplash Clone',
  description: '아름다운 여행 사진을 무료로 다운로드하세요',
  keywords: '여행, 관광, 사진, 고화질, 무료',
}

// 정적 생성 설정
export const revalidate = 3600 // 1시간마다 재생성

async function getInitialImages() {
  const { data } = await api.get('topics/travel/photos', {
    params: {
      per_page: 30,
      page: 1
    }
  })
  return data
}

export default async function TravelPage() {
  const initialImages = await getInitialImages()
  return <CardList topic="travel" initialImages={initialImages} />
} 