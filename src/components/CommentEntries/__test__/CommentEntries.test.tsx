import React from 'react'
import { create } from 'react-test-renderer'
import { render, screen, fireEvent } from '@testing-library/react'
import { CommentEntries } from 'src/components'

describe('CommentEntries', () => {
  test('should render well without data', () => {
    const testRenderer = create(
      <CommentEntries commentGroups={{}} openCommentEntry={jest.fn()} />,
    )
    expect(testRenderer.toJSON()).toMatchSnapshot()
  })

  test('should render well with data', () => {
    const testRenderer = create(
      <CommentEntries
        commentGroups={{
          test: {
            uuid: 'id',
            comments: [],
            isResolved: false,
            coordinate: [55, 66],
          },
        }}
        openCommentEntry={jest.fn()}
      />,
    )
    expect(testRenderer.toJSON()).toMatchSnapshot()
  })

  test('should render well with data', () => {
    const uuid = 'uuid'
    const openCommentEntry = jest.fn()
    render(
      <CommentEntries
        commentGroups={{
          test: {
            uuid,
            comments: [],
            isResolved: false,
            coordinate: [55, 66],
          },
        }}
        openCommentEntry={openCommentEntry}
      />,
    )

    fireEvent.click(screen.getByRole('img'))
    expect(openCommentEntry).toBeCalledWith(uuid, expect.anything())
  })
})
