import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <nav
      className="navbar navbar-expand-lg navbar-light bg-light shadow mb-2 bg-body rounded"
      style={{ color: "#204C6F" }}
    >
      <div className="container-fluid">
        <Link to="" className="navbar-brand">
          Reclutamiento
        </Link>
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
            <li className="nav-item">
              <Link to="" className="nav-link disabled">
                Disabled
              </Link>
            </li>
          </ul>
          <div className="d-flex">
            <button className="btn btn-primary btn-md ms-1" type="button">
              Cerrar Sesión
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
