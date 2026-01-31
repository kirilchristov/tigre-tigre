import React from 'react'
import MarqueeWrapper from './ui/marquee'

const BannerScroller: React.FC = () => {
  const banners = [
    {
      src: '/banners/banner1-640x905.webp',
      alt: 'Banner 1',
    },
    {
      src: '/banners/banner2-640x905.webp',
      alt: 'Banner 2',
    },
    {
      src: '/banners/banner5-640x905.webp',
      alt: 'Banner 5',
    },
    {
      src: '/banners/banner3-640x905.webp',
      alt: 'Banner 3',
    },
    {
      src: '/banners/banner4-640x905.webp',
      alt: 'Banner 4',
    },
  ]

  return (
    <div className="w-full h-[640px]">
      <MarqueeWrapper
        items={banners}
        speed={30}
        direction="left"
        gradient={false}
        pauseOnHover
        className="h-full"
        itemClassName="mx-0"
        imageClassName="h-[640px] w-auto object-contain"
      />
    </div>
  )
}

export default BannerScroller
