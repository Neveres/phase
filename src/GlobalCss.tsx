import React from 'react'
import { css, Global } from '@emotion/react'

export const GlobalCss = () => (
  <Global
    styles={css`
      body {
        overflow: hidden;
      }
    `}
  />
)

export const commentsContainer = css`
  .comment-header {
    display: flex;
    justify-content: space-between;

    font-size: 16px;

    .comment-name {
      font-weight: 700;
    }
  }

  .comment-message {
    margin-bottom: 5px;
  }

  margin-bottom: 15px;
  border-bottom: 1px solid #f0f0f0;
`
