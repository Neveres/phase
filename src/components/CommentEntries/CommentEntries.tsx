/** @jsxImportSource @emotion/react */
import React from 'react'
import { CommentOutlined } from '@ant-design/icons'
import { commentsContainer } from './styles'

interface ICommentEntries {
  commentGroups: Phase.CommentGroups
  openCommentEntry: (newCommentGroupID: string) => void
}

const CommentEntries: React.FC<ICommentEntries> = ({
  commentGroups,
  openCommentEntry,
}) => {
  return (
    <div css={commentsContainer}>
      {Object.values(commentGroups).map(({ uuid, coordinate }) => (
        <CommentOutlined
          key={uuid}
          onClick={openCommentEntry.bind(null, uuid)}
          style={{
            left: `${coordinate[0]}px`,
            top: `${coordinate[1]}px`,
          }}
        />
      ))}
    </div>
  )
}

export default CommentEntries
