'use client'

import { useEffect, useRef, useMemo } from 'react'
import { useInfiniteImages } from '@/hooks/useInfiniteImages'
import { useImageStore } from '@/store/useStore'
import ImageCard from '@/components/ui/ImageCard'
import LoadingSpinner from '@/components/ui/LoadingSpinner'

interface CardListProps {
  topic: string
}

export default function CardList({ topic }: CardListProps) {
  const observerTarget = useRef<HTMLDivElement>(null)
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status
  } = useInfiniteImages(topic)
  const setLoadedImages = useImageStore(state => state.setLoadedImages)

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage()
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
  }, [hasNextPage, isFetchingNextPage, fetchNextPage])

  const allImages = useMemo(() => data?.pages.flat() ?? [], [data?.pages])

  useEffect(() => {
    setLoadedImages(allImages)
  }, [allImages, setLoadedImages])

  const getColumnImages = (columnIndex: number) => {
    return allImages
      .filter((_, index) => index % 3 === columnIndex)
      .map((image) => (
        <ImageCard key={image.id} image={image} />
      ))
  }

  if (status === 'error') {
    return <div className="text-center mt-8">이미지를 불러오는데 실패했습니다.</div>
  }

  if (status === 'pending') {
    return (
      <div className="flex justify-center items-center min-h-[300px]">
        <LoadingSpinner />
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
