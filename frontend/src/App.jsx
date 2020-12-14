import Header from "./components/Header";
import Footer from "./components/Footer";
import { Button } from "react-bootstrap";

export default function App() {
  return (
    <>
      <Header />
      <main>
        <h4>Welcome to Proshop</h4>
        <Button>Button</Button>
      </main>
      <Footer />
    </>
  );
}
