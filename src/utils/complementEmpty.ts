export const complementEmpty = (value: string | null) => {
  if (value === null) return null
  if (value === '') return '空'
  return value
}
