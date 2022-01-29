import React, { useState } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';
import { Form, Button } from "react-bootstrap";
import './registration-view.scss';
import propTypes from "prop-types";


export function RegistrationView(props){
    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ birthday, setBirthday ] = useState('');

    const [ usernameErr, setUsernameErr ] = useState('');
    const [ passwordErr, setPasswordErr ] = useState('');
    const [ emailErr, setEmailErr ] = useState('');
    const [ birthdayErr, setBirthdayErr ] = useState('');
    const [ invalidCredentials, setInvalidCredentials ] = useState('');

    const validate = ()=>{
        setInvalidCredentials('');

        let isReq = true;
        if(!username){
            setUsernameErr('Username required');
            isReq = false;
        }
        else if(username.length < 5){
            setUsernameErr('Username must be at least 5 characters long');
            isReq = false;
        }
        else{
            setUsernameErr('');
        }

        if(!password){
            setPasswordErr('Password required');
            isReq = false;
        }
        else if(password.length < 5){
            setPasswordErr('Password must be at least 5 characters long');
            isReq = false;
        }
        else{
            setPasswordErr('');
        }

        function validateEmail(Email){
            const regExpression = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return regExpression.test(Email);
        }

        if(!email){
            setEmailErr('Email required');
            isReq = false;
        }
        else if(!validateEmail(email)){
            setEmailErr('Incorrect email format');
            isReq = false;
        }
        else {
            setEmailErr('');
        }

        if(!birthday){
            setBirthdayErr('Birthday required');
            isReq = false
        }
        else{
            setBirthdayErr('');
        }
        
        return isReq;
    }

    function handleSubmit(e) {
        e.preventDefault();
        const isReq = validate();
        if(isReq){
            axios.post('https://nickflixapi.herokuapp.com/registration', {
                username: username,
                password: password,
                email: email,
                birthday: birthday
            }).then(response=>{
                const data = response.data;
                alert(`Welcome ${data.username}! Please log in.`)
                window.open('/', '_self');
            }).catch(e=>{
                console.error(e.response.data);
                setInvalidCredentials(e.response.data);
            });
        };
    }

    return (
        <div className="registration-view">
                <div className="form-card">
                    <div className="form-container-registration">
                        <Form>
                            <Form.Label className="form-title">Sign Up!</Form.Label>
                            <Form.Label>
                                {invalidCredentials && <p id="validation-err-text-red">{invalidCredentials}</p>}
                                Username <br />
                                <Form.Control type="text" className='login-registration-input' value={username} onChange={e=>{ setUsername(e.target.value); }} />
                                {usernameErr && <p className="validation-err-text">{usernameErr}</p>}
                            </Form.Label><br />
                            <Form.Label>
                                Password <br />
                                <Form.Control type="password" className='login-registration-input'  value={password} onChange={e=>{ setPassword(e.target.value); }} />
                                {passwordErr && <p className="validation-err-text">{passwordErr}</p>}
                            </Form.Label><br />
                            <Form.Label>
                                Email <br />
                                <Form.Control type="email" className='login-registration-input'  value={email} onChange={e=>{ setEmail(e.target.value); }} required/>
                                {emailErr && <p className="validation-err-text">{emailErr}</p>}
                            </Form.Label><br />
                            <Form.Label>
                                Birthday <br />
                                <Form.Control type="date" value={birthday} onChange={e=>{ setBirthday(e.target.value); }} />
                                {birthdayErr && <p className="validation-err-text">{birthdayErr}</p>}
                            </Form.Label><br />
                            <Button className="btn-registration" variant="success" type="submit" onClick={handleSubmit}>Create Account</Button>
                            <Link to="/">
                                <Button className="btn-registration" variant="outline-light">Back to Sign In</Button>
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

RegistrationView.propTypes = {
}
