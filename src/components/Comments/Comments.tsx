/** @jsxImportSource @emotion/react */
import React from 'react'
import { CommentOutlined } from '@ant-design/icons'
import { commentsContainer } from './styles'

interface IComments {
  commentGroups: Phase.CommentGroups
  setCommentGroupIDAndOpenModal: (newCommentGroupID: string) => void
}

const Comments: React.FC<IComments> = ({
  commentGroups,
  setCommentGroupIDAndOpenModal,
}) => {
  return (
    <div css={commentsContainer}>
      {Object.values(commentGroups).map(({ uuid, coordinate }) => (
        <CommentOutlined
          key={uuid}
          onClick={setCommentGroupIDAndOpenModal.bind(null, uuid)}
          style={{
            left: `${coordinate[0]}px`,
            top: `${coordinate[1]}px`,
          }}
        />
      ))}
    </div>
  )
}

export default Comments
