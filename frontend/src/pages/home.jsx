import React, { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import Product from "../components/Product";
import { useDispatch, useSelector } from "react-redux";
import { productListAction } from "../store/actions/products";
import Loader from "../components/Loader";
import Message from "../components/Message";

export default function HomeScreen() {
  const dispatch = useDispatch();
  const { loading, error, products } = useSelector((s) => s.productList);
  useEffect(() => {
    dispatch(productListAction());
  }, [dispatch]);
  return (
    <>
      <h1 className="mt-2">Latest Products</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Row>
          {products.map((p) => (
            <Col key={p._id} sm={12} md={6} lg={4} xl={3}>
              <Product product={p} />
            </Col>
          ))}
        </Row>
      )}
    </>
  );
}
