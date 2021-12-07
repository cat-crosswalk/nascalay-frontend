type Color = {
  r: number
  g: number
  b: number
  a: number
}

const hexToColor = (hex: `#${string}`): Color | null => {
  if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex) || /^#([A-Fa-f0-9]{4}){1,2}$/.test(hex)) {
    let c = hex.substring(1).split('')
    if (c.length === 3) {
      c = [c[0], c[0], c[1], c[1], c[2], c[2], 'F', 'F']
    } else if (c.length === 4) {
      c = [c[0], c[0], c[1], c[1], c[2], c[2], c[3], c[3]]
    } else if (c.length === 6) {
      c = [c[0], c[1], c[2], c[3], c[4], c[5], 'F', 'F']
    }
    const num = parseInt('0x'+c.join(''), 16)
    return {
      r: num >> 24 & 255,
      g: num >> 16 & 255,
      b: num >> 8 & 255,
      a: num & 255
    }
  } else {
    return null
  }
}
