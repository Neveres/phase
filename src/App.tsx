import React, { useState, useCallback } from 'react'
import { Modal, Input } from 'antd'
import { ReactPixiStage } from 'src/components'
import { useComment } from 'src/hooks'

const USER_NAME = 'user'
const App = () => {
  const [coordinate, setCoordinate] = useState([] as number[])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [message, setMessage] = useState('')
  const { comments, addComment } = useComment()

  const openModal = useCallback(() => {
    setIsModalOpen(true)
  }, [])

  const closeModal = useCallback(() => {
    setIsModalOpen(false)
  }, [])

  const openModalAndSetCoordinate = useCallback(
    (newCoordinate: number[]) => {
      openModal()
      setCoordinate(newCoordinate)
    },
    [openModal],
  )

  const clearMessage = useCallback(() => {
    setMessage('')
  }, [])

  const onOk = useCallback(() => {
    closeModal()

    if (message) {
      addComment({
        name: USER_NAME,
        message,
        coordinate,
      })
      clearMessage()
    }
  }, [addComment, clearMessage, closeModal, coordinate, message])

  const onCancel = useCallback(() => {
    closeModal()
    clearMessage()
  }, [clearMessage, closeModal])

  const onChangeMessage = useCallback(
    ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => {
      setMessage(value)
    },
    [],
  )

  return (
    <>
      <ReactPixiStage setCoordinate={openModalAndSetCoordinate} />
      <Modal
        title="Add comments"
        open={isModalOpen}
        onOk={onOk}
        onCancel={onCancel}
      >
        <Input value={message} onChange={onChangeMessage} />
      </Modal>
    </>
  )
}

export default App
