import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'

interface Props {
  children: React.ReactNode
}

export default function FormContainer({ children }: Props) {
  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col xs={12} md={6}>
          {children}
        </Col>
      </Row>
    </Container>
  )
}
