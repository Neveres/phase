import { generateUuid } from '../utils'

describe('utils', () => {
  describe('generateUuid', () => {
    test('should return different uuid each time', () => {
      const TIMES = 10000
      for (let i = 0; i < TIMES; i++) {
        expect(generateUuid()).not.toBe(generateUuid())
      }
    })

    test('length of uuid should be 36', () => {
      expect(generateUuid().length).toBe(36)
    })
  })
})
