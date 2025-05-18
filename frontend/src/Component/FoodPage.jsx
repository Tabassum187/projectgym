import React, { useEffect, useState } from 'react';
import axios from 'axios';
import FoodForm from '../components/FoodForm';

export default function FoodPage() {
  const [foods, setFoods] = useState([]);
  const user = JSON.parse(localStorage.getItem("user")); // 👈 Assuming user data is stored in localStorage after login
  
  // Fetch foods associated with the logged-in user
  const fetchFoods = async () => {
    try {
      const res = await axios.get(`http://localhost:3001/APTECH/food?userId=${user._id}`);
      setFoods(res.data);
    } catch (err) {
      console.error("Error fetching foods:", err);
    }
  };

  // Call fetchFoods when the page loads
  useEffect(() => {
    fetchFoods();
  }, []);

  return (
    <div className="container mt-4">
      <h2>🍽️ Your Daily Meals</h2>

      {/* FoodForm for adding new food entries */}
      <FoodForm userId={user._id} onSave={fetchFoods} />

      <hr />

      <h4>Saved Foods</h4>
      <ul>
        {foods.map((f, index) => (
          <li key={index}>
            {f.meals[0]?.name} - {f.meals[0]?.mealType} - {f.meals[0]?.calories} cal
          </li>
        ))}
      </ul>
    </div>
  );
}
