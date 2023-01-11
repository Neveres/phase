/** @jsxImportSource @emotion/react */
import React, { useState, useCallback, useMemo } from 'react'
import { ReactPixiStage, CommentEntries, CommentDialog } from 'src/components'
import { useCommentGroups } from 'src/hooks'
import { GlobalCss } from './GlobalCss'

const DEFAULT_VALUE_OF_ID = ''
const App = () => {
  const [coordinate, setCoordinate] = useState([] as number[])
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [commentGroupID, setCommentGroupID] = useState(DEFAULT_VALUE_OF_ID)

  const { commentGroups, addComment } = useCommentGroups()

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

  const boundAddComment = useMemo(
    () => addComment.bind(null, commentGroupID, coordinate),
    [addComment, commentGroupID, coordinate],
  )

  return (
    <>
      <CommentEntries
        commentGroups={commentGroups}
        openCommentEntry={openCommentEntry}
      />
      <ReactPixiStage setCoordinate={openDialogAndSetCoordinate} />
      <CommentDialog
        open={isDialogOpen}
        commentGroup={commentGroups[commentGroupID]}
        addComment={boundAddComment}
        closeDialog={closeDialog}
        clearCommentGroupID={clearCommentGroupID}
      />

      <GlobalCss />
    </>
  )
}

export default App
