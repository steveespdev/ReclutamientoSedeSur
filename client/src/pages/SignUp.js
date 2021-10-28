import React, { useState } from "react";
import Axios from 'axios';
import '../App.css';

const SignUp = () => {

    const [emailReg, setEmailReg] = useState("");
    const [passwordReg, setPasswordReg] = useState("");
    const [nameReg, setNameReg] = useState("");

    //if axios is being used, ALWAYS use the following bit of code
    Axios.defaults.withCredentials = true;

    const register = () => {
        Axios.post('http://localhost:3001/register', {
            email: emailReg,
            password: passwordReg,
            name: nameReg,
        }).then((response) => {
            console.log(response);
        });
    };

    return (
        <div className="App">
            <div className="registration">
                <h1>Registration</h1>
                <label>Name & Lastname</label>
                <input type="text"
                    onChange={(e) => {
                        setNameReg(e.target.value);
                    }}
                />
                <label>email</label>
                <input type="text"
                    onChange={(e) => {
                        setEmailReg(e.target.value);
                    }}
                />
                <label>Password</label>
                <input type="text"
                    onChange={(e) => {
                        setPasswordReg(e.target.value);
                    }}
                />
                <button onClick={register} >Register</button>
            </div>
        </div>
    );
}

export default SignUp;