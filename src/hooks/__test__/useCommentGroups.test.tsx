import { waitFor } from '@testing-library/react'
import { renderHook, act } from '@testing-library/react-hooks'
import { useCommentGroups } from 'src/hooks'
import { clear, setItem } from 'src/libraries'
import { storageKeys } from 'src/settings'

jest.mock('src/libraries', () => ({
  ...jest.requireActual('src/libraries'),
  generateUuid: () => 'uuid',
}))

beforeAll(() => {
  clear()
})

afterEach(() => {
  clear()
})

describe('useCommentGroups', () => {
  describe('default value', () => {
    test('should be {} if client storage has no data', () => {
      const {
        result: {
          current: { commentGroups },
        },
      } = renderHook(useCommentGroups)

      expect(commentGroups).toStrictEqual({})
    })

    test('should be the data from client storage', () => {
      const groups = {
        uuid: {
          isResolved: false,
          comments: [],
          coordinate: [55, 66],
        },
      }
      setItem(storageKeys.COMMENT_GROUPS, groups)

      const {
        result: {
          current: { commentGroups },
        },
      } = renderHook(useCommentGroups)

      expect(commentGroups).toStrictEqual(groups)
    })
  })

  describe('groupActions', () => {
    test('create should work well', async () => {
      const { result } = renderHook(useCommentGroups)
      expect(result.current.commentGroups).toStrictEqual({})

      const comment = {
        name: 'name',
        message: 'message',
        postTime: 'postTime',
      }

      act(() => {
        result.current.groupActions.create(comment)
      })

      await waitFor(() => {
        expect(result.current.commentGroups).toStrictEqual({
          uuid: {
            comments: [comment],
            coordinate: [],
            isResolved: false,
            uuid: 'uuid',
          },
        })
      })
    })

    test('update should work well', async () => {
      const { result } = renderHook(useCommentGroups)
      expect(result.current.commentGroups).toStrictEqual({})

      const comment = {
        name: 'name',
        message: 'message',
        postTime: 'postTime',
      }
      act(() => {
        result.current.groupActions.create(comment)
      })

      await waitFor(() => {
        expect(result.current.commentGroups).toStrictEqual({
          uuid: {
            comments: [comment],
            coordinate: [],
            isResolved: false,
            uuid: 'uuid',
          },
        })
      })

      result.current.groupActions.commentGroupID = 'uuid'

      act(() => {
        result.current.groupActions.update({ isResolved: false, comment })
      })

      await waitFor(() => {
        expect(result.current.commentGroups).toStrictEqual({
          uuid: {
            comments: [comment, comment],
            coordinate: [],
            isResolved: false,
            uuid: 'uuid',
          },
        })
      })

      act(() => {
        result.current.groupActions.update({})
      })

      await waitFor(() => {
        expect(result.current.commentGroups).toStrictEqual({
          uuid: {
            comments: [comment, comment],
            coordinate: [],
            isResolved: false,
            uuid: 'uuid',
          },
        })
      })
    })

    test('delete should work well', async () => {
      const { result } = renderHook(useCommentGroups)
      expect(result.current.commentGroups).toStrictEqual({})

      const comment = {
        name: 'name',
        message: 'message',
        postTime: 'postTime',
      }

      act(() => {
        result.current.groupActions.create(comment)
      })

      await waitFor(() => {
        expect(result.current.commentGroups).toStrictEqual({
          uuid: {
            comments: [comment],
            coordinate: [],
            isResolved: false,
            uuid: 'uuid',
          },
        })
      })

      result.current.groupActions.commentGroupID = 'uuid'

      act(() => {
        result.current.groupActions.delete()
      })

      await waitFor(() => {
        expect(result.current.commentGroups).toStrictEqual({})
      })
    })
  })
})
