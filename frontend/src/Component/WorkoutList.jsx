import React, { useEffect, useState } from 'react';
import axios from 'axios';

const WorkoutList = () => {
  const [workouts, setWorkouts] = useState([]);

  useEffect(() => {
    fetchWorkouts();
  }, []);

  const fetchWorkouts = async () => {
    try {
      const res = await axios.get('http://localhost:3001/gym/workouts');
      setWorkouts(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: 'auto', color: 'white', backgroundColor: '#121212', borderRadius: '12px' }}>
      <h2 style={{ color: '#ffd700', marginBottom: '20px' }}>Your Workouts</h2>
      {workouts.length === 0 && <p>No workouts yet. Add one!</p>}
      <div style={{ display: 'grid', gap: '20px' }}>
        {workouts.map(w => (
          <div key={w._id} style={{
            backgroundColor: '#222',
            borderRadius: '10px',
            padding: '15px',
            boxShadow: '0 0 10px rgba(255, 204, 0, 0.5)'
          }}>
            <p><strong>Name:</strong> {w.workoutName}</p>
            <p><strong>Type:</strong> {w.workoutType}</p>
            <p><strong>Duration:</strong> {w.duration} minutes</p>
            <p><strong>Calories Burned:</strong> {w.caloriesBurned}</p>
            <p><strong>Date:</strong> {w.date?.substring(0, 10)}</p>
            <p><strong>Notes:</strong> {w.notes || 'None'}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WorkoutList;
