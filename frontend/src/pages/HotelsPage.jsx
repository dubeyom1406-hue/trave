import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, Star, Wifi, Coffee, Car, Waves, ArrowRight } from 'lucide-react';

const DEMO_HOTELS = [
  { _id: 'h1', name: 'Taj Lake Palace', location: 'Udaipur, Rajasthan', price: 45000, rating: 4.9, reviews: 1245, image: 'https://images.unsplash.com/photo-1585128792020-803d29415281?w=500&q=80', amenities: ['wifi', 'pool', 'parking', 'breakfast'], category: 'Luxury', description: 'Experience royal living in the middle of Lake Pichola.' },
  { _id: 'h2', name: 'Goa Marriott Resort', location: 'Panaji, Goa', price: 12500, rating: 4.8, reviews: 892, image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=500&q=80', amenities: ['wifi', 'pool', 'breakfast'], category: 'Resort', description: 'Luxury beachfront resort with views of the Arabian Sea.' },
  { _id: 'h3', name: 'The Oberoi Amarvilas', location: 'Agra, UP', price: 35000, rating: 4.9, reviews: 634, image: 'https://images.unsplash.com/photo-1548013146-72479768bada?w=500&q=80', amenities: ['wifi', 'pool', 'parking'], category: 'Luxury', description: 'Just 600 meters from the Taj Mahal, offering breathtaking views.' },
  { _id: 'h4', name: 'Wildflower Hall', location: 'Shimla, Himachal', price: 28000, rating: 4.95, reviews: 312, image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=500&q=80', amenities: ['wifi', 'pool', 'breakfast'], category: 'Boutique', description: 'Nestled among cedar forests with views of the Himalayas.' },
  { _id: 'h5', name: 'The Leela Palace', location: 'New Delhi', price: 22000, rating: 4.9, reviews: 203, image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=500&q=80', amenities: ['wifi', 'breakfast', 'parking'], category: 'Luxury', description: 'Modern luxury meets traditional Indian hospitality in Chanakyapuri.' },
  { _id: 'h6', name: 'Kumarakom Lake Resort', location: 'Kerala', price: 18000, rating: 4.95, reviews: 178, image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=500&q=80', amenities: ['wifi', 'pool', 'breakfast'], category: 'Resort', description: 'Traditional luxury rooms set on the banks of Lake Vembanad.' },
];

const AMENITY_ICONS = { wifi: <Wifi size={12} />, pool: <Waves size={12} />, parking: <Car size={12} />, breakfast: <Coffee size={12} /> };

export default function HotelsPage() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [maxPrice, setMaxPrice] = useState(50000);

  const filtered = DEMO_HOTELS.filter(h =>
    (category === 'All' || h.category === category) &&
    h.price <= maxPrice &&
    (search === '' || h.name.toLowerCase().includes(search.toLowerCase()) || h.location.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-slate-900 pt-20">
      <div className="relative py-16 overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=1200&q=80" alt="" className="w-full h-full object-cover opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/50 to-slate-900" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 text-center">
          <h1 className="font-display text-5xl font-bold text-white mb-4">Find Your Perfect <span className="gradient-text italic">Hotel</span></h1>
          <p className="text-white/60 max-w-xl mx-auto">Handpicked stays from budget-friendly to ultra-luxury</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 pb-20">
        <div className="glass rounded-2xl p-4 mb-8 flex flex-col md:flex-row gap-3">
          <div className="flex items-center gap-3 flex-1 bg-white/5 rounded-xl px-4 py-2.5">
            <Search size={16} className="text-white/40" />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search hotels or cities..."
              className="bg-transparent text-white placeholder-white/30 outline-none flex-1 text-sm" />
          </div>
          <div className="flex items-center gap-3 bg-white/5 rounded-xl px-4 py-2.5 min-w-[200px]">
            <span className="text-white/40 text-sm">Max: <span className="text-coral-400">₹{maxPrice}/night</span></span>
            <input type="range" min="1000" max="100000" step="1000" value={maxPrice} onChange={e => setMaxPrice(Number(e.target.value))}
              className="flex-1 accent-coral-500" />
          </div>
        </div>

        <div className="flex gap-2 flex-wrap mb-8">
          {['All', 'Luxury', 'Resort', 'Business', 'Boutique', 'Safari'].map(cat => (
            <button key={cat} onClick={() => setCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                category === cat ? 'coral-gradient text-white shadow-lg' : 'glass text-white/60 hover:text-white'
              }`}>{cat}</button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(hotel => (
            <div key={hotel._id} onClick={() => navigate(`/hotels/${hotel._id}`)}
              className="glass rounded-3xl overflow-hidden card-hover cursor-pointer group">
              <div className="relative h-52 overflow-hidden">
                <img src={hotel.image} alt={hotel.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <span className="absolute top-3 left-3 glass text-white text-xs font-semibold px-3 py-1 rounded-full">{hotel.category}</span>
                <div className="absolute bottom-3 right-3 glass rounded-xl px-3 py-1.5 text-right">
                  <div className="text-coral-400 font-bold text-lg">₹{hotel.price}</div>
                  <div className="text-white/50 text-xs">/night</div>
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-display text-white font-bold text-xl mb-1">{hotel.name}</h3>
                <p className="text-white/50 text-sm flex items-center gap-1 mb-2"><MapPin size={12} />{hotel.location}</p>
                <p className="text-white/40 text-xs mb-4 line-clamp-2">{hotel.description}</p>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {hotel.amenities.map(a => (
                    <span key={a} className="flex items-center gap-1 glass rounded-lg px-2 py-1 text-white/50 text-xs">
                      {AMENITY_ICONS[a]} {a}
                    </span>
                  ))}
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-white/5">
                  <div className="flex items-center gap-1">
                    <Star size={13} className="text-yellow-400 fill-yellow-400" />
                    <span className="text-white text-sm font-semibold">{hotel.rating}</span>
                    <span className="text-white/40 text-xs">({hotel.reviews})</span>
                  </div>
                  <span className="text-coral-400 text-sm font-medium flex items-center gap-1">Book now <ArrowRight size={14} /></span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
