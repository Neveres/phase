import React, { useState, useCallback, useMemo } from 'react'
import { Modal, Input } from 'antd'
import { ReactPixiStage, Comments } from 'src/components'
import { useCommentGroups } from 'src/hooks'

const DEFAULT_VALUE_OF_INPUT = ''
const App = () => {
  const [coordinate, setCoordinate] = useState([] as number[])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [name, setName] = useState(DEFAULT_VALUE_OF_INPUT)
  const [message, setMessage] = useState(DEFAULT_VALUE_OF_INPUT)
  const [commentGroupID, setCommentGroupID] = useState('')

  const { commentGroups, addComment } = useCommentGroups()

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
    setMessage(DEFAULT_VALUE_OF_INPUT)
  }, [])

  const onOk = useCallback(() => {
    closeModal()

    if (message) {
      addComment(commentGroupID, coordinate, {
        name,
        message,
        postTime: new Date().toString(),
      })
      clearMessage()
    }
  }, [
    addComment,
    clearMessage,
    closeModal,
    commentGroupID,
    coordinate,
    message,
    name,
  ])

  const onCancel = useCallback(() => {
    closeModal()
    clearMessage()
  }, [clearMessage, closeModal])

  const onChangeName = useCallback(
    ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => {
      setName(value)
    },
    [],
  )

  const onChangeMessage = useCallback(
    ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => {
      setMessage(value)
    },
    [],
  )

  const ModalContent = useMemo(() => {
    if (commentGroupID) {
    } else {
      return (
        <>
          <Input
            value={name}
            onChange={onChangeName}
            placeholder="Name"
            style={{ marginBottom: '5px' }}
          />
          <Input
            value={message}
            onChange={onChangeMessage}
            placeholder="Message"
          />
        </>
      )
    }
  }, [commentGroupID, message, name, onChangeMessage, onChangeName])

  return (
    <>
      <Comments
        commentGroups={commentGroups}
        setCommentGroupID={setCommentGroupID}
      />
      <ReactPixiStage setCoordinate={openModalAndSetCoordinate} />
      <Modal
        title="Add comments"
        open={isModalOpen}
        onOk={onOk}
        onCancel={onCancel}
      >
        {ModalContent}
      </Modal>
    </>
  )
}

export default App
