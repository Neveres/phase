import React from 'react'
import { create } from 'react-test-renderer'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { LoginDialog } from 'src/components'
import { getItem } from 'src/libraries'
import { storageKeys } from 'src/settings'

const { USERNAME } = storageKeys
describe('LoginDialog', () => {
  test('should render well while close', () => {
    const testRenderer = create(
      <LoginDialog open={false} closeLoginDialog={jest.fn()} />,
    )
    expect(testRenderer.toJSON()).toMatchSnapshot()
  })

  test('should render well while open', () => {
    const testRenderer = create(
      <LoginDialog open={true} closeLoginDialog={jest.fn()} />,
    )
    expect(testRenderer.toJSON()).toMatchSnapshot()
  })

  test('should work well', async () => {
    const closeLoginDialog = jest.fn()
    render(<LoginDialog open={true} closeLoginDialog={closeLoginDialog} />)

    fireEvent.change(screen.getByTestId('username-input'), {
      target: { value: 'username' },
    })

    fireEvent.change(screen.getByTestId('password-input'), {
      target: { value: 'password' },
    })

    fireEvent.click(screen.getByText('Log In'))
    await waitFor(() => {
      expect(getItem(USERNAME)).toBe('username')
      expect(closeLoginDialog).toBeCalled()
    })
  })
})
