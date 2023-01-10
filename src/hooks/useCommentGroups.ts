import { useState, useCallback } from 'react'
import { generateUuid } from 'src/libraries'

export const useCommentGroups = () => {
  const [commentGroups, setCommentGroups] = useState({} as Phase.CommentGroups)

  const addComment = useCallback(
    (uuid: string, coordinate: number[], comment: Phase.Comment) => {
      const newCommentGroups = { ...commentGroups }

      if (uuid) {
        newCommentGroups[uuid].comments.push(comment)
      } else {
        uuid = generateUuid()
        newCommentGroups[uuid] = {
          comments: [comment],
          isResolved: false,
          coordinate,
          uuid,
        }
      }

      setCommentGroups(newCommentGroups)
    },
    [commentGroups],
  )

  return { commentGroups, addComment }
}
