import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from 'react-router-dom';
import '../style/WorkoutForm.module.css';

const APP_ID = '69c4e115';
const API_KEY = '0f222905a55e160c86da2bf8120434de';

export default function WorkoutForm({ workout = null, userId: propUserId, onSave }) {
  const [showWorkout, setShowWorkout] = useState(false);
  const [showNutrition, setShowNutrition] = useState(false);
  const [showProgress, setShowProgress] = useState(false);
  const [showSteps, setShowSteps] = useState(false);

  const [name, setName] = useState('');
  const [workoutType, setWorkoutType] = useState('Strength Training');
  const [caloriesBurned, setCaloriesBurned] = useState('');
  const [duration, setDuration] = useState('');
  const [date, setDate] = useState('');
  const [currentUserId, setCurrentUserId] = useState(propUserId || null);
  const [searchTerm, setSearchTerm] = useState('');
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user_information'));
    if (userData) {
      const userId = userData._id;
      setCurrentUserId(userId);
      setUsername(userData.username || userData.name || 'User');

      const savedData = JSON.parse(localStorage.getItem(`formData_${userId}`));
      if (savedData && !workout) {
        setName(savedData.name || '');
        setWorkoutType(savedData.workoutType || 'Strength Training');
        setCaloriesBurned(savedData.caloriesBurned || '');
        setDuration(savedData.duration || '');
        setDate(savedData.date || '');
        setSearchTerm(savedData.searchTerm || '');
      }
    }

    if (workout) {
      setName(workout.name || '');
      setWorkoutType(workout.WorkoutType || 'Strength Training');
      setCaloriesBurned(workout.caloriesBurned || '');
      setDuration(workout.Duration || '');
      setDate(workout.date ? new Date(workout.date).toISOString().slice(0, 16) : '');
      setSearchTerm(workout.name || '');
    }
  }, [workout]);

  useEffect(() => {
    console.log("Current User ID:", currentUserId);
  }, [currentUserId]);

  const clearForm = () => {
    setName('');
    setWorkoutType('Strength Training');
    setCaloriesBurned('');
    setDuration('');
    setDate('');
    setSearchTerm('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !duration || !caloriesBurned || !date) {
      toast.error("Please fill all the fields.");
      return;
    }

    if (!currentUserId) {
      toast.error("User not logged in.");
      return;
    }

    const workoutData = {
      userId: currentUserId,
      name,
      workoutType,
      caloriesBurned: Number(caloriesBurned),
      duration: Number(duration),
      date: new Date(date).toISOString()
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
      console.log('Submitting workout:', workoutData);
      toast.error(error.response?.data?.msg || "Error saving workout data.");
    }
  };

  const handleLogout = (e) => {
    e.preventDefault();
    if (window.confirm("Are you sure you want to logout?")) {
      const userData = JSON.parse(localStorage.getItem("user_information"));
      if (userData) {
        const userId = userData._id;
        const formState = {
          name,
          workoutType,
          caloriesBurned,
          duration,
          date,
          searchTerm,
        };
        localStorage.setItem(`formData_${userId}`, JSON.stringify(formState));
      }

      localStorage.removeItem("user_information");
      navigate("/login");
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const fetchNutritionData = async () => {
    if (!searchTerm.trim()) {
      toast.error("Please enter a workout name to search.");
      return;
    }

    try {
      const response = await axios.post(
        'https://trackapi.nutritionix.com/v2/natural/exercise',
        { query: searchTerm },
        {
          headers: {
            'x-app-id': APP_ID,
            'x-app-key': API_KEY,
            'Content-Type': 'application/json',
          },
        }
      );

      const workoutData = response.data.exercises[0];
      if (workoutData) {
        setName(workoutData.name || searchTerm);
        setDuration(workoutData.duration_min);
        setCaloriesBurned(workoutData.nf_calories);
        toast.success("Workout info fetched!");
      } else {
        toast.error("No workout info found.");
      }
    } catch (error) {
      console.error("Nutritionix API error:", error);
      toast.error("Failed to fetch data from Workout.");
    }
  };

  return (
    <div className="dark-theme">
      <div className="container-scroller">
        <nav className="navbar default-layout-navbar col-lg-12 col-12 p-0 fixed-top d-flex align-items-center justify-content-between" style={{ backgroundColor: "#121212" }}>
          <div style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)' }}>
            <Link className="navbar-brand brand-logo" to="/" style={{ color: "yellow", fontSize: "30px", fontWeight: "bold", textDecoration: "none" }}>
              <span className="text-warning">🏋️‍♀️FitTrack</span>Pro💪
            </Link>
          </div>
          <div className="navbar-menu-wrapper d-flex align-items-center justify-content-end flex-grow-0">
            <ul className="navbar-nav navbar-nav-right d-flex align-items-center">
              <li className="nav-item text-white mr-3">👤 {username}</li>
              <li className="nav-item">
                <Link className="nav-link" to="/notifications">
                  <i className="mdi mdi-bell-outline text-white"></i>
                  <span className="count-symbol bg-danger"></span>
                </Link>
              </li>
            </ul>
          </div>
        </nav>

        <div className="container-fluid page-body-wrapper" style={{ display: 'flex' }}>
          <nav className="sidebar sidebar-offcanvas" id="sidebar" style={{ backgroundColor: "#121212", paddingTop: "5px", minWidth: '220px', height: '100vh', position: 'fixed', top: '46px', left: 0 }}>
            <ul className="nav flex-column" style={{ paddingBottom: "15px" }}>
              <li className="nav-item section-header mb-1">
                <span className="nav-link text-muted text-uppercase small font-weight-bold">
                  <span className="menu-title" style={{ fontSize: "15px" }}>Main Menu</span>
                </span>
              </li>
              <li className="nav-item mb-1">
                <Link className="nav-link text-white font-weight-bold" style={{ fontSize: "15.5px" }} to="/dashboard">📊 Dashboard</Link>
              </li>
              <li className="nav-item mb-1">
                <div className="nav-link text-white font-weight-bold d-flex justify-content-between align-items-center" style={{ fontSize: "15.5px", cursor: "pointer" }} onClick={() => setShowWorkout(!showWorkout)}>
                  🏋️ Workouts <span>{showWorkout ? "▲" : "▼"}</span>
                </div>
                {showWorkout && (
                  <div className="pl-3">
                    <Link className="nav-link text-white py-1" style={{ fontSize: "14px" }} to="/work">➕ Add Workout</Link>
                    <Link className="nav-link text-white py-1" style={{ fontSize: "14px" }} to="/worklist">➕ View WorkoutList</Link>
                    <Link className="nav-link text-white py-1" style={{ fontSize: "14px" }} to="/">📋 View Workout</Link>
                  </div>
                )}
              </li>
              <li className="nav-item mb-1">
                <div className="nav-link text-white font-weight-bold d-flex justify-content-between align-items-center" style={{ fontSize: "15.5px", cursor: "pointer" }} onClick={() => setShowNutrition(!showNutrition)}>
                  🍎 Nutrition <span>{showNutrition ? "▲" : "▼"}</span>
                </div>
                {showNutrition && (
                  <div className="pl-3">
                    <Link className="nav-link text-white py-1" style={{ fontSize: "14px" }} to="/food">➕ Add Meal</Link>
                    <Link className="nav-link text-white py-1" style={{ fontSize: "14px" }} to="/foodlist">📖 View Diet Plan</Link>
                  </div>
                )}
              </li>
              <li className="nav-item mb-1">
                <div className="nav-link text-white font-weight-bold d-flex justify-content-between align-items-center" style={{ fontSize: "15.5px", cursor: "pointer" }} onClick={() => setShowProgress(!showProgress)}>
                  📈 Progress <span>{showProgress ? "▲" : "▼"}</span>
                </div>
                {showProgress && (
                  <div className="pl-3">
                    <Link className="nav-link text-white py-1" style={{ fontSize: "14px" }} to="/pro">➕ Add Progress</Link>
                    <Link className="nav-link text-white py-1" style={{ fontSize: "14px" }} to="/progresslist">👀 View Progress</Link>
                  </div>
                )}
              </li>
              <li className="nav-item mb-1">
                <div className="nav-link text-white font-weight-bold d-flex justify-content-between align-items-center" style={{ fontSize: "15.5px", cursor: "pointer" }} onClick={() => setShowSteps(!showSteps)}>
                  📈 Step Count<span>{showSteps ? "▲" : "▼"}</span>
                </div>
                {showSteps && (
                  <div className="pl-3">
                    <Link className="nav-link text-white py-1" style={{ fontSize: "14px" }} to="">➕ Add Steps</Link>
                    <Link className="nav-link text-white py-1" style={{ fontSize: "14px" }} to="">👀 View Steps</Link>
                  </div>
                )}
              </li>
              <li className="nav-item mb-1">
                <Link className="nav-link text-white font-weight-bold" style={{ fontSize: "15.5px" }} to="/goals">🎯 Goals</Link>
              </li>
              <li className="nav-item mb-1">
                <Link className="nav-link text-white font-weight-bold" style={{ fontSize: "15.5px" }} to="/reminder">🚨 Reminders</Link>
              </li>
              <li className="nav-item section-header mt-2 mb-1">
                <span className="nav-link text-muted text-uppercase small font-weight-bold">
                  <span className="menu-title" style={{ fontSize: "15px" }}>Others</span>
                </span>
              </li>
              <li className="nav-item mb-1">
                <Link className="nav-link text-white font-weight-bold" style={{ fontSize: "15.5px" }} to="/settings">⚙️ Settings</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-white font-weight-bold" style={{ fontSize: "15.5px" }} to="/support">❓ Support</Link>
              </li>
            </ul>
          </nav>

          <div style={{ marginLeft: '220px', padding: '20px', width: '100%' }}>
            <ToastContainer position="bottom-right" autoClose={3000} />
            <h3>{workout ? "Update workout" : "Add New workout"}</h3>
            <form onSubmit={handleSubmit} style={{ maxWidth: '500px' }}>
              <label>Select Workout:</label>
              <select value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} style={{ width: '100%', padding: '8px', marginBottom: '10px' }}>
                <option value="">-- Choose a workout --</option>
                <option value="Strength Training">Strength Training</option>
                <option value="Yoga">Yoga</option>
                <option value="HIIT">HIIT</option>
                <option value="Walking">Cardio</option>
              </select>

              <label>Or Enter Workout Name:</label>
              <input type="text" value={searchTerm} onChange={handleSearchChange} placeholder="e.g. brisk walk" required style={{ width: '100%', padding: '8px', marginBottom: '10px' }} />

              <label>Workout Type:</label>
              <select value={workoutType} onChange={e => setWorkoutType(e.target.value)} required style={{ width: '100%', padding: '8px', marginBottom: '10px' }}>
                <option value="">Select</option>
                <option value="Strength Training">Strength Training</option>
                <option value="Cardio">Cardio</option>
                <option value="Yoga">Yoga</option>
                <option value="HIIT">HIIT</option>
                <option value="Other">Other</option>
              </select>

              <button type="button" onClick={fetchNutritionData} style={{ marginBottom: '10px' }}>
                Search
              </button>

              <label>Duration (minutes):</label>
              <input type="number" value={duration} onChange={e => setDuration(e.target.value)} required style={{ width: '100%', padding: '8px', marginBottom: '10px' }} />

              <label>Calories Burned:</label>
              <input type="number" value={caloriesBurned} onChange={e => setCaloriesBurned(e.target.value)} required style={{ width: '100%', padding: '8px', marginBottom: '10px' }} />

              <label>Date & Time:</label>
              <input type="datetime-local" value={date} onChange={e => setDate(e.target.value)} required style={{ width: '100%', padding: '8px', marginBottom: '10px' }} />

              <button type="submit" style={{ padding: '10px 20px' }}>
                {workout ? "Update workout" : "Save Workout"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
