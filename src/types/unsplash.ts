export interface UnsplashImage {
  id: string
  width: number
  height: number
  urls: {
    regular: string
  }
  alt_description: string | null
  liked_by_user: boolean
  likes: number
} 