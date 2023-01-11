/** @jsxImportSource @emotion/react */
import React, { useState, useCallback, useMemo } from 'react'
import { Modal, Input, Dropdown, Switch } from 'antd'
import { DeleteOutlined } from '@ant-design/icons'
import { useCommentGroups } from 'src/hooks'
import { commentsContainer, headerContainer } from './styles'

type CommentGroups = ReturnType<typeof useCommentGroups>

interface ICommentDialog {
  open: boolean
  commentGroup: Phase.CommentGroup
  closeDialog: () => void
  clearCommentGroupID: () => void
  groupActions: CommentGroups['groupActions']
}

const DEFAULT_VALUE_OF_INPUT = ''
const CommentDialog: React.FC<ICommentDialog> = ({
  open,
  commentGroup = { uuid: '', comments: [], isResolved: false },
  groupActions,
  closeDialog,
  clearCommentGroupID,
}) => {
  const [name, setName] = useState(DEFAULT_VALUE_OF_INPUT)
  const [message, setMessage] = useState(DEFAULT_VALUE_OF_INPUT)
  const { uuid, comments, isResolved } = commentGroup
  const [isResolvedOn, setResolvedStatus] = useState(isResolved)

  const onChangeName = useCallback(
    ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => {
      setName(value)
    },
    [],
  )

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
    closeDialog()

    const comment = message
      ? {
          name,
          message,
          postTime: new Date().toLocaleString('en-US', {
            timeZone: 'Asia/Taipei',
          }),
        }
      : undefined

    if (uuid) {
      if (comment || isResolved !== isResolvedOn) {
        groupActions.update({
          isResolved: isResolvedOn,
          comment,
        })
      }
    } else {
      groupActions.create(comment as Phase.Comment)
    }

    if (comment) {
      clearMessage()
    }

    clearCommentGroupID()
  }, [
    closeDialog,
    message,
    name,
    uuid,
    clearCommentGroupID,
    isResolved,
    isResolvedOn,
    groupActions,
    clearMessage,
  ])

  const onCancel = useCallback(() => {
    closeDialog()
    clearMessage()
    clearCommentGroupID()
  }, [clearCommentGroupID, clearMessage, closeDialog])

  const onResolvedChange = useCallback((checked: boolean) => {
    setResolvedStatus(checked)
  }, [])

  const onDelete = useCallback(() => {
    closeDialog()
    groupActions.delete()
  }, [groupActions, closeDialog])

  const ModalContent = useMemo(
    () => (
      <>
        {uuid && (
          <div css={commentsContainer}>
            {comments.map(({ name, message, postTime }) => (
              <div key={`${name}-${message}-${postTime}`}>
                <div className="comment-header">
                  <div className="comment-name">{name}</div>
                  <div className="comment-post-time">{postTime}</div>
                </div>
                <div className="comment-message">{message}</div>
              </div>
            ))}
          </div>
        )}
        <Input
          value={name}
          onChange={onChangeName}
          placeholder="Name"
          style={{ marginBottom: '5px' }}
        />
        <Input
          value={message}
          onChange={onChangeMessage}
          placeholder="Message"
        />
      </>
    ),
    [comments, message, name, onChangeMessage, onChangeName, uuid],
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
            <Switch checked={isResolvedOn} onChange={onResolvedChange} />
            <span>Resolved</span>
          </div>
          <Dropdown menu={{ items }}>
            <div onClick={(event) => event.preventDefault()}>Options</div>
          </Dropdown>
        </div>
      )
    } else {
      return 'Add comments'
    }
  }, [isResolvedOn, items, onResolvedChange, uuid])

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
