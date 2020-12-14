import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

export default function Header() {
  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="sm" collapseOnSelect>
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>Proshop</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              <LinkContainer to="/cart">
                <Nav.Link>
                  <i className="fas fa-shopping-cart mr-1" />
                  Cart
                </Nav.Link>
              </LinkContainer>
              <LinkContainer to="/signup">
                <Nav.Link>
                  <i className="fas fa-user mr-1" />
                  Signup
                </Nav.Link>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}
