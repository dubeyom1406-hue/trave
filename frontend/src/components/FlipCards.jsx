import React from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../hooks/useAuth';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const popularDests = [
  { name: 'Goa', desc: 'Sunny beaches and vibrant parties.', price: '₹4,999', img: '/goa_beach_1773079099022.png', details: 'Perfect for water sports and local cuisine.' },
  { name: 'Manali', desc: 'Snowy escape in the Himalayas.', price: '₹5,499', img: '/manali_mountains_1773079125823.png', details: 'Ideal for trekking and paragliding.' },
  { name: 'Jaipur', desc: 'The historic Pink City.', price: '₹3,299', img: 'https://images.unsplash.com/photo-1599661046289-e31897c93e14?auto=format&fit=crop&w=600&q=80', details: 'Visit massive forts and colorful bazaars.' },
  { name: 'Kerala', desc: 'God\'s own country backwaters.', price: '₹6,999', img: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=600&q=80', details: 'Houseboat stays and lush greenery.' },
  { name: 'Udaipur', desc: 'Romantic city of lakes.', price: '₹4,199', img: 'https://images.unsplash.com/photo-1590050752117-23a9d7fc2097?auto=format&fit=crop&w=600&q=80', details: 'Stunning palaces and lake views.' },
  { name: 'Rishikesh', desc: 'Yoga and rafting capital.', price: '₹2,999', img: 'https://images.unsplash.com/photo-1596464716127-f2a82984de30?auto=format&fit=crop&w=600&q=80', details: 'Ganga Aarti and bungee jumping.' },
];

const FlipCards = () => {
  const { user } = useAuth();

  const handleBook = async (dest) => {
    if (!user) {
      alert("Please login to book!");
      return;
    }
    
    try {
      await addDoc(collection(db, "bookings"), {
        userId: user.uid,
        userName: user.name,
        destination: dest.name,
        price: dest.price,
        status: "Confirmed",
        date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
        timestamp: serverTimestamp()
      });
      alert(`Successfully booked trip to ${dest.name}! Check your dashboard.`);
    } catch (err) {
      console.error(err);
      alert("Failed to book.");
    }
  };

  return (
    <section className="section">
      <div className="section-header">
        <div className="section-tag"><i className="fas fa-map-marker-alt"></i> Popular Destinations</div>
        <h2 className="section-title">Flip to Discover</h2>
        <p className="section-subtitle">Aapki pasandida jagahon ki anokhi jaankari</p>
      </div>
      
      <div className="destinations-grid">
        {popularDests.map((dest, idx) => (
          <motion.div 
            key={idx}
            className="flip-card"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: idx * 0.1 }}
            viewport={{ once: true }}
          >
            <div className="flip-card-inner">
              <div className="flip-card-front">
                <img src={dest.img} alt={dest.name} style={{ height:'100%', width:'100%', objectFit:'cover'}} />
                <div className="dest-card-overlay">
                  <h3>{dest.name}</h3>
                  <p>{dest.desc}</p>
                  <div className="dest-price">From {dest.price}</div>
                </div>
              </div>
              <div className="flip-card-back">
                <h3>{dest.name} Highlights</h3>
                <p>{dest.details}</p>
                <button className="btn btn-primary" onClick={() => handleBook(dest)}>Book Now</button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default FlipCards;
