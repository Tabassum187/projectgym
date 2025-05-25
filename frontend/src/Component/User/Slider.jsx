import React from 'react';

const Slider = () => {
  const backgroundImageUrl = 'https://img.freepik.com/premium-photo/photo-fitness-man-woman-workout-gym_763111-22742.jpg'; // Replace with your actual image URL

  return (
    <>
      <section
        className="slider d-flex align-items-center"
        style={{
          minHeight: '100vh',
         backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.02), rgba(0, 0, 0, 0.02)), url(${backgroundImageUrl})`,

          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div className="container">
          <div className="row justify-content-center text-center">
            <div className="col-md-8">
              <span
                className="h6 d-inline-block mb-3 text-uppercase"
                style={{
                  color: '#FFD700',
                  letterSpacing: '1px',
                  fontSize: '1.1rem',
                }}
              >
                Your Fitness Journey Starts Here
              </span>

              <h1
                className="text-uppercase text-white mb-4"
                style={{ fontWeight: 'bold', fontSize: '3.6rem' }}
              >
                Step Up Your <span style={{ color: '#FFD700' }}>Fitness Challenge</span>
                <br />
                With Us
              </h1>

              <a
                href="/reg"
                target="_blank"
                className="btn"
                style={{
                  backgroundColor: '#FFD700',
                  color: '#000',
                  fontWeight: 'bold',
                  padding: '12px 28px',
                  borderRadius: '30px',
                  fontSize: '1.1rem',
                  textTransform: 'uppercase',
                  transition: '0.3s',
                }}
                onMouseOver={(e) => (e.target.style.backgroundColor = '#e6c200')}
                onMouseOut={(e) => (e.target.style.backgroundColor = '#FFD700')}
              >
                Join Us <i className="ti-angle-right ml-2"></i>
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Slider;
