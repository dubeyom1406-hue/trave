import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import AuthModal from './components/AuthModal';
import Home from './pages/Home';
import PackagesPage from './pages/PackagesPage';
import PackageDetailPage from './pages/PackageDetailPage';
import HotelsPage from './pages/HotelsPage';
import HotelDetailPage from './pages/HotelDetailPage';
import BookingPage from './pages/BookingPage';
import DashboardPage from './pages/DashboardPage';
import AdminPage from './pages/AdminPage';
import TrainsPage from './pages/TrainsPage';
import CabsPage from './pages/CabsPage';
import FlightsPage from './pages/FlightsPage';
import DestinationsPage from './pages/DestinationsPage';
import { useAuth } from './context/AuthContext';
import { Toaster } from 'react-hot-toast';
import './index.css';
import './App.css';

const ProtectedAdminRoute = ({ children }) => {
  const { user } = useAuth();
  if (!user || user.role !== 'admin') {
    return <Home />;
  }
  return children;
};

const AppContent = () => {
  const { authModal, closeAuth, openAuth } = useAuth();

  return (
    <div className="app-container">
      <Navbar onOpenAuth={openAuth} />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/packages" element={<PackagesPage />} />
        <Route path="/packages/:id" element={<PackageDetailPage />} />
        <Route path="/hotels" element={<HotelsPage />} />
        <Route path="/hotels/:id" element={<HotelDetailPage />} />
        <Route path="/booking/:type/:id" element={<BookingPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/profile" element={<DashboardPage />} />
        <Route 
          path="/admin" 
          element={
            <ProtectedAdminRoute>
              <AdminPage />
            </ProtectedAdminRoute>
          } 
        />
        <Route path="/trains" element={<TrainsPage />} />
        <Route path="/cabs" element={<CabsPage />} />
        <Route path="/flights" element={<FlightsPage />} />
        <Route path="/destinations" element={<DestinationsPage />} />
      </Routes>

      <AuthModal
        isOpen={authModal.isOpen}
        type={authModal.type}
        onClose={closeAuth}
      />
    </div>
  );
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <Toaster position="top-center" reverseOrder={false} />
        <AppContent />
      </AuthProvider>
    </Router>
  );
}

export default App;