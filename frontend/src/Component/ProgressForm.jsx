import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../style/ProgressForm.module.css';
import "react-toastify/dist/ReactToastify.css";

const ProgressForm = ({ handleLogout, user }) => {
  const [formData, setFormData] = useState({
    weight: '',
    measurements: '',
    performance: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3001/gym/progress', formData);
      alert('Progress submitted!');
      setFormData({
        weight: '',
        measurements: '',
        performance: '',
      });
    } catch (err) {
      console.error(err);
      alert('Error submitting progress.');
    }
  };

  return (
    <div style={{ 
      backgroundImage: "url('https://plus.unsplash.com/premium_photo-167286364771f0-1f68f52f735f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGd5bSUyMHdvcmtvdXR8ZW58MHx8MHx8fDA%3D')",
      backgroundSize: 'cover',
      backgroundAttachment: 'fixed',
      minHeight: '100vh',
      position: 'relative'
    }}>
      {/* Dark overlay with reduced opacity */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(15, 15, 15, 0.45)', // Dark overlay with 85% opacity
        zIndex: 0
      }}></div>

       <div className="dark-theme">
            <div className="container-scroller">
              {/* Navbar */}
              <nav className="navbar default-layout-navbar col-lg-12 col-12 p-0 fixed-top d-flex align-items-center justify-content-between" style={{ backgroundColor: "#121212" }}>
                <div style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)' }}>
                  <Link className="navbar-brand brand-logo" to="/dashboard" style={{ color: "yellow", fontSize: "30px", fontWeight: "bold", textDecoration: "none" }}>
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
      
            {/* Form Section */}
            <div className="main-panel" style={{ backgroundColor: 'transparent' }}>
              <div className="content-wrapper" style={{ backgroundColor: 'transparent' }}>
                <div className="progress-form-container" style={{
                  backgroundColor: 'rgba(30, 30, 30, 0.9)',
                  borderRadius: '12px',
                  padding: '30px',
                  maxWidth: '600px',
                  margin: '30px auto',
                  boxShadow: '0 0 20px rgba(0, 0, 0, 0.5)',
                  zIndex: 1,                 // ✅ Add this line
                  position: 'relative'       // ✅ Ensure it's positioned
                  
                }}>
                  <h2 style={{ textAlign: 'center', marginBottom: '25px', color: '#ffd700' }}>Add Progress</h2>
                  <form onSubmit={handleSubmit} className="progress-form" style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '20px'
                  }}>
                    <div className="form-group" style={{ display: 'flex', flexDirection: 'column' }}>
                      <label style={{ color: '#e0e0e0', marginBottom: '8px', fontWeight: '500' }}>Weight (kg)</label>
                      <input 
                        name="weight" 
                        type="number" 
                        value={formData.weight} 
                        onChange={handleChange} 
                        required 
                        style={{
                          width: '100%',
                          padding: '12px 15px',
                          backgroundColor: '#2a2a2a',
                          border: '1px solid #444',
                          borderRadius: '6px',
                          color: 'white',
                          fontSize: '16px'
                        }}
                      />
                    </div>

                    <div className="form-group" style={{ display: 'flex', flexDirection: 'column' }}>
                      <label style={{ color: '#e0e0e0', marginBottom: '8px', fontWeight: '500' }}>Measurements</label>
                      <input 
                        name="measurements" 
                        type="text" 
                        value={formData.measurements} 
                        onChange={handleChange} 
                        required 
                        style={{
                          width: '100%',
                          padding: '12px 15px',
                          backgroundColor: '#2a2a2a',
                          border: '1px solid #444',
                          borderRadius: '6px',
                          color: 'white',
                          fontSize: '16px'
                        }}
                      />
                    </div>

                    <div className="form-group" style={{ display: 'flex', flexDirection: 'column' }}>
                      <label style={{ color: '#e0e0e0', marginBottom: '8px', fontWeight: '500' }}>Performance Notes</label>
                      <textarea 
                        name="performance" 
                        value={formData.performance} 
                        onChange={handleChange} 
                        required 
                        style={{
                          width: '100%',
                          padding: '12px 15px',
                          backgroundColor: '#2a2a2a',
                          border: '1px solid #444',
                          borderRadius: '6px',
                          color: 'white',
                          fontSize: '16px',
                          minHeight: '120px',
                          resize: 'vertical'
                        }}
                      />
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
  <button type="submit" style={{
    backgroundColor: '#ffcc00',
    color: '#121212',
    padding: '12px 24px',
    border: 'none',
    borderRadius: '6px',
    fontWeight: 'bold',
    cursor: 'pointer',
    marginTop: '10px',
    width: '200px'
  }}>Submit Progress</button>

  <Link to="/progresslist">
    <button type="button" style={{
      backgroundColor: '#ffd700',
      color: '#121212',
      padding: '12px 24px',
      border: 'none',
      borderRadius: '6px',
      fontWeight: 'bold',
      cursor: 'pointer',
      marginTop: '10px',
      width: '200px'
    }}>
      View Progress
    </button>
  </Link>
</div>

                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressForm;