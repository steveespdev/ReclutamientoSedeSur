
import React, { useContext } from "react";
import { LoginContext } from "../helper/Context";
import { useHistory } from "react-router";

const Dashboard = () => {

    const history = useHistory();
    let { loggedInUser, setloggedInUser } = useContext(LoginContext);
    console.log(loggedInUser.role);

    if (loggedInUser.auth === false || !(loggedInUser.role === "professor")) {
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
                Professor Dashboard
            </h1>
            <button onClick={sessionLogout}>Logout</button>
        </>
    );
}

export default Dashboard;