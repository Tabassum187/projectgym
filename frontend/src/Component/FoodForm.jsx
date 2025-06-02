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

  // Sidebar toggles
  const [showWorkout, setShowWorkout] = useState(false);
  const [showNutrition, setShowNutrition] = useState(false);
  const [showProgress, setShowProgress] = useState(false);
  const [showsteps, setShowsteps] = useState(false);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user_information'));
    if (userData && userData._id) {
      setUserId(userData._id);
    } else {
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
    <div style={{ 
      backgroundImage: "url('https://images.unsplash.com/photo-1633339409275-84fb9541ab88?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
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
        

            {/* Main Content */}
            <div className="main-panel" style={{ backgroundColor: 'transparent' }}>
              <div className="content-wrapper" style={{ backgroundColor: 'transparent' }}>
                <div className="food-form-container" style={{
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
                    {food ? "Update Food" : "Add New Food"}
                  </h2>
                  <ToastContainer position="bottom-right" autoClose={3000} />
                  
                  <form onSubmit={handleSubmit} className="food-form" style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '20px'
                  }}>
                    <div className="form-group" style={{ display: 'flex', flexDirection: 'column' }}>
                      <label style={{ color: '#e0e0e0', marginBottom: '8px', fontWeight: '500' }}>Food Name</label>
                      <input
                        type="text"
                        value={searchTerm}
                        onChange={handleSearchChange}
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
                      <label style={{ color: '#e0e0e0', marginBottom: '8px', fontWeight: '500' }}>Meal Type</label>
                      <select
                        value={mealType}
                        onChange={e => setMealType(e.target.value)}
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
                        <option value="">Select Meal Type</option>
                        <option value="breakfast">Breakfast</option>
                        <option value="lunch">Lunch</option>
                        <option value="dinner">Dinner</option>
                        <option value="snack">Snack</option>
                      </select>
                    </div>

                    <button 
                      type="button" 
                      onClick={fetchNutritionData} 
                      style={{
                        backgroundColor: '#ffcc00',
                        color: '#121212',
                        padding: '12px 24px',
                        border: 'none',
                        borderRadius: '6px',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                        marginTop: '10px'
                      }}
                    >
                      Search Nutrition Data
                    </button>

                    <div className="form-group" style={{ display: 'flex', flexDirection: 'column' }}>
                      <label style={{ color: '#e0e0e0', marginBottom: '8px', fontWeight: '500' }}>Quantity</label>
                      <input
                        type="number"
                        value={quantity}
                        onChange={e => setQuantity(e.target.value)}
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
                      <label style={{ color: '#e0e0e0', marginBottom: '8px', fontWeight: '500' }}>Calories</label>
                      <input
                        type="number"
                        value={calories}
                        onChange={e => setCalories(e.target.value)}
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
                      <label style={{ color: '#e0e0e0', marginBottom: '8px', fontWeight: '500' }}>Protein (g)</label>
                      <input
                        type="number"
                        value={protein}
                        onChange={e => setProtein(e.target.value)}
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
                      <label style={{ color: '#e0e0e0', marginBottom: '8px', fontWeight: '500' }}>Carbs (g)</label>
                      <input
                        type="number"
                        value={carbs}
                        onChange={e => setCarbs(e.target.value)}
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
                      <label style={{ color: '#e0e0e0', marginBottom: '8px', fontWeight: '500' }}>Fat (g)</label>
                      <input
                        type="number"
                        value={fat}
                        onChange={e => setFat(e.target.value)}
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
                        {food ? "Update Food" : "Add Food"}
                      </button>

                      <Link to="/foodlist">
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
                          View Food List
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
    </div>
  );
}