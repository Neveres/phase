import React from 'react'
import { create } from 'react-test-renderer'
import Content from '../Content'

describe('Content', () => {
  test('should render well uuid existed', () => {
    expect(
      create(
        <Content
          uuid="uuid"
          comments={[
            {
              name: 'name',
              message: 'message',
              postTime: 'postTime',
            },
            {
              name: 'name',
              message: 'message',
              postTime: 'postTime',
            },
            {
              name: 'anotherName',
              message: 'message',
              postTime: 'postTime',
            },
          ]}
          inputRef={null as any}
        />,
      ).toJSON(),
    ).toMatchSnapshot()
  })

  test('should render well uuid not existed', () => {
    expect(
      create(<Content uuid="" comments={[]} inputRef={null as any} />).toJSON(),
    ).toMatchSnapshot()
  })
})
