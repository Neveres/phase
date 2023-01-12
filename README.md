# Phase UI Frontend Test

> This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

Tech stacks: [React](https://reactjs.org/), [TypeScript](https://www.typescriptlang.org/), [ESLint](https://eslint.org/), [Ant Design](https://ant.design/), [Emotion](https://emotion.sh/docs/introduction), [PixiJS](https://pixijs.com/) and [ReactPixi](https://reactpixi.org/)

## Table of Contents

- [Requirements](#requirements)
- [Step to launch](#step-to-launch)

<a name="requirements"></a>

## Requirements

### A page with canvas (can use any graphics libraries like PIXI to implement)

- [x] Display a static image on the canvas
- [x] [Bonus] Canvas can zoom in/out and pan around (Note: Not support zoom)
- [x] [Bonus] Display more than one image

### Start a comment thread anywhere in the canvas

- [x] Clicking anywhere on the image displayed in the canvas should add a new
      comment marker to the canvas and open the comment dialog
- [x] Comment markers should exist in the canvas and retain the position relative to
      the displayed image (independent of the pan and zoom)
- [ ] [Bonus] If comments are placed on a particular image they should be attached to
      that image, so that if the image to be moved or removed all comments placed on
      it should move with it.

### Comment dialog:

- [x] Should be implemented outside of the canvas in React.
- [x] Should not change scale if the canvas is zoomed in or zoomed out.
- [x] Should have a thread of comments and a field to add a new comment.
- [x] Can be closed
- [x] Should have a way to resolve the thread. If the thread is resolved, the
      corresponding marker on the canvas should be deleted as well.
- [x] [Bonus] have ability for multiple users to leave comments in any thread (user
      authentication is not required)

### Comments:

- [x] Should display it’s content
- [x] Display the time it was posted at
- [x] Display the username who wrote the comment

<a name="step-to-launch"></a>

## Step to launch

```bash
$ yarn start
```

Navigate to http://localhost:3000, and you should now see app
