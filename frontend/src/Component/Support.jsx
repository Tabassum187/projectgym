
import { Link } from 'react-router-dom';
import React, { useState} from 'react';
import '../style/ProgressForm.module.css';
import '@mdi/font/css/materialdesignicons.min.css';

const Support = () => {

   const [showWorkout, setShowWorkout] = useState(false);
    const [showNutrition, setShowNutrition] = useState(false);
    const [showProgress, setShowProgress] = useState(false);
    const [showsteps, setShowsteps] = useState(false);
  return (
    <div className="container-scroller" style={{ backgroundColor: '#1a1a1a', minHeight: '100vh' }}>
      {/* Top Navbar */}
         {/* Navbar */}
                    <nav className="navbar default-layout-navbar col-lg-12 col-12 p-0 fixed-top d-flex align-items-center justify-content-between" style={{ backgroundColor: "#121212" }}>
                      <div style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)' }}>
                        <Link className="navbar-brand brand-logo" to="/dashboard" style={{ color: "yellow", fontSize: "30px", fontWeight: "bold", textDecoration: "none" }}>
                          <span className="text-warning">🏋️‍♀️FitTrack</span>Pro💪
                        </Link>
                      </div>
                      <div className="navbar-menu-wrapper d-flex align-items-center justify-content-end flex-grow-0">
                        <ul className="navbar-nav navbar-nav-right d-flex align-items-center">
                          
                        </ul>
                      </div>
                    </nav>
 <div className="container-fluid page-body-wrapper">
                  {/* Responsive Sidebar */}
                  <nav
                    className="sidebar sidebar-offcanvas"
                    id="sidebar"
                    style={{ backgroundColor: "#121212", paddingTop: "5px" }}
                  >
                    <ul className="nav flex-column" style={{ paddingBottom: "15px" }}>
                      {/* Main Menu Header */}
                      <li className="nav-item section-header mb-1">
                        <span className="nav-link text-muted text-uppercase small font-weight-bold">
                          <span className="menu-title" style={{ fontSize: "15px" }}>Main Menu</span>
                        </span>
                      </li>
                
                      {/* Dashboard */}
                      <li className="nav-item mb-1">
                        <Link className="nav-link text-white font-weight-bold" style={{ fontSize: "15.5px" }} to="/dashboard">
                          📊 Dashboard
                        </Link>
                      </li>
                
                      {/* Workouts */}
                      <li className="nav-item mb-1">
                        <div
                          className="nav-link text-white font-weight-bold d-flex justify-content-between align-items-center"
                          style={{ fontSize: "15.5px", cursor: "pointer" }}
                          onClick={() => setShowWorkout(!showWorkout)}
                        >
                          🏋️ Workouts <span>{showWorkout ? "▲" : "▼"}</span>
                        </div>
                        {showWorkout && (
                          <div className="pl-3">
                            <Link className="nav-link text-white py-1" style={{ fontSize: "14px" }} to="/work">
                              ➕ Add Workout
                            </Link>
                            <Link className="nav-link text-white py-1" style={{ fontSize: "14px" }} to="/worklist">
                              📋 View Workout
                            </Link>
                          </div>
                        )}
                      </li>
                
                      {/* Nutrition */}
                      <li className="nav-item mb-1">
                        <div
                          className="nav-link text-white font-weight-bold d-flex justify-content-between align-items-center"
                          style={{ fontSize: "15.5px", cursor: "pointer" }}
                          onClick={() => setShowNutrition(!showNutrition)}
                        >
                          🍎 Nutrition <span>{showNutrition ? "▲" : "▼"}</span>
                        </div>
                        {showNutrition && (
                          <div className="pl-3">
                            <Link className="nav-link text-white py-1" style={{ fontSize: "14px" }} to="/food">
                              ➕ Add Meal
                            </Link>
                            <Link className="nav-link text-white py-1" style={{ fontSize: "14px" }} to="/foodlist">
                              📖 View Diet Plan
                            </Link>
                          </div>
                        )}
                      </li>
                
                      {/* Progress */}
                      <li className="nav-item mb-1">
                        <div
                          className="nav-link text-white font-weight-bold d-flex justify-content-between align-items-center"
                          style={{ fontSize: "15.5px", cursor: "pointer" }}
                          onClick={() => setShowProgress(!showProgress)}
                        >
                          📈 Progress <span>{showProgress ? "▲" : "▼"}</span>
                        </div>
                        {showProgress && (
                          <div className="pl-3">
                            <Link className="nav-link text-white py-1" style={{ fontSize: "14px" }} to="/pro">
                              ➕ Add Progress
                            </Link>
                            <Link className="nav-link text-white py-1" style={{ fontSize: "14px" }} to="/progresslist">
                              👀 View Progress
                            </Link>
                          </div>
                        )}
                      </li>
                
                   
                
                      {/* Goals */}
                      <li className="nav-item mb-1">
                        <Link className="nav-link text-white font-weight-bold" style={{ fontSize: "15.5px" }} to="/goals">
                          🎯 Goals
                        </Link>
                      </li>
                
                      {/* Reminders */}
                      <li className="nav-item mb-1">
                        <Link className="nav-link text-white font-weight-bold" style={{ fontSize: "15.5px" }} to="/reminder">
                          🚨 Reminders
                        </Link>
                      </li>
                      <br></br>
                      <br></br>
                
                      {/* Others Header */}
                      <li className="nav-item section-header mt-2 mb-1">
                        <span className="nav-link text-muted text-uppercase small font-weight-bold">
                          <span className="menu-title" style={{ fontSize: "15px" }}>Others</span>
                        </span>
                      </li>
                
                      {/* Settings */}
                      <li className="nav-item mb-1">
                        <Link className="nav-link text-white font-weight-bold" style={{ fontSize: "15.5px" }} to="/settings">
                          ⚙️ Settings
                        </Link>
                      </li>
                
                      {/* Support */}
                      <li className="nav-item">
                        <Link className="nav-link text-white font-weight-bold" style={{ fontSize: "15.5px" }} to="/support">
                          ❓ Support
                        </Link>
                      </li>
                    </ul>
                  </nav>
        

        {/* Main Content */}
        <div className="main-panel flex-grow-1 d-flex flex-column align-items-center text-white p-4" style={{ backgroundColor: '#1a1a1a' }}>
          <div style={{ marginTop: '100px', maxWidth: '700px', textAlign: 'center' }}>
            <h2 style={{ color: 'yellow', fontWeight: 'bold' }}>Need Help? We're Here!</h2>
            <p className="text-white mt-3" style={{ fontSize: '16px' }}>
              Welcome to <strong>FitTrackPro</strong> support center. Whether you're having issues, need guidance,
              or want to share feedback, we’d love to hear from you!
            </p>

            <div className="bg-dark text-white p-4 mt-4 rounded shadow" style={{ border: '1px solid #333' }}>
              <h5 className="mb-3">📧 Contact Us</h5>
              <p>Email us at: <a href="mailto:support@fittrackpro.com" style={{ color: '#FFD700' }}>support@fittrackpro.com</a></p>
              <p>We'll respond within 24 hours.</p>
            </div>

            <div className="mt-5">
              <h5 style={{ color: 'yellow' }}>Follow Us</h5>
              <div className="d-flex justify-content-center gap-4 mt-3">
                <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer" style={{ color: '#25D366' }}>
                  <i className="mdi mdi-whatsapp" style={{ fontSize: '32px' }}></i>
                </a>
                <a href="https://www.instagram.com/yourpage" target="_blank" rel="noopener noreferrer" style={{ color: '#E1306C' }}>
                  <i className="mdi mdi-instagram" style={{ fontSize: '32px' }}></i>
                </a>
                <a href="https://www.facebook.com/yourpage" target="_blank" rel="noopener noreferrer" style={{ color: '#3b5998' }}>
                  <i className="mdi mdi-facebook" style={{ fontSize: '32px' }}></i>
                </a>
                <a href="https://twitter.com/yourpage" target="_blank" rel="noopener noreferrer" style={{ color: '#1DA1F2' }}>
                  <i className="mdi mdi-twitter" style={{ fontSize: '32px' }}></i>
                </a>
              </div>
            </div>

            <div className="mt-5 text-muted" style={{ fontSize: '14px' }}>
              &copy; 2025 FitTrackPro. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Support;
