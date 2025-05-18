import React from 'react';

const FoodItem = ({ food }) => {
  if (!food) return <div className="alert alert-warning">Invalid food item.</div>;

  return (
    <div className="card mb-3">
      <div className="card-body">
        <h5 className="card-title">{food.name}</h5>
        <p className="card-text">Meal Type: {food.mealType}</p>
        <p className="card-text">Calories: {food.calories}</p>
        <p className="card-text">Protein: {food.protein}g</p>
        <p className="card-text">Carbs: {food.carbs}g</p>
        <p className="card-text">Fat: {food.fat}g</p>
      </div>
    </div>
  );
};

export default FoodItem;
