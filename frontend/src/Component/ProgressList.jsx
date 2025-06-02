import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import styles from '../style/ProgressList.module.css';

const ProgressList = () => {
  const [showWorkout, setShowWorkout] = useState(false);
      const [showNutrition, setShowNutrition] = useState(false);
      const [showProgress, setShowProgress] = useState(false);
      const [showsteps, setShowsteps] = useState(false);
  const [progressData, setProgressData] = useState([]);
  const [editItem, setEditItem] = useState(null);
  const [formData, setFormData] = useState({ weight: '', measurements: '', performance: '', date: '' });
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    fetchProgress();
  }, []);

  const fetchProgress = async () => {
    const res = await axios.get('http://localhost:3001/gym/progress');
    setProgressData(res.data);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this entry?')) {
      await axios.delete(`http://localhost:3001/gym/progress/${id}`);
      fetchProgress();
    }
  };

  const openEditModal = (item) => {
    setEditItem(item._id);
    setFormData({
      weight: item.weight,
      measurements: item.measurements,
      performance: item.performance,
      date: item.date?.substring(0, 10) || ''
    });
    setShowPopup(true);
  };

  const closeModal = () => {
    setEditItem(null);
    setFormData({ weight: '', measurements: '', performance: '', date: '' });
    setShowPopup(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    await axios.put(`http://localhost:3001/gym/progress/${editItem}`, formData);
    closeModal();
    fetchProgress();
  };

  const handleLogout = () => {
    console.log('Logging out...');
    // Add your logout logic here
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
          <div className="main-panel" style={{ padding: '20px', width: 'calc(100% - 240px)' }}>
            <div className={styles.contentWrapper}>
              <div className={styles.progressHeader}>
               
                <button className={styles.addButton} onClick={() => window.location.href = '/pro'}>
                  ➕ Add Progress
                </button>
              </div>

               <h2>Your Progress</h2>

              <div className={styles.grid}>
                {progressData.length > 0 ? (
                  progressData.map((item) => (
                    <div key={item._id} className={styles.card}>
                      <p><strong>Date:</strong> {item.date?.substring(0, 10) || 'N/A'}</p>
                      <p><strong>Weight:</strong> {item.weight} kg</p>
                      <p><strong>Measurements:</strong> {item.measurements}</p>
                      <p><strong>Performance:</strong> {item.performance}</p>
                      <div className={styles.cardButtons}>
                        <button className={styles.editBtn} onClick={() => openEditModal(item)}>✏️</button>
                        <button className={styles.deleteBtn} onClick={() => handleDelete(item._id)}>🗑️</button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className={styles.emptyState}>
                    <p>No progress entries yet. Add your first progress entry!</p>
                  </div>
                )}
              </div>

              {showPopup && (
                <div className={styles.popup}>
                  <h3>Edit Progress</h3>
                  <input type="date" name="date" value={formData.date} onChange={handleChange} />
                  <input type="number" name="weight" placeholder="Weight" value={formData.weight} onChange={handleChange} />
                  <input type="text" name="measurements" placeholder="Measurements" value={formData.measurements} onChange={handleChange} />
                  <input type="text" name="performance" placeholder="Performance" value={formData.performance} onChange={handleChange} />
                  <div className={styles.popupButtons}>
                    <button className={styles.saveBtn} onClick={handleSave}>Save</button>
                    <button className={styles.cancelBtn} onClick={closeModal}>Cancel</button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressList;