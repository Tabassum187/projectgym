import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <>
      <nav className="navbar navbar-expand-lg fixed-top" style={{ backgroundColor: 'transparent', boxShadow: 'none' }}>
        <div className="container-fluid d-flex justify-content-between align-items-center">
          <a className="navbar-brand" href="/" style={{ fontWeight: 'bold' }}>
            <h2 className="text-white text-capitalize m-0">
              <i />FitTrack<span style={{ color: '#FFD700' }}>Pro</span>
            </h2>
          </a>

          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarsid"
            aria-controls="navbarsid"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="ti-view-list text-white"></span>
          </button>

          <div className="collapse navbar-collapse justify-content-end" id="navbarsid">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link text-white" to="/login">
                  Login
                </Link>
              </li>
              <li className="nav-item">
                <a className="nav-link text-white" href="/reg">
                  Register
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
