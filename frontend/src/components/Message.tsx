import React from 'react'
import { Alert } from 'react-bootstrap'
import { Variant } from 'react-bootstrap/esm/types'

type MessageType = {
  variant?: Variant
  children: string | JSX.Element | JSX.Element[]
}

export default function Message({ variant, children }: MessageType) {
  return <Alert variant={variant ?? 'info'}>{children}</Alert>
}
