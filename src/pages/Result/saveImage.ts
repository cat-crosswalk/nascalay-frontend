import { User } from '/@/utils/apis'
import { Result } from '/@/store/slice/result'
import { complementEmpty } from '/@/utils/complementEmpty'
import { loadImage } from '/@/utils/image'
import ResultBg from '/@/assets/resultBg.png'

// 出力画像サイズ
const ImageWidth = 1440
const ImageHeight = 1024

// お題描画位置
const OdaiX = 787
const OdaiY = 92

// お題送信者描画位置
const OdaiSenderX = 335
const OdaiSenderY = 38

// メイン画像描画位置
const MainImageX = 384
const MainImageY = 199
const MainImageSize = 610

// 回答描画位置
const AnswerX = 570
const AnswerY = 920

// 回答者描画位置
const AnswererX = 963
const AnswererY = 864

const drawResultString = (
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  inActive = false
) => {
  ctx.font = '24px "Kiwi Maru"'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillStyle = '#000000'
  if (inActive) {
    ctx.fillStyle = '#CCCCCC'
  }
  ctx.fillText(text, x, y)
}

const drawUser = async (
  ctx: CanvasRenderingContext2D,
  user: User | null,
  x: number,
  y: number
) => {
  const ImgSize = 72 // px
  const LineHeight = 25 // px
  if (user === null) return
  ctx.fillStyle = user.avatar.color
  ctx.fillRect(x, y, ImgSize, ImgSize)
  const img = await loadImage(`avatar/avatar${user.avatar.type}.svg`)
  ctx.drawImage(img, x, y, ImgSize, ImgSize)

  drawResultString(
    ctx,
    user.username ?? '',
    x + ImgSize / 2,
    y + ImgSize + LineHeight
  )
}

export const saveResultAsImage = async (result: Result) => {
  const canvas = document.createElement('canvas')
  canvas.width = ImageWidth
  canvas.height = ImageHeight
  const ctx = canvas.getContext('2d')
  if (ctx === null) return
  // 背景画像
  const bgImage = await loadImage(ResultBg)
  ctx.drawImage(bgImage, 0, 0, ImageWidth, ImageHeight)

  // お題
  drawResultString(
    ctx,
    complementEmpty(result.odai) ?? '',
    OdaiX,
    OdaiY,
    result.odai === ''
  )

  // お題送信者
  await drawUser(ctx, result.sender, OdaiSenderX, OdaiSenderY)

  // 画像
  if (result.img !== null) {
    const mainImage = await loadImage(result.img)
    ctx.drawImage(
      mainImage,
      MainImageX,
      MainImageY,
      MainImageSize,
      MainImageSize
    )
  }

  // 回答
  drawResultString(
    ctx,
    complementEmpty(result.answer) ?? '',
    AnswerX,
    AnswerY,
    result.answer === ''
  )

  // 回答者
  await drawUser(ctx, result.answerer, AnswererX, AnswererY)

  // 保存・出力
  const link = document.createElement('a')
  link.href = canvas.toDataURL('image/png')
  link.download = `${
    result.odai !== null && result.odai.length !== 0 ? result.odai : 'result'
  }.png`
  link.click()
}
