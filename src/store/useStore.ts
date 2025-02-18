import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { UnsplashImage } from '@/types/unsplash'

// 스토어의 상태 타입 정의
interface ImageState {
  likedImages: UnsplashImage[]
  addLikedImage: (image: UnsplashImage) => void
  removeLikedImage: (imageId: string) => void
  isImageLiked: (imageId: string) => boolean
}

// 스토어 생성
export const useImageStore = create<ImageState>()(
  persist(
    (set, get) => ({
      likedImages: [],
      
      // 이미지 추가 액션
      addLikedImage: (image) => 
        set((state) => ({
          likedImages: [...state.likedImages, image]
        })),
      
      // 이미지 제거 액션
      removeLikedImage: (imageId) =>
        set((state) => ({
          likedImages: state.likedImages.filter((img) => img.id !== imageId)
        })),
      
      // 이미지 좋아요 여부 확인
      isImageLiked: (imageId) =>
        get().likedImages.some((img) => img.id === imageId),
    }),
    {
      name: 'image-storage', // localStorage 키 이름
    }
  )
) 