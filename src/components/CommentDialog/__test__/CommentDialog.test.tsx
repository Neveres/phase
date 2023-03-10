import React from 'react'
import { create } from 'react-test-renderer'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { CommentDialog } from 'src/components'
import { setItem, clear } from 'src/libraries'
import { storageKeys } from 'src/settings'

const { USERNAME } = storageKeys

const username = 'USERNAME'
beforeAll(() => {
  setItem(USERNAME, username)
})

afterAll(() => {
  clear()
})

describe('CommentDialog', () => {
  describe('render testing', () => {
    describe('in close status', () => {
      test('should render well while no comment existed', () => {
        const testRenderer = create(
          <CommentDialog
            open={false}
            closeCommentDialog={jest.fn()}
            clearCommentGroupID={jest.fn()}
            groupActions={
              {
                create: jest.fn(),
                update: jest.fn(),
                delete: jest.fn(),
              } as any
            }
          />,
        )
        expect(testRenderer.toJSON()).toMatchSnapshot()
      })

      test('should render well while comments existed', () => {
        const testRenderer = create(
          <CommentDialog
            open={false}
            closeCommentDialog={jest.fn()}
            clearCommentGroupID={jest.fn()}
            groupActions={
              {
                create: jest.fn(),
                update: jest.fn(),
                delete: jest.fn(),
              } as any
            }
            commentGroup={{
              uuid: 'uuid',
              comments: [
                {
                  name: username,
                  message: 'message',
                  postTime: 'postTime',
                },
              ],
              isResolved: false,
              coordinate: [100, 100],
            }}
          />,
        )
        expect(testRenderer.toJSON()).toMatchSnapshot()
      })
    })

    describe('in open status', () => {
      test('should render well while no comment existed', () => {
        const testRenderer = create(
          <CommentDialog
            open={true}
            closeCommentDialog={jest.fn()}
            clearCommentGroupID={jest.fn()}
            groupActions={
              {
                create: jest.fn(),
                update: jest.fn(),
                delete: jest.fn(),
              } as any
            }
          />,
        )
        expect(testRenderer.toJSON()).toMatchSnapshot()
      })

      test('should render well while comments existed', () => {
        const testRenderer = create(
          <CommentDialog
            open={true}
            closeCommentDialog={jest.fn()}
            clearCommentGroupID={jest.fn()}
            groupActions={
              {
                create: jest.fn(),
                update: jest.fn(),
                delete: jest.fn(),
              } as any
            }
            commentGroup={{
              uuid: 'uuid',
              comments: [
                {
                  name: username,
                  message: 'message',
                  postTime: 'postTime',
                },
              ],
              isResolved: false,
              coordinate: [100, 100],
            }}
          />,
        )
        expect(testRenderer.toJSON()).toMatchSnapshot()
      })
    })
  })

  describe('functional testing', () => {
    describe('while no comment existed', () => {
      describe('clicking button OK', () => {
        test('with adding comment should work well', async () => {
          const closeCommentDialog = jest.fn()
          const clearCommentGroupID = jest.fn()
          const groupActions = {
            create: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
          } as any

          render(
            <CommentDialog
              open={true}
              closeCommentDialog={closeCommentDialog}
              clearCommentGroupID={clearCommentGroupID}
              groupActions={groupActions}
            />,
          )

          fireEvent.change(screen.getByTestId('message-input'), {
            target: { value: 'message' },
          })

          fireEvent.click(screen.getByText('OK'))
          await waitFor(() => {
            expect(closeCommentDialog).toBeCalled()
            expect(groupActions.create).toBeCalledWith({
              message: 'message',
              name: username,
              postTime: '1/1/2020, 8:00:00 AM',
            })
            expect(clearCommentGroupID).toBeCalled()
          })
        })

        test('without adding comment should work well', async () => {
          const closeCommentDialog = jest.fn()
          const clearCommentGroupID = jest.fn()
          const groupActions = {
            create: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
          } as any

          render(
            <CommentDialog
              open={true}
              closeCommentDialog={closeCommentDialog}
              clearCommentGroupID={clearCommentGroupID}
              groupActions={groupActions}
            />,
          )

          fireEvent.click(screen.getByText('OK'))
          await waitFor(() => {
            expect(closeCommentDialog).toBeCalled()
            expect(groupActions.create).not.toBeCalled()
            expect(clearCommentGroupID).toBeCalled()
          })
        })
      })

      test('clicking button Cancel should work', async () => {
        const closeCommentDialog = jest.fn()
        const clearCommentGroupID = jest.fn()
        const groupActions = {
          create: jest.fn(),
          update: jest.fn(),
          delete: jest.fn(),
        } as any

        render(
          <CommentDialog
            open={true}
            closeCommentDialog={closeCommentDialog}
            clearCommentGroupID={clearCommentGroupID}
            groupActions={groupActions}
          />,
        )

        fireEvent.click(screen.getByText('Cancel'))
        await waitFor(() => {
          expect(closeCommentDialog).toBeCalled()
          expect(clearCommentGroupID).toBeCalled()
        })
      })
    })

    describe('while comment existed', () => {
      describe('clicking button OK', () => {
        test('with adding comment should work well', async () => {
          const closeCommentDialog = jest.fn()
          const clearCommentGroupID = jest.fn()
          const groupActions = {
            create: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
          } as any

          render(
            <CommentDialog
              open={true}
              closeCommentDialog={closeCommentDialog}
              clearCommentGroupID={clearCommentGroupID}
              groupActions={groupActions}
              commentGroup={{
                uuid: 'uuid',
                comments: [
                  {
                    name: username,
                    message: 'message',
                    postTime: 'postTime',
                  },
                ],
                isResolved: false,
                coordinate: [100, 100],
              }}
            />,
          )

          fireEvent.change(screen.getByTestId('message-input'), {
            target: { value: 'message' },
          })

          fireEvent.click(screen.getByText('OK'))
          await waitFor(() => {
            expect(closeCommentDialog).toBeCalled()
            expect(groupActions.update).toBeCalledWith({
              comment: {
                message: 'message',
                name: username,
                postTime: '1/1/2020, 8:00:00 AM',
              },
            })
            expect(clearCommentGroupID).toBeCalled()
          })
        })

        test('without adding comment should work well', async () => {
          const closeCommentDialog = jest.fn()
          const clearCommentGroupID = jest.fn()
          const groupActions = {
            create: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
          } as any

          render(
            <CommentDialog
              open={true}
              closeCommentDialog={closeCommentDialog}
              clearCommentGroupID={clearCommentGroupID}
              groupActions={groupActions}
              commentGroup={{
                uuid: 'uuid',
                comments: [
                  {
                    name: username,
                    message: 'message',
                    postTime: 'postTime',
                  },
                ],
                isResolved: false,
                coordinate: [100, 100],
              }}
            />,
          )

          fireEvent.click(screen.getByText('OK'))
          await waitFor(() => {
            expect(closeCommentDialog).toBeCalled()
            expect(groupActions.update).not.toBeCalled()
            expect(clearCommentGroupID).toBeCalled()
          })
        })
      })

      test('clicking button Cancel should work well', async () => {
        const closeCommentDialog = jest.fn()
        const clearCommentGroupID = jest.fn()
        const groupActions = {
          create: jest.fn(),
          update: jest.fn(),
          delete: jest.fn(),
        } as any

        render(
          <CommentDialog
            open={true}
            closeCommentDialog={closeCommentDialog}
            clearCommentGroupID={clearCommentGroupID}
            groupActions={groupActions}
            commentGroup={{
              uuid: 'uuid',
              comments: [
                {
                  name: username,
                  message: 'message',
                  postTime: 'postTime',
                },
              ],
              isResolved: false,
              coordinate: [100, 100],
            }}
          />,
        )

        fireEvent.change(screen.getByTestId('message-input'), {
          target: { value: 'message' },
        })

        const checkbox = screen.getByTestId('resolved-switch')
        fireEvent.click(checkbox, {
          target: { checked: true },
        })

        fireEvent.click(screen.getByText('Cancel'))
        await waitFor(() => {
          expect(closeCommentDialog).toBeCalled()
          const values = Object.values(groupActions)
          for (let i = 0, maxI = values.length; i < maxI; i++) {
            expect(values[i]).not.toBeCalled()
          }
          expect(clearCommentGroupID).toBeCalled()
        })
      })

      describe('delete comment should work well', () => {
        test('through delete button', async () => {
          const closeCommentDialog = jest.fn()
          const clearCommentGroupID = jest.fn()
          const groupActions = {
            create: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
          } as any

          render(
            <CommentDialog
              open={true}
              closeCommentDialog={closeCommentDialog}
              clearCommentGroupID={clearCommentGroupID}
              groupActions={groupActions}
              commentGroup={{
                uuid: 'uuid',
                comments: [
                  {
                    name: username,
                    message: 'message',
                    postTime: 'postTime',
                  },
                ],
                isResolved: false,
                coordinate: [100, 100],
              }}
            />,
          )

          userEvent.hover(screen.getByText('Options'))
          await waitFor(() => {
            const deleteButton = screen.getByText('Delete')
            expect(deleteButton).toBeInTheDocument()
            fireEvent.click(deleteButton)
          })

          await waitFor(() => {
            expect(closeCommentDialog).toBeCalled()
            expect(groupActions.delete).toBeCalled()
            expect(clearCommentGroupID).toBeCalled()
          })
        })

        test('through resolved switch', async () => {
          const closeCommentDialog = jest.fn()
          const clearCommentGroupID = jest.fn()
          const groupActions = {
            create: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
          } as any

          render(
            <CommentDialog
              open={true}
              closeCommentDialog={closeCommentDialog}
              clearCommentGroupID={clearCommentGroupID}
              groupActions={groupActions}
              commentGroup={{
                uuid: 'uuid',
                comments: [
                  {
                    name: username,
                    message: 'message',
                    postTime: 'postTime',
                  },
                ],
                isResolved: false,
                coordinate: [100, 100],
              }}
            />,
          )

          const checkbox = screen.getByTestId('resolved-switch')
          fireEvent.click(checkbox, {
            target: { checked: true },
          })

          fireEvent.click(screen.getByText('OK'))
          await waitFor(() => {
            expect(closeCommentDialog).toBeCalled()
            expect(groupActions.delete).toBeCalled()
            expect(clearCommentGroupID).toBeCalled()
          })
        })
      })
    })
  })
})
