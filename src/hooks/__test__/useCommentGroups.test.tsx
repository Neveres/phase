import { waitFor } from '@testing-library/react'
import { renderHook, act } from '@testing-library/react-hooks'
import { useCommentGroups } from 'src/hooks'

jest.mock('src/libraries', () => ({
  ...jest.requireActual('src/libraries'),
  generateUuid: () => 'uuid',
}))

describe('useCommentGroups', () => {
  test('default value of commentGroups should be {}', async () => {
    const {
      result: {
        current: { commentGroups },
      },
    } = renderHook(useCommentGroups)

    expect(commentGroups).toStrictEqual({})
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
