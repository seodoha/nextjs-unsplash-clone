'use client'

import { useEffect, useRef } from 'react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { UnsplashImage } from '@/types/unsplash'
import { useRouter } from 'next/navigation'
import ImageDetail from './ImageDetail'

interface ImageModalProps {
  imageId: string
  initialData: UnsplashImage
}

export default function ImageModal({ imageId }: ImageModalProps) {
  const router = useRouter();
  const dialogRef = useRef<HTMLDialogElement>(null);

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

  return (
    <dialog 
      ref={dialogRef}
      className="bg-transparent p-0 m-0 max-w-none w-full h-full"
      onClick={onClose}
    >
      <div 
        className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center overflow-y-auto opacity-0 transition-opacity duration-200"
        style={{ opacity: 1 }}
      >
        <div 
          className="relative my-8 w-[90%] max-w-4xl bg-white rounded-lg"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={onClose}
            className="absolute -right-4 -top-4 z-20 rounded-full bg-white p-2 shadow-md hover:bg-gray-100 transition-colors"
            aria-label="모달 닫기"
          >
            <XMarkIcon className="h-6 w-6 text-gray-500" />
          </button>
          <ImageDetail imageId={imageId} />
        </div>
      </div>
    </dialog>
  )
} 