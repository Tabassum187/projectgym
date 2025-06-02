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
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

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
    <div className="dark-theme">
      <ToastContainer position="bottom-right" autoClose={3000} />

      {/* Navbar */}
      <nav className="navbar default-layout-navbar fixed-top d-flex justify-content-between" style={{ backgroundColor: "#121212" }}>
        <div className="d-flex align-items-center pl-3">
          <a className="navbar-brand" href="/dashboard" style={{ fontWeight: 'bold' }}>
            <h2 className="text-white m-0">FitTrack<span style={{ color: '#FFD700' }}>Pro</span></h2>
          </a>
        </div>
        <div className="d-flex align-items-center pr-3">
          <Link className="nav-link text-white" to="/notifications">
            <i className="mdi mdi-bell-outline"></i>
          </Link>
          <div className="nav-item ml-3 position-relative" ref={dropdownRef}>
            <div onClick={() => setDropdownOpen(!dropdownOpen)} className="d-flex align-items-center text-white" style={{ cursor: 'pointer' }}>
              <div
                style={{
                  width: 32, height: 32, borderRadius: '50%', backgroundColor: '#FFD700',
                  color: '#121212', display: 'flex', alignItems: 'center',
                  justifyContent: 'center', fontWeight: 'bold', marginRight: 8, fontSize: 16
                }}
              >
                {userEmail.charAt(0)}
              </div>
              <i className="mdi mdi-menu-down ml-2" style={{ fontSize: 20 }} />
            </div>
            {dropdownOpen && (
              <div style={{
                position: 'absolute', top: '100%', right: 0, backgroundColor: '#1e1e1e',
                borderRadius: 6, boxShadow: '0 4px 12px rgba(0,0,0,0.5)', marginTop: 8,
                minWidth: 180, zIndex: 1000, padding: '8px 0'
              }}>
                <div
                  className="dropdown-item d-flex align-items-center"
                  style={{ padding: '10px 20px', color: 'white', cursor: 'pointer', fontSize: 15 }}
                  onClick={() => {
                    if (userEmail === "admin@gmail.com") navigate("/adminget");
                    else toast.info("Profile feature coming soon!");
                    setDropdownOpen(false);
                  }}
                >
                  👤 {userEmail === "admin@gmail.com" ? "Admin Panel" : "Profile"}
                </div>
                <div
                  className="dropdown-item d-flex align-items-center"
                  style={{ padding: '10px 20px', color: 'white', cursor: 'pointer', borderTop: '1px solid #333', fontSize: 15 }}
                  onClick={handleLogout}
                >
                  🔓 Logout
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Form */}
      <div className="container-fluid page-body-wrapper" style={{ paddingTop: 80 }}>
        <h3>{workout ? "Update workout" : "Add New workout"}</h3>
        <form onSubmit={handleSubmit} style={{ maxWidth: '500px' }}>
          <label>Workout Type:</label>
          <select value={workoutType} onChange={handleWorkoutTypeChange} required>
            <option value="">Select</option>
            {Object.keys(workoutOptions).map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>

          <label>Workout Name:</label>
          <select value={name} onChange={(e) => setName(e.target.value)} required>
            <option value="">Select</option>
            {workoutOptions[workoutType]?.map((workoutName) => (
              <option key={workoutName} value={workoutName}>{workoutName}</option>
            ))}
          </select>

          <label>Duration (minutes):</label>
          <input
            type="number"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            required
          />

          <label>Calories Burned:</label>
          <input
            type="number"
            value={caloriesBurned}
            onChange={(e) => setCaloriesBurned(e.target.value)}
            required
          />

          <label>Date & Time:</label>
          <input
            type="datetime-local"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />

          <button type="submit">{workout ? "Update workout" : "Save Workout"}</button>
        </form>
      </div>
    </div>
  );
}