import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <>
      <nav
        className="navbar navbar-expand-lg fixed-top"
        style={{
          backgroundColor: "#004d4d", // Dark Green (Hospital-themed)
          boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)', // Soft shadow for depth
        }}
      >
        <div className="container-fluid d-flex justify-content-between align-items-center">
          <a className="navbar-brand" href="/" style={{ fontWeight: 'bold' }}>
            <h2 className="text-white text-capitalize m-0">
              <i /> HealthTrack<span style={{ color: 'black' }}>Care</span>
            </h2>
          </a>9

          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarsid"
            aria-controls="navbarsid"
            aria-expanded="false"
            aria-label="Toggle navigation"
            style={{ border: 'none' }}
          >
            <span className="ti-view-list text-white"></span>
          </button>

          <div className="collapse navbar-collapse justify-content-end" id="navbarsid">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link text-white" to="/login" style={{ fontSize: '1.1rem' }}>
                  Login
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-white" to="/reg" style={{ fontSize: '1.1rem' }}>
                  Register
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
