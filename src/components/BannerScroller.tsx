import React from 'react'
import EmblaBannerCarousel from './ui/embla-banner-carousel'

const BANNERS = [
  {
    src: '/banners/TIGRE_TIGRE_BANNER_1-350x495.webp',
    srcSet:
      '/banners/TIGRE_TIGRE_BANNER_1-350x495.webp 350w, /banners/TIGRE_TIGRE_BANNER_1-640x905.webp 640w, /banners/TIGRE_TIGRE_BANNER_1-1000x1414.webp 1000w',
    alt: 'Banner 1',
  },
  {
    src: '/banners/TIGRE_TIGRE_BANNER_2-350x495.webp',
    srcSet:
      '/banners/TIGRE_TIGRE_BANNER_2-350x495.webp 350w, /banners/TIGRE_TIGRE_BANNER_2-640x905.webp 640w, /banners/TIGRE_TIGRE_BANNER_2-1000x1414.webp 1000w',
    alt: 'Banner 2',
  },
  {
    src: '/banners/TIGRE_TIGRE_BANNER_5-350x495.webp',
    srcSet:
      '/banners/TIGRE_TIGRE_BANNER_5-350x495.webp 350w, /banners/TIGRE_TIGRE_BANNER_5-640x905.webp 640w',
    alt: 'Banner 3',
  },
  {
    src: '/banners/TIGRE_TIGRE_BANNER_3-350x495.webp',
    srcSet:
      '/banners/TIGRE_TIGRE_BANNER_3-350x495.webp 350w, /banners/TIGRE_TIGRE_BANNER_3-640x905.webp 640w, /banners/TIGRE_TIGRE_BANNER_3-1000x1414.webp 1000w',
    alt: 'Banner 4',
  },
  {
    src: '/banners/TIGRE_TIGRE_BANNER_4-350x495.webp',
    srcSet:
      '/banners/TIGRE_TIGRE_BANNER_4-350x495.webp 350w, /banners/TIGRE_TIGRE_BANNER_4-640x905.webp 640w, /banners/TIGRE_TIGRE_BANNER_4-1000x1414.webp 1000w',
    alt: 'Banner 5',
  },
]

const ITEMS = [...BANNERS, ...BANNERS, ...BANNERS]

const BannerScroller: React.FC = () => {
  return (
    <div className="w-full h-[350px] md:h-[640px]">
      <EmblaBannerCarousel
        items={ITEMS}
        speed={1}
        className="h-full"
        imageClassName="h-[350px] md:h-[640px] w-auto object-contain"
      />
    </div>
  )
}

export default BannerScroller
