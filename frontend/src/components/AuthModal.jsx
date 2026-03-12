import React, { useState } from 'react';
import { auth } from '../firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';

const AuthModal = ({ type, isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      if (type === 'login') {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
        // Optionally update display name
      }
      onClose();
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  return (
    <div className={`modal-overlay active`} onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>&times;</button>
        <div className="modal-header">
          <div className="modal-logo"><i className="fas fa-paper-plane"></i></div>
          <h2>{type === 'login' ? 'Welcome Back' : 'Create Account'}</h2>
          <p>{type === 'login' ? 'Login to access your bookings' : 'Join Rupiksha Travel'}</p>
        </div>
        
        {error && <div className="toast error" style={{position:'relative', top:0, right:0, marginBottom:'10px', animation:'none'}}>{error}</div>}

        <form onSubmit={handleSubmit}>
          {type === 'register' && (
            <div className="form-group">
              <label><i className="fas fa-user"></i> Full Name</label>
              <input type="text" placeholder="John Doe" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
          )}
          <div className="form-group">
            <label><i className="fas fa-envelope"></i> Email Address</label>
            <input type="email" placeholder="john@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="form-group">
            <label><i className="fas fa-lock"></i> Password</label>
            <input type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <br />
          <button className="btn btn-primary btn-full" disabled={loading}>
            {loading ? <i className="fas fa-spinner fa-spin"></i> : (type === 'login' ? 'Sign In' : 'Sign Up')}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AuthModal;
