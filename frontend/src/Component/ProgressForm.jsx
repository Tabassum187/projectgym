import React, { useState , useEffect} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../style/ProgressForm.module.css';
import "react-toastify/dist/ReactToastify.css";
 

const ProgressForm = ({ handleLogout, user }) => {
  const [showWorkout, setShowWorkout] = useState(false);
  const [showNutrition, setShowNutrition] = useState(false);
  const [showProgress, setShowProgress] = useState(false);
  const [showsteps, setShowsteps] = useState(false);

  const [formData, setFormData] = useState({
    weight: '',
    height: '',
    bmi: '',
    measurements: '',
    performance: '',
  });


  useEffect(() => {
    const heightInMeters = formData.height / 100;
    if (formData.weight && heightInMeters) {
      const bmi = (formData.weight / (heightInMeters * heightInMeters)).toFixed(2);
      setFormData(prev => ({ ...prev, bmi }));
    }
  }, [formData.weight, formData.height]);

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
        height:'',
        bmi: '',
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
      backgroundImage: "url('https://images.unsplash.com/photo-1521804906057-1df8fdb718b7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGZpdG5lc3N8ZW58MHx8MHx8fDA%3D')",
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
  <label style={{ color: '#e0e0e0', marginBottom: '8px', fontWeight: '500' }}>Height (cm)</label>
  <input 
    name="height" 
    type="number" 
    value={formData.height} 
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
  <label style={{ color: '#e0e0e0', marginBottom: '8px', fontWeight: '500' }}>BMI</label>
  <input 
    name="bmi" 
    type="number" 
    value={formData.bmi} 
    onChange={handleChange} 
    required 
    step="0.01"
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



