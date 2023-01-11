import React, { useCallback, useMemo, useState } from 'react'
import * as PIXI from 'pixi.js'
import { Stage, Sprite, _ReactPixi } from '@inlet/react-pixi'

interface IDraggable extends PIXI.DisplayObject {
  data: PIXI.InteractionData | null
  dragging: boolean
}

interface ISprite extends _ReactPixi.ISprite {
  draggable?: boolean
}

interface IReactPixiStage {
  sprites: ISprite[]
  setCoordinate: (newCoordinate: number[]) => void
}

const ReactPixiStage: React.FC<IReactPixiStage> = ({
  sprites,
  setCoordinate,
}) => {
  const [isDraggedBefore, setDraggedStatus] = useState(false)

  const dragHandlers = useMemo(
    () => ({
      pointerdown(event: PIXI.InteractionEvent) {
        event.stopPropagation()
        const sprite = event.currentTarget as IDraggable
        sprite.alpha = 0.5
        sprite.data = event.data
        sprite.dragging = true
      },
      pointerup(event: PIXI.InteractionEvent) {
        event.stopPropagation()
        const sprite = event.currentTarget as IDraggable
        sprite.alpha = 1
        sprite.dragging = false
        sprite.data = null
      },
      pointerupoutside(event: PIXI.InteractionEvent) {
        event.stopPropagation()
        const sprite = event.currentTarget as IDraggable
        sprite.alpha = 1
        sprite.dragging = false
        sprite.data = null
      },
      pointermove(event: PIXI.InteractionEvent) {
        const sprite = event.currentTarget as IDraggable
        if (sprite.dragging) {
          const newPosition = sprite.data?.getLocalPosition(
            sprite.parent,
          ) as PIXI.Point

          sprite.x = newPosition.x
          sprite.y = newPosition.y
          if (!isDraggedBefore) {
            setDraggedStatus(true)
          }
        }
      },
    }),
    [],
  )

  const Sprites = useMemo(
    () =>
      sprites.map((sprite) => {
        const props = sprite.draggable
          ? { ...sprite, ...dragHandlers }
          : { ...sprite }
        return <Sprite key={sprite.image as string} {...props} />
      }),
    [dragHandlers, sprites],
  )

  const onClickStage = useCallback(
    ({ pageX, pageY }: React.MouseEvent<HTMLCanvasElement>) => {
      if (isDraggedBefore) {
        setDraggedStatus(false)
      } else {
        setCoordinate([pageX, pageY])
      }
    },
    [isDraggedBefore, setCoordinate],
  )

  return (
    <Stage
      width={window.screen.width}
      height={window.screen.height}
      onClick={onClickStage}
      options={{
        backgroundAlpha: 0,
      }}
    >
      {Sprites}
    </Stage>
  )
}

export default ReactPixiStage
