import React, { useState } from "react";
import propTypes from "prop-types";

export function RegistrationView(props){
    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ birthday, setBirthday ] = useState('');

    function handleSubmit(e) {
        e.preventDefault();
    }

    return (
        <form>
            <label>
                Username: <br />
                <input type="text" value={username} onChange={e=>{ setUsername(e.target.value); }} />
            </label><br />
            <label>
                Password: <br />
                <input type="text" value={password} onChange={e=>{ setPassword(e.target.value); }} />
            </label><br />
            <label>
                Email: <br />
                <input type="email" value={email} onChange={e=>{ setEmail(e.target.value); }} required/>
            </label><br />
            <label>
                Birthday: <br />
                <input type="date" value={birthday} onChange={e=>{ setBirthday(e.target.value); }} />
            </label><br />
        <button type="submit" onClick={handleSubmit}>Create Account</button>
        <button onClick={()=>{props.onSignUp(false);}}>Back</button>
        </form>
    );
}
