import React, { useState } from 'react';
import axios from 'axios';

const StepForm = ({ user }) => {
  const [formData, setFormData] = useState({
    type: '',
    steps: '',
    userId: user?._id || '', // assuming user object is passed as prop
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3001/api/step', formData);
      alert('Step record added!');
      setFormData({ type: '', steps: '', userId: user?._id || '' });
    } catch (err) {
      alert('Error submitting step data.');
    }
  };

  return (
    <div style={{ maxWidth: '500px', margin: 'auto', padding: '30px' }}>
      <h2>Track Your Steps</h2>
      <form onSubmit={handleSubmit}>
        <label>Activity Type</label>
        <select
          name="type"
          value={formData.type}
          onChange={handleChange}
          required
        >
          <option value="">Select Type</option>
          <option value="Walking">🚶 Walking</option>
          <option value="Running">🏃 Running</option>
          <option value="Jogging">🏃‍♂️ Jogging</option>
          <option value="Hiking">🥾 Hiking</option>
        </select>

        <br /><br />
        <label>Number of Steps</label>
        <input
          type="number"
          name="steps"
          value={formData.steps}
          onChange={handleChange}
          required
        />
        <br /><br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default StepForm;
