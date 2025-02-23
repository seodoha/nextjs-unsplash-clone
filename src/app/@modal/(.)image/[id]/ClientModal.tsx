'use client';

import { useRouter } from 'next/navigation';
import ImageModal from '@/components/ui/ImageModal';
import { UnsplashImage } from '@/types/unsplash'

export default function ClientModal({ imageId, initialData }: { imageId: string; initialData: UnsplashImage }) {
  const router = useRouter();
  
  const handleClose = () => {
    const basePath = window.location.pathname.split('/image/')[0];
    router.push(basePath);
  };
  
  return (
    <ImageModal 
      imageId={imageId}
      initialData={initialData}
      onClose={handleClose}
      onImageChange={(newId) => router.push(`/image/${newId}`)}
    />
  );
} 