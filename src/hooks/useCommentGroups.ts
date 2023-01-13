import { useState } from 'react'
import { generateUuid } from 'src/libraries'
import { storageKeys } from 'src/settings'
import { useStorage } from 'src/hooks'

export const useCommentGroups = () => {
  const { get, set } = useStorage(storageKeys.COMMENT_GROUPS, true)
  const initialValue = get() || {}
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
      set(newCommentGroups)
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
      set(newCommentGroups)
    },
    delete() {
      const newCommentGroups = { ...commentGroups }
      delete newCommentGroups[this.commentGroupID]
      setCommentGroups(newCommentGroups)
      set(newCommentGroups)
    },
  }

  return { commentGroups, groupActions }
}
