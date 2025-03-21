import { create } from 'zustand'
import { UnsplashImage } from '@/types/unsplash'

// 스토어의 상태 타입 정의
interface ImageState {
  likedImages: UnsplashImage[]
  addLikedImage: (image: UnsplashImage) => void
  removeLikedImage: (imageId: string) => void
  isImageLiked: (imageId: string) => boolean

  loadedImages: UnsplashImage[]  // 로딩된 이미지 배열 추가
  setLoadedImages: (images: UnsplashImage[]) => void  // 로딩된 이미지 설정 함수

  currentTopic: string;
  setCurrentTopic: (topic: string) => void;
}

// 스토어 생성
export const useImageStore = create<ImageState>()((set, get) => ({
  loadedImages: [],
  likedImages: [],
  currentTopic: 'wallpapers',
  
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

  setCurrentTopic: (topic) => set({ currentTopic: topic }),
})) 