import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import styles from '../style/FoodList.module.css';

// Helpers
function getStartOfWeek(date) {
  const d = new Date(date);
  const day = d.getDay();
  d.setDate(d.getDate() - day);
  d.setHours(0, 0, 0, 0);
  return d;
}

function addDays(date, days) {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
}

function formatDate(date) {
  const d = new Date(date);
  return d.toISOString().substring(0, 10);
}

const FoodList = () => {
  const [foodLogs, setFoodLogs] = useState([]);
  const [editItem, setEditItem] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    mealType: '',
    quantity: '',
    calories: '',
    protein: '',
    carbs: '',
    fat: '',
    date: ''
  });
  const [showPopup, setShowPopup] = useState(false);
  const [searchName, setSearchName] = useState('');
  const [searchMealType, setSearchMealType] = useState('');
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
   const [showWorkout, setShowWorkout] = useState(false);
    const [showNutrition, setShowNutrition] = useState(false);
    const [showProgress, setShowProgress] = useState(false);
    const [showsteps, setShowsteps] = useState(false);


  useEffect(() => {
    fetchFoodLogs();
  }, []);

  const fetchFoodLogs = async () => {
    const user = JSON.parse(localStorage.getItem("user_information"));
    if (!user || !user._id) return;
  
    try {
      const response = await axios.get(`http://localhost:3001/gym/foods`, {
        params: { userId: user._id },
      });
      console.log(user)
      console.log(response.data)
      setFoodLogs(response.data);
    } catch (err) {
      console.error("Failed to fetch food logs", err);
    }
  };
  

  const handleDelete = async (id) => {
    if (window.confirm('Delete this food log?')) {
      try {
        await axios.delete(`http://localhost:3001/gym/foods/${id}`);
        fetchFoodLogs();
      } catch (error) {
        console.error("Delete failed:", error);
      }
    }
  };

  const openEditModal = (foodLog) => {
    const meal = foodLog.meals[0] || {};
    setEditItem(foodLog._id);
    setFormData({
      name: meal.name || '',
      mealType: meal.mealType || '',
      quantity: meal.quantity || '',
      calories: meal.calories || '',
      protein: meal.protein || '',
      carbs: meal.carbs || '',
      fat: meal.fat || '',
      date: foodLog.date ? foodLog.date.substring(0, 10) : ''
    });
    setShowPopup(true);
  };

  const closeModal = () => {
    setEditItem(null);
    setFormData({
      name: '',
      mealType: '',
      quantity: '',
      calories: '',
      protein: '',
      carbs: '',
      fat: '',
      date: ''
    });
    setShowPopup(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    if (!editItem) return;
    const updatedData = {
      meals: [
        {
          name: formData.name,
          mealType: formData.mealType,
          quantity: Number(formData.quantity),
          calories: Number(formData.calories),
          protein: Number(formData.protein),
          carbs: Number(formData.carbs),
          fat: Number(formData.fat),
        }
      ],
      date: formData.date
    };
    try {
      await axios.put(`http://localhost:3001/gym/foods/${editItem}`, updatedData);
      closeModal();
      fetchFoodLogs();
    } catch (error) {
      console.error("Update failed:", error);
    }
  };

  const handleLogout = () => {
    console.log('Logging out...');
    localStorage.clear();
  };

  const filteredFoodLogs = foodLogs.filter(foodLog => {
    const meal = foodLog.meals[0] || {};
    const nameMatch = meal.name.toLowerCase().includes(searchName.toLowerCase());
    const mealTypeMatch = searchMealType === '' || meal.mealType === searchMealType;
    return nameMatch && mealTypeMatch;
  });

  const foodLogsToDisplay = selectedDate
    ? filteredFoodLogs.filter(foodLog => {
        const logDate = new Date(foodLog.date?.substring(0, 10));
        return formatDate(logDate) === formatDate(selectedDate);
      })
    : filteredFoodLogs;

  const weekStart = selectedDate ? getStartOfWeek(selectedDate) : null;
  const weekDays = selectedDate
    ? Array.from({ length: 7 }).map((_, i) => {
        const d = addDays(weekStart, i);
        return {
          date: d,
          formatted: d.toLocaleDateString(undefined, { weekday: 'short', day: 'numeric' }),
          iso: formatDate(d)
        };
      })
    : [];

  return (
    <div className="dark-theme">
      <div className="container-scroller">
        {/* Navbar */}
        <nav className="navbar default-layout-navbar col-lg-12 col-12 p-0 fixed-top d-flex align-items-center justify-content-between" style={{ backgroundColor: "#121212" }}>
          <div style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)' }}>
            <Link
              className="navbar-brand brand-logo"
              to="/"
              style={{ color: "yellow", fontSize: "30px", fontWeight: "bold", textDecoration: "none" }}
            >
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
          <div className="main-panel" style={{ padding: '20px' }}>
            <h2>Your Food Logs</h2>

            {/* Search and Filters */}
            <div
              className={styles.searchBar}
              style={{
                marginBottom: '20px',
                display: 'flex',
                gap: '10px',
                flexWrap: 'wrap',
                alignItems: 'center'
              }}
            >
              <input
                type="text"
                placeholder="Search by name..."
                value={searchName}
                onChange={(e) => setSearchName(e.target.value)}
                style={{ flex: '1 1 200px', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
              />
              <select
                value={searchMealType}
                onChange={(e) => setSearchMealType(e.target.value)}
                style={{
    padding: '8px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    backgroundColor: '#1f1f1f', // Dark background
    color: 'white' // White text
  }}
              >
                <option value="">All Meal Types</option>
                <option value="breakfast">Breakfast</option>
                <option value="lunch">Lunch</option>
                <option value="dinner">Dinner</option>
                <option value="snack">Snack</option>
              </select>
              <button
                onClick={() => {
                  setShowCalendar(!showCalendar);
                  if (!showCalendar) setSelectedDate(new Date());
                  else setSelectedDate(null);
                }}
                style={{
                  padding: '8px 16px',
                  backgroundColor: 'yellow',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontWeight: 'bold'
                }}
              >
                {showCalendar ? 'Hide Calendar' : 'Show Calendar'}
              </button>
            </div>

            {/* Calendar Week View */}
            {showCalendar && selectedDate && (
              <div
                className={styles.weekCalendar}
                style={{
                  display: 'flex',
                  gap: '10px',
                  marginBottom: '20px'
                }}
              >
                {weekDays.map(day => (
                  <div
                    key={day.iso}
                    onClick={() => setSelectedDate(new Date(day.iso))}
                    style={{
                      cursor: 'pointer',
                      padding: '10px',
                      backgroundColor: formatDate(selectedDate) === day.iso ? 'yellow' : 'transparent',
                      color: formatDate(selectedDate) === day.iso ? '#121212' : 'white',
                      borderRadius: '6px',
                      minWidth: '70px',
                      textAlign: 'center',
                      userSelect: 'none',
                      boxShadow: formatDate(selectedDate) === day.iso ? '0 0 5px #ffd600' : 'none',
                      transition: 'background-color 0.3s, color 0.3s'
                    }}
                  >
                    {day.formatted}
                  </div>
                ))}
              </div>
            )}

            {/* Food Cards Grid */}
            <div className={styles.grid} style={{ display: 'grid', gap: '20px', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))' }}>
              {foodLogsToDisplay.length > 0 ? (
                foodLogsToDisplay.map(foodLog => {
                  const meal = foodLog.meals[0] || {};
                  return (
                    <div
                      key={foodLog._id}
                      className={styles.card}
                      style={{
                        backgroundColor: '#1e1e1e',
                        padding: '15px',
                        borderRadius: '10px',
                        boxShadow: '0 4px 8px rgba(0,0,0,0.5)',
                        color: 'white',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between'
                      }}
                    >
                      <p>
                        <strong>Date: </strong>
                        <span
                          style={{ textDecoration: 'underline', cursor: 'pointer', color: 'lightblue' }}
                          onClick={() => {
                            setShowCalendar(true);
                            setSelectedDate(new Date(foodLog.date.substring(0, 10)));
                          }}
                        >
                          {foodLog.date?.substring(0, 10) || 'N/A'}
                        </span>
                      </p>
                      <p><strong>Name:</strong> {meal.name}</p>
                      <p><strong>Meal Type:</strong> {meal.mealType}</p>
                      <p><strong>Quantity:</strong> {meal.quantity}</p>
                      <p><strong>Calories:</strong> {meal.calories}</p>
                      <p><strong>Protein:</strong> {meal.protein} g</p>
                      <p><strong>Carbs:</strong> {meal.carbs} g</p>
                      <p><strong>Fat:</strong> {meal.fat} g</p>

                      <div className={styles.cardButtons} style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                        <button
                          className={styles.editBtn}
                          onClick={() => openEditModal(foodLog)}
                          style={{
                            backgroundColor: '#ffc107',
                            border: 'none',
                            borderRadius: '6px',
                            padding: '5px 10px',
                            cursor: 'pointer'
                          }}
                          aria-label="Edit"
                        >
                          ✏️
                        </button>
                        <button
                          className={styles.deleteBtn}
                          onClick={() => handleDelete(foodLog._id)}
                          style={{
                            backgroundColor: '#dc3545',
                            border: 'none',
                            borderRadius: '6px',
                            padding: '5px 10px',
                            cursor: 'pointer',
                            color: 'white'
                          }}
                          aria-label="Delete"
                        >
                          🗑️
                        </button>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className={styles.emptyState} style={{ textAlign: 'center', color: 'lightgray', fontSize: '18px', marginTop: '40px' }}>
                  <p>No food logs found. Add your first food entry!</p>
                </div>
              )}
            </div>
{showPopup && (
  <div
    style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 9999,
      padding: '20px',
    }}
  >
    <div
      style={{
        backgroundColor: '#121212',
        borderRadius: '10px',
        padding: '30px',
        width: '100%',
        maxWidth: '400px',
        color: 'white',
        boxShadow: '0 0 20px rgba(255, 255, 0, 0.8)',
      }}
    >
      <h3 style={{ marginBottom: '20px', textAlign: 'center' }}>Edit Food Log</h3>

      {(() => {
        const inputStyle = {
          width: '100%',
          marginBottom: '10px',
          padding: '8px',
          borderRadius: '4px',
          border: '1px solid #444',
          fontSize: '14px',
          backgroundColor: '#1e1e1e',
          color: 'white',
        };

        return (
          <>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              style={inputStyle}
            />
            <input
              type="text"
              name="name"
              placeholder="Food Name"
              value={formData.name}
              onChange={handleChange}
              style={inputStyle}
            />
            <select
              name="mealType"
              value={formData.mealType}
              onChange={handleChange}
              style={inputStyle}
            >
              <option value="">Select Meal Type</option>
              <option value="breakfast">Breakfast</option>
              <option value="lunch">Lunch</option>
              <option value="dinner">Dinner</option>
              <option value="snack">Snack</option>
            </select>
            <input
              type="number"
              name="quantity"
              placeholder="Quantity"
              value={formData.quantity}
              onChange={handleChange}
              style={inputStyle}
            />
            <input
              type="number"
              name="calories"
              placeholder="Calories"
              value={formData.calories}
              onChange={handleChange}
              style={inputStyle}
            />
            <input
              type="number"
              name="protein"
              placeholder="Protein (g)"
              value={formData.protein}
              onChange={handleChange}
              style={inputStyle}
            />
            <input
              type="number"
              name="carbs"
              placeholder="Carbs (g)"
              value={formData.carbs}
              onChange={handleChange}
              style={inputStyle}
            />
            <input
              type="number"
              name="fat"
              placeholder="Fat (g)"
              value={formData.fat}
              onChange={handleChange}
              style={{ ...inputStyle, marginBottom: '20px' }}
            />
          </>
        );
      })()}

      <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
        <button
          onClick={closeModal}
          style={{
            backgroundColor: '#6c757d',
            border: 'none',
            borderRadius: '6px',
            padding: '8px 16px',
            cursor: 'pointer',
            color: 'white',
          }}
        >
          Cancel
        </button>
        <button
          onClick={handleSave}
          style={{
            backgroundColor: 'yellow',
            border: 'none',
            borderRadius: '6px',
            padding: '8px 16px',
            cursor: 'pointer',
            fontWeight: 'bold',
            color: '#121212',
          }}
        >
          Save
        </button>
      </div>
    </div>
  </div>
)}

          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodList;
