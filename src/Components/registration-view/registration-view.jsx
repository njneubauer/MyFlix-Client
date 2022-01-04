import React, { useState } from "react";
import propTypes from "prop-types";
import { Form, Button } from "react-bootstrap";
import './registration-view.scss';

export function RegistrationView(props){
    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ birthday, setBirthday ] = useState('');

    function handleSubmit(e) {
        e.preventDefault();
    }

    return (
        <div className="background-wrapper">
            <div className="background-overlay">
                <header class="header-container">
                    <h1>Nickflix</h1>
                </header>
                <div className="form-card">
                    <div className="form-container">
                        <Form>
                            <Form.Label>
                                Username <br />
                                <Form.Control type="text" value={username} onChange={e=>{ setUsername(e.target.value); }} />
                            </Form.Label><br />
                            <Form.Label>
                                Password <br />
                                <Form.Control type="password" value={password} onChange={e=>{ setPassword(e.target.value); }} />
                            </Form.Label><br />
                            <Form.Label>
                                Email <br />
                                <Form.Control type="email" value={email} onChange={e=>{ setEmail(e.target.value); }} required/>
                            </Form.Label><br />
                            <Form.Label>
                                Birthday <br />
                                <Form.Control type="date" value={birthday} onChange={e=>{ setBirthday(e.target.value); }} />
                            </Form.Label><br />
                            <Button className="btn-registration" variant="success" type="submit" onClick={handleSubmit}>Create Account</Button>
                            <Button className="btn-registration" variant="outline-light" onClick={()=>{props.onSignUp(false);}}>Back to Sign In</Button>
                        </Form>
                    </div>
                </div>
                <footer>
                    <p>
                        background Image Credit: &nbsp; <a href="https://erikhollanderdesign.com/MOVIE-CLASSICS-COLLAGE">Erik Hollander Design</a>
                    </p>
                </footer>
            </div>
        </div>
    );
}
