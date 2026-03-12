import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import AuthModal from './components/AuthModal';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import './index.css';
import './App.css';

function App() {
  const [authModal, setAuthModal] = useState({ isOpen: false, type: 'login' });

  const openAuth = (type) => setAuthModal({ isOpen: true, type });
  const closeAuth = () => setAuthModal({ ...authModal, isOpen: false });

  return (
    <Router>
      <AuthProvider>
        <div className="app-container">
          <Navbar onOpenAuth={openAuth} />
          
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Dashboard />} />
            {/* Add admin, and booking routes here */}
          </Routes>

          <AuthModal 
            isOpen={authModal.isOpen} 
            type={authModal.type} 
            onClose={closeAuth} 
          />
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
