/** @jsxImportSource @emotion/react */
import React from 'react'
import { Layout } from 'antd'
import { headerContainer } from './styles'

const { Header } = Layout

interface IAppHeader {
  openLoginDialog: () => void
}

const AppHeader: React.FC<IAppHeader> = ({ openLoginDialog }) => {
  return (
    <Header css={headerContainer}>
      <div onClick={openLoginDialog}>Logout</div>
    </Header>
  )
}

export default AppHeader
