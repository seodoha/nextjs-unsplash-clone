import { redirect } from 'next/navigation'
import { Metadata } from 'next'

export default function Home() {
  redirect('/wallpapers')
}

export const metadata: Metadata = {
  title: 'Unsplash Clone - 무료 이미지',
  description: '아름다운 무료 이미지와 사진을 찾아보세요',
  keywords: '무료 이미지, 사진, 포토그래피, unsplash',
}
