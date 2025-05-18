// components/ProgressList.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProgressItem from './ProgressItem';

const ProgressList = ({ userId }) => {
  const [progressEntries, setProgressEntries] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:3001/gym/progress/user/${userId}`)
      .then(response => setProgressEntries(response.data))
      .catch(error => console.error("Error fetching progress:", error));
  }, [userId]);

  return (
    <div>
      <h2>Your Progress Entries</h2>
      <ul className="list-group">
        {progressEntries.map(progress => (
          <ProgressItem key={progress._id} progress={progress} />
        ))}
      </ul>
    </div>
  );
};

export default ProgressList;
