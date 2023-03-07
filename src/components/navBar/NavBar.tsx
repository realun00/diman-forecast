import React from "react";
import { Container, Navbar } from "react-bootstrap";

import { NavLink } from "react-router-dom";
import SearchForm from "./SearchForm";

const NavBar = () => {
  return (
    <Navbar expand="lg" bg="light" variant="light" id="df-navbar">
      <Container fluid="xxl">
        <Navbar.Brand as={NavLink} to="/">
          Diman Forecast
        </Navbar.Brand>
        <SearchForm />
      </Container>
    </Navbar>
  );
};

export default NavBar;
