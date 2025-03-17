import { Metadata } from 'next'
import { getPhotoById } from '@/hooks/useImageQuery'
import ImageModal from '@/components/ui/ImageModal'

interface PageProps {
  params: Promise<{ id: string }>
}

// 동적 메타데이터
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params
  const image = await getPhotoById(resolvedParams.id)
  
  if (!image) {
    return {
      title: '이미지를 찾을 수 없습니다 | Unsplash Clone',
      description: '요청하신 이미지를 찾을 수 없습니다.',
    }
  }

  return {
    title: `${image.alt_description || '이미지'} | Unsplash Clone`,
    description: image.description || '아름다운 고화질 이미지를 확인하세요',
    openGraph: {
      images: [
        {
          url: image.urls?.regular || '',
          width: 1200,
          height: 630,
          alt: image.alt_description || '이미지',
        },
      ],
    },
  }
}

export default async function InterceptedImagePage({ params }: PageProps) {
  const resolvedParams = await params;
  const image = await getPhotoById(resolvedParams.id);
  
  return (
    <ImageModal 
      imageId={resolvedParams.id}
      initialData={image}
    />
  );
} 