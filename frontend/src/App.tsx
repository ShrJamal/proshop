import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import { Container } from 'react-bootstrap';
import HomeScreen from './pages/home';
import { BrowserRouter, Route } from 'react-router-dom';
import ProductPage from './pages/product';
import CartPage from './pages/cart';

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <main>
        <Container fluid="md">
          <Route path="/" component={HomeScreen} exact />
          <Route path="/product/:id" component={ProductPage} />
          <Route path="/cart/" exact component={CartPage} />
          <Route path="/cart/:productId" component={CartPage} />
        </Container>
      </main>
      <Footer />
    </BrowserRouter>
  );
}
