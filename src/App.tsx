/** @jsxImportSource @emotion/react */
import React, { useState, useCallback, useMemo } from 'react'
import {
  ReactPixiStage,
  CommentEntries,
  CommentDialog,
  AppHeader,
  LoginDialog,
} from 'src/components'
import { useCommentGroups, useStorage } from 'src/hooks'
import { storageKeys } from 'src/settings'
import rabbit from 'src/assets/rabbit.jpg'
import dog from 'src/assets/dog.jpg'
import { GlobalCss } from './GlobalCss'

const DEFAULT_VALUE_OF_ID = ''
const App = () => {
  const { get: getUsername, remove: removeUsername } = useStorage(
    storageKeys.USERNAME,
  )
  const [isLoginDialogOpen, setLoginDialogStatus] = useState(!getUsername())
  const [coordinate, setCoordinate] = useState([] as number[])
  const [isCommentDialogOpen, setCommentDialogStatus] = useState(false)
  const [commentGroupID, setCommentGroupID] = useState(DEFAULT_VALUE_OF_ID)

  const { commentGroups, groupActions } = useCommentGroups()

  const openLoginDialog = useCallback(() => {
    removeUsername()
    setLoginDialogStatus(true)
  }, [removeUsername])

  const closeLoginDialog = useCallback(() => {
    setLoginDialogStatus(false)
  }, [])

  const openCommentDialog = useCallback(() => {
    setCommentDialogStatus(true)
  }, [])

  const closeCommentDialog = useCallback(() => {
    setCommentDialogStatus(false)
  }, [])

  const openCommentDialogAndSetCoordinate = useCallback(
    (newCoordinate: number[]) => {
      openCommentDialog()
      setCoordinate(newCoordinate)
    },
    [openCommentDialog],
  )

  const openCommentEntry = useCallback(
    (newCommentGroupID: string) => {
      setCommentGroupID(newCommentGroupID)
      openCommentDialog()
    },
    [openCommentDialog],
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
      <AppHeader openLoginDialog={openLoginDialog} />

      <CommentEntries
        commentGroups={commentGroups}
        openCommentEntry={openCommentEntry}
      />
      <ReactPixiStage
        setCoordinate={openCommentDialogAndSetCoordinate}
        sprites={sprites}
      />
      <CommentDialog
        open={isCommentDialogOpen}
        commentGroup={commentGroups[commentGroupID]}
        closeCommentDialog={closeCommentDialog}
        clearCommentGroupID={clearCommentGroupID}
        groupActions={boundGroupActionsActions}
      />

      <LoginDialog
        open={isLoginDialogOpen}
        closeLoginDialog={closeLoginDialog}
      />
      <GlobalCss />
    </>
  )
}

export default App
