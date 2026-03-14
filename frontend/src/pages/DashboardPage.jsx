import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { db } from '../firebase';
import { doc, updateDoc } from 'firebase/firestore';
import { MapPin, Calendar, Users, Clock, X, User, Mail, Phone, Edit2, Check, Luggage, Wallet, Star, ChevronRight, LayoutDashboard, Settings, LogOut, Bell, Shield } from 'lucide-react';
import toast from 'react-hot-toast';

const DEMO_BOOKINGS = [
  { _id: 'b1', itemTitle: 'Golden Triangle Tour', itemLocation: 'Delhi-Agra-Jaipur', startDate: '2025-03-15', endDate: '2025-03-22', guests: 2, totalAmount: 50000, status: 'confirmed', type: 'package', image: 'https://images.unsplash.com/photo-1548013146-72479768bada?w=500&q=80' },
  { _id: 'b2', itemTitle: 'Taj Lake Palace', itemLocation: 'Udaipur, Rajasthan', startDate: '2025-05-01', endDate: '2025-05-08', guests: 1, totalAmount: 45000, status: 'pending', type: 'hotel', image: 'https://images.unsplash.com/photo-1585128792020-803d29415281?w=500&q=80' },
  { _id: 'b3', itemTitle: 'Kerala Houseboat Stay', itemLocation: 'Alleppey, Kerala', startDate: '2024-12-10', endDate: '2024-12-14', guests: 2, totalAmount: 24000, status: 'completed', type: 'package', image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=500&q=80' },
];

const STATS = [
  { label: 'Total Trips', value: '12', icon: Luggage, color: 'text-coral-400' },
  { label: 'Wallet Balance', value: '₹4,500', icon: Wallet, color: 'text-green-400' },
  { label: 'Travel Points', value: '850', icon: Star, color: 'text-yellow-400' },
];

export default function DashboardPage() {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [bookings, setBookings] = useState(DEMO_BOOKINGS);
  const [editProfile, setEditProfile] = useState(false);
  const [profileForm, setProfileForm] = useState({ 
    name: user?.name || 'User Explorer', 
    phone: user?.phone || '+91 98765 43210', 
    bio: user?.bio || 'Passionate world traveler and adventure seeker.' 
  });

  useEffect(() => {
    if (user) {
      setProfileForm({
        name: user.name || '',
        phone: user.phone || '',
        bio: user.bio || ''
      });
    }
  }, [user]);

  const handleSaveProfile = async () => {
    try {
      const userRef = doc(db, 'users', user.uid);
      await updateDoc(userRef, profileForm);
      toast.success('Profile updated successfully!');
      setEditProfile(false);
    } catch (error) {
      toast.error('Failed to update profile');
    }
  };

  const handleCancel = (id) => {
    toast.error('Cancellation request sent to admin');
    setBookings(prev => prev.map(b => b._id === id ? { ...b, status: 'cancelled' } : b));
  };

  const navItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'bookings', label: 'My Bookings', icon: Luggage },
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'settings', label: 'Security', icon: Shield },
  ];

  return (
    <div className="min-h-screen bg-slate-950 pt-20 flex">
      {/* Sidebar */}
      <aside className="w-72 hidden lg:flex flex-col border-r border-white/5 bg-slate-900/50 backdrop-blur-xl p-6 fixed h-full">
        <div className="flex items-center gap-3 mb-10 px-2">
          <div className="w-10 h-10 coral-gradient rounded-xl flex items-center justify-center font-bold text-white shadow-lg">
            {profileForm.name[0]}
          </div>
          <div className="flex flex-col">
            <span className="text-white font-bold text-sm truncate w-40">{profileForm.name}</span>
            <span className="text-white/40 text-[10px] uppercase tracking-widest font-bold">Gold Member</span>
          </div>
        </div>

        <nav className="flex-1 space-y-2">
          {navItems.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium transition-all ${
                activeTab === id 
                  ? 'coral-gradient text-white shadow-lg shadow-coral-500/20' 
                  : 'text-white/40 hover:text-white hover:bg-white/5'
              }`}
            >
              <Icon size={18} />
              {label}
            </button>
          ))}
        </nav>

        <button 
          onClick={logout}
          className="flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium text-red-400/60 hover:text-red-400 hover:bg-red-400/5 transition-all mt-auto"
        >
          <LogOut size={18} />
          Sign Out
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 lg:ml-72 p-6 lg:p-10">
        <header className="flex items-center justify-between mb-10">
          <div>
            <h1 className="text-3xl font-bold text-white mb-1 uppercase tracking-tight">Dashboard</h1>
            <p className="text-white/40 text-sm">Welcome back, {profileForm.name.split(' ')[0]}!</p>
          </div>
          <div className="flex items-center gap-4">
            <button className="w-10 h-10 glass rounded-full flex items-center justify-center text-white/60 hover:text-white transition relative">
              <Bell size={18} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-coral-500 rounded-full border-2 border-slate-950" />
            </button>
            <div className="lg:hidden w-10 h-10 coral-gradient rounded-full flex items-center justify-center font-bold text-white">
              {profileForm.name[0]}
            </div>
          </div>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {STATS.map(({ label, value, icon: Icon, color }) => (
            <div key={label} className="glass rounded-[2rem] p-6 card-hover group cursor-pointer border border-white/5 relative overflow-hidden">
              <div className="absolute -right-4 -bottom-4 opacity-5 group-hover:opacity-10 transition-opacity">
                <Icon size={100} />
              </div>
              <div className="flex items-center gap-4 mb-3">
                <div className={`w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center ${color}`}>
                  <Icon size={20} />
                </div>
                <span className="text-white/40 text-xs font-bold uppercase tracking-widest">{label}</span>
              </div>
              <div className="text-3xl font-bold text-white">{value}</div>
            </div>
          ))}
        </div>

        {activeTab === 'overview' || activeTab === 'bookings' ? (
          <div className="space-y-10">
            {/* Recent Items section */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <Luggage className="text-coral-500" size={20}/> Active Bookings
                </h2>
                <button 
                  onClick={() => setActiveTab('bookings')}
                  className="text-coral-400 text-xs font-bold hover:underline"
                >
                  View All
                </button>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {bookings.filter(b => b.status !== 'cancelled').map(booking => (
                  <div key={booking._id} className="glass rounded-[2rem] p-4 group transition-all hover:bg-white/5 border border-white/5">
                    <div className="flex flex-col md:flex-row items-center gap-6">
                      <div className="w-full md:w-32 h-32 rounded-2xl overflow-hidden flex-shrink-0 relative">
                        <img src={booking.image} alt="" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                        <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded-lg glass text-[10px] text-white font-bold uppercase">
                          {booking.type}
                        </div>
                      </div>

                      <div className="flex-1 w-full">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h3 className="text-white font-bold text-lg mb-1">{booking.itemTitle}</h3>
                            <div className="flex items-center gap-3 text-white/40 text-xs">
                              <span className="flex items-center gap-1"><MapPin size={12}/> {booking.itemLocation}</span>
                              <span className="flex items-center gap-1"><Clock size={12}/> {booking.startDate}</span>
                            </div>
                          </div>
                          <span className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest ${
                            booking.status === 'confirmed' ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 
                            booking.status === 'pending' ? 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20' : 
                            'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                          }`}>
                            {booking.status}
                          </span>
                        </div>
                        
                        <div className="flex items-center justify-between pt-4 border-t border-white/5">
                          <div className="flex items-center gap-6">
                            <div className="flex flex-col">
                              <span className="text-[10px] text-white/30 uppercase font-bold tracking-tighter">Amount Paid</span>
                              <span className="text-white font-bold text-lg leading-none">₹{booking.totalAmount}</span>
                            </div>
                            <div className="flex flex-col">
                              <span className="text-[10px] text-white/30 uppercase font-bold tracking-tighter">Travelers</span>
                              <span className="text-white font-bold text-lg leading-none">{booking.guests}</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <button className="glass px-4 py-2 rounded-xl text-xs font-bold text-white/60 hover:text-white transition">Details</button>
                            {booking.status === 'confirmed' && (
                              <button 
                                onClick={() => handleCancel(booking._id)}
                                className="px-4 py-2 rounded-xl text-xs font-bold text-red-400/60 hover:text-red-500 hover:bg-red-500/10 transition"
                              >
                                Cancel
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Travel Insight */}
            <div className="glass rounded-[2.5rem] p-8 border border-white/5 relative overflow-hidden group">
              <div className="absolute right-0 top-0 w-1/3 h-full opacity-20 pointer-events-none group-hover:scale-110 transition-transform duration-700">
                <img src="https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800&q=80" alt="" className="w-full h-full object-cover" />
              </div>
              <div className="max-w-md relative z-10">
                <span className="coral-gradient text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase mb-4 inline-block">Pro Tip</span>
                <h3 className="text-2xl font-bold text-white mb-3 leading-tight">Your next destination awaits in Ladakh!</h3>
                <p className="text-white/50 text-sm mb-6">Based on your previous bookings, we recommend exploring the serene monasteries and high passes of Ladakh this summer. Get 15% off on your next flight.</p>
                <button className="coral-gradient text-white font-bold px-6 py-3 rounded-2xl text-xs flex items-center gap-2 group/btn shadow-xl shadow-coral-500/20">
                  Explore Destinations <ChevronRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        ) : activeTab === 'profile' ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <div className="glass rounded-[2rem] p-8 border border-white/5">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-xl font-bold text-white">Personal Information</h2>
                  <button 
                    onClick={() => editProfile ? handleSaveProfile() : setEditProfile(true)}
                    className="text-coral-400 text-xs font-bold flex items-center gap-2 hover:bg-coral-400/10 px-4 py-2 rounded-xl transition-all"
                  >
                    {editProfile ? <><Check size={14} /> Save Profile</> : <><Edit2 size={14} /> Edit Info</>}
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] text-white/30 uppercase font-bold tracking-widest ml-1">Display Name</label>
                    <input 
                      disabled={!editProfile}
                      value={profileForm.name}
                      onChange={e => setProfileForm({...profileForm, name: e.target.value})}
                      className="w-full bg-white/5 border border-white/5 rounded-2xl px-5 py-4 text-white font-medium outline-none focus:border-coral-500/50 transition-all disabled:opacity-50"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] text-white/30 uppercase font-bold tracking-widest ml-1">Email Address</label>
                    <div className="w-full bg-white/5 border border-white/5 rounded-2xl px-5 py-4 text-white/50 font-medium">
                      {user?.email || 'user@example.com'}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] text-white/30 uppercase font-bold tracking-widest ml-1">Phone Number</label>
                    <input 
                      disabled={!editProfile}
                      value={profileForm.phone}
                      onChange={e => setProfileForm({...profileForm, phone: e.target.value})}
                      className="w-full bg-white/5 border border-white/5 rounded-2xl px-5 py-4 text-white font-medium outline-none focus:border-coral-500/50 transition-all disabled:opacity-50"
                    />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-[10px] text-white/30 uppercase font-bold tracking-widest ml-1">Personal Bio</label>
                    <textarea 
                      disabled={!editProfile}
                      rows={3}
                      value={profileForm.bio}
                      onChange={e => setProfileForm({...profileForm, bio: e.target.value})}
                      className="w-full bg-white/5 border border-white/5 rounded-2xl px-5 py-4 text-white font-medium outline-none focus:border-coral-500/50 transition-all disabled:opacity-50 resize-none"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="glass rounded-[2rem] p-8 border border-white/5 text-center">
                <div className="relative w-24 h-24 mx-auto mb-6">
                  <div className="w-full h-full rounded-3xl overflow-hidden coral-gradient flex items-center justify-center text-4xl font-bold text-white shadow-xl">
                    {profileForm.name[0]}
                  </div>
                  <button className="absolute -right-2 -bottom-2 w-8 h-8 rounded-xl glass border border-white/10 flex items-center justify-center text-white/60 hover:text-white transition shadow-lg">
                    <Edit2 size={14} />
                  </button>
                </div>
                <h3 className="text-white font-bold text-lg mb-1">{profileForm.name}</h3>
                <p className="text-white/40 text-xs mb-6 lowercase">{profileForm.name.split(' ').join('.')}@rupiksha.com</p>
                <div className="flex items-center justify-center gap-2">
                  <div className="px-3 py-1 rounded-lg bg-green-500/10 text-green-400 text-[10px] font-bold uppercase tracking-widest border border-green-500/20">Verified Email</div>
                  <div className="px-3 py-1 rounded-lg bg-coral-500/10 text-coral-400 text-[10px] font-bold uppercase tracking-widest border border-coral-400/20">Elite Tier</div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="text-5xl mb-4">⚒️</div>
            <h3 className="text-white/60 text-xl font-medium mb-2">Section under development</h3>
            <p className="text-white/30 text-sm">We are working on bringing more tools to your explorer dashboard.</p>
          </div>
        )}
      </main>
    </div>
  );
}
