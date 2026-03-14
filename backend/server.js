require('dotenv').config();
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const path = require('path');

const app = express();

// In-memory data storage
let users = [];
let bookings = [];
let packages = [
  { id: 1, title: 'Golden Triangle Tour', location: 'Delhi-Agra-Jaipur, India', duration: '7 Days', price: 25000, rating: 4.8, reviews: 234, image: 'https://images.unsplash.com/photo-1548013146-72479768bada?w=500&q=80', category: 'Cultural', description: 'Explore the iconic Golden Triangle of India.' },
  { id: 2, title: 'Goa Beach Holiday', location: 'Goa, India', duration: '5 Days', price: 15000, rating: 4.9, reviews: 412, image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=500&q=80', category: 'Beach', description: 'Relax on the sun-kissed beaches of Goa.' }
];
let idCounter = { user: 1, booking: 1, package: 3 };

// Demo users
const demoUser = {
  id: idCounter.user++,
  name: 'Demo User',
  email: 'demo@rupiksha.com',
  phone: '9999999999',
  password: '$2a$10$demo',
  role: 'user',
  createdAt: new Date()
};
users.push(demoUser);

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Simple request logger
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// ===========================
// AUTH ROUTES
// ===========================

// Register
app.post('/api/auth/register', async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;
    
    // Check if user already exists
    const existingUser = users.find(u => u.email === email);
    if (existingUser) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const newUser = {
      id: idCounter.user++,
      name,
      email,
      phone,
      password: hashedPassword,
      role: 'user',
      createdAt: new Date()
    };

    users.push(newUser);

    // Create JWT token
    const token = jwt.sign({ id: newUser.id, email }, process.env.JWT_SECRET || 'secret123', { expiresIn: '7d' });

    res.status(201).json({
      message: 'Registration successful',
      token,
      user: { id: newUser.id, name, email, role: 'user', phone }
    });

  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Login
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = users.find(u => u.email === email);
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Create JWT token
    const token = jwt.sign({ id: user.id, email }, process.env.JWT_SECRET || 'secret123', { expiresIn: '7d' });

    res.json({
      message: 'Login successful',
      token,
      user: { id: user.id, name: user.name, email: user.email, role: user.role, phone: user.phone }
    });

  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get profile
app.get('/api/user/profile', (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret123');
    const user = users.find(u => u.id === decoded.id);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const { password, ...userWithoutPassword } = user;
    res.json(userWithoutPassword);

  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
});

// Update profile
app.put('/api/user/profile', (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret123');
    const userIndex = users.findIndex(u => u.id === decoded.id);
    
    if (userIndex === -1) {
      return res.status(404).json({ message: 'User not found' });
    }

    const { name, phone, address, city, state } = req.body;
    users[userIndex] = { ...users[userIndex], name, phone, address, city, state };

    const { password, ...userWithoutPassword } = users[userIndex];
    res.json({ message: 'Profile updated', user: userWithoutPassword });

  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// ===========================
// BOOKING ROUTES
// ===========================

// Create booking
app.post('/api/bookings', (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret123');
    const bookingData = req.body;
    
    const newBooking = {
      id: idCounter.booking++,
      ...bookingData,
      userId: decoded.id,
      status: 'confirmed',
      createdAt: new Date()
    };

    bookings.push(newBooking);

    res.status(201).json({
      message: 'Booking confirmed!',
      booking: newBooking
    });

  } catch (error) {
    res.status(500).json({ message: 'Booking failed', error: error.message });
  }
});

// Get user bookings
app.get('/api/bookings', (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret123');
    const userBookings = bookings.filter(b => b.userId === decoded.id);
    
    res.json(userBookings);

  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
});

// Cancel booking
app.put('/api/bookings/:id/cancel', (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret123');
    const bookingIndex = bookings.findIndex(b => b.id == req.params.id && b.userId === decoded.id);

    if (bookingIndex === -1) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    bookings[bookingIndex].status = 'cancelled';
    res.json({ message: 'Booking cancelled', booking: bookings[bookingIndex] });

  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// ===========================
// ADMIN ROUTES
// ===========================
// PACKAGE ROUTES
// ===========================

// Get all packages
app.get('/api/packages', (req, res) => {
  res.json(packages);
});

// Create package (admin)
app.post('/api/packages', (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'No token provided' });
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret123');
    const admin = users.find(u => u.id === decoded.id && u.role === 'admin');
    if (!admin) return res.status(403).json({ message: 'Admin access required' });

    const newPackage = { id: idCounter.package++, ...req.body, rating: 5.0, reviews: 0 };
    packages.push(newPackage);
    res.status(201).json(newPackage);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create package' });
  }
});

// Delete package
app.delete('/api/packages/:id', (req, res) => {
  const index = packages.findIndex(p => p.id == req.params.id);
  if (index !== -1) {
    packages.splice(index, 1);
    res.json({ message: 'Package deleted' });
  } else {
    res.status(404).json({ message: 'Package not found' });
  }
});

// Get all users
app.get('/api/admin/users', (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret123');
    const admin = users.find(u => u.id === decoded.id && u.role === 'admin');
    
    if (!admin) {
      return res.status(403).json({ message: 'Admin access required' });
    }

    const sanitizedUsers = users.map(u => {
      const { password, ...user } = u;
      return user;
    });
    res.json(sanitizedUsers);

  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
});

// Get all bookings (admin)
app.get('/api/admin/bookings', (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret123');
    const admin = users.find(u => u.id === decoded.id && u.role === 'admin');
    
    if (!admin) {
      return res.status(403).json({ message: 'Admin access required' });
    }

    const bookingsWithUser = bookings.map(b => {
      const user = users.find(u => u.id === b.userId);
      return { 
        ...b, 
        user: user ? { name: user.name, email: user.email, phone: user.phone } : { name: b.name || 'Guest', email: b.email, phone: b.phone } 
      };
    });

    res.json(bookingsWithUser);

  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
});

// Get dashboard stats (admin)
app.get('/api/admin/stats', (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret123');
    const admin = users.find(u => u.id === decoded.id && u.role === 'admin');
    
    if (!admin) {
      return res.status(403).json({ message: 'Admin access required' });
    }

    const totalUsers = users.length;
    const totalBookings = bookings.length;
    const totalRevenue = bookings
      .filter(b => b.status !== 'cancelled')
      .reduce((sum, b) => sum + (b.totalAmount || 0), 0);

    const bookingsByType = {};
    bookings.forEach(b => {
      bookingsByType[b.type] = (bookingsByType[b.type] || 0) + 1;
    });

    res.json({
      totalUsers,
      totalBookings,
      totalRevenue,
      bookingsByType
    });

  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
});

// Update booking status (admin)
app.put('/api/admin/bookings/:id', (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret123');
    const admin = users.find(u => u.id === decoded.id && u.role === 'admin');
    
    if (!admin) {
      return res.status(403).json({ message: 'Admin access required' });
    }

    const bookingIndex = bookings.findIndex(b => b.id == req.params.id);
    if (bookingIndex === -1) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    bookings[bookingIndex].status = req.body.status;
    res.json({ message: 'Booking updated', booking: bookings[bookingIndex] });

  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
});

// Delete user (admin)
app.delete('/api/admin/users/:id', (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret123');
    const admin = users.find(u => u.id === decoded.id && u.role === 'admin');
    
    if (!admin) {
      return res.status(403).json({ message: 'Admin access required' });
    }

    const userIndex = users.findIndex(u => u.id == req.params.id);
    if (userIndex === -1) {
      return res.status(404).json({ message: 'User not found' });
    }

    users.splice(userIndex, 1);
    bookings = bookings.filter(b => b.userId != req.params.id);
    
    res.json({ message: 'User and their bookings deleted' });

  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'Server running',
    database: 'In-Memory (No MongoDB/XAMPP needed)',
    users: users.length,
    bookings: bookings.length,
    timestamp: new Date()
  });
});

// Serve index.html for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Rupiksha Travel Server running on http://localhost:${PORT}`);
  console.log('✅ Database: In-Memory Mode (No MongoDB/XAMPP needed!)');
  console.log(`📊 Users: ${users.length}, Bookings: ${bookings.length}`);
});
