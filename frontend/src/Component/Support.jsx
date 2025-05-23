import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const SupportForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const navigate = useNavigate();

  // Placeholder: Replace with actual logic
  const user = true;

  const handleLogout = () => {
    // Placeholder logout logic
    console.log("Logged out");
    navigate('/login');
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await axios.post(
        'http://localhost:3001/api/support',
        formData,
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        }
      );

      setSuccess(true);
      setFormData({ name: '', email: '', message: '' });
      console.log('Submission successful:', response.data);
    } catch (err) {
      console.error("Full error:", err);
      const errorMessage =
        err.response?.data?.error ||
        err.response?.data?.message ||
        err.message ||
        'Something went wrong. Please try again.';
      setError(errorMessage);
    } finally {
      setIsSubmitting(false);
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
                    <div className="dropdown-menu dropdown-menu-right">
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
              <li className="nav-item mt-3">
                <a href="/logout" className="nav-link text-white" onClick={handleLogout} style={{ cursor: 'pointer' }}>
                  <span className="menu-title">🚪 Log Out</span>
                </a>
              </li>
            </ul>
          </nav>

          {/* Main Content */}
          <div style={{
            minHeight: '100vh',
            backgroundColor: '#121212',
            color: 'white',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '50px 20px',
            width: '100%'
          }}>
            <h2 style={{ color: '#ffd700', marginBottom: '30px' }}>🛠️ Support & Feedback</h2>

            {success && (
              <div style={{
                backgroundColor: '#4BB543',
                color: 'white',
                padding: '15px',
                borderRadius: '5px',
                marginBottom: '20px',
                textAlign: 'center'
              }}>
                Feedback submitted successfully!
              </div>
            )}

            {error && (
              <div style={{
                backgroundColor: '#ff3333',
                color: 'white',
                padding: '15px',
                borderRadius: '5px',
                marginBottom: '20px',
                textAlign: 'center'
              }}>
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} style={{
              backgroundColor: '#1e1e1e',
              padding: '30px',
              borderRadius: '10px',
              boxShadow: '0 0 10px rgba(0,0,0,0.6)',
              maxWidth: '600px',
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              gap: '20px'
            }}>
              <div>
                <label>Name</label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  style={inputStyle}
                />
              </div>
              <div>
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  style={inputStyle}
                />
              </div>
              <div>
                <label>Message</label>
                <textarea
                  name="message"
                  required
                  value={formData.message}
                  onChange={handleChange}
                  style={{ ...inputStyle, minHeight: '100px', resize: 'vertical' }}
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                style={{
                  backgroundColor: isSubmitting ? '#cccccc' : '#ffd700',
                  color: '#121212',
                  border: 'none',
                  borderRadius: '6px',
                  padding: '12px',
                  fontWeight: 'bold',
                  cursor: isSubmitting ? 'not-allowed' : 'pointer'
                }}
              >
                {isSubmitting ? 'Submitting...' : 'Submit'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

const inputStyle = {
  width: '100%',
  padding: '12px',
  backgroundColor: '#2a2a2a',
  color: 'white',
  border: '1px solid #444',
  borderRadius: '5px',
  fontSize: '16px',
};

export default SupportForm;
