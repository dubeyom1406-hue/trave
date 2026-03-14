import React, { useState } from 'react';
import { auth } from '../firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { useAuth } from '../context/AuthContext';

const AuthModal = ({ type, isOpen, onClose }) => {
  const { loginWithGoogle } = useAuth();
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
          <div className="modal-logo">
            <img src="/logo.png" alt="Rupiksha" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
          </div>
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

        <div style={{ margin: '20px 0', textAlign: 'center', position: 'relative' }}>
          <hr style={{ border: '0.1px solid var(--glass-border)' }} />
          <span style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', background: 'var(--dark-2)', padding: '0 10px', fontSize: '0.8rem', color: 'var(--text-muted)' }}>OR</span>
        </div>

        <button 
          className="btn btn-outline btn-full" 
          disabled={loading}
          onClick={async () => {
            setLoading(true);
            setError('');
            try {
              await loginWithGoogle();
              onClose();
            } catch (err) {
              setError(err.message);
            }
            setLoading(false);
          }}
        >
          <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" style={{width:'18px', marginRight:'10px'}} />
          Continue with Google
        </button>
      </div>
    </div>
  );
};

export default AuthModal;
