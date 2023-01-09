declare module '*.json' {
  const value: IObject
  export default value
}

declare module '*.svg' {
  const content: any
  export default content
}

declare module '*.png' {
  const content: any
  export default content
}

declare module '*.jpg' {
  const content: any
  export default content
}

declare interface IObject {
  [index: string]: any
}
