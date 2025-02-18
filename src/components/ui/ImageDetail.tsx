'use client'

import Image from 'next/image'
import { usePhotoByIdQuery } from '@/hooks/useImageQuery'

interface ImageDetailProps {
  imageId: string
}

export default function ImageDetail({ imageId }: ImageDetailProps) {
  const { data: image, isLoading, isError } = usePhotoByIdQuery(imageId)

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
      </div>
    )
  }

  if (isError || !image) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          이미지를 불러오는데 실패했습니다.
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-5xl mx-auto">
        <div className="relative aspect-[3/2] w-full mb-6">
          <Image
            src={image.urls.regular}
            alt={image.alt_description || '언스플래시 이미지'}
            fill
            className="object-cover rounded-lg"
            sizes="(max-width: 1200px) 90vw, 1000px"
            priority
          />
        </div>
        <div className="space-y-4">
          <h1 className="text-3xl font-bold">{image.alt_description}</h1>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
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
          </div>
          <div className="flex gap-4 text-sm text-gray-500">
            <span>좋아요: {image.likes}</span>
            {image.downloads && <span>다운로드: {image.downloads}</span>}
          </div>
          {image.description && (
            <p className="text-gray-700">{image.description}</p>
          )}
        </div>
      </div>
    </div>
  )
} 