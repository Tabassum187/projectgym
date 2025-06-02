import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "../style/ReminderForm.module.css";

export default function ReminderForm() {
    const [showWorkout, setShowWorkout] = useState(false);
      const [showNutrition, setShowNutrition] = useState(false);
      const [showProgress, setShowProgress] = useState(false);
      const [showsteps, setShowsteps] = useState(false);
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