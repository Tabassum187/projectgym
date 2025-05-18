// components/ProgressItem.jsx
import React from 'react';

const ProgressItem = ({ progress }) => {
  return (
    <li className="list-group-item">
      <h5>{progress.date}</h5>
      <p>Weight: {progress.weight} kg</p>
      <p>Chest: {progress.chest} cm</p>
      <p>Waist: {progress.waist} cm</p>
      <p>Hips: {progress.hips} cm</p>
      <p>Body Fat: {progress.bodyFat} %</p>
    </li>
  );
};

export default ProgressItem;
