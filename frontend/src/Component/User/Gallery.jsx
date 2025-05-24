import React, { useState } from 'react';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css'; // Lightbox CSS

const images = [
  'https://blog.nasm.org/hubfs/what-is-resistance-training.jpg',
  'https://www.eatthis.com/wp-content/uploads/sites/4/2023/07/man-indoor-cycling.jpg?quality=82&strip=1',
  'https://i0.wp.com/skill-yoga.blog/wp-content/uploads/2021/07/flexibility1.jpg?resize=900%2C600&ssl=1',
  'https://hips.hearstapps.com/hmg-prod/images/cross-training-royalty-free-image-1589836587.jpg',
  'https://media.istockphoto.com/id/1849345050/photo/personal-instructor-and-athletic-woman-going-through-exercise-plans-in-a-gym.jpg?s=612x612&w=0&k=20&c=iGI2Se15zweVTHt31ENGqeXJlGcagS_XUqMhB_g8mvU=',
  'https://dfabulousu.com/blog/wp-content/uploads/2024/02/gym-1400x800.webp',
  'https://eugenechaitf.com/wp-content/uploads/2024/06/Top-11-CrossFit-Gyms-in-Singapore-2024.jpg',
  'https://ffc.com/wp-content/uploads/2021/07/Leg-Compression-1-1030x687.jpg',
];

// Descriptions & titles for each image
const descriptions = [
  { title: "Strength Training", desc: "Push your limits with modern strength machines." },
  { title: "Cardio Sessions", desc: "Keep your heart healthy with varied cardio workouts." },
  { title: "Yoga & Flexibility", desc: "Enhance your flexibility and inner peace." },
  { title: "Group Classes", desc: "Join our vibrant community group exercise classes." },
  { title: "Personal Coaching", desc: "Get one-on-one training with expert coaches." },
  { title: "Nutrition Guidance", desc: "Fuel your workouts with personalized meal plans." },
  { title: "CrossFit Training", desc: "Challenge yourself with high-intensity functional movements." },
  { title: "Recovery Zone", desc: "Relax and recover with our dedicated wellness spaces." },
];

const Gallery = () => {
  const [photoIndex, setPhotoIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <section style={{ backgroundColor: '#121212', padding: '60px 0' }}>
        <div className="container">
          <div className="row justify-content-center mb-5">
            <div className="col-lg-8 text-center">
              <div className="section-title">
                <div
                  className="divider mb-3"
                  style={{
                    width: '60px',
                    height: '3px',
                    backgroundColor: '#FFD700',
                    margin: '0 auto 20px auto',
                    borderRadius: '2px',
                  }}
                ></div>
                <h2 style={{ color: '#FFD700', fontWeight: '700', letterSpacing: '2px', textTransform: 'uppercase' }}>
                  Our Gallery
                </h2>
                <p style={{ color: '#ccc', fontSize: '1.1rem' }}>
                  We offer more than 35 group exercise & aerobic classes each week.
                </p>
              </div>
            </div>
          </div>

          <div className="row no-gutters">
            {images.map((img, idx) => (
              <div
                key={idx}
                className="col-lg-3 col-md-4 col-sm-6 p-1"
                style={{ cursor: 'pointer', overflow: 'hidden', borderRadius: '12px', position: 'relative' }}
                onClick={() => {
                  setPhotoIndex(idx);
                  setIsOpen(true);
                }}
              >
                <img
                  src={img}
                  alt={`Gallery Image ${idx + 1}`}
                  style={{
                    width: '100%',
                    height: '220px',
                    objectFit: 'cover',
                    borderRadius: '12px',
                    transition: 'transform 0.3s ease, filter 0.3s ease',
                    boxShadow: '0 4px 15px rgba(255, 215, 0, 0.3)',
                    display: 'block',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.transform = 'scale(1.05)';
                    e.currentTarget.style.filter = 'brightness(1.1)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.transform = 'scale(1)';
                    e.currentTarget.style.filter = 'brightness(1)';
                  }}
                />
                {/* Centered Title Overlay */}
                <div
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    color: '#FFD700',
                    backgroundColor: 'rgba(18, 18, 18, 0.7)',
                    padding: '6px 12px',
                    borderRadius: '8px',
                    fontWeight: '700',
                    fontSize: '14px',
                    pointerEvents: 'none',
                    userSelect: 'none',
                    textAlign: 'center',
                    width: '90%',
                    whiteSpace: 'nowrap',
                    textOverflow: 'ellipsis',
                    overflow: 'hidden',
                    letterSpacing: '1px',
                    textTransform: 'uppercase',
                  }}
                >
                  {descriptions[idx].title}
                </div>
                {/* Click Here overlay */}
                <div
                  style={{
                    position: 'absolute',
                    bottom: '10px',
                    right: '10px',
                    backgroundColor: 'rgba(255, 215, 0, 0.85)',
                    color: '#121212',
                    fontWeight: '700',
                    fontSize: '12px',
                    padding: '4px 8px',
                    borderRadius: '10px',
                    userSelect: 'none',
                    pointerEvents: 'none',
                    letterSpacing: '1px',
                    textTransform: 'uppercase',
                  }}
                >
                  Click Here
                </div>
              </div>
            ))}
          </div>

          {isOpen && (
            <Lightbox
              mainSrc={images[photoIndex]}
              nextSrc={images[(photoIndex + 1) % images.length]}
              prevSrc={images[(photoIndex + images.length - 1) % images.length]}
              onCloseRequest={() => setIsOpen(false)}
              onMovePrevRequest={() =>
                setPhotoIndex((photoIndex + images.length - 1) % images.length)
              }
              onMoveNextRequest={() => setPhotoIndex((photoIndex + 1) % images.length)}
              imageCaption={
                <div style={{ textAlign: 'center', color: '#FFD700', lineHeight: '1.3' }}>
                  <h3 style={{ margin: 0, fontWeight: '700' }}>{descriptions[photoIndex].title}</h3>
                  <p style={{ margin: '6px 0 0' }}>{descriptions[photoIndex].desc}</p>
                </div>
              }
              enableZoom={false}
              reactModalStyle={{ overlay: { zIndex: 1500 } }}
            />
          )}
        </div>
      </section>
    </>
  );
};

export default Gallery;
