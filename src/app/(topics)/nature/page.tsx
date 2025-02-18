import { Metadata } from 'next'
import CardList from '@/components/layout/CardList'

export const metadata: Metadata = {
  title: '자연 사진 & 이미지 | Unsplash Clone',
  description: '아름다운 자연 사진과 이미지를 무료로 다운로드하세요',
  keywords: '자연, 풍경, 사진, 이미지, 무료',
}

export default function NaturePage() {
  return <CardList topic="nature" />
} 