import React, { useEffect, useState } from 'react';
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function ShowUser() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("user_information"));

    if (!userInfo) {
      navigate('/login');
      return;
    }

    fetchUserData(userInfo._id);
  }, [navigate]);

  async function fetchUserData(userId) {
    try {
      const response = await axios.get(`http://localhost:3001/gym/getuser/${userId}`);
      setUser(response.data);
    } catch (error) {
      console.error("Failed to fetch user data", error);
    }
  }

  return (
    <div className="dark-theme">
      <div className="container-scroller">
        <div className="main-panel" style={{ padding: "20px" }}>
          <h1 className="text-white mb-4">Your Profile</h1>
          {user ? (
            <div className="card" style={{ backgroundColor: '#1e1e1e' }}>
              <div className="card-body text-white">
                <h4 className="card-title">{user.name}</h4>
                <p className="card-text">Email: {user.email || "No email provided"}</p>
                <p className="card-text">Age: {user.age || "Not specified"}</p>
                <p className="card-text">Gender: {user.gender || "Not specified"}</p>
                <p className="card-text">Join Date: {new Date(user.createdAt).toLocaleDateString()}</p>
              </div>
            </div>
          ) : (
            <p className="text-white">Loading profile...</p>
          )}
        </div>
      </div>
    </div>
  );
}
