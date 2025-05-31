import React, { useEffect, useState } from 'react';
import axios from 'axios';

const StepList = ({ user }) => {
  const [stepsData, setStepsData] = useState([]);

  useEffect(() => {
    const fetchSteps = async () => {
      try {
        const res = await axios.get(`http://localhost:3001/api/step?userId=${user?._id}`);
        setStepsData(res.data);
      } catch (err) {
        console.error('Error fetching step data:', err);
      }
    };

    fetchSteps();
  }, [user]);

  return (
    <div style={{ padding: '20px' }}>
      <h2>Your Step Records</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
        {stepsData.map((item) => (
          <div key={item._id} style={{
            background: '#222',
            color: '#fff',
            padding: '20px',
            borderRadius: '10px',
            width: '250px'
          }}>
            <h4>{item.type}</h4>
            <p>Steps: {item.steps}</p>
            <p>Date: {new Date(item.date).toLocaleDateString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StepList;
