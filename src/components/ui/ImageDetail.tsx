'use client'

import Image from 'next/image'
import { usePhotoByIdQuery } from '@/hooks/useImageQuery'
import { UnsplashImage } from '@/types/unsplash';
import { useImageStore } from '@/store/useStore';

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

  if (isLoading) {
    return (
      <>
        <div className='sticky top-0 z-10'>
          <header className='flex justify-between items-center px-7 py-3 bg-white rounded-lg'>
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
              style={{
                width: '100%',
                maxWidth: '1200px',
                aspectRatio: `${image.width} / ${image.height}`,
                maxHeight: 'calc(100vh - 175px)',
                height: 'auto'
              }}
            />
          </div>
        </div>
        <div className='px-7 py-4'>
          <div className='flex gap-20'>
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

  if (isError || !data) {
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
            <button onClick={toggleLike} className='h-[32px] rounded-md border-small px-5 border-[#d1d1d1] group hover:border-black transition-border'>
              <svg 
                className={`relative h-[16px] w-[16px] transition-colors ${
                  liked 
                    ? 'fill-red-500' 
                    : 'fill-[#d1d1d1] group-hover:fill-black'
                }`} 
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                version="1.1" 
                aria-hidden="false"
              >
                <desc lang="en-US">A heart</desc>
                <path d="M21.424 4.594c-2.101-2.125-5.603-2.125-7.804 0l-1.601 1.619-1.601-1.62c-2.101-2.124-5.603-2.124-7.804 0-2.202 2.126-2.102 5.668 0 7.894L12.019 22l9.405-9.513a5.73 5.73 0 0 0 0-7.893Z"></path>
              </svg>
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
        <div className="relative w-full">
          <Image
            src={data.urls.regular}
            alt={data.alt_description || '언스플래시 이미지'}
            width={data.width}
            height={data.height}
            className="max-w-full w-auto mx-auto max-h-[calc(100vh-175px)]"
            sizes="(min-width: 768px) 100vw, (max-width: 427px) min(100%, 387px), (max-height: 756px) min(100%, 387px), (min-aspect-ratio: 4467/6700) calc((calc(100vh - 175px)) * 0.6667164179104478), calc(100vw - 40px)"
            style={{
              backgroundColor: '#595959',
              aspectRatio: `${data.width} / ${data.height}`,
            }}
            priority
          />
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
    </>
  )
} 