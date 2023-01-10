import React from 'react'
import { CommentOutlined } from '@ant-design/icons'

interface IComments {
  commentGroups: Phase.CommentGroups
  setCommentGroupID: React.Dispatch<React.SetStateAction<string>>
}

const Comments: React.FC<IComments> = ({
  commentGroups,
  setCommentGroupID,
}) => {
  return (
    <div>
      {Object.values(commentGroups).map(({ uuid, coordinate }) => (
        <CommentOutlined
          key={uuid}
          onClick={setCommentGroupID.bind(null, uuid)}
          style={{
            position: 'absolute',
            left: `${coordinate[0]}px`,
            top: `${coordinate[1]}px`,
          }}
        />
      ))}
    </div>
  )
}

export default Comments
