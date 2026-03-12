import { useParams, useNavigate } from 'react-router-dom';
import { MapPin, Star, Wifi, Coffee, Car, Waves, ArrowLeft, Calendar, Shield, Check } from 'lucide-react';

const HOTELS = {
  'h1': { _id: 'h1', name: 'Taj Lake Palace', location: 'Udaipur, Rajasthan', price: 45000, rating: 4.9, reviews: 1245, image: 'https://images.unsplash.com/photo-1585128792020-803d29415281?w=900&q=80', amenities: ['wifi', 'pool', 'parking', 'breakfast'], category: 'Luxury', description: 'Experience royal living in the middle of Lake Pichola. A 5-star heritage hotel offering unrivaled luxury with marble interiors and panoramic views.', rooms: [{ type: 'Deluxe Room', price: 45000, features: ['Lake view', 'King bed', '40m²'] }, { type: 'Junior Suite', price: 65000, features: ['Palace view', 'Living area', '65m²'] }, { type: 'Grand Royal Suite', price: 125000, features: 'Lake view, Private butler, 150m²'.split(', ') }] },
};

export default function HotelDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const hotel = HOTELS[id] || HOTELS['h1'];

  return (
    <div className="min-h-screen bg-slate-900 pt-16">
      <div className="relative h-[50vh] overflow-hidden">
        <img src={hotel.image} alt={hotel.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-slate-900" />
        <button onClick={() => navigate(-1)} className="absolute top-6 left-6 glass text-white p-2.5 rounded-xl hover:bg-white/20 transition flex items-center gap-2 text-sm">
          <ArrowLeft size={16} /> Back
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div>
              <span className="coral-gradient text-white text-xs font-semibold px-3 py-1 rounded-full">{hotel.category}</span>
              <h1 className="font-display text-4xl font-bold text-white mt-3 mb-2">{hotel.name}</h1>
              <div className="flex flex-wrap items-center gap-4 text-white/70 text-sm">
                <span className="flex items-center gap-1"><MapPin size={14} />{hotel.location}</span>
                <span className="flex items-center gap-1"><Star size={14} className="text-yellow-400 fill-yellow-400" />{hotel.rating} ({hotel.reviews} reviews)</span>
              </div>
            </div>

            <div className="glass rounded-2xl p-6">
              <h2 className="font-display text-2xl text-white font-bold mb-4">About</h2>
              <p className="text-white/60 leading-relaxed">{hotel.description}</p>
            </div>

            <div className="glass rounded-2xl p-6">
              <h2 className="font-display text-2xl text-white font-bold mb-4">Amenities</h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                  { key: 'wifi', icon: <Wifi size={20} />, label: 'Free WiFi' },
                  { key: 'pool', icon: <Waves size={20} />, label: 'Swimming Pool' },
                  { key: 'parking', icon: <Car size={20} />, label: 'Free Parking' },
                  { key: 'breakfast', icon: <Coffee size={20} />, label: 'Breakfast' },
                ].filter(a => hotel.amenities?.includes(a.key)).map(({ icon, label }) => (
                  <div key={label} className="bg-white/5 rounded-xl p-4 text-center">
                    <div className="text-coral-400 flex justify-center mb-2">{icon}</div>
                    <div className="text-white/60 text-sm">{label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass rounded-2xl p-6">
              <h2 className="font-display text-2xl text-white font-bold mb-4">Room Types</h2>
              <div className="space-y-3">
                {hotel.rooms?.map(room => (
                  <div key={room.type} className="bg-white/5 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <h4 className="text-white font-semibold">{room.type}</h4>
                      <div className="flex gap-3 mt-1">
                        {room.features.map(f => (
                          <span key={f} className="flex items-center gap-1 text-white/40 text-xs">
                            <Check size={10} className="text-ocean-400" /> {f}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-coral-400 font-bold text-xl">₹{room.price}</div>
                      <div className="text-white/40 text-xs">/night</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="glass rounded-2xl p-6 sticky top-24">
              <div className="text-center mb-6">
                <div className="text-white/40 text-sm">Starting from</div>
                <div className="font-display text-4xl font-bold text-coral-400 mt-1">₹{hotel.price}<span className="text-lg text-white/40">/night</span></div>
              </div>
              <button onClick={() => navigate(`/booking/hotel/${hotel._id}`)} className="btn-primary w-full py-3.5 text-center flex items-center justify-center gap-2">
                <Calendar size={16} /> Book This Hotel
              </button>
              <div className="mt-4 flex items-center justify-center gap-2 text-white/40 text-xs">
                <Shield size={12} /> Free cancellation · Best price guarantee
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
