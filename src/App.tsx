/** @jsxImportSource @emotion/react */
import React, { useState, useCallback, useMemo } from 'react'
import { ReactPixiStage, CommentEntries, CommentDialog } from 'src/components'
import { useCommentGroups } from 'src/hooks'
import rabbit from 'src/assets/rabbit.jpg'
import dog from 'src/assets/dog.jpg'
import { GlobalCss } from './GlobalCss'

const DEFAULT_VALUE_OF_ID = ''
const App = () => {
  const [coordinate, setCoordinate] = useState([] as number[])
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [commentGroupID, setCommentGroupID] = useState(DEFAULT_VALUE_OF_ID)

  const { commentGroups, groupActions } = useCommentGroups()

  const openDialog = useCallback(() => {
    setIsDialogOpen(true)
  }, [])

  const closeDialog = useCallback(() => {
    setIsDialogOpen(false)
  }, [])

  const openDialogAndSetCoordinate = useCallback(
    (newCoordinate: number[]) => {
      openDialog()
      setCoordinate(newCoordinate)
    },
    [openDialog],
  )

  const openCommentEntry = useCallback(
    (newCommentGroupID: string) => {
      setCommentGroupID(newCommentGroupID)
      openDialog()
    },
    [openDialog],
  )

  const clearCommentGroupID = useCallback(() => {
    setCommentGroupID(DEFAULT_VALUE_OF_ID)
  }, [])

  const boundGroupActionsActions = useMemo(() => {
    groupActions.commentGroupID = commentGroupID
    groupActions.coordinate = coordinate
    return groupActions
  }, [groupActions, commentGroupID, coordinate])

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
      draggable: true,
    },
  ]

  return (
    <>
      <CommentEntries
        commentGroups={commentGroups}
        openCommentEntry={openCommentEntry}
      />
      <ReactPixiStage
        setCoordinate={openDialogAndSetCoordinate}
        sprites={sprites}
      />
      <CommentDialog
        open={isDialogOpen}
        commentGroup={commentGroups[commentGroupID]}
        closeDialog={closeDialog}
        clearCommentGroupID={clearCommentGroupID}
        groupActions={boundGroupActionsActions}
      />

      <GlobalCss />
    </>
  )
}

export default App
