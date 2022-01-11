import React, { useState } from "react";
import axios from "axios";
import propTypes from "prop-types";
import { Form, Button } from "react-bootstrap";
import './registration-view.scss';


export function RegistrationView(props){
    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ birthday, setBirthday ] = useState('');

    const [ usernameErr, setUsernameErr ] = useState('');
    const [ passwordErr, setPasswordErr ] = useState('');
    const [ emailErr, setEmailErr ] = useState('');
    const [ birthdayErr, setBirthdayErr ] = useState('');

    const validate = ()=>{
        let isReq = true;
        if(!username){
            setUsernameErr('Username required');
            isReq = false;
        }
        else if(username.length < 5){
            setUsernameErr('Username must be at least 5 characters long');
            isReq = false;
        }
        if(!password){
            setPasswordErr('Password required');
            isReq = false;
        }
        else if(password.length < 5){
            setPasswordErr('Password must be at least 5 characters long');
            isReq = false;
        }
        if(!email){
            setEmailErr('Email required');
            isReq = false;
        }
        if(!birthday){
            setBirthdayErr('Birthday required')
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
                console.log(data);
                window.open('/', '_slef');
            }).catch(e=>{
                console.log('error registering the user');
            });
        };
    }

    return (
        <div className="background-wrapper">
            <div className="background-overlay">
                <header className="header-container">
                    <h1>Nickflix</h1>
                </header>
                <div className="form-card">
                    <div className="form-container-registration">
                        <Form>
                            <Form.Label className="form-title">Sign Up!</Form.Label>
                            <Form.Label>
                                Username <br />
                                <Form.Control type="text" value={username} onChange={e=>{ setUsername(e.target.value); }} />
                                {usernameErr && <p className="validation-err-text">{usernameErr}</p>}
                            </Form.Label><br />
                            <Form.Label>
                                Password <br />
                                <Form.Control type="password" value={password} onChange={e=>{ setPassword(e.target.value); }} />
                                {passwordErr && <p className="validation-err-text">{passwordErr}</p>}
                            </Form.Label><br />
                            <Form.Label>
                                Email <br />
                                <Form.Control type="email" value={email} onChange={e=>{ setEmail(e.target.value); }} required/>
                                {emailErr && <p className="validation-err-text">{emailErr}</p>}
                            </Form.Label><br />
                            <Form.Label>
                                Birthday <br />
                                <Form.Control type="date" value={birthday} onChange={e=>{ setBirthday(e.target.value); }} />
                                {birthdayErr && <p className="validation-err-text">{birthdayErr}</p>}
                            </Form.Label><br />
                            <Button className="btn-registration" variant="success" type="submit" onClick={handleSubmit}>Create Account</Button>
                            <Button className="btn-registration" variant="outline-light" onClick={()=>{props.onSignUp(false);}}>Back to Sign In</Button>
                        </Form>
                    </div>
                </div>
                <footer>
                    <div className="footer-container">
                        <p>Background Image Credit:&nbsp;<a href="https://erikhollanderdesign.com/MOVIE-CLASSICS-COLLAGE">Erik Hollander Design</a></p>
                        <p>&copy;Neubauer Development</p>
                    </div>
                </footer>
            </div>
        </div>
    );
}

RegistrationView.propTypes = {
    onSignUp: propTypes.func.isRequired
}
