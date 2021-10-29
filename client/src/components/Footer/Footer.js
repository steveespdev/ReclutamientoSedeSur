import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <div className="footer">
      <div>
        <a
          href="http://www.ucr.ac.cr/"
          title="Página principal de la Sede del Sur"
        >
          Sede del Sur - Tel. 2511-7716
        </a>
      </div>
      <div className="ucr-copyright">
        <a
          href="http://www.ucr.ac.cr/"
          title="Página principal de la Universidad de Costa Rica"
        >
          © {new Date().getFullYear()} Universidad de Costa Rica - Tel.
          2511-5000
        </a>
      </div>
    </div>
  );
};
export default Footer;
