import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Main() {
  let navigate = useNavigate();
  const [userEmail, setUserEmail] = useState(null);

  useEffect(() => {
    const userInfo = localStorage.getItem("user_information");
    if (userInfo) {
      try {
        const parsed = JSON.parse(userInfo);
        setUserEmail(parsed.email);
      } catch (e) {
        console.error("Invalid user_information format");
        localStorage.removeItem("user_information");
      }
    } else {
      // If not logged in, redirect to login page
      navigate('/login');
    }
  }, [navigate]);

  const handleLogout = (e) => {
    e.preventDefault();
    let confirmed = window.confirm("Are you sure you want to logout?");
    if (confirmed) {
      localStorage.removeItem("user_information");
      setUserEmail(null);
      navigate('/login');
    }
  };

  // If not logged in, return null or loading
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
  {/* Logo and Brand */}
  <div className="d-flex align-items-center pl-3">
    <Link
      className="navbar-brand brand-logo"
      to="/"
      style={{ color: "yellow", fontSize: "26px", fontWeight: "bold", textDecoration: "none" }}
    >
      <span className="text-warning">  🏋️‍♀️FitTrack</span>Pro💪
    </Link>
  </div>

  {/* Navbar Items */}
  <div className="navbar-menu-wrapper d-flex align-items-center justify-content-end flex-grow">

<div className="search-field d-none d-xl-block mx-auto" style={{ width: "520px" }}>
  <form className="d-flex align-items-center h-100" action="#">
    <div className="input-group">
      <div className="input-group-prepend bg-transparent">
        <span className="input-group-text border-0 bg-transparent">
          <i className="mdi mdi-magnify text-white"></i>
        </span>
      </div>
      <input
        type="text"
        className="form-control bg-transparent border-0 text-black"
        placeholder="Search workouts or food..."
      />
    </div>
  </form>
</div>



    <ul className="navbar-nav navbar-nav-right d-flex align-items-center">
      <li className="nav-item">
        <Link className="nav-link" to="/notifications">
          <i className="mdi mdi-bell-outline text-white"></i>
          <span className="count-symbol bg-danger"></span>
        </Link>
      </li>
      
      <li className="nav-item d-none d-lg-flex align-items-center ml-3">
  {!userEmail ? (
    <>
      <Link to="/login" className="btn btn-light text-dark mr-2">Login</Link>
      <Link to="/reg" className="btn btn-success">Register</Link>
    </>
  ) : (
    <Link
      to="/getuser"
      className="text-white text-decoration-none d-flex align-items-center mr-3"
      style={{ cursor: 'pointer' }}
      title="View Profile"
    >
      <i className="mdi mdi-account-circle text-white" style={{ fontSize: '22px', marginRight: '6px' }}></i>
      <span>{userEmail}</span>
    </Link>
  )}
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
          <div className="main-panel">
            <div className="content-wrapper">
              {/* Welcome Banner */}
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





              
              {/* Stats Overview */}
              <div className="row mt-4">
                <div className="col-xl-3 col-lg-6 col-sm-6 grid-margin stretch-card">
                  <div className="card bg-dark">
                    <div className="card-body text-center">
                      <h5 className="mb-2 text-light font-weight-normal">Today's Calories</h5>
                      <h2 className="mb-4 text-white font-weight-bold">1,850</h2>
                      <div className="dashboard-progress dashboard-progress-1 d-flex align-items-center justify-content-center item-parent">
                        <i className="mdi mdi-fire icon-md absolute-center text-primary"></i>
                      </div>
                      <p className="mt-4 mb-0 text-muted">Remaining</p>
                      <h3 className="mb-0 font-weight-bold mt-2 text-white">450</h3>
                    </div>
                  </div>
                </div>
                <div className="col-xl-3 col-lg-6 col-sm-6 grid-margin stretch-card">
                  <div className="card bg-dark">
                    <div className="card-body text-center">
                      <h5 className="mb-2 text-light font-weight-normal">Workouts This Week</h5>
                      <h2 className="mb-4 text-white font-weight-bold">4</h2>
                      <div className="dashboard-progress dashboard-progress-2 d-flex align-items-center justify-content-center item-parent">
                        <i className="mdi mdi-dumbbell icon-md absolute-center text-success"></i>
                      </div>
                      <p className="mt-4 mb-0 text-muted">Last workout</p>
                      <h3 className="mb-0 font-weight-bold mt-2 text-white">2 days ago</h3>
                    </div>
                  </div>
                </div>
                <div className="col-xl-3 col-lg-6 col-sm-6 grid-margin stretch-card">
                  <div className="card bg-dark">
                    <div className="card-body text-center">
                      <h5 className="mb-2 text-light font-weight-normal">Current Weight</h5>
                      <h2 className="mb-4 text-white font-weight-bold">78.5 kg</h2>
                      <div className="dashboard-progress dashboard-progress-3 d-flex align-items-center justify-content-center item-parent">
                        <i className="mdi mdi-scale-bathroom icon-md absolute-center text-info"></i>
                      </div>
                      <p className="mt-4 mb-0 text-muted">Change this month</p>
                      <h3 className="mb-0 font-weight-bold mt-2 text-white">-1.2 kg</h3>
                    </div>
                  </div>
                </div>
                <div className="col-xl-3 col-lg-6 col-sm-6 grid-margin stretch-card">
                  <div className="card bg-dark">
                    <div className="card-body text-center">
                      <h5 className="mb-2 text-light font-weight-normal">Water Intake</h5>
                      <h2 className="mb-4 text-white font-weight-bold">2.1 L</h2>
                      <div className="dashboard-progress dashboard-progress-4 d-flex align-items-center justify-content-center item-parent">
                        <i className="mdi mdi-cup-water icon-md absolute-center text-warning"></i>
                      </div>
                      <p className="mt-4 mb-0 text-muted">Daily goal</p>
                      <h3 className="mb-0 font-weight-bold mt-2 text-white">2.5 L</h3>
                    </div>
                  </div>
                </div>
              </div>





              
              {/* Recent Activity */}
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




              
              {/* Workout and Nutrition Progress */}
              <div className="row">
                <div className="col-md-6 grid-margin stretch-card">
                  <div className="card bg-dark">
                    <div className="card-body">
                      <div className="d-flex justify-content-between align-items-center mb-3">
                        <h4 className="card-title text-white">Weekly Workouts</h4>
                        <div className="dropdown">
                          <button className="btn btn-sm btn-outline-light dropdown-toggle" type="button" id="workoutDropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            This Week
                          </button>
                          <div className="dropdown-menu" aria-labelledby="workoutDropdown">
                            <Link className="dropdown-item" to="#">This Week</Link>
                            <Link className="dropdown-item" to="#">Last Week</Link>
                            <Link className="dropdown-item" to="#">This Month</Link>
                          </div>
                        </div>
                      </div>
                      <canvas id="workout-chart" height="200"></canvas>
                      <div className="mt-4">
                        <div className="d-flex justify-content-between align-items-center mb-2">
                          <div className="text-muted">Workout Completion</div>
                          <div className="text-success">80%</div>
                        </div>
                        <div className="progress progress-md">
                          <div className="progress-bar bg-success" role="progressbar" style={{width: '80%'}} aria-valuenow="80" aria-valuemin="0" aria-valuemax="100"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 grid-margin stretch-card">
                  <div className="card bg-dark">
                    <div className="card-body">
                      <div className="d-flex justify-content-between align-items-center mb-3">
                        <h4 className="card-title text-white">Nutrition Breakdown</h4>
                        <div className="dropdown">
                          <button className="btn btn-sm btn-outline-light dropdown-toggle" type="button" id="nutritionDropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Today
                          </button>
                          <div className="dropdown-menu" aria-labelledby="nutritionDropdown">
                            <Link className="dropdown-item" to="#">Today</Link>
                            <Link className="dropdown-item" to="#">Yesterday</Link>
                            <Link className="dropdown-item" to="#">This Week</Link>
                          </div>
                        </div>
                      </div>
                      <canvas id="nutrition-chart" height="200"></canvas>
                      <div className="mt-4">
                        <div className="row text-center">
                          <div className="col-4 border-right">
                            <h4 className="text-white font-weight-bold">1,850</h4>
                            <small className="text-muted">Calories</small>
                          </div>
                          <div className="col-4 border-right">
                            <h4 className="text-white font-weight-bold">145g</h4>
                            <small className="text-muted">Protein</small>
                          </div>
                          <div className="col-4">
                            <h4 className="text-white font-weight-bold">210g</h4>
                            <small className="text-muted">Carbs</small>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>




              
              {/* Quick Actions */}
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
            </div>
            



            
            {/* Footer */}
      <footer className="footer bg-dark py-3">
  <div className="container">
    <div className="d-sm-flex justify-content-center justify-content-sm-between">
      <span className="text-light d-block text-center text-sm-left d-sm-inline-block">
        © FitTrackPro 2025
      </span>
      <span className="float-none float-sm-right d-block mt-2 mt-sm-0 text-center">
        <Link to="/terms" className="text-light mx-2">Terms</Link>
        <Link to="/privacy" className="text-light mx-2">Privacy</Link>
        <Link to="/contact" className="text-light mx-2">Contact</Link>
      </span>
    </div>
  </div>
</footer>

          </div>
        </div>
      </div>
    </div>
  );
}