import { useState } from 'react';
import { Search, MapPin, Calendar, Users, Car, Clock, Star, ArrowRight, Shield, ShieldCheck, Map, Phone } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const DEMO_CABS = [
  { id: 'c1', name: 'Swift Dzire', category: 'Sedan', price: '₹12/km', rating: 4.8, driver: 'Suresh Kumar', capacity: '4 Persons', image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=500&q=80', tag: 'Economical' },
  { id: 'c2', name: 'Innova Crysta', category: 'SUV', price: '₹18/km', rating: 4.9, driver: 'Rajesh Singh', capacity: '7 Persons', image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=500&q=80', tag: 'Spacious' },
  { id: 'c3', name: 'Mercedes E-Class', category: 'Luxury', price: '₹45/km', rating: 5.0, driver: 'Vikram Aditya', capacity: '4 Persons', image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=500&q=80', tag: 'Premium' },
  { id: 'c4', name: 'Tempo Traveller', category: 'Van', price: '₹25/km', rating: 4.7, driver: 'Amit Verma', capacity: '12 Persons', image: 'https://images.unsplash.com/photo-1561361513-39d736785671?w=500&q=80', tag: 'Groups' },
];

export default function CabsPage() {
  const { user, openAuth } = useAuth();
  const [searchFrom, setSearchFrom] = useState('');
  const [searchTo, setSearchTo] = useState('');

  const handleBook = () => {
    if (!user) {
      openAuth('login');
      return;
    }
    window.location.href = '/booking/cab/1';
  };

  return (
    <div className="min-h-screen bg-slate-900 pt-20">
      <div className="relative py-20 overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=1200&q=80" alt="" className="w-full h-full object-cover opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/50 via-slate-900/80 to-slate-900" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-6 text-sm text-coral-400 font-bold">
            <Car size={16} /> 24/7 Cab Service Available
          </div>
          <h1 className="font-display text-5xl md:text-6xl font-bold text-white mb-6">Book Your <span className="gradient-text italic">Ride Now</span></h1>
          <p className="text-white/60 max-w-xl mx-auto text-lg">Safe, reliable and affordable cabs for local and outstation trips.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 pb-20">
        {/* Search Box */}
        <div className="glass-dark rounded-[2.5rem] p-4 mb-12 border border-white/10 shadow-2xl">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="flex items-center gap-3 bg-white/5 rounded-2xl px-5 py-4">
              <MapPin size={18} className="text-coral-400" />
              <input value={searchFrom} onChange={e => setSearchFrom(e.target.value)} placeholder="Pickup Location" className="bg-transparent text-white outline-none w-full text-sm" />
            </div>
            <div className="flex items-center gap-3 bg-white/5 rounded-2xl px-5 py-4">
              <MapPin size={18} className="text-coral-400" />
              <input value={searchTo} onChange={e => setSearchTo(e.target.value)} placeholder="Drop Location" className="bg-transparent text-white outline-none w-full text-sm" />
            </div>
            <div className="flex items-center gap-3 bg-white/5 rounded-2xl px-5 py-4">
              <Calendar size={18} className="text-coral-400" />
              <input type="datetime-local" className="bg-transparent text-white outline-none w-full text-sm color-scheme-dark" />
            </div>
            <button className="btn-primary flex items-center justify-center gap-2">
              <Search size={18} /> Book A Cab
            </button>
          </div>
        </div>

        {/* Categories */}
        <div className="flex gap-4 overflow-x-auto pb-4 mb-8">
            {['All Rides', 'Local', 'Outstation', 'Airport', 'Rental'].map((cat, i) => (
                <button key={cat} className={`whitespace-nowrap px-6 py-2.5 rounded-2xl text-sm font-bold transition-all ${i===0 ? 'coral-gradient text-white shadow-lg' : 'glass text-white/40 hover:text-white'}`}>
                    {cat}
                </button>
            ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {DEMO_CABS.map(cab => (
            <div key={cab.id} className="glass rounded-[2rem] overflow-hidden border border-white/5 group card-hover">
              <div className="relative h-48 overflow-hidden">
                <img src={cab.image} alt={cab.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                <div className="absolute top-4 left-4">
                    <span className="glass text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">{cab.category}</span>
                </div>
                <div className="absolute bottom-4 left-4">
                    <div className="text-white font-bold text-lg">{cab.name}</div>
                    <div className="text-white/60 text-[10px] font-bold uppercase tracking-widest">{cab.tag}</div>
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex flex-col">
                        <span className="text-white/30 text-[10px] uppercase font-bold tracking-widest leading-none mb-1">Price</span>
                        <span className="text-coral-400 font-bold text-xl">{cab.price}</span>
                    </div>
                    <div className="text-right">
                        <div className="flex items-center justify-end gap-1 mb-1">
                            <Star size={12} className="text-yellow-400 fill-yellow-400" />
                            <span className="text-white text-xs font-bold">{cab.rating}</span>
                        </div>
                        <span className="text-white/30 text-[10px] uppercase font-bold tracking-widest leading-none italic">{cab.driver}</span>
                    </div>
                </div>
                
                <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-3 text-white/50 text-xs">
                        <Users size={14} className="text-coral-400" /> {cab.capacity}
                    </div>
                    <div className="flex items-center gap-3 text-white/50 text-xs">
                        <ShieldCheck size={14} className="text-coral-400" /> Sanitized & Safe
                    </div>
                </div>

                <button onClick={handleBook} className="w-full btn-primary py-3 rounded-xl text-xs flex items-center justify-center gap-2">
                    Book Ride <ArrowRight size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Info */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
                { icon: <Map size={18}/>, title: 'Across India', desc: 'Serving in 100+ cities across the country.' },
                { icon: <Shield size={18}/>, title: 'Safe Travel', desc: 'Professional drivers & monitored rides.' },
                { icon: <Phone size={18}/>, title: '24/7 Support', desc: 'Dedicated helpline for all your concerns.' },
                { icon: <Clock size={18}/>, title: 'Punctuality', desc: 'On-time pickup guaranteed or next ride free.' },
            ].map((item, i) => (
                <div key={i} className="glass p-6 rounded-[2rem] border border-white/5">
                    <div className="text-coral-400 mb-3">{item.icon}</div>
                    <h4 className="text-white font-bold text-sm mb-1">{item.title}</h4>
                    <p className="text-white/30 text-[10px] font-medium leading-relaxed">{item.desc}</p>
                </div>
            ))}
        </div>
      </div>
    </div>
  );
}
