import React from 'react'
import MarqueeWrapper from './ui/marquee'

const BannerScroller: React.FC = () => {
  const banners = [
    {
      src: '/banners/TIGRE_TIGRE_BANNER_1-640x905.webp',
      alt: 'Banner 1',
    },
    {
      src: '/banners/TIGRE_TIGRE_BANNER_2-640x905.webp',
      alt: 'Banner 2',
    },
    {
      src: '/banners/TIGRE_TIGRE_BANNER_5-640x905.webp',
      alt: 'Banner 3',
    },
    {
      src: '/banners/TIGRE_TIGRE_BANNER_3-640x905.webp',
      alt: 'Banner 4',
    },
    {
      src: '/banners/TIGRE_TIGRE_BANNER_4-640x905.webp',
      alt: 'Banner 5',
    },
  ]

  return (
    <div className="w-full h-[350px] md:h-[640px]">
      <MarqueeWrapper
        items={banners}
        speed={30}
        direction="left"
        gradient={false}
        pauseOnHover
        className="h-full"
        itemClassName="mx-0"
        imageClassName="h-[350px] md:h-[640px] w-auto object-contain"
      />
    </div>
  )
}

export default BannerScroller
