import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from 'react-router-dom';
import '../style/WorkoutForm.module.css';

export default function WorkoutForm({ workout = null, userId: propUserId, onSave }) {
  const [name, setName] = useState('');
  const [workoutType, setWorkoutType] = useState('Strength Training');
  const [caloriesBurned, setCaloriesBurned] = useState('');
  const [duration, setDuration] = useState('');
  const [date, setDate] = useState('');
  const [currentUserId, setCurrentUserId] = useState(propUserId || null);
  const [userEmail, setUserEmail] = useState('');
  const navigate = useNavigate();

  const [showWorkout, setShowWorkout] = useState(false);
  const [showNutrition, setShowNutrition] = useState(false);
  const [showProgress, setShowProgress] = useState(false);


  const workoutOptions = {
    "Strength Training": ["Bench Press", "Deadlift", "Squats"],
    "Cardio": ["Running", "Cycling", "Jump Rope"],
    "Yoga": ["Hatha Yoga", "Vinyasa", "Power Yoga"],
    "HIIT": ["Burpees", "Jump Squats", "Mountain Climbers"],
    "Other": ["Custom Activity"]
  };

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user_information'));
    if (userData) {
      setCurrentUserId(userData._id);
      setUserEmail(userData.email || '');
    }

    if (workout) {
      setName(workout.name || '');
      setWorkoutType(workout.workoutType || 'Strength Training');
      setCaloriesBurned(workout.caloriesBurned || '');
      setDuration(workout.duration || '');
      setDate(workout.date ? new Date(workout.date).toISOString().slice(0, 16) : '');
    } else if (userData) {
      const savedData = JSON.parse(localStorage.getItem(`formData_${userData._id}`));
      if (savedData) {
        setName(savedData.name || '');
        setWorkoutType(savedData.workoutType || 'Strength Training');
        setCaloriesBurned(savedData.caloriesBurned || '');
        setDuration(savedData.duration || '');
        setDate(savedData.date || '');
      }
    }
  }, [workout]);

  const handleWorkoutTypeChange = (e) => {
    const selectedType = e.target.value;
    setWorkoutType(selectedType);
    setName(''); // Clear the workout name when type changes
  };

  const handleLogout = () => {
    const confirmed = window.confirm("Are you sure you want to logout?");
    if (confirmed) {
      localStorage.removeItem("user_information");
      setUserEmail(null);
      navigate('/login');
    }
  };

  const clearForm = () => {
    setName('');
    setWorkoutType('Strength Training');
    setCaloriesBurned('');
    setDuration('');
    setDate('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !duration || !caloriesBurned || !date) {
      toast.error("Please fill all the fields.");
      return;
    }

    const isoDate = new Date(date).toISOString();

    const workoutData = {
      userId: currentUserId,
      name,
      workoutType,
      caloriesBurned: Number(caloriesBurned),
      duration: Number(duration),
      date: isoDate,
    };

    try {
      if (workout && workout._id) {
        await axios.put(`http://localhost:3001/gym/workout/${workout._id}`, workoutData);
        toast.success("Workout updated successfully!");
      } else {
        await axios.post("http://localhost:3001/gym/workout", workoutData);
        toast.success("Workout added successfully!");
      }
      clearForm();
      localStorage.removeItem(`formData_${currentUserId}`);
      if (onSave) onSave();
    } catch (error) {
      console.error('Error submitting workout:', workoutData);
      toast.error(error.response?.data?.msg || "Error saving workout data.");
    }
  };

  if (!userEmail) return null;

  return (
    <div style={{ 
      backgroundImage: "url('https://hips.hearstapps.com/hmg-prod/images/701/articles/2017/01/how-much-joining-gym-helps-health-2-jpg-1488906648.jpeg?resize=640:*')",
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
        backgroundColor: 'rgba(15, 15, 15, 0.45)',
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
                <div className="workout-form-container" style={{
                  backgroundColor: 'rgba(30, 30, 30, 0.9)',
                  borderRadius: '12px',
                  padding: '30px',
                  maxWidth: '600px',
                  margin: '30px auto',
                  boxShadow: '0 0 20px rgba(0, 0, 0, 0.5)',
                  zIndex: 1,
                  position: 'relative'
                }}>
                  <h2 style={{ textAlign: 'center', marginBottom: '25px', color: '#ffd700' }}>
                    {workout ? "Update Workout" : "Add New Workout"}
                  </h2>
                  <form onSubmit={handleSubmit} className="workout-form" style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '20px'
                  }}>
                    <div className="form-group" style={{ display: 'flex', flexDirection: 'column' }}>
                      <label style={{ color: '#e0e0e0', marginBottom: '8px', fontWeight: '500' }}>Workout Type</label>
                      <select 
                        value={workoutType} 
                        onChange={handleWorkoutTypeChange} 
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
                      >
                        <option value="">Select Workout Type</option>
                        {Object.keys(workoutOptions).map((type) => (
                          <option key={type} value={type}>{type}</option>
                        ))}
                      </select>
                    </div>

                    <div className="form-group" style={{ display: 'flex', flexDirection: 'column' }}>
                      <label style={{ color: '#e0e0e0', marginBottom: '8px', fontWeight: '500' }}>Workout Name</label>
                      <select 
                        value={name} 
                        onChange={(e) => setName(e.target.value)} 
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
                      >
                        <option value="">Select Workout</option>
                        {workoutOptions[workoutType]?.map((workoutName) => (
                          <option key={workoutName} value={workoutName}>{workoutName}</option>
                        ))}
                      </select>
                    </div>

                    <div className="form-group" style={{ display: 'flex', flexDirection: 'column' }}>
                      <label style={{ color: '#e0e0e0', marginBottom: '8px', fontWeight: '500' }}>Duration (minutes)</label>
                      <input
                        type="number"
                        value={duration}
                        onChange={(e) => setDuration(e.target.value)}
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
                      <label style={{ color: '#e0e0e0', marginBottom: '8px', fontWeight: '500' }}>Calories Burned</label>
                      <input
                        type="number"
                        value={caloriesBurned}
                        onChange={(e) => setCaloriesBurned(e.target.value)}
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
                      <label style={{ color: '#e0e0e0', marginBottom: '8px', fontWeight: '500' }}>Date & Time</label>
                      <input
                        type="datetime-local"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
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
                      }}>
                        {workout ? "Update Workout" : "Save Workout"}
                      </button>

                      <Link to="/worklist">
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
                          View Workouts
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
      <ToastContainer position="bottom-right" autoClose={3000} />
    </div>
  );
}