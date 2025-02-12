'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { UnsplashImage } from '../../types/unsplash'

export default function CardList() {
  const [images, setImages] = useState<UnsplashImage[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchImages()
  }, [])

  const fetchImages = async () => {
    try {
      const response = await fetch('https://api.unsplash.com/topics/wallpapers/photos?client_id=' + process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY + '&page=1&per_page=20')
      const data = await response.json()
      setImages(data)
    } catch (error) {
      console.error('이미지를 불러오는데 실패했습니다:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const getColumnImages = (columnIndex: number) => {
    return images
      .filter((_, index) => index % 3 === columnIndex)
      .map((image) => {
        const aspectRatio = (image.height / image.width) * 100

        return (
          <div key={image.id} className="group relative w-full overflow-hidden rounded-[1.6rem]" style={{ paddingBottom: `${aspectRatio}%` }}>
            <Image
              src={image.urls.regular}
              alt={image.alt_description || '언스플래시 이미지'}
              width={image.width}
              height={image.height}
              className="object-cover transition-transform group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            <button className="absolute right-4 top-4 rounded-full bg-white/80 p-2 opacity-0 transition-opacity group-hover:opacity-100">
              <svg className="relative h-[16px] w-[16px]" width="24" height="24" viewBox="0 0 24 24" version="1.1" aria-hidden="false">
                <desc lang="en-US">A heart</desc>
                <path d="M21.424 4.594c-2.101-2.125-5.603-2.125-7.804 0l-1.601 1.619-1.601-1.62c-2.101-2.124-5.603-2.124-7.804 0-2.202 2.126-2.102 5.668 0 7.894L12.019 22l9.405-9.513a5.73 5.73 0 0 0 0-7.893Z"></path>
              </svg>
            </button>
          </div>
        )
      })
  }

  if (isLoading) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <div className="border-gray-300 h-12 w-12 animate-spin rounded-full border-4 border-t-blue-600" />
      </div>
    )
  }

  return (
    <div className="mx-auto md:w-full md:max-w-[1296px]">
      <div className="grid grid-cols-[repeat(3,minmax(0,1fr))] gap-x-[24px]">
        <div className="grid grid-cols-[minmax(0,1fr)] gap-y-[24px]">{getColumnImages(0)}</div>
        <div className="grid grid-cols-[minmax(0,1fr)] gap-y-[24px]">{getColumnImages(1)}</div>
        <div className="grid grid-cols-[minmax(0,1fr)] gap-y-[24px]">{getColumnImages(2)}</div>
      </div>
    </div>
  )
}
