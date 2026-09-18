import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div className="container">
      <nav className="navbar navbar-expand-lg border-bottom" style={{ backgroundColor: "#FFF" }}>
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            <img src="media/images/logo.svg" alt="Logo" style={{ width: "25%" }} />
          </Link>
          <button
            className="navbar-toggler" type="button"
            data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item"><Link className="nav-link" to="/about">About</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/products">Products</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/pricing">Pricing</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/support">Support</Link></li>
              <li className="nav-item">
                <Link className="nav-link btn btn-outline-primary px-3 ms-2" to="/login">Login</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link btn btn-primary text-white px-3 ms-2" to="/signup">Signup</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
