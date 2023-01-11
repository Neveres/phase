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
