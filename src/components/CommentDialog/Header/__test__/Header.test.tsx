import React from 'react'
import { create } from 'react-test-renderer'
import Header from '../Header'

describe('Header', () => {
  test('should render well uuid existed', () => {
    const uuid = 'uuid'
    expect(
      create(
        <Header
          uuid={uuid}
          isResolved={false}
          onDelete={jest.fn()}
          switchRef={null as any}
        />,
      ).toJSON(),
    ).toMatchSnapshot()

    expect(
      create(
        <Header
          uuid={uuid}
          isResolved={true}
          onDelete={jest.fn()}
          switchRef={null as any}
        />,
      ).toJSON(),
    ).toMatchSnapshot()
  })

  test('should render well uuid not existed', () => {
    const uuid = ''
    expect(
      create(
        <Header
          uuid={uuid}
          isResolved={false}
          onDelete={jest.fn()}
          switchRef={null as any}
        />,
      ).toJSON(),
    ).toMatchSnapshot()

    expect(
      create(
        <Header
          uuid={uuid}
          isResolved={true}
          onDelete={jest.fn()}
          switchRef={null as any}
        />,
      ).toJSON(),
    ).toMatchSnapshot()
  })
})
