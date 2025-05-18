import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "../style/ReminderForm.module.css";

export default function ReminderForm() {
  const navigate = useNavigate();
  const [reminders, setReminders] = useState([]);
  const [reminder, setReminder] = useState({
    type: "Workout",
    message: "",
    time: "",
  });

  const handleChange = (e) => {
    setReminder({ ...reminder, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (reminder.message && reminder.time) {
      setReminders([...reminders, reminder]);
      setReminder({
        type: "Workout",
        message: "",
        time: "",
      });
    }
  };

  const deleteReminder = (index) => {
    const updatedReminders = [...reminders];
    updatedReminders.splice(index, 1);
    setReminders(updatedReminders);
  };

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };
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


          {/* Main Content - Form remains unchanged */}
          <div className="main-panel" style={{ padding: "15px" }}>
           <div className={styles.formContainer} style={{ maxWidth: "800px", width: "100%", margin: "0 auto" }}>

              <h2 className={styles.formHeading}>
                Set Alerts & Reminders
              </h2>

              {/* This form structure stays exactly the same after submission */}
              <form onSubmit={handleSubmit} className={styles.reminderForm}>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Reminder Type</label>
                  <select
                    name="type"
                    value={reminder.type}
                    onChange={handleChange}
                    className={styles.formSelect}
                    required
                  >
                    <option value="Workout">Workout</option>
                    <option value="Meal">Meal</option>
                    <option value="Goal">Fitness Goal</option>
                  </select>
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Message</label>
                  <input
                    type="text"
                    name="message"
                    value={reminder.message}
                    onChange={handleChange}
                    placeholder="Enter your reminder"
                    className={styles.formInput}
                    required
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Time</label>
                  <input
                    type="time"
                    name="time"
                    value={reminder.time}
                    onChange={handleChange}
                    className={styles.formInput}
                    required
                  />
                </div>

                <button
                  type="submit"
                  className={styles.submitButton}
                >
                  Add Reminder
                </button>
              </form>

              {/* Only this section updates when reminders are added */}
              <div className={styles.remindersList}>
                <h3 className={styles.remindersHeading}>Your Reminders</h3>
                {reminders.length === 0 ? (
                  <p className={styles.noReminders}>No reminders set yet</p>
                ) : (
                  <ul className={styles.reminders}>
                    {reminders.map((item, index) => (
                      <li key={index} className={styles.reminderItem}>
                        <div>
                          <span className={styles.reminderType}>{item.type}</span>
                          <span className={styles.reminderText}>{item.message}</span>
                          <span className={styles.reminderTime}>{item.time}</span>
                        </div>
                        <button 
                          onClick={() => deleteReminder(index)}
                          className={styles.deleteButton}
                        >
                          ×
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}