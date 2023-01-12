import { getItem, setItem, removeItem } from '../storage'

const KEY = 'KEY_FOR_TESTING'
afterAll(() => {
  localStorage.removeItem(KEY)
})

describe('storage testing', () => {
  test('getItem should work well', () => {
    let value = '{}'
    localStorage.setItem(KEY, value)

    expect(getItem(KEY)).toBe(value)
    expect(getItem(KEY, true)).toStrictEqual(JSON.parse(value))

    value = ''
    localStorage.setItem(KEY, value)
    expect(getItem(KEY)).toBe(value)
    expect(getItem(KEY, true)).toBe(value)
  })

  test('setItem should work well', () => {
    let value: any = true
    setItem(KEY, value)
    expect(localStorage.getItem(KEY)).toBe('true')

    value = {}
    setItem(KEY, value)
    expect(localStorage.getItem(KEY)).toBe(JSON.stringify(value))
  })

  test('removeItem should work well', () => {
    removeItem(KEY)
    expect(localStorage.getItem(KEY)).toBeNull()
  })
})
