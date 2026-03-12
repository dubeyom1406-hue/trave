import React, { useState } from 'react';
import { motion } from 'framer-motion';

const destinations = [
  { name: 'Kashmir', img: 'https://images.unsplash.com/photo-1566833925222-191ef3a6d554?auto=format&fit=crop&w=600&q=80', rot: 0 },
  { name: 'Ladakh', img: 'https://images.unsplash.com/photo-1544085311-11a028465b03?auto=format&fit=crop&w=600&q=80', rot: 40 },
  { name: 'Shimla', img: 'https://images.unsplash.com/photo-1562691762-4318c4e477e3?auto=format&fit=crop&w=600&q=80', rot: 80 },
  { name: 'Jaipur', img: 'https://images.unsplash.com/photo-1599661046289-e31897c93e14?auto=format&fit=crop&w=600&q=80', rot: -40 },
  { name: 'Goa', img: '/goa_beach_1773079099022.png', rot: -80 },
];

const SemicircleCarousel = () => {
  const [rotation, setRotation] = useState(0);

  const rotate = (deg) => {
    setRotation(prev => prev + deg);
  };

  return (
    <section className="section">
      <div className="section-header">
        <div className="section-tag"><i className="fas fa-magic"></i> Featured Experiences</div>
        <h2 className="section-title">Explore the Semicircle of Joy</h2>
      </div>
      
      <div className="semicircle-container" style={{ perspective: '1200px' }}>
        <motion.div 
          className="semicircle-rail"
          animate={{ rotate: rotation }}
          transition={{ type: 'spring', stiffness: 50, damping: 15 }}
          style={{ 
            position: 'absolute', width: '1000px', height: '1000px', 
            borderRadius: '50%', border: '1px dashed rgba(255,255,255,0.1)',
            top: '300px', display: 'flex', justifyContent: 'center',
            transformOrigin: 'center center'
          }}
        >
          {destinations.map((dest, idx) => (
            <div 
              key={idx}
              className="carousel-item"
              style={{ 
                backgroundImage: `url('${dest.img}')`,
                transform: `rotate(${dest.rot}deg)`,
              }}
            >
              <div className="label">{dest.name}</div>
            </div>
          ))}
        </motion.div>
      </div>

      <div style={{ textAlign: 'center', marginTop: '40px', position:'relative', zIndex: 10 }}>
        <button className="btn btn-outline" style={{marginRight:'10px'}} onClick={() => rotate(-40)}>
          <i className="fas fa-chevron-left"></i> Previous
        </button>
        <button className="btn btn-outline" onClick={() => rotate(40)}>
          Next <i className="fas fa-chevron-right"></i>
        </button>
      </div>
    </section>
  );
};

export default SemicircleCarousel;
