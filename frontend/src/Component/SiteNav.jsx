import React from 'react'
import { Navbar, Container, Nav } from 'react-bootstrap'

const SiteNav = () => {
  return (
    <Navbar variant="dark" expand="lg" style={{"backgroundColor": "darkslateblue"}}>
        <Container>
            <Navbar.Brand href="/">Local Buy/Sell</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
            </Nav>
        </Navbar.Collapse>
        </Container>
    </Navbar>
  )
}

export default SiteNav