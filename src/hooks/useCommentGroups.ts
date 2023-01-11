import { useState } from 'react'
import { generateUuid } from 'src/libraries'

export const useCommentGroups = () => {
  const [commentGroups, setCommentGroups] = useState({} as Phase.CommentGroups)

  const groupActions = {
    commentGroupID: '',
    coordinate: [] as number[],
    create(comment: Phase.Comment) {
      const uuid = generateUuid()
      const newCommentGroups = { ...commentGroups }
      newCommentGroups[uuid] = {
        comments: [comment],
        isResolved: false,
        coordinate: this.coordinate,
        uuid,
      }

      setCommentGroups(newCommentGroups)
    },
    update({
      isResolved,
      comment,
    }: {
      isResolved: boolean
      comment: Phase.Comment | undefined
    }) {
      const newCommentGroups = { ...commentGroups }
      newCommentGroups[this.commentGroupID].isResolved = isResolved
      if (comment) {
        newCommentGroups[this.commentGroupID].comments.push(comment)
      }

      setCommentGroups(newCommentGroups)
    },
    delete() {
      const newCommentGroups = { ...commentGroups }
      delete newCommentGroups[this.commentGroupID]
      setCommentGroups(newCommentGroups)
    },
  }

  return { commentGroups, groupActions }
}
