import React from 'react'
import { create } from 'react-test-renderer'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { setItem, clear } from 'src/libraries'
import { storageKeys } from 'src/settings'
import App from '../App'

afterAll(() => {
  clear()
})

describe('App', () => {
  test('should render well', () => {
    expect(create(<App />).toJSON()).toMatchSnapshot()
  })

  test('Opening login dialog should work well', async () => {
    setItem(storageKeys.USERNAME, 'username')
    render(<App />)
    fireEvent.click(screen.getByText('Logout'))

    await waitFor(() => {
      expect(screen.getByTitle('Username')).toBeInTheDocument()
    })

    fireEvent.change(screen.getByTestId('username-input'), {
      target: { value: 'username' },
    })

    fireEvent.change(screen.getByTestId('password-input'), {
      target: { value: 'password' },
    })

    fireEvent.click(screen.getByText('Log In'))

    await waitFor(() => {
      expect(screen.queryByText('Username')).not.toBeInTheDocument()
    })
  })

  describe('Opening comment dialog should work well', () => {
    test('while adding more comment', async () => {
      setItem(storageKeys.USERNAME, 'username')
      setItem(storageKeys.COMMENT_GROUPS, {
        uuid: {
          uuid: 'uuid',
          comments: [
            { name: 'name', message: 'message', postTime: 'postTime' },
          ],
          isResolved: false,
          coordinate: [100, 100],
        },
      })
      render(<App />)

      fireEvent.click(screen.getByRole('img'))

      await waitFor(() => {
        expect(screen.getByText('OK')).toBeInTheDocument()
      })

      fireEvent.click(screen.getByText('Cancel'))

      await waitFor(() => {
        expect(screen.queryByText('OK')).not.toBeInTheDocument()
      })
    })

    test('while create new comment', async () => {
      setItem(storageKeys.USERNAME, 'username')
      render(<App />)

      userEvent.click(document.querySelector('canvas') as any)
      await waitFor(() => {
        expect(screen.getByText('OK')).toBeInTheDocument()
      })
    })
  })
})
