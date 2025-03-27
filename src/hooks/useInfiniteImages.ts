import { useInfiniteQuery } from '@tanstack/react-query'
import { api } from '@/lib/api'
import { UnsplashImage } from '@/types/unsplash'

export function useInfiniteImages(topic: string, initialImages: UnsplashImage[]) {
  return useInfiniteQuery<UnsplashImage[]>({
    queryKey: ['images', topic],
    initialPageParam: 1,
    initialData: {
      pages: [initialImages],
      pageParams: [1]
    },
    queryFn: async ({ pageParam = 1 }) => {
      const response = await api.get(`topics/${topic}/photos`, {
        params: {
          page: pageParam,
          per_page: 30
        }
      })
      return response.data
    },
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length === 0 ? undefined : allPages.length + 1
    },
    staleTime: 5 * 60 * 1000, // 5분 동안 데이터를 신선한 것으로 간주
    gcTime: 30 * 60 * 1000, // 30분 동안 캐시 유지
  })
} 