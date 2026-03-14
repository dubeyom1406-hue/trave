import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, Calendar, Users, Star, ArrowRight, Play, ChevronDown, Plane, Hotel, Compass, Train, Truck } from 'lucide-react';

const DESTINATIONS = [
  { name: 'Goa, India', image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=500&q=80', price: '₹12,499', tag: 'Beach' },
  { name: 'Manali, Himachal', image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=500&q=80', price: '₹15,999', tag: 'Adventure' },
  { name: 'Udaipur, Rajasthan', image: 'https://images.unsplash.com/photo-1585128792020-803d29415281?w=500&q=80', price: '₹18,500', tag: 'Romantic' },
  { name: 'Munnar, Kerala', image: 'https://images.unsplash.com/photo-1533035350221-afc0360a0f4a?w=500&q=80', price: '₹22,999', tag: 'Nature' },
  { name: 'Leh, Ladakh', image: 'https://images.unsplash.com/photo-1544102826-3cefd80d074d?w=500&q=80', price: '₹34,500', tag: 'Adventure' },
  { name: 'Varanasi, UP', image: 'https://images.unsplash.com/photo-1561361058-c24cecae35ca?w=500&q=80', price: '₹8,999', tag: 'Cultural' },
];

const PACKAGES = [
  { title: 'Royal Rajasthan', location: 'Rajasthan', duration: '8 Days', price: 45000, rating: 4.9, reviews: 342, image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?w=500&q=80', category: 'Cultural' },
  { title: 'Kerala Backwaters', location: 'Kerala', duration: '6 Days', price: 32000, rating: 4.8, reviews: 215, image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=500&q=80', category: 'Nature' },
  { title: 'Goa Party Trail', location: 'Goa', duration: '5 Days', price: 18000, rating: 4.7, reviews: 567, image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=500&q=80', category: 'Beach' },
];

const TESTIMONIALS = [
  { name: 'Amit Verma', location: 'Delhi, India', text: 'WanderLust made our honeymoon in Udaipur absolutely magical! Every detail was perfect.', avatar: 'https://randomuser.me/api/portraits/men/44.jpg', rating: 5 },
  { name: 'Sneha Gupta', location: 'Bangalore, India', text: 'The AI trip planner suggested an itinerary for Manali I would never have thought of. Best vacation!', avatar: 'https://randomuser.me/api/portraits/women/32.jpg', rating: 5 },
  { name: 'Priya Sharma', location: 'Mumbai, India', text: 'Seamless booking for our family trip to Kerala. WanderLust is my go-to travel platform.', avatar: 'https://randomuser.me/api/portraits/women/65.jpg', rating: 5 },
];

const STATS = [
  { value: '2M+', label: 'Happy Travelers' },
  { value: '150+', label: 'Countries' },
  { value: '50K+', label: 'Hotels' },
  { value: '4.9', label: 'Avg Rating' },
];

export default function HomePage() {
  const navigate = useNavigate();
  const [searchType, setSearchType] = useState('packages');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchDate, setSearchDate] = useState('');
  const [searchGuests, setSearchGuests] = useState('1');
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const heroRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial(p => (p + 1) % TESTIMONIALS.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleSearch = () => {
    const path = searchType === 'hotels' ? '/hotels' : '/packages';
    navigate(`${path}?q=${searchQuery}&date=${searchDate}&guests=${searchGuests}`);
  };

  return (
    <div className="bg-slate-900">
      {/* ─── HERO ─────────────────────────────────────────────── */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* BG */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1920&q=80"
            alt="hero"
            className="w-full h-full object-cover animate-zoom"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-900/60 to-slate-900" />
        </div>

        {/* Floating orbs */}
        <div className="absolute top-1/4 left-10 w-64 h-64 bg-coral-500/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-ocean-400/15 rounded-full blur-3xl animate-float" style={{animationDelay:'3s'}} />

        <div className="relative z-10 max-w-5xl mx-auto px-4 text-center pt-20">
          <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-6 text-sm text-white/70">
            <Plane size={14} className="text-coral-400" />
            Over 2 million happy travelers worldwide
          </div>

          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-tight">
            Explore the World<br />
            <span className="gradient-text italic">Without Limits</span>
          </h1>

          <p className="text-white/60 text-lg md:text-xl max-w-2xl mx-auto mb-10">
            Discover breathtaking destinations, book curated travel packages, and create unforgettable memories with WanderLust.
          </p>

          {/* Scroll hint */}
          <div className="mt-16 flex flex-col items-center gap-2 text-white/30 text-xs animate-bounce">
            <ChevronDown size={20} />
            <span>Scroll to explore</span>
          </div>
        </div>

        {/* Fixed Search Box at Bottom */}
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 w-full max-w-4xl px-4 z-[100]">
          <div className="glass-dark rounded-3xl p-2 shadow-[0_0_50px_rgba(0,0,0,0.5)] border border-white/10">
            {/* Tabs */}
            <div className="flex gap-1 p-1 mb-2">
              {[
                { id: 'packages', icon: Compass, label: 'Packages' },
                { id: 'hotels', icon: Hotel, label: 'Hotels' },
              ].map(({ id, icon: Icon, label }) => (
                <button
                  key={id}
                  onClick={() => setSearchType(id)}
                  className={`flex items-center gap-2 flex-1 py-2.5 rounded-2xl text-sm font-medium transition-all ${
                    searchType === id ? 'coral-gradient text-white shadow-lg' : 'text-white/50 hover:text-white'
                  }`}
                >
                  <Icon size={15} /> {label}
                </button>
              ))}
            </div>

            {/* Inputs */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
              <div className="md:col-span-2 flex items-center gap-3 bg-white/5 rounded-2xl px-4 py-3">
                <MapPin size={18} className="text-coral-400 flex-shrink-0" />
                <input
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="Where do you want to go?"
                  className="bg-transparent text-white placeholder-white/30 outline-none w-full text-sm"
                  onKeyDown={e => e.key === 'Enter' && handleSearch()}
                />
              </div>
              <div className="flex items-center gap-3 bg-white/5 rounded-2xl px-4 py-3">
                <Calendar size={18} className="text-coral-400 flex-shrink-0" />
                <input
                  type="date"
                  value={searchDate}
                  onChange={e => setSearchDate(e.target.value)}
                  className="bg-transparent text-white/60 outline-none w-full text-sm color-scheme-dark"
                />
              </div>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-3 bg-white/5 rounded-2xl px-4 py-3 flex-1">
                  <Users size={18} className="text-coral-400 flex-shrink-0" />
                  <select
                    value={searchGuests}
                    onChange={e => setSearchGuests(e.target.value)}
                    className="bg-transparent text-white/60 outline-none w-full text-sm"
                  >
                    {[1,2,3,4,5,6,7,8].map(n => <option key={n} value={n} className="bg-slate-900">{n} Guest{n>1?'s':''}</option>)}
                  </select>
                </div>
                <button onClick={handleSearch} className="btn-primary p-3.5 rounded-2xl flex-shrink-0">
                  <Search size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── STATS ─────────────────────────────────────────────── */}
      <section className="py-16 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {STATS.map(({ value, label }) => (
              <div key={label} className="glass rounded-2xl p-6 text-center card-hover">
                <div className="font-display text-3xl md:text-4xl font-bold gradient-text mb-1">{value}</div>
                <div className="text-white/50 text-sm">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── POPULAR DESTINATIONS ───────────────────────────────── */}
      <section className="py-20 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <p className="text-coral-400 text-sm font-medium tracking-widest uppercase mb-3">Explore</p>
              <h2 className="section-title">Popular <span className="gradient-text italic">Destinations</span></h2>
            </div>
            <button onClick={() => navigate('/packages')} className="flex items-center gap-2 text-coral-400 hover:gap-3 transition-all text-sm font-medium">
              View all destinations <ArrowRight size={16} />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {DESTINATIONS.map((dest, i) => (
              <div
                key={dest.name}
                onClick={() => navigate(`/packages?q=${dest.name.split(',')[0]}`)}
                className={`relative overflow-hidden rounded-[2rem] cursor-pointer shadow-xl transition-all duration-500 hover:-translate-y-2 group h-72 border border-white/5`}
              >
                <img 
                  src={dest.image} 
                  alt={dest.name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />
                
                <div className="absolute top-4 right-4 z-10">
                  <span className="coral-gradient text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest shadow-lg">
                    {dest.tag}
                  </span>
                </div>

                <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between z-10">
                  <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                    <p className="font-display text-white text-2xl font-bold mb-1">{dest.name}</p>
                    <p className="text-white/60 text-xs flex items-center gap-1.5 tracking-wider uppercase font-medium">
                      <MapPin size={12} className="text-coral-400" /> Explore Destination
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-[10px] text-white/40 uppercase font-bold tracking-tighter">Starting from</div>
                    <div className="text-coral-400 font-bold text-2xl leading-none">{dest.price}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── PACKAGES ─────────────────────────────────────────────── */}
      <section className="py-20" style={{background:'linear-gradient(180deg, #0f1629 0%, #0a0f1e 100%)'}}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-coral-400 text-sm font-medium tracking-widest uppercase mb-3">Curated For You</p>
            <h2 className="section-title">Trending <span className="gradient-text italic">Packages</span></h2>
            <p className="text-white/50 mt-4 max-w-xl mx-auto">Hand-crafted travel experiences designed to create lasting memories</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PACKAGES.map(pkg => (
              <div key={pkg.title} onClick={() => navigate('/packages')} className="glass rounded-3xl overflow-hidden card-hover cursor-pointer group">
                <div className="relative h-52 overflow-hidden">
                  <img src={pkg.image} alt={pkg.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
                  <span className="absolute top-3 left-3 glass text-white text-xs font-semibold px-3 py-1 rounded-full">{pkg.category}</span>
                </div>
                <div className="p-5">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-display text-white font-bold text-xl">{pkg.title}</h3>
                      <p className="text-white/50 text-sm flex items-center gap-1 mt-0.5"><MapPin size={12} />{pkg.location} · {pkg.duration}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-white/40">from</div>
                      <div className="text-coral-400 font-bold text-xl">₹{pkg.price}</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/5">
                    <div className="flex items-center gap-1.5">
                      <Star size={14} className="text-yellow-400 fill-yellow-400" />
                      <span className="text-white font-semibold text-sm">{pkg.rating}</span>
                      <span className="text-white/40 text-xs">({pkg.reviews} reviews)</span>
                    </div>
                    <span className="text-coral-400 text-sm font-medium flex items-center gap-1">
                      View details <ArrowRight size={14} />
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <button onClick={() => navigate('/packages')} className="btn-primary inline-flex items-center gap-2">
              View All Packages <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </section>

      {/* ─── TRANSPORTATION ─────────────────────────────────────────────── */}
      <section className="py-20" style={{background:'linear-gradient(180deg, #0a0f1e 0%, #0f1629 100%)'}}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-coral-400 text-sm font-medium tracking-widest uppercase mb-3">Travel Anywhere, Anytime</p>
            <h2 className="section-title">Book Your <span className="gradient-text italic">Transportation</span></h2>
            <p className="text-white/50 mt-4 max-w-xl mx-auto">Seamless booking for buses, trains, and cabs all in one place</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            {[
              { icon: '🚌', title: 'Buses', desc: 'Comfortable and affordable bus travel', path: '/buses', color: 'from-orange-600 to-orange-400' },
              { icon: '🚂', title: 'Trains', desc: 'Book train tickets across India', path: '/trains', color: 'from-green-600 to-green-400' },
              { icon: '🚕', title: 'Cabs', desc: 'Convenient ride-sharing services', path: '/cabs', color: 'from-rose-600 to-rose-400' },
            ].map(({ icon, title, desc, path, color }) => (
              <div key={title} onClick={() => navigate(path)} className={`bg-gradient-to-br ${color} rounded-2xl p-6 card-hover cursor-pointer text-white text-center`}>
                <div className="text-5xl mb-4">{icon}</div>
                <h3 className="font-display font-bold text-xl mb-2">{title}</h3>
                <p className="text-white/80 text-sm mb-4">{desc}</p>
                <span className="inline-flex items-center gap-1 text-sm font-semibold">
                  Book Now <ArrowRight size={14} />
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-20 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="section-title">Why Choose <span className="gradient-text italic">WanderLust?</span></h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: '🤖', title: 'AI Trip Planner', desc: 'Get personalized itineraries generated by AI based on your budget and preferences.' },
              { icon: '🔒', title: 'Secure Payments', desc: 'Multiple payment options including Razorpay and Stripe with bank-grade security.' },
              { icon: '🌍', title: '150+ Destinations', desc: 'Explore curated packages across every continent and hidden gems worldwide.' },
              { icon: '💬', title: '24/7 Support', desc: 'Live chat support and dedicated travel concierge available around the clock.' },
            ].map(({ icon, title, desc }) => (
              <div key={title} className="glass rounded-2xl p-6 card-hover text-center">
                <div className="text-4xl mb-4">{icon}</div>
                <h3 className="text-white font-semibold text-lg mb-2">{title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TESTIMONIALS ─────────────────────────────────────────── */}
      <section className="py-20" style={{background:'linear-gradient(135deg, #0a0f1e 0%, #1a0a1e 50%, #0a0f1e 100%)'}}>
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-coral-400 text-sm font-medium tracking-widest uppercase mb-3">Testimonials</p>
          <h2 className="section-title mb-12">What Travelers <span className="gradient-text italic">Say</span></h2>

          <div className="glass rounded-3xl p-8 md:p-12 relative overflow-hidden">
            <div className="absolute inset-0 opacity-5">
              <div className="text-[200px] font-display text-white leading-none">"</div>
            </div>
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className={`transition-all duration-700 ${i === activeTestimonial ? 'opacity-100' : 'opacity-0 absolute inset-0'}`}>
                <div className="flex justify-center mb-4">
                  {[...Array(t.rating)].map((_, j) => <Star key={j} size={18} className="text-yellow-400 fill-yellow-400" />)}
                </div>
                <p className="text-white/80 text-lg md:text-xl leading-relaxed mb-8 italic">"{t.text}"</p>
                <div className="flex items-center justify-center gap-3">
                  <img src={t.avatar} alt={t.name} className="w-12 h-12 rounded-full object-cover ring-2 ring-coral-400/30" />
                  <div className="text-left">
                    <div className="text-white font-semibold">{t.name}</div>
                    <div className="text-white/40 text-sm flex items-center gap-1"><MapPin size={11} />{t.location}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center gap-2 mt-6">
            {TESTIMONIALS.map((_, i) => (
              <button key={i} onClick={() => setActiveTestimonial(i)} className={`h-2 rounded-full transition-all ${i === activeTestimonial ? 'w-8 bg-coral-400' : 'w-2 bg-white/20'}`} />
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ─────────────────────────────────────────────────── */}
      <section className="py-20 bg-slate-900">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="relative glass rounded-3xl p-12 overflow-hidden">
            <div className="absolute inset-0 coral-gradient opacity-10 rounded-3xl" />
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-coral-500/20 rounded-full blur-3xl" />
            <div className="relative z-10">
              <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
                Ready to Start Your<br /><span className="gradient-text italic">Next Adventure?</span>
              </h2>
              <p className="text-white/60 mb-8 max-w-xl mx-auto">Join millions of travelers who trust WanderLust for their perfect getaway.</p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button onClick={() => navigate('/packages')} className="btn-primary inline-flex items-center gap-2">
                  Explore Packages <ArrowRight size={16} />
                </button>
                <button onClick={() => navigate('/ai-planner')} className="btn-secondary inline-flex items-center gap-2">
                  <span>🤖</span> Try AI Planner
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
