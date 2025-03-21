'use client'

import { useEffect, useRef } from 'react'
import { UnsplashImage } from '@/types/unsplash'
import { useRouter } from 'next/navigation'
import ImageDetail from './ImageDetail'

interface ImageModalProps {
  image: UnsplashImage
}

export default function ImageModal({ image }: ImageModalProps) {
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
      className="bg-transparent p-0 m-0 max-w-none w-full h-full overflow-x-hidden"
      onClick={onClose}
    >
      <div 
        className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center overflow-y-auto opacity-0 transition-opacity duration-200"
        style={{ opacity: 1 }}
      >
        <div 
          className="relative w-[90%] bg-white rounded-lg overflow-x-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={onClose}
            className="fixed left-4 top-4 z-20 p-2"
            aria-label="모달 닫기"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="group-hover:scale-110 transition-transform">
              <path d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z" fill="white"/>
            </svg>
          </button>
          <ImageDetail image={image} />
        </div>
      </div>
    </dialog>
  )
} 