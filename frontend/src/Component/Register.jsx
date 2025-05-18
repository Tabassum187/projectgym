import React, { useState } from 'react';
import styles from '../style/Register.module.css';
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate, Link } from 'react-router-dom';
import "react-toastify/dist/ReactToastify.css";

export default function Register() {
  let [name, setName] = useState("");
  let [email, setEmail] = useState("");
  let [pswd, setPswd] = useState("");
  let [gender, setGender] = useState("");
  let [age, setAge] = useState(0);
  let [contact, setContact] = useState("");
  let [height, setHeight] = useState("");
  let [weight, setWeight] = useState("");
  let [bmi_index, setBmiIndex] = useState("");
  let [target_weight, setTargetWeight] = useState("");
  let [bp, setBp] = useState("");
  let [diabities, setDiabities] = useState("");

  let navigate = useNavigate();

  let clear = () => {
    setName(""); setEmail(""); setPswd(""); setGender(""); setAge(0);
    setContact(""); setHeight(""); setWeight(""); setBmiIndex("");
    setTargetWeight(""); setBp(""); setDiabities("");
  };

  let register_user = async (e) => {
    e.preventDefault();
    try {
      let password_regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;
      let username_regex = /^[A-Za-z ]+$/;

      if (!name || !email || !pswd || !gender || age <= 0 || !contact || !height || !weight || !bmi_index || !target_weight || !bp || !diabities) {
        toast.error("All fields are required");
        return;
      }

      if (!password_regex.test(pswd)) {
        toast.error("Password must be 8+ characters with uppercase, lowercase, number & special char");
        return;
      }

      if (!username_regex.test(name)) {
        toast.error("Name must contain only letters and spaces");
        return;
      }

      let response = await axios.post("http://localhost:3001/gym/user", {
        name, email, password: pswd, gender, age, contact,
        height, weight, bmi_index, target_weight, bp, diabities
      });

      clear();
      toast.success(response.data.msg);

      setTimeout(() => {
        navigate('/login', { state: { registered: true } });
      }, 1000);

    } catch (error) {
      if (error.response?.status === 409) {
        toast.error("Email Already Exists");
      } else {
        toast.error(error.response?.data?.msg || "Something went wrong");
        console.error(error);
      }
    }
  };

  return (
    <div className={styles.registerContainer}>
      <ToastContainer />
      <h2><strong>Transform Yourself – Join Our Fitness Team 🏋️‍♀️</strong></h2>

      <form className={styles.formGrid} onSubmit={register_user}>
        {/* Left Column */}
        <div>
          <label>Full Name</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />

          <label>Email Address</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />

          <label>Password</label>
          <input type="password" value={pswd} onChange={(e) => setPswd(e.target.value)} />

          <label>Gender</label>
          <div className={styles.genderOptions}>
            {["male", "female", "other"].map((g) => (
              <label key={g}>
                <input type="radio" name="gender" value={g}
                  onChange={(e) => setGender(e.target.value)} checked={gender === g} /> {g}
              </label>
            ))}
          </div>

          <label>Age</label>
          <input type="number" value={age} onChange={(e) => setAge(e.target.value)} />

          <label>Contact</label>
          <input type="number" value={contact} onChange={(e) => setContact(e.target.value)} />
        </div>

        {/* Right Column */}
        <div>
          <label>Height (cm)</label>
          <input type="number" value={height} onChange={(e) => setHeight(e.target.value)} />

          <label>Weight (kg)</label>
          <input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} />

          <label>BMI Index</label>
          <input type="text" value={bmi_index} onChange={(e) => setBmiIndex(e.target.value)} />

          <label>Target Weight (kg)</label>
          <input type="number" value={target_weight} onChange={(e) => setTargetWeight(e.target.value)} />

          <label>Blood Pressure</label>
          <div className={styles.genderOptions}>
            {["yes", "no"].map((v) => (
              <label key={v}><input type="radio" name="bp" value={v}
                onChange={(e) => setBp(e.target.value)} checked={bp === v} /> {v}</label>
            ))}
          </div>

          <label>Diabities</label>
          <div className={styles.genderOptions}>
            {["yes", "no"].map((v) => (
              <label key={v}><input type="radio" name="diabities" value={v}
                onChange={(e) => setDiabities(e.target.value)} checked={diabities === v} /> {v}</label>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <div style={{ gridColumn: "1 / -1", textAlign: "center" }}>
          <button type="submit">Register Now</button>

         <p style={{ marginTop: "1rem", color: "white", fontSize: "1.1rem" }}>
  Already have an account?{" "}
  <Link to="/login" style={{ color: "#4caf50", textDecoration: "underline", fontSize: "1.1rem" }}>
    Login now
  </Link>
</p>

        </div>
      </form>
    </div>
  );
}
