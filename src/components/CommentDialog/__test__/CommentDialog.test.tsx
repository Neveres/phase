import React from 'react'
import { create } from 'react-test-renderer'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { CommentDialog } from 'src/components'

jest.useFakeTimers().setSystemTime(new Date('2020-01-01'))
jest.mock('react-dom', () => ({
  ...jest.requireActual('react-dom'),
  createPortal: (node: any) => node,
}))

describe('CommentDialog', () => {
  describe('render testing', () => {
    describe('in close status', () => {
      test('should render well while no comment existed', () => {
        const testRenderer = create(
          <CommentDialog
            open={false}
            closeDialog={jest.fn()}
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
            closeDialog={jest.fn()}
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
                  name: 'name',
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
            closeDialog={jest.fn()}
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
            closeDialog={jest.fn()}
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
                  name: 'name',
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
      test('adding new comment should work well ', async () => {
        const closeDialog = jest.fn()
        const clearCommentGroupID = jest.fn()
        const groupActions = {
          create: jest.fn(),
          update: jest.fn(),
          delete: jest.fn(),
        } as any

        render(
          <CommentDialog
            open={true}
            closeDialog={closeDialog}
            clearCommentGroupID={clearCommentGroupID}
            groupActions={groupActions}
          />,
        )

        fireEvent.change(screen.getByTestId('name-input'), {
          target: { value: 'name' },
        })

        fireEvent.change(screen.getByTestId('message-input'), {
          target: { value: 'message' },
        })

        fireEvent.click(screen.getByText('OK'))
        await waitFor(() => {
          expect(closeDialog).toBeCalled()
          expect(groupActions.create).toBeCalledWith({
            message: 'message',
            name: 'name',
            postTime: '1/1/2020, 8:00:00 AM',
          })
          expect(clearCommentGroupID).toBeCalled()
        })
      })

      test('clicking cancel should work', async () => {
        const closeDialog = jest.fn()
        const clearCommentGroupID = jest.fn()
        const groupActions = {
          create: jest.fn(),
          update: jest.fn(),
          delete: jest.fn(),
        } as any

        render(
          <CommentDialog
            open={true}
            closeDialog={closeDialog}
            clearCommentGroupID={clearCommentGroupID}
            groupActions={groupActions}
          />,
        )

        fireEvent.click(screen.getByText('Cancel'))
        await waitFor(() => {
          expect(closeDialog).toBeCalled()
          expect(clearCommentGroupID).toBeCalled()
        })
      })
    })

    describe('while comment existed', () => {
      test('adding new comment should work well', async () => {
        const closeDialog = jest.fn()
        const clearCommentGroupID = jest.fn()
        const groupActions = {
          create: jest.fn(),
          update: jest.fn(),
          delete: jest.fn(),
        } as any

        render(
          <CommentDialog
            open={true}
            closeDialog={closeDialog}
            clearCommentGroupID={clearCommentGroupID}
            groupActions={groupActions}
            commentGroup={{
              uuid: 'uuid',
              comments: [
                {
                  name: 'name',
                  message: 'message',
                  postTime: 'postTime',
                },
              ],
              isResolved: false,
              coordinate: [100, 100],
            }}
          />,
        )

        fireEvent.change(screen.getByTestId('name-input'), {
          target: { value: 'name' },
        })

        fireEvent.change(screen.getByTestId('message-input'), {
          target: { value: 'message' },
        })

        fireEvent.click(screen.getByText('OK'))
        await waitFor(() => {
          expect(closeDialog).toBeCalled()
          expect(groupActions.update).toBeCalledWith({
            isResolved: false,
            comment: {
              message: 'message',
              name: 'name',
              postTime: '1/1/2020, 8:00:00 AM',
            },
          })
          expect(clearCommentGroupID).toBeCalled()
        })
      })

      test('clicking cancel should work well', async () => {
        const closeDialog = jest.fn()
        const clearCommentGroupID = jest.fn()
        const groupActions = {
          create: jest.fn(),
          update: jest.fn(),
          delete: jest.fn(),
        } as any

        render(
          <CommentDialog
            open={true}
            closeDialog={closeDialog}
            clearCommentGroupID={clearCommentGroupID}
            groupActions={groupActions}
            commentGroup={{
              uuid: 'uuid',
              comments: [
                {
                  name: 'name',
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
        expect(checkbox).toBeChecked()

        fireEvent.click(screen.getByText('Cancel'))
        await waitFor(() => {
          expect(closeDialog).toBeCalled()
          expect(clearCommentGroupID).toBeCalled()
        })
      })

      test('delete comment should work well', async () => {
        const closeDialog = jest.fn()
        const clearCommentGroupID = jest.fn()
        const groupActions = {
          create: jest.fn(),
          update: jest.fn(),
          delete: jest.fn(),
        } as any

        render(
          <CommentDialog
            open={true}
            closeDialog={closeDialog}
            clearCommentGroupID={clearCommentGroupID}
            groupActions={groupActions}
            commentGroup={{
              uuid: 'uuid',
              comments: [
                {
                  name: 'name',
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
          expect(closeDialog).toBeCalled()
          expect(groupActions.delete).toBeCalled()
          expect(clearCommentGroupID).toBeCalled()
        })
      })
    })
  })
})
