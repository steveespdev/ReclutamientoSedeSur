import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import Axios from "axios";
import "../App.css";
import { LoginContext } from "../helper/Context";

import { Card, Form, Button, FloatingLabel } from "react-bootstrap";

const Signin = () => {
  const { loggedInUser, setloggedInUser } = useContext(LoginContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loginStatus, setLoginStatus] = useState(false);
  const history = useHistory();
  //if axios is being used, ALWAYS use the following bit of code
  Axios.defaults.withCredentials = true;

  const login = (e) => {
    e.preventDefault();
    Axios.post("http://localhost:3001/login", {
      email: email,
      password: password,
    }).then((response) => {
      // console.log(response.data);
      if (!response.data.auth) {
        setLoginStatus(false);
      } else {
        localStorage.setItem("token", response.data.token);
        setLoginStatus(true);
        userAuthenticated();
      }
    });
  };

  const userAuthenticated = () => {
    Axios.get("http://localhost:3001/userAuth", {
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    }).then((response) => {
      if (response.data.auth) {
        setloggedInUser({
          auth: response.data.auth, role: response.data.role,
          name: response.data.name, email: response.data.email
        });
        history.push("/dashboard");
      } else {
        if (!loginStatus) {
          history.push("/");
        }
      }
    });
  };

  //this hook can help to display the name of the user if the app
  // is refreshed or the tab is closed (cookies)
  useEffect(() => {
    Axios.get("http://localhost:3001/login").then((response) => {
      // if (response.data.loggedIn === true) {
      //   // setLoginStatus(response.data.user[0].name);
      // }
    });
  }, []);

  return (
    <div align="center">
      <h2 className="mt-5" style={{ color: "#41ade7" }}>
        Reclutamiento Sede del Sur
      </h2>
      <Card
        style={{
          width: "30%",
          marginTop: "15px",
          position: "relative",
        }}
      >
        <Card.Header style={{ fontSize: 20, marginBottom: 20 }}>
          Ingresar al sistema
        </Card.Header>
        <Card.Title>Cuenta Institucional UCR</Card.Title>
        <Card.Body style={{ textAlign: "left" }}>
          <Form onSubmit={login}>
            <FloatingLabel
              controlId="floatingInput"
              label="Correo institucional"
              className="mb-3"
            >
              <Form.Control
                type="email"
                placeholder="usuario@ucr.ac.cr"
                onChange={(e) => {
                  setEmail(e.currentTarget.value);
                }}
              />
            </FloatingLabel>
            <FloatingLabel
              className="mb-3"
              controlId="floatingPassword"
              label="Contraseña"
            >
              <Form.Control
                type="password"
                placeholder="Contraseña"
                onChange={(e) => {
                  setPassword(e.currentTarget.value);
                }}
              />
            </FloatingLabel>

            <Button
              variant="primary"
              type="submit"
              style={{ width: "100%", padding: 10 }}
            >
              Ingresar
            </Button>
          </Form>
          <Button style={{ float: "right" }} variant="link">
            ¿Olvido su contraseña?
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Signin;
