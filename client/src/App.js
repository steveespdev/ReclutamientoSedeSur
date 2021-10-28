import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import { Link } from "react-router-dom";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import AdminDash from "./pages/AdminDashboard";
import Dashboard from "./pages/Dashboard";
import { LoginContext } from "./helper/Context";

function App() {
  const [loggedInUser, setloggedInUser] = useState({ auth: false, role: "user" });

  if (loggedInUser.auth === false) {
    <Redirect to="/login" />;
  }

  return (
    <LoginContext.Provider value={{ loggedInUser, setloggedInUser }}>
      <div className="App">
        <Router>
          <Link to="/"> Home </Link>
          <Link to="/sign-up"> Register </Link>
          <Switch>
            <Route path="/" exact component={SignIn} />
            <Route path="/dashboard" exact component={Dashboard} />
            <Route path="/admin-dashboard" exact component={AdminDash} />
            <Route path="/sign-up" exact component={SignUp} />
          </Switch>
        </Router>
      </div>
    </LoginContext.Provider>
  );
}

export default App;
