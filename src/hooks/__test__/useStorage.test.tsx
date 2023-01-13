import { renderHook } from '@testing-library/react-hooks'
import { useStorage } from 'src/hooks'
import { clear, setItem, getItem } from 'src/libraries'
import { storageKeys } from 'src/settings'

const { USERNAME, COMMENT_GROUPS } = storageKeys

beforeAll(() => {
  clear()
})

afterEach(() => {
  clear()
})

describe('useStorage', () => {
  test('should return object with expected method', () => {
    const {
      result: {
        current: { get, set, remove },
      },
    } = renderHook(useStorage)

    expect(get).toBeDefined()
    expect(set).toBeDefined()
    expect(remove).toBeDefined()
  })

  describe('operate storage testing', () => {
    describe('while shouldParse is false or not given', () => {
      const username = 'username'

      test('set should work well', () => {
        const {
          result: {
            current: { set },
          },
        } = renderHook(() => useStorage(USERNAME))

        set(username)
        expect(getItem(USERNAME)).toBe(username)
      })

      test('get should work well', () => {
        setItem(USERNAME, username)

        const {
          result: {
            current: { get },
          },
        } = renderHook(() => useStorage(USERNAME))

        expect(get()).toBe(username)
      })

      test('remove should work well', () => {
        setItem(USERNAME, username)

        const {
          result: {
            current: { remove },
          },
        } = renderHook(() => useStorage(USERNAME))

        remove()
        expect(getItem(USERNAME)).toBe('')
      })
    })

    describe('while shouldParse is true', () => {
      const groups = {}

      test('set should work well', () => {
        const {
          result: {
            current: { set },
          },
        } = renderHook(() => useStorage(COMMENT_GROUPS, true))

        set(groups)
        expect(getItem(COMMENT_GROUPS, true)).toStrictEqual(groups)
        expect(getItem(COMMENT_GROUPS)).toStrictEqual('{}')
      })

      test('get should work well', () => {
        setItem(COMMENT_GROUPS, groups)

        const {
          result: {
            current: { get },
          },
        } = renderHook(() => useStorage(COMMENT_GROUPS, true))

        expect(get()).toStrictEqual(groups)
      })

      test('remove should work well', () => {
        setItem(COMMENT_GROUPS, groups)

        const {
          result: {
            current: { remove },
          },
        } = renderHook(() => useStorage(COMMENT_GROUPS, true))

        remove()
        expect(getItem(COMMENT_GROUPS)).toBe('')
      })
    })
  })
})
