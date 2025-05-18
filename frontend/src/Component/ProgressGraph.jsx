// components/ProgressGraph.jsx
import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import axios from 'axios';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const ProgressGraph = ({ userId }) => {
  const [progressData, setProgressData] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:3001/gym/progress/user/${userId}`)
      .then(response => setProgressData(response.data))
      .catch(error => console.error("Error fetching progress data:", error));
  }, [userId]);

  const data = {
    labels: progressData.map(entry => entry.date), 
    datasets: [
      {
        label: 'Weight (kg)',
        data: progressData.map(entry => entry.weight),
        fill: false,
        borderColor: 'rgba(75,192,192,1)',
        tension: 0.1,
      },
      {
        label: 'Body Fat (%)',
        data: progressData.map(entry => entry.bodyFat),
        fill: false,
        borderColor: 'rgba(255,99,132,1)',
        tension: 0.1,
      }
    ]
  };

  return (
    <div>
      <h2>Your Progress Over Time</h2>
      <Line data={data} />
    </div>
  );
};

export default ProgressGraph;
