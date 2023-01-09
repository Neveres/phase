import React from 'react'
import { Stage, Sprite } from '@inlet/react-pixi'

const App = () => (
  <Stage width={500} height={500}>
    <Sprite image="./logo192.png" x={100} y={100} />
  </Stage>
)

export default App
