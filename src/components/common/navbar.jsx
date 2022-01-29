import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

export function NavBar(props){
    const renderNavButtons = ()=>{
        return props.user === null ? (
            <></>
        ) : (<>
                <Nav.Link as={Link} to="/">Movies</Nav.Link>
                <Nav.Link as={Link} to="/profile">Profile</Nav.Link>
                <Button className="btn-logout" variant="danger" onClick={()=>props.onLogout()}>Logout</Button>
            </>
            
        )
    };

    return (
        <Navbar collapseOnSelect className="my-0 py-0" expand="sm" bg="dark" variant="dark" sticky="top">
            <Container className="my-0 py-0" fluid>
                <Navbar.Brand as={Link} to='/' align="top">
                    <h1>Nickflix</h1>
                </Navbar.Brand>
                {/* <Nav className="d-flex my-0 py-0"> */}
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="justify-content-end my-0 py-0" style={{ width: "100%" }}>
                      {renderNavButtons()}
                    </Nav>
                </Navbar.Collapse>
                {/* </Nav> */}
            </Container>
        </Navbar>
    )
}