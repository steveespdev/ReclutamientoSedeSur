import React, { useContext } from "react";
import { LoginContext } from "../helper/Context";
import { useHistory } from "react-router";
import NavBar from "../components/NavBar/NavBar";

const Dashboard = () => {
  const history = useHistory();
  let { loggedInUser, setloggedInUser } = useContext(LoginContext);
  console.log(loggedInUser.role);

  if (loggedInUser.auth === false) {
    history.push("/");
    console.log("no redirect");
  }

  const sessionLogout = () => {
    localStorage.removeItem("token");
    setloggedInUser({ auth: false, role: "user" });
    history.push("/");
  };

  return (
    <>
      <NavBar />
      <h1>{loggedInUser.role} Dashboard</h1>
      <button onClick={sessionLogout}>Logout</button>
    </>
  );
};

export default Dashboard;
