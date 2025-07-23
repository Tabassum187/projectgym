import React, { useState } from 'react';
import axios from 'axios';
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";
import styles from '../style/Register.module.css'; // ✅ Reuse existing styles

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
    <div className={styles.fullPageBackground}> {/* 🌆 Fullscreen background */}
      <div className={styles.registerContainer}> {/* 🎯 Centered card */}
        <ToastContainer />
        <h2>📩 Forgot Your Password?</h2>
        <p style={{ textAlign: "center", marginBottom: "20px", color: "#004d4d" }}>
          Enter your registered email to receive a reset link.
        </p>

        <form style={{ maxWidth: "500px", margin: "0 auto" }}>
          <label>Email Address</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
          />

          <button type="button" onClick={handleSubmit}>
            Send Reset Link
          </button>
        </form>
      </div>
    </div>
  );
}
