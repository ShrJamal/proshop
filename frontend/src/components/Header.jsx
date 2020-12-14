import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";

export default function Header() {
  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="sm" collapseOnSelect>
        <Container>
          <Navbar.Brand href="#home">Proshop</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="#home">
                <i className="fas fa-shopping-cart mr-1" />
                Cart
              </Nav.Link>
              <Nav.Link href="#link">
              <i className="fas fa-user mr-1"/>
              Signup</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}
