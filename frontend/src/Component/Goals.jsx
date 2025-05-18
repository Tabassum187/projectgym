import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Goals() {
  const navigate = useNavigate();

  const handleLogout = (e) => {
    e.preventDefault();
    // Clear user session/token if needed
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login"); // redirect to login
  };

  const goalsNotifications = [
    { id: 1, message: "🏆 You reached your weekly step goal! Keep moving!" },
    { id: 2, message: "🔥 New personal best in running distance!" },
    { id: 3, message: "🎯 You set a new goal: 5 workouts per week." },
    { id: 4, message: "✅ Goal achieved: Lose 2 kg this month." },
  ];

  return (
    <div className="dark-theme">
      <div className="container-scroller">

        {/* Navbar */}
        <nav
          className="navbar default-layout-navbar col-lg-12 col-12 p-0 fixed-top d-flex align-items-center justify-content-between"
          style={{ backgroundColor: "#121212" }}
        >
          <div style={{ position: "absolute", left: "50%", transform: "translateX(-50%)" }}>
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
        <div className="main-panel" style={{ padding: "20px" }}>
  <h2
    style={{
      borderBottom: "2px solid #f3d438",
      paddingBottom: "0.5rem",
      color: "#f3d438",
    }}
  >
    🎯 Goals
  </h2>

  {goalsNotifications.length === 0 ? (
    <p
      style={{
        marginTop: "1rem",
        fontStyle: "italic",
        color: "#bbb",
      }}
    >
      No goal notifications at the moment.
    </p>
  ) : (
    <ul style={{ listStyle: "none", padding: 0, marginTop: "1rem" }}>
      {goalsNotifications.map((notif) => (
        <li
          key={notif.id}
          style={{
            backgroundColor: "#222",
            marginBottom: "1rem",
            padding: "1rem",
            borderRadius: "8px",
            boxShadow: "0 0 8px #f3d438",
            fontSize: "1.1rem",
            color: "white",
          }}
        >
          {notif.message}
        </li>
      ))}
    </ul>
  )}
</div>

        </div>
      </div>
    </div>
  );
}
