'use client'

import Image from 'next/image'
import { usePhotoByIdQuery } from '@/hooks/useImageQuery'
import { UnsplashImage } from '@/types/unsplash';
import { useImageStore } from '@/store/useStore';
import { IconHeart } from '../icons';

interface ImageDetailProps {
  image: UnsplashImage
}

export default function ImageDetail({ image }: ImageDetailProps) {
  const { data, isLoading, isError } = usePhotoByIdQuery(image.id) as {
    data: UnsplashImage | undefined;
    isLoading: boolean;
    isError: boolean;
  };

  const {
    addLikedImage, 
    removeLikedImage,
  } = useImageStore()

  const liked = useImageStore((state) => state.isImageLiked(image.id))

  const toggleLike = () => {
    if (liked) {
      removeLikedImage(image.id)
    } else {
      addLikedImage(image)
    }
  }

  const handleDownload = async () => {
    if (!image.urls.regular) return;
    const response = await fetch(image.urls.regular)
    const blob = await response.blob()
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${image.alt_description || 'unsplash-image'}.jpg`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    window.URL.revokeObjectURL(url)
  }

  // 이미지 컨테이너 스타일을 상수로 분리
  const imageContainerStyle = {
    width: '100%',
    maxWidth: '100%',
    aspectRatio: `${image.width} / ${image.height}`,
    maxHeight: 'calc(100vh - 175px)',
    height: 'auto'
  };

  if (isError) {
    return (
      <div className="flex items-center justify-center min-h-[300px]">
        <div className="text-center">
          이미지를 불러오는데 실패했습니다.
        </div>
      </div>
    )
  }

  if (isLoading || !data) {
    return (
      <>
        <div className='sticky top-0 z-10'>
          <header className='flex justify-between items-center px-7 py-3 bg-white rounded-lg' data-testid="skeleton-header">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 rounded-full bg-gray-200 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-shimmer" />
              <div className="space-y-2">
                <div className="w-24 h-4 bg-gray-200 rounded bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-shimmer" />
                <div className="w-16 h-3 bg-gray-200 rounded bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-shimmer" />
              </div>
            </div>
            <div className='flex items-center gap-3'>
              <div className="w-[80px] h-[32px] rounded-md bg-gray-200 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-shimmer" />
              <div className="w-[80px] h-[32px] rounded-md bg-gray-200 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-shimmer" />
            </div>
          </header>
        </div>
        <div className="px-7 py-5">
          <div className="relative w-full flex justify-center">
            <div 
              className="bg-gray-200 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-shimmer rounded-lg"
              style={imageContainerStyle}
              data-testid="skeleton-image"
            />
          </div>
        </div>
        <div className='px-7 py-4'>
          <div className='flex gap-20' data-testid="skeleton-stats">
            <div>
              <div className="w-12 h-4 mb-1 bg-gray-200 rounded bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-shimmer" />
              <div className="w-8 h-4 bg-gray-200 rounded bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-shimmer" />
            </div>
            <div>
              <div className="w-12 h-4 mb-1 bg-gray-200 rounded bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-shimmer" />
              <div className="w-8 h-4 bg-gray-200 rounded bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-shimmer" />
            </div>
          </div>
        </div>
      </>
    )
  }

  return (
    <article>
      <div className='sticky top-0 z-10'>
        <header className='flex justify-between items-center px-7 py-3 bg-white rounded-lg'>
          <div className="flex items-center space-x-4">
            {image.user.profile_image && (
                <Image
                  src={image.user.profile_image.medium}
                  alt={image.user.name}
                  width={40}
                  height={40}
                  className="rounded-full"
                  data-testid="profile-image"
                />
            )}
            <div>
                <p className="font-medium">{image.user.name}</p>
                {image.user.username && (
                  <p className="text-sm text-gray-500">@{image.user.username}</p>
                )}
            </div>
          </div>
          <div className='flex items-center gap-3'>
            <button 
              onClick={toggleLike} 
              className='h-[32px] rounded-md border-small px-5 border-[#d1d1d1] group hover:border-black transition-border'
              aria-label={liked ? '북마크 제거' : '북마크 추가'}
            >
              <IconHeart 
                className={`relative h-[16px] w-[16px] transition-colors ${
                  liked 
                    ? 'fill-red-500' 
                    : 'fill-[#d1d1d1] group-hover:fill-black'
                }`}
                aria-hidden="false"
                data-testid="heart-icon"
              />
            </button>
            <button 
              onClick={handleDownload} 
              className='h-[32px] rounded-md border-small px-5 border-[#d1d1d1] transition-all hover:border-black'
            >
              다운로드
            </button>
          </div>
        </header>
      </div>
      <div className="px-7 py-5">
        <div className="relative w-full flex justify-center">
          <div style={imageContainerStyle}>
            <Image
              src={data.urls.regular}
              alt={data.alt_description || '언스플래시 이미지'}
              width={data.width}
              height={data.height}
              className="max-w-full w-auto mx-auto rounded-lg h-full"
              sizes="(min-width: 768px) 100vw, (max-width: 427px) min(100%, 387px), (max-height: 756px) min(100%, 387px), (min-aspect-ratio: 4467/6700) calc((calc(100vh - 175px)) * 0.6667164179104478), calc(100vw - 40px)"
              data-testid="main-image"
            />
          </div>
        </div>
      </div>
      <div className='px-7 py-4'>
        <div className='flex gap-20'>
          <div>
            <strong className='block text-[#767676] leading-[1.4] text-[14px]'>조회수</strong>
            <span className='leading-[1.4]'>{data.views}</span>
          </div>
          <div>
            <strong className='block text-[#767676] leading-[1.4] text-[14px]'>다운로드</strong>
            <span className='leading-[1.4]'>{data.downloads}</span>
          </div>
        </div>
      </div>
    </article>
  )
} 