/** @jsxImportSource @emotion/react */
import React, { useState, useCallback, useMemo } from 'react'
import { Modal, Input, Dropdown, Switch } from 'antd'
import { DeleteOutlined } from '@ant-design/icons'
import { commentsContainer, headerContainer } from './styles'

interface ICommentDialog {
  open: boolean
  commentGroup: Phase.CommentGroup
  addComment: (comment: Phase.Comment) => void
  closeDialog: () => void
  clearCommentGroupID: () => void
}

const DEFAULT_VALUE_OF_INPUT = ''
const CommentDialog: React.FC<ICommentDialog> = ({
  open,
  commentGroup = { uuid: '', comments: [] },
  addComment,
  closeDialog,
  clearCommentGroupID,
}) => {
  const [name, setName] = useState(DEFAULT_VALUE_OF_INPUT)
  const [message, setMessage] = useState(DEFAULT_VALUE_OF_INPUT)
  const { uuid, comments } = commentGroup

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

    if (message) {
      addComment({
        name,
        message,
        postTime: new Date().toLocaleString('en-US', {
          timeZone: 'Asia/Taipei',
        }),
      })
      clearMessage()
    }

    clearCommentGroupID()
  }, [
    addComment,
    clearCommentGroupID,
    clearMessage,
    closeDialog,
    message,
    name,
  ])

  const onCancel = useCallback(() => {
    closeDialog()
    clearMessage()
    clearCommentGroupID()
  }, [clearCommentGroupID, clearMessage, closeDialog])

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

  const Header = useMemo(() => {
    const items = [
      {
        key: '1',
        label: (
          <div>
            <DeleteOutlined style={{ marginRight: '5px' }} />
            Delete
          </div>
        ),
      },
    ]

    if (uuid) {
      return (
        <div css={headerContainer}>
          <div>
            <Switch />
            <span>Resolved</span>
          </div>
          <Dropdown menu={{ items }}>
            <div onClick={(e) => e.preventDefault()}>Options</div>
          </Dropdown>
        </div>
      )
    } else {
      return 'Add comments'
    }
  }, [uuid])

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
