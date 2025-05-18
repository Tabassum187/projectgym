import React, { useEffect, useState } from 'react';
import axios from 'axios';
import FoodItem from './FoodItem'; // Separate file for individual food cards
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const FoodList = ({ userId }) => {
  const [foodLogs, setFoodLogs] = useState([]);

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const res = await axios.get(`http://localhost:3001/gym/foods?userId=${userId}`);
        setFoodLogs(res.data);
      } catch (error) {
        console.error("Error fetching food logs:", error);
        toast.error("Failed to fetch food logs.");
      }
    };

    if (userId) fetchFoods();
  }, [userId]);

  return (
    <div className="container mt-4">
      <ToastContainer />
      <h2>Logged Meals</h2>
      {foodLogs.length === 0 ? (
        <p>No food logs found.</p>
      ) : (
        foodLogs.map((log) =>
          log.meals?.map((meal, idx) => (
            <FoodItem key={`${log._id}-${idx}`} food={meal} />
          ))
        )
      )}
    </div>
  );
};

export default FoodList;
