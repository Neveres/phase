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
      const {
        current: { commentGroups, groupActions },
      } = result

      expect(commentGroups).toStrictEqual({})

      const comment = {
        name: 'name',
        message: 'message',
        postTime: 'postTime',
      }

      act(() => {
        groupActions.create(comment)
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

    test.skip('update should work well', async () => {
      const { result } = renderHook(useCommentGroups)
      const {
        current: { commentGroups, groupActions },
      } = result

      expect(commentGroups).toStrictEqual({})

      const comment = {
        name: 'name',
        message: 'message',
        postTime: 'postTime',
      }
      act(() => {
        groupActions.create(comment)
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

      groupActions.commentGroupID = 'uuid'

      act(() => {
        groupActions.update({ isResolved: false, comment })
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
  })
})
