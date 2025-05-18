import React, { useState } from 'react';
import axios from 'axios';
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";
import styles from '../style/ForgetPassword.module.css'; 
// CSS Module for dark theme

export default function ForgetPassword() {
  const [email, setEmail] = useState("");

  async function handleSubmit() {
    try {
      const response = await axios.post(`http://localhost:3001/gym/fp`, { email });
      toast.success(response.data.msg);
      setEmail("");
    } catch (err) {
      toast.error(err.response?.data?.msg || "Kuch ghalat hogaya hai.");
    }
  }

  return (
    <div className={styles.container}>
      <ToastContainer />
      <h2 className={styles.title}>🏋️‍♂️ Welcome Back</h2>
      <h2 className={styles.title}>Forget Password</h2>

      <label htmlFor="email" className={styles.label}>Email Address</label>
      <input
        type="email"
        id="email"
        name='email'
        required
        value={email}
        className={styles.input}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
      />

      <button className={styles.button} onClick={handleSubmit}>Send Reset Link</button>
    </div>
  );
}
