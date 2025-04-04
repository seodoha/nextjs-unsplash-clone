'use client';

import { Suspense, useState, useEffect } from 'react';
import ImageCard from '@/components/ui/ImageCard';
import { useImageStore } from '@/store/useStore';
import { UnsplashImage } from '@/types/unsplash';

export default function BookmarkPage() {
  const likedImages = useImageStore((state) => state.likedImages);
  const [displayImages, setDisplayImages] = useState<UnsplashImage[]>([]);

  // 컴포넌트 마운트 시에만 이미지 목록 초기화
  useEffect(() => {
    const validImages = likedImages.filter(image => image && image.urls && image.urls.regular);
    setDisplayImages(validImages);
  }, []); // 빈 의존성 배열로 마운트 시에만 실행

  const getColumnImages = (columnIndex: number) => {
    return displayImages
      .filter((_, index) => index % 3 === columnIndex)
      .map((image, index) => (
        <ImageCard 
          key={`${columnIndex}-${image.id}-${index}`} 
          image={image} 
        />
      ));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Suspense fallback={<div>로딩중...</div>}>
        {displayImages.length > 0 ? (
          <div className="mx-auto md:w-full md:max-w-[1296px]">
            <div className="grid grid-cols-[repeat(3,minmax(0,1fr))] gap-x-[24px]">
              <div key="column-0" className="grid grid-cols-[minmax(0,1fr)] gap-y-[24px]">{getColumnImages(0)}</div>
              <div key="column-1" className="grid grid-cols-[minmax(0,1fr)] gap-y-[24px]">{getColumnImages(1)}</div>
              <div key="column-2" className="grid grid-cols-[minmax(0,1fr)] gap-y-[24px]">{getColumnImages(2)}</div>
            </div>
          </div>
        ) : (
          <div className="text-center text-gray-500">
            아직 좋아요한 이미지가 없습니다.
          </div>
        )}
      </Suspense>
    </div>
  );
}
