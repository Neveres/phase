/** @jsxImportSource @emotion/react */
import React, { useState, useCallback, useMemo } from 'react'
import { Modal, Input, Dropdown, Switch } from 'antd'
import { DeleteOutlined } from '@ant-design/icons'
import { useCommentGroups } from 'src/hooks'
import { getItem } from 'src/libraries'
import { storageKeys } from 'src/settings'
import { commentsContainer, headerContainer } from './styles'

type CommentGroups = ReturnType<typeof useCommentGroups>

interface ICommentDialog {
  open: boolean
  commentGroup?: Phase.CommentGroup
  closeCommentDialog: () => void
  clearCommentGroupID: () => void
  groupActions: CommentGroups['groupActions']
}

const DEFAULT_VALUE_OF_INPUT = ''
const CommentDialog: React.FC<ICommentDialog> = ({
  open,
  commentGroup = { uuid: '', comments: [], isResolved: false },
  groupActions,
  closeCommentDialog,
  clearCommentGroupID,
}) => {
  const [message, setMessage] = useState(DEFAULT_VALUE_OF_INPUT)
  const { uuid, comments, isResolved } = commentGroup

  const onChangeMessage = useCallback(
    ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => {
      setMessage(value)
    },
    [],
  )

  const clearMessage = useCallback(() => {
    setMessage(DEFAULT_VALUE_OF_INPUT)
  }, [])

  const onOk = useCallback(() => {
    closeCommentDialog()

    if (isResolved) {
      groupActions.delete()
    } else {
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

        clearMessage()
      }
    }

    clearCommentGroupID()
  }, [
    closeCommentDialog,
    isResolved,
    clearCommentGroupID,
    groupActions,
    message,
    uuid,
    clearMessage,
  ])

  const onCancel = useCallback(() => {
    closeCommentDialog()
    if (isResolved) {
      groupActions.update({
        isResolved: false,
      })
    }
    clearMessage()
    clearCommentGroupID()
  }, [
    clearCommentGroupID,
    clearMessage,
    closeCommentDialog,
    groupActions,
    isResolved,
  ])

  const onResolvedChange = useCallback(
    (checked: boolean) => {
      groupActions.update({
        isResolved: checked,
      })
    },
    [groupActions],
  )

  const onDelete = useCallback(() => {
    closeCommentDialog()
    groupActions.delete()
    clearCommentGroupID()
  }, [closeCommentDialog, groupActions, clearCommentGroupID])

  const ModalContent = useMemo(
    () => (
      <>
        {uuid && (
          <div css={commentsContainer}>
            {comments.map(({ name, message, postTime }, index) => (
              <div key={`${name}-${message}-${postTime}`}>
                {comments[index - 1]?.name !== name && (
                  <div className="comment-header">
                    <div className="comment-name">{name}</div>
                    <div className="comment-post-time">{postTime}</div>
                  </div>
                )}
                <div className="comment-message">{message}</div>
              </div>
            ))}
          </div>
        )}
        <Input
          value={message}
          onChange={onChangeMessage}
          placeholder="Leave your comment"
          data-testid="message-input"
        />
      </>
    ),
    [comments, message, onChangeMessage, uuid],
  )

  const items = useMemo(
    () => [
      {
        key: '1',
        label: (
          <div onClick={onDelete}>
            <DeleteOutlined style={{ marginRight: '5px' }} />
            Delete
          </div>
        ),
      },
    ],
    [onDelete],
  )

  const Header = useMemo(() => {
    if (uuid) {
      return (
        <div css={headerContainer}>
          <div>
            <Switch
              checked={isResolved}
              onChange={onResolvedChange}
              data-testid="resolved-switch"
            />
            <span>Resolved</span>
          </div>
          <Dropdown menu={{ items }}>
            <div
              onClick={
                /* istanbul ignore next */ (event) => event.preventDefault()
              }
            >
              Options
            </div>
          </Dropdown>
        </div>
      )
    } else {
      return null
    }
  }, [isResolved, items, onResolvedChange, uuid])

  return (
    <Modal
      title={Header}
      open={open}
      onOk={onOk}
      onCancel={onCancel}
      closable={false}
    >
      {ModalContent}
    </Modal>
  )
}

export default CommentDialog
