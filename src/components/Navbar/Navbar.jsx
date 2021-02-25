import React, { Component } from "react";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import "./Navbar.css";
import 'bootstrap/dist/css/bootstrap.css';

class NavbarMenu extends Component {
  render() {
    return (
      <div>
        <Navbar expand="lg" bg="dark" variant="dark">
          <Navbar.Brand href="#">Movie App</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto"></Nav>
            <Nav>
              <Nav.Link href="#">Hello User</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }
}

export default NavbarMenu;
