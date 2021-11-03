import React, { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { LoginContext } from "../../helper/Context";

const NavBar = () => {
  let { loggedInUser, setloggedInUser } = useContext(LoginContext);
  console.log(loggedInUser);
  const history = useHistory();

  const sessionLogout = () => {
    localStorage.removeItem("token");
    setloggedInUser({ auth: false, role: "user" });
    history.push("/");
  };

  return (
    <nav
      className="navbar navbar-expand-lg navbar-light bg-light shadow mb-2 bg-body rounded"
      style={{ color: "#204C6F" }}
    >
      <div className="container-fluid">
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarCollapse"
          aria-controls="navbarCollapse"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarCollapse">
          <ul className="navbar-nav me-auto mb-2 mb-md-0">
            <li className="nav-item">
              <Link
                to="/dashboard"
                className="nav-link active"
                aria-current="page"
                href="#"
              >
                Inicio
              </Link>
            </li>
            <li className="nav-item">
              <Link to="" className="nav-link" href="#">
                Link
              </Link>
            </li>
          </ul>
          <div className="d-flex" style={{ marginRight: 20, flexDirection: "column", fontSize: "18px" }}>
            {loggedInUser.name}
            <div style={{ fontSize: "14px" }}>
              {loggedInUser.email}
            </div>
          </div>
          <div className="d-flex">
            <button
              className="btn btn-primary"
              type="button"
              style={{ paddingLeft: 40, paddingRight: 40 }}
              onClick={sessionLogout}
            >
              Salir
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
