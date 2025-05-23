import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import styles from '../style/ProgressList.module.css';

const ProgressList = () => {
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