import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { Line } from 'react-chartjs-2';
import styles from '../style/ProgressForm.module.css';
import { Link, useNavigate } from 'react-router-dom';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const ProgressForm = ({ progress = null, userId, onSave = () => {} }) => {
  const [weight, setWeight] = useState('');
  const [chest, setChest] = useState('');
  const [waist, setWaist] = useState('');
  const [hips, setHips] = useState('');
  const [bodyFat, setBodyFat] = useState('');
  const [date, setDate] = useState('');
  const [history, setHistory] = useState([]);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user_information'));
    if (userData) setUser(userData);
    if (progress) {
      setWeight(progress.weight || '');
      setChest(progress.chest || '');
      setWaist(progress.waist || '');
      setHips(progress.hips || '');
      setBodyFat(progress.bodyFat || '');
      setDate(progress.date?.split("T")[0] || '');
    }
  }, [progress]);

  useEffect(() => {
    if (userId) fetchProgressHistory();
  }, [userId]);

  const fetchProgressHistory = async () => {
    try {
      const res = await axios.get(`http://localhost:3001/gym/progress/user/${userId}`);
      setHistory(res.data);
    } catch (error) {
      console.error("Error fetching progress history", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!weight || !chest || !waist || !hips || !bodyFat || !date) {
      toast.error("Please fill all the fields.");
      return;
    }

    const progressData = { userId, weight, chest, waist, hips, bodyFat, date };

    try {
      if (progress && progress._id) {
        await axios.put(`http://localhost:3001/gym/progress/${progress._id}`, progressData);
        toast.success("Progress updated successfully!");
      } else {
        await axios.post("http://localhost:3001/gym/progress", progressData);
        toast.success("Progress added successfully!");
      }

      onSave();
      fetchProgressHistory();
    } catch (error) {
      console.error("Progress save error:", error);
      toast.error(error.response?.data?.msg || "Error saving progress data.");
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

  const generateChartData = (label, key) => {
    const sorted = [...history].sort((a, b) => new Date(a.date) - new Date(b.date));
    return {
      labels: sorted.map(p => new Date(p.date).toLocaleDateString()),
      datasets: [
        {
          label,
          data: sorted.map(p => parseFloat(p[key])),
          borderColor: 'rgba(255, 206, 86, 1)',
          fill: false,
        }
      ]
    };
  };

  return (
    <div className="dark-theme">
      <div className="container-scroller">
        {/* Navbar */}
        <nav className="navbar default-layout-navbar col-lg-12 col-12 p-0 fixed-top d-flex align-items-center justify-content-between" style={{ backgroundColor: "#121212" }}>
          <div style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)' }}>
            <Link className="navbar-brand brand-logo" to="/" style={{ color: "yellow", fontSize: "30px", fontWeight: "bold", textDecoration: "none" }}>
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

           

          {/* Main Panel */}
          <div className="main-panel">
  <div className={`content-wrapper ${styles.pageBackground}`}>
    <ToastContainer position="bottom-right" autoClose={3000} />
    <div className={styles.progressContainer}>

                <h3 className={styles.heading}>{progress ? "Update Progress" : "Add New Progress"}</h3>
                <form onSubmit={handleSubmit} className={styles.formBox} style={{ backgroundColor: '#2c2c2c', padding: '20px', borderRadius: '10px' }}>
                  <label className={styles.label}>Weight (kg):</label>
                  <input type="number" className={styles.input} value={weight} onChange={e => setWeight(e.target.value)} style={{ backgroundColor: '#333', color: '#fff' }} />

                  <label className={styles.label}>Chest (cm):</label>
                  <input type="number" className={styles.input} value={chest} onChange={e => setChest(e.target.value)} style={{ backgroundColor: '#333', color: '#fff' }} />

                  <label className={styles.label}>Waist (cm):</label>
                  <input type="number" className={styles.input} value={waist} onChange={e => setWaist(e.target.value)} style={{ backgroundColor: '#333', color: '#fff' }} />

                  <label className={styles.label}>Hips (cm):</label>
                  <input type="number" className={styles.input} value={hips} onChange={e => setHips(e.target.value)} style={{ backgroundColor: '#333', color: '#fff' }} />

                  <label className={styles.label}>Body Fat (%):</label>
                  <input type="number" className={styles.input} value={bodyFat} onChange={e => setBodyFat(e.target.value)} style={{ backgroundColor: '#333', color: '#fff' }} />

                  <label className={styles.label}>Date:</label>
                  <input type="date" className={styles.input} value={date} onChange={e => setDate(e.target.value)} style={{ backgroundColor: '#333', color: '#fff' }} />

                  <button type="submit" className={styles.submitButton} style={{ backgroundColor: '#ffcc00', color: '#000' }}>{progress ? "Update Progress" : "Add Progress"}</button>
                </form>

                {history.length > 0 && (
                  <div className={styles.chartSection}>
                    <h4>Your Progress Over Time</h4>
                    {['weight', 'chest', 'waist', 'hips', 'bodyFat'].map(key => (
                      <div key={key} className={styles.chartContainer} style={{ backgroundColor: '#2c2c2c', padding: '15px', marginTop: '20px', borderRadius: '10px' }}>
                        <h6 style={{ color: '#ffcc00' }}>{key.charAt(0).toUpperCase() + key.slice(1)}</h6>
                        <Line data={generateChartData(key, key)} />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressForm;
