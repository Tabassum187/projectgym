import React, { useEffect, useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaTimes } from 'react-icons/fa';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

import Weight from './Weight';
import WeightHeightBMI from './Weight';

// Register all necessary chart components only once
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
  const navigate = useNavigate();
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

  const [foodLogs, setFoodLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [workouts, setWorkouts] = useState([]);


  
  useEffect(() => {
    // 1. LocalStorage se user information uthao
    const userInfo = localStorage.getItem('user_information');
    if (!userInfo) {
      console.error('User not logged in');
      setLoading(false);
      return;
    }

    // 2. Parse karo user info
    let userId;
    try {
      const user = JSON.parse(userInfo);
      userId = user._id || user.userId || user.email; // jo bhi aapka user id field ho
    } catch (e) {
      console.error('Invalid user_information format');
      setLoading(false);
      return;
    }

    // 3. API call karo userId ke sath
    axios.get(`http://localhost:3001/gym/foods/${userId}`)
      .then(res => {
        setFoodLogs(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching food logs:', err);
        setLoading(false);
      });

      axios.get(`http://localhost:3001/gym/workouts/${userId}`)
      .then(res => {
        setWorkouts(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching workouts:', err);
        setLoading(false);
      });
  }, []);

  // Redirect to login if user info not found
  useEffect(() => {
    const userInfo = localStorage.getItem('user_information');
    if (userInfo) {
      try {
        const parsed = JSON.parse(userInfo);
        setUserEmail(parsed.email);
        if (parsed.email !== 'admin@gmail.com') {
        }
      } catch (e) {
        console.error('Invalid user_information format');
        localStorage.removeItem('user_information');
        navigate('/login');
      }
    } else {
      navigate('/login');
    }
  }, [navigate]);

  // Fetch user data when profile popup opens
  useEffect(() => {
    if (showProfilePopup && userEmail && userEmail !== 'admin@gmail.com') {
      const fetchUserData = async () => {
        try {
          const response = await axios.get(`http://localhost:3001/gym/getuser/${userEmail}`);
          setUserData(response.data);
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      };
      fetchUserData();
    }
  }, [showProfilePopup, userEmail]);

  // Group calories by date
  const dailyCalories = foodLogs.reduce((acc, log) => {
    // Ensure date string only (remove time if any)
    const date = log.date.split('T')[0];
    acc[date] = (acc[date] || 0) + log.calories;
    return acc;
  }, {});

  const sortedDates = Object.keys(dailyCalories).sort();
  const calorieValues = sortedDates.map(date => dailyCalories[date]);

  const data = {
    labels: sortedDates,
    datasets: [
      {
        label: 'Calories Consumed',
        data: calorieValues,
        borderColor: '#4caf50',
        backgroundColor: 'rgba(76, 175, 80, 0.3)',
        tension: 0.3,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: 'Daily Calorie Intake' },
    },
  };

  const handleLogout = () => {
    const confirmed = window.confirm('Are you sure you want to logout?');
    if (confirmed) {
      localStorage.removeItem('user_information');
      setUserEmail(null);
      navigate('/login');
    }
  };

  if (!userEmail) return null;

  if (loading) return <p>Loading calorie data...</p>;

  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  if (!foodLogs.length) return <p>No food logs available.</p>;

  return (
    <div className="dark-theme">
      <div className="container-scroller">
        {/* Navbar */}
        <nav
          className="navbar default-layout-navbar col-lg-12 col-12 p-0 fixed-top d-flex align-items-center justify-content-between"
          style={{ backgroundColor: '#121212' }}
        >
          <div className="d-flex align-items-center pl-3">
            <a className="navbar-brand" href="/dashboard" style={{ fontWeight: 'bold' }}>
              <h2 className="text-white text-capitalize m-0">
                FitTrack<span style={{ color: '#FFD700' }}>Pro</span>
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

                      <i className="mdi mdi-menu-down ml-2" style={{ fontSize: 20, marginLeft: 6 }} />
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
                            if (userEmail === 'admin@gmail.com') {
                              navigate('/adminget');
                            } else {
                              setShowProfilePopup(true);
                            }
                            setDropdownOpen(false);
                          }}
                        >
                          <span role="img" aria-label="profile" style={{ marginRight: 8, fontSize: 20 }}>
                            👤
                          </span>
                          {userEmail === 'admin@gmail.com' ? 'Admin Panel' : 'Profile'}
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

        {/* Profile Popup */}
        {showProfilePopup && (
          <div
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0,0,0,0.7)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 2000,
            }}
          >
            <div
              ref={popupRef}
              style={{
                backgroundColor: '#1e1e1e',
                borderRadius: '10px',
                padding: '25px',
                width: '90%',
                maxWidth: '400px',
                position: 'relative',
                boxShadow: '0 0 20px rgba(255, 215, 0, 0.2)',
              }}
            >
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
                  padding: '5px',
                }}
              >
                <FaTimes />
              </button>

              <div style={{ textAlign: 'center', padding: '10px' }}>
                <div
                  style={{
                    width: '80px',
                    height: '80px',
                    borderRadius: '50%',
                    backgroundColor: '#ffd700',
                    color: '#1a1a1a',
                    fontWeight: 'bold',
                    fontSize: '40px',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '10px',
                  }}
                >
                  {userEmail.charAt(0).toUpperCase()}
                </div>

                {userData ? (
                  <>
                    <h3 style={{ color: '#ffd700', margin: '10px 0' }}>{userData.name}</h3>
                    <p style={{ color: '#ccc', fontSize: '14px', marginBottom: '20px' }}>
                      Email: {userData.email}
                    </p>
                    <p style={{ color: '#ccc', fontSize: '14px' }}>
                      Joined: {new Date(userData.createdAt).toLocaleDateString()}
                    </p>
                  </>
                ) : (
                  <p style={{ color: '#ccc' }}>Loading user data...</p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Sidebar */}
        <div
          className="container-fluid page-body-wrapper"
          style={{ marginTop: '60px', backgroundColor: '#121212' }}
        >
          <nav
            className="sidebar sidebar-offcanvas"
            id="sidebar"
            style={{
              width: '240px',
              backgroundColor: '#1e1e1e',
              minHeight: 'calc(100vh - 60px)',
              position: 'fixed',
              top: '60px',
              left: 0,
              paddingTop: '15px',
              overflowY: 'auto',
              zIndex: 1500,
            }}
          >
            <ul className="nav">
              <li className="nav-item">
                <Link
                  className={`nav-link d-flex align-items-center ${
                    showWorkout ? 'active' : ''
                  }`}
                  to="#"
                  onClick={() => {
                    setShowWorkout(!showWorkout);
                    setShowNutrition(false);
                    setShowProgress(false);
                    setShowsteps(false);
                  }}
                  style={{ color: 'white' }}
                >
                  <span className="menu-title" style={{ fontWeight: 'bold' }}>
                    Workout
                  </span>
                  <i className={`mdi mdi-chevron-${showWorkout ? 'up' : 'down'} ml-auto`} />
                </Link>
                {showWorkout && (
                  <ul className="sub-menu" style={{ paddingLeft: '15px' }}>
                    <li>
                      <Link to="/workout" style={{ color: 'white' }}>
                        Exercise
                      </Link>
                    </li>
                    <li>
                      <Link to="/gymplans" style={{ color: 'white' }}>
                        Gym Plans
                      </Link>
                    </li>
                  </ul>
                )}
              </li>

              <li className="nav-item">
                <Link
                  className={`nav-link d-flex align-items-center ${
                    showNutrition ? 'active' : ''
                  }`}
                  to="#"
                  onClick={() => {
                    setShowNutrition(!showNutrition);
                    setShowWorkout(false);
                    setShowProgress(false);
                    setShowsteps(false);
                  }}
                  style={{ color: 'white' }}
                >
                  <span className="menu-title" style={{ fontWeight: 'bold' }}>
                    Nutrition
                  </span>
                  <i className={`mdi mdi-chevron-${showNutrition ? 'up' : 'down'} ml-auto`} />
                </Link>
                {showNutrition && (
                  <ul className="sub-menu" style={{ paddingLeft: '15px' }}>
                    <li>
                      <Link to="/nutrition" style={{ color: 'white' }}>
                        Food Logs
                      </Link>
                    </li>
                    <li>
                      <Link to="/nutritiontracker" style={{ color: 'white' }}>
                        Nutrition Tracker
                      </Link>
                    </li>
                  </ul>
                )}
              </li>

              <li className="nav-item">
                <Link
                  className={`nav-link d-flex align-items-center ${
                    showProgress ? 'active' : ''
                  }`}
                  to="#"
                  onClick={() => {
                    setShowProgress(!showProgress);
                    setShowWorkout(false);
                    setShowNutrition(false);
                    setShowsteps(false);
                  }}
                  style={{ color: 'white' }}
                >
                  <span className="menu-title" style={{ fontWeight: 'bold' }}>
                    Progress
                  </span>
                  <i className={`mdi mdi-chevron-${showProgress ? 'up' : 'down'} ml-auto`} />
                </Link>
                {showProgress && (
                  <ul className="sub-menu" style={{ paddingLeft: '15px' }}>
                    <li>
                      <Link to="/weight" style={{ color: 'white' }}>
                        Weight
                      </Link>
                    </li>
                    <li>
                      <Link to="/stepstracker" style={{ color: 'white' }}>
                        Steps Tracker
                      </Link>
                    </li>
                    <li>
                      <Link to="/watertracker" style={{ color: 'white' }}>
                        Water Tracker
                      </Link>
                    </li>
                  </ul>
                )}
              </li>
            </ul>
          </nav>

          {/* Main Content */}
          <div
            className="main-panel"
            style={{ marginLeft: '240px', padding: '30px', minHeight: 'calc(100vh - 60px)', backgroundColor: '#121212' }}
          >
            {/* Admin view */}
            {userEmail === 'admin@gmail.com' ? (
              <div
                style={{
                  backgroundColor: '#1e1e1e',
                  padding: '40px',
                  borderRadius: '12px',
                  color: '#FFD700',
                  fontWeight: 'bold',
                  fontSize: '24px',
                  textAlign: 'center',
                }}
              >
                Admin Panel
              </div>
            ) : (
              <>
                {/* Calorie Chart */}
                <div
                  style={{
                    backgroundColor: '#1e1e1e',
                    padding: '20px',
                    borderRadius: '10px',
                    boxShadow: '0 0 15px rgba(255, 215, 0, 0.2)',
                  }}
                >
                  <Line data={data} options={options} />
                </div>

                {/* Other components like Weight can go here */}
                <WeightHeightBMI />

                <h3>Your Workout Logs</h3>
      <ul>
        {workouts.map(workout => (
          <li key={workout.id}>
            <strong>{workout.date}</strong>: {workout.activity} for {workout.duration} minutes
          </li>
        ))}
      </ul>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
