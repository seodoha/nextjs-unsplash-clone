export interface UnsplashImage {
  id: string
  width: number
  height: number
  urls: {
    regular: string
    thumb: string
  }
  alt_description: string | null
  user: {
    name: string
    username: string
    profile_image: {
      medium: string
    }
  }
  likes: number
  downloads: number
  description: string | null
  views: number
}
