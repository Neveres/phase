/** @jsxImportSource @emotion/react */
import React, { useState, useCallback, useMemo } from 'react'
import { Dropdown, Switch } from 'antd'
import { DeleteOutlined } from '@ant-design/icons'
import { headerContainer } from './styles'

interface ICommentDialogHeader {
  uuid: string
  isResolved: boolean
  onDelete: () => void
  switchRef: React.MutableRefObject<HTMLElement>
}

const CommentDialogHeader: React.FC<ICommentDialogHeader> = ({
  uuid,
  isResolved = false,
  onDelete,
  switchRef,
}) => {
  const [isResolvedOn, setResolvedStatus] = useState(isResolved)

  const onResolvedChange = useCallback((checked: boolean) => {
    setResolvedStatus(checked)
  }, [])

  const items = useMemo(
    () => [
      {
        key: '1',
        label: (
          <div onClick={onDelete}>
            <DeleteOutlined style={{ marginRight: '5px' }} />
            Delete
          </div>
        ),
      },
    ],
    [onDelete],
  )

  if (uuid) {
    return (
      <div css={headerContainer}>
        <div>
          <Switch
            checked={isResolvedOn}
            onChange={onResolvedChange}
            data-testid="resolved-switch"
            ref={switchRef}
          />
          <span>Resolved</span>
        </div>
        <Dropdown menu={{ items }}>
          <div
            onClick={
              /* istanbul ignore next */ (event) => event.preventDefault()
            }
          >
            Options
          </div>
        </Dropdown>
      </div>
    )
  } else {
    return null
  }
}

export default CommentDialogHeader
