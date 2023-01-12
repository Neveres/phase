import React from 'react'
import { create } from 'react-test-renderer'
import { CommentDialog } from 'src/components'

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
})
