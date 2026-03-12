const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    type: {
        type: String,
        enum: ['hotel', 'flight', 'train', 'cab'],
        required: true
    },
    // Common fields
    from: { type: String, default: '' },
    to: { type: String, default: '' },
    date: { type: Date, required: true },
    returnDate: { type: Date },
    passengers: { type: Number, default: 1 },

    // Hotel specific
    hotelName: { type: String, default: '' },
    roomType: { type: String, default: '' },
    checkIn: { type: Date },
    checkOut: { type: Date },
    guests: { type: Number, default: 1 },

    // Flight specific
    airline: { type: String, default: '' },
    flightClass: { type: String, default: 'economy' },

    // Train specific
    trainName: { type: String, default: '' },
    trainClass: { type: String, default: 'sleeper' },

    // Cab specific
    cabType: { type: String, default: 'sedan' },
    pickupAddress: { type: String, default: '' },
    dropAddress: { type: String, default: '' },

    // Booking details
    totalAmount: { type: Number, required: true },
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'cancelled', 'completed'],
        default: 'confirmed'
    },
    bookingId: {
        type: String,
        unique: true
    },
    paymentMethod: {
        type: String,
        default: 'online'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Generate booking ID before saving
bookingSchema.pre('save', function (next) {
    if (!this.bookingId) {
        const prefix = this.type === 'hotel' ? 'HTL' : this.type === 'flight' ? 'FLT' : this.type === 'train' ? 'TRN' : 'CAB';
        this.bookingId = `${prefix}-${Date.now()}-${Math.random().toString(36).substr(2, 5).toUpperCase()}`;
    }
    next();
});

module.exports = mongoose.model('Booking', bookingSchema);
