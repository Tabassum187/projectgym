import axios from 'axios';
import React, { useEffect, useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  FaUserMd, FaCalendarAlt, FaHospital, FaFlask, FaPills, 
  FaFileInvoiceDollar, FaAmbulance, FaChartLine, FaBell, FaCog 
} from 'react-icons/fa';

export default function Main() {
  let navigate = useNavigate();
  const [userEmail, setUserEmail] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
const [hospitals, setHospitals] = useState([]);

useEffect(() => {
  axios.get('http://localhost:3001/api/hospitals/top?city=Karachi&limit=10')
    .then(res => setHospitals(res.data))
    .catch(err => console.error(err));
}, []);

  useEffect(() => {
    const userInfo = localStorage.getItem("user_information");
    if (userInfo) {
      try {
        const parsed = JSON.parse(userInfo);
        setUserEmail(parsed.email);
      } catch (e) {
        console.error("Invalid user_information format");
        localStorage.removeItem("user_information");
      }
    } else {
      navigate('/login');
    }
  }, [navigate]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      localStorage.removeItem("user_information");
      setUserEmail(null);
      navigate('/login');
    }
  };

  if (!userEmail) return null;

  // Hospital dashboard cards info
  const cards = [
    { id: 1, title: 'Patients', icon: <FaUserMd size={30} color="#004d4d" />, link: '/patients' },
    { id: 2, title: 'Appointments', icon: <FaCalendarAlt size={30} color="#004d4d" />, link: '/appointments' },
    { id: 3, title: 'Doctors', icon: <FaHospital size={30} color="#004d4d" />, link: '/doctors' },
    { id: 4, title: 'Lab Tests', icon: <FaFlask size={30} color="#004d4d" />, link: '/lab-tests' },
    { id: 5, title: 'Pharmacy', icon: <FaPills size={30} color="#004d4d" />, link: '/pharmacy' },
    { id: 6, title: 'Billing', icon: <FaFileInvoiceDollar size={30} color="#004d4d" />, link: '/billing' },
    { id: 7, title: 'Emergency', icon: <FaAmbulance size={30} color="#d32f2f" />, link: '/emergency' },
    { id: 8, title: 'Reports', icon: <FaChartLine size={30} color="#004d4d" />, link: '/reports' },
    { id: 9, title: 'Notifications', icon: <FaBell size={30} color="#004d4d" />, link: '/notifications' },
    { id: 10, title: 'Settings', icon: <FaCog size={30} color="#004d4d" />, link: '/settings' },
  ];

  return (
    <>
      {/* Navbar */}
      <nav
        className="navbar"
        style={{
          backgroundColor: "#004d4d",
          padding: '10px 20px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          color: 'white',
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          boxShadow: '0 2px 6px rgba(0,0,0,0.3)'
        }}
      >
        <div>
          <a
            href="/dashboard"
            style={{ color: 'white', fontWeight: 'bold', fontSize: 24, textDecoration: 'none' }}
          >
            FitTrackPro Hospital
          </a>
        </div>

        <div ref={dropdownRef} style={{ position: 'relative', cursor: 'pointer' }}>
          <div
            onClick={() => setDropdownOpen(!dropdownOpen)}
            style={{
              display: 'flex',
              alignItems: 'center',
              fontWeight: 'bold',
              fontSize: 16,
              userSelect: 'none',
              color: 'white',
            }}
            title="User Menu"
          >
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: '50%',
                backgroundColor: 'white',
                color: '#121212',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: 10,
                textTransform: 'uppercase',
                fontSize: 16,
              }}
            >
              {userEmail.charAt(0)}
            </div>
            {userEmail}
            <i className="mdi mdi-menu-down" style={{ marginLeft: 6 }}></i>
          </div>

          {dropdownOpen && (
            <div
              style={{
                position: 'absolute',
                right: 0,
                backgroundColor: '#1e1e1e',
                borderRadius: 6,
                boxShadow: '0 4px 12px rgba(0,0,0,0.5)',
                marginTop: 8,
                minWidth: 180,
                padding: '8px 0',
                zIndex: 1000,
              }}
            >
              <div
                style={{ padding: '10px 20px', color: 'white', cursor: 'pointer', fontSize: 15 }}
                onClick={() => {
                  setDropdownOpen(false);
                  alert('Profile popup coming soon!');
                }}
              >
                👤 Profile
              </div>
              <div
                style={{ padding: '10px 20px', color: 'white', cursor: 'pointer', borderTop: '1px solid #333', fontSize: 15 }}
                onClick={handleLogout}
              >
                🔓 Logout
              </div>
            </div>
          )}
        </div>
      </nav>
<div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 20 }}>
  {hospitals.map((h, i) => (
    <Link
      key={h._id}
      to={`/hospital/${h._id}`}
      // ...same styling
    >
      {h.imageUrl && (
        <img src={h.imageUrl} alt={h.name} style={{ width: '100%', height: 100, objectFit: 'cover', borderRadius: 8 }} />
      )}
      <div style={{ marginTop: 10, fontWeight: '600', fontSize: 18 }}>{h.name}</div>
     
      <div style={{ marginTop: 4, fontSize: 14, color: '#666' }}>
        Rating: {h.rating.toFixed(1)}
      </div>
    </Link>
  ))}
</div>

      {/* Main Content */}
      <main
        style={{
          padding: '100px 40px 40px', // top padding to offset fixed navbar
          backgroundColor: '#f5f7fa',
          minHeight: '100vh',
          boxSizing: 'border-box',
        }}
      >
        <h1 style={{ color: "#004d4d", marginBottom: 30, fontWeight: 'bold' }}>
          Welcome to Your Hospital Dashboard
        </h1>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(5, 1fr)', // 5 cards in a row
            gap: 20,
          }}
        >
          {cards.map(card => (
            <Link
              key={card.id}
              to={card.link}
              style={{
                backgroundColor: 'white',
                borderRadius: 10,
                padding: 20,
                boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                color: "#004d4d",
                textDecoration: 'none',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                transition: 'transform 0.2s ease',
                minHeight: 140,
                justifyContent: 'center',
                cursor: 'pointer',
              }}
              onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.05)')}
              onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
            >
              <div style={{ marginBottom: 15 }}>{card.icon}</div>
              <div style={{ fontWeight: '600', fontSize: 18 }}>{card.title}</div>
            </Link>
          ))}
        </div>
      </main>
    </>
  );
}
