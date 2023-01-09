import React from 'react'
import { Stage, Sprite } from '@inlet/react-pixi'
import logo from 'src/assets/logo.png'

const SIZE = 500
const App = () => (
  <Stage width={SIZE} height={SIZE}>
    <Sprite image={logo} width={SIZE} height={SIZE} />
  </Stage>
)

export default App
