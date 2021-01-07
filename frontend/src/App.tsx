import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import { Container } from 'react-bootstrap';
import HomePage from './pages/home';
import { BrowserRouter, Route } from 'react-router-dom';
import ProductPage from './pages/product';
import CartPage from './pages/cart';
import LoginPage from './pages/login';

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <main>
        <Container fluid="md">
          <Route path="/" component={HomePage} exact />
          <Route path="/login" component={LoginPage} />
          <Route path="/product/:id" component={ProductPage} />
          <Route path="/cart/" exact component={CartPage} />
          <Route path="/cart/:productId" component={CartPage} />
        </Container>
      </main>
      <Footer />
    </BrowserRouter>
  );
}
