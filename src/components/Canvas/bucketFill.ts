type Color = {
  r: number
  g: number
  b: number
  a: number
}

const equalColor = (a: Color, b: Color) => {
  return a.r === b.r && a.g === b.g && a.b === b.b && a.a === b.a
}

const hexToColor = (hex: `#${string}`): Color | null => {
  if (
    /^#([A-Fa-f0-9]{3}){1,2}$/.test(hex) ||
    /^#([A-Fa-f0-9]{4}){1,2}$/.test(hex)
  ) {
    let c = hex.substring(1).split('')
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

const queue = <T>() => {
  let tail: T[] = []
  let head: T[] = []
  const push = (item: T) => {
    tail.push(item)
  }
  const pop = (): T | null => {
    if (head.length === 0) {
      ;[head, tail] = [tail, head]
    }
    return head.pop() ?? null
  }
  const isEmpty = () => {
    return head.length === 0 && tail.length === 0
  }
  return {
    push,
    pop,
    isEmpty,
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
  const q = queue<{ x: number; y: number }>()
  q.push({ x, y })
  const viewed: boolean[][] = new Array(height)
    .fill(null)
    .map(() => new Array(width).fill(false))
  viewed[y][x] = true
  while (!q.isEmpty()) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const { x, y } = q.pop()!
    console.log(x, y)
    if (x < xRange[0] || x > xRange[1] || y < yRange[0] || y > yRange[1])
      continue
    if (!equalColor(formattedData[y][x], targetColor)) continue
    formattedData[y][x] = colorObj
    if (
      x - 1 >= xRange[0] &&
      !viewed[y][x - 1] &&
      equalColor(formattedData[y][x - 1], targetColor)
    ) {
      q.push({ x: x - 1, y })
      viewed[y][x - 1] = true
    }
    if (
      x + 1 < xRange[1] &&
      !viewed[y][x + 1] &&
      equalColor(formattedData[y][x + 1], targetColor)
    ) {
      q.push({ x: x + 1, y })
      viewed[y][x + 1] = true
    }
    if (
      y - 1 >= yRange[0] &&
      !viewed[y - 1][x] &&
      equalColor(formattedData[y - 1][x], targetColor)
    ) {
      q.push({ x, y: y - 1 })
      viewed[y - 1][x] = true
    }
    if (
      y + 1 < yRange[1] &&
      !viewed[y + 1][x] &&
      equalColor(formattedData[y + 1][x], targetColor)
    ) {
      q.push({ x, y: y + 1 })
      viewed[y + 1][x] = true
    }
  }
  imageData.data.set(reformatData(formattedData, width, height))
  ctx.putImageData(imageData, 0, 0)
}

export default bucketFill
