export = Phase
export as namespace Phase

declare namespace Phase {
  interface Comment {
    name: string
    message: string
    postTime: string
  }

  interface CommentGroup {
    uuid: string
    comments: Comment[]
    isResolved: boolean
    coordinate: number[]
  }

  interface CommentGroups {
    [index: string]: CommentGroup
  }
}
