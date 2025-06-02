import axios from 'axios';
import { useEffect, useState } from 'react';

function WeightHeightBMI() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userInfo = localStorage.getItem('user_information');
    console.log('LocalStorage user_information:', userInfo);
    if (!userInfo) {
      setLoading(false);
      return;
    }
    let userId;
    try {
      const user = JSON.parse(userInfo);
      userId = user.id || user.userId || user.email;
      console.log('User ID:', userId);
    } catch (e) {
      console.error('Invalid user_information format');
      setLoading(false);
      return;
    }
  
    axios.get(`http://localhost:3001/gym/getuser/${userId}`)
      .then(res => {
        console.log('User data from API:', res.data);
        setUserData(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching user data:', err);
        setLoading(false);
      });
  }, []);
  

  if (loading) return <p>Loading user data...</p>;
  if (!userData) return <p>User data not found.</p>;

  // Weight (kg) aur height (cm) le kar BMI calculate karenge
  const weight = parseFloat(userData.weight); // kg
  const height = parseFloat(userData.height); // cm
  const heightInMeters = height / 100;

  const bmi = weight && heightInMeters ? (weight / (heightInMeters * heightInMeters)).toFixed(2) : null;

  return (
    <div style={{ backgroundColor: '#1e1e1e', padding: '20px', borderRadius: '8px', color: '#fff', maxWidth: '400px', margin: 'auto' }}>
      <h3>Your Body Stats</h3>
      <p><strong>Weight:</strong> {weight ? `${weight} kg` : 'Not available'}</p>
      <p><strong>Height:</strong> {height ? `${height} cm` : 'Not available'}</p>
      <p><strong>BMI:</strong> {bmi ? bmi : 'Cannot calculate BMI'}</p>
      {bmi && (
        <p>
          Status: {
            bmi < 18.5 ? 'Underweight' :
            bmi < 24.9 ? 'Normal weight' :
            bmi < 29.9 ? 'Overweight' :
            'Obesity'
          }
        </p>
      )}
    </div>
  );
}

export default WeightHeightBMI;
