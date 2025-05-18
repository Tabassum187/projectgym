import React from 'react';
import { Link } from 'react-router-dom';

const WorkoutItem = ({ workout }) => {
  return (
    <li>
      <h3>{workout.exercise}</h3>
      <p>Sets: {workout.sets}, Reps: {workout.reps}, Weight: {workout.weight}</p>
      <p>Category: {workout.category}</p>
      <p>{workout.notes}</p>
      <button>Edit</button>
      <button>Delete</button>
    </li>
  );
};

export default WorkoutItem;
