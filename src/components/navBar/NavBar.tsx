import React from "react";
import { Button, Container, Form, Navbar } from "react-bootstrap";

import { NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <Navbar expand="lg" bg="light" variant="light" id="df-navbar">
      <Container fluid="xxl">
        <Navbar.Brand as={NavLink} to="/">
          Diman Forecast
        </Navbar.Brand>

        <Form className="d-flex">
          <Form.Control type="search" placeholder="Search" className="me-2" aria-label="Search" />
          <Button variant="outline-success">Search</Button>
        </Form>
      </Container>
    </Navbar>
  );
};

export default NavBar;
