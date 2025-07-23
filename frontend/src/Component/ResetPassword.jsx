import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import styles from '../style/Register.module.css'; // Reuse same CSS module

export default function ResetPassword() {
  const [pswd, setPswd] = useState("");
  const [cpswd, setCPswd] = useState("");
  const { token } = useParams();
  const navigate = useNavigate();

  async function handleResetPassword() {
    try {
      if (!pswd || !cpswd) {
        toast.error("Please fill in both fields.");
        return;
      }

      if (pswd.length < 6) {
        toast.error("Password must be at least 6 characters.");
        return;
      }

      if (pswd === cpswd) {
        const res = await axios.post(`http://localhost:3001/gym/resetpswd/${token}`, {
          password: pswd,
        });

        toast.success(res.data.msg || "Password updated successfully!");
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else {
        toast.error("Passwords do not match.");
      }
    } catch (error) {
      toast.error(error.response?.data?.msg || "An error occurred.");
    }
  }

  return (
    <div className={styles.fullPageBackground}> {/* 🌟 Fullscreen Background Wrapper */}
      <div className={styles.registerContainer}>
        <h2>🔒 Reset Your Password</h2>
        <hr />
        <ToastContainer />

        <form style={{ maxWidth: "500px", margin: "0 auto" }}>
          <label>New Password</label>
          <input
            type="password"
            placeholder="Enter New Password"
            value={pswd}
            onChange={(e) => setPswd(e.target.value)}
          />

          <label>Confirm Password</label>
          <input
            type="password"
            placeholder="Confirm Password"
            value={cpswd}
            onChange={(e) => setCPswd(e.target.value)}
          />

          <button type="button" onClick={handleResetPassword}>Reset Password</button>
        </form>
      </div>
    </div>
  );
}
