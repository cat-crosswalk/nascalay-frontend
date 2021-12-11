export const areaToXY = (
  areaId: number,
  boardName: string
): [number, number] => {
  let x = 0
  let y = 0
  if (boardName === '5x5') {
    x = areaId % 5
    y = Math.floor(areaId / 5)
  } else if (boardName === '4x4') {
    x = areaId % 4
    y = Math.floor(areaId / 4)
  } else {
    console.log('[Draw] UnKnown boardName: ' + boardName)
  }
  return [x, y]
}
