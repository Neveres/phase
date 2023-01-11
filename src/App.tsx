/** @jsxImportSource @emotion/react */
import React, { useState, useCallback, useMemo } from 'react'
import { Modal, Input } from 'antd'
import { ReactPixiStage, CommentEntries } from 'src/components'
import { useCommentGroups } from 'src/hooks'
import { GlobalCss, commentsContainer } from './GlobalCss'

const DEFAULT_VALUE_OF_INPUT = ''
const DEFAULT_VALUE_OF_ID = ''
const App = () => {
  const [coordinate, setCoordinate] = useState([] as number[])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [name, setName] = useState(DEFAULT_VALUE_OF_INPUT)
  const [message, setMessage] = useState(DEFAULT_VALUE_OF_INPUT)
  const [commentGroupID, setCommentGroupID] = useState(DEFAULT_VALUE_OF_ID)

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

  const setCommentGroupIDAndOpenModal = useCallback(
    (newCommentGroupID: string) => {
      openModal()
      setCommentGroupID(newCommentGroupID)
    },
    [openModal],
  )

  const clearMessage = useCallback(() => {
    setMessage(DEFAULT_VALUE_OF_INPUT)
  }, [])

  const clearCommentGroupID = useCallback(() => {
    setCommentGroupID(DEFAULT_VALUE_OF_ID)
  }, [])

  const onOk = useCallback(() => {
    closeModal()

    if (message) {
      addComment(commentGroupID, coordinate, {
        name,
        message,
        postTime: new Date().toLocaleString('en-US', {
          timeZone: 'Asia/Taipei',
        }),
      })
      clearMessage()
    }

    clearCommentGroupID()
  }, [
    addComment,
    clearCommentGroupID,
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
    clearCommentGroupID()
  }, [clearCommentGroupID, clearMessage, closeModal])

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

  const ModalContent = useMemo(
    () => (
      <>
        {commentGroupID && (
          <div css={commentsContainer}>
            {commentGroups[commentGroupID].comments.map(
              ({ name, message, postTime }) => (
                <div key={`${name}-${message}-${postTime}`}>
                  <div className="comment-header">
                    <div className="comment-name">{name}</div>
                    <div className="comment-post-time">{postTime}</div>
                  </div>
                  <div className="comment-message">{message}</div>
                </div>
              ),
            )}
          </div>
        )}
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
    ),
    [
      commentGroupID,
      commentGroups,
      message,
      name,
      onChangeMessage,
      onChangeName,
    ],
  )

  return (
    <>
      <CommentEntries
        commentGroups={commentGroups}
        setCommentGroupIDAndOpenModal={setCommentGroupIDAndOpenModal}
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

      <GlobalCss />
    </>
  )
}

export default App
