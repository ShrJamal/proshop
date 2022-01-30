import React, { FormEvent, useState, useEffect } from 'react'
import { useUserStore } from '../store/user'
import FormContainer from '../components/FormContainer'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { Link, useLocation, useHistory } from 'react-router-dom'
import Loader from '../components/Loader'
import Message from '../components/Message'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { loginUser, user } = useUserStore()

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(await loginUser(email, password))
    setLoading(false)
  }
  const search = useLocation().search
  const redirect = search ? search.split('=')[1] : '/'
  const history = useHistory()

  useEffect(() => {
    if (user) {
      history.push(redirect)
    }
  }, [user, redirect, history])
  return (
    <FormContainer>
      <br />
      {loading && <Loader />}
      {error && <Message variant="danger">{error}</Message>}
      <h1>Sign In</h1>
      <br />
      <Form onSubmit={onSubmit}>
        <Form.Group controlId="email">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>{' '}
        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Button type="submit" variant="primary">
          Sign In
        </Button>
      </Form>
      <Row className="py-3">
        <Col>
          New Customer?{' '}
          <Link to={`/register${redirect ? `?redirect=${redirect}` : ''}`}>
            Register
          </Link>
        </Col>
      </Row>
    </FormContainer>
  )
}
