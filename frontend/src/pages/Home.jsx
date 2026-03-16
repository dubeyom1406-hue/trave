import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import logo from '../assets/logo.png';

const destinations = [
  {
    id: 1,
    name: 'Goa',
    country: 'India',
    description: '6 properties available',
    price: '₹2,499',
    tag: 'Beach Paradise',
    emoji: '🏖️',
    gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    bg: 'https://images.unsplash.com/photo-1519046904884-53103b34b206?w=600&q=80',
  },
  {
    id: 2,
    name: 'Jaipur',
    country: 'India',
    description: '12 properties available',
    price: '₹1,899',
    tag: 'Pink City',
    emoji: '🏯',
    gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
    bg: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?w=600&q=80',
  },
  {
    id: 3,
    name: 'Shimla',
    country: 'India',
    description: '9 properties available',
    price: '₹3,199',
    tag: 'Queen of Hills',
    emoji: '🏔️',
    gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    bg: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=600&q=80',
  },
  {
    id: 4,
    name: 'Kerala',
    country: 'India',
    description: '15 properties available',
    price: '₹4,599',
    tag: "God's Own Country",
    emoji: '🌴',
    gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
    bg: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=600&q=80',
  },
  {
    id: 5,
    name: 'Agra',
    country: 'India',
    description: '8 properties available',
    price: '₹1,599',
    tag: 'City of Taj',
    emoji: '🕌',
    gradient: 'linear-gradient(135deg, #f6d365 0%, #fda085 100%)',
    bg: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?w=600&q=80',
  },
  {
    id: 6,
    name: 'Manali',
    country: 'India',
    description: '10 properties available',
    price: '₹3,799',
    tag: 'Adventure Hub',
    emoji: '❄️',
    gradient: 'linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)',
    bg: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80',
  },
];

const hotels = [
  {
    id: 1,
    name: 'The Oberoi Udaivilas',
    location: 'Udaipur, Rajasthan',
    stars: 5,
    price: '₹18,500',
    per: '/night',
    rating: 9.8,
    reviews: '2.4k reviews',
    amenities: ['🏊 Pool', '🍽️ Restaurant', '💆 Spa', '🅿️ Parking'],
    badge: 'Luxury',
    badgeColor: '#FFD700',
    img: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=500&q=80',
  },
  {
    id: 2,
    name: 'Taj Lake Palace',
    location: 'Lake Pichola, Udaipur',
    stars: 5,
    price: '₹22,000',
    per: '/night',
    rating: 9.6,
    reviews: '3.1k reviews',
    amenities: ['🛥️ Boat', '🍽️ Dining', '💆 Spa', '🌅 Lakeview'],
    badge: 'Heritage',
    badgeColor: '#FF6B6B',
    img: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=500&q=80',
  },
  {
    id: 3,
    name: 'ITC Grand Chola',
    location: 'Chennai, Tamil Nadu',
    stars: 5,
    price: '₹9,800',
    per: '/night',
    rating: 9.2,
    reviews: '1.8k reviews',
    amenities: ['🏊 Pool', '🍽️ Multi-Cuisine', '🏋️ Gym', '🅿️ Valet'],
    badge: 'Premium',
    badgeColor: '#6C63FF',
    img: 'https://images.unsplash.com/photo-1551882547-ff40c4fe1dc7?w=500&q=80',
  },
  {
    id: 4,
    name: 'Wildflower Hall',
    location: 'Shimla, Himachal Pradesh',
    stars: 5,
    price: '₹14,200',
    per: '/night',
    rating: 9.5,
    reviews: '1.2k reviews',
    amenities: ['🏔️ Mountain View', '🏊 Indoor Pool', '💆 Spa', '🧘 Yoga'],
    badge: 'Hill Resort',
    badgeColor: '#00D2FF',
    img: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=500&q=80',
  },
];

const services = [
  { icon: 'fa-hotel', title: 'Luxury Hotels', desc: 'Handpicked premium stays across India — from royal palaces to hill retreats.', cls: 'hotel', color: '#6C63FF' },
  { icon: 'fa-train', title: 'Train Tickets', desc: 'Hassle-free Indian Railways booking with instant confirmation.', cls: 'train', color: '#FF6B6B' },
  { icon: 'fa-car', title: 'Cabs & Rentals', desc: 'Self-drive or chauffeur-driven cars across all major cities.', cls: 'cab', color: '#FFE66D' },
];

const testimonials = [
  {
    text: 'Rupiksha Travel made our Goa trip absolutely perfect! The hotel suggestions were spot-on and the prices were unbeatable.',
    name: 'Priya Sharma',
    city: 'Mumbai, Maharashtra',
    rating: 5,
    initials: 'PS',
  },
  {
    text: 'Booked a Kerala houseboat experience through Rupiksha — it was magical! Seamless booking process and amazing support.',
    name: 'Rahul Gupta',
    city: 'Delhi, India',
    rating: 5,
    initials: 'RG',
  },
  {
    text: 'The Jaipur heritage hotel recommendation was fantastic. We felt like royalty for just ₹2,500 per night. Highly recommended!',
    name: 'Ananya Singh',
    city: 'Bangalore, Karnataka',
    rating: 5,
    initials: 'AS',
  },
];

const Home = () => {
  const navigate = useNavigate();
  const { user, openAuth } = useAuth();
  const [activeTab, setActiveTab] = useState('Hotels');
  const [currentTextIndex, setCurrentTextIndex] = useState(0);

  const heroTexts = [
    { title: 'Incredible', subtitle: 'Discover breathtaking destinations, luxurious stays, and unforgettable experiences across India.' },
    { title: 'Unforgettable', subtitle: 'Book premium hotels, domestic flights, and luxury train journeys at the best prices.' },
    { title: 'Magnificent', subtitle: 'Experience the rich culture, heritage, and hidden gems of Incredible India with Rupiksha.' },
    { title: 'Beautiful', subtitle: 'From snow-capped mountains to golden beaches, explore the diversity of India today.' }
  ];
  const [searchFrom, setSearchFrom] = useState('');
  const [searchTo, setSearchTo] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState('1 Guest');
  const [bgIndex, setBgIndex] = useState(0);

  const heroBgs = [
    'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=1600&q=80', // India taj
    'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=1600&q=80', // kerala
    'https://images.unsplash.com/photo-1519046904884-53103b34b206?w=1600&q=80', // goa
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setBgIndex(prev => (prev + 1) % heroBgs.length);
      setCurrentTextIndex(prev => (prev + 1) % heroTexts.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const tabs = ['Hotels', 'Flights', 'Trains', 'Cabs'];

  const handleSearch = () => {
    const route = activeTab.toLowerCase();
    navigate(`/${route}?from=${searchFrom}&to=${searchTo}`);
  };

  const handleBookNow = (item = null) => {
    if (!user) {
      openAuth('login');
      return;
    }
    if (item && item.id) {
        navigate(`/hotels/${item.id}`);
    } else {
        navigate('/packages');
    }
  };

  return (
    <div style={{ background: 'var(--dark)', minHeight: '100vh' }}>

      {/* ===== HERO ===== */}
      <section className="hero" style={{ minHeight: '100vh' }}>
        {/* Background */}
        <div
          className="hero-bg-image"
          style={{ backgroundImage: `url(${heroBgs[bgIndex]})`, transition: 'opacity 1s ease' }}
        />
        <div className="hero-overlay" />

        {/* Animated Particles */}
        <div className="hero-particles">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="particle"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${i * 0.7}s`,
                animationDuration: `${6 + i}s`,
                background: i % 3 === 0 ? 'var(--primary-light)' : i % 3 === 1 ? '#FFE66D' : '#00D2FF',
              }}
            />
          ))}
        </div>

        {/* Content */}
        <div className="hero-content">
          <div className="hero-badge">
            <i className="fas fa-star" style={{ color: '#FFE66D' }} />
            🇮🇳 India's Most Trusted Travel Platform
          </div>

          <h1 className="hero-title" key={currentTextIndex} style={{ animation: 'fadeInUp 0.8s ease-out' }}>
            Explore <span className="gradient-text">{heroTexts[currentTextIndex].title}</span>
            <br />India with Rupiksha Travel
          </h1>

          <p className="hero-subtitle" style={{ animation: 'fadeInUp 1s ease-out' }}>
            {heroTexts[currentTextIndex].subtitle} — all at the best prices in Indian Rupees ₹
          </p>

          {/* Search Box */}
          <div className="hero-search-wrapper">
            {/* Tabs */}
            <div className="search-tabs">
              {tabs.map(tab => (
                <button
                  key={tab}
                  className={`search-tab ${activeTab === tab ? 'active' : ''}`}
                  onClick={() => setActiveTab(tab)}
                >
                  <i className={`fas ${
                    tab === 'Hotels' ? 'fa-hotel' :
                    tab === 'Flights' ? 'fa-plane' :
                    tab === 'Trains' ? 'fa-train' : 'fa-car'
                  }`} />
                  {tab}
                </button>
              ))}
            </div>

            {/* Inputs */}
            <div className="search-inputs">
              <div className="input-col">
                <label>📍 Destination</label>
                <input
                  className="input-field"
                  placeholder={activeTab === 'Hotels' ? 'e.g. Goa, Jaipur, Manali' : 'From — Delhi, Mumbai...'}
                  value={searchFrom}
                  onChange={e => setSearchFrom(e.target.value)}
                />
              </div>
              {activeTab !== 'Hotels' && (
                <div className="input-col">
                  <label>🛬 To</label>
                  <input
                    className="input-field"
                    placeholder="To — Chennai, Kolkata..."
                    value={searchTo}
                    onChange={e => setSearchTo(e.target.value)}
                  />
                </div>
              )}
              <div className="input-col">
                <label>📅 {activeTab === 'Hotels' ? 'Check-in' : 'Travel Date'}</label>
                <input
                  type="date"
                  className="input-field"
                  value={checkIn}
                  onChange={e => setCheckIn(e.target.value)}
                  style={{ colorScheme: 'dark' }}
                />
              </div>
              <button className="search-btn" title="Search" onClick={handleSearch}>
                <i className="fas fa-search" />
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="hero-stats">
            {[
              { num: '50K+', label: 'Happy Travelers' },
              { num: '500+', label: 'Destinations' },
              { num: '₹999', label: 'Starting from' },
              { num: '4.9★', label: 'User Rating' },
            ].map((s, i) => (
              <div className="stat" key={i}>
                <div className="stat-number">{s.num}</div>
                <div className="stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== SERVICES ===== */}
      <section className="section">
        <div className="section-header">
          <div className="section-tag"><i className="fas fa-compass" /> Our Services</div>
          <h2 className="section-title">Everything You Need for <span style={{ color: 'var(--primary)' }}>India Travel</span></h2>
          <p className="section-subtitle">One platform for all your travel needs — hotels, flights, trains & cabs across India.</p>
        </div>
        <div className="services-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
          {services.map((s, i) => (
            <div className="service-card" key={i} style={{ cursor: 'pointer' }}>
              <div className={`service-icon ${s.cls}`}>
                <i className={`fas ${s.icon}`} />
              </div>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
              <div style={{ marginTop: '20px', display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--primary)', fontWeight: '600', fontSize: '0.85rem' }}>
                Explore Now <i className="fas fa-arrow-right" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== POPULAR DESTINATIONS ===== */}
      <section className="section" style={{ paddingTop: '0' }}>
        <div className="section-header">
          <div className="section-tag"><i className="fas fa-map-marker-alt" /> Top Picks</div>
          <h2 className="section-title">🇮🇳 Popular Indian <span style={{ color: 'var(--primary)' }}>Destinations</span></h2>
          <p className="section-subtitle">Hand-picked gems across India — from royal forts to serene backwaters.</p>
        </div>
        <div className="destinations-grid">
          {destinations.map(dest => (
            <div className="dest-card" key={dest.id}>
              <img
                src={dest.bg}
                alt={dest.name}
                className="dest-card-img"
                onError={e => {
                  e.target.style.display = 'none';
                  e.target.parentElement.style.background = dest.gradient;
                }}
              />
              <div className="dest-card-overlay">
                <div style={{
                  display: 'inline-flex', alignItems: 'center', gap: '6px',
                  background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(8px)',
                  padding: '4px 12px', borderRadius: '50px', fontSize: '0.7rem',
                  fontWeight: '700', marginBottom: '8px', border: '1px solid rgba(255,255,255,0.2)'
                }}>
                  {dest.emoji} {dest.tag}
                </div>
                <h3>{dest.name}</h3>
                <p>{dest.description}</p>
                <div className="dest-price">
                  <i className="fas fa-tag" style={{ fontSize: '0.75rem' }} />
                  From {dest.price}/night
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== FEATURED HOTELS ===== */}
      <section className="section" style={{ paddingTop: '0' }}>
        <div className="section-header">
          <div className="section-tag"><i className="fas fa-hotel" /> Featured Hotels</div>
          <h2 className="section-title">Top-Rated <span style={{ color: 'var(--primary)' }}>Indian Hotels</span></h2>
          <p className="section-subtitle">Luxury stays, heritage palaces & hill resorts — all priced in ₹ for Indian travelers.</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
          {hotels.map(hotel => (
            <div
              key={hotel.id}
              className="service-card"
              style={{ padding: '0', overflow: 'hidden', cursor: 'pointer' }}
            >
              {/* Hotel Image */}
              <div style={{ position: 'relative', height: '200px', overflow: 'hidden' }}>
                <img
                  src={hotel.img}
                  alt={hotel.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s ease' }}
                  onMouseOver={e => e.target.style.transform = 'scale(1.08)'}
                  onMouseOut={e => e.target.style.transform = 'scale(1)'}
                  onError={e => {
                    e.target.parentElement.style.background = 'var(--dark-3)';
                    e.target.style.display = 'none';
                  }}
                />
                <div style={{
                  position: 'absolute', top: '12px', left: '12px',
                  background: hotel.badgeColor, color: '#fff',
                  padding: '4px 12px', borderRadius: '50px', fontSize: '0.7rem', fontWeight: '700'
                }}>
                  {hotel.badge}
                </div>
                <div style={{
                  position: 'absolute', top: '12px', right: '12px',
                  background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(8px)',
                  color: '#FFE66D', padding: '4px 10px', borderRadius: '50px', fontSize: '0.75rem', fontWeight: '700'
                }}>
                  ⭐ {hotel.rating}
                </div>
              </div>

              {/* Hotel Details */}
              <div style={{ padding: '20px' }}>
                <h3 style={{ fontSize: '1.05rem', fontWeight: '700', marginBottom: '4px', color: 'var(--text)' }}>
                  {hotel.name}
                </h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.82rem', marginBottom: '8px' }}>
                  <i className="fas fa-map-marker-alt" style={{ color: 'var(--primary)', marginRight: '4px' }} />
                  {hotel.location}
                </p>

                {/* Stars */}
                <div style={{ marginBottom: '10px' }}>
                  {[...Array(hotel.stars)].map((_, i) => (
                    <i key={i} className="fas fa-star" style={{ color: '#FFE66D', fontSize: '0.75rem' }} />
                  ))}
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem', marginLeft: '6px' }}>{hotel.reviews}</span>
                </div>

                {/* Amenities */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '16px' }}>
                  {hotel.amenities.map((am, i) => (
                    <span key={i} style={{
                      background: 'var(--glass)', border: '1px solid var(--glass-border)',
                      padding: '3px 8px', borderRadius: '6px', fontSize: '0.72rem', color: 'var(--text-muted)'
                    }}>
                      {am}
                    </span>
                  ))}
                </div>

                {/* Price + CTA */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <span style={{ fontSize: '1.3rem', fontWeight: '800', color: 'var(--primary-light)' }}>{hotel.price}</span>
                    <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>{hotel.per}</span>
                  </div>
                   <button onClick={() => handleBookNow(hotel)} className="btn btn-primary" style={{ padding: '8px 18px', fontSize: '0.8rem' }}>
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== WHY RUPIKSHA ===== */}
      <section className="section" style={{ paddingTop: '0' }}>
        <div className="section-header">
          <div className="section-tag"><i className="fas fa-shield-alt" /> Why Us</div>
          <h2 className="section-title">Why Choose <span style={{ color: 'var(--primary)' }}>Rupiksha Travel?</span></h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '24px' }}>
          {[
            { icon: '🔒', title: 'Secure Payments', desc: 'UPI, NetBanking, Cards — all secured with 256-bit encryption.' },
            { icon: '💰', title: 'Best Prices in ₹', desc: 'Price match guarantee. Always get the best deal in Indian Rupees.' },
            { icon: '🎧', title: '24/7 Hindi Support', desc: 'Our team speaks your language — anytime, anywhere in India.' },
            { icon: '🔄', title: 'Free Cancellation', desc: 'Flexible bookings with free cancellation on most stays.' },
          ].map((w, i) => (
            <div key={i} style={{
              background: 'var(--glass)', border: '1px solid var(--glass-border)',
              borderRadius: '20px', padding: '32px 24px', textAlign: 'center',
              transition: 'var(--transition)', cursor: 'default'
            }}
              onMouseOver={e => {
                e.currentTarget.style.borderColor = 'var(--primary)';
                e.currentTarget.style.transform = 'translateY(-6px)';
              }}
              onMouseOut={e => {
                e.currentTarget.style.borderColor = 'var(--glass-border)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <div style={{ fontSize: '2.5rem', marginBottom: '16px' }}>{w.icon}</div>
              <h3 style={{ fontWeight: '700', marginBottom: '8px', fontSize: '1rem' }}>{w.title}</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', lineHeight: '1.5' }}>{w.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section className="section" style={{ paddingTop: '0' }}>
        <div className="section-header">
          <div className="section-tag"><i className="fas fa-comments" /> Travelers Say</div>
          <h2 className="section-title">Loved by <span style={{ color: 'var(--primary)' }}>Indian Travelers</span></h2>
        </div>
        <div className="testimonials-grid">
          {testimonials.map((t, i) => (
            <div className="testimonial-card" key={i}>
              <div className="testimonial-stars">
                {[...Array(t.rating)].map((_, j) => <i key={j} className="fas fa-star" />)}
              </div>
              <p className="testimonial-text">"{t.text}"</p>
              <div className="testimonial-author">
                <div className="testimonial-avatar">{t.initials}</div>
                <div className="testimonial-info">
                  <h4>{t.name}</h4>
                  <p><i className="fas fa-map-marker-alt" style={{ marginRight: '4px', color: 'var(--primary)' }} />{t.city}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== CTA ===== */}
      <div className="cta-section" style={{ marginBottom: '60px' }}>
        <div className="section-tag" style={{ display: 'inline-flex', marginBottom: '20px' }}>
          <i className="fas fa-rocket" /> Special Offer
        </div>
        <h2>🎉 Get Flat ₹500 Off on Your First Booking!</h2>
        <p>Use code <strong style={{ color: 'var(--primary-light)' }}>RUPIKSHA500</strong> at checkout. Limited time offer for new users.</p>
        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
           <button onClick={() => handleBookNow()} className="btn btn-primary" style={{ padding: '14px 32px', fontSize: '1rem' }}>
            <i className="fas fa-paper-plane" /> Book Now & Save ₹500
          </button>
          <button className="btn btn-outline" style={{ padding: '14px 32px', fontSize: '1rem' }}>
            <i className="fas fa-info-circle" /> Know More
          </button>
        </div>
      </div>

      {/* ===== FOOTER ===== */}
      <footer style={{
        borderTop: '1px solid var(--glass-border)',
        padding: '40px 24px',
        textAlign: 'center',
        color: 'var(--text-muted)',
        fontSize: '0.9rem'
      }}>
        <div style={{ marginBottom: '16px', display: 'flex', justifyContent: 'center' }}>
          <img src={logo} alt="Rupiksha Travel Logo" style={{ height: '35px' }} />
        </div>
        <p style={{ marginBottom: '8px' }}>
          <i className="fas fa-map-marker-alt" style={{ color: 'var(--primary)', marginRight: '6px' }} />
          India's Most Trusted Travel Booking Platform 🇮🇳
        </p>
        <p>© 2025 Rupiksha Travel. All rights reserved. | Made with ❤️ for Indians</p>
      </footer>
    </div>
  );
};

export default Home;
