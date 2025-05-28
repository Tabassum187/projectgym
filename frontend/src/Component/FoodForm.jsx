import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import styles from '../style/FoodForm.module.css';
import { Link, useNavigate } from 'react-router-dom';

// Replace with your actual Nutritionix credentials
const APP_ID = '69c4e115';
const API_KEY = '0f222905a55e160c86da2bf8120434de';

export default function FoodForm({ food = null, userId, onSave }) {
  const [name, setName] = useState('');
  const [mealType, setMealType] = useState('');
  const [quantity, setQuantity] = useState('');
  const [calories, setCalories] = useState('');
  const [protein, setProtein] = useState('');
  const [carbs, setCarbs] = useState('');
  const [fat, setFat] = useState('');
  const [user, setUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
   const [showWorkout, setShowWorkout] = useState(false);
    const [showNutrition, setShowNutrition] = useState(false);
    const [showProgress, setShowProgress] = useState(false);
    const [showsteps, setShowsteps] = useState(false);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user_information'));
    if (userData) setUser(userData);

    if (food) {
      setName(food.name || '');
      setMealType(food.mealType || 'breakfast');
      setQuantity(food.quantity || '');
      setCalories(food.calories || '');
      setProtein(food.protein || '');
      setCarbs(food.carbs || '');
      setFat(food.fat || '');
    }
  }, [food]);

  const clearForm = () => {
    setName('');
    setMealType('breakfast');
    setQuantity('');
    setCalories('');
    setProtein('');
    setCarbs('');
    setFat('');
    setSearchTerm('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !quantity || !calories || !protein || !carbs || !fat) {
      toast.error("Please fill all the fields.");
      return;
    }

    const foodData = {
      userId,
      meals: [{ name, mealType, quantity, calories, protein, carbs, fat }]
    };

    try {
      if (food && food._id) {
        await axios.put(`http://localhost:3001/gym/foods/${food._id}`, foodData);
        toast.success("Food updated successfully!");
      } else {
        await axios.post("http://localhost:3001/gym/foods", foodData);
        toast.success("Food added successfully!");
      }
      clearForm();
      if (onSave) onSave();
    } catch (error) {
      console.error("Food save error:", error);
      toast.error(error.response?.data?.msg || "Error saving food data.");
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

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const fetchNutritionData = async () => {
    if (!searchTerm.trim()) {
      toast.error("Please enter a food name to search.");
      return;
    }

    try {
      const response = await axios.post(
        'https://trackapi.nutritionix.com/v2/natural/nutrients',
        { query: searchTerm },
        {
          headers: {
            'x-app-id': APP_ID,
            'x-app-key': API_KEY,
            'Content-Type': 'application/json',
          },
        }
      );

      const foodData = response.data.foods[0];
      if (foodData) {
        setName(foodData.food_name);
        setQuantity(foodData.serving_qty);
        setCalories(foodData.nf_calories);
        setProtein(foodData.nf_protein);
        setCarbs(foodData.nf_total_carbohydrate);
        setFat(foodData.nf_total_fat);
        toast.success("Nutrition info fetched!");
      } else {
        toast.error("No nutrition info found.");
      }
    } catch (error) {
      console.error("Nutritionix API error:", error);
      toast.error("Failed to fetch data from Nutritionix.");
    }
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
          <div className="main-panel">
            <div className={styles.backgroundImageWrapper}>
              <div className={styles.foodContainer}>
                <ToastContainer position="bottom-right" autoClose={3000} />
                <h3 className={styles.heading}>{food ? "Update Food" : "Add New Food"}</h3>


                  {/* Manual Fields */}
                  <form onSubmit={handleSubmit} className={styles.formBox}>
                  <label className={styles.label}>Food Name:</label>
                  <input type="text" className={styles.input} value={searchTerm}
                      onChange={handleSearchChange} required />

                  <label className={styles.label}>Meal Type:</label>
                  <select className={styles.input} value={mealType} onChange={e => setMealType(e.target.value)} required>
                  <option value="">Select</option>
                   
                    <option value="breakfast">Breakfast</option>
                    <option value="lunch">Lunch</option>
                    <option value="dinner">Dinner</option>
                    <option value="snack">Snack</option>
                  </select>
                  <button type="button" onClick={fetchNutritionData} className={styles.submitButton}>
                      Search
                    </button>
                  <label className={styles.label}>Quantity:</label>
                  <input type="number" className={styles.input} value={quantity} onChange={e => setQuantity(e.target.value)} required />

                  <label className={styles.label}>Calories:</label>
                  <input type="number" className={styles.input} value={calories} onChange={e => setCalories(e.target.value)} required />

                  <label className={styles.label}>Protein (g):</label>
                  <input type="number" className={styles.input} value={protein} onChange={e => setProtein(e.target.value)} required />

                  <label className={styles.label}>Carbs (g):</label>
                  <input type="number" className={styles.input} value={carbs} onChange={e => setCarbs(e.target.value)} required />

                  <label className={styles.label}>Fat (g):</label>
                  <input type="number" className={styles.input} value={fat} onChange={e => setFat(e.target.value)} required />

                  <button type="submit" className={styles.submitButton}>
                    {food ? "Update Food" : "Add Food"}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}