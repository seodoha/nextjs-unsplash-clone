import { useQuery, useInfiniteQuery } from '@tanstack/react-query'
import { getPhotos, searchPhotos, getPhotoById } from '@/lib/api'
import type { SearchParams, UnsplashImage } from '@/types/unsplash'

export const usePhotosQuery = (page: number = 1) => {
  return useQuery({
    queryKey: ['photos', page],
    queryFn: () => getPhotos(page),
    placeholderData: (prev: UnsplashImage[] | undefined) => prev ?? [],
  })
}

export const useSearchPhotosQuery = (searchParams: SearchParams) => {
  return useInfiniteQuery({
    queryKey: ['photos', 'search', searchParams],
    queryFn: ({ pageParam = 1 }) => searchPhotos({ ...searchParams, page: pageParam }),
    getNextPageParam: (lastPage, allPages) => allPages.length + 1,
    initialPageParam: 1,
  })
}

export const usePhotoByIdQuery = (id: string) => {
  return useQuery({
    queryKey: ['photo', id],
    queryFn: () => getPhotoById(id),
    enabled: !!id,
  })
} 