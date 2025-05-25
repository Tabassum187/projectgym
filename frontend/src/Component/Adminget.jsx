import React, { useEffect, useState } from 'react';
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Adminget() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("user_information"));
    
    if (!userInfo || userInfo.email !== "admin@gmail.com") {
      navigate('/login');
      return;
    }

    fetchAllUsers();
  }, [navigate]);

  async function fetchAllUsers() {
    try {
      const response = await axios.get("http://localhost:3001/gym/getuser");
      setUsers(response.data);
    } catch (error) {
      console.error("Failed to fetch users", error);
    }
  }

  return (
    <div style={{ 
      backgroundColor: '#0f0f0f',
      minHeight: '100vh',
      padding: '2rem',
      color: '#ffffff'
    }}>
     <div style={{ 
  maxWidth: '220px',
  margin: '0 auto',
  textAlign: 'center' // Center everything
}}>
  {/* Compact Dashboard Button */}
  <button 
    onClick={() => navigate('/dashboard')} 
    style={{
      backgroundColor: '#ffd700',
      color: '#1a1a1a',
      border: 'none',
      padding: '0.5rem 1rem',
      borderRadius: '6px',
      fontSize: '1rem',
      fontWeight: '800',
      cursor: 'pointer',
      transition: 'all 0.3s',
      marginBottom: '1rem',
      ':hover': {
        backgroundColor: '#ffc800',
        transform: 'translateY(-2px)'
      }
    }}
  >
    ← Back to Dashboard
  </button>
  
  <h1 style={{
    color: '#ffd700',
    fontSize: '2.5rem',
    fontWeight: '600',
    paddingBottom: '0.5rem',
    margin: 0
  }}>ALL USER DETAILS</h1>
          
          <div style={{ width: '120px' }}></div> {/* Spacer for balance */}
        </div>
        
        {users.length === 0 ? (
          <div style={{
            backgroundColor: '#1a1a1a',
            padding: '3rem',
            borderRadius: '12px',
            textAlign: 'center',
            marginTop: '2rem'
          }}>
            <p style={{ 
              color: '#ffd700', 
              fontSize: '1.5rem',
              margin: 0
            }}>No user records found</p>
          </div>
        ) : (
          <div style={{ 
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '1.2rem'
          }}>
            {users.map((user) => (
              <div key={user._id} style={{ 
                backgroundColor: '#1a1a1a',
                borderRadius: '10px',
                padding: '1.2rem',
                transition: 'transform 0.3s',
                ':hover': {
                  transform: 'translateY(-3px)',
                  boxShadow: '0 5px 12px rgba(255, 215, 0, 0.1)'
                }
              }}>
                <div style={{ 
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: '1rem'
                }}>
                  <div style={{
                    width: '45px',
                    height: '45px',
                    borderRadius: '50%',
                    backgroundColor: '#ffd700',
                    color: '#1a1a1a',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.1rem',
                    fontWeight: 'bold',
                    marginRight: '0.8rem'
                  }}>
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <h3 style={{
                    color: '#ffd700',
                    fontSize: '1.3rem',
                    margin: 0
                  }}>{user.name}</h3>
                </div>
                
                <div style={{ marginBottom: '0.8rem' }}>
                  <p style={{ 
                    color: '#aaaaaa',
                    fontSize: '0.85rem',
                    marginBottom: '0.2rem'
                  }}>Email</p>
                  <p style={{ 
                    color: '#ffffff',
                    fontSize: '1rem',
                    margin: 0,
                    wordBreak: 'break-all'
                  }}>{user.email || "Not provided"}</p>
                </div>
                
                <div style={{ 
                  display: 'flex',
                  justifyContent: 'space-around',
                  marginTop: '1rem'
                }}>
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                  }}>
                    <p style={{ 
                      color: '#aaaaaa',
                      fontSize: '0.85rem',
                      marginBottom: '0.2rem'
                    }}>Age</p>
                    <p style={{ 
                      color: '#ffffff',
                      fontSize: '1rem',
                      margin: 0
                    }}>{user.age || "—"}</p>
                  </div>
                  
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                  }}>
                    <p style={{ 
                      color: '#aaaaaa',
                      fontSize: '0.85rem',
                      marginBottom: '0.2rem'
                    }}>Gender</p>
                    <p style={{ 
                      color: '#ffffff',
                      fontSize: '1rem',
                      margin: 0
                    }}>{user.gender || "—"}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
   
  );
}