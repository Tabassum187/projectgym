import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import styles from '../style/WorkoutForm.module.css';
import { Link, useNavigate } from 'react-router-dom';

export default function WorkoutForm({ workout = null, userId, onSave }) {
  const [name, setName] = useState('');
  const [type, setType] = useState('strength');
  const [duration, setDuration] = useState('');
  const [caloriesBurned, setCaloriesBurned] = useState('');
  const [date, setDate] = useState('');
  const [notes, setNotes] = useState('');
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user_information'));
    if (userData) {
      setUser(userData);
    }

    if (workout) {
      setName(workout.name || '');
      setType(workout.type || 'strength');
      setDuration(workout.duration || '');
      setCaloriesBurned(workout.caloriesBurned || '');
      setDate(workout.date || '');
      setNotes(workout.notes || '');
    }
  }, [workout]);

  const clearForm = () => {
    setName('');
    setType('strength');
    setDuration('');
    setCaloriesBurned('');
    setDate('');
    setNotes('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !duration || !caloriesBurned || !date) {
      toast.error("Please fill all required fields.");
      return;
    }

    const workoutData = {
      userId,
      name,
      type,
      duration: parseInt(duration),
      caloriesBurned: parseInt(caloriesBurned),
      date,
      notes
    };

    try {
      if (workout && workout._id) {
        await axios.put(`http://localhost:3001/gym/workouts/${workout._id}`, workoutData);
        toast.success("Workout updated successfully!");
      } else {
        await axios.post("http://localhost:3001/gym/workouts", workoutData);
        toast.success("Workout added successfully!");
      }
      clearForm();
      if (onSave) onSave();
    } catch (error) {
      console.error("Workout save error:", error);
      toast.error(error.response?.data?.msg || "Error saving workout data.");
    }
  };

  const handleLogout = (e) => {
    e.preventDefault();
    if (window.confirm("Are you sure you want to logout?")) {
      localStorage.removeItem("user_information");
      setUser(null);
      navigate("/login");
    }
  };

  return (
    <div className="dark-theme">
      <div className="container-scroller">
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
              {user && (
                <li className="nav-item d-none d-lg-flex align-items-center ml-3">
                  <div className="dropdown">
                    <div className="dropdown-menu dropdown-menu-right" aria-labelledby="userDropdown">
                      <Link className="dropdown-item" to="/profile"><i className="mdi mdi-account mr-2"></i> Profile</Link>
                      <Link className="dropdown-item" to="/settings"><i className="mdi mdi-cog mr-2"></i> Settings</Link>
                      <div className="dropdown-divider"></div>
                      <button className="dropdown-item" onClick={handleLogout}><i className="mdi mdi-logout mr-2"></i> Logout</button>
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



          
          <div className="main-panel">
            <div className={styles.backgroundWrappers}>
              <div className={styles.formContainer}>
                <ToastContainer position="bottom-right" autoClose={3000} />
                <h3 className={styles.heading}>{workout ? "Update Workout" : "Add New Workout"}</h3>
                <form onSubmit={handleSubmit}>
                  <label className={styles.label}>Workout Name:</label>
                  <input type="text" className={styles.input} value={name} onChange={e => setName(e.target.value)} required />

                  <label className={styles.label}>Workout Type:</label>
                  <select className={styles.input} value={type} onChange={e => setType(e.target.value)} required>
                    <option value="strength">Strength Training</option>
                    <option value="cardio">Cardio</option>
                    <option value="hiit">HIIT</option>
                    <option value="yoga">Yoga</option>
                    <option value="other">Other</option>
                  </select>

                  <label className={styles.label}>Duration (minutes):</label>
                  <input type="number" className={styles.input} value={duration} onChange={e => setDuration(e.target.value)} required />

                  <label className={styles.label}>Calories Burned:</label>
                  <input type="number" className={styles.input} value={caloriesBurned} onChange={e => setCaloriesBurned(e.target.value)} required />

                  <label className={styles.label}>Date:</label>
                  <input type="date" className={styles.input} value={date} onChange={e => setDate(e.target.value)} required />

                  <label className={styles.label}>Notes (optional):</label>
                  <textarea className={styles.textarea} value={notes} onChange={e => setNotes(e.target.value)}></textarea>

                  <div className={styles.buttonGroup}>
                    <button type="submit" className={styles.btnSave}>
                      {workout ? "Update Workout" : "Save Workout"}
                    </button>
                    {workout && (
                      <button type="button" className={styles.btnDelete}>
                        Delete
                      </button>
                    )}
                  </div>
                </form>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
