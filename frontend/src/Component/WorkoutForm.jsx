import React, { useState } from 'react';

import axios from 'axios';

const WorkoutForm = () => {
  const [formData, setFormData] = useState({
    workoutName: '',
    workoutType: 'Strength Training',
    duration: '',
    caloriesBurned: '',
    date: '',
    notes: ''
  });

  // Options for workout types and corresponding workout names
  const workoutOptions = {
    "Strength Training": ["Bench Press", "Squats", "Deadlift", "Overhead Press", "Pull-ups"],
    "Cardio": ["Running", "Cycling", "Jump Rope", "Swimming", "Rowing"],
    "Flexibility": ["Yoga", "Stretching", "Pilates"],
    "Balance": ["Single-Leg Stand", "Bosu Ball Squats", "Tai Chi"],
    Other: ["Custom Activity"]
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3001/gym/workouts', formData);
      alert('Workout saved!');
      setFormData({
        workoutName: '',
        workoutType: 'Strength Training',
        duration: '',
        caloriesBurned: '',
        date: '',
        notes: ''
      });
    } catch (err) {
      console.error(err);
      alert('Error saving workout.');
    }
  };

  return (



    
    <div style={{
      backgroundImage: "url('https://plus.unsplash.com/premium_photo-167286364771f0-1f68f52f735f?w=500&auto=format&fit=crop&q=60')",
      backgroundSize: 'cover',
      backgroundAttachment: 'fixed',
      minHeight: '100vh',
      position: 'relative'
    }}>
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: 'rgba(15, 15, 15, 0.45)', zIndex: 0
      }} />
      <div style={{
        position: 'relative', zIndex: 1,
        maxWidth: '600px', margin: '40px auto',
        backgroundColor: 'rgba(30,30,30,0.9)', padding: '30px', borderRadius: '12px',
        color: 'white', boxShadow: '0 0 20px rgba(0,0,0,0.5)'
      }}>
        <h2 style={{ textAlign: 'center', color: '#ffd700', marginBottom: '25px' }}>Add New Workout</h2>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <label>
            Workout Name:
            <select
              name="workoutName"
              value={formData.workoutName}
              onChange={handleChange}
              required
              style={inputStyle}
            >
              <option value="">-- Select Workout Name --</option>
              {workoutOptions[formData.workoutType]?.map((name, idx) => (
                <option key={idx} value={name}>{name}</option>
              ))}
            </select>
          </label>

          <label>
            Workout Type:
            <select
              name="workoutType"
              value={formData.workoutType}
              onChange={handleChange}
              style={inputStyle}
            >
              <option>Strength Training</option>
              <option>Cardio</option>
              <option>Flexibility</option>
              <option>Balance</option>
              <option>Other</option>
            </select>
          </label>

          <label>
            Duration (minutes):
            <input
              type="number"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              required
              style={inputStyle}
              min="1"
            />
          </label>

          <label>
            Calories Burned:
            <input
              type="number"
              name="caloriesBurned"
              value={formData.caloriesBurned}
              onChange={handleChange}
              required
              style={inputStyle}
              min="0"
            />
          </label>

          <label>
            Date:
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
              style={inputStyle}
            />
          </label>

          <label>
            Notes (optional):
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              style={{ ...inputStyle, minHeight: '100px', resize: 'vertical' }}
            />
          </label>

          <button type="submit" style={submitButtonStyle}>
            Save Workout
          </button>
        </form>
      </div>
    </div>
  );
};

const inputStyle = {
  width: '100%',
  padding: '12px 15px',
  backgroundColor: '#2a2a2a',
  border: '1px solid #444',
  borderRadius: '6px',
  color: 'white',
  fontSize: '16px',
  marginTop: '8px',
  boxSizing: 'border-box'
};

const submitButtonStyle = {
  backgroundColor: '#ffcc00',
  color: '#121212',
  padding: '12px 24px',
  border: 'none',
  borderRadius: '6px',
  fontWeight: 'bold',
  cursor: 'pointer',
  marginTop: '10px'
};

export default WorkoutForm;
