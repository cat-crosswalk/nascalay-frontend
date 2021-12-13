export const complementEmpty = (value: string | null) => {
  if (value === null) return ''
  if (value === '') return '空'
  return value
}
