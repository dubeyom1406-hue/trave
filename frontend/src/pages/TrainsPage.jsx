import { useState } from 'react';
import { Search, MapPin, Calendar, Users, Train, Clock, Star, ArrowRight, Shield, Coffee } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const DEMO_TRAINS = [
  { id: 't1', name: 'Rajdhani Express', number: '12423', from: 'New Delhi', to: 'Mumbai Central', departure: '16:30', arrival: '08:15', duration: '15h 45m', price: '₹4,200', rating: 4.8, type: 'Premium', class: '1AC, 2AC, 3AC' },
  { id: 't2', name: 'Vande Bharat', number: '22436', from: 'New Delhi', to: 'Varanasi', departure: '06:00', arrival: '14:00', duration: '8h 00m', price: '₹1,850', rating: 4.9, type: 'Superfast', class: 'Chair Car, Exec. Chair Car' },
  { id: 't3', name: 'Shatabdi Express', number: '12002', from: 'New Delhi', to: 'Bhopal', departure: '06:00', arrival: '14:25', duration: '8h 25m', price: '₹1,450', rating: 4.7, type: 'Express', class: 'Chair Car, Exec. Chair Car' },
  { id: 't4', name: 'Gatimaan Express', number: '12050', from: 'Hazrat Nizamuddin', to: 'Agra Cantt', departure: '08:10', arrival: '09:50', duration: '1h 40m', price: '₹850', rating: 4.9, type: 'High Speed', class: 'Chair Car, Exec. Chair Car' },
  { id: 't5', name: 'Duronto Express', number: '12260', from: 'Sealdah', to: 'New Delhi', departure: '17:00', arrival: '11:00', duration: '18h 00m', price: '₹3,800', rating: 4.6, type: 'Premium', class: '2AC, 3AC, SL' },
];

export default function TrainsPage() {
  const { user, openAuth } = useAuth();
  const [searchFrom, setSearchFrom] = useState('');
  const [searchTo, setSearchTo] = useState('');

  const handleBook = () => {
    if (!user) {
      openAuth('login');
      return;
    }
    // Proceed with booking logic
    window.location.href = '/booking/train/1';
  };

  return (
    <div className="min-h-screen bg-slate-900 pt-20">
      <div className="relative py-20 overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1474487056289-b6805fb18183?w=1200&q=80" alt="" className="w-full h-full object-cover opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/50 via-slate-900/80 to-slate-900" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-6 text-sm text-coral-400 font-bold">
            <Train size={16} /> IRCTC Authorized Partner
          </div>
          <h1 className="font-display text-5xl md:text-6xl font-bold text-white mb-6">Indian Railways <span className="gradient-text italic">Booking</span></h1>
          <p className="text-white/60 max-w-xl mx-auto text-lg">Fast, secure and convenient train ticket bookings across India.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 pb-20">
        {/* Search Box */}
        <div className="glass-dark rounded-[2.5rem] p-4 mb-12 border border-white/10 shadow-2xl">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="flex items-center gap-3 bg-white/5 rounded-2xl px-5 py-4">
              <MapPin size={18} className="text-coral-400" />
              <input value={searchFrom} onChange={e => setSearchFrom(e.target.value)} placeholder="From City" className="bg-transparent text-white outline-none w-full text-sm" />
            </div>
            <div className="flex items-center gap-3 bg-white/5 rounded-2xl px-5 py-4">
              <MapPin size={18} className="text-coral-400" />
              <input value={searchTo} onChange={e => setSearchTo(e.target.value)} placeholder="To City" className="bg-transparent text-white outline-none w-full text-sm" />
            </div>
            <div className="flex items-center gap-3 bg-white/5 rounded-2xl px-5 py-4">
              <Calendar size={18} className="text-coral-400" />
              <input type="date" className="bg-transparent text-white outline-none w-full text-sm color-scheme-dark" />
            </div>
            <button className="btn-primary flex items-center justify-center gap-2">
              <Search size={18} /> Search Trains
            </button>
          </div>
        </div>

        {/* Results */}
        <div className="space-y-6">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-white font-bold text-xl uppercase tracking-widest text-white/40 text-sm">Available Trains</h2>
            <div className="flex items-center gap-2 text-xs text-white/40">
              <span>Sorted by Popularity</span>
            </div>
          </div>

          {DEMO_TRAINS.map(train => (
            <div key={train.id} className="glass rounded-3xl p-6 border border-white/5 hover:bg-white/10 transition-all group overflow-hidden relative">
              <div className="absolute right-0 top-0 w-32 h-32 bg-coral-500/5 rounded-full blur-3xl group-hover:bg-coral-500/10 transition-all"></div>
              
              <div className="flex flex-col lg:flex-row items-center justify-between gap-8 relative z-10">
                <div className="flex-1 w-full lg:w-auto">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 bg-white/5 rounded-xl text-coral-400">
                      <Train size={24} />
                    </div>
                    <div>
                      <h3 className="text-white font-bold text-xl leading-none mb-1">{train.name}</h3>
                      <p className="text-white/40 text-xs font-mono uppercase tracking-widest">#{train.number} · {train.type}</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {train.class.split(', ').map(c => (
                      <span key={c} className="px-3 py-1 glass rounded-lg text-[10px] text-white/60 font-bold tracking-widest">{c}</span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-center gap-8 md:gap-16 flex-1 text-center">
                  <div>
                    <div className="text-white font-black text-2xl">{train.departure}</div>
                    <div className="text-white/40 text-xs font-bold uppercase tracking-tighter mt-1">{train.from}</div>
                  </div>
                  <div className="flex flex-col items-center gap-1 group-hover:scale-110 transition-transform duration-500">
                    <div className="text-white/20 text-[10px] uppercase font-black tracking-[0.3em]">{train.duration}</div>
                    <div className="flex items-center gap-1">
                       <div className="w-1.5 h-1.5 rounded-full bg-coral-400"></div>
                       <div className="w-20 md:w-32 h-0.5 bg-white/10 relative">
                          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 glass p-1 rounded-full"><Clock size={10} className="text-white/20"/></div>
                       </div>
                       <div className="w-1.5 h-1.5 rounded-full bg-ocean-400"></div>
                    </div>
                    <div className="text-white/20 text-[10px] uppercase font-black tracking-[0.3em]">Non-stop</div>
                  </div>
                  <div>
                    <div className="text-white font-black text-2xl">{train.arrival}</div>
                    <div className="text-white/40 text-xs font-bold uppercase tracking-tighter mt-1">{train.to}</div>
                  </div>
                </div>

                <div className="flex flex-col items-center lg:items-end gap-3 w-full lg:w-auto">
                  <div className="text-right">
                    <div className="text-xs text-white/40 font-bold uppercase tracking-tighter mb-1">Starts from</div>
                    <div className="text-coral-400 font-bold text-3xl leading-none">{train.price}</div>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs">
                    <Star size={12} className="text-yellow-400 fill-yellow-400" />
                    <span className="text-white font-bold">{train.rating}</span>
                  </div>
                  <button onClick={handleBook} className="btn-primary py-2 px-8 text-sm">Book Now</button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
          {[
            { icon: <Shield size={24} />, title: 'Zero Cancellation', desc: 'Get full refunds on cancellations for worry-free planning.' },
            { icon: <Clock size={24} />, title: 'Instant Confirmation', desc: 'Secure your seats instantly with direct IRCTC integration.' },
            { icon: <Coffee size={24} />, title: 'Free Meals', desc: 'Complementary meal selection available for premium classes.' },
          ].map((f, i) => (
            <div key={i} className="glass rounded-[2rem] p-8 text-center border border-white/5">
              <div className="w-12 h-12 coral-gradient rounded-2xl flex items-center justify-center text-white mx-auto mb-6 shadow-lg shadow-coral-500/20">
                {f.icon}
              </div>
              <h3 className="text-white font-bold text-lg mb-2">{f.title}</h3>
              <p className="text-white/40 text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
