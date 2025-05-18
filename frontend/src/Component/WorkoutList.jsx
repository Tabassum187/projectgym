import React, { useState, useEffect } from 'react';
import WorkoutItem from './WorkoutItem';
import axios from 'axios';

const WorkoutList = () => {
  const [workouts, setWorkouts] = useState([]);

  useEffect(() => {
    // Fetch workouts from the backend or local storage
    axios.get("http://localhost:3001/gym/workouts")
      .then(response => setWorkouts(response.data))
      .catch(error => console.error("Error fetching workouts:", error));
  }, []);

  return (
    <div>
      <h2>Your Workouts</h2>
      <ul>
        {workouts.map(workout => (
          <WorkoutItem key={workout.id} workout={workout} />
        ))}
      </ul>
    </div>
  );
};

export default WorkoutList;
