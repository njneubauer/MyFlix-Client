import axios from "axios";
import React, { useState } from "react";
import propTypes from "prop-types";

export function LoginView(props) {

    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(username, password);
        /* Send a request to the server for authentication */
        // axios.post(`https://nickflixapi.herokuapp.com/login?username=${username}&password=${password}`)
        /* then call props.onLoggedIn(username) */
        props.onLoggedIn(username);
    };

    return (
        <form >
            <label>
                Username:
                <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
            </label>
            <label>
                Password:
                <input type="text" value={password} onChange={e => setPassword(e.target.value)} />
            </label>
            <button type="submit" onClick={handleSubmit}>Login</button>
            <button type="submit" onClick={ ()=>{props.onSignUp(true);} }>Sign Up!</button>
        </form>
    );
}
