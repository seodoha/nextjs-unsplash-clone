'use client'

import Image from 'next/image'
import { useEffect } from 'react'
import { usePhotoByIdQuery } from '@/hooks/useImageQuery'
import { XMarkIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline'
import { useImageStore } from '@/store/useStore'
import { UnsplashImage } from '@/types/unsplash'

interface ImageModalProps {
  imageId: string
  initialData: UnsplashImage
  onClose: () => void
  onImageChange: (newImageId: string) => void
}

export default function ImageModal({ imageId, initialData, onClose, onImageChange }: ImageModalProps) {
  const getCurrentImage = useImageStore(state => state.getCurrentImage)
  const { prev, next } = getCurrentImage(imageId)
  const { data: image } = usePhotoByIdQuery(imageId, { initialData })

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleEsc)
    return () => window.removeEventListener('keydown', handleEsc)
  }, [onClose])

  const handleNavigation = (direction: 'prev' | 'next') => {
    const targetImage = direction === 'prev' ? prev : next
    if (targetImage) {
      onImageChange(targetImage.id)
    }
  }

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

  if (image === undefined) {
    return (
      <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white" />
      </div>
    )
  }

  if (image === null) {
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
      onClick={onClose}
    >
      <div 
        className="relative my-8 w-[90%] max-w-4xl bg-white rounded-lg p-4"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute -right-4 -top-4 z-10 rounded-full bg-white p-2 shadow-md hover:bg-gray-100 transition-colors"
          aria-label="모달 닫기"
        >
          <XMarkIcon className="h-6 w-6 text-gray-500" />
        </button>
        <button
          onClick={() => handleNavigation('prev')}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-10 rounded-full bg-white/80 p-2 shadow-md hover:bg-white transition-colors"
          aria-label="이전 이미지"
        >
          <ChevronLeftIcon className="h-6 w-6 text-gray-700" />
        </button>
        <button
          onClick={() => handleNavigation('next')}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-10 rounded-full bg-white/80 p-2 shadow-md hover:bg-white transition-colors"
          aria-label="다음 이미지"
        >
          <ChevronRightIcon className="h-6 w-6 text-gray-700" />
        </button>
        {image?.urls?.regular && (
          <div className="relative aspect-[3/2] w-full mb-4">
            <Image
              src={image.urls.regular}
              alt={image.alt_description || '이미지'}
              fill
              priority
              className="object-cover rounded-lg"
              sizes="(max-width: 1200px) 90vw, 1000px"
            />
          </div>
        )}
        <div className="space-y-2">
          <h2 className="text-xl font-bold">{image?.alt_description}</h2>
          <p className="text-gray-600">촬영자: {image?.user?.name}</p>
          <div className="flex gap-2">
            <span className="text-sm text-gray-500">
              좋아요: {image?.likes}
            </span>
            {image?.downloads && (
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