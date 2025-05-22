import React, { useState, useEffect } from 'react';
import styles from '../style/Register.module.css';
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from 'react-router-dom';

export default function Profile() {
  const [formData, setFormData] = useState({
    name: "", email: "", gender: "", age: 0, contact: "",
    height: "", weight: "", bmi_index: "", target_weight: "",
    bp: "", diabities: ""
  });

  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  useEffect(() => {
    // Auto-fill from stored user
    if (user?._id) {
      axios.get(`http://localhost:3001/gym/user/${user._id}`)
        .then((res) => {
          setFormData(res.data);
        })
        .catch((err) => {
          toast.error("Failed to load profile");
        });
    } else {
      toast.error("Not logged in");
      navigate("/login");
    }
  }, []);

  const handleChange = (e) => {
    let { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRadio = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:3001/gym/user/${user._id}`, formData);
      toast.success("Profile updated successfully");

      // update user in localStorage
      localStorage.setItem("user", JSON.stringify(response.data.data));

    } catch (err) {
      toast.error(err.response?.data?.msg || "Update failed");
    }
  };

  return (
    <div className={styles.registerContainer}>
      <ToastContainer />
      <h2>Update Your Profile 🧍</h2>

      <form className={styles.formGrid} onSubmit={handleUpdate}>
        <div>
          <label>Full Name</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} />

          <label>Email Address</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} />

          <label>Gender</label>
          <div className={styles.genderOptions}>
            {["male", "female", "other"].map((g) => (
              <label key={g}>
                <input type="radio" name="gender" value={g}
                  checked={formData.gender === g}
                  onChange={() => handleRadio("gender", g)} /> {g}
              </label>
            ))}
          </div>

          <label>Age</label>
          <input type="number" name="age" value={formData.age} onChange={handleChange} />

          <label>Contact</label>
          <input type="text" name="contact" value={formData.contact} onChange={handleChange} />
        </div>

        <div>
          <label>Height (cm)</label>
          <input type="text" name="height" value={formData.height} onChange={handleChange} />

          <label>Weight (kg)</label>
          <input type="text" name="weight" value={formData.weight} onChange={handleChange} />

          <label>BMI Index</label>
          <input type="text" name="bmi_index" value={formData.bmi_index} onChange={handleChange} />

          <label>Target Weight</label>
          <input type="text" name="target_weight" value={formData.target_weight} onChange={handleChange} />

          <label>Blood Pressure</label>
          <div className={styles.genderOptions}>
            {["yes", "no"].map((v) => (
              <label key={v}>
                <input type="radio" name="bp" value={v}
                  checked={formData.bp === v}
                  onChange={() => handleRadio("bp", v)} /> {v}
              </label>
            ))}
          </div>

          <label>Diabities</label>
          <div className={styles.genderOptions}>
            {["yes", "no"].map((v) => (
              <label key={v}>
                <input type="radio" name="diabities" value={v}
                  checked={formData.diabities === v}
                  onChange={() => handleRadio("diabities", v)} /> {v}
              </label>
            ))}
          </div>
        </div>

        <div style={{ gridColumn: "1 / -1", textAlign: "center" }}>
          <button type="submit">Update Profile</button>
        </div>
      </form>
    </div>
  );
}
