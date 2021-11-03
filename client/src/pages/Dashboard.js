import React, { useContext } from "react";
import { LoginContext } from "../helper/Context";
import { useHistory } from "react-router";
import NavBar from "../components/NavBar/NavBar";

const Dashboard = () => {
  const history = useHistory();
  let { loggedInUser, setloggedInUser } = useContext(LoginContext);

  // if (loggedInUser.auth === false) {
  //   history.push("/");
  //   console.log("no redirect");
  // }


  return (
    <>
      <NavBar />
    </>
  );
};

export default Dashboard;
