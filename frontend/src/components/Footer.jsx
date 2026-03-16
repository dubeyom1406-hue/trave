import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin, 
  MapPin, 
  Phone, 
  Mail 
} from 'lucide-react';
import PrivacyModal from './PrivacyModal';
import './Footer.css';

const Footer = () => {
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);

  return (
    <footer className="footer">
      <div className="footer-container footer-grid">
        {/* Brand Section */}
        <div className="footer-brand">
          <h2>Rupiksha<span style={{ color: 'var(--primary, #6C63FF)' }}>.</span></h2>
          <p>
            Transforming digital payments across India with innovative 
            financial solutions for businesses and individuals. 
            Exploring the world, one destination at a time.
          </p>
          <div className="social-links">
            <a href="#" className="social-icon"><Facebook size={20} /></a>
            <a href="#" className="social-icon"><Twitter size={20} /></a>
            <a href="#" className="social-icon"><Instagram size={20} /></a>
            <a href="#" className="social-icon"><Linkedin size={20} /></a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="footer-column">
          <h3>Quick Links</h3>
          <ul className="footer-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/destinations">Destinations</Link></li>
            <li><Link to="/packages">Tour Packages</Link></li>
            <li><Link to="/hotels">Hotels</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/blog">Blog</Link></li>
          </ul>
        </div>

        {/* Our Services */}
        <div className="footer-column">
          <h3>Our Services</h3>
          <ul className="footer-links">
            <li><Link to="/flights">Flight Booking</Link></li>
            <li><Link to="/hotels">Hotel Reservation</Link></li>
            <li><Link to="/cabs">Car Rentals</Link></li>
            <li><Link to="/insurance">Travel Insurance</Link></li>
            <li><Link to="/group-tours">Group Tours</Link></li>
            <li><Link to="/custom-trips">Customized Trips</Link></li>
          </ul>
        </div>

        {/* Contact Us */}
        <div className="footer-column">
          <h3>Contact Us</h3>
          <ul className="footer-contact">
            <li>
              <MapPin className="contact-icon" size={20} />
              <span>
                Rupiksha Service Pvt Ltd, <br />
                C/O Enterprises, Prakash path, <br />
                Near zeromile, Muzaffarpur, Bihar
              </span>
            </li>
            <li>
              <Phone className="contact-icon" size={20} />
              <span>+91 7004128310</span>
            </li>
            <li>
              <Mail className="contact-icon" size={20} />
              <span>support@rupiksha.com</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer-container">
        <div className="footer-bottom">
          <p>© 2025 Rupiksha. All rights reserved.</p>
          <div className="footer-bottom-links">
            <Link to="/terms">Terms of Service</Link>
            <button 
              onClick={() => setIsPrivacyOpen(true)}
              style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer', padding: 0, font: 'inherit' }}
            >
              Privacy Policy
            </button>
          </div>
        </div>
      </div>

      <PrivacyModal 
        isOpen={isPrivacyOpen} 
        onClose={() => setIsPrivacyOpen(false)} 
      />
    </footer>
  );
};

export default Footer;
