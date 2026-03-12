import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { motion } from 'framer-motion';
import { db } from '../firebase';
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';

const Dashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({ totalBookings: 0, activeTrips: 0, totalSpent: "₹0" });
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      if (!user) return;
      try {
        const q = query(collection(db, "bookings"), where("userId", "==", user.uid));
        const querySnapshot = await getDocs(q);
        const userBookings = [];
        let total = 0;
        querySnapshot.forEach((doc) => {
            const data = doc.data();
            userBookings.push({ id: doc.id.slice(0, 6).toUpperCase(), ...data });
            const priceNum = parseInt(data.price.replace(/[^0-9]/g, ''), 10);
            if (!isNaN(priceNum)) total += priceNum;
        });
        
        setBookings(userBookings);
        setStats({
          totalBookings: userBookings.length,
          activeTrips: userBookings.filter(b => b.status === 'Confirmed').length,
          totalSpent: `₹${total.toLocaleString()}`
        });
      } catch (err) {
        console.error("Error fetching bookings:", err);
      }
    };
    fetchBookings();
  }, [user]);

  return (
    <div className="section" style={{ minHeight: '100vh', paddingTop: '120px' }}>
      <div className="profile-container" style={{ background: 'var(--gradient-profile)', borderRadius: '30px', padding: '50px', boxShadow: '0 30px 60px rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.1)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '30px', marginBottom: '50px' }}>
          <div style={{ width: '120px', height: '120px', borderRadius: '50%', background: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '3rem', border: '5px solid rgba(255,255,255,0.2)' }}>
            <i className="fas fa-user-astronaut"></i>
          </div>
          <div>
            <h1 style={{ fontSize: '2.8rem', fontWeight: '800' }}>Swagat hai, {user?.name}!</h1>
            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1.2rem' }}><i className="fas fa-crown" style={{ color: '#FFE66D' }}></i> Elite Member</p>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginBottom: '60px' }}>
          {[
            { label: 'Total Bookings', val: stats.totalBookings, icon: 'fa-suitcase' },
            { label: 'Active Trips', val: stats.activeTrips, icon: 'fa-map-marked-alt' },
            { label: 'Total Spent', val: stats.totalSpent, icon: 'fa-wallet' }
          ].map((stat, i) => (
            <div key={i} style={{ background: 'rgba(255,255,255,0.05)', padding: '30px', borderRadius: '25px', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.1)', textAlign: 'center' }}>
              <i className={`fas ${stat.icon}`} style={{ fontSize: '1.5rem', color: 'var(--primary-light)', marginBottom: '15px' }}></i>
              <div style={{ fontSize: '2.2rem', fontWeight: '800' }}>{stat.val}</div>
              <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem' }}>{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="bookings-section">
          <h2 style={{ marginBottom: '30px', fontSize: '1.8rem', display: 'flex', alignItems: 'center', gap: '15px' }}>
            <i className="fas fa-history"></i> My Journey
          </h2>
          <div style={{ background: 'rgba(0,0,0,0.2)', borderRadius: '20px', overflow: 'hidden' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead style={{ background: 'rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.5)', fontSize: '0.8rem', textTransform: 'uppercase' }}>
                <tr>
                  <th style={{ padding: '20px' }}>ID</th>
                  <th style={{ padding: '20px' }}>Destination</th>
                  <th style={{ padding: '20px' }}>Date</th>
                  <th style={{ padding: '20px' }}>Status</th>
                  <th style={{ padding: '20px' }}>Price</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((bk, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                    <td style={{ padding: '20px', fontWeight: 'bold' }}>{bk.id}</td>
                    <td style={{ padding: '20px' }}>{bk.destination}</td>
                    <td style={{ padding: '20px' }}>{bk.date}</td>
                    <td style={{ padding: '20px' }}>
                      <span style={{ padding: '5px 12px', borderRadius: '10px', fontSize: '0.8rem', background: bk.status === 'Completed' ? 'rgba(0,184,148,0.2)' : 'rgba(108,99,255,0.2)', color: bk.status === 'Completed' ? '#00b894' : '#6C63FF' }}>
                        {bk.status}
                      </span>
                    </td>
                    <td style={{ padding: '20px' }}>{bk.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
