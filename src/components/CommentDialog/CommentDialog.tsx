import React, { useCallback, useRef } from 'react'
import { InputRef, Modal } from 'antd'
import { useCommentGroups, useStorage } from 'src/hooks'
import { storageKeys } from 'src/settings'
import { Header } from './Header'
import { Content } from './Content'

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
  const { get } = useStorage(storageKeys.USERNAME)
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
          name: get(),
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
  }, [closeCommentDialog, clearCommentGroupID, groupActions, get, uuid])

  const onCancel = useCallback(() => {
    closeCommentDialog()
    clearCommentGroupID()
  }, [clearCommentGroupID, closeCommentDialog])

  const onDelete = useCallback(() => {
    closeCommentDialog()
    groupActions.delete()
    clearCommentGroupID()
  }, [closeCommentDialog, groupActions, clearCommentGroupID])

  return (
    <Modal
      title={
        <Header
          uuid={uuid}
          isResolved={isResolved}
          onDelete={onDelete}
          switchRef={switchRef}
        />
      }
      open={open}
      onOk={onOk}
      onCancel={onCancel}
      closable={false}
      destroyOnClose={true}
    >
      <Content uuid={uuid} comments={comments} inputRef={inputRef} />
    </Modal>
  )
}

export default CommentDialog
