import React from 'react';
import { Link } from 'react-router-dom';
import { useCartStore } from '../store/cart';
import { Col, ListGroup, Row, Image, Form, Button } from 'react-bootstrap';
import Message from '../components/Message';

export default function CartPage() {
  const { cartItems, addToCart, removeItem } = useCartStore();

  return (
    <Row>
      <Col md={8}>
        <h1>Shopping Cart</h1>
        {!cartItems.length ? (
          <Message>
            <p>
              You Cart is empty <Link to="/">Go Back</Link>
            </p>
          </Message>
        ) : (
          <ListGroup variant="flush">
            {cartItems.map(({ product, qty }) => (
              <ListGroup.Item key={product._id}>
                <Row className="align-items-center">
                  <Col xs={3} className="pr-2">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fluid
                      rounded
                    />
                  </Col>
                  <Col className="px-0" xs={4}>
                    <Link to={'/product/' + product._id}>{product.name}</Link>
                  </Col>
                  <Col className="px-0" xs={1}>
                    {product.price}
                  </Col>
                  <Col xs={3}>
                    <Form.Control
                      as="select"
                      value={qty}
                      onChange={(e) =>
                        addToCart(product, Number(e.target.value))
                      }
                    >
                      {[...Array(product.countInStock).keys()].map((x) => (
                        <option key={x}>{x + 1}</option>
                      ))}
                    </Form.Control>
                  </Col>
                  <Col xs={1}>
                    <Button
                      className="px-0"
                      type="button"
                      variant="light"
                      onClick={() => removeItem(product._id)}
                    >
                      <i className="fas fa-trash" />
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>
      <Col md={4}></Col>
    </Row>
  );
}
