import React from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import { Container } from 'react-bootstrap'
import HomePage from './pages/home'
import { BrowserRouter, Route } from 'react-router-dom'
import ProductPage from './pages/product'
import CartPage from './pages/cart'
import LoginPage from './pages/login'
import RegisterPage from './pages/register'

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <main>
        <Container fluid="md">
          <Route path="/login" component={LoginPage} />
          <Route path="/register" component={RegisterPage} />
          <Route path="/product/:id" component={ProductPage} />
          <Route path="/cart/" exact component={CartPage} />
          <Route path="/cart/:productId" component={CartPage} />
          <Route path="/" component={HomePage} exact />
        </Container>
      </main>
      <Footer />
    </BrowserRouter>
  )
}
