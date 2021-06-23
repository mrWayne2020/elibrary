import React from 'react';
import { Navbar, Container, Nav, NavDropdown, Form, FormControl, Button } from 'react-bootstrap';

const NavBar = () => {
    return (
        <div>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand href="/home">Online Library</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav" className="d-flex justify-content-between">
                        <Nav className="me-auto">
                            <Nav.Link href="/membership">Membership</Nav.Link>
                            <NavDropdown title="My Account" id="collasible-nav-dropdown">
                                <NavDropdown.Item href="#">Member</NavDropdown.Item>
                                <NavDropdown.Item href="#">Admin</NavDropdown.Item>
                            </NavDropdown>
                            <Nav.Link href="/about">About Us</Nav.Link>
                        </Nav>
                        <Form className="d-flex">
                            <FormControl
                                type="search"
                                placeholder="Search"
                                className="mr-2"
                                aria-label="Search"
                            />
                            <Button variant="outline-success">Search</Button>
                        </Form>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    )
}

export default NavBar
