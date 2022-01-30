import React from 'react'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Rating from './Rating'
import type { Product } from '../@types/product'

type ProductType = {
  product: Product
}

export default function ProductItem({ product }: ProductType) {
  return (
    <Card className="my-3 p-3 rounded">
      <Link to={'/product/' + product._id}>
        <Card.Img src={product.image} variant="top" />
      </Link>
      <Card.Body className="mx-2">
        <Link to={'/product/' + product._id}>
          <Card.Title>
            <strong> {product.name}</strong>
          </Card.Title>
        </Link>

        <Card.Text as="div">
          <Rating
            value={product.rating}
            text={`${product.numReviews} reviews`}
          />
        </Card.Text>
        <Card.Text as="h3">${product.price}</Card.Text>
      </Card.Body>
    </Card>
  )
}
