import { create } from 'zustand'
import { UnsplashImage } from '@/types/unsplash'

// 스토어의 상태 타입 정의
interface ImageState {
  likedImages: UnsplashImage[]
  loadedImages: UnsplashImage[]  // 로딩된 이미지 배열 추가
  addLikedImage: (image: UnsplashImage) => void
  removeLikedImage: (imageId: string) => void
  isImageLiked: (imageId: string) => boolean
  setLoadedImages: (images: UnsplashImage[]) => void  // 로딩된 이미지 설정 함수
  addLoadedImages: (images: UnsplashImage[]) => void  // 추가 이미지 로딩 시
  getCurrentImage: (imageId: string) => { 
    prev: UnsplashImage | null
    next: UnsplashImage | null
    current: UnsplashImage | null 
  }
}

// 스토어 생성
export const useImageStore = create<ImageState>()((set, get) => ({
  likedImages: [],
  loadedImages: [],  // 초기 상태
  
  addLikedImage: (image: UnsplashImage) => 
    set((state) => ({
      likedImages: [...state.likedImages, image]
    })),
  
  removeLikedImage: (imageId: string) =>
    set((state) => ({
      likedImages: state.likedImages.filter((img) => img.id !== imageId)
    })),
  
  isImageLiked: (imageId: string) =>
    get().likedImages.some((img) => img.id === imageId),

  // 로딩된 이미지 설정
  setLoadedImages: (images) => 
    set(() => ({
      loadedImages: images
    })),

  // 추가 이미지 로딩
  addLoadedImages: (images) =>
    set((state) => ({
      loadedImages: [...state.loadedImages, ...images]
    })),

  // 현재 이미지의 이전/다음 이미지 가져오기
  getCurrentImage: (imageId) => {
    const images = get().loadedImages;
    const currentIndex = images.findIndex(img => img.id === imageId);
    
    if (currentIndex === -1) return { prev: null, next: null, current: null };

    return {
      prev: currentIndex > 0 ? images[currentIndex - 1] : null,
      next: currentIndex < images.length - 1 ? images[currentIndex + 1] : null,
      current: images[currentIndex]
    };
  }
})) 