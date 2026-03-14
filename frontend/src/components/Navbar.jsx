import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { LogOut, User, LayoutDashboard, Menu, X, ChevronDown } from 'lucide-react';
import Logo from './Logo';

const Navbar = ({ onOpenAuth }) => {
  const { user, logout } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path) => location.pathname === path ? 'active' : '';

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          <Logo />
        </Link>

        {/* Desktop Links */}
        <div className="nav-links">
          <Link to="/" className={`nav-link ${isActive('/')}`}><i className="fas fa-home"></i> Home</Link>
          <div className="nav-dropdown">
            <span className="nav-link"><i className="fas fa-suitcase"></i> Book Now <i className="fas fa-chevron-down" style={{fontSize: '0.7rem'}}></i></span>
            <div className="dropdown-menu">
              <Link to="/packages"><i className="fas fa-suitcase"></i> Packages</Link>
              <Link to="/hotels"><i className="fas fa-hotel"></i> Hotels</Link>
              <Link to="/flights"><i className="fas fa-plane"></i> Flights</Link>
              <Link to="/trains"><i className="fas fa-train"></i> Trains</Link>
              <Link to="/cabs"><i className="fas fa-taxi"></i> Cabs</Link>
            </div>
          </div>
          <Link to="/destinations" className={`nav-link ${isActive('/destinations')}`}><i className="fas fa-map-marked-alt"></i> Destinations</Link>
        </div>

        <div className="nav-actions">
          {user ? (
            <div className="nav-dropdown" onMouseEnter={() => setUserDropdownOpen(true)} onMouseLeave={() => setUserDropdownOpen(false)}>
              <div className="user-avatar">
                <i className="fas fa-user-circle"></i>
                <span>{user.name}</span>
              </div>
              <div className={`user-dropdown ${userDropdownOpen ? 'show' : ''}`}>
                <Link to="/dashboard"><i className="fas fa-user-astronaut"></i> My Profile</Link>
                {user.role === 'admin' && <Link to="/admin"><i className="fas fa-tools"></i> Admin Panel</Link>}
                <hr style={{border: '0.1px solid var(--glass-border)', margin: '4px 0'}} />
                <a href="#" onClick={(e) => { e.preventDefault(); logout(); }}><i className="fas fa-sign-out-alt"></i> Logout</a>
              </div>
            </div>
          ) : (
            <>
              <button className="btn btn-outline" style={{padding: '8px 20px', fontSize:'0.85rem'}} onClick={() => onOpenAuth('login')}>Login</button>
              <button className="btn btn-primary" style={{padding: '8px 20px', fontSize:'0.85rem'}} onClick={() => onOpenAuth('register')}>Sign Up</button>
            </>
          )}

          <button className="mobile-menu-btn" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
