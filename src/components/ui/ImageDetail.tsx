'use client'

import Image from 'next/image'
import { usePhotoByIdQuery } from '@/hooks/useImageQuery'
import { UnsplashImage } from '@/types/unsplash';

interface ImageDetailProps {
  imageId: string
}

export default function ImageDetail({ imageId }: ImageDetailProps) {
  const { data: image, isLoading, isError } = usePhotoByIdQuery(imageId) as {
    data: UnsplashImage | undefined;
    isLoading: boolean;
    isError: boolean;
  };

  if (isLoading) {
    return (
      <>
        <header className='sticky top-0 z-10 bg-white'>
          <div className="flex items-center space-x-4 p-3">
            <div className="w-10 h-10 rounded-full bg-gray-200 animate-pulse bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-shimmer" />
            <div className="space-y-2">
              <div className="w-24 h-4 bg-gray-200 rounded bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-shimmer" />
              <div className="w-16 h-3 bg-gray-200 rounded bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-shimmer" />
            </div>
          </div>
        </header>
        <div className="px-5 py-5">
          <div className="relative aspect-[3/2] w-full bg-gray-200 rounded-lg bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-shimmer" />
          <div className='pt-4'>
            <div className='flex gap-20'>
              <div>
                <div className="w-12 h-4 bg-gray-200 rounded bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-shimmer mb-1" />
                <div className="w-8 h-4 bg-gray-200 rounded bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-shimmer" />
              </div>
              <div>
                <div className="w-12 h-4 bg-gray-200 rounded bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-shimmer mb-1" />
                <div className="w-8 h-4 bg-gray-200 rounded bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-shimmer" />
              </div>
            </div>
          </div>
      </div>
      </>
    )
  }

  if (isError || !image) {
    return (
      <div className="flex items-center justify-center">
        <div className="text-center">
          이미지를 불러오는데 실패했습니다.
        </div>
      </div>
    )
  }

  return (
    <>
      <header className='sticky top-0 z-10 bg-white'>
        <div className="flex items-center space-x-4 p-3">
            {image.user.profile_image && (
                <Image
                  src={image.user.profile_image.medium}
                  alt={image.user.name}
                  width={40}
                  height={40}
                  className="rounded-full"
                />
            )}
            <div>
                <p className="font-medium">{image.user.name}</p>
                {image.user.username && (
                  <p className="text-sm text-gray-500">@{image.user.username}</p>
                )}
              </div>
          </div>
        </header>
      <div className="px-5 py-5">
        <div className="relative aspect-[3/2] w-full bg-gray-100">
            <Image
              src={image.urls.regular}
              alt={image.alt_description || '언스플래시 이미지'}
              fill
              className="object-cover rounded-lg"
              sizes="(max-width: 1200px) 90vw, 1000px"
              priority
            />
          </div>
        <div className='pt-4'>
          <div className='flex gap-20'>
            <div>
              <strong className='block text-[#767676] leading-[1.4] text-[14px]'>조회수</strong>
              <span className='leading-[1.4]'>{image.views}</span>
            </div>
            <div>
              <strong className='block text-[#767676] leading-[1.4] text-[14px]'>다운로드</strong>
              <span className='leading-[1.4]'>{image.downloads}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  )
} 