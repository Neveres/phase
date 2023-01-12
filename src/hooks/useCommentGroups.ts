import { useState } from 'react'
import { generateUuid, setItem, getItem } from 'src/libraries'

const KEY_OF_COMMENT_GROUPS = 'commentGroups'
export const useCommentGroups = () => {
  const initialValue = getItem(KEY_OF_COMMENT_GROUPS, true) || {}
  const [commentGroups, setCommentGroups] = useState(
    initialValue as Phase.CommentGroups,
  )

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
      setItem(KEY_OF_COMMENT_GROUPS, newCommentGroups)
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
      setItem(KEY_OF_COMMENT_GROUPS, newCommentGroups)
    },
    delete() {
      const newCommentGroups = { ...commentGroups }
      delete newCommentGroups[this.commentGroupID]
      setCommentGroups(newCommentGroups)
      setItem(KEY_OF_COMMENT_GROUPS, newCommentGroups)
    },
  }

  return { commentGroups, groupActions }
}
