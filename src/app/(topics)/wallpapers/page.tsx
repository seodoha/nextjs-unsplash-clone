import { Metadata } from 'next'
import CardList from '@/components/layout/CardList'

export const metadata: Metadata = {
  title: 'HD 배경화면 & 월페이퍼 | Unsplash Clone',
  description: '아름다운 HD 배경화면과 월페이퍼를 무료로 다운로드하세요',
  keywords: '배경화면, 월페이퍼, HD, 고화질, 무료',
}

export default function WallpapersPage() {
  return <CardList topic="wallpapers" />
} 