import React from 'react'
import { create } from 'react-test-renderer'
import { render, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ReactPixiStage } from 'src/components'
import rabbit from 'src/assets/rabbit.jpg'
import dog from 'src/assets/dog.jpg'

const resizeWindow = (x: number, y: number) => {
  window.innerWidth = x
  window.innerHeight = y
  window.dispatchEvent(new Event('resize'))
}

describe('ReactPixiStage', () => {
  test('should render well without sprites', () => {
    const testRenderer = create(<ReactPixiStage setCoordinate={jest.fn()} />)
    expect(testRenderer.toJSON()).toMatchSnapshot()
  })

  test('should render well with sprites', () => {
    const sprites = [
      {
        x: 200,
        y: 200,
        anchor: 0.5,
        image: rabbit,
        interactive: true,
        width: 313,
        height: 313,
        draggable: true,
      },
      {
        x: 600,
        y: 200,
        image: dog,
        interactive: true,
        width: 313,
        height: 313,
        anchor: 0.5,
      },
    ]

    const testRenderer = create(
      <ReactPixiStage setCoordinate={jest.fn()} sprites={sprites} />,
    )
    expect(testRenderer.toJSON()).toMatchSnapshot()
  })

  test('click should work well', async () => {
    resizeWindow(500, 500)
    const setCoordinate = jest.fn()
    const sprites = [
      {
        x: 200,
        y: 200,
        anchor: 0.5,
        image: rabbit,
        interactive: true,
        width: 313,
        height: 313,
      },
    ]

    render(<ReactPixiStage setCoordinate={setCoordinate} sprites={sprites} />)
    userEvent.click(document.querySelector('canvas') as any)

    await waitFor(() => {
      expect(setCoordinate).toBeCalled()
    })
  })
})
