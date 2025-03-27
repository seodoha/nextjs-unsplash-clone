import { Suspense } from 'react'
import { Metadata } from 'next'
import ImageDetail from '@/components/layout/ImageDetail'
import { getPhotoById } from '@/hooks/useImageQuery'

interface PageProps {
  params: Promise<{ id: string }>
}

// 정적 생성 설정
export const revalidate = 3600 // 1시간마다 재생성

// 동적 메타데이터
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params
  const image = await getPhotoById(resolvedParams.id)
  
  return {
    title: `${image.alt_description || '이미지'} | Unsplash Clone`,
    description: image.description || '아름다운 고화질 이미지를 확인하세요',
    openGraph: {
      images: [
        {
          url: image.urls.regular,
          width: 1200,
          height: 630,
          alt: image.alt_description || '이미지',
        },
      ],
    },
  }
}

// 정적 경로 생성
export async function generateStaticParams() {
  // 인기 있는 이미지 ID들을 미리 생성
  const popularImageIds = [
    'photo-1682687220742-aba13b6e50ba',
    'photo-1682687221038-404670f09ef1',
    'photo-1682687220067-dced0a5863c3',
    // ... 더 많은 인기 이미지 ID 추가
  ]

  return popularImageIds.map((id) => ({
    id,
  }))
}

export default async function ImagePage({ params }: PageProps) {
  const resolvedParams = await params
  const image = await getPhotoById(resolvedParams.id);
  
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="container mx-auto">
        <ImageDetail image={image} />
      </div>
    </Suspense>
  )
}