import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import './profile-view.scss';
import moment from 'moment';
import propTypes from "prop-types";

export function ProfileView({ userData, updateUserState, onLogout }){
    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ confirmPassword, setConfirmPassword ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ birthday, setBirthday ] = useState('');

    const [ usernameErr, setUsernameErr ] = useState('');
    const [ passwordErr, setPasswordErr ] = useState('');
    const [ confirmPasswordErr, setConfirmPasswordErr ] = useState('');
    const [ emailErr, setEmailErr ] = useState('');
    const [ birthdayErr, setBirthdayErr ] = useState('');
    const [ userInfo, setUserInfo ] = useState({});
    
    let token = localStorage.getItem('token');

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
        if(!confirmPassword){
            setConfirmPasswordErr('Password required');
            isReq = false;
        }
        else if(password.length < 5){
            setPasswordErr('Password must be at least 5 characters long');
            isReq = false;
        }
        else if(password != confirmPassword){
            setConfirmPasswordErr('Passowrds must match exactly');
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

    function getUserData(username){
        username = userData;
        useEffect(()=>{
            let token = localStorage.getItem('token');
            axios.get(`https://nickflixapi.herokuapp.com/user/${userData.username}`, {
                headers:{ Authorization: `bearer ${token}` }
            }).then(response=>{
                setUserInfo(response.data);
            }).catch(e=>{
                console.log('error aquiring user info');
            });
        },[]);
    }
    
    getUserData(userData);

    function handleSubmit(e) {
        e.preventDefault();
        const isReq = validate();
        if(isReq){
            axios({
                method: 'put', 
                url: `https://nickflixapi.herokuapp.com/user/update/${userData.username}`, 
                headers: { Authorization: `bearer ${token}` },
                data:{
                    username: username,
                    password: password,
                    email: email,
                    birthday: birthday
                }
            }).then(response=>{
                userData = response.data;
                localStorage.setItem('user', userData.username);
                setUserInfo(userData);
                updateUserState(userData);
            }).catch(e=>{
                console.log('error updating user info');
            });
        };
    }

    function handleDelete(){
        axios.delete(`https://nickflixapi.herokuapp.com/remove/${userData.username}`, {
            headers: { Authorization: `Bearer ${token}` }
        }).then(response => {
                onLogout();
            })
            .catch(err => {
                console.error(err)
            });
    }


    return (
        <Container>
            <Row>
                <Col md={5} className="d-flex align-items-center justify-content-center">
                    <div className="user-info-text">
                        <h1 className="user-info-item"><span>Account Information:</span></h1>
                        <h4 className="user-info-item"><span>Username: </span>{userInfo.username}</h4>
                        <h4 className="user-info-item"><span>Email: </span>{userInfo.email}</h4>
                        { userInfo.birthday && 
                            <h4 className="user-info-item"><span>Birthday: </span>{moment.utc(userInfo.birthday).format('L')}</h4>
                        }
                        
                    </div>
                </Col>
                <Col className="d-flex align-items-center justify-content-center" md={7}>
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
                                        New Password <br />
                                        <Form.Control type="password" value={password} onChange={e=>{ setPassword(e.target.value); }} />
                                        {passwordErr && <p className="validation-err-text">{passwordErr}</p>}
                                    </Form.Label><br />
                                    <Form.Label>
                                       Confirm New Password <br />
                                        <Form.Control type="password" value={confirmPassword} onChange={e=>{ setConfirmPassword(e.target.value); }} />
                                        {confirmPasswordErr && <p className="validation-err-text">{confirmPasswordErr}</p>}
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
                                        <Button className="btn-registration" variant="outline-danger" onClick={handleDelete}>Delete Account</Button>
                                    </Link>
                                </Form>
                            </div>
                        </div>
                </Col>
            </Row>
        </Container>
    );
}

ProfileView.propTypes = {
}
 