import { useState, useEffect } from 'react';
import { Users, Package, Calendar, DollarSign, Plus, Edit2, Trash2, Search, BarChart2, Loader2, RefreshCw } from 'lucide-react';
import { 
  getAdminStats, 
  getAllBookings, 
  getPackages, 
  createPackage, 
  deletePackage, 
  getAllUsers,
  cancelBooking 
} from '../services/api';
import toast from 'react-hot-toast';

const STATUS_STYLES = {
  confirmed: 'bg-green-500/20 text-green-400',
  pending: 'bg-yellow-500/20 text-yellow-400',
  cancelled: 'bg-red-500/20 text-red-400',
  active: 'bg-blue-500/20 text-blue-400',
};

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState('overview');
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ totalBookings: 0, totalRevenue: 0, totalUsers: 0, activePackages: 0 });
  const [bookings, setBookings] = useState([]);
  const [packages, setPackages] = useState([]);
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');
  
  const [showAddPackage, setShowAddPackage] = useState(false);
  const [newPkg, setNewPkg] = useState({ 
    title: '', 
    location: '', 
    price: '', 
    duration: '', 
    category: 'Adventure', 
    description: '',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800'
  });

  const fetchData = async () => {
    setLoading(true);
    try {
      const [statsRes, bookingsRes, pkgsRes, usersRes] = await Promise.all([
        getAdminStats().then(r => r.data).catch(() => ({ totalBookings: 0, totalRevenue: 0, totalUsers: 0, activePackages: 0 })),
        getAllBookings().then(r => r.data).catch(() => []),
        getPackages().then(r => r.data).catch(() => []),
        getAllUsers().then(r => r.data).catch(() => [])
      ]);

      setStats(statsRes);
      setBookings(bookingsRes);
      setPackages(pkgsRes);
      setUsers(usersRes);
    } catch (error) {
      toast.error('Failed to fetch admin data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAddPackage = async (e) => {
    e.preventDefault();
    try {
      await createPackage(newPkg);
      toast.success('Package added successfully');
      setShowAddPackage(false);
      setNewPkg({ title: '', location: '', price: '', duration: '', category: 'Adventure', description: '', image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800' });
      fetchData();
    } catch (error) {
      toast.error('Failed to create package');
    }
  };

  const handleDeletePkg = async (id) => {
    if (!window.confirm('Delete this package?')) return;
    try {
      await deletePackage(id);
      toast.success('Package deleted');
      fetchData();
    } catch (error) {
      toast.error('Failed to delete package');
    }
  };

  const handleCancelBooking = async (id) => {
    try {
      await cancelBooking(id);
      toast.success('Booking cancelled');
      fetchData();
    } catch (error) {
      toast.error('Failed to cancel booking');
    }
  };

  const TABS = [
    { id: 'overview', label: 'Overview', icon: BarChart2 },
    { id: 'bookings', label: 'Bookings', icon: Calendar },
    { id: 'packages', label: 'Packages', icon: Package },
    { id: 'users', label: 'Users', icon: Users },
  ];

  if (loading && activeTab === 'overview') {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <Loader2 className="text-coral-500 animate-spin" size={40} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 pt-20">
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-display text-4xl font-bold text-white">Admin <span className="gradient-text italic">Panel</span></h1>
            <p className="text-white/40 text-sm mt-1">Manage your travel platform in real-time</p>
          </div>
          <button onClick={fetchData} className="glass p-3 rounded-xl text-white/60 hover:text-white transition group">
            <RefreshCw size={20} className="group-active:rotate-180 transition-transform duration-500" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          {TABS.map(({ id, label, icon: Icon }) => (
            <button key={id} onClick={() => setActiveTab(id)}
              className={`flex items-center gap-2 px-6 py-3 rounded-2xl text-sm font-bold transition-all whitespace-nowrap ${
                activeTab === id ? 'coral-gradient text-white shadow-lg shadow-coral-500/20' : 'glass text-white/60 hover:text-white'
              }`}><Icon size={16} />{label}</button>
          ))}
        </div>

        {/* Overview */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { label: 'Total Bookings', value: stats?.totalBookings || 0, icon: Calendar, color: 'text-coral-400', bg: 'bg-coral-400/10' },
                { label: 'Revenue', value: `₹${(stats?.totalRevenue || 0).toLocaleString()}`, icon: DollarSign, color: 'text-green-400', bg: 'bg-green-400/10' },
                { label: 'Total Users', value: stats?.totalUsers || 0, icon: Users, color: 'text-blue-400', bg: 'bg-blue-400/10' },
                { label: 'Active Packages', value: stats?.activePackages || 0, icon: Package, color: 'text-yellow-400', bg: 'bg-yellow-400/10' },
              ].map(({ label, value, icon: Icon, color, bg }) => (
                <div key={label} className="glass rounded-[2rem] p-6 border border-white/5 relative overflow-hidden group">
                  <div className={`absolute -right-4 -top-4 w-24 h-24 ${bg} rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity`} />
                  <div className="flex items-center justify-between mb-4 relative z-10">
                    <span className="text-white/40 text-xs font-bold uppercase tracking-widest">{label}</span>
                    <div className={`p-2 rounded-lg ${bg} ${color}`}><Icon size={18} /></div>
                  </div>
                  <div className={`font-display text-3xl font-bold ${color} relative z-10`}>{value}</div>
                </div>
              ))}
            </div>

            <div className="glass rounded-[2rem] p-8 border border-white/5">
              <h2 className="font-display text-xl text-white font-bold mb-6 flex items-center gap-2">
                <BarChart2 size={20} className="text-coral-500" /> Recent Activity
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-white/40 border-b border-white/5 uppercase text-[10px] tracking-widest font-bold">
                      <th className="text-left pb-4">ID</th>
                      <th className="text-left pb-4">Customer</th>
                      <th className="text-left pb-4">Package</th>
                      <th className="text-left pb-4">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(bookings || []).slice(0, 5).map(b => (
                      <tr key={b?._id || b?.id || Math.random()} className="border-b border-white/5 hover:bg-white/5 transition">
                        <td className="py-4 text-white/40 font-mono text-[10px]">{b?._id?.slice(-6) || b?.id || '---'}</td>
                        <td className="py-4 text-white font-medium">{b?.name || 'Unknown'}</td>
                        <td className="py-4 text-white/60">{b?.itemTitle || 'N/A'}</td>
                        <td className="py-4"><span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-tighter ${STATUS_STYLES[b?.status] || STATUS_STYLES.pending}`}>{b?.status || 'pending'}</span></td>
                      </tr>
                    ))}
                    {(!bookings || bookings.length === 0) && <tr><td colSpan={4} className="py-10 text-center text-white/20 italic">No recent bookings found</td></tr>}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Bookings */}
        {activeTab === 'bookings' && (
          <div className="glass rounded-[2rem] p-8 border border-white/5">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
              <h2 className="font-display text-2xl text-white font-bold">All Bookings</h2>
              <div className="flex items-center gap-3 glass px-5 py-3 rounded-2xl w-full sm:w-auto">
                <Search size={16} className="text-white/40" />
                <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by name or package..."
                  className="bg-transparent text-white placeholder-white/30 outline-none text-sm w-full sm:w-60" />
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-white/40 border-b border-white/5 uppercase text-[10px] tracking-widest font-bold">
                    <th className="text-left pb-4">Booking ID</th>
                    <th className="text-left pb-4">Customer</th>
                    <th className="text-left pb-4">Package</th>
                    <th className="text-left pb-4">Amount</th>
                    <th className="text-left pb-4">Status</th>
                    <th className="text-left pb-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.filter(b => {
                    const searchLower = search.toLowerCase();
                    const name = (b.name || '').toLowerCase();
                    const title = (b.itemTitle || '').toLowerCase();
                    return search === '' || name.includes(searchLower) || title.includes(searchLower);
                  }).map(b => (
                    <tr key={b._id || b.id} className="border-b border-white/5 hover:bg-white/5 transition">
                      <td className="py-4 text-white/40 font-mono text-[10px]">{b._id || b.id}</td>
                      <td className="py-4">
                        <div className="text-white font-bold">{b.name}</div>
                        <div className="text-white/30 text-[10px]">{b.email || 'customer@email.com'}</div>
                      </td>
                      <td className="py-4 text-white/60">{b.itemTitle || 'Custom Trip'}</td>
                      <td className="py-4 text-coral-400 font-bold text-lg">₹{(b.totalAmount || 0).toLocaleString()}</td>
                      <td className="py-4"><span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-tighter ${STATUS_STYLES[b.status] || STATUS_STYLES.pending}`}>{b.status}</span></td>
                      <td className="py-4">
                        <button 
                          disabled={b.status === 'cancelled'}
                          onClick={() => handleCancelBooking(b._id)}
                          className={`text-[10px] font-bold uppercase tracking-widest px-4 py-2 rounded-xl transition-all ${
                            b.status === 'cancelled' ? 'text-white/10' : 'text-red-400/60 hover:text-red-400 hover:bg-red-400/10'
                          }`}>Cancel</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Packages */}
        {activeTab === 'packages' && (
          <div className="space-y-8">
            <div className="flex justify-between items-center">
              <h2 className="font-display text-2xl text-white font-bold">Adventure Packages</h2>
              <button 
                onClick={() => setShowAddPackage(!showAddPackage)} 
                className="coral-gradient text-white flex items-center gap-2 py-3 px-6 rounded-2xl text-sm font-bold shadow-lg shadow-coral-500/20 hover:-translate-y-1 transition-all"
              >
                {showAddPackage ? 'Close Form' : <><Plus size={18} /> Create New</>}
              </button>
            </div>

            {showAddPackage && (
              <form onSubmit={handleAddPackage} className="glass rounded-[2rem] p-8 border border-white/10 animate-in fade-in slide-in-from-top-4">
                <h3 className="text-white font-bold text-lg mb-6 flex items-center gap-2">
                  <Package className="text-coral-500" size={20} /> New Package Details
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <label className="text-white/40 text-[10px] font-bold uppercase tracking-widest ml-1">Package Title</label>
                    <input required value={newPkg.title} onChange={e => setNewPkg({...newPkg, title: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-3 text-white outline-none focus:border-coral-500/50 transition-all font-medium" placeholder="Ex: Himalayan Trek" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-white/40 text-[10px] font-bold uppercase tracking-widest ml-1">Location</label>
                    <input required value={newPkg.location} onChange={e => setNewPkg({...newPkg, location: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-3 text-white outline-none focus:border-coral-500/50 transition-all font-medium" placeholder="Ex: Manali, India" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-white/40 text-[10px] font-bold uppercase tracking-widest ml-1">Price (₹)</label>
                    <input required type="number" value={newPkg.price} onChange={e => setNewPkg({...newPkg, price: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-3 text-white outline-none focus:border-coral-500/50 transition-all font-medium font-mono" placeholder="9999" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-white/40 text-[10px] font-bold uppercase tracking-widest ml-1">Duration</label>
                    <input required value={newPkg.duration} onChange={e => setNewPkg({...newPkg, duration: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-3 text-white outline-none focus:border-coral-500/50 transition-all font-medium" placeholder="Ex: 5 Days, 4 Nights" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-white/40 text-[10px] font-bold uppercase tracking-widest ml-1">Category</label>
                    <select value={newPkg.category} onChange={e => setNewPkg({...newPkg, category: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-3 text-white outline-none focus:border-coral-500/50 transition-all font-medium appearance-none">
                      <option className="bg-slate-900" value="Adventure">Adventure</option>
                      <option className="bg-slate-900" value="Luxury">Luxury</option>
                      <option className="bg-slate-900" value="Spiritual">Spiritual</option>
                      <option className="bg-slate-900" value="Honeymoon">Honeymoon</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-white/40 text-[10px] font-bold uppercase tracking-widest ml-1">Image URL</label>
                    <input value={newPkg.image} onChange={e => setNewPkg({...newPkg, image: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-3 text-white outline-none focus:border-coral-500/50 transition-all font-medium text-xs" />
                  </div>
                  <div className="sm:col-span-2 lg:col-span-3 space-y-2">
                    <label className="text-white/40 text-[10px] font-bold uppercase tracking-widest ml-1">Description</label>
                    <textarea rows={3} required value={newPkg.description} onChange={e => setNewPkg({...newPkg, description: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-3 text-white outline-none focus:border-coral-500/50 transition-all font-medium resize-none" placeholder="Detailed itinerary and highlights..." />
                  </div>
                </div>
                <div className="flex gap-4 mt-8">
                  <button type="submit" className="coral-gradient text-white px-10 py-3.5 rounded-2xl font-bold shadow-lg shadow-coral-500/20 hover:-translate-y-1 transition-all">Submit Package</button>
                  <button type="button" onClick={() => setShowAddPackage(false)} className="glass text-white/60 px-8 py-3.5 rounded-2xl font-bold hover:text-white transition-all">Discard</button>
                </div>
              </form>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {packages.map(pkg => (
                <div key={pkg._id} className="glass rounded-[2rem] overflow-hidden border border-white/5 group relative">
                  <div className="h-48 relative overflow-hidden">
                    <img src={pkg.image} alt={pkg.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    <div className="absolute top-4 right-4 z-10">
                      <span className="coral-gradient text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-tighter">{pkg.category}</span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-white font-bold text-xl mb-1 truncate">{pkg.title}</h3>
                    <p className="text-white/40 text-xs mb-4 flex items-center gap-1.5 font-medium uppercase tracking-wider">{pkg.location}</p>
                    <div className="flex items-center justify-between mb-6">
                      <div className="text-coral-400 font-bold text-2xl font-mono">₹{pkg.price?.toLocaleString()}</div>
                      <div className="text-white/30 text-xs font-bold uppercase tracking-tighter">{pkg.duration}</div>
                    </div>
                    <div className="flex items-center gap-2 border-t border-white/5 pt-4">
                      <button className="flex-1 flex items-center justify-center gap-2 glass-dark py-2.5 rounded-xl text-xs font-bold text-white/50 hover:text-blue-400 transition-all border border-white/5">
                        <Edit2 size={12} /> Edit
                      </button>
                      <button onClick={() => handleDeletePkg(pkg._id)} className="flex-1 flex items-center justify-center gap-2 glass-dark py-2.5 rounded-xl text-xs font-bold text-white/50 hover:text-red-400 transition-all border border-white/5">
                        <Trash2 size={12} /> Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              {packages.length === 0 && <div className="col-span-full py-20 text-center glass rounded-[2rem] text-white/20 italic font-medium">No packages available. Create one to get started.</div>}
            </div>
          </div>
        )}

        {activeTab === 'users' && (
          <div className="glass rounded-[2rem] p-8 border border-white/5">
            <h2 className="font-display text-2xl text-white font-bold mb-8 flex items-center gap-3">
              <Users className="text-coral-500" size={24} /> User Accounts
            </h2>
            <div className="space-y-4">
              {users.map((u, i) => (
                <div key={u._id || i} className="flex items-center justify-between p-4 glass rounded-3xl border border-white/5 hover:bg-white/5 transition-all group">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 coral-gradient rounded-2xl flex items-center justify-center text-white text-xl font-black shadow-lg">
                      {(u.name || u.displayName || 'U')[0].toUpperCase()}
                    </div>
                    <div>
                      <div className="text-white font-bold text-lg leading-none mb-1 group-hover:text-coral-400 transition-colors">{u.name || u.displayName}</div>
                      <div className="text-white/30 text-xs font-medium">{u.email}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="text-right hidden sm:block">
                      <div className="text-white/20 text-[10px] font-black uppercase tracking-widest mb-1">Status</div>
                      <div className="text-green-400 text-xs font-bold uppercase tracking-tighter">Verified Active</div>
                    </div>
                    <button className="text-[10px] font-black uppercase tracking-[0.2em] text-red-400/30 hover:text-red-400 transition-all px-4 py-2 hover:bg-red-400/10 rounded-xl border border-red-500/0 hover:border-red-500/20">Suspend</button>
                  </div>
                </div>
              ))}
              {users.length === 0 && <div className="py-20 text-center text-white/20 italic">No users found in the system.</div>}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
