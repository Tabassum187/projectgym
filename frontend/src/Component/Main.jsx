import React, { useState } from 'react';
import axios from 'axios';

export default function Main() {
  const [symptoms, setSymptoms] = useState('');
  const [aiResult, setAiResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSymptomSubmit = async () => {
    if (!symptoms.trim()) {
      alert("Please enter your symptoms.");
      return;
    }

    setLoading(true);
    setAiResult(null);

    try {
      const response = await axios.post('http://localhost:3001/api/openai/predict-disease', {
        symptoms,
      });

      setAiResult(response.data.result);
    } catch (error) {
      console.error('Error fetching AI result:', error);
      alert("Something went wrong while fetching AI prediction.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Enter Your Symptoms</h2>

      <textarea
        placeholder="e.g., fever, sore throat, headache"
        value={symptoms}
        onChange={(e) => setSymptoms(e.target.value)}
        style={styles.textarea}
      />

      <button
        onClick={handleSymptomSubmit}
        style={styles.button}
        disabled={loading}
      >
        {loading ? "Analyzing..." : "Get Suggested Doctors"}
      </button>

      {aiResult && (
        <div style={styles.resultBox}>
          <h3 style={styles.resultHeading}>AI Suggestion:</h3>
          <p style={styles.resultText}>{aiResult}</p>
        </div>
      )}
    </div>
  );
}

// ✅ Simple styles object
const styles = {
  container: {
    maxWidth: 600,
    margin: '50px auto',
    padding: 20,
    fontFamily: 'Arial, sans-serif',
  },
  heading: {
    marginBottom: 10,
    textAlign: 'center',
  },
  textarea: {
    width: '100%',
    height: 120,
    padding: 10,
    fontSize: 16,
    borderRadius: 8,
    border: '1px solid #ccc',
    marginBottom: 15,
  },
  button: {
    width: '100%',
    padding: 12,
    fontSize: 16,
    backgroundColor: '#007BFF',
    color: 'white',
    border: 'none',
    borderRadius: 8,
    cursor: 'pointer',
  },
  resultBox: {
    backgroundColor: '#f0f9ff',
    padding: 20,
    borderRadius: 10,
    marginTop: 20,
    border: '1px solid #a3d5ff',
  },
  resultHeading: {
    marginBottom: 10,
    color: '#0056b3',
  },
  resultText: {
    fontSize: 16,
    lineHeight: 1.5,
  },
};
