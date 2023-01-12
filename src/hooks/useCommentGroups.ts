import { useState } from 'react'
import { generateUuid, setItem, getItem } from 'src/libraries'
import { storageKeys } from 'src/settings'

const { COMMENT_GROUPS } = storageKeys
export const useCommentGroups = () => {
  const initialValue = getItem(COMMENT_GROUPS, true) || {}
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
      setItem(COMMENT_GROUPS, newCommentGroups)
    },
    update({
      isResolved,
      comment,
    }: {
      isResolved?: boolean
      comment?: Phase.Comment
    }) {
      const newCommentGroups = { ...commentGroups }

      if (typeof isResolved !== 'undefined') {
        newCommentGroups[this.commentGroupID].isResolved = isResolved
      }

      if (comment) {
        newCommentGroups[this.commentGroupID].comments.push(comment)
      }

      setCommentGroups(newCommentGroups)
      setItem(COMMENT_GROUPS, newCommentGroups)
    },
    delete() {
      const newCommentGroups = { ...commentGroups }
      delete newCommentGroups[this.commentGroupID]
      setCommentGroups(newCommentGroups)
      setItem(COMMENT_GROUPS, newCommentGroups)
    },
  }

  return { commentGroups, groupActions }
}
