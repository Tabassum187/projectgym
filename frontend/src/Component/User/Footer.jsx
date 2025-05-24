import React from 'react';

const Footer = () => {
  return (
    <footer style={{ backgroundColor: '#111', color: '#fff', padding: '20px 0' }}>
      <div className="container text-center">
        <h4 style={{ fontWeight: 'bold', color: '#FFD700', marginBottom: '10px' }}>FitTrackPro</h4>
        <p style={{ marginBottom: '5px', fontSize: '14px' }}>
          &copy; {new Date().getFullYear()} FitTrackPro. All rights reserved.
        </p>
        <p style={{ fontSize: '14px' }}>Contact: info@fittrackpro.com | +1 (409) 987–5874</p>
      </div>
    </footer>
  );
};

export default Footer;
