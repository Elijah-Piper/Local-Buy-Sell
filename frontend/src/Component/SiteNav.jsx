import React from 'react'
import { Navbar, Container, Nav } from 'react-bootstrap'
import LoginModal from './LoginModal'
import LogoutBtn from './LogoutBtn'


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
        { localStorage.getItem("jwt") !== '' || localStorage.getItem("jwt") === null  ? <LogoutBtn /> : <LoginModal /> }
        </Container>
    </Navbar>
  )
}

export default SiteNav