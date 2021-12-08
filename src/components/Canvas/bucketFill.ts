type Color = {
  r: number
  g: number
  b: number
  a: number
}

// Color の等価性を調べる関数
const equalColor = (a: Color, b: Color) => {
  return a.r === b.r && a.g === b.g && a.b === b.b && a.a === b.a
}

// カラーコードから rgba 形式の Color オブジェクトを作る
// valid なのは #123, #1234, #123456, #12345678 の形式
const hexToColor = (hex: `#${string}`): Color | null => {
  if (
    /^#([A-Fa-f0-9]{3}){1,2}$/.test(hex) ||
    /^#([A-Fa-f0-9]{4}){1,2}$/.test(hex)
  ) {
    let c = hex.substring(1).split('')
    // #12345678 の形式に統一
    if (c.length === 3) {
      c = [c[0], c[0], c[1], c[1], c[2], c[2], 'F', 'F']
    } else if (c.length === 4) {
      c = [c[0], c[0], c[1], c[1], c[2], c[2], c[3], c[3]]
    } else if (c.length === 6) {
      c = [c[0], c[1], c[2], c[3], c[4], c[5], 'F', 'F']
    }
    const num = parseInt('0x' + c.join(''), 16)
    return {
      r: (num >> 24) & 255,
      g: (num >> 16) & 255,
      b: (num >> 8) & 255,
      a: num & 255,
    }
  } else {
    return null
  }
}

// Uint8ClampedArray から Color[][] へ変換する
const formatData = (
  data: Uint8ClampedArray,
  width: number,
  height: number
): Color[][] => {
  console.assert(data.length === width * height * 4)
  const result = []
  for (let i = 0; i < height; i++) {
    const row = []
    for (let j = 0; j < width; j++) {
      const index = (i * width + j) * 4
      const r = data[index]
      const g = data[index + 1]
      const b = data[index + 2]
      const a = data[index + 3]
      row.push({ r, g, b, a })
    }
    result.push(row)
  }
  return result
}
// Color[][] を Uint8ClampedArray に変換する
const reformatData = (
  data: Color[][],
  width: number,
  height: number
): Uint8ClampedArray => {
  const result = new Uint8ClampedArray(width * height * 4)
  for (let i = 0; i < height; i++) {
    const row = data[i]
    for (let j = 0; j < width; j++) {
      const index = (i * width + j) * 4
      const color = row[j]
      result[index] = color.r
      result[index + 1] = color.g
      result[index + 2] = color.b
      result[index + 3] = color.a
    }
  }
  return result
}

// https://nullpon.moe/dev/sample/canvas/bucketfill.html めちゃめちゃ参考にしてる
// シードフィルアルゴリズムで塗りつぶす
const drawToRight = (
  data: Color[][],
  x: number,
  y: number,
  color: Color,
  widthRange: [number, number],
  targetColor: Color
) => {
  let rightEnd = null
  for (let nowX = x + 1; nowX < widthRange[1]; nowX++) {
    const nowColor = data[y][nowX]
    if (!equalColor(nowColor, targetColor)) break
    data[y][nowX] = color
    rightEnd = nowX
  }
  return rightEnd
}
const drawToLeft = (
  data: Color[][],
  x: number,
  y: number,
  color: Color,
  widthRange: [number, number],
  targetColor: Color
) => {
  let leftEnd = null
  for (let nowX = x; nowX >= widthRange[0]; nowX--) {
    const nowColor = data[y][nowX]
    if (!equalColor(nowColor, targetColor)) break
    data[y][nowX] = color
    leftEnd = nowX
  }
  return leftEnd
}
const updateSeeds = (
  data: Color[][],
  xLeft: number,
  xRight: number,
  y: number,
  seeds: { x: number; y: number }[],
  targetColor: Color,
  heightRange: [number, number]
) => {
  if (y < heightRange[0] || y >= heightRange[1]) return
  let prevIsTarget = false
  for (let nowX = xLeft; nowX <= xRight; nowX++) {
    const nowColor = data[y][nowX]
    if (equalColor(nowColor, targetColor)) {
      if (!prevIsTarget) {
        seeds.push({ x: nowX, y })
      }
      prevIsTarget = true
    } else {
      prevIsTarget = false
    }
  }
}

const bucketFill = (
  canvas: HTMLCanvasElement,
  x: number,
  y: number,
  color: `#${string}`,
  widthRange?: [number, number],
  heightRange?: [number, number]
) => {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const ctx = canvas.getContext('2d')!
  const width = canvas.width
  const height = canvas.height
  const imageData = ctx.getImageData(0, 0, width, height)
  const data = imageData.data
  const formattedData = formatData(data, width, height)
  const targetColor = formattedData[y][x]
  const colorObj = hexToColor(color)
  if (colorObj === null) {
    console.error('invalid color')
    return
  }
  if (equalColor(colorObj, targetColor)) return

  const xRange = widthRange ?? [0, width]
  const yRange = heightRange ?? [0, height]

  const seeds = [{ x, y }]
  while (seeds.length > 0) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const { x, y } = seeds.pop()!
    const leftX =
      drawToLeft(formattedData, x, y, colorObj, xRange, targetColor) ?? x
    const rightX =
      drawToRight(formattedData, x, y, colorObj, xRange, targetColor) ?? x
    updateSeeds(formattedData, leftX, rightX, y + 1, seeds, targetColor, yRange)
    updateSeeds(formattedData, leftX, rightX, y - 1, seeds, targetColor, yRange)
  }

  imageData.data.set(reformatData(formattedData, width, height))
  ctx.putImageData(imageData, 0, 0)
}

export default bucketFill
