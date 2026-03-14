import { useState } from 'react';
import { MapPin, Search, Star, ArrowRight, Camera, Compass, Map as MapIcon, Heart } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const DESTINATIONS = [
  { id: 1, name: 'Goa', state: 'Goa', tag: 'Beach Paradise', image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800&q=80', description: 'Sun-kissed beaches, vibrant nightlife, and Portuguese heritage.', packages: 24, rating: 4.8 },
  { id: 2, name: 'Jaipur', state: 'Rajasthan', tag: 'Royal Heritage', image: 'https://images.unsplash.com/photo-1477587458883-47145ed94245?w=800&q=80', description: 'The Pink City known for its magnificent palaces and forts.', packages: 18, rating: 4.9 },
  { id: 3, name: 'Manali', state: 'Himachal', tag: 'Mountain Magic', image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=800&q=80', description: 'Snow-capped peaks and adventure sports in the Himalayas.', packages: 32, rating: 4.7 },
  { id: 4, name: 'Varanasi', state: 'UP', tag: 'Spiritual Soul', image: 'https://images.unsplash.com/photo-1561361058-c24cecae35ca?w=800&q=80', description: 'One of the oldest living cities in the world on the banks of Ganga.', packages: 12, rating: 4.9 },
  { id: 5, name: 'Alleppey', state: 'Kerala', tag: 'Backwater Bliss', image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=800&q=80', description: 'Venice of the East, famous for its serene houseboat cruises.', packages: 15, rating: 4.8 },
  { id: 6, name: 'Leh Ladakh', state: 'Ladakh', tag: 'Cold Desert', image: 'https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?w=800&q=80', description: 'High-altitude desert with stunning lakes and monasteries.', packages: 10, rating: 5.0 },
  { id: 7, name: 'Agra', state: 'UP', tag: 'Symbol of Love', image: 'https://images.unsplash.com/photo-1564507592333-c60657451dd7?w=800&q=80', description: 'Home to the Taj Mahal, a masterpiece of Mughal architecture.', packages: 20, rating: 4.9 },
  { id: 8, name: 'Rishikesh', state: 'Uttarakhand', tag: 'Yoga Capital', image: 'https://images.unsplash.com/photo-1545105511-94943f72674e?w=800&q=80', description: 'Adventure and spirituality meet on the banks of the Ganges.', packages: 28, rating: 4.6 },
];

export default function DestinationsPage() {
  const { user, openAuth } = useAuth();
  const [search, setSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');

  const handleExplore = () => {
    if (!user) {
      openAuth('login');
      return;
    }
    window.location.href = '/packages';
  };

  const filtered = DESTINATIONS.filter(d => 
    (d.name.toLowerCase().includes(search.toLowerCase()) || d.state.toLowerCase().includes(search.toLowerCase())) &&
    (activeFilter === 'All' || d.tag.includes(activeFilter))
  );

  return (
    <div className="min-h-screen bg-slate-950 pt-20">
      {/* Hero Section */}
      <div className="relative py-24 overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1506461883276-594a12b11cf3?w=1200&q=80" alt="" className="w-full h-full object-cover opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/50 via-slate-950/80 to-slate-950" />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-6 text-sm text-coral-400 font-bold uppercase tracking-widest">
            <Compass size={16} /> Discover Incredible India
          </div>
          <h1 className="font-display text-5xl md:text-7xl font-bold text-white mb-8">Where to <span className="gradient-text italic">Next?</span></h1>
          <p className="text-white/40 max-w-2xl mx-auto text-lg leading-relaxed">Explore our handpicked selection of India's most breathtaking destinations across different landscapes and cultures.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 pb-24">
        {/* Search & Filters */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-16">
          <div className="glass-dark rounded-2xl p-2 flex items-center gap-3 w-full md:w-96 border border-white/10">
            <div className="w-10 h-10 coral-gradient rounded-xl flex items-center justify-center text-white">
              <Search size={18} />
            </div>
            <input 
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search by city or state..."
              className="bg-transparent text-white outline-none flex-1 text-sm placeholder:text-white/20"
            />
          </div>

          <div className="flex gap-2 overflow-x-auto pb-2 w-full md:w-auto scrollbar-hide">
            {['All', 'Beach', 'Heritage', 'Mountain', 'Spiritual'].map(filter => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`whitespace-nowrap px-6 py-2.5 rounded-2xl text-xs font-bold transition-all ${
                  activeFilter === filter ? 'coral-gradient text-white shadow-lg' : 'glass text-white/40 hover:text-white'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* Destination Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {filtered.map(dest => (
            <div key={dest.id} className="group relative rounded-[2.5rem] overflow-hidden card-hover aspect-[3/4]">
              <img 
                src={dest.image} 
                alt={dest.name} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
              
              {/* Overlay Content */}
              <div className="absolute inset-0 p-8 flex flex-col justify-end">
                <div className="flex items-center justify-between mb-2">
                  <span className="glass text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">
                    {dest.tag}
                  </span>
                  <button className="glass w-8 h-8 rounded-full flex items-center justify-center text-white/60 hover:text-coral-400 transition-colors">
                    <Heart size={14} />
                  </button>
                </div>
                
                <h3 className="text-white text-3xl font-bold mb-1">{dest.name}</h3>
                <p className="text-white/40 text-xs flex items-center gap-1 mb-4">
                  <MapPin size={12} className="text-coral-400" /> {dest.state}
                </p>
                
                <p className="text-white/60 text-sm mb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-4 group-hover:translate-y-0 line-clamp-2">
                  {dest.description}
                </p>
                
                <div className="flex items-center justify-between pt-4 border-t border-white/10">
                  <div className="text-white font-bold text-xs uppercase tracking-tighter">
                    <span className="text-coral-400">{dest.packages}</span> Packages
                  </div>
                  <div className="flex items-center gap-1 text-xs">
                    <Star size={12} className="text-yellow-400 fill-yellow-400" />
                    <span className="text-white font-bold">{dest.rating}</span>
                  </div>
                </div>
                
                <button onClick={handleExplore} className="mt-6 w-full btn-primary py-3 rounded-2xl text-xs flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0">
                  Explore Now <ArrowRight size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Stats/Features */}
        <div className="mt-32 grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: <Camera />, title: 'Sightseeing', desc: 'Pre-planned routes to capture the best of every location.' },
            { icon: <MapIcon />, title: 'Local Guides', desc: 'Expert guides who know the hidden gems of India.' },
            { icon: <Compass />, title: 'Custom Trips', desc: 'Personalize your itinerary to fit your travel style.' },
          ].map((item, i) => (
            <div key={i} className="glass p-10 rounded-[3rem] border border-white/5 relative overflow-hidden group">
              <div className="absolute right-0 top-0 w-32 h-32 bg-coral-500/5 rounded-full blur-3xl group-hover:bg-coral-500/10 transition-all"></div>
              <div className="w-14 h-14 coral-gradient rounded-2xl flex items-center justify-center text-white mb-8 shadow-lg shadow-coral-500/20">
                {item.icon}
              </div>
              <h3 className="text-white font-bold text-xl mb-3">{item.title}</h3>
              <p className="text-white/40 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
