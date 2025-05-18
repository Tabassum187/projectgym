import React from 'react';
import WorkoutList from './WorkoutList';
import FoodList from './FoodList';
import ProgressList from './ProgressList';
import ProgressGraph from './ProgressGraph';
import ProgressForm from './ProgressForm';

const Dashboard = () => {
  return (
    <div>
      <h1>Welcome to Your Gym Dashboard</h1>

      <section>
        <h2>Your Workouts</h2>
        <WorkoutList />
      </section>

      <section>
        <h2>Your Food Log</h2>
        <FoodList />
      </section>

      <section>
        <h2>Track Your Progress</h2>
        <ProgressGraph />
        <ProgressForm onSave={() => {}} />
        <ProgressList />
      </section>
    </div>
  );
};

export default Dashboard;
