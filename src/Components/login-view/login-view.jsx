import React, { useState } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';
import { Form, Button } from "react-bootstrap";
import './login-view.scss'
import propTypes from "prop-types";


export function LoginView(props) {

    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ usernameErr, setUsernameErr ] = useState('');
    const [ passwordErr, setPasswordErr ] = useState('');

    const validate = ()=>{
        let isReq = true;
        if(!username){
            setUsernameErr('Username required');
            isReq = false;
        }
        else if(username.length < 5){
            setUsernameErr('Username must be at least 5 characters long');
            isReq = false
        }
        if(!password){
            setPasswordErr('Password required')
            isReq = false;
        }
        else if(password.length < 5){
            setPasswordErr('Password must be at least 5 characters long');
            isReq = false
        }
        return isReq;
    }


    const handleSubmit = (e) => {
        e.preventDefault();
        const isReq = validate();

        if(isReq){
            /* Send a request to the server for authentication */
            axios.post('https://nickflixapi.herokuapp.com/login', {
                username: username,
                password: password
            }).then(response=>{
                const data = response.data;
                props.onLoggedIn(data);
            }).catch(err=>{
                console.error(err);
            });
        }
    };
    
    return (
        <div className="login-view">
            <div className="form-card">
                <div className="form-container">
                    <Form>
                        <Form.Label className="form-title">Sign In</Form.Label>
                        <Form.Group>
                        <Form.Label>
                            Username
                            <Form.Control type="text" value={username} onChange={e => setUsername(e.target.value)} />    
                            {usernameErr && <p className="validation-err-text">{usernameErr}</p>}
                        </Form.Label><br />
                        <Form.Label>
                            Password
                            <Form.Control type="password" value={password} onChange={e => setPassword(e.target.value)} />
                            {passwordErr && <p className="validation-err-text">{passwordErr}</p>}
                        </Form.Label>
                        </Form.Group>
                        <Button type="submit" className="btn-login" variant="primary" onClick={handleSubmit}>Sign In</Button>
                        <Link to="/registration">
                            <Button type="submit" className="btn-login" variant="outline-light">Create Account</Button>
                        </Link>
                    </Form>
                </div>
            </div>
            <footer>
                <div className="footer-container">
                    <div className="footer-content">
                        <p>Background Image Credit:&nbsp;<a href="https://erikhollanderdesign.com/MOVIE-CLASSICS-COLLAGE">Erik Hollander Design</a></p>
                        <p>&copy;Neubauer Development</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}

LoginView.propTypes = {
    onLoggedIn: propTypes.func.isRequired
};