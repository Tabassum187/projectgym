import React, { useContext, useState } from 'react';
import { Link, useNavigate} from 'react-router-dom';
import { ThemeContext } from '../ThemeContext';


export default function Settings() {
  const [showWorkout, setShowWorkout] = useState(false);
      const [showNutrition, setShowNutrition] = useState(false);
      const [showProgress, setShowProgress] = useState(false);
      const [showsteps, setShowsteps] = useState(false);
    
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
                   <Link className="nav-link text-white py-1" style={{ fontSize: "14px" }} to="/">
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
       
             <li className="nav-item mb-1">
               <div
                 className="nav-link text-white font-weight-bold d-flex justify-content-between align-items-center"
                 style={{ fontSize: "15.5px", cursor: "pointer" }}
                 onClick={() => setShowsteps(!showsteps)}
               >
                 📈 Step Count<span>{showProgress ? "▲" : "▼"}</span>
               </div>
               {showsteps && (
                 <div className="pl-3">
                   <Link className="nav-link text-white py-1" style={{ fontSize: "14px" }} to="">
                     ➕ Add Steps
                   </Link>
                   <Link className="nav-link text-white py-1" style={{ fontSize: "14px" }} to="">
                     👀 View Steps
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
