import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

// Helper functions
function formatDate(date) {
  if (!date) return '';
  const d = new Date(date);
  return d.toISOString().substring(0, 10);
}

const WorkoutList = () => {
  const [showWorkout, setShowWorkout] = useState(false);
  const [showNutrition, setShowNutrition] = useState(false);
  const [showProgress, setShowProgress] = useState(false);
  const [showsteps, setShowsteps] = useState(false);
  const [workoutLogs, setWorkoutLogs] = useState([]);
  const [editItem, setEditItem] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    workoutType: '',
    duration: '',
    caloriesBurned: '',
    date: ''
  });
  const [showPopup, setShowPopup] = useState(false);
  const [searchName, setSearchName] = useState('');
  const [searchWorkoutType, setSearchWorkoutType] = useState('');

  // Get userId from localStorage
  const userInformation = JSON.parse(localStorage.getItem('user_information'));
  const userId = userInformation?._id;

  // Fetch workout logs for the logged-in user
  useEffect(() => {
    if (!userId) return;

    const fetchWorkoutLogs = async () => {
      try {
        const res = await axios.get(`http://localhost:3001/gym/workout?userId=${userId}`);
        setWorkoutLogs(res.data || []);
      } catch (error) {
        console.error("Error fetching workout logs:", error.message);
        toast.error("Failed to fetch workout logs");
      }
    };

    fetchWorkoutLogs();
  }, [userId]);

  const handleDelete = async (id) => {
    if (window.confirm('Delete this workout log?')) {
      try {
        await axios.delete(`http://localhost:3001/gym/workout/${id}`);
        // Refresh list after delete
        const res = await axios.get(`http://localhost:3001/gym/workout?userId=${userId}`);
        setWorkoutLogs(res.data || []);
        toast.success("Workout deleted successfully");
      } catch (error) {
        console.error("Delete failed:", error);
        toast.error("Failed to delete workout");
      }
    }
  };

  const openEditModal = (log) => {
    setEditItem(log._id);
    setFormData({
      name: log.name || '',
      workoutType: log.workoutType || '',
      duration: log.duration || '',
      caloriesBurned: log.caloriesBurned || '',
      date: log.date ? new Date(log.date).toISOString().substring(0, 10) : ''
    });
    setShowPopup(true);
  };

  const closeModal = () => {
    setEditItem(null);
    setFormData({
      name: '',
      workoutType: '',
      duration: '',
      caloriesBurned: '',
      date: ''
    });
    setShowPopup(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    if (!editItem) return;

    const updatedData = {
      name: formData.name,
      workoutType: formData.workoutType,
      duration: Number(formData.duration),
      caloriesBurned: Number(formData.caloriesBurned),
      date: new Date(formData.date).toISOString()
    };

    try {
      await axios.put(`http://localhost:3001/gym/workout/${editItem}`, updatedData);
      closeModal();
      const res = await axios.get(`http://localhost:3001/gym/workout?userId=${userId}`);
      setWorkoutLogs(res.data || []);
      toast.success("Workout updated successfully");
    } catch (error) {
      console.error("Update failed:", error);
      toast.error("Failed to update workout");
    }
  };

  // Filtered workout logs based on search
  const filteredLogs = workoutLogs.filter(log => {
    if (!log) return false;
    const nameMatch = log.name?.toLowerCase().includes(searchName.toLowerCase());
    const typeMatch = !searchWorkoutType || log.workoutType === searchWorkoutType;
    return nameMatch && typeMatch;
  });

  const handleLogout = () => {
    const confirmed = window.confirm("Are you sure you want to logout?");
    if (confirmed) {
      localStorage.removeItem("user_information");
      window.location.href = '/login';
    }
  };

  return (
    <div style={{ 
      backgroundImage: "url('https://cdn.shopify.com/s/files/1/0561/9253/2651/files/InlineImage1.jpg?v=1628756402')",
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
                      <Link className="nav-link text-white py-1" style={{ fontSize: "14px" }} to="/">
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
          
                <li className="nav-item mb-1">
                  <div
                    className="nav-link text-white font-weight-bold d-flex justify-content-between align-items-center"
                    style={{ fontSize: "15.5px", cursor: "pointer" }}
                    onClick={() => setShowsteps(!showsteps)}
                  >
                    📈 Step Count<span>{showProgress ? "▲" : "▼"}</span>
                  </div>
                  {showsteps && (
                    <div className="pl-3">
                      <Link className="nav-link text-white py-1" style={{ fontSize: "14px" }} to="">
                        ➕ Add Steps
                      </Link>
                      <Link className="nav-link text-white py-1" style={{ fontSize: "14px" }} to="">
                        👀 View Steps
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
            <div className="main-panel" style={{ backgroundColor: 'transparent' }}>
              <div className="content-wrapper" style={{ backgroundColor: 'transparent' }}>
                <div className="workout-list-container" style={{
                  backgroundColor: 'rgba(30, 30, 30, 0.9)',
                  borderRadius: '12px',
                  padding: '30px',
                  margin: '30px auto',
                  boxShadow: '0 0 20px rgba(0, 0, 0, 0.5)',
                  zIndex: 1,
                  position: 'relative',
                  maxWidth: '1200px'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                    <h2 style={{ color: '#ffd700', margin: 0 }}>Your Workouts</h2>
                    <Link to="/work" style={{ textDecoration: 'none' }}>
                      <button style={{
                        backgroundColor: '#ffcc00',
                        color: '#121212',
                        padding: '10px 20px',
                        border: 'none',
                        borderRadius: '6px',
                        fontWeight: 'bold',
                        cursor: 'pointer'
                      }}>
                        ➕ Add Workout
                      </button>
                    </Link>
                  </div>

                  {/* Filters */}
                  <div style={{ display: 'flex', gap: '15px', marginBottom: '20px', flexWrap: 'wrap' }}>
                    <input
                      type="text"
                      placeholder="Search by name..."
                      value={searchName}
                      onChange={(e) => setSearchName(e.target.value)}
                      style={{
                        padding: '10px 15px',
                        backgroundColor: '#2a2a2a',
                        border: '1px solid #444',
                        borderRadius: '6px',
                        color: 'white',
                        fontSize: '16px',
                        flex: '1',
                        minWidth: '200px'
                      }}
                    />
                    <select
                      value={searchWorkoutType}
                      onChange={(e) => setSearchWorkoutType(e.target.value)}
                      style={{
                        padding: '10px 15px',
                        backgroundColor: '#2a2a2a',
                        border: '1px solid #444',
                        borderRadius: '6px',
                        color: 'white',
                        fontSize: '16px',
                        minWidth: '200px'
                      }}
                    >
                      <option value="">All Workout Types</option>
                      <option value="Strength Training">Strength Training</option>
                      <option value="Yoga">Yoga</option>
                      <option value="HIIT">HIIT</option>
                      <option value="Cardio">Cardio</option>
                    </select>
                  </div>

                  {/* Workout Cards */}
                  <div style={{ 
                    display: 'grid', 
                    gap: '20px', 
                    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))'
                  }}>
                    {filteredLogs.length > 0 ? (
                      filteredLogs.map(log => (
                        <div
                          key={log._id}
                          style={{
                            backgroundColor: '#1e1e1e',
                            padding: '20px',
                            borderRadius: '10px',
                            color: 'white',
                            boxShadow: '0 4px 8px rgba(0,0,0,0.3)'
                          }}
                        >
                          <p style={{ margin: '5px 0', fontSize: '16px' }}><strong>Date:</strong> {formatDate(log.date)}</p>
                          <p style={{ margin: '5px 0', fontSize: '16px' }}><strong>Name:</strong> {log.name}</p>
                          <p style={{ margin: '5px 0', fontSize: '16px' }}><strong>Type:</strong> {log.workoutType}</p>
                          <p style={{ margin: '5px 0', fontSize: '16px' }}><strong>Duration:</strong> {log.duration} min</p>
                          <p style={{ margin: '5px 0', fontSize: '16px' }}><strong>Calories:</strong> {log.caloriesBurned}</p>
                          <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', marginTop: '15px' }}>
                            <button
                              onClick={() => openEditModal(log)}
                              style={{ 
                                backgroundColor: '#ffc107', 
                                padding: '8px 12px', 
                                borderRadius: '5px',
                                border: 'none',
                                cursor: 'pointer'
                              }}
                            >
                              ✏️ Edit
                            </button>
                            <button
                              onClick={() => handleDelete(log._id)}
                              style={{ 
                                backgroundColor: '#dc3545', 
                                padding: '8px 12px', 
                                borderRadius: '5px',
                                border: 'none',
                                cursor: 'pointer',
                                color: 'white'
                              }}
                            >
                              🗑️ Delete
                            </button>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div style={{ 
                        gridColumn: '1 / -1', 
                        textAlign: 'center', 
                        padding: '40px',
                        color: '#aaa'
                      }}>
                        <p style={{ fontSize: '18px' }}>No workout logs found. Add your first workout!</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      {showPopup && (
        <div
          style={{
            position: 'fixed',
            top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.8)',
            display: 'flex', justifyContent: 'center', alignItems: 'center',
            zIndex: 1000
          }}
        >
          <div
            style={{
              backgroundColor: '#121212',
              padding: '30px',
              borderRadius: '10px',
              width: '90%',
              maxWidth: '500px',
              color: 'white'
            }}
          >
            <h3 style={{ color: '#ffd700', marginBottom: '20px' }}>Edit Workout</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '5px' }}>Date</label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  style={{
                    width: '100%',
                    padding: '10px',
                    backgroundColor: '#2a2a2a',
                    border: '1px solid #444',
                    borderRadius: '6px',
                    color: 'white'
                  }}
                />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '5px' }}>Workout Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Workout Name"
                  style={{
                    width: '100%',
                    padding: '10px',
                    backgroundColor: '#2a2a2a',
                    border: '1px solid #444',
                    borderRadius: '6px',
                    color: 'white'
                  }}
                />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '5px' }}>Workout Type</label>
                <select
                  name="workoutType"
                  value={formData.workoutType}
                  onChange={handleChange}
                  style={{
                    width: '100%',
                    padding: '10px',
                    backgroundColor: '#2a2a2a',
                    border: '1px solid #444',
                    borderRadius: '6px',
                    color: 'white'
                  }}
                >
                  <option value="">Select Type</option>
                  <option value="Strength Training">Strength Training</option>
                  <option value="Yoga">Yoga</option>
                  <option value="HIIT">HIIT</option>
                  <option value="Cardio">Cardio</option>
                </select>
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '5px' }}>Duration (minutes)</label>
                <input
                  type="number"
                  name="duration"
                  value={formData.duration}
                  onChange={handleChange}
                  placeholder="Duration (min)"
                  style={{
                    width: '100%',
                    padding: '10px',
                    backgroundColor: '#2a2a2a',
                    border: '1px solid #444',
                    borderRadius: '6px',
                    color: 'white'
                  }}
                />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '5px' }}>Calories Burned</label>
                <input
                  type="number"
                  name="caloriesBurned"
                  value={formData.caloriesBurned}
                  onChange={handleChange}
                  placeholder="Calories Burned"
                  style={{
                    width: '100%',
                    padding: '10px',
                    backgroundColor: '#2a2a2a',
                    border: '1px solid #444',
                    borderRadius: '6px',
                    color: 'white'
                  }}
                />
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '20px' }}>
                <button 
                  onClick={closeModal}
                  style={{
                    padding: '10px 20px',
                    backgroundColor: '#444',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'pointer'
                  }}
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  style={{
                    padding: '10px 20px',
                    backgroundColor: '#ffcc00',
                    color: '#121212',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontWeight: 'bold'
                  }}
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <ToastContainer position="bottom-right" autoClose={3000} />
    </div>
  );
};

export default WorkoutList;