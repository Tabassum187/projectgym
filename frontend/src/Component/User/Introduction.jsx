import React from 'react';

const getCardStyle = (imageUrl) => ({
  background: `url(${imageUrl}) center/cover no-repeat`,
  color: 'white',
  borderRadius: '0px',
  padding: '2.5rem',
  border: 'none',
  minHeight: '350px',
  position: 'relative',
  overflow: 'hidden',
  transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
  boxShadow: '0 6px 12px rgba(0, 0, 0, 0.25)',
});

const overlayStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(0, 0, 0, 0.6)',
  zIndex: 0,
};

const zoomStyle = {
  transform: 'scale(1.09)',
  boxShadow: '0 12px 24px rgba(0, 0, 0, 0.4)',
};

const cardContainerStyle = {
  position: 'relative',
  zIndex: 1,
};

const linkStyle = {
  color: '#FFD700',
  textTransform: 'uppercase',
  fontSize: '13px',
  letterSpacing: '1px',
  fontWeight: 'bold',
  zIndex: 2,
  position: 'relative',
};

const Introduction = () => {
  const handleMouseEnter = (e) => {
    Object.assign(e.currentTarget.style, zoomStyle);
  };

  const handleMouseLeave = (e) => {
    e.currentTarget.style.transform = 'scale(1)';
    e.currentTarget.style.boxShadow = getCardStyle('').boxShadow;
  };

  const cards = [
    {
      title: "Workout Logging",
      text: "Easily log your workouts, track sets and reps, and stay on top of your fitness game.",
      number: "01",
      image: "/assets/images/bg/card1.jpg"
    },
    {
      title: "Progress Tracking",
      text: "Monitor weight, measurements, and performance with visual progress cards.",
      number: "02",
      image: "/assets/images/bg/card2.jpg"
    },
    {
      title: "Healthy Diet Plan",
      text: "Get personalized meal plans crafted to fuel your body and enhance results.",
      number: "03",
      image: "/assets/images/bg/card3.webp"
    }
  ];

  return (
    <section className="mt-80px">
      <div className="container">
        <div className="row">
          {cards.map((item, index) => (
            <div key={index} className="col-lg-4 col-md-6 mb-4">
              <div
                style={getCardStyle(item.image)}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <div style={overlayStyle}></div>

                <div style={cardContainerStyle}>
                  <span className="number" style={{ fontSize: '2rem', color: '#FFD700' }}>{item.number}</span>
                  <h3 className="mt-3">{item.title}</h3>
                  <p className="mt-3 mb-4">{item.text}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Introduction;
