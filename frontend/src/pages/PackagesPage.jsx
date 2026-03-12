import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Search, MapPin, Star, Filter, ArrowRight, Clock, Users } from 'lucide-react';

const DEMO_PACKAGES = [
  { _id: '1', title: 'Golden Triangle Tour', location: 'Delhi-Agra-Jaipur, India', duration: '7 Days', price: 25000, rating: 4.8, reviews: 234, image: 'https://images.unsplash.com/photo-1548013146-72479768bada?w=500&q=80', category: 'Cultural', maxGuests: 15, description: 'Explore the iconic Golden Triangle of India with guided tours to the Taj Mahal, Red Fort, and Amber Palace.' },
  { _id: '2', title: 'Goa Beach Holiday', location: 'Goa, India', duration: '5 Days', price: 15000, rating: 4.9, reviews: 412, image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=500&q=80', category: 'Beach', maxGuests: 10, description: 'Relax on the sun-kissed beaches of Goa with water sports and vibrant nightlife.' },
  { _id: '3', title: 'Kerala Houseboat Stay', location: 'Alleppey, Kerala', duration: '4 Days', price: 12000, rating: 4.95, reviews: 189, image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=500&q=80', category: 'Nature', maxGuests: 4, description: 'Sail through the serene backwaters of Kerala in a traditional luxury houseboat.' },
  { _id: '4', title: 'Ladakh Adventure', location: 'Leh, Ladakh', duration: '9 Days', price: 35000, rating: 4.95, reviews: 112, image: 'https://images.unsplash.com/photo-1544102826-3cefd80d074d?w=500&q=80', category: 'Adventure', maxGuests: 8, description: 'Experience the thrill of high-altitude passes and crystal-clear lakes in the Himalayas.' },
  { _id: '5', title: 'Rishikesh Yoga Retreat', location: 'Rishikesh, Uttarakhand', duration: '7 Days', price: 18000, rating: 4.85, reviews: 298, image: 'https://images.unsplash.com/photo-1545208393-596371BA97ea?w=500&q=80', category: 'Cultural', maxGuests: 12, description: 'Find inner peace with yoga and meditation sessions on the banks of the Holy Ganges.' },
  { _id: '6', title: 'Udaipur Royalty', location: 'Udaipur, Rajasthan', duration: '4 Days', price: 22000, rating: 4.9, reviews: 167, image: 'https://images.unsplash.com/photo-1585128792020-803d29415281?w=500&q=80', category: 'Luxury', maxGuests: 2, description: 'Stay in heritage palaces and enjoy boat rides on Lake Pichola.' },
  { _id: '7', title: 'Shimla-Manali Tour', location: 'Himachal Pradesh', duration: '7 Days', price: 21000, rating: 4.8, reviews: 89, image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=500&q=80', category: 'Adventure', maxGuests: 10, description: 'Explore the scenic hill stations of Himachal with snow-capped peaks and pine forests.' },
  { _id: '8', title: 'Varanasi Spiritual Journey', location: 'Varanasi, UP', duration: '3 Days', price: 8000, rating: 4.7, reviews: 203, image: 'https://images.unsplash.com/photo-1561361058-c24cecae35ca?w=500&q=80', category: 'Historical', maxGuests: 20, description: 'Experience the ancient rituals and spiritual vibes of the world\'s oldest living city.' },
  { _id: '9', title: 'Andaman Island Escape', location: 'Havelock, Andaman', duration: '6 Days', price: 28000, rating: 4.88, reviews: 145, image: 'https://images.unsplash.com/photo-1589136142558-9de693895841?w=500&q=80', category: 'Adventure', maxGuests: 12, description: 'Dive into the turquoise waters and explore the white sand beaches of Andaman.' },
];

const CATEGORIES = ['All', 'Cultural', 'Beach', 'Cruise', 'Wildlife', 'Luxury', 'Adventure', 'Historical'];

export default function PackagesPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [packages, setPackages] = useState(DEMO_PACKAGES);
  const [search, setSearch] = useState(searchParams.get('q') || '');
  const [category, setCategory] = useState('All');
  const [priceRange, setPriceRange] = useState([0, 100000]);
  const [sortBy, setSortBy] = useState('popular');
  const [showFilters, setShowFilters] = useState(false);

  const filtered = packages
    .filter(p => 
      (category === 'All' || p.category === category) &&
      (search === '' || p.title.toLowerCase().includes(search.toLowerCase()) || p.location.toLowerCase().includes(search.toLowerCase())) &&
      p.price >= priceRange[0] && p.price <= priceRange[1]
    )
    .sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return b.reviews - a.reviews; // popular
    });

  return (
    <div className="min-h-screen bg-slate-900 pt-20">
      {/* Header */}
      <div className="relative py-16 overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1488085061387-422e29b40080?w=1200&q=80" alt="" className="w-full h-full object-cover opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/50 to-slate-900" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 text-center">
          <h1 className="font-display text-5xl font-bold text-white mb-4">Travel <span className="gradient-text italic">Packages</span></h1>
          <p className="text-white/60 max-w-xl mx-auto">Handcrafted journeys for every type of traveler</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 pb-20">
        {/* Search & Filter Bar */}
        <div className="glass rounded-2xl p-4 mb-8 flex flex-col md:flex-row gap-3">
          <div className="flex items-center gap-3 flex-1 bg-white/5 rounded-xl px-4 py-2.5">
            <Search size={16} className="text-white/40" />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search packages, destinations..."
              className="bg-transparent text-white placeholder-white/30 outline-none flex-1 text-sm" />
          </div>
          <select value={sortBy} onChange={e => setSortBy(e.target.value)}
            className="bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white/70 outline-none text-sm">
            <option value="popular" className="bg-slate-900">Most Popular</option>
            <option value="rating" className="bg-slate-900">Highest Rated</option>
            <option value="price-asc" className="bg-slate-900">Price: Low to High</option>
            <option value="price-desc" className="bg-slate-900">Price: High to Low</option>
          </select>
          <button onClick={() => setShowFilters(!showFilters)} className="flex items-center gap-2 glass px-4 py-2.5 rounded-xl text-white/70 hover:text-white transition text-sm">
            <Filter size={15} /> Filters
          </button>
        </div>

        {/* Category Pills */}
        <div className="flex gap-2 flex-wrap mb-8">
          {CATEGORIES.map(cat => (
            <button key={cat} onClick={() => setCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                category === cat ? 'coral-gradient text-white shadow-lg' : 'glass text-white/60 hover:text-white'
              }`}>{cat}</button>
          ))}
        </div>

        {/* Price Range Filter */}
        {showFilters && (
          <div className="glass rounded-2xl p-6 mb-8">
            <h3 className="text-white font-semibold mb-4">Price Range: <span className="text-coral-400">₹{priceRange[0]} – ₹{priceRange[1]}</span></h3>
            <input type="range" min="0" max="100000" step="500" value={priceRange[1]}
              onChange={e => setPriceRange([priceRange[0], Number(e.target.value)])}
              className="w-full accent-coral-500" />
          </div>
        )}

        {/* Results count */}
        <p className="text-white/40 text-sm mb-6">{filtered.length} packages found</p>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(pkg => (
            <div key={pkg._id} onClick={() => navigate(`/packages/${pkg._id}`)}
              className="glass rounded-3xl overflow-hidden card-hover cursor-pointer group">
              <div className="relative h-52 overflow-hidden">
                <img src={pkg.image} alt={pkg.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <span className="absolute top-3 left-3 glass text-white text-xs font-semibold px-3 py-1 rounded-full">{pkg.category}</span>
                <div className="absolute bottom-3 right-3 glass rounded-xl px-3 py-1.5 text-right">
                  <div className="text-xs text-white/60">from</div>
                  <div className="text-coral-400 font-bold">₹{pkg.price}</div>
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-display text-white font-bold text-xl mb-1">{pkg.title}</h3>
                <p className="text-white/50 text-sm flex items-center gap-1 mb-3"><MapPin size={12} />{pkg.location}</p>
                <p className="text-white/40 text-xs leading-relaxed mb-4 line-clamp-2">{pkg.description}</p>
                <div className="flex items-center justify-between pt-3 border-t border-white/5">
                  <div className="flex items-center gap-3 text-xs text-white/50">
                    <span className="flex items-center gap-1"><Clock size={11} />{pkg.duration}</span>
                    <span className="flex items-center gap-1"><Users size={11} />Max {pkg.maxGuests}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star size={12} className="text-yellow-400 fill-yellow-400" />
                    <span className="text-white text-sm font-semibold">{pkg.rating}</span>
                    <span className="text-white/40 text-xs">({pkg.reviews})</span>
                  </div>
                </div>
                <button className="mt-3 w-full btn-primary py-2.5 text-sm flex items-center justify-center gap-2">
                  View Package <ArrowRight size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <div className="text-5xl mb-4">🏝️</div>
            <h3 className="text-white/60 text-xl font-medium mb-2">No packages found</h3>
            <p className="text-white/30 text-sm">Try adjusting your filters or search query</p>
          </div>
        )}
      </div>
    </div>
  );
}
