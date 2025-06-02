import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UpdateProfile = () => {
  const user = JSON.parse(localStorage.getItem('user_information'));

  const [formData, setFormData] = useState({
    height: '',
    weight: ''
  });

  const [bmi, setBmi] = useState('');
  const [bmiCategory, setBmiCategory] = useState('');
  const [loaded, setLoaded] = useState(false); // Prevent overwrite after edit

  // Fetch user data on first load
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`http://localhost:3001/gym/userprofile/${user._id}`);
        const { height, weight } = res.data;

        setFormData({
          height: height ? height.toString() : '',
          weight: weight ? weight.toString() : ''
        });

        setLoaded(true); // only run once
      } catch (err) {
        console.error('Failed to fetch profile', err);
      }
    };

    if (user && user._id && !loaded) {
      fetchData();
    }
  }, [user, loaded]);

  // Auto calculate BMI
  useEffect(() => {
    const h = parseFloat(formData.height);
    const w = parseFloat(formData.weight);
    const heightInMeters = h / 100;

    if (h && w) {
      const calculatedBmi = (w / (heightInMeters * heightInMeters)).toFixed(2);
      setBmi(calculatedBmi);

      if (calculatedBmi < 18.5) setBmiCategory('Underweight');
      else if (calculatedBmi < 24.9) setBmiCategory('Normal weight');
      else if (calculatedBmi < 29.9) setBmiCategory('Overweight');
      else setBmiCategory('Obese');
    } else {
      setBmi('');
      setBmiCategory('');
    }
  }, [formData.height, formData.weight]);

  // Handle form input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`http://localhost:3001/gym/userprofile/${user._id}`, {
        height: parseFloat(formData.height),
        weight: parseFloat(formData.weight),
        bmi_index: parseFloat(bmi)
      });

      alert('Profile updated!');
    } catch (err) {
      console.error(err.response.data.msg);
      alert('Update failed');
    }
  };

  return (
    <div style={{
      backgroundColor: '#222',
      padding: '30px',
      borderRadius: '12px',
      maxWidth: '500px',
      margin: '50px auto',
      color: '#fff',
      boxShadow: '0 0 15px rgba(0,0,0,0.5)'
    }}>
      <h2 style={{ textAlign: 'center', color: '#ffd700' }}>Update Profile</h2>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div>
          <label>Height (cm)</label>
          <input
            type="number"
            name="height"
            value={formData.height}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '10px' }}
          />
        </div>

        <div>
          <label>Weight (kg)</label>
          <input
            type="number"
            name="weight"
            value={formData.weight}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '10px' }}
          />
        </div>

        <div>
          <label>BMI (Auto-calculated)</label>
          <input
            type="text"
            value={bmi}
            readOnly
            style={{ width: '100%', padding: '10px', backgroundColor: '#333', color: '#fff' }}
          />
        </div>

        {bmiCategory && (
          <div style={{ color: '#ffd700', fontWeight: 'bold' }}>
            BMI Category: {bmiCategory}
          </div>
        )}

        <button type="submit" style={{
          padding: '12px',
          backgroundColor: '#ffd700',
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer'
        }}>
          Update
        </button>
      </form>
    </div>
  );
};

export default UpdateProfile;
