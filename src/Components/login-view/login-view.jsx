import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import './login-view.scss'
import propTypes from "prop-types";

export function LoginView(props) {

    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(username, password);
        /* Send a request to the server for authentication */
        // axios.post(`https://nickflixapi.herokuapp.com/login?username=${username}&password=${password}`)
        props.onLoggedIn(username);
    };

    return (
        <div className="background-wrapper">
            <div className="background-overlay">
                <header className="header-container">
                    <h1>Nickflix</h1>
                </header>
                <div className="form-card">
                    <div className="form-container">
                        <Form>
                            <Form.Group>
                            <Form.Label>
                                Username
                                <Form.Control type="text" value={username} onChange={e => setUsername(e.target.value)} />
                            </Form.Label><br />
                            <Form.Label>
                                Password
                                <Form.Control type="password" value={password} onChange={e => setPassword(e.target.value)} />
                            </Form.Label>
                            </Form.Group>
                            <Button type="submit" className="btn-login" variant="primary" onClick={handleSubmit}>Sign In</Button>
                            <Button type="submit" className="btn-login" variant="outline-light" onClick={ ()=>{props.onSignUp(true);} }>Create Account</Button>
                        </Form>
                    </div>
                </div>
                <footer>
                    <p>
                        Background Image Credit: &nbsp; <a href="https://erikhollanderdesign.com/MOVIE-CLASSICS-COLLAGE">Erik Hollander Design</a>
                    </p>
                </footer>
            </div>
        </div>
    );
}

LoginView.propTypes = {
    onSignUp: propTypes.func.isRequired,
    // will be removed once auth built in.
    onLoggedIn: propTypes.func.isRequired    
}
