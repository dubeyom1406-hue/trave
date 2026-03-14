import { useParams, useNavigate } from 'react-router-dom';
import { MapPin, Clock, Users, Star, Check, ArrowLeft, Calendar, Shield } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const PACKAGES = {
  '1': { _id: '1', title: 'Golden Triangle Tour', location: 'Delhi-Agra-Jaipur, India', duration: '7 Days', price: 25000, rating: 4.8, reviews: 234, image: 'https://images.unsplash.com/photo-1548013146-72479768bada?w=900&q=80', category: 'Cultural', maxGuests: 15, description: 'Explore the iconic Golden Triangle of India with expert-guided tours to the Taj Mahal, Agra Fort, Red Fort in Delhi, and the magnificent Amber Palace in Jaipur. This carefully curated journey takes you through centuries of history, vibrant markets, and authentic cuisine.', highlights: ['Taj Mahal sunrise visit', 'Agra Fort exploration', 'Jaipur Pink City tour', 'Rickshaw ride in Old Delhi', 'Rajasthani cultural evening', 'Cooking class with local chef'], included: ['Accommodation (4-star hotels)', 'Daily breakfast & dinner', 'Air-conditioned transport', 'Professional guide', 'Monument entrance fees', 'Airport transfers'], itinerary: [{ day: 1, title: 'Arrival in Delhi', desc: 'Arrive at Delhi airport, transfer to hotel. Evening welcome dinner.' }, { day: 2, title: 'Delhi Sightseeing', desc: 'Red Fort, Jama Masjid, Chandni Chowk rickshaw ride, Qutub Minar.' }, { day: 3, title: 'Delhi to Agra', desc: 'Drive to Agra. Agra Fort, Mehtab Bagh sunset view of Taj.' }, { day: 4, title: 'Taj Mahal', desc: 'Sunrise visit to Taj Mahal. Drive to Jaipur via Fatehpur Sikri.' }, { day: 5, title: 'Jaipur – Pink City', desc: 'Amber Fort, City Palace, Jantar Mantar, Hawa Mahal.' }, { day: 6, title: 'Jaipur Markets', desc: 'Shopping at local bazaars, textile factory visit, cultural dinner.' }, { day: 7, title: 'Departure', desc: 'Transfer to Delhi airport for departure.' }] }
};

export default function PackageDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, openAuth } = useAuth();
  const pkg = PACKAGES[id] || PACKAGES['1'];

  const handleBook = () => {
    if (!user) {
      openAuth('login');
      return;
    }
    navigate(`/booking/package/${pkg._id}`);
  };

  return (
    <div className="min-h-screen bg-slate-900 pt-16">
      {/* Hero */}
      <div className="relative h-[50vh] overflow-hidden">
        <img src={pkg.image} alt={pkg.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-slate-900" />
        <button onClick={() => navigate(-1)} className="absolute top-6 left-6 glass text-white p-2.5 rounded-xl hover:bg-white/20 transition flex items-center gap-2 text-sm">
          <ArrowLeft size={16} /> Back
        </button>
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="max-w-7xl mx-auto">
            <span className="coral-gradient text-white text-xs font-semibold px-3 py-1 rounded-full">{pkg.category}</span>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-white mt-3 mb-2">{pkg.title}</h1>
            <div className="flex flex-wrap items-center gap-4 text-white/70 text-sm">
              <span className="flex items-center gap-1"><MapPin size={14} />{pkg.location}</span>
              <span className="flex items-center gap-1"><Clock size={14} />{pkg.duration}</span>
              <span className="flex items-center gap-1"><Users size={14} />Max {pkg.maxGuests} people</span>
              <span className="flex items-center gap-1"><Star size={14} className="text-yellow-400 fill-yellow-400" />{pkg.rating} ({pkg.reviews} reviews)</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-8">
            <div className="glass rounded-2xl p-6">
              <h2 className="font-display text-2xl text-white font-bold mb-4">About this Package</h2>
              <p className="text-white/60 leading-relaxed">{pkg.description}</p>
            </div>

            <div className="glass rounded-2xl p-6">
              <h2 className="font-display text-2xl text-white font-bold mb-4">Highlights</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {pkg.highlights?.map((h, i) => (
                  <div key={i} className="flex items-center gap-3 text-white/70 text-sm">
                    <div className="w-5 h-5 coral-gradient rounded-full flex items-center justify-center flex-shrink-0">
                      <Check size={11} className="text-white" />
                    </div>
                    {h}
                  </div>
                ))}
              </div>
            </div>

            <div className="glass rounded-2xl p-6">
              <h2 className="font-display text-2xl text-white font-bold mb-6">Day-by-Day Itinerary</h2>
              <div className="space-y-4">
                {pkg.itinerary?.map(({ day, title, desc }) => (
                  <div key={day} className="flex gap-4">
                    <div className="flex-shrink-0 w-10 h-10 coral-gradient rounded-xl flex items-center justify-center text-white text-sm font-bold">{day}</div>
                    <div className="flex-1 pb-4 border-b border-white/5">
                      <h4 className="text-white font-semibold mb-1">Day {day}: {title}</h4>
                      <p className="text-white/50 text-sm">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass rounded-2xl p-6">
              <h2 className="font-display text-2xl text-white font-bold mb-4">What's Included</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {pkg.included?.map((item, i) => (
                  <div key={i} className="flex items-center gap-3 text-white/70 text-sm">
                    <Check size={14} className="text-ocean-400 flex-shrink-0" /> {item}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Booking Card */}
          <div className="lg:col-span-1">
            <div className="glass rounded-2xl p-6 sticky top-24">
              <div className="text-center mb-6">
                <div className="text-white/40 text-sm">Price per person</div>
                <div className="font-display text-4xl font-bold text-coral-400 mt-1">₹{pkg.price}</div>
              </div>
              <div className="space-y-3 mb-6">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-white/50 flex items-center gap-1.5"><Clock size={14} /> Duration</span>
                  <span className="text-white font-medium">{pkg.duration}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-white/50 flex items-center gap-1.5"><Users size={14} /> Group size</span>
                  <span className="text-white font-medium">Up to {pkg.maxGuests}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-white/50 flex items-center gap-1.5"><Star size={14} /> Rating</span>
                  <span className="text-white font-medium">{pkg.rating} ⭐</span>
                </div>
              </div>
               <button onClick={handleBook} className="btn-primary w-full py-3.5 text-center flex items-center justify-center gap-2">
                 <Calendar size={16} /> Book Now
               </button>
              <div className="mt-4 flex items-center justify-center gap-2 text-white/40 text-xs">
                <Shield size={12} /> Free cancellation within 48 hours
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
