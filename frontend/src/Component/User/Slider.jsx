import React from 'react';

const Slider = () => {
  const backgroundImageUrl = 'data:image/jpeg;base64,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'; // Replace with hospital image

  return (
    <>
      <section
        className="slider d-flex align-items-center"
        style={{
          minHeight: '100vh',
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), url(${backgroundImageUrl})`,
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
                  color: 'white', // Golden accent
                  letterSpacing: '1px',
                  fontSize: '1.1rem',
                }}
              >
                Your Health Journey Starts Here
              </span>

              <h1
                className="text-uppercase text-white mb-4"
                style={{ fontWeight: 'bold', fontSize: '3.6rem' }}
              >
                Step Towards Better <span style={{ color: "#004d4d" }}>Health</span>
                <br />
                With Us
              </h1>

              <a
                href="/reg"
                target="_blank"
                className="btn"
                style={{
                  backgroundColor: "#004d4d", // Green (hospital color)
                  color: '#fff',
                  fontWeight: 'bold',
                  padding: '12px 28px',
                  borderRadius: '30px',
                  fontSize: '1.1rem',
                  textTransform: 'uppercase',
                  transition: '0.3s',
                }}
                onMouseOver={(e) => (e.target.style.backgroundColor = "#004d4d")}
                onMouseOut={(e) => (e.target.style.backgroundColor = "#004d4d")}
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
