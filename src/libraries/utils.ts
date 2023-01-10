export const generateUuid = () => {
  let nowOfDate = Date.now()

  if (
    typeof performance !== 'undefined' &&
    typeof performance.now === 'function'
  ) {
    nowOfDate += performance.now()
  }

  const result = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
    /[xy]/g,
    (character) => {
      const remains = (nowOfDate + Math.random() * 16) % 16 | 0
      nowOfDate = Math.floor(nowOfDate / 16)
      return (character === 'x' ? remains : (remains & 0x3) | 0x8).toString(16)
    },
  )
  return result
}
