import { toPng } from 'html-to-image'

const button = document.querySelector('#download-pngs')
if (button) {
  button.addEventListener('click', async () => {
    const status = document.querySelector('#save-status')
    button.disabled = true
    status.textContent = 'Подготвям PNG файловете…'
    try {
      await document.fonts.ready
      const creatives = [...document.querySelectorAll('.creative')]
      for (const creative of creatives) {
        const format = creative.dataset.format
        const name = creative.dataset.bundle === 'duo'
          ? `bundle-offers-duo-${format}`
          : `${location.pathname.split('/').filter(Boolean).at(-2)}-${format}`
        await Promise.all(
          [...creative.querySelectorAll("img")].map(async (image) => {
            if (!image.complete || image.naturalWidth === 0) {
              await new Promise((resolve, reject) => {
                image.addEventListener("load", resolve, { once: true })
                image.addEventListener("error", reject, { once: true })
              })
            }
            await image.decode()
          })
        )
        const width = creative.offsetWidth
        const height = creative.offsetHeight
        const dataUrl = await toPng(creative, {
          width,
          height,
          pixelRatio: 1,
          cacheBust: false,
          style: {
            transform: 'none',
            transformOrigin: 'top left',
            margin: '0',
          },
        })
        const link = document.createElement('a')
        link.download = `${name}.png`
        link.href = dataUrl
        link.click()
        await new Promise((resolve) => setTimeout(resolve, 250))
      }
      status.textContent = `Изтеглени са ${creatives.length} PNG файла.`
    } catch (error) {
      console.error('PNG export failed', error)
      status.textContent = 'Експортът не успя. Опитай отново.'
    } finally {
      button.disabled = false
    }
  })
}
