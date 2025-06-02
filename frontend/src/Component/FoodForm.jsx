import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import styles from '../style/FoodForm.module.css';
import { Link, useNavigate } from 'react-router-dom';

// Replace with your actual Nutritionix credentials
const APP_ID = '69c4e115';
const API_KEY = '0f222905a55e160c86da2bf8120434de';

export default function FoodForm({ food = null, onSave }) {
  const [name, setName] = useState('');
  const [mealType, setMealType] = useState('');
  const [quantity, setQuantity] = useState('');
  const [calories, setCalories] = useState('');
  const [protein, setProtein] = useState('');
  const [carbs, setCarbs] = useState('');
  const [fat, setFat] = useState('');
  const [userId, setUserId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  // Sidebar toggles (optional UI state)
  const [showWorkout, setShowWorkout] = useState(false);
  const [showNutrition, setShowNutrition] = useState(false);
  const [showProgress, setShowProgress] = useState(false);
  const [showsteps, setShowsteps] = useState(false);

  useEffect(() => {
    // Get user info from localStorage and set userId
    const userData = JSON.parse(localStorage.getItem('user_information'));
    if (userData && userData._id) {
      setUserId(userData._id);
    } else {
      // No user info found, maybe redirect to login?
      navigate('/login');
    }

    if (food) {
      setName(food.name || '');
      setMealType(food.mealType || 'breakfast');
      setQuantity(food.quantity || '');
      setCalories(food.calories || '');
      setProtein(food.protein || '');
      setCarbs(food.carbs || '');
      setFat(food.fat || '');
    } else {
      setMealType(''); // Reset meal type if no food
    }
  }, [food, navigate]);

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

    if (!name || !mealType || !quantity || !calories || !protein || !carbs || !fat) {
      toast.error("Please fill all the fields.");
      return;
    }

    if (!userId) {
      toast.error("User not logged in.");
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
      setUserId(null);
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
              <li className="nav-item">
                <button onClick={handleLogout} className="btn btn-link nav-link text-white" style={{ cursor: 'pointer' }}>
                  Logout
                </button>
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
            {/* Sidebar content (unchanged) */}
            {/* ... your sidebar menu here ... */}
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
                  <input
                    type="text"
                    className={styles.input}
                    value={searchTerm}
                    onChange={handleSearchChange}
                    required
                  />

                  <label className={styles.label}>Meal Type:</label>
                  <select
                    className={styles.input}
                    value={mealType}
                    onChange={e => setMealType(e.target.value)}
                    required
                  >
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
                  <input
                    type="number"
                    className={styles.input}
                    value={quantity}
                    onChange={e => setQuantity(e.target.value)}
                    required
                  />

                  <label className={styles.label}>Calories:</label>
                  <input
                    type="number"
                    className={styles.input}
                    value={calories}
                    onChange={e => setCalories(e.target.value)}
                    required
                  />

                  <label className={styles.label}>Protein (g):</label>
                  <input
                    type="number"
                    className={styles.input}
                    value={protein}
                    onChange={e => setProtein(e.target.value)}
                    required
                  />

                  <label className={styles.label}>Carbs (g):</label>
                  <input
                    type="number"
                    className={styles.input}
                    value={carbs}
                    onChange={e => setCarbs(e.target.value)}
                    required
                  />

                  <label className={styles.label}>Fat (g):</label>
                  <input
                    type="number"
                    className={styles.input}
                    value={fat}
                    onChange={e => setFat(e.target.value)}
                    required
                  />

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
