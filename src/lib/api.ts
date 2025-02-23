import axios from 'axios'

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  timeout: 5000,
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
      config.params.client_id = process.env.NEXT_PUBLIC_ACCESS_KEY
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