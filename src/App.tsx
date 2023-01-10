import React, { useState, useCallback } from 'react'
import { Modal } from 'antd'
import { ReactPixiStage } from 'src/components'

const App = () => {
  const [coordinate, setCoordinate] = useState([] as number[])
  const [isModalOpen, setIsModalOpen] = useState(false)

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
  console.log(coordinate)
  return (
    <>
      <ReactPixiStage setCoordinate={openModalAndSetCoordinate} />
      <Modal
        title="Add comments"
        open={isModalOpen}
        onOk={closeModal}
        onCancel={closeModal}
      >
        <p>some contents...</p>
        <p>some contents...</p>
        <p>some contents...</p>
      </Modal>
    </>
  )
}

export default App
