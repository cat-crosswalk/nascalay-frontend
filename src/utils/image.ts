export const loadImage = (src: string) => {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image()
    image.onload = () => resolve(image)
    image.onerror = () => reject(new Error(`Could not load image at ${src}`))
    image.src = src
  })
}

export const scaleImageData = (
  imageData: ImageData,
  width: number,
  height: number
): ImageData | null => {
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  if (!ctx) return null
  canvas.width = imageData.width
  canvas.height = imageData.height
  ctx.putImageData(imageData, 0, 0)
  ctx.scale(width / imageData.width, height / imageData.height)
  return ctx.getImageData(0, 0, width, height)
}
