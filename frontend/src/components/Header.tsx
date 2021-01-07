import React from 'react';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useUserStore } from '../store/user';

export default function Header() {
  const { user, logout } = useUserStore((s) => ({
    user: s.user,
    logout: s.logout,
  }));
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
              {user ? (
                <NavDropdown title={user.username} id="username">
                  <LinkContainer to="/profile">
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to="/login">
                  <Nav.Link>
                    <i className="fas fa-user mr-1" />
                    Sign In
                  </Nav.Link>
                </LinkContainer>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}
