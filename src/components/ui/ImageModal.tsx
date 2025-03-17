'use client'

import Image from 'next/image'
import { useEffect, useRef } from 'react'
import { usePhotoByIdQuery } from '@/hooks/useImageQuery'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { UnsplashImage } from '@/types/unsplash'
import { useRouter } from 'next/navigation'

interface ImageModalProps {
  imageId: string
  initialData: UnsplashImage
}

export default function ImageModal({ imageId, initialData }: ImageModalProps) {
  const router = useRouter();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const { data: image } = usePhotoByIdQuery(imageId, { initialData })

  const onClose = () => {
    dialogRef.current?.close();
    router.back();
  };

  useEffect(() => {
    const dialog = dialogRef.current;
    if (dialog) {
      dialog.showModal();
    }

    return () => {
      if (dialog?.open) {
        dialog.close();
      }
    };
  }, []);

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
      <dialog 
        ref={dialogRef}
        className="bg-transparent p-0"
      >
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white" />
        </div>
      </dialog>
    )
  }

  if (image === null) {
    return (
      <dialog 
        ref={dialogRef}
        className="bg-transparent p-0"
      >
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center">
          <div className="bg-white p-4 rounded-lg">
            이미지를 불러오는데 실패했습니다.
          </div>
        </div>
      </dialog>
    )
  }

  return (
    <dialog 
      ref={dialogRef}
      className="bg-transparent p-0 m-0 max-w-none w-full h-full"
      onClick={onClose}
    >
      <div 
        className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center overflow-y-auto"
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
    </dialog>
  )
} 