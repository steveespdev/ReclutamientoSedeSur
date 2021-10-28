
import React, { useContext } from "react";
import { LoginContext } from "../helper/Context";
import { useHistory } from "react-router";


const AdminDashboard = () => {

    const history = useHistory();
    let { loggedInUser, setloggedInUser } = useContext(LoginContext);
    console.log(loggedInUser.role);

    if (loggedInUser.auth === false || !(loggedInUser.role === "admin")) {
        history.push("/");
        console.log("no redirect");
    }
    return (
        <h1>
            Admin Dashboard
        </h1>
    );
}

export default AdminDashboard;