import Header from "./components/Header";
import Footer from "./components/Footer";
import { Container } from "react-bootstrap";

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Container>
          <h4>Welcome to Proshop</h4>
        </Container>
      </main>
      <Footer />
    </>
  );
}
