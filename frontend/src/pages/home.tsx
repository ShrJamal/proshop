import React, { useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
import ProductItem from '../components/Product';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { useProductsStore } from '../store/product';

export default function HomeScreen() {
  const { loading, error, productsList, fetchProductList } = useProductsStore();
  useEffect(() => {
    fetchProductList();
  }, [fetchProductList]);
  return (
    <>
      <h1 className="mt-2">Latest Products</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          <p>{error}</p>
        </Message>
      ) : (
        <Row>
          {productsList.map((p) => (
            <Col key={`${p._id}`} sm={12} md={6} lg={4} xl={3}>
              <ProductItem product={p} />
            </Col>
          ))}
        </Row>
      )}
    </>
  );
}
