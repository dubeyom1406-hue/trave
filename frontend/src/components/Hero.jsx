import React from 'react';
import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-bg-image" style={{backgroundImage: 'linear-gradient(135deg, #6C63FF 0%, #00D2FF 100%)'}}></div>
      <div className="hero-overlay"></div>
      
      <div className="hero-content">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="hero-badge"
        >
          <i className="fas fa-crown"></i> Premium Travel Partner
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="hero-title"
        >
          Experience the <span className="gradient-text">Extraordinary</span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="hero-subtitle"
        >
          Discover curated destinations, luxury stays, and seamless travel experiences designed exclusively for you.
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="hero-search-wrapper"
        >
          <div className="search-tabs">
            <div className="search-tab active"><i className="fas fa-hotel"></i> Hotels</div>
            <div className="search-tab"><i className="fas fa-plane"></i> Flights</div>
            <div className="search-tab"><i className="fas fa-train"></i> Trains</div>
            <div className="search-tab"><i className="fas fa-taxi"></i> Cabs</div>
          </div>
          <div className="search-inputs">
            <div className="input-col">
              <label>Destination</label>
              <input type="text" className="input-field" placeholder="Where are you going?" />
            </div>
            <div className="input-col">
              <label>Check In</label>
              <input type="date" className="input-field" />
            </div>
            <div className="input-col">
              <label>Check Out</label>
              <input type="date" className="input-field" />
            </div>
            <div className="input-col">
              <label>Guests</label>
              <input type="number" className="input-field" defaultValue="2" min="1" />
            </div>
            <button className="search-btn">
              <i className="fas fa-search"></i>
            </button>
          </div>
        </motion.div>

        <div className="hero-stats">
          <div className="stat">
            <div className="stat-number">10K+</div>
            <div className="stat-label">Happy Travellers</div>
          </div>
          <div className="stat">
            <div className="stat-number">500+</div>
            <div className="stat-label">Destinations</div>
          </div>
          <div className="stat">
            <div className="stat-number">50K+</div>
            <div className="stat-label">Bookings Done</div>
          </div>
          <div className="stat">
            <div className="stat-number">4.8★</div>
            <div className="stat-label">User Rating</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
