/** @jsxImportSource @emotion/react */
import React, { useCallback } from 'react'
import { Modal, Input, Button, Form } from 'antd'
import { setItem } from 'src/libraries'
import { storageKeys } from 'src/settings'

const { USERNAME } = storageKeys

interface ILoginDialog {
  open: boolean
  closeLoginDialog: () => void
}

const LoginDialog: React.FC<ILoginDialog> = ({ open, closeLoginDialog }) => {
  const onFinish = useCallback(
    ({ username }: { username: string }) => {
      setItem(USERNAME, username)
      closeLoginDialog()
    },
    [closeLoginDialog],
  )

  return (
    <Modal
      title="Login with your account"
      open={open}
      closable={false}
      okText="Log In"
      footer={null}
      destroyOnClose={true}
    >
      <Form
        name="basic"
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 16 }}
        onFinish={onFinish}
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input data-testid="username-input" />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password data-testid="password-input" />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 10, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Log In
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default LoginDialog
