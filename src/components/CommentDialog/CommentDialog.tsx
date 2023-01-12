import React, { useCallback, useMemo, useRef } from 'react'
import { InputRef, Modal } from 'antd'
import { CommentDialogHeader, CommentDialogContent } from 'src/components'
import { useCommentGroups } from 'src/hooks'
import { getItem } from 'src/libraries'
import { storageKeys } from 'src/settings'

type CommentGroups = ReturnType<typeof useCommentGroups>

interface ICommentDialog {
  open: boolean
  commentGroup?: Phase.CommentGroup
  closeCommentDialog: () => void
  clearCommentGroupID: () => void
  groupActions: CommentGroups['groupActions']
}

const CommentDialog: React.FC<ICommentDialog> = ({
  open,
  commentGroup = { uuid: '', comments: [], isResolved: false },
  groupActions,
  closeCommentDialog,
  clearCommentGroupID,
}) => {
  const { uuid, comments, isResolved } = commentGroup
  const switchRef = useRef(null as unknown as HTMLElement)
  const inputRef = useRef(null as unknown as InputRef)

  const onOk = useCallback(() => {
    closeCommentDialog()
    if (switchRef?.current?.getAttribute('aria-checked') === 'true') {
      groupActions.delete()
    } else {
      const message = inputRef.current.input?.value
      if (message) {
        const comment = {
          name: getItem(storageKeys.USERNAME),
          message,
          postTime: new Date().toLocaleString('en-US', {
            timeZone: 'Asia/Taipei',
          }),
        }
        if (uuid) {
          groupActions.update({
            comment,
          })
        } else {
          groupActions.create(comment)
        }
      }
    }

    clearCommentGroupID()
  }, [closeCommentDialog, clearCommentGroupID, groupActions, uuid])

  const onCancel = useCallback(() => {
    closeCommentDialog()
    clearCommentGroupID()
  }, [clearCommentGroupID, closeCommentDialog])

  const onDelete = useCallback(() => {
    closeCommentDialog()
    groupActions.delete()
    clearCommentGroupID()
  }, [closeCommentDialog, groupActions, clearCommentGroupID])

  const Header = useMemo(
    () => (
      <CommentDialogHeader
        uuid={uuid}
        isResolved={isResolved}
        onDelete={onDelete}
        switchRef={switchRef}
      />
    ),
    [isResolved, onDelete, uuid],
  )

  const Content = useMemo(
    () => (
      <CommentDialogContent
        uuid={uuid}
        comments={comments}
        inputRef={inputRef}
      />
    ),
    [comments, uuid],
  )

  return (
    <Modal
      title={Header}
      open={open}
      onOk={onOk}
      onCancel={onCancel}
      closable={false}
      destroyOnClose={true}
    >
      {Content}
    </Modal>
  )
}

export default CommentDialog
