/** @jsxImportSource @emotion/react */
import React, { useState, useCallback } from 'react'
import { Input, InputRef } from 'antd'
import { previousCommentsContainer } from './styles'

interface ICommentDialog {
  uuid: string
  comments: Phase.Comment[]
  inputRef: React.Ref<InputRef>
}

const CommentDialogContent: React.FC<ICommentDialog> = ({
  uuid,
  comments,
  inputRef,
}) => {
  const [message, setMessage] = useState('')

  const onChangeMessage = useCallback(
    ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => {
      setMessage(value)
    },
    [],
  )

  return (
    <>
      {uuid && (
        <div css={previousCommentsContainer}>
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
        ref={inputRef}
      />
    </>
  )
}

export default CommentDialogContent
