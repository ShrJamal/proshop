import Header from "./components/Header";
import Footer from "./components/Footer";
import { Container } from "react-bootstrap";
import HomeScreen from "./pages/home";
import { BrowserRouter, Route } from "react-router-dom";
import ProductPage from "./pages/product";
export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <main>
        <Container>
          <Route path="/" component={HomeScreen} exact />
          <Route path="/product/:id" component={ProductPage} />
        </Container>
      </main>
      <Footer />
    </BrowserRouter>
  );
}
