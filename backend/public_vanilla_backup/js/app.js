// ========================
// RUPIKSHA TRAVEL - APP.JS
// ========================

const API = '';
let currentUser = null;
let currentToken = null;

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
  initFirebaseSession();
  navigateTo('home');
  initScrollEffects();
  initScrollReveal();
});

// ===== SCROLL REVEAL =====
function initScrollReveal() {
  window.addEventListener('scroll', () => {
    const reveals = document.querySelectorAll('.reveal');
    reveals.forEach(r => {
      const windowHeight = window.innerHeight;
      const revealTop = r.getBoundingClientRect().top;
      if (revealTop < windowHeight - 100) r.classList.add('active');
    });
  });
}

// ===== SCROLL EFFECTS =====
function initScrollEffects() {
  window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) navbar.classList.add('scrolled');
    else navbar.classList.remove('scrolled');
  });
}

// ===== AUTH WITH FIREBASE =====
function initFirebaseSession() {
  if (!window.firebaseMethods) {
    // If firebase is not yet ready, try again in a bit
    setTimeout(initFirebaseSession, 100);
    return;
  }
  
  window.firebaseMethods.onAuthStateChanged(window.firebaseAuth, (user) => {
    if (user) {
      // User is signed in
      currentUser = {
        id: user.uid,
        name: user.displayName || user.email.split('@')[0],
        email: user.email,
        role: user.email === 'admin@rupiksha.com' ? 'admin' : 'user' // Admin detection
      };
      // We will also store a flag for the token for backend requests if needed
      user.getIdToken().then(token => {
        currentToken = token;
        localStorage.setItem('rt_token', token);
      });
      localStorage.setItem('rt_user', JSON.stringify(currentUser));
      updateNavForUser();
    } else {
      // User is signed out
      currentUser = null;
      currentToken = null;
      localStorage.removeItem('rt_token');
      localStorage.removeItem('rt_user');
      updateNavForGuest();
    }
  });
}

function checkAuth() {
  // Overridden by initFirebaseSession()
}

function updateNavForUser() {
  document.getElementById('authButtons').style.display = 'none';
  document.getElementById('userMenu').style.display = 'block';
  document.getElementById('userName').textContent = currentUser.name;
  document.getElementById('navProfile').style.display = 'block';
  if (currentUser.role === 'admin') {
    document.getElementById('navAdmin').style.display = 'block';
  }
}

function updateNavForGuest() {
  document.getElementById('authButtons').style.display = 'flex';
  document.getElementById('userMenu').style.display = 'none';
  document.getElementById('navProfile').style.display = 'none';
  document.getElementById('navAdmin').style.display = 'none';
}

async function handleLogin(e) {
  e.preventDefault();
  if (!window.firebaseMethods) {
    showToast('Firebase load ho raha hai, pls thoda wait karein...', 'info');
    return;
  }
  
  const btn = document.getElementById('loginBtn');
  btn.disabled = true; btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Signing in...';
  
  const email = document.getElementById('loginEmail').value;
  const password = document.getElementById('loginPassword').value;

  console.log("Attempting login for:", email);

  try {
    const userCredential = await window.firebaseMethods.signIn(window.firebaseAuth, email, password);
    const user = userCredential.user;
    console.log("Login success:", user.uid);
    
    closeModal('loginModal');
    showToast('Swagat hai, ' + (user.displayName || user.email.split('@')[0]) + '!', 'success');
    document.getElementById('loginForm').reset();
  } catch (err) {
    console.error("Firebase Login Error:", err.code, err.message);
    let msg = "Login fail ho gaya";
    if (err.code === 'auth/user-not-found') msg = "User nahi mila. Signup karein.";
    else if (err.code === 'auth/wrong-password') msg = "Galat password dala hai.";
    else if (err.code === 'auth/invalid-email') msg = "Email format galat hai.";
    else if (err.code === 'auth/network-request-failed') msg = "Internet connection check karein.";
    else if (err.code === 'auth/too-many-requests') msg = "Bahut baar try kiya, thodi der baad try karein.";
    else if (err.code === 'auth/operation-not-allowed') msg = "Firebase dashboard mein Email/Password enable nahi hai.";
    
    showToast(msg, 'error');
  }
  btn.disabled = false; btn.innerHTML = '<i class="fas fa-sign-in-alt"></i> Sign In';
}

async function handleRegister(e) {
  e.preventDefault();
  if (!window.firebaseMethods) {
    showToast('Firebase load ho raha hai, thoda intezar karein...', 'info');
    return;
  }

  const btn = document.getElementById('registerBtn');
  btn.disabled = true; btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Account ban raha hai...';
  
  const name = document.getElementById('regName').value;
  const email = document.getElementById('regEmail').value;
  const password = document.getElementById('regPassword').value;

  console.log("Attempting signup for:", email);

  try {
    const userCredential = await window.firebaseMethods.signUp(window.firebaseAuth, email, password);
    const user = userCredential.user;
    console.log("Signup success:", user.uid);
    
    closeModal('registerModal');
    showToast('Account ban gaya! Swagat hai, ' + name, 'success');
    document.getElementById('registerForm').reset();
  } catch (err) {
    console.error("Firebase Signup Error:", err.code, err.message);
    let msg = "Signup fail ho gaya";
    if (err.code === 'auth/email-already-in-use') msg = "Ye email pehle se hi registered hai.";
    else if (err.code === 'auth/invalid-email') msg = "Email valid nahi hai.";
    else if (err.code === 'auth/weak-password') msg = "Password kam se kam 6 characters ka hona chahiye.";
    else if (err.code === 'auth/operation-not-allowed') msg = "Firebase console mein signup disabled hai.";
    
    showToast(msg, 'error');
  }
  btn.disabled = false; btn.innerHTML = '<i class="fas fa-user-plus"></i> Create Account';
}

function logout() {
  window.firebaseMethods.signOut(window.firebaseAuth)
    .then(() => {
      showToast('Log out ho gaya', 'info');
      closeUserDropdown();
      navigateTo('home');
    })
    .catch((error) => {
      showToast('Logout fail: ' + error.message, 'error');
    });
}

// ===== MODALS =====
function openModal(id) { document.getElementById(id).classList.add('active'); }
function closeModal(id) { document.getElementById(id).classList.remove('active'); }
function switchModal(from, to) { closeModal(from); setTimeout(() => openModal(to), 200); }
function togglePassword(id) {
  const input = document.getElementById(id);
  input.type = input.type === 'password' ? 'text' : 'password';
}

// ===== TOAST =====
function showToast(msg, type = 'info') {
  const container = document.getElementById('toastContainer');
  const icon = type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle';
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `<i class="fas fa-${icon}"></i> ${msg}`;
  container.appendChild(toast);
  setTimeout(() => toast.remove(), 3000);
}

// ===== USER DROPDOWN =====
function toggleUserDropdown() { document.getElementById('userDropdown').classList.toggle('show'); }
function closeUserDropdown() { document.getElementById('userDropdown').classList.remove('show'); }
document.addEventListener('click', (e) => {
  if (!e.target.closest('.user-avatar') && !e.target.closest('.user-dropdown')) closeUserDropdown();
});

// ===== MOBILE MENU =====
function toggleMobileMenu() { document.getElementById('navLinks').classList.toggle('show'); }

// ===== NAVIGATION =====
function navigateTo(page) {
  document.getElementById('navLinks').classList.remove('show');
  const links = document.querySelectorAll('.nav-link');
  links.forEach(l => l.classList.remove('active'));
  const activeLink = document.querySelector(`[data-page="${page}"]`);
  if (activeLink) activeLink.classList.add('active');

  const main = document.getElementById('mainContent');
  window.scrollTo({ top: 0, behavior: 'smooth' });

  switch (page) {
    case 'home': renderHome(main); break;
    case 'hotels': renderBookingPage(main, 'hotel'); break;
    case 'flights': renderBookingPage(main, 'flight'); break;
    case 'trains': renderBookingPage(main, 'train'); break;
    case 'cabs': renderBookingPage(main, 'cab'); break;
    case 'profile': renderProfile(main); break;
    case 'admin': renderAdmin(main); break;
    default: renderHome(main);
  }
}

// ===== RENDER HOME =====
function renderHome(el) {
  const particles = Array.from({ length: 20 }, (_, i) =>
    `<div class="particle" style="left:${Math.random() * 100}%;top:${Math.random() * 100}%;animation-delay:${i * 0.4}s;animation-duration:${6 + Math.random() * 6}s"></div>`
  ).join('');

  el.innerHTML = `
    <!-- HERO -->
    <section class="hero">
      <div class="hero-bg-image" style="background-image: url('/hero_premium.png');"></div>
      <div class="hero-overlay"></div>
      <div class="hero-particles">${particles}</div>
      <div class="hero-content">
        <div class="hero-badge"><i class="fas fa-crown"></i> Premium Travel Partner</div>
        <h1 class="hero-title">Experience the <span class="gradient-text">Extraordinary</span></h1>
        <p class="hero-subtitle">Discover curated destinations, luxury stays, and seamless travel experiences designed exclusively for you.</p>
        
        <div class="hero-search-wrapper">
          <div class="search-tabs">
            <div class="search-tab active" onclick="navigateTo('hotels')"><i class="fas fa-hotel"></i> Hotels</div>
            <div class="search-tab" onclick="navigateTo('flights')"><i class="fas fa-plane"></i> Flights</div>
            <div class="search-tab" onclick="navigateTo('trains')"><i class="fas fa-train"></i> Trains</div>
            <div class="search-tab" onclick="navigateTo('cabs')"><i class="fas fa-taxi"></i> Cabs</div>
          </div>
          <div class="search-inputs">
            <div class="input-col">
              <label>Destination</label>
              <input type="text" class="input-field" placeholder="Where are you going?">
            </div>
            <div class="input-col">
              <label>Check In</label>
              <input type="date" class="input-field">
            </div>
            <div class="input-col">
              <label>Check Out</label>
              <input type="date" class="input-field">
            </div>
            <div class="input-col">
              <label>Guests</label>
              <input type="number" class="input-field" value="2" min="1">
            </div>
            <div class="search-btn" onclick="navigateTo('hotels')">
              <i class="fas fa-search"></i>
            </div>
          </div>
        </div>

        <div class="hero-stats">
          <div class="stat"><div class="stat-number">10K+</div><div class="stat-label">Happy Travellers</div></div>
          <div class="stat"><div class="stat-number">500+</div><div class="stat-label">Destinations</div></div>
          <div class="stat"><div class="stat-number">50K+</div><div class="stat-label">Bookings Done</div></div>
          <div class="stat"><div class="stat-number">4.8★</div><div class="stat-label">User Rating</div></div>
        </div>
      </div>
    </section>

    <!-- SERVICES -->
    <section class="section">
      <div class="section-header">
        <div class="section-tag"><i class="fas fa-concierge-bell"></i> Our Services</div>
        <h2 class="section-title">What We Offer</h2>
        <p class="section-subtitle">Complete travel solutions from booking to your destination</p>
      </div>
      <div class="services-grid">
        <div class="service-card" onclick="navigateTo('hotels')">
          <div class="service-icon hotel"><i class="fas fa-hotel"></i></div>
          <h3>Hotel Booking</h3>
          <p>Find and book the perfect stay from luxury resorts to budget-friendly hotels across India and worldwide.</p>
        </div>
        <div class="service-card" onclick="navigateTo('flights')">
          <div class="service-icon flight"><i class="fas fa-plane"></i></div>
          <h3>Flight Booking</h3>
          <p>Domestic and international flights at the best fares. Compare airlines and book your tickets instantly.</p>
        </div>
        <div class="service-card" onclick="navigateTo('trains')">
          <div class="service-icon train"><i class="fas fa-train"></i></div>
          <h3>Train Booking</h3>
          <p>Book train tickets across India with live availability, seat selection, and instant confirmation.</p>
        </div>
        <div class="service-card" onclick="navigateTo('cabs')">
          <div class="service-icon cab"><i class="fas fa-taxi"></i></div>
          <h3>Cab Booking</h3>
          <p>Local and outstation cab services. Safe, reliable, and affordable rides at your fingertips.</p>
        </div>
      </div>
    </section>

    <!-- SEMICIRCLE DESTINATIONS -->
    <section class="section reveal">
      <div class="section-header">
        <div class="section-tag"><i class="fas fa-magic"></i> Featured Experiences</div>
        <h2 class="section-title">Explore the Semicircle of Joy</h2>
      </div>
      <div class="semicircle-container">
        <div class="semicircle-rail" id="semicircleRail">
          ${renderSemicircleItems()}
        </div>
      </div>
      <div style="text-align:center; margin-top:40px;">
        <button class="btn btn-outline" onclick="rotateSemicircle(-30)"><i class="fas fa-chevron-left"></i> Previous</button>
        <button class="btn btn-outline" onclick="rotateSemicircle(30)">Next <i class="fas fa-chevron-right"></i></button>
      </div>
    </section>

    <!-- POPULAR DESTINATIONS FLIP CARDS -->
    <section class="section reveal">
      <div class="section-header">
        <div class="section-tag"><i class="fas fa-map-marker-alt"></i> Popular Destinations</div>
        <h2 class="section-title">Flip to Discover</h2>
        <p class="section-subtitle">Aapki pasandida jagahon ki anokhi jaankari</p>
      </div>
      <div class="destinations-grid">
        ${renderDestCards()}
      </div>
    </section>

    <!-- TESTIMONIALS -->
    <section class="section">
      <div class="section-header">
        <div class="section-tag"><i class="fas fa-quote-left"></i> Testimonials</div>
        <h2 class="section-title">What Our Travellers Say</h2>
        <p class="section-subtitle">Real reviews from real travellers</p>
      </div>
      <div class="testimonials-grid">
        ${renderTestimonials()}
      </div>
    </section>

    <!-- CTA -->
    <section class="cta-section">
      <h2>Ready to Start Your Journey?</h2>
      <p>Join thousands of happy travellers. Sign up now and get exclusive deals!</p>
      <button class="btn btn-primary" onclick="${currentUser ? "navigateTo('hotels')" : "openModal('registerModal')"}">
        <i class="fas fa-rocket"></i> ${currentUser ? 'Book Now' : 'Get Started Free'}
      </button>
    </section>
  `;
}

function renderSemicircleItems() {
  const items = [
    { name: 'Kashmir', img: 'https://images.unsplash.com/photo-1566833925222-191ef3a6d554?auto=format&fit=crop&w=600&q=80', rot: 0 },
    { name: 'Ladakh', img: 'https://images.unsplash.com/photo-1544085311-11a028465b03?auto=format&fit=crop&w=600&q=80', rot: 30 },
    { name: 'Shimla', img: 'https://images.unsplash.com/photo-1562691762-4318c4e477e3?auto=format&fit=crop&w=600&q=80', rot: 60 },
    { name: 'Sikkim', img: 'https://images.unsplash.com/photo-1505305976870-c0be14404ebb?auto=format&fit=crop&w=600&q=80', rot: -30 },
    { name: 'Agra', img: 'https://images.unsplash.com/photo-1524492707947-50b3294157c9?auto=format&fit=crop&w=600&q=80', rot: -60 },
  ];
  return items.map(it => `
    <div class="carousel-item" style="background-image:url('${it.img}'); transform: rotate(${it.rot}deg);">
      <div class="label">${it.name}</div>
    </div>
  `).join('');
}

let currentRot = 0;
function rotateSemicircle(deg) {
  currentRot += deg;
  document.getElementById('semicircleRail').style.transform = `rotate(${currentRot}deg)`;
}

function renderDestCards() {
  const dests = [
    { name: 'Goa', desc: 'Sunny beaches and vibrant parties.', price: '₹4,999', img: '/goa_beach_1773079099022.png', details: 'Perfect for water sports and local cuisine.' },
    { name: 'Manali', desc: 'Snowy escape in the Himalayas.', price: '₹5,499', img: '/manali_mountains_1773079125823.png', details: 'Ideal for trekking and paragliding.' },
    { name: 'Jaipur', desc: 'The historic Pink City.', price: '₹3,299', img: 'https://images.unsplash.com/photo-1599661046289-e31897c93e14?auto=format&fit=crop&w=600&q=80', details: 'Visit massive forts and colorful bazaars.' },
    { name: 'Kerala', desc: 'God\'s own country backwaters.', price: '₹6,999', img: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=600&q=80', details: 'Houseboat stays and lush greenery.' },
    { name: 'Udaipur', desc: 'Romantic city of lakes.', price: '₹4,199', img: 'https://images.unsplash.com/photo-1590050752117-23a9d7fc2097?auto=format&fit=crop&w=600&q=80', details: 'Stunning palaces and lake views.' },
    { name: 'Rishikesh', desc: 'Yoga and rafting capital.', price: '₹2,999', img: 'https://images.unsplash.com/photo-1596464716127-f2a82984de30?auto=format&fit=crop&w=600&q=80', details: 'Ganga Aarti and bungee jumping.' },
  ];
  return dests.map(d => `
    <div class="flip-card reveal">
      <div class="flip-card-inner">
        <div class="flip-card-front">
          <img src="${d.img}" alt="${d.name}" class="dest-card-img" style="height:100%; width:100%; object-fit:cover;">
          <div class="dest-card-overlay">
            <h3>${d.name}</h3>
            <p>${d.desc}</p>
            <div class="dest-price">From ${d.price}</div>
          </div>
        </div>
        <div class="flip-card-back">
          <h3>${d.name} Highlights</h3>
          <p>${d.details}</p>
          <button class="btn btn-primary" onclick="navigateTo('hotels')">Book Now</button>
        </div>
      </div>
    </div>
  `).join('');
}

function renderTestimonials() {
  const reviews = [
    { name: 'Priya Sharma', loc: 'New Delhi', text: 'Amazing experience! Booked my Goa trip and everything was perfectly organized. Highly recommend Rupiksha Travel!', initials: 'PS' },
    { name: 'Rahul Verma', loc: 'Mumbai', text: 'Best prices for flights. The booking process is super smooth and the customer support is excellent.', initials: 'RV' },
    { name: 'Anita Patel', loc: 'Bangalore', text: 'Used Rupiksha for our family vacation. Hotel was exactly as described. Will definitely book again!', initials: 'AP' },
  ];
  return reviews.map(r => `
    <div class="testimonial-card">
      <div class="testimonial-stars">${'★'.repeat(5)}</div>
      <p class="testimonial-text">"${r.text}"</p>
      <div class="testimonial-author">
        <div class="testimonial-avatar">${r.initials}</div>
        <div class="testimonial-info"><h4>${r.name}</h4><p>${r.loc}</p></div>
      </div>
    </div>
  `).join('');
}

// ===== RENDER BOOKING PAGE =====
function renderBookingPage(el, type) {
  if (!currentUser) {
    showToast('Please login to book', 'error');
    openModal('loginModal');
    return;
  }
  const config = {
    hotel: { icon: 'fas fa-hotel', title: 'Hotel Booking', color: 'hotel', fields: getHotelFields() },
    flight: { icon: 'fas fa-plane', title: 'Flight Booking', color: 'flight', fields: getFlightFields() },
    train: { icon: 'fas fa-train', title: 'Train Booking', color: 'train', fields: getTrainFields() },
    cab: { icon: 'fas fa-taxi', title: 'Cab Booking', color: 'cab', fields: getCabFields() },
  };
  const c = config[type];
  el.innerHTML = `
    <div class="booking-page">
      <div class="booking-header">
        <h1><i class="${c.icon}" style="color:var(--primary)"></i> ${c.title}</h1>
        <p>Fill in the details below to book your ${type}</p>
      </div>
      <div class="booking-form">
        <form onsubmit="handleBooking(event, '${type}')">
          ${c.fields}
          <div class="price-summary" id="priceSummary">
            <div class="price-row"><span>Base Price</span><span id="basePrice">₹0</span></div>
            <div class="price-row"><span>Taxes & Fees</span><span id="taxPrice">₹0</span></div>
            <div class="price-row total"><span>Total</span><span id="totalPrice">₹0</span></div>
          </div>
          <div style="margin-top:24px">
            <button type="submit" class="btn btn-primary btn-full" id="bookBtn">
              <i class="fas fa-check-circle"></i> Confirm Booking
            </button>
          </div>
        </form>
      </div>
    </div>
  `;
  initPriceCalc(type);
}

function getHotelFields() {
  return `
    <h3><i class="fas fa-map-marker-alt"></i> Destination & Stay</h3>
    <div class="form-group"><label>City / Destination</label><input type="text" id="bkCity" placeholder="e.g. Goa, Mumbai..." required></div>
    <div class="form-row">
      <div class="form-group"><label>Check-in Date</label><input type="date" id="bkCheckIn" required></div>
      <div class="form-group"><label>Check-out Date</label><input type="date" id="bkCheckOut" required></div>
    </div>
    <div class="form-row">
      <div class="form-group"><label>Room Type</label>
        <select id="bkRoomType"><option value="standard">Standard - ₹1,500/night</option><option value="deluxe">Deluxe - ₹3,000/night</option><option value="suite">Suite - ₹5,500/night</option><option value="premium">Premium Suite - ₹9,000/night</option></select>
      </div>
      <div class="form-group"><label>Guests</label><input type="number" id="bkGuests" min="1" max="10" value="2"></div>
    </div>
    <div class="form-group"><label>Hotel Name (Optional)</label><input type="text" id="bkHotelName" placeholder="Preferred hotel name"></div>
  `;
}

function getFlightFields() {
  return `
    <h3><i class="fas fa-plane-departure"></i> Flight Details</h3>
    <div class="form-row">
      <div class="form-group"><label>From</label><input type="text" id="bkFrom" placeholder="e.g. Delhi" required></div>
      <div class="form-group"><label>To</label><input type="text" id="bkTo" placeholder="e.g. Mumbai" required></div>
    </div>
    <div class="form-row">
      <div class="form-group"><label>Date</label><input type="date" id="bkDate" required></div>
      <div class="form-group"><label>Passengers</label><input type="number" id="bkPassengers" min="1" max="9" value="1"></div>
    </div>
    <div class="form-row">
      <div class="form-group"><label>Class</label>
        <select id="bkClass"><option value="economy">Economy - ₹3,500</option><option value="premium_economy">Premium Economy - ₹6,000</option><option value="business">Business - ₹12,000</option><option value="first">First Class - ₹25,000</option></select>
      </div>
      <div class="form-group"><label>Airline Preference</label>
        <select id="bkAirline"><option value="">Any</option><option value="IndiGo">IndiGo</option><option value="Air India">Air India</option><option value="Vistara">Vistara</option><option value="SpiceJet">SpiceJet</option></select>
      </div>
    </div>
  `;
}

function getTrainFields() {
  return `
    <h3><i class="fas fa-train"></i> Train Details</h3>
    <div class="form-row">
      <div class="form-group"><label>From Station</label><input type="text" id="bkFrom" placeholder="e.g. New Delhi" required></div>
      <div class="form-group"><label>To Station</label><input type="text" id="bkTo" placeholder="e.g. Mumbai Central" required></div>
    </div>
    <div class="form-row">
      <div class="form-group"><label>Date</label><input type="date" id="bkDate" required></div>
      <div class="form-group"><label>Passengers</label><input type="number" id="bkPassengers" min="1" max="6" value="1"></div>
    </div>
    <div class="form-row">
      <div class="form-group"><label>Class</label>
        <select id="bkClass"><option value="sleeper">Sleeper - ₹450</option><option value="3ac">3AC - ₹1,200</option><option value="2ac">2AC - ₹1,800</option><option value="1ac">1AC - ₹3,200</option></select>
      </div>
      <div class="form-group"><label>Train Name</label><input type="text" id="bkTrainName" placeholder="e.g. Rajdhani Express"></div>
    </div>
  `;
}

function getCabFields() {
  return `
    <h3><i class="fas fa-taxi"></i> Cab Details</h3>
    <div class="form-row">
      <div class="form-group"><label>Pickup Location</label><input type="text" id="bkPickup" placeholder="Enter pickup address" required></div>
      <div class="form-group"><label>Drop Location</label><input type="text" id="bkDrop" placeholder="Enter drop address" required></div>
    </div>
    <div class="form-row">
      <div class="form-group"><label>Date</label><input type="date" id="bkDate" required></div>
      <div class="form-group"><label>Cab Type</label>
        <select id="bkCabType"><option value="mini">Mini - ₹8/km</option><option value="sedan">Sedan - ₹12/km</option><option value="suv">SUV - ₹16/km</option><option value="luxury">Luxury - ₹25/km</option></select>
      </div>
    </div>
    <div class="form-group"><label>Estimated Distance (km)</label><input type="number" id="bkDistance" min="1" value="10" placeholder="Approx km"></div>
  `;
}

function initPriceCalc(type) {
  const priceMap = {
    hotel: { standard: 1500, deluxe: 3000, suite: 5500, premium: 9000 },
    flight: { economy: 3500, premium_economy: 6000, business: 12000, first: 25000 },
    train: { sleeper: 450, '3ac': 1200, '2ac': 1800, '1ac': 3200 },
    cab: { mini: 8, sedan: 12, suv: 16, luxury: 25 },
  };
  const calc = () => {
    let base = 0;
    if (type === 'hotel') {
      const rt = document.getElementById('bkRoomType')?.value;
      const ci = document.getElementById('bkCheckIn')?.value;
      const co = document.getElementById('bkCheckOut')?.value;
      const nights = ci && co ? Math.max(1, Math.ceil((new Date(co) - new Date(ci)) / 86400000)) : 1;
      base = (priceMap.hotel[rt] || 1500) * nights;
    } else if (type === 'flight') {
      const cls = document.getElementById('bkClass')?.value;
      const pax = parseInt(document.getElementById('bkPassengers')?.value) || 1;
      base = (priceMap.flight[cls] || 3500) * pax;
    } else if (type === 'train') {
      const cls = document.getElementById('bkClass')?.value;
      const pax = parseInt(document.getElementById('bkPassengers')?.value) || 1;
      base = (priceMap.train[cls] || 450) * pax;
    } else if (type === 'cab') {
      const ct = document.getElementById('bkCabType')?.value;
      const dist = parseInt(document.getElementById('bkDistance')?.value) || 10;
      base = (priceMap.cab[ct] || 12) * dist;
    }
    const tax = Math.round(base * 0.12);
    document.getElementById('basePrice').textContent = '₹' + base.toLocaleString();
    document.getElementById('taxPrice').textContent = '₹' + tax.toLocaleString();
    document.getElementById('totalPrice').textContent = '₹' + (base + tax).toLocaleString();
  };
  setTimeout(() => {
    document.querySelectorAll('.booking-form input, .booking-form select').forEach(el => {
      el.addEventListener('change', calc);
      el.addEventListener('input', calc);
    });
    calc();
  }, 100);
}

async function handleBooking(e, type) {
  e.preventDefault();
  const btn = document.getElementById('bookBtn');
  btn.disabled = true; btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';

  const totalText = document.getElementById('totalPrice').textContent;
  const totalAmount = parseInt(totalText.replace(/[₹,]/g, '')) || 0;

  let body = { type, totalAmount, date: new Date().toISOString() };

  if (type === 'hotel') {
    body.to = document.getElementById('bkCity')?.value;
    body.checkIn = document.getElementById('bkCheckIn')?.value;
    body.checkOut = document.getElementById('bkCheckOut')?.value;
    body.roomType = document.getElementById('bkRoomType')?.value;
    body.guests = parseInt(document.getElementById('bkGuests')?.value);
    body.hotelName = document.getElementById('bkHotelName')?.value || 'Standard Hotel';
    body.date = body.checkIn;
  } else if (type === 'flight') {
    body.from = document.getElementById('bkFrom')?.value;
    body.to = document.getElementById('bkTo')?.value;
    body.date = document.getElementById('bkDate')?.value;
    body.passengers = parseInt(document.getElementById('bkPassengers')?.value);
    body.flightClass = document.getElementById('bkClass')?.value;
    body.airline = document.getElementById('bkAirline')?.value || 'Any';
  } else if (type === 'train') {
    body.from = document.getElementById('bkFrom')?.value;
    body.to = document.getElementById('bkTo')?.value;
    body.date = document.getElementById('bkDate')?.value;
    body.passengers = parseInt(document.getElementById('bkPassengers')?.value);
    body.trainClass = document.getElementById('bkClass')?.value;
    body.trainName = document.getElementById('bkTrainName')?.value || 'Express';
  } else if (type === 'cab') {
    body.pickupAddress = document.getElementById('bkPickup')?.value;
    body.dropAddress = document.getElementById('bkDrop')?.value;
    body.from = body.pickupAddress;
    body.to = body.dropAddress;
    body.date = document.getElementById('bkDate')?.value;
    body.cabType = document.getElementById('bkCabType')?.value;
  }

  try {
    const res = await fetch(`${API}/api/bookings`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${currentToken}` },
      body: JSON.stringify(body)
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message);
    showToast('Booking confirmed! ID: ' + data.booking.bookingId, 'success');
    setTimeout(() => navigateTo('profile'), 1500);
  } catch (err) {
    showToast(err.message || 'Booking failed', 'error');
  }
  btn.disabled = false; btn.innerHTML = '<i cla// ===== RENDER USER PORTAL (NEW DASHBOARD) =====
async function renderProfile(el) {
  if (!currentUser) { showToast('Please login first', 'error'); openModal('loginModal'); return; }
  el.innerHTML = '<div class="booking-page"><div class="loader"><div class="spinner"></div></div></div>';

  try {
    const bookingsRes = await fetch(`${API}/api/bookings`, { headers: { 'Authorization': `Bearer ${currentToken}` } });
    const bookings = await bookingsRes.json();
    const stats = {
      total: bookings.length,
      confirmed: bookings.filter(b => b.status === 'confirmed').length,
      spent: bookings.reduce((acc, b) => acc + (b.totalAmount || 0), 0)
    };

    el.innerHTML = `
      <div class="profile-page">
        <div class="dashboard-header">
          <div class="profile-avatar" style="margin:0;"><i class="fas fa-user-astronaut"></i></div>
          <div>
            <h1 style="font-size:2.5rem;">Namaste, ${currentUser.name}!</h1>
            <p style="color:rgba(255,255,255,0.7);">Aapka apna personalized travel portal.</p>
          </div>
        </div>

        <div class="dashboard-stats-grid">
          <div class="dashboard-stat-box"><i class="fas fa-suitcase-rolling"></i><h4>${stats.total}</h4><p>Total Bookings</p></div>
          <div class="dashboard-stat-box"><i class="fas fa-check-circle"></i><h4>${stats.confirmed}</h4><p>Active Trips</p></div>
          <div class="dashboard-stat-box"><i class="fas fa-wallet"></i><h4>₹${stats.spent.toLocaleString()}</h4><p>Total Spent</p></div>
          <div class="dashboard-stat-box"><i class="fas fa-gem"></i><h4>Silver</h4><p>Member Status</p></div>
        </div>

        <div class="profile-content" style="animation:none;">
          <div class="profile-tabs">
            <button class="profile-tab active" onclick="showProfileSection('history',this)">My Journey</button>
            <button class="profile-tab" onclick="showProfileSection('editProfile',this)">Profile Settings</button>
          </div>
          <div id="profileSectionContent">${renderBookingHistory(bookings)}</div>
        </div>
      </div>
    `;
    window._bookings = bookings;
  } catch (err) {
    el.innerHTML = '<div class="booking-page"><div class="empty-state"><i class="fas fa-exclamation-triangle"></i><h3>Server Connection Issue</h3><p>Local data mode active.</p></div></div>';
  }
}

function showProfileSection(section, btn) {
  document.querySelectorAll('.profile-tab').forEach(t => t.classList.remove('active'));
  if (btn) btn.classList.add('active');
  const content = document.getElementById('profileSectionContent');
  if (section === 'history') content.innerHTML = renderBookingHistory(window._bookings || []);
  else if (section === 'editProfile') content.innerHTML = renderEditProfile(window._profile || {});
}

function showEditProfile() { showProfileSection('editProfile', null); }

function renderBookingHistory(bookings) {
  if (!bookings.length) return '<div class="empty-state"><i class="fas fa-suitcase"></i><h3>No bookings yet</h3><p>Start exploring and book your first trip!</p></div>';
  const icons = { hotel: 'fas fa-hotel', flight: 'fas fa-plane', train: 'fas fa-train', cab: 'fas fa-taxi' };
  const colors = { hotel: 'linear-gradient(135deg,#6C63FF,#8B83FF)', flight: 'linear-gradient(135deg,#00D2FF,#0CA2C2)', train: 'linear-gradient(135deg,#FF6B6B,#ee5a24)', cab: 'linear-gradient(135deg,#FFE66D,#F7B731)' };
  return bookings.map(b => `
    <div class="booking-history-card">
      <div class="booking-type-icon" style="background:${colors[b.type]}"><i class="${icons[b.type]}"></i></div>
      <div class="booking-details">
        <h4>${b.type === 'hotel' ? (b.hotelName || b.to) : b.type === 'cab' ? (b.pickupAddress + ' → ' + b.dropAddress) : (b.from + ' → ' + b.to)}</h4>
        <p>${b.type.charAt(0).toUpperCase() + b.type.slice(1)} Booking • ID: ${b.bookingId}</p>
        <div class="booking-meta">
          <span><i class="fas fa-calendar"></i> ${new Date(b.date || b.createdAt).toLocaleDateString('en-IN')}</span>
          <span class="booking-status status-${b.status}">${b.status}</span>
        </div>
      </div>
      <div class="booking-actions">
        <span class="booking-amount">₹${b.totalAmount?.toLocaleString()}</span>
        ${b.status === 'confirmed' ? `<button class="btn btn-danger" style="padding:6px 14px;font-size:0.8rem" onclick="cancelBooking('${b._id}')"><i class="fas fa-times"></i> Cancel</button>` : ''}
      </div>
    </div>
  `).join('');
}

function renderEditProfile(profile) {
  return `
    <div class="booking-form" style="animation:fadeInUp 0.4s ease">
      <h3><i class="fas fa-user-edit"></i> Edit Profile</h3>
      <form onsubmit="handleUpdateProfile(event)">
        <div class="form-row">
          <div class="form-group"><label>Name</label><input type="text" id="editName" value="${profile.name || ''}" required></div>
          <div class="form-group"><label>Phone</label><input type="tel" id="editPhone" value="${profile.phone || ''}" required></div>
        </div>
        <div class="form-group"><label>Address</label><input type="text" id="editAddress" value="${profile.address || ''}" placeholder="Your address"></div>
        <div class="form-row">
          <div class="form-group"><label>City</label><input type="text" id="editCity" value="${profile.city || ''}" placeholder="City"></div>
          <div class="form-group"><label>State</label><input type="text" id="editState" value="${profile.state || ''}" placeholder="State"></div>
        </div>
        <button type="submit" class="btn btn-primary btn-full" id="updateProfileBtn"><i class="fas fa-save"></i> Save Changes</button>
      </form>
    </div>
  `;
}

async function handleUpdateProfile(e) {
  e.preventDefault();
  const btn = document.getElementById('updateProfileBtn');
  btn.disabled = true; btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Saving...';
  try {
    const res = await fetch(`${API}/api/user/profile`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${currentToken}` },
      body: JSON.stringify({
        name: document.getElementById('editName').value,
        phone: document.getElementById('editPhone').value,
        address: document.getElementById('editAddress').value,
        city: document.getElementById('editCity').value,
        state: document.getElementById('editState').value,
      })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message);
    currentUser.name = data.user.name;
    localStorage.setItem('rt_user', JSON.stringify(currentUser));
    document.getElementById('userName').textContent = currentUser.name;
    showToast('Profile updated!', 'success');
    navigateTo('profile');
  } catch (err) { showToast(err.message || 'Update failed', 'error'); }
  btn.disabled = false; btn.innerHTML = '<i class="fas fa-save"></i> Save Changes';
}

async function cancelBooking(id) {
  if (!confirm('Are you sure you want to cancel this booking?')) return;
  try {
    const res = await fetch(`${API}/api/bookings/${id}/cancel`, {
      method: 'PUT', headers: { 'Authorization': `Bearer ${currentToken}` }
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message);
    showToast('Booking cancelled', 'info');
    navigateTo('profile');
  } catch (err) { showToast(err.message || 'Cancel failed', 'error'); }
}

// ===== RENDER ADMIN =====
async function renderAdmin(el) {
  if (!currentUser || currentUser.role !== 'admin') {
    showToast('Admin access required', 'error');
    navigateTo('home');
    return;
  }
  el.innerHTML = '<div class="booking-page"><div class="loader"><div class="spinner"></div></div></div>';

  try {
    const [statsRes, usersRes, bookingsRes] = await Promise.all([
      fetch(`${API}/api/admin/stats`, { headers: { 'Authorization': `Bearer ${currentToken}` } }),
      fetch(`${API}/api/admin/users`, { headers: { 'Authorization': `Bearer ${currentToken}` } }),
      fetch(`${API}/api/admin/bookings`, { headers: { 'Authorization': `Bearer ${currentToken}` } })
    ]);
    const stats = await statsRes.json();
    const users = await usersRes.json();
    const bookings = await bookingsRes.json();

    el.innerHTML = `
      <div class="admin-page">
        <div class="admin-header">
          <h1><i class="fas fa-shield-alt" style="color:var(--primary)"></i> Admin Dashboard</h1>
          <p>Manage users, bookings, and monitor platform performance</p>
        </div>
        <div class="admin-stats">
          <div class="admin-stat-card" style="animation-delay:0.1s">
            <div class="admin-stat-icon" style="background:linear-gradient(135deg,#6C63FF,#8B83FF)"><i class="fas fa-users"></i></div>
            <div class="admin-stat-info"><h3>${stats.totalUsers}</h3><p>Total Users</p></div>
          </div>
          <div class="admin-stat-card" style="animation-delay:0.2s">
            <div class="admin-stat-icon" style="background:linear-gradient(135deg,#00D2FF,#0CA2C2)"><i class="fas fa-ticket-alt"></i></div>
            <div class="admin-stat-info"><h3>${stats.totalBookings}</h3><p>Total Bookings</p></div>
          </div>
          <div class="admin-stat-card" style="animation-delay:0.3s">
            <div class="admin-stat-icon" style="background:linear-gradient(135deg,#00b894,#00cec9)"><i class="fas fa-rupee-sign"></i></div>
            <div class="admin-stat-info"><h3>₹${stats.totalRevenue?.toLocaleString()}</h3><p>Total Revenue</p></div>
          </div>
          <div class="admin-stat-card" style="animation-delay:0.4s">
            <div class="admin-stat-icon" style="background:linear-gradient(135deg,#FF6B6B,#ee5a24)"><i class="fas fa-chart-bar"></i></div>
            <div class="admin-stat-info"><h3>${stats.bookingsByType?.length || 0}</h3><p>Service Types</p></div>
          </div>
        </div>
        <div class="admin-tabs">
          <button class="admin-tab active" onclick="showAdminSection('users',this)">All Users</button>
          <button class="admin-tab" onclick="showAdminSection('bookings',this)">All Bookings</button>
        </div>
        <div id="adminSectionContent">${renderUsersTable(users)}</div>
      </div>
    `;
    window._adminUsers = users;
    window._adminBookings = bookings;
  } catch (err) {
    el.innerHTML = '<div class="booking-page"><div class="empty-state"><i class="fas fa-exclamation-triangle"></i><h3>Error loading admin panel</h3><p>' + err.message + '</p></div></div>';
  }
}

function showAdminSection(section, btn) {
  document.querySelectorAll('.admin-tab').forEach(t => t.classList.remove('active'));
  if (btn) btn.classList.add('active');
  const content = document.getElementById('adminSectionContent');
  if (section === 'users') content.innerHTML = renderUsersTable(window._adminUsers || []);
  else content.innerHTML = renderBookingsTable(window._adminBookings || []);
}

function renderUsersTable(users) {
  if (!users.length) return '<div class="empty-state"><i class="fas fa-users"></i><h3>No users found</h3></div>';
  return `
    <div class="admin-table-wrapper">
      <table class="admin-table">
        <thead><tr><th>User</th><th>Email</th><th>Phone</th><th>Role</th><th>Joined</th><th>Actions</th></tr></thead>
        <tbody>${users.map(u => `
          <tr>
            <td><div class="user-cell"><div class="user-cell-avatar">${u.name?.charAt(0)?.toUpperCase()}</div><span>${u.name}</span></div></td>
            <td>${u.email}</td>
            <td>${u.phone || '-'}</td>
            <td><span class="booking-status ${u.role === 'admin' ? 'status-completed' : 'status-confirmed'}">${u.role}</span></td>
            <td>${new Date(u.createdAt).toLocaleDateString('en-IN')}</td>
            <td><div class="table-actions">${u.role !== 'admin' ? `<button class="table-btn delete" onclick="deleteUser('${u._id}')"><i class="fas fa-trash"></i> Delete</button>` : '<span style="color:var(--text-muted);font-size:0.8rem">Protected</span>'}</div></td>
          </tr>
        `).join('')}</tbody>
      </table>
    </div>
  `;
}

function renderBookingsTable(bookings) {
  if (!bookings.length) return '<div class="empty-state"><i class="fas fa-ticket-alt"></i><h3>No bookings found</h3></div>';
  return `
    <div class="admin-table-wrapper">
      <table class="admin-table">
        <thead><tr><th>Booking ID</th><th>User</th><th>Type</th><th>Route/Details</th><th>Amount</th><th>Status</th><th>Date</th><th>Actions</th></tr></thead>
        <tbody>${bookings.map(b => `
          <tr>
            <td style="font-weight:600;font-size:0.8rem">${b.bookingId}</td>
            <td>${b.userId?.name || 'Unknown'}</td>
            <td><span class="booking-status status-confirmed" style="text-transform:capitalize">${b.type}</span></td>
            <td>${b.from ? b.from + ' → ' + b.to : b.hotelName || b.to || '-'}</td>
            <td style="font-weight:700;color:var(--primary-light)">₹${b.totalAmount?.toLocaleString()}</td>
            <td><span class="booking-status status-${b.status}">${b.status}</span></td>
            <td>${new Date(b.createdAt).toLocaleDateString('en-IN')}</td>
            <td><div class="table-actions">
              <select class="table-btn edit" onchange="updateBookingStatus('${b._id}',this.value)" style="padding:4px 8px;background:var(--dark);color:var(--text);border:1px solid var(--glass-border);border-radius:6px;font-size:0.75rem;cursor:pointer">
                <option value="" disabled selected>Change</option>
                <option value="confirmed">Confirm</option>
                <option value="completed">Complete</option>
                <option value="cancelled">Cancel</option>
              </select>
            </div></td>
          </tr>
        `).join('')}</tbody>
      </table>
    </div>
  `;
}

async function deleteUser(id) {
  if (!confirm('Delete this user and all their bookings? This cannot be undone.')) return;
  try {
    const res = await fetch(`${API}/api/admin/users/${id}`, {
      method: 'DELETE', headers: { 'Authorization': `Bearer ${currentToken}` }
    });
    if (!res.ok) throw new Error('Failed to delete');
    showToast('User deleted', 'success');
    navigateTo('admin');
  } catch (err) { showToast(err.message, 'error'); }
}

async function updateBookingStatus(id, status) {
  try {
    const res = await fetch(`${API}/api/admin/bookings/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${currentToken}` },
      body: JSON.stringify({ status })
    });
    if (!res.ok) throw new Error('Failed to update');
    showToast('Booking status updated to ' + status, 'success');
    navigateTo('admin');
  } catch (err) { showToast(err.message, 'error'); }
}
