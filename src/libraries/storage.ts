export const getItem = (
  key: Parameters<typeof localStorage.getItem>[0],
  parse = false,
) => {
  const value = localStorage.getItem(key) || ''
  if (parse) {
    let parsedValue
    try {
      parsedValue = JSON.parse(value)
    } catch (ignore) {
      parsedValue = value
    }
    return parsedValue
  } else {
    return value
  }
}

export const setItem = (
  key: string,
  value: Parameters<typeof JSON.stringify>[0],
) => {
  localStorage.setItem(
    key,
    typeof value !== 'string' ? JSON.stringify(value) : value,
  )
}

export const removeItem = (
  key: Parameters<typeof localStorage.removeItem>[0],
) => {
  return localStorage.removeItem(key)
}

export const clear = () => {
  localStorage.clear()
}
