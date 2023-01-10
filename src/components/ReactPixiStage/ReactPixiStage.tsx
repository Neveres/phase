import React from 'react'
import { Stage, Sprite } from '@inlet/react-pixi'
import rabbit from 'src/assets/rabbit.jpg'

interface IReactPixiStage {
  setCoordinate: (newCoordinate: number[]) => void
}

const ReactPixiStage: React.FC<IReactPixiStage> = ({ setCoordinate }) => (
  <Stage
    width={window.screen.width}
    height={window.screen.height}
    onClick={({ pageX, pageY }) => {
      setCoordinate([pageX, pageY])
    }}
  >
    <Sprite image={rabbit} interactive={true} />
  </Stage>
)

export default ReactPixiStage
