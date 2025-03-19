import { Suspense } from 'react'
import { Metadata } from 'next'
import ImageDetail from '@/components/ui/ImageDetail'
import { getPhotoById } from '@/hooks/useImageQuery'

interface PageProps {
  params: Promise<{ id: string }>
}

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