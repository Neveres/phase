import { useState, useCallback } from 'react'

export const useComment = () => {
  const [comments, setComments] = useState([] as Phase.Comment[])

  const addComment = useCallback(
    (comment: Phase.Comment) => {
      setComments([...comments, comment])
    },
    [comments],
  )

  return { comments, addComment }
}
