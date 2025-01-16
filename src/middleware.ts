import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const path = new URL(request.url).pathname
  console.log('미들웨어 !!', path)
}

// export const config = {
//   matcher: '/',
// }
