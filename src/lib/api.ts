import axios from 'axios'
import { UnsplashImage, SearchParams } from '@/types/unsplash'

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  timeout: 5000,
  params: {
    client_id: process.env.NEXT_PUBLIC_ACCESS_KEY
  }
})

// 인터셉터 설정
api.interceptors.request.use(
  (config) => {
    // 요청 전에 수행할 작업
    if (!config.params) {
      config.params = {}
    }
    // client_id가 없는 경우에만 기본값 설정
    if (!config.params.client_id) {
      config.params.client_id = 'YNJBYYPARthN63fN8l4D__fHnsHE8GXcQjpJVvUUQ_A'
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

api.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    // 에러 처리
    return Promise.reject(error)
  }
)

const UNSPLASH_API_URL = 'https://api.unsplash.com'

export const getPhotos = async (page: number): Promise<UnsplashImage[]> => {
  const res = await fetch(`${UNSPLASH_API_URL}/photos?page=${page}`, {
    headers: {
      Authorization: `Client-ID ${process.env.NEXT_PUBLIC_ACCESS_KEY}`
    }
  })
  return res.json()
}

export const searchPhotos = async ({ query, page = 1 }: SearchParams): Promise<UnsplashImage[]> => {
  const res = await fetch(`${UNSPLASH_API_URL}/search/photos?query=${query}&page=${page}`, {
    headers: {
      Authorization: `Client-ID ${process.env.NEXT_PUBLIC_ACCESS_KEY}`
    }
  })
  const data = await res.json()
  return data.results
}

export const getPhotoById = async (id: string): Promise<UnsplashImage> => {
  const res = await fetch(`${UNSPLASH_API_URL}/photos/${id}`, {
    headers: {
      Authorization: `Client-ID ${process.env.NEXT_PUBLIC_ACCESS_KEY}`
    }
  })
  return res.json()
} 