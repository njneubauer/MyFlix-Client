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
                    <li><Link to='/profile'>Profile</Link></li>
                    <li><Button className='btn-logout' onClick={()=>props.onLogout()}>Logout</Button></li>
                </ul>
               
            </div>
            
        )
    };

    return (
        <Navbar className='py-0' bg="dark" variant="dark" sticky="top">
            <Container className='nav-container' fluid>
                <Nav>
                    <Navbar.Brand align="top">
                            <Link to='/'><h1>Nickflix</h1></Link>
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