'use client'

import { useEffect, useState, useRef } from 'react'
import Image from 'next/image'
import { UnsplashImage } from '../../types/unsplash'
import Link from 'next/link'

export default function CardList() {
  const observerTarget = useRef<HTMLDivElement>(null)
  
  const [images, setImages] = useState<UnsplashImage[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)

  const fetchImages = async (pageNum: number) => {
    try {
      setIsLoading(true)
      const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://api.unsplash.com/'
      const accessKey = process.env.NEXT_PUBLIC_ACCESS_KEY
      
      if (!accessKey) {
        throw new Error('API 액세스 키가 설정되지 않았습니다.')
      }

      const response = await fetch(
        `${baseUrl}topics/wallpapers/photos?client_id=${accessKey}&page=${pageNum}&per_page=20`
      )

      if (!response.ok) {
        throw new Error(`API 요청 실패: ${response.status}`)
      }

      const data = await response.json()
      
      if (data.length === 0) {
        setHasMore(false)
        return
      }

      setImages(prev => [...prev, ...data])
    } catch (error) {
      console.error('이미지를 불러오는데 실패했습니다:', error)
      setHasMore(false)
    } finally {
      setIsLoading(false)
    }
  }
  
  useEffect(() => {
    fetchImages(page)
  }, [page])

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && hasMore && !isLoading) {
          setPage(prev => prev + 1)
        }
      },
      { 
        threshold: 0.1,
        rootMargin: '100px'
      }
    )

    if (observerTarget.current) {
      observer.observe(observerTarget.current)
    }

    return () => observer.disconnect()
  }, [hasMore, isLoading])

  const getColumnImages = (columnIndex: number) => {
    return images
      .filter((_, index) => index % 3 === columnIndex)
      .map((image) => {
        return (
          <div key={image.id} className="group relative w-full overflow-hidden">
            <Link 
              href={`/image/${image.id}`} 
              className="relative block aspect-[3/4] w-full h-full cursor-zoom-in overflow-hidden"
              title={image.alt_description || '언스플래시 이미지'}
            >
              <Image
                src={image.urls.regular}
                alt={image.alt_description || '언스플래시 이미지'}
                fill
                className="absolute inset-0 h-full w-full object-cover transition-transform group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </Link>
            <button className="absolute right-4 top-4 rounded-full bg-white/80 p-4 opacity-0 transition-opacity group-hover:opacity-100">
              <svg className="relative h-[16px] w-[16px]" width="24" height="24" viewBox="0 0 24 24" version="1.1" aria-hidden="false">
                <desc lang="en-US">A heart</desc>
                <path d="M21.424 4.594c-2.101-2.125-5.603-2.125-7.804 0l-1.601 1.619-1.601-1.62c-2.101-2.124-5.603-2.124-7.804 0-2.202 2.126-2.102 5.668 0 7.894L12.019 22l9.405-9.513a5.73 5.73 0 0 0 0-7.893Z"></path>
              </svg>
            </button>
          </div>
        )
      })
  }

  return (
    <div className="mx-auto md:w-full md:max-w-[1296px]">
      <div className="grid grid-cols-[repeat(3,minmax(0,1fr))] gap-x-[24px]">
        <div className="grid grid-cols-[minmax(0,1fr)] gap-y-[24px]">{getColumnImages(0)}</div>
        <div className="grid grid-cols-[minmax(0,1fr)] gap-y-[24px]">{getColumnImages(1)}</div>
        <div className="grid grid-cols-[minmax(0,1fr)] gap-y-[24px]">{getColumnImages(2)}</div>
      </div>
      
      {/* 로딩 인디케이터 및 옵저버 타겟 */}
      <div 
        ref={observerTarget} 
        className="mt-8 flex justify-center h-20"
      >
        {isLoading && (
          <div className="border-gray-300 h-12 w-12 animate-spin rounded-full border-4 border-t-blue-600" />
        )}
      </div>
      
      {!hasMore && images.length > 0 && (
        <div className="mt-8 text-center text-gray-500">
          더 이상 표시할 이미지가 없습니다.
        </div>
      )}
    </div>
  )
}
