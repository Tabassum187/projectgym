import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ThemeContext } from '../ThemeContext';

export default function Settings() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user_information'));

  const handleLogout = (e) => {
    e.preventDefault();
    if (window.confirm("Are you sure you want to logout?")) {
      localStorage.removeItem("user_information");
      navigate("/login");
    }
  };

  return (
    <div className="dark-theme">
      <div className="container-scroller">
        {/* Navbar */}
        <nav
          className="navbar default-layout-navbar col-lg-12 col-12 p-0 fixed-top d-flex align-items-center justify-content-between"
          style={{ backgroundColor: "#121212" }}
        >
          <div style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)' }}>
            <Link
              className="navbar-brand brand-logo"
              to="/"
              style={{ color: "yellow", fontSize: "30px", fontWeight: "bold", textDecoration: "none" }}
            >
              <span className="text-warning">🏋️‍♀️FitTrack</span>Pro💪
            </Link>
          </div>

          <div className="navbar-menu-wrapper d-flex align-items-center justify-content-end flex-grow-0">
            <ul className="navbar-nav navbar-nav-right d-flex align-items-center">
              <li className="nav-item">
                <Link className="nav-link" to="/notifications">
                  <i className="mdi mdi-bell-outline text-white"></i>
                  <span className="count-symbol bg-danger"></span>
                </Link>
              </li>
              {user && (
                <li className="nav-item d-none d-lg-flex align-items-center ml-3">
                  <div className="dropdown">
              
                    <div className="dropdown-menu dropdown-menu-right" aria-labelledby="userDropdown">
                      <Link className="dropdown-item" to="/profile">
                        <i className="mdi mdi-account mr-2"></i> Profile
                      </Link>
                      <Link className="dropdown-item" to="/settings">
                        <i className="mdi mdi-cog mr-2"></i> Settings
                      </Link>
                      <div className="dropdown-divider"></div>
                      <button
                        className="dropdown-item"
                        onClick={handleLogout}
                      >
                        <i className="mdi mdi-logout mr-2"></i> Logout
                      </button>
                    </div>
                  </div>
                </li>
              )}
            </ul>
          </div>
        </nav>

       
         {/* Sidebar */}
         <div className="container-fluid page-body-wrapper">
           <nav className="sidebar sidebar-offcanvas" id="sidebar" style={{ backgroundColor: "#121212" }}>
             <ul className="nav">
               {/* MAIN MENU Section */}
               <li className="nav-item section-header">
                 <span className="nav-link text-muted text-uppercase small font-weight-bold">
                   <span className="menu-title">Main Menu</span>
                 </span>
               </li>
         
               <li className="nav-item">
                 <Link className="nav-link text-white" to="/dashboard">
                   <span className="menu-title">📊 Dashboard</span>
                 </Link>
               </li>
         
               <li className="nav-item">
                 <Link className="nav-link text-white" to="/work">
                   <span className="menu-title">🏋️ Workouts</span>
                 </Link>
               </li>
         
               <li className="nav-item">
                 <Link className="nav-link text-white" to="/food">
                   <span className="menu-title">🍎 Nutrition</span>
                 </Link>
               </li>
         
               <li className="nav-item">
                 <Link className="nav-link text-white" to="/pro">
                   <span className="menu-title">📈 Progress</span>
                 </Link>
               </li>
         
               <li className="nav-item">
                 <Link className="nav-link text-white" to="/goals">
                   <span className="menu-title">🎯 Goals</span>
                 </Link>
               </li>
         
               <li className="nav-item">
                 <Link className="nav-link text-white" to="/reminder">
                   <span className="menu-title">🚨 Reminders</span>
                 </Link>
               </li>
         
               {/* OTHERS Section */}
               <li className="nav-item section-header mt-3">
                 <span className="nav-link text-muted text-uppercase small font-weight-bold">
                   <span className="menu-title">Others</span>
                 </span>
               </li>
         
               <li className="nav-item">
                 <Link className="nav-link text-white" to="/getuser">
                   <span className="menu-title">👤 Profile</span>
                 </Link>
               </li>
         
               <li className="nav-item">
                 <Link to="/settings" className="nav-link text-white">
                   <span className="menu-title">⚙️ Settings</span>
                 </Link>
               </li>
         
               <li className="nav-item">
                 <Link to="/support" className="nav-link text-white">
                   <span className="menu-title">❓ Support</span>
                 </Link>
               </li>
         
               {/* Logout with extra spacing */}
               <li className="nav-item mt-3">
                 <a href="/logout" className="nav-link text-white" onClick={handleLogout} style={{ cursor: 'pointer' }}>
                   <span className="menu-title">🚪 Log Out</span>
                 </a>
               </li>
             </ul>
           </nav>
           

          {/* Main Content */}
          <div className="main-panel">
            <div className="content-wrapper" style={{ backgroundColor: '#1e1e1e', minHeight: '100vh' }}>
              <div className="container mt-4 text-white">
                <h2>⚙️ Settings & Preferences</h2>
                <hr className="bg-secondary" />

                <div className="form-group mt-3">
                  <label className="text-white">🌗 Theme:</label>
                  <div>
                    <button
                      className={`btn ${theme === 'dark' ? 'btn-light' : 'btn-dark'}`}
                      onClick={toggleTheme}
                    >
                      Switch to {theme === 'dark' ? 'Light' : 'Dark'} Mode
                    </button>
                  </div>
                </div>

                <div className="form-group mt-4">
                  <label className="text-white">📣 Notifications:</label>
                  <select className="form-control">
                    <option>Enabled</option>
                    <option>Disabled</option>
                  </select>
                </div>

                <div className="form-group mt-4">
                  <label className="text-white">📏 Units of Measurement:</label>
                  <select className="form-control">
                    <option>Metric (kg, cm)</option>
                    <option>Imperial (lbs, inches)</option>
                  </select>
                </div>

                
              </div>
            </div>
          </div>
        </div>
      </div>  
    </div>
  );
}
