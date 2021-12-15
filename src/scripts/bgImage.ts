import bgImageYellow from '/@/assets/bg/bgYellow.svg'
import bgImageBlue from '/@/assets/bg/bgBlue.svg'
import bgImageRed from '/@/assets/bg/bgRed.svg'

export type PageNames =
  | '/'
  | '/lobby'
  | '/theme'
  | '/draw'
  | '/answer'
  | '/result'

type bgImageType = { image: string; color: `#${string}` }

const bgYellow: bgImageType = {
  image: bgImageYellow,
  color: '#DCCCA2',
}

const bgBlue: bgImageType = {
  image: bgImageBlue,
  color: '#96A0C0',
}

const bgRed: bgImageType = {
  image: bgImageRed,
  color: '#D1A9A9',
}

export const bgImageData: Record<PageNames, bgImageType> = {
  '/': bgYellow,
  '/lobby': bgBlue,
  '/theme': bgBlue,
  '/draw': bgBlue,
  '/answer': bgRed,
  '/result': bgBlue,
}
