import React from 'react';

const Logo = ({ height = '45px' }) => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', height }}>
      {/* Icon: A compass/shield stylized SVG */}
      <svg 
        width="32" 
        height="32" 
        viewBox="0 0 100 100" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        style={{ filter: 'drop-shadow(0 0 8px rgba(255, 107, 107, 0.4))' }}
      >
        <path d="M50 5L15 20V45C15 67.2 29.8 87.7 50 95C70.2 87.7 85 67.2 85 45V20L50 5Z" fill="url(#logo-grad)" />
        <path d="M50 25C36.2 25 25 36.2 25 50C25 63.8 36.2 75 50 75C63.8 75 75 63.8 75 50C75 36.2 63.8 25 50 25ZM50 65C41.7 65 35 58.3 35 50C35 41.7 41.7 35 50 35C58.3 35 65 41.7 65 50C65 58.3 58.3 65 50 65Z" fill="white" />
        <path d="M50 40L45 50L50 60L55 50L50 40Z" fill="white" />
        <defs>
          <linearGradient id="logo-grad" x1="15" y1="5" x2="85" y2="95" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FF6B6B" />
            <stop offset="1" stopColor="#FF5252" />
          </linearGradient>
        </defs>
      </svg>
      
      {/* Text */}
      <span style={{ 
        fontFamily: "'Outfit', sans-serif", 
        fontSize: '1.6rem', 
        fontWeight: '800', 
        color: 'white',
        letterSpacing: '-0.5px',
        display: 'flex',
        alignItems: 'center'
      }}>
        Rupiksha
        <span style={{ color: '#FF6B6B', fontStyle: 'italic', fontWeight: '500', marginLeft: '2px' }}>Travel</span>
      </span>
    </div>
  );
};

export default Logo;
