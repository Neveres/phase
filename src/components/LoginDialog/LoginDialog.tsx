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
  const [form] = Form.useForm()

  const onFinish = useCallback(
    ({ username }: { username: string }) => {
      console.log(form.getFieldValue('Username'))
      setItem(USERNAME, username)
      // form.setFieldsValue({ username: '', password: '' })
      console.log(form.getFieldValue('username'))
      closeLoginDialog()
    },
    [closeLoginDialog, form],
  )

  return (
    <Modal
      title="Login with your account"
      open={open}
      closable={false}
      okText="Log In"
      footer={null}
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
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password />
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
