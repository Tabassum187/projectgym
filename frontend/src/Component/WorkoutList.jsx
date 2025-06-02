import React, { useEffect, useState } from 'react';
import axios from 'axios';

// Helpers

function getStartOfWeek(date) {
  const d = new Date(date);
  const day = d.getDay();
  d.setDate(d.getDate() - day);
  d.setHours(0, 0, 0, 0);
  return d;
}

function addDays(date, days) {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
}

function formatDate(date) {
  if (!date) return '';
  const d = new Date(date);
  return d.toISOString().substring(0, 10);
}

const WorkoutList = () => {
  const [workoutLogs, setWorkoutLogs] = useState([]);
  const [editItem, setEditItem] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    workoutType: '',
    duration: '',
    caloriesBurned: '',
    date: ''
  });
  const [showPopup, setShowPopup] = useState(false);
  const [searchName, setSearchName] = useState('');
  const [searchWorkoutType, setSearchWorkoutType] = useState('');
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    const fetchWorkoutLogs = async () => {
      try {
        const res = await axios.get('http://localhost:3001/gym/workout');
        console.log("Workout response:", res.data);
        setWorkoutLogs(res.data || []);
      } catch (error) {
        console.error("Error fetching workout logs:", error.message);
      }
    };

    fetchWorkoutLogs();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Delete this workout log?')) {
      try {
        await axios.delete(`http://localhost:3001/gym/workout/${id}`);
        const res = await axios.get('http://localhost:3001/gym/workout');
        setWorkoutLogs(res.data || []);
      } catch (error) {
        console.error("Delete failed:", error);
      }
    }
  };

  const openEditModal = (log) => {
    setEditItem(log._id);
    setFormData({
      name: log.name || '',
      workoutType: log.workoutType || '',
      duration: log.duration || '',
      caloriesBurned: log.caloriesBurned || '',
      date: log.date ? new Date(log.date).toISOString().substring(0, 10) : ''
    });
    setShowPopup(true);
  };

  const closeModal = () => {
    setEditItem(null);
    setFormData({
      name: '',
      workoutType: '',
      duration: '',
      caloriesBurned: '',
      date: ''
    });
    setShowPopup(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    if (!editItem) return;
    const updatedData = {
      name: formData.name,
      workoutType: formData.workoutType,
      duration: Number(formData.duration),
      caloriesBurned: Number(formData.caloriesBurned),
      date: new Date(formData.date).toISOString()
    };

    try {
      await axios.put(`http://localhost:3001/gym/workout/${editItem}`, updatedData);
      closeModal();
      const res = await axios.get('http://localhost:3001/gym/workout');
      setWorkoutLogs(res.data || []);
    } catch (error) {
      console.error("Update failed:", error);
    }
  };

  const filteredLogs = workoutLogs.filter(log => {
    if (!log) return false;
    const nameMatch = log.name?.toLowerCase().includes(searchName.toLowerCase());
    const typeMatch = !searchWorkoutType || log.workoutType === searchWorkoutType;
    return nameMatch && typeMatch;
  });

  const displayedLogs = selectedDate
    ? filteredLogs.filter(log => formatDate(log.date) === formatDate(selectedDate))
    : filteredLogs;

  const weekStart = selectedDate ? getStartOfWeek(selectedDate) : null;
  const weekDays = selectedDate
    ? Array.from({ length: 7 }).map((_, i) => {
        const d = addDays(weekStart, i);
        return {
          date: d,
          formatted: d.toLocaleDateString(undefined, { weekday: 'short', day: 'numeric' }),
          iso: formatDate(d)
        };
      })
    : [];

  return (
    <div className="dark-theme">
      <div className="main-panel" style={{ padding: '20px' }}>
        <h2>Your Workout</h2>

        {/* Filters */}
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '20px' }}>
          <input
            type="text"
            placeholder="Search by name..."
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
            style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
          />
          <select
            value={searchWorkoutType}
            onChange={(e) => setSearchWorkoutType(e.target.value)}
            style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
          >
            <option value="">All Workout Types</option>
            <option value="Strength Training">Strength Training</option>
            <option value="Yoga">Yoga</option>
            <option value="HIIT">HIIT</option>
            <option value="Cardio">Cardio</option>
          </select>
          <button
            onClick={() => {
              setShowCalendar(!showCalendar);
              if (!showCalendar) setSelectedDate(new Date());
              else setSelectedDate(null);
            }}
            style={{
              padding: '8px 16px',
              backgroundColor: 'yellow',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
          >
            {showCalendar ? 'Hide Calendar' : 'Show Calendar'}
          </button>
        </div>

        {/* Calendar */}
        {showCalendar && selectedDate && (
          <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
            {weekDays.map(day => (
              <div
                key={day.iso}
                onClick={() => setSelectedDate(new Date(day.iso))}
                style={{
                  cursor: 'pointer',
                  padding: '10px',
                  backgroundColor: formatDate(selectedDate) === day.iso ? 'yellow' : '#333',
                  color: formatDate(selectedDate) === day.iso ? '#000' : '#fff',
                  borderRadius: '6px',
                  minWidth: '70px',
                  textAlign: 'center'
                }}
              >
                {day.formatted}
              </div>
            ))}
          </div>
        )}

        {/* Logs Display */}
        <div style={{ display: 'grid', gap: '20px', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))' }}>
          {displayedLogs.length > 0 ? displayedLogs.map(log => {
            return (
              <div key={log._id} style={{
                backgroundColor: '#1e1e1e',
                padding: '15px',
                borderRadius: '10px',
                color: 'white'
              }}>
                <p><strong>Date:</strong> {formatDate(log.date)}</p>
                <p><strong>Name:</strong> {log.name}</p>
                <p><strong>Type:</strong> {log.workoutType}</p>
                <p><strong>Duration:</strong> {log.duration} min</p>
                <p><strong>Calories:</strong> {log.caloriesBurned}</p>
                <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
                  <button onClick={() => openEditModal(log)} style={{ backgroundColor: '#ffc107', padding: '6px', borderRadius: '5px' }}>✏️</button>
                  <button onClick={() => handleDelete(log._id)} style={{ backgroundColor: '#dc3545', padding: '6px', borderRadius: '5px', color: 'white' }}>🗑️</button>
                </div>
              </div>
            );
          }) : (
            <p style={{ color: 'gray' }}>No workout logs available.</p>
          )}
        </div>

        {/* Edit Modal */}
        {showPopup && (
          <div style={{
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.8)',
            display: 'flex', justifyContent: 'center', alignItems: 'center',
            zIndex: 1000
          }}>
            <div style={{
              backgroundColor: '#121212',
              padding: '30px',
              borderRadius: '10px',
              width: '90%',
              maxWidth: '400px',
              color: 'white'
            }}>
              <h3>Edit Workout</h3>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                style={{ width: '100%', marginBottom: '10px' }}
              />
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Workout Name"
                style={{ width: '100%', marginBottom: '10px' }}
              />
              <select
                name="workoutType"
                value={formData.workoutType}
                onChange={handleChange}
                style={{ width: '100%', marginBottom: '10px' }}
              >
                <option value="">Select Type</option>
                <option value="Strength Training">Strength Training</option>
                <option value="Yoga">Yoga</option>
                <option value="HIIT">HIIT</option>
                <option value="Cardio">Cardio</option>
              </select>
              <input
                type="number"
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                placeholder="Duration (min)"
                style={{ width: '100%', marginBottom: '10px' }}
              />
              <input
                type="number"
                name="caloriesBurned"
                value={formData.caloriesBurned}
                onChange={handleChange}
                placeholder="Calories Burned"
                style={{ width: '100%', marginBottom: '10px' }}
              />
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                <button onClick={closeModal} style={{ padding: '8px 12px' }}>Cancel</button>
                <button onClick={handleSave} style={{ backgroundColor: 'yellow', padding: '8px 12px', border: 'none', cursor: 'pointer' }}>Save</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WorkoutList;
