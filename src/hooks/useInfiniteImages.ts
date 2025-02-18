import { useInfiniteQuery } from '@tanstack/react-query'
import { api } from '@/lib/api'
import { UnsplashImage } from '@/types/unsplash'

export function useInfiniteImages(topic: string) {
  return useInfiniteQuery<UnsplashImage[]>({
    queryKey: ['images', topic],
    initialPageParam: 1,
    queryFn: async ({ pageParam = 1 }) => {
      const response = await api.get(`topics/${topic}/photos`, {
        params: {
          page: pageParam,
          per_page: 20
        }
      })
      return response.data
    },
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length === 0 ? undefined : allPages.length + 1
    },
  })
} 