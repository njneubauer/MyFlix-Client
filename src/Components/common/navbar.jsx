import React from 'react';
import { Navbar, Nav, Container} from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

export function NavBar(props){
    const renderNavButtons = ()=>{
        return props.user === null ? (
            <div></div>
        ) : (<div>
                <ul className='links'>
                    <li><Nav.Link as={Link} to="/">Movies</Nav.Link></li>
                    <li><Nav.Link as={Link} to="/profile">Profile</Nav.Link></li>
                    <li><Button className="btn-logout" variant="danger" onClick={()=>props.onLogout()}>Logout</Button></li>
                </ul>
               
            </div>
            
        )
    };

    return (
        <Navbar className="py-0" bg="dark" variant="dark" sticky="top">
            <Container className='nav-container' fluid>
                <Nav>
                    <Navbar.Brand as={Link} to='/' align="top">
                        <h1>Nickflix</h1>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                </Nav>
                <Nav>
                    {renderNavButtons()}
                </Nav>
            </Container>
        </Navbar>
    )
}