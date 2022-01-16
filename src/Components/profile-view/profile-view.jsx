import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import './profile-view.scss';
import moment from 'moment';
import propTypes from "prop-types";

export function ProfileView({ user }){
    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ birthday, setBirthday ] = useState('');

    const [ usernameErr, setUsernameErr ] = useState('');
    const [ passwordErr, setPasswordErr ] = useState('');
    const [ emailErr, setEmailErr ] = useState('');
    const [ birthdayErr, setBirthdayErr ] = useState('');
    const [ userInfo, setUserInfo ] = useState({});

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

    useEffect(()=>{
        let token = localStorage.getItem('token');
        axios.get(`https://nickflixapi.herokuapp.com/user/${user}`, {
            headers:{ Authorization: `bearer ${token}` }
        }).then(response=>{
            console.log(response.data);
            setUserInfo(response.data);
        }).catch(e=>{
            console.log('error aquiring user info');
        });
    },[]);

    function handleSubmit(e) {
        e.preventDefault();
        const isReq = validate();
        if(isReq){
            axios.post('https://nickflixapi.herokuapp.com/user/update/', {
                username: username,
                password: password,
                email: email,
                birthday: birthday
            }).then(response=>{
                const data = response.data;
                window.open('/', '_self');
            }).catch(e=>{
                console.log('error updating user info');
            });
        };
    }

    return (
        <Container>
            <Row>
                <Col md={4}>
                    <div>
                        <h4><span>Username: </span>{userInfo.username}</h4>
                        <h4><span>Email: </span>{userInfo.email}</h4>
                        { userInfo.birthday && 
                            <h4><span>Birthday: </span>{moment.utc(userInfo.birthday).format('L')}</h4>
                        }
                        
                    </div>
                </Col>
                <Col className="justify-content-center" md={8}>
                        <div className="form-card">
                            <div className="form-container-profile">
                                <Form>
                                    <Form.Label className="form-title">Update Info</Form.Label>
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
                                    <Button className="btn-registration" variant="success" type="submit" onClick={handleSubmit}>Update Info</Button>
                                    <Link to="/">
                                        <Button className="btn-registration" variant="outline-danger">Delete Account</Button>
                                    </Link>
                                </Form>
                            </div>
                        </div>
                        {/* <footer>
                            <div className="footer-container">
                                <p>Background Image Credit:&nbsp;<a href="https://erikhollanderdesign.com/MOVIE-CLASSICS-COLLAGE">Erik Hollander Design</a></p>
                                <p>&copy;Neubauer Development</p>
                            </div>
                        </footer> */}
                </Col>
            </Row>
        </Container>
    );
}

ProfileView.propTypes = {
}
 