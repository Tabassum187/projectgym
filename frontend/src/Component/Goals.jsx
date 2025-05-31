import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Goals = () => {
  const [showWorkout, setShowWorkout] = useState(false);
  const [showNutrition, setShowNutrition] = useState(false);
  const [showProgress, setShowProgress] = useState(false);
  const [showsteps, setShowsteps] = useState(false);
  
  const [goals, setGoals] = useState([
    {
      id: 1,
      title: 'Lose 5kg',
      description: 'Target weight loss in 2 months',
      targetDate: '2023-12-15',
      category: 'Weight'
    },
    {
      id: 2,
      title: 'Run 5km',
      description: 'Increase running distance',
      targetDate: '2023-11-30',
      category: 'Fitness'
    }
  ]);
  
  const [newGoal, setNewGoal] = useState({
    title: '',
    description: '',
    targetDate: '',
    category: 'Fitness'
  });
  
  const [showNotification, setShowNotification] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewGoal(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const goal = {
      ...newGoal,
      id: Date.now(),
      completed: false
    };
    setGoals([...goals, goal]);
    setNewGoal({
      title: '',
      description: '',
      targetDate: '',
      category: 'Fitness'
    });
  };

  const handleDelete = (id) => {
    setGoals(goals.filter(goal => goal.id !== id));
  };

  return (
    <div style={{ 
      backgroundImage: "url('https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Zml0bmVzcyUyMGdvYWxzfGVufDB8fDB8fHww')",
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
        backgroundColor: 'rgba(15, 15, 15, 0.75)',
        zIndex: 0
      }}></div>

      <div className="dark-theme">
        <div className="container-scroller">
          {/* Navbar - Same as ProgressForm */}
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

          {/* Notification Popup */}
          {showNotification && (
            <div style={{
              position: 'fixed',
              top: '70px',
              right: '20px',
              backgroundColor: '#2a2a2a',
              borderRadius: '8px',
              padding: '15px',
              width: '300px',
              zIndex: 1000,
              boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
              border: '1px solid #444'
            }}>
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                marginBottom: '10px',
                borderBottom: '1px solid #444',
                paddingBottom: '10px'
              }}>
                <h4 style={{ color: '#ffd700', margin: 0 }}>Your Goals</h4>
                <button 
                  onClick={() => setShowNotification(false)}
                  style={{ 
                    background: 'none', 
                    border: 'none', 
                    color: '#aaa',
                    cursor: 'pointer',
                    fontSize: '16px'
                  }}
                >
                  ×
                </button>
              </div>
              
              {goals.length > 0 ? (
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {goals.map(goal => (
                    <li key={goal.id} style={{ 
                      padding: '10px 0',
                      borderBottom: '1px solid #333',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}>
                      <div>
                        <strong style={{ color: '#e0e0e0' }}>{goal.title}</strong>
                        <p style={{ color: '#aaa', margin: '5px 0 0', fontSize: '14px' }}>
                          {goal.description.length > 30 ? `${goal.description.substring(0, 30)}...` : goal.description}
                        </p>
                      </div>
                      <button 
                        onClick={() => handleDelete(goal.id)}
                        style={{
                          background: 'none',
                          border: 'none',
                          color: '#f44336',
                          cursor: 'pointer',
                          fontSize: '16px'
                        }}
                      >
                        ×
                      </button>
                    </li>
                  ))}
                </ul>
              ) : (
                <p style={{ color: '#aaa', textAlign: 'center', margin: '10px 0' }}>
                  No pending goals
                </p>
              )}
            </div>
          )}

          <div className="container-fluid page-body-wrapper">
            {/* Sidebar - Same as ProgressForm */}
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
                    📈 Step Count<span>{showsteps ? "▲" : "▼"}</span>
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
                  <Link className="nav-link text-white font-weight-bold" style={{ fontSize: "15.5px", backgroundColor: '#333' }} to="/goals">
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
                <div className="goals-container" style={{
                  backgroundColor: 'rgba(30, 30, 30, 0.9)',
                  borderRadius: '12px',
                  padding: '30px',
                  maxWidth: '800px',
                  margin: '30px auto',
                  boxShadow: '0 0 20px rgba(0, 0, 0, 0.5)',
                  zIndex: 1,
                  position: 'relative'
                }}>
                  <h2 style={{ textAlign: 'center', marginBottom: '25px', color: '#ffd700' }}>🎯 Your Fitness Goals</h2>
                  
                  {/* Add Goal Form */}
                  <div style={{
                    backgroundColor: '#2a2a2a',
                    padding: '20px',
                    borderRadius: '8px',
                    marginBottom: '30px'
                  }}>
                    <h3 style={{ color: '#ffd700', marginBottom: '15px' }}>Set New Goal</h3>
                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                      <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <label style={{ color: '#e0e0e0', marginBottom: '5px' }}>Goal Title</label>
                        <input
                          type="text"
                          name="title"
                          value={newGoal.title}
                          onChange={handleInputChange}
                          required
                          style={{
                            padding: '10px',
                            backgroundColor: '#1a1a1a',
                            border: '1px solid #444',
                            borderRadius: '4px',
                            color: 'white'
                          }}
                        />
                      </div>
                      
                      <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <label style={{ color: '#e0e0e0', marginBottom: '5px' }}>Description</label>
                        <textarea
                          name="description"
                          value={newGoal.description}
                          onChange={handleInputChange}
                          required
                          style={{
                            padding: '10px',
                            backgroundColor: '#1a1a1a',
                            border: '1px solid #444',
                            borderRadius: '4px',
                            color: 'white',
                            minHeight: '80px'
                          }}
                        />
                      </div>
                      
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                          <label style={{ color: '#e0e0e0', marginBottom: '5px' }}>Target Date</label>
                          <input
                            type="date"
                            name="targetDate"
                            value={newGoal.targetDate}
                            onChange={handleInputChange}
                            required
                            style={{
                              padding: '10px',
                              backgroundColor: '#1a1a1a',
                              border: '1px solid #444',
                              borderRadius: '4px',
                              color: 'white'
                            }}
                          />
                        </div>
                        
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                          <label style={{ color: '#e0e0e0', marginBottom: '5px' }}>Category</label>
                          <select
                            name="category"
                            value={newGoal.category}
                            onChange={handleInputChange}
                            style={{
                              padding: '10px',
                              backgroundColor: '#1a1a1a',
                              border: '1px solid #444',
                              borderRadius: '4px',
                              color: 'white'
                            }}
                          >
                            <option value="Fitness">Fitness</option>
                            <option value="Nutrition">Nutrition</option>
                            <option value="Weight">Weight</option>
                            <option value="Other">Other</option>
                          </select>
                        </div>
                      </div>
                      
                      <button
                        type="submit"
                        style={{
                          padding: '12px',
                          backgroundColor: '#ffd700',
                          color: '#121212',
                          border: 'none',
                          borderRadius: '6px',
                          fontWeight: 'bold',
                          cursor: 'pointer',
                          marginTop: '10px'
                        }}
                      >
                        Add Goal
                      </button>
                    </form>
                  </div>
                  
                  {/* Goals List */}
                  <div>
                    <h3 style={{ color: '#ffd700', marginBottom: '15px' }}>Your Goals</h3>
                    
                    {goals.length === 0 ? (
                      <p style={{ color: '#aaa', textAlign: 'center' }}>No goals set yet. Add your first goal above!</p>
                    ) : (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                        {goals.map(goal => (
                          <div 
                            key={goal.id}
                            style={{
                              backgroundColor: '#2a2a2a',
                              padding: '15px',
                              borderRadius: '8px',
                              borderLeft: '4px solid #ffd700'
                            }}
                          >
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                              <h4 style={{ color: '#ffd700', margin: 0 }}>{goal.title}</h4>
                              <span style={{ color: '#aaa', fontSize: '14px' }}>
                                {new Date(goal.targetDate).toLocaleDateString()}
                              </span>
                            </div>
                            
                            <p style={{ color: '#e0e0e0', marginBottom: '10px' }}>{goal.description}</p>
                            
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                              <span style={{
                                backgroundColor: '#333',
                                color: '#aaa',
                                padding: '3px 8px',
                                borderRadius: '12px',
                                fontSize: '12px'
                              }}>
                                {goal.category}
                              </span>
                              
                              <button
                                onClick={() => handleDelete(goal.id)}
                                style={{
                                  padding: '5px 10px',
                                  backgroundColor: '#f44336',
                                  color: 'white',
                                  border: 'none',
                                  borderRadius: '4px',
                                  cursor: 'pointer'
                                }}
                              >
                                Delete
                              </button>
                            </div>
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
      </div>
    </div>
  );
};

export default Goals;