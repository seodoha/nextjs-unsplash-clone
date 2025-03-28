'use client'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { UnsplashImage } from '@/types/unsplash'
import { useImageStore } from '@/store/useStore'
import { memo, useCallback } from 'react'

interface ImageCardProps {
  image: UnsplashImage
  priority?: boolean
}

const ImageCard = memo(function ImageCard({ image, priority = false }: ImageCardProps) {
  const pathname = usePathname();
  const {
    addLikedImage, 
    removeLikedImage,
    setCurrentTopic
  } = useImageStore()
  
  const liked = useImageStore((state) => state.isImageLiked(image.id))

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
    <div className="group relative w-full overflow-hidden">
      <Link 
        href={`/image/${image.id}`} 
        className="relative block aspect-[3/4] w-full h-full cursor-zoom-in overflow-hidden"
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
          className="absolute inset-0 h-full w-full object-cover transition-all duration-300 opacity-0 group-hover:scale-105 [&.loaded]:opacity-100"
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
          placeholder="blur"
          blurDataURL={image.urls.thumb}
          onLoadingComplete={(image) => {
            image.classList.add('loaded')
          }}
        />
      </Link>
      <button 
        onClick={toggleLike}
        className="absolute right-4 top-4 rounded-full bg-white/80 p-4 opacity-0 transition-opacity group-hover:opacity-100"
      >
        <svg 
          className={`relative h-[16px] w-[16px] ${liked ? 'fill-red-500' : 'fill-gray-700'}`} 
          width="24" 
          height="24" 
          viewBox="0 0 24 24" 
          version="1.1" 
          aria-hidden="false"
        >
          <desc lang="en-US">A heart</desc>
          <path d="M21.424 4.594c-2.101-2.125-5.603-2.125-7.804 0l-1.601 1.619-1.601-1.62c-2.101-2.124-5.603-2.124-7.804 0-2.202 2.126-2.102 5.668 0 7.894L12.019 22l9.405-9.513a5.73 5.73 0 0 0 0-7.893Z"></path>
        </svg>
      </button>
    </div>
  )
})

export default ImageCard; 