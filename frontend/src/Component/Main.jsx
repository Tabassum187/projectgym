import React, { useEffect, useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaTimes } from 'react-icons/fa';
import { Line, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function Main() {
  let navigate = useNavigate();
  const [userEmail, setUserEmail] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showProfilePopup, setShowProfilePopup] = useState(false);
  const [userData, setUserData] = useState(null);
  const dropdownRef = useRef(null);
  const popupRef = useRef(null);
  const [showWorkout, setShowWorkout] = useState(false);
  const [showNutrition, setShowNutrition] = useState(false);
  const [showProgress, setShowProgress] = useState(false);
  const [showsteps, setShowsteps] = useState(false);
  const [statsData, setStatsData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const userInfo = localStorage.getItem("user_information");
    if (userInfo) {
      try {
        const parsed = JSON.parse(userInfo);
        setUserEmail(parsed.email);
        if (parsed.email !== "admin@gmail.com") {
          fetchStatsData(parsed.email);
        }
      } catch (e) {
        console.error("Invalid user_information format");
        localStorage.removeItem("user_information");
      }
    } else {
      navigate('/login');
    }
  }, [navigate]);

 const fetchStatsData = async (email) => {
  setIsLoading(true);
  try {
    // Create fresh data objects with spread operator to ensure new references
    setStatsData({
      calories: [1800, 1900, 2100, 2000, 2200, 2300, 1950],
      workouts: [3, 5],
      weight: [
        { date: '1 Jan', value: 75 },
        { date: '15 Jan', value: 74.5 },
        { date: '1 Feb', value: 73.8 }
      ],
      water: {
        current: 2.1,
        goal: 2.5
      }
    });
    setIsLoading(false);
  } catch (error) {
    console.error("Error fetching stats data:", error);
    setIsLoading(false);
  }
};

  
  useEffect(() => {
    if (showProfilePopup && userEmail && userEmail !== "admin@gmail.com") {
      const fetchUserData = async () => {
        try {
          const response = await axios.get(`http://localhost:3001/gym/getuser/${userEmail}`);
          setUserData(response.data);
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      };
      fetchUserData();
    }
  }, [showProfilePopup, userEmail]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
      if (showProfilePopup && popupRef.current && !popupRef.current.contains(event.target)) {
        setShowProfilePopup(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showProfilePopup]);

  const caloriesData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [{
      label: 'Calories Consumed',
      data: statsData?.calories || [0, 0, 0, 0, 0, 0, 0],
      borderColor: '#FFD700',
      backgroundColor: 'rgba(255, 215, 0, 0.1)',
      tension: 0.4,
      fill: true
    }]
  };

  const workoutData = {
    labels: ['Last Week', 'This Week'],
    datasets: [{
      label: 'Workouts',
      data: statsData?.workouts || [0, 0],
      backgroundColor: ['#4CAF50', '#2E7D32'],
      borderColor: ['#4CAF50', '#2E7D32'],
      borderWidth: 1
    }]
  };

  const weightData = {
    labels: statsData?.weight?.map(item => item.date) || ['Jan', 'Feb', 'Mar'],
    datasets: [{
      label: 'Weight (kg)',
      data: statsData?.weight?.map(item => item.value) || [0, 0, 0],
      borderColor: '#2196F3',
      backgroundColor: 'rgba(33, 150, 243, 0.1)',
      tension: 0.4
    }]
  };

  const waterData = {
    labels: ['Water Intake'],
    datasets: [{
      label: 'Today',
      data: [statsData?.water?.current || 0],
      backgroundColor: ['#FFC107'],
      borderColor: ['#FFA000'],
      borderWidth: 1
    }, {
      label: 'Goal',
      data: [statsData?.water?.goal || 2.5],
      backgroundColor: ['#FFE082'],
      borderColor: ['#FFD54F'],
      borderWidth: 1
    }]
  };

 const chartOptions = {
  responsive: true,
  animation: {
    duration: 2000,
    animateScale: true,
    animateRotate: true
  },
  plugins: {
    legend: {
      display: false
    }
  },
  scales: {
    x: {
      ticks: {
        color: '#aaa'
      },
      grid: {
        color: 'rgba(255,255,255,0.1)'
      }
    },
    y: {
      ticks: {
        color: '#aaa'
      },
      grid: {
        color: 'rgba(255,255,255,0.1)'
      },
      beginAtZero: false
    }
  },
  maintainAspectRatio: false
};


  const handleLogout = () => {
    const confirmed = window.confirm("Are you sure you want to logout?");
    if (confirmed) {
      localStorage.removeItem("user_information");
      setUserEmail(null);
      navigate('/login');
    }
  };

  if (!userEmail) {
    return null;
  }

  return (
    <div className="dark-theme">
      <div className="container-scroller">
        <nav
          className="navbar default-layout-navbar col-lg-12 col-12 p-0 fixed-top d-flex align-items-center justify-content-between"
          style={{ backgroundColor: "#121212" }}
        >
          <div className="d-flex align-items-center pl-3">
            <a className="navbar-brand" href="/dashboard" style={{ fontWeight: 'bold' }}>
              <h2 className="text-white text-capitalize m-0">
                <i />FitTrack<span style={{ color: '#FFD700' }}>Pro</span>
              </h2>
            </a>
          </div>

          <div className="navbar-menu-wrapper d-flex align-items-center justify-content-end flex-grow">
            <ul className="navbar-nav navbar-nav-right d-flex align-items-center" style={{ position: 'relative' }}>
              <li className="nav-item">
                <Link className="nav-link" to="/notifications">
                  <i className="mdi mdi-bell-outline text-white"></i>
                  <span className="count-symbol bg-danger"></span>
                </Link>
              </li>

              <li 
                className="nav-item d-none d-lg-flex align-items-center ml-3 position-relative" 
                ref={dropdownRef}
                style={{ userSelect: 'none' }}
              >
                {userEmail && (
                  <>
                    <div
                      onClick={() => setDropdownOpen(!dropdownOpen)}
                      className="d-flex align-items-center text-white"
                      style={{ cursor: 'pointer' }}
                      title="User Menu"
                    >
                      <div
                        style={{
                          width: 32,
                          height: 32,
                          borderRadius: '50%',
                          backgroundColor: '#FFD700',
                          color: '#121212',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontWeight: 'bold',
                          marginRight: 8,
                          fontSize: 16,
                          textTransform: 'uppercase',
                        }}
                      >
                        {userEmail.charAt(0)}
                      </div>

                      <i 
                        className="mdi mdi-menu-down ml-2" 
                        style={{ fontSize: 20, marginLeft: 6 }} 
                      />
                    </div>

                    {dropdownOpen && (
                      <div
                        style={{
                          position: 'absolute',
                          top: '100%',
                          right: 0,
                          backgroundColor: '#1e1e1e',
                          borderRadius: 6,
                          boxShadow: '0 4px 12px rgba(0,0,0,0.5)',
                          marginTop: 8,
                          minWidth: 180,
                          zIndex: 1000,
                          padding: '8px 0',
                        }}
                      >
                        <div
                          className="dropdown-item d-flex align-items-center"
                          style={{
                            padding: '10px 20px',
                            color: 'white',
                            cursor: 'pointer',
                            fontSize: 15,
                          }}
                          onClick={() => {
                            if (userEmail === "admin@gmail.com") {
                              navigate("/adminget");
                            } else {
                              setShowProfilePopup(true);
                            }
                            setDropdownOpen(false);
                          }}
                        >
                          <span role="img" aria-label="profile" style={{ marginRight: 8, fontSize: 20 }}>
                            👤
                          </span>
                          {userEmail === "admin@gmail.com" ? "Admin Panel" : "Profile"}
                        </div>
                        
                        <div
                          className="dropdown-item d-flex align-items-center"
                          style={{
                            padding: '10px 20px',
                            color: 'white',
                            cursor: 'pointer',
                            borderTop: '1px solid #333',
                            fontSize: 15,
                          }}
                          onClick={handleLogout}
                        >
                          <span role="img" aria-label="logout" style={{ marginRight: 8, fontSize: 20 }}>
                            🔓
                          </span>
                          Logout
                        </div>
                      </div>
                    )}
                  </>
                )}
              </li>
            </ul>
          </div>
        </nav>

        {showProfilePopup && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 2000
          }}>
            <div ref={popupRef} style={{
              backgroundColor: '#1e1e1e',
              borderRadius: '10px',
              padding: '25px',
              width: '90%',
              maxWidth: '400px',
              position: 'relative',
              boxShadow: '0 0 20px rgba(255, 215, 0, 0.2)'
            }}>
              <button 
                onClick={() => setShowProfilePopup(false)}
                style={{
                  position: 'absolute',
                  top: '15px',
                  right: '15px',
                  background: 'transparent',
                  border: 'none',
                  color: '#ffd700',
                  fontSize: '24px',
                  cursor: 'pointer',
                  padding: '5px'
                }}
              >
                <FaTimes />
              </button>
              
              <div style={{ textAlign: 'center', padding: '10px' }}>
                <div style={{
                  width: '80px',
                  height: '80px',
                  borderRadius: '50%',
                  backgroundColor: '#ffd700',
                  color: '#1a1a1a',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '2rem',
                  fontWeight: 'bold',
                  marginBottom: '20px'
                }}>
                  {userEmail?.charAt(0).toUpperCase()}
                </div>
                
                <div style={{ 
                  backgroundColor: '#252525',
                  borderRadius: '8px',
                  padding: '15px',
                  marginBottom: '15px'
                }}>
                  <div>
                    <p style={{ color: '#aaaaaa', marginBottom: '5px', fontSize: '0.9rem' }}>Email</p>
                    <p style={{ color: '#ffffff', wordBreak: 'break-all', fontSize: '1rem' }}>
                      {userEmail}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="container-fluid page-body-wrapper">
          <nav
            className="sidebar sidebar-offcanvas"
            id="sidebar"
            style={{ backgroundColor: "#121212", paddingTop: "5px" }}
          >
            <ul className="nav flex-column" style={{ paddingBottom: "15px" }}>
              <li className="nav-item section-header mb-1">
                <span className="nav-link text-muted text-uppercase small font-weight-bold">
                  <span className="menu-title" style={{ fontSize: "15px" }}>Main Menu</span>
                </span>
              </li>

              <li className="nav-item mb-1">
                <Link className="nav-link text-white font-weight-bold" style={{ fontSize: "15.5px" }} to="/dashboard">
                  📊 Dashboard
                </Link>
              </li>

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

              <li className="nav-item mb-1">
                <Link className="nav-link text-white font-weight-bold" style={{ fontSize: "15.5px" }} to="/goals">
                  🎯 Goals
                </Link>
              </li>

              <li className="nav-item mb-1">
                <Link className="nav-link text-white font-weight-bold" style={{ fontSize: "15.5px" }} to="/reminder">
                  🚨 Reminders
                </Link>
              </li>

              <li className="nav-item section-header mt-2 mb-1">
                <span className="nav-link text-muted text-uppercase small font-weight-bold">
                  <span className="menu-title" style={{ fontSize: "15px" }}>Others</span>
                </span>
              </li>

              <li className="nav-item mb-1">
                <Link className="nav-link text-white font-weight-bold" style={{ fontSize: "15.5px" }} to="/settings">
                  ⚙️ Settings
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link text-white font-weight-bold" style={{ fontSize: "15.5px" }} to="/support">
                  ❓ Support
                </Link>
              </li>
            </ul>
          </nav>

          <div className="main-panel">
            <div className="content-wrapper">
              {userEmail === "admin@gmail.com" ? (
                <>
                  <div className="row">
                    <div className="col-12">
                      <div className="welcome-banner p-4 bg-dark-gradient rounded">
                        <h2 className="text-dark">Welcome Admin!</h2>
                        <p className="text-dark">Manage your fitness application</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="row mt-4">
                    <div className="col-12 grid-margin">
                      <div className="card bg-dark">
                        <div className="card-body">
                          <h4 className="card-title text-white mb-4">Admin Dashboard</h4>
                          <div className="row">
                            <div className="col-md-4 mb-4">
                              <Link to="/adminget" className="btn btn-block btn-outline-primary py-3">
                                <i className="mdi mdi-account-multiple icon-lg"></i>
                                <span className="d-block mt-2">Manage Users</span>
                              </Link>
                            </div>
                            <div className="col-md-4 mb-4">
                              <Link to="/foodlist" className="btn btn-block btn-outline-success py-3">
                                <i className="mdi mdi-dumbbell icon-lg"></i>
                                <span className="d-block mt-2">Manage Nutritions</span>
                              </Link>
                            </div>
                            <div className="col-md-4 mb-4">
                              <Link to="/progresswork" className="btn btn-block btn-outline-info py-3">
                                <i className="mdi mdi-food icon-lg"></i>
                                <span className="d-block mt-2">Manage Progress</span>
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="row">
                    <div className="col-12">
                      <div className="welcome-banner p-4 bg-dark-gradient rounded">
                        <div className="d-flex justify-content-between align-items-center">
                          <div>
                            <h2 className="text-dark">Welcome back, Fitness Enthusiast!</h2>
                            <p className="text-dark">Track your fitness journey and achieve your goals</p>
                          </div>
                          <div>
                            <Link
                              to="/work"
                              className="btn mr-2"
                              style={{ backgroundColor: '#FFC107', color: 'black' }}
                            >
                              <i className="mdi mdi-plus"></i> Add Workout
                            </Link>
                            <Link
                              to="/food"
                              className="btn"
                              style={{ backgroundColor: '#FFC107', color: 'black' }}
                            >
                              <i className="mdi mdi-food"></i> Log Meal
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                 <div className="row mt-4">
  {/* Calories Card */}
  <div className="col-xl-3 col-lg-6 col-sm-6 grid-margin stretch-card">
    <div className="card bg-dark">
      <div className="card-body text-center">
        <h5 className="mb-2 text-light font-weight-normal">Today's Calories</h5>
        <h2 className="mb-4 text-white font-weight-bold">
          {isLoading ? '...' : (statsData?.calories?.[statsData.calories.length - 1] || 0)}
        </h2>
        {/* PASTE CALORIES CHART CODE HERE */}
        <div style={{ height: '150px' }}>
          {isLoading ? (
            <div className="d-flex justify-content-center align-items-center h-100">
              <div className="spinner-border text-warning" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            </div>
          ) : (
            <Line 
              key={`calories-${statsData?.calories?.join('-')}`}
              data={caloriesData} 
              options={chartOptions} 
            />
          )}
        </div>
        <p className="mt-4 mb-0 text-muted">Remaining</p>
        <h3 className="mb-0 font-weight-bold mt-2 text-white">
          {isLoading ? '...' : (2500 - (statsData?.calories?.[statsData.calories.length - 1] || 0))}
        </h3>
      </div>
    </div>
  </div>

  {/* Workouts Card */}
  <div className="col-xl-3 col-lg-6 col-sm-6 grid-margin stretch-card">
    <div className="card bg-dark">
      <div className="card-body text-center">
        <h5 className="mb-2 text-light font-weight-normal">Workouts This Week</h5>
        <h2 className="mb-4 text-white font-weight-bold">
          {isLoading ? '...' : (statsData?.workouts?.[1] || 0)}
        </h2>
        {/* PASTE WORKOUTS CHART CODE HERE */}
        <div style={{ height: '150px' }}>
          {isLoading ? (
            <div className="d-flex justify-content-center align-items-center h-100">
              <div className="spinner-border text-success" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            </div>
          ) : (
            <Bar 
              key={`workouts-${statsData?.workouts?.join('-')}`}
              data={workoutData} 
              options={chartOptions} 
            />
          )}
        </div>
        <p className="mt-4 mb-0 text-muted">Last workout</p>
        <h3 className="mb-0 font-weight-bold mt-2 text-white">
          {isLoading ? '...' : '2 days ago'}
        </h3>
      </div>
    </div>
  </div>

  {/* Weight Card */}
  <div className="col-xl-3 col-lg-6 col-sm-6 grid-margin stretch-card">
    <div className="card bg-dark">
      <div className="card-body text-center">
        <h5 className="mb-2 text-light font-weight-normal">Current Weight</h5>
        <h2 className="mb-4 text-white font-weight-bold">
          {isLoading ? '...' : (statsData?.weight?.[statsData.weight.length - 1]?.value || 0)} kg
        </h2>
        {/* PASTE WEIGHT CHART CODE HERE */}
        <div style={{ height: '150px' }}>
          {isLoading ? (
            <div className="d-flex justify-content-center align-items-center h-100">
              <div className="spinner-border text-info" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            </div>
          ) : (
            <Line 
              key={`weight-${statsData?.weight?.map(w => w.value).join('-')}`}
              data={weightData} 
              options={{
                ...chartOptions,
                scales: {
                  ...chartOptions.scales,
                  y: {
                    ...chartOptions.scales.y,
                    min: Math.min(...(statsData?.weight?.map(w => w.value) || [0])) - 2,
                    max: Math.max(...(statsData?.weight?.map(w => w.value) || [0])) + 2
                  }
                }
              }} 
            />
          )}
        </div>
        <p className="mt-4 mb-0 text-muted">Change this month</p>
        <h3 className="mb-0 font-weight-bold mt-2 text-white">
          {isLoading ? '...' : '-1.2 kg'}
        </h3>
      </div>
    </div>
  </div>

                    <div className="col-xl-3 col-lg-6 col-sm-6 grid-margin stretch-card">
                      <div className="card bg-dark">
                        <div className="card-body text-center">
                          <h5 className="mb-2 text-light font-weight-normal">Water Intake</h5>
                          <h2 className="mb-4 text-white font-weight-bold">
                            {isLoading ? '...' : (statsData?.water?.current || 0)} L
                          </h2>
                          <div style={{ height: '150px' }}>
                            {isLoading ? (
                              <div className="d-flex justify-content-center align-items-center h-100">
                                <div className="spinner-border text-warning" role="status">
                                  <span className="sr-only">Loading...</span>
                                </div>
                              </div>
                            ) : (
                              <Bar data={waterData} options={{...chartOptions, indexAxis: 'y'}} />
                            )}
                          </div>
                          <p className="mt-4 mb-0 text-muted">Daily goal</p>
                          <h3 className="mb-0 font-weight-bold mt-2 text-white">
                            {isLoading ? '...' : (statsData?.water?.goal || 2.5)} L
                          </h3>
                        </div>
                      </div>
                    </div>
                  </div>
   
                  <div className="row">
                    <div className="col-12 grid-margin">
                      <div className="card bg-dark">
                        <div className="card-body">
                          <div className="d-flex justify-content-between align-items-center mb-4">
                            <h4 className="card-title text-white">Recent Activity</h4>
                            <Link to="/activity" className="btn btn-sm btn-outline-light">View All</Link>
                          </div>
                          <div className="table-responsive">
                            <table className="table table-dark">
                              <thead>
                                <tr>
                                  <th>Date</th>
                                  <th>Activity</th>
                                  <th>Type</th>
                                  <th>Details</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td>Today, 08:30 AM</td>
                                  <td>Morning Run</td>
                                  <td><span className="badge badge-primary">Cardio</span></td>
                                  <td>5.2 km in 28:15</td>
                                </tr>
                                <tr>
                                  <td>Yesterday, 07:15 PM</td>
                                  <td>Chest & Triceps</td>
                                  <td><span className="badge badge-success">Strength</span></td>
                                  <td>12 exercises, 45 min</td>
                                </tr>
                                <tr>
                                  <td>Yesterday, 12:30 PM</td>
                                  <td>Lunch</td>
                                  <td><span className="badge badge-info">Nutrition</span></td>
                                  <td>Grilled chicken, rice, veggies - 650 kcal</td>
                                </tr>
                                <tr>
                                  <td>2 days ago, 06:45 AM</td>
                                  <td>Yoga Session</td>
                                  <td><span className="badge badge-warning">Flexibility</span></td>
                                  <td>30 min morning flow</td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
              
                  <div className="row">
                    <div className="col-12">
                      <div className="card bg-dark">
                        <div className="card-body">
                          <h4 className="card-title text-white mb-4">Quick Actions</h4>
                          <div className="row">
                            <div className="col-md-3 col-6 mb-4">
                              <Link to="/work" className="btn btn-block btn-outline-primary py-3">
                                <i className="mdi mdi-dumbbell icon-lg"></i>
                                <span className="d-block mt-2">Add Workout</span>
                              </Link>
                            </div>
                            <div className="col-md-3 col-6 mb-4">
                              <Link to="/food" className="btn btn-block btn-outline-success py-3">
                                <i className="mdi mdi-food icon-lg"></i>
                                <span className="d-block mt-2">Log Meal</span>
                              </Link>
                            </div>
                            <div className="col-md-3 col-6 mb-4">
                              <Link to="/reminder" className="btn btn-block btn-outline-info py-3">
                                <i className="mdi mdi-ruler icon-lg"></i>
                                <span className="d-block mt-2">Add Reminders</span>
                              </Link>
                            </div>
                            <div className="col-md-3 col-6 mb-4">
                              <Link to="/goals" className="btn btn-block btn-outline-warning py-3">
                                <i className="mdi mdi-flag-checkered icon-lg"></i>
                                <span className="d-block mt-2">Set Goal</span>
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
                      
            <footer style={{ backgroundColor: '#111', color: '#fff', padding: '20px 0' }}>
              <div className="container text-center">
                <h4 style={{ fontWeight: 'bold', color: '#FFD700', marginBottom: '10px' }}>FitTrackPro</h4>
                <p style={{ marginBottom: '5px', fontSize: '14px' }}>
                  &copy; {new Date().getFullYear()} FitTrackPro. All rights reserved.
                </p>
                <p style={{ fontSize: '14px' }}>Contact: info@fittrackpro.com | +1 (409) 987–5874</p>
              </div>
            </footer>
          </div>
        </div>
      </div>
    </div>
  );
}