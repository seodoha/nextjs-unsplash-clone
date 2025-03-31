'use client'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { UnsplashImage } from '@/types/unsplash'
import { useImageStore } from '@/store/useStore'
import { memo, useCallback } from 'react'
import HeartIcon from '@/components/icons/HeartIcon'

interface ImageCardProps {
  image: UnsplashImage
  priority?: boolean
}

const ImageCard = memo(function ImageCard({ image, priority = false }: ImageCardProps) {
  const pathname = usePathname();
  const {
    addLikedImage, 
    removeLikedImage,
    setCurrentTopic,
    isImageLiked
  } = useImageStore()
  
  const liked = isImageLiked(image.id)

  const handleClick = useCallback(() => {
    const topic = pathname.split('/')[1];
    setCurrentTopic(topic);
  }, [pathname, setCurrentTopic]);

  const toggleLike = useCallback(() => {
    if (liked) {
      removeLikedImage(image.id)
    } else {
      addLikedImage(image)
    }
  }, [liked, image, removeLikedImage, addLikedImage]);

  return (
    <div
      data-testid="image-card"
      className="group relative overflow-hidden rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
    >
      <Link 
        href={`/image/${image.id}`} 
        className="block cursor-zoom-in"
        title={image.alt_description || '언스플래시 이미지'}
        onClick={handleClick}
      >
        <Image
          src={image.urls.regular}
          alt={image.alt_description || '언스플래시 이미지'}
          width={image.width}
          height={image.height}
          priority={priority}
          loading={priority ? "eager" : "lazy"}
          quality={75}
          className="w-full h-full object-cover transition-all duration-300 opacity-0 group-hover:scale-105 [&.loaded]:opacity-100"
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
          placeholder="blur"
          blurDataURL={image.urls.thumb}
          onLoad={(event) => {
            const img = event.target as HTMLImageElement
            img.classList.add('loaded')
          }}
        />
      </Link>
      <button 
        onClick={toggleLike}
        className="absolute right-4 top-4 rounded-full bg-white/90 p-2 opacity-0 transition-all duration-300 group-hover:opacity-100 hover:bg-white"
        aria-label={liked ? '북마크 취소' : '북마크 추가'}
      >
        <HeartIcon
          className={`h-5 w-5 ${liked ? 'fill-red-500' : 'fill-[#d1d1d1]'}`}
          aria-hidden="true"
        />
      </button>
    </div>
  )
})

export default ImageCard; 