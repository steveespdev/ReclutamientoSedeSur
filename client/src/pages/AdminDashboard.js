
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

    const sessionLogout = () => {
        localStorage.removeItem("token");
        setloggedInUser({ auth: false, role: "user" });
        history.push("/");
    }
    return (
        <>
            <h1>
                Admin Dashboard
            </h1>
            <button onClick={sessionLogout}>Logout</button>
        </>
    );
}

export default AdminDashboard;