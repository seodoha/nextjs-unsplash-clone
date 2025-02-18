'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { usePhotoByIdQuery } from '@/hooks/useImageQuery'
import { XMarkIcon } from '@heroicons/react/24/outline'

interface ImageModalProps {
  imageId: string
}

export default function ImageModal({ imageId }: ImageModalProps) {
  const router = useRouter()
  const { data: image, isLoading, isError } = usePhotoByIdQuery(imageId)

  useEffect(() => {
    // 모달이 열릴 때 스크롤 고정
    document.body.style.overflow = 'hidden'
    
    // 모달이 닫힐 때 스크롤 복원
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [])

  useEffect(() => {
    if (image) {
      const originalTitle = document.title
      document.title = `${image.alt_description || '이미지'} | Unsplash Clone`
      
      return () => {
        document.title = originalTitle
      }
    }
  }, [image])

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white" />
      </div>
    )
  }

  if (isError || !image) {
    return (
      <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center">
        <div className="bg-white p-4 rounded-lg">
          이미지를 불러오는데 실패했습니다.
        </div>
      </div>
    )
  }

  return (
    <div 
      className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center overflow-y-auto"
      onClick={() => router.back()}
    >
      <div 
        className="relative my-8 w-[90%] max-w-4xl bg-white rounded-lg p-4"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={() => router.back()}
          className="absolute -right-4 -top-4 z-10 rounded-full bg-white p-2 shadow-md hover:bg-gray-100 transition-colors"
          aria-label="모달 닫기"
        >
          <XMarkIcon className="h-6 w-6 text-gray-500" />
        </button>
        <div className="relative aspect-[3/2] w-full mb-4">
          <Image
            src={image.urls.regular}
            alt={image.alt_description || '언스플래시 이미지'}
            fill
            className="object-cover rounded-lg"
            sizes="(max-width: 1200px) 90vw, 1000px"
            priority
          />
        </div>
        <div className="space-y-2">
          <h2 className="text-xl font-bold">{image.alt_description}</h2>
          <p className="text-gray-600">촬영자: {image.user.name}</p>
          <div className="flex gap-2">
            <span className="text-sm text-gray-500">
              좋아요: {image.likes}
            </span>
            {image.downloads && (
              <span className="text-sm text-gray-500">
                다운로드: {image.downloads}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  )
} 