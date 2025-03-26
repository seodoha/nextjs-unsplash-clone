import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  images: {
    // Unsplash 이미지 도메인 허용 설정
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
    // 이전 버전과의 호환성을 위한 domains 설정
    domains: ['images.unsplash.com'],
    // 이미지 최적화 포맷 설정
    // avif: 최신 이미지 포맷으로, 더 작은 파일 크기와 더 나은 품질 제공
    // webp: 널리 지원되는 최적화 이미지 포맷
    formats: ['image/avif', 'image/webp'],
  },
  experimental: {
    // CSS 최적화 활성화
    // 중복 CSS 제거 및 CSS 번들 크기 최소화
    optimizeCss: true,
  },
};

export default nextConfig;
