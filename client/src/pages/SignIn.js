import React, { useState, useEffect, useContext } from "react";
import { useHistory } from 'react-router-dom';
import Axios from 'axios';
import '../App.css';
import { LoginContext } from "../helper/Context";

const Signin = () => {

  let { loggedInUser, setloggedInUser } = useContext(LoginContext);
  console.log(loggedInUser);


  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loginStatus, setLoginStatus] = useState(false);
  const history = useHistory();

  //if axios is being used, ALWAYS use the following bit of code
  Axios.defaults.withCredentials = true;

  const login = () => {
    Axios.post('http://localhost:3001/login', {
      email: email,
      password: password,
    }).then((response) => {
      if (!response.data.auth) {
        setLoginStatus(false);
      } else {
        localStorage.setItem("token", response.data.token)
        setLoginStatus(true);
        userAuthenticated();
      }
    });
  };

  const userAuthenticated = () => {
    Axios.get('http://localhost:3001/userAuth', {
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    }).then((response) => {
      console.log(response);
      // console.log(response.data.user.role);
      if (response.data.user === "admin") {
        console.log("redirect to admin dashboard");
        setloggedInUser({ auth: response.data.auth, role: response.data.user });
        history.push("/admin-dashboard");
      } else if (response.data.user === "professor") {
        setloggedInUser({ auth: response.data.auth, role: response.data.user });
        console.log("redirect to prof dashboard");
        history.push("/dashboard");
      } else {
        if (!loginStatus) {
          history.push("/");
        }
        history.push("/");
      }
    });
  };


  //this hook can help to display the name of the user if the app
  // is refreshed or the tab is closed (cookies)
  useEffect(() => {
    Axios.get("http://localhost:3001/login").then((response) => {
      if (response.data.loggedIn === true) {
        setLoginStatus(response.data.user[0].name);
      }
    })
  }, []);

  return (
    <div className="App">
      <div className="login">
        <h1>Login</h1>
        <input type="text" placeholder="Email..."
          onChange={(e) => {
            setEmail(e.target.value);
          }} />
        <input type="password" placeholder="Password..."
          onChange={(e) => {
            setPassword(e.target.value);
          }} />
        <button onClick={login}> Login</button>
      </div>
      {/* {loginStatus && (
        <h1>test</h1>
      )} */}
    </div>
  );
}

export default Signin;