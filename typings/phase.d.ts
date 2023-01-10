export = Phase
export as namespace Phase

declare namespace Phase {
  interface Comment {
    name: string
    message: string
    coordinate: number[]
  }
}
