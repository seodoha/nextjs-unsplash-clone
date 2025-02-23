import { api } from '@/lib/api';
import { useQuery } from '@tanstack/react-query'
import { useImageStore } from '@/store/useStore';

export const getPhotoById = async (id: string) => {
  const { data } = await api.get(`/photos/${id}`);
  return data;
};

export const usePhotoByIdQuery = (id: string, options = {}) => {
  return useQuery({
    queryKey: ['photo', id],
    queryFn: () => getPhotoById(id),
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