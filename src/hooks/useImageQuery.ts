import { api } from '@/lib/api';
import { useQuery } from '@tanstack/react-query'
import { useImageStore } from '@/store/useStore';

export const getPhotoById = async (id: string) => {
  try {
    const { data } = await api.get(`photos/${id}`);
    
    // 필수 필드 검증
    if (!data || !data.urls || !data.urls.regular) {
      throw new Error('Invalid image data received');
    }
    
    return data;
  } catch (error) {
    console.error('Failed to fetch photo:', error);
    throw error;
  }
};

export const usePhotoByIdQuery = (id: string, options = {}) => {
  return useQuery({
    queryKey: ['photo', id],
    queryFn: () => getPhotoById(id),
    staleTime: 1000 * 60 * 5, // 5분 동안 데이터를 신선한 것으로 간주
    gcTime: 1000 * 60 * 30, // 30분 동안 캐시 유지
    retry: 2, // 실패 시 2번만 재시도
    ...options
  });
};

export const useLikedPhotos = () => {
  const likedImages = useImageStore((state) => state.likedImages);
  
  return useQuery({
    queryKey: ['likedPhotos'],
    queryFn: () => likedImages,
    staleTime: Infinity,  // 스토어의 데이터는 항상 최신으로 간주
    gcTime: Infinity,  // 캐시도 계속 유지
  });
};