/** @jsxImportSource @emotion/react */
import React from 'react'
import { Layout, Button } from 'antd'
import { headerContainer } from './styles'

const { Header } = Layout

interface IAppHeader {
  openLoginDialog: () => void
}

const AppHeader: React.FC<IAppHeader> = ({ openLoginDialog }) => {
  return (
    <Header css={headerContainer}>
      <Button onClick={openLoginDialog}>Logout</Button>
    </Header>
  )
}

export default AppHeader
