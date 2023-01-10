import React from 'react'
import { Stage, Sprite } from '@inlet/react-pixi'
import rabbit from 'src/assets/rabbit.jpg'
import dog from 'src/assets/dog.jpg'

interface IReactPixiStage {
  setCoordinate: (newCoordinate: number[]) => void
}
const SIZE = 313
const ReactPixiStage: React.FC<IReactPixiStage> = ({ setCoordinate }) => (
  <Stage
    width={window.screen.width}
    height={window.screen.height}
    onClick={({ pageX, pageY }) => {
      setCoordinate([pageX, pageY])
    }}
    options={{
      backgroundAlpha: 0,
    }}
  >
    <Sprite image={rabbit} interactive={true} width={SIZE} height={SIZE} />
    <Sprite
      image={dog}
      interactive={true}
      width={SIZE}
      height={SIZE}
      anchor={[-1.5, 0]}
    />
  </Stage>
)

export default ReactPixiStage
