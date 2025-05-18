import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleReset = async () => {
    if (password !== confirmPassword) {
      setMessage("Passwords don't match");
      return;
    }

    try {
      const res = await axios.post('http://localhost:3001/gym/reset-password', {
        token,
        password,
      });

      setMessage(res.data.msg);
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (err) {
      setMessage(err.response?.data?.msg || "Error resetting password");
    }
  };

  return (
    <div>
      <h2>Reset Password</h2>
      <input 
        type="password" 
        placeholder="New Password" 
        value={password} 
        onChange={e => setPassword(e.target.value)} 
      />
      <input 
        type="password" 
        placeholder="Confirm Password" 
        value={confirmPassword} 
        onChange={e => setConfirmPassword(e.target.value)} 
      />
      <button onClick={handleReset}>Reset Password</button>
      <p>{message}</p>
    </div>
  );
}
