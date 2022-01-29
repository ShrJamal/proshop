import React from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import { Container } from 'react-bootstrap'
import HomePage from './pages/home'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
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
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/product/:id" element={<ProductPage />} />
            <Route path="/cart/" element={<CartPage />} />
            <Route path="/cart/:productId" element={<CartPage />} />
            <Route path="/" element={<HomePage />} />
          </Routes>
        </Container>
      </main>
      <Footer />
    </BrowserRouter>
  )
}
