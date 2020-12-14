import React, { useState, useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import Product from "../components/Product";
import axios from "axios";

export default function HomeScreen() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    async function fetch() {
      const { data } = await axios.get("/api/products");
      setProducts(data);
      console.log(data);
    }
    fetch();
  }, []);
  return (
    <>
      <h1>Latest Products</h1>
      <Row>
        {products.map((p) => (
          <Col key={p._id} sm={12} md={6} lg={4} xl={3}>
            <Product product={p} />
          </Col>
        ))}
      </Row>
    </>
  );
}
