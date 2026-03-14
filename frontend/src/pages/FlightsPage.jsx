import { useState } from 'react';
import { Search, MapPin, Calendar, Users, Plane, Clock, Star, ArrowRight, Shield, BadgeCheck, Utensils, Wifi, Wind } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const DEMO_FLIGHTS = [
  { id: 'f1', airline: 'IndiGo', logo: 'https://seeklogo.com/images/I/indigo-logo-EDDA46C9E4-seeklogo.com.png', flight: '6E-2134', from: 'DEL', fromName: 'New Delhi', to: 'BOM', toName: 'Mumbai', departure: '08:00', arrival: '10:15', duration: '2h 15m', price: '₹4,850', rating: 4.7, class: 'Economy' },
  { id: 'f2', airline: 'Air India', logo: 'https://seeklogo.com/images/A/air-india-logo-BCC32ABF5F-seeklogo.com.png', flight: 'AI-102', from: 'BOM', fromName: 'Mumbai', to: 'DEL', toName: 'New Delhi', departure: '14:30', arrival: '16:45', duration: '2h 15m', price: '₹5,200', rating: 4.5, class: 'Business' },
  { id: 'f3', airline: 'Vistara', logo: 'https://seeklogo.com/images/V/vistara-logo-4F8A6F0D42-seeklogo.com.png', flight: 'UK-944', from: 'BLR', fromName: 'Bangalore', to: 'DEL', toName: 'New Delhi', departure: '19:15', arrival: '22:00', duration: '2h 45m', price: '₹6,400', rating: 4.9, class: 'Premium Economy' },
  { id: 'f4', airline: 'SpiceJet', logo: 'https://seeklogo.com/images/S/spicejet-logo-E8F5EF5D90-seeklogo.com.png', flight: 'SG-8152', from: 'MAA', fromName: 'Chennai', to: 'CCU', toName: 'Kolkata', departure: '06:45', arrival: '09:00', duration: '2h 15m', price: '₹3,900', rating: 4.2, class: 'Economy' },
];

export default function FlightsPage() {
  const { user, openAuth } = useAuth();
  const [searchFrom, setSearchFrom] = useState('');
  const [searchTo, setSearchTo] = useState('');

  const handleBook = () => {
    if (!user) {
      openAuth('login');
      return;
    }
    window.location.href = '/booking/flight/1';
  };

  return (
    <div className="min-h-screen bg-slate-900 pt-20">
      <div className="relative py-20 overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1436491865332-7a61a109c0f2?w=1200&q=80" alt="" className="w-full h-full object-cover opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/50 via-slate-900/80 to-slate-900" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-6 text-sm text-coral-400 font-bold">
            <Plane size={16} /> World's Best Airline Partners
          </div>
          <h1 className="font-display text-5xl md:text-6xl font-bold text-white mb-6">Fly With <span className="gradient-text italic">Confidence</span></h1>
          <p className="text-white/60 max-w-xl mx-auto text-lg">Compare and book the cheapest flights across all major airlines.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 pb-20">
        {/* Search Box */}
        <div className="glass-dark rounded-[2.5rem] p-4 mb-12 border border-white/10 shadow-2xl">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="flex items-center gap-3 bg-white/5 rounded-2xl px-5 py-4">
              <MapPin size={18} className="text-coral-400" />
              <input value={searchFrom} onChange={e => setSearchFrom(e.target.value)} placeholder="From (City/Airport)" className="bg-transparent text-white outline-none w-full text-sm" />
            </div>
            <div className="flex items-center gap-3 bg-white/5 rounded-2xl px-5 py-4">
              <MapPin size={18} className="text-coral-400" />
              <input value={searchTo} onChange={e => setSearchTo(e.target.value)} placeholder="To (City/Airport)" className="bg-transparent text-white outline-none w-full text-sm" />
            </div>
            <div className="flex items-center gap-3 bg-white/5 rounded-2xl px-5 py-4">
              <Calendar size={18} className="text-coral-400" />
              <input type="date" className="bg-transparent text-white outline-none w-full text-sm color-scheme-dark" />
            </div>
            <button className="btn-primary flex items-center justify-center gap-2">
              <Search size={18} /> Search Flights
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="flex gap-4 mb-8 overflow-x-auto pb-4">
            {['Economy', 'Premium Economy', 'Business', 'First Class'].map((cat, i) => (
                <button key={cat} className={`whitespace-nowrap px-6 py-2.5 rounded-2xl text-sm font-bold transition-all ${i===0 ? 'coral-gradient text-white shadow-lg' : 'glass text-white/40 hover:text-white'}`}>
                    {cat}
                </button>
            ))}
        </div>

        {/* Results */}
        <div className="space-y-4">
          {DEMO_FLIGHTS.map(flight => (
            <div key={flight.id} className="glass rounded-3xl p-6 border border-white/5 hover:bg-white/10 transition-all group relative overflow-hidden">
               <div className="flex flex-col lg:flex-row items-center gap-8">
                  <div className="flex items-center gap-6 w-full lg:w-48">
                    <div className="w-12 h-12 bg-white rounded-xl p-2 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                        <img src={flight.logo} alt={flight.airline} className="w-full h-full object-contain" />
                    </div>
                    <div>
                        <div className="text-white font-bold">{flight.airline}</div>
                        <div className="text-white/30 text-[10px] uppercase font-black tracking-widest leading-none mt-1">{flight.flight}</div>
                    </div>
                  </div>

                  <div className="flex flex-1 items-center justify-center gap-8 md:gap-16 w-full">
                     <div className="text-center">
                        <div className="text-white font-black text-3xl">{flight.departure}</div>
                        <div className="text-coral-400 font-bold text-sm tracking-widest">{flight.from}</div>
                        <div className="text-white/20 text-[10px] uppercase font-bold mt-1">{flight.fromName}</div>
                     </div>

                     <div className="flex-1 flex flex-col items-center gap-1 group/line">
                        <div className="text-white/40 text-[10px] font-black uppercase tracking-[0.2em]">{flight.duration}</div>
                        <div className="w-full h-0.5 bg-white/10 relative rounded-full overflow-hidden">
                            <div className="absolute inset-0 bg-coral-400 w-0 group-hover:w-full transition-all duration-1000"></div>
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                            <Wifi size={10} className="text-white/20"/>
                            <Utensils size={10} className="text-white/20"/>
                            <Wind size={10} className="text-white/20"/>
                        </div>
                     </div>

                     <div className="text-center">
                        <div className="text-white font-black text-3xl">{flight.arrival}</div>
                        <div className="text-ocean-400 font-bold text-sm tracking-widest">{flight.to}</div>
                        <div className="text-white/20 text-[10px] uppercase font-bold mt-1">{flight.toName}</div>
                     </div>
                  </div>

                  <div className="w-full lg:w-48 flex flex-col items-center lg:items-end justify-between self-stretch">
                     <div className="text-right mb-4 lg:mb-0">
                        <div className="text-white/30 text-[10px] uppercase font-black tracking-widest mb-1">Price</div>
                        <div className="text-white font-black text-3xl leading-none">{flight.price}</div>
                     </div>
                     <button onClick={handleBook} className="btn-primary py-2.5 w-full text-xs flex items-center justify-center gap-2">
                        Select Seat <ArrowRight size={14} />
                     </button>
                  </div>
               </div>
            </div>
          ))}
        </div>

        {/* Benefits */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
                { icon: <Shield size={20}/>, title: 'Safe Travels', desc: 'Enhanced safety protocols on all partner airlines.' },
                { icon: <BadgeCheck size={20}/>, title: 'Price Guarantee', desc: 'Find it cheaper? We will match the price.' },
                { icon: <Clock size={20}/>, title: '24/7 Support', desc: 'Always here to help with your flight changes.' },
                { icon: <Users size={20}/>, title: 'Group Booking', desc: 'Special discounts for groups of 9 or more.' },
            ].map((f, i) => (
                <div key={i} className="glass p-8 rounded-[2rem] border border-white/5 hover:border-white/10 transition-colors">
                    <div className="text-coral-400 mb-4">{f.icon}</div>
                    <h4 className="text-white font-bold text-sm mb-2">{f.title}</h4>
                    <p className="text-white/30 text-[10px] font-medium leading-relaxed">{f.desc}</p>
                </div>
            ))}
        </div>
      </div>
    </div>
  );
}
