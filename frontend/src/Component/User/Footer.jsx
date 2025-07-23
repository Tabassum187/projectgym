import React from 'react';

const Footer = () => {
  return (
    <footer style={{ backgroundColor: '#004d4d', color: '#fff', padding: '40px 0' }}>
      <div className="container text-center">
        <h4 style={{ fontWeight: 'bold', color: 'white', marginBottom: '10px' }}>MedCare Health</h4>
        <p style={{ marginBottom: '5px', fontSize: '14px' ,color: 'white', }}>
          &copy; {new Date().getFullYear()} MedCare Health. All rights reserved.
        </p>
        <p style={{ fontSize: '14px' , color: 'white' }}>
          Contact: <a href="mailto:info@medcarehealth.com" style={{ color: 'white' }}>info@medcarehealth.com</a>  | Call us: +1 (800) 123–4567
        </p>
        <div style={{ marginTop: '15px' }}>
          <a 
            href="https://www.facebook.com" 
            target="_blank" 
            rel="noopener noreferrer" 
            style={{
              margin: '0 10px',
              color: '#fff',
              fontSize: '20px',
              transition: 'color 0.3s ease',
            }}
            onMouseEnter={(e) => e.target.style.color = '#FFD700'} 
            onMouseLeave={(e) => e.target.style.color = '#fff'}
          >
            <i className="fab fa-facebook-f"></i>
          </a>
          <a 
            href="https://www.twitter.com" 
            target="_blank" 
            rel="noopener noreferrer" 
            style={{
              margin: '0 10px',
              color: '#fff',
              fontSize: '20px',
              transition: 'color 0.3s ease',
            }}
            onMouseEnter={(e) => e.target.style.color = '#FFD700'} 
            onMouseLeave={(e) => e.target.style.color = '#fff'}
          >
            <i className="fab fa-twitter"></i>
          </a>
          <a 
            href="https://www.instagram.com" 
            target="_blank" 
            rel="noopener noreferrer" 
            style={{
              margin: '0 10px',
              color: '#fff',
              fontSize: '20px',
              transition: 'color 0.3s ease',
            }}
            onMouseEnter={(e) => e.target.style.color = '#FFD700'} 
            onMouseLeave={(e) => e.target.style.color = '#fff'}
          >
            <i className="fab fa-instagram"></i>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
