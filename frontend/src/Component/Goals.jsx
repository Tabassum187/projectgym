import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Notifications from './Notifications';

const Goals = () => {
  const navigate = useNavigate();

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div className="dark-theme">
      <div className="container-scroller">
        {/* Navbar and Sidebar components */}

        <div className="main-panel" style={{ padding: '20px' }}>
          <h2 style={{ borderBottom: '2px solid #f3d438', paddingBottom: '0.5rem', color: '#f3d438' }}>
            🎯 Goals
          </h2>

          {/* Goals Notifications */}
          <Notifications />

          {/* Logout Button */}
          <button onClick={handleLogout}>Log Out</button>
        </div>
      </div>
    </div>
  );
};

export default Goals;
