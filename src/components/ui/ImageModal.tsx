'use client'

import { useEffect, useRef, useCallback } from 'react'
import { UnsplashImage } from '@/types/unsplash'
import { useRouter } from 'next/navigation'
import ImageDetail from '../layout/ImageDetail'
import { IconClose } from '../icons'

interface ImageModalProps {
  image: UnsplashImage
}

export default function ImageModal({ image }: ImageModalProps) {
  const router = useRouter();
  const dialogRef = useRef<HTMLDialogElement>(null);

  const onClose = useCallback(() => {
    dialogRef.current?.close();
    router.back();
  }, [router]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (dialog) {
      dialog.showModal();

      // ESC 키 이벤트 처리
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          e.preventDefault();
          onClose();
        }
      };

      dialog.addEventListener('keydown', handleKeyDown);

      return () => {
        dialog.removeEventListener('keydown', handleKeyDown);
        if (dialog?.open) {
          dialog.close();
        }
      };
    }
  }, [onClose]);

  return (
    <dialog 
      ref={dialogRef}
      className="bg-transparent p-0 m-0 max-w-none w-full h-full overflow-x-hidden"
      onClick={onClose}
      data-testid="image-modal-dialog"
    >
      <div 
        className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center overflow-y-auto opacity-0 transition-opacity duration-200"
        style={{ opacity: 1 }}
        data-testid="image-container"
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
            <IconClose className="group-hover:scale-110 transition-transform" />
          </button>
          <ImageDetail image={image} />
        </div>
      </div>
    </dialog>
  )
} 