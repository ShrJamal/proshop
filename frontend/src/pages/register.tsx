import React, { FormEvent, useState, useEffect } from 'react';
import { useUserStore } from '../store/user';
import FormContainer from '../components/FormContainer';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { Link, useLocation, useHistory } from 'react-router-dom';
import Loader from '../components/Loader';
import Message from '../components/Message';

export default function RegisterPage() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { registerUser, user } = useUserStore();

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!username || !email || !password) {
      setError('Invalid Form Data');
    } else if (password !== confirmPassword) {
      setError('Passwords do not match');
    } else {
      setLoading(true);
      setError(await registerUser(username, email, password));
      setLoading(false);
    }
  }
  const search = useLocation().search;
  const redirect = search ? search.split('=')[1] : '/';
  const history = useHistory();

  useEffect(() => {
    if (user) {
      history.push(redirect);
    }
  }, [user, redirect, history]);
  return (
    <FormContainer>
      <br />
      {loading && <Loader />}
      {error && <Message variant="danger">{error}</Message>}
      <h1>Sign In</h1>
      <br />
      <Form onSubmit={onSubmit}>
        <Form.Group controlId="email">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="email">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="confirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </Form.Group>
        <Button type="submit" variant="primary">
          Sign In
        </Button>
      </Form>
      <Row className="py-3">
        <Col>
          Have an account?{' '}
          <Link to={`/login${redirect ? `?redirect=${redirect}` : ''}`}>
            Login
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
}
