import React from 'react'
import { create } from 'react-test-renderer'
import App from '../App'

describe('App', () => {
  test('should render well', () => {
    expect(create(<App />).toJSON()).toMatchSnapshot()
  })
})
