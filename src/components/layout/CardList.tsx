'use client'

import { useEffect, useRef, useMemo, useCallback } from 'react'
import { useInfiniteImages } from '@/hooks/useInfiniteImages'
import { useImageStore } from '@/store/useStore'
import ImageCard from '@/components/ui/ImageCard'
import LoadingSpinner from '@/components/ui/LoadingSpinner'
import { UnsplashImage } from '@/types/unsplash'

interface CardListProps {
  topic: string
  initialImages: UnsplashImage[]
}

export default function CardList({ topic, initialImages }: CardListProps) {
  const observerTarget = useRef<HTMLDivElement>(null)
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    isLoading
  } = useInfiniteImages(topic, initialImages)
  const setLoadedImages = useImageStore(state => state.setLoadedImages)

  const handleIntersection = useCallback((entries: IntersectionObserverEntry[]) => {
    if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
      fetchNextPage()
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage])

  useEffect(() => {
    const observer = new IntersectionObserver(
      handleIntersection,
      { 
        threshold: 0.1,
        rootMargin: '200px 0px'
      }
    )

    if (observerTarget.current) {
      observer.observe(observerTarget.current)
    }

    return () => observer.disconnect()
  }, [handleIntersection])

  const allImages = useMemo(() => {
    const images = data?.pages.flat() ?? []
    return images.filter(image => image && image.urls && image.urls.regular)
  }, [data?.pages])

  useEffect(() => {
    if (allImages.length > 0) {
      setLoadedImages(allImages)
    }
  }, [allImages, setLoadedImages])

  const getColumnImages = useCallback((columnIndex: number) => {
    return allImages
      .filter((_, index) => index % 3 === columnIndex)
      .map((image, index) => (
        <ImageCard 
          key={`${columnIndex}-${image.id}-${index}`} 
          image={image} 
          priority={index < 6}
        />
      ))
  }, [allImages])

  if (status === 'error') {
    return <div className="text-center mt-8">이미지를 불러오는데 실패했습니다.</div>
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[300px]">
        <LoadingSpinner />
      </div>
    )
  }

  if (!allImages.length) {
    return (
      <div className="text-center mt-8 text-gray-500">
        표시할 이미지가 없습니다.
      </div>
    )
  }

  return (
    <div className="mx-auto md:w-full md:max-w-[1296px]">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div key="column-0" className="flex flex-col gap-6">{getColumnImages(0)}</div>
        <div key="column-1" className="flex flex-col gap-6">{getColumnImages(1)}</div>
        <div key="column-2" className="flex flex-col gap-6">{getColumnImages(2)}</div>
      </div>
      
      <div 
        ref={observerTarget} 
        className="mt-8 flex justify-center h-20"
      >
        {isFetchingNextPage && <LoadingSpinner />}
      </div>
      
      {!hasNextPage && allImages.length > 0 && (
        <div className="mt-8 text-center text-gray-500">
          더 이상 표시할 이미지가 없습니다.
        </div>
      )}
    </div>
  )
}
