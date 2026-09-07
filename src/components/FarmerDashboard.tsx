import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { MapPin, Calendar, CreditCard, Activity, Bell, FileText, ChevronRight, Info, Sun, Tractor, MessageSquare, HelpCircle, User as UserIcon } from 'lucide-react';
import { Center, Booking, User } from '../types';

// Subviews
import SlotBooking from './farmer/SlotBooking';
import StatusTracking from './farmer/StatusTracking';
import PaymentStatus from './farmer/PaymentStatus';
import NearbyCenters from './farmer/NearbyCenters';
import NotificationsView from './farmer/NotificationsView';
import ProfileView from './farmer/ProfileView';
import HistoryView from './farmer/HistoryView';

interface Props {
  language: 'en' | 'hi';
  user?: User | null;
}

function Overview({ language, activeBooking, user }: { language: string, activeBooking: Booking | null, user?: User | null }) {
  const navigate = useNavigate();

  return (
    <div className="space-y-6 md:space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Mobile Header Greeting */}
      <div className="md:hidden">
         <h2 className="text-2xl font-bold text-[#1E3A8A] leading-tight">Good Morning,<br/>{user?.name || 'Ramesh Yadav'}</h2>
         <p className="text-sm text-[#0F7A3B] font-bold mt-1">Better Markets. Brighter Tomorrows.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
        
        {/* Left Column: Current Procurement & Quick Actions */}
        <div className="lg:col-span-7 xl:col-span-8 space-y-6">
          
          <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6">
             <div className="flex justify-between items-center mb-5">
                <h3 className="font-bold text-[#1E3A8A] text-lg">Current Procurement</h3>
                <button className="text-slate-400 hover:text-[#0F7A3B]"><Info className="w-5 h-5"/></button>
             </div>
             
             {activeBooking ? (
                 <>
                   <div className="flex items-center gap-4 bg-[#F4F6F4] p-5 rounded-2xl">
                      <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-sm shrink-0 border border-slate-100">
                         <span className="text-3xl">🌾</span> 
                      </div>
                      <div className="flex-1">
                         <h4 className="font-bold text-[#1E3A8A] text-lg">{activeBooking.crop}</h4>
                         <p className="text-sm font-medium text-slate-500">{activeBooking.quantity} kg</p>
                      </div>
                      <div className="bg-[#0F7A3B]/10 text-[#0F7A3B] px-4 py-1.5 rounded-full text-xs font-bold shadow-sm">
                         {activeBooking.status || 'Scheduled'}
                      </div>
                   </div>
                   
                   <div className="grid grid-cols-2 gap-y-5 gap-x-4 mt-6 px-2">
                      <div>
                        <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-1">Date</p>
                        <p className="font-bold text-[#1E3A8A]">{activeBooking.date}</p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-1">Token No.</p>
                        <p className="font-bold text-[#1E3A8A]">{activeBooking.token}</p>
                      </div>
                      <div className="col-span-2">
                        <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-1">Center</p>
                        <p className="font-bold text-[#1E3A8A] flex items-center gap-1.5">
                           <MapPin className="w-4 h-4 text-[#0F7A3B]" /> 
                           Center {activeBooking.centerId}
                        </p>
                      </div>
                   </div>

                   <button onClick={() => navigate('/track')} className="w-full mt-6 bg-[#0F7A3B] hover:bg-[#0F7A3B]/90 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all active:scale-[0.98] shadow-lg shadow-[#0F7A3B]/20">
                      View Details <ChevronRight className="w-5 h-5" />
                   </button>
                 </>
             ) : (
                <div className="text-center py-8">
                   <div className="w-16 h-16 bg-[#F4F6F4] rounded-full flex items-center justify-center mx-auto mb-4">
                      <Tractor className="w-8 h-8 text-slate-400" />
                   </div>
                   <h4 className="font-bold text-[#1E3A8A] mb-2">No Active Procurement</h4>
                   <p className="text-sm text-slate-500 font-medium mb-6">Book a slot to get started.</p>
                   <button onClick={() => navigate('/schedule')} className="bg-[#0F7A3B] hover:bg-[#0F7A3B]/90 text-white font-bold px-8 py-3 rounded-xl transition-all shadow-lg shadow-[#0F7A3B]/20">
                      Book Slot
                   </button>
                </div>
             )}
          </div>

          {/* Quick Actions Grid */}
          <div>
            <h3 className="font-bold text-[#1E3A8A] text-lg mb-4 pl-2">Quick Actions</h3>
            <div className="grid grid-cols-4 sm:grid-cols-4 gap-3 sm:gap-4">
               {[
                 { label: 'My Procurement', icon: FileText, path: '/history', color: 'text-blue-600', bg: 'bg-blue-50' },
                 { label: 'Nearby Centers', icon: MapPin, path: '/centers', color: 'text-emerald-600', bg: 'bg-emerald-50' },
                 { label: 'Schedule', icon: Calendar, path: '/schedule', color: 'text-purple-600', bg: 'bg-purple-50' },
                 { label: 'Track Status', icon: Activity, path: '/track', color: 'text-orange-600', bg: 'bg-orange-50' },
                 { label: 'Payments', icon: CreditCard, path: '/payment', color: 'text-teal-600', bg: 'bg-teal-50' },
                 { label: 'Notifications', icon: Bell, path: '/notifications', color: 'text-red-600', bg: 'bg-red-50' },
                 { label: 'Ask Sahayak', icon: MessageSquare, path: '#', onClick: () => window.dispatchEvent(new CustomEvent('open-chat')), color: 'text-[#0F7A3B]', bg: 'bg-[#0F7A3B]/10' },
                 { label: 'Help & Support', icon: HelpCircle, path: '#', color: 'text-slate-600', bg: 'bg-slate-100' },
               ].map((action, i) => (
                 <div key={i} onClick={() => action.onClick ? action.onClick() : navigate(action.path)} className="flex flex-col items-center gap-2.5 cursor-pointer group">
                    <div className={`w-14 h-14 sm:w-16 sm:h-16 ${action.bg} rounded-2xl flex items-center justify-center group-hover:-translate-y-1 group-hover:shadow-md transition-all border border-white`}>
                       <action.icon className={`w-6 h-6 sm:w-7 sm:h-7 ${action.color}`} />
                    </div>
                    <span className="text-[10px] sm:text-xs text-center font-bold text-slate-600 leading-tight px-1 group-hover:text-[#1E3A8A] transition-colors">{action.label}</span>
                 </div>
               ))}
            </div>
          </div>

        </div>

        {/* Right Column: Queue Status & Promos */}
        <div className="lg:col-span-5 xl:col-span-4 space-y-6">
           
           {activeBooking && (
             <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6 relative overflow-hidden">
                <h3 className="font-bold text-[#1E3A8A] text-lg mb-6 relative z-10">Queue Status (Live)</h3>
                
                <div className="flex justify-between items-end mb-8 relative z-10">
                   <div>
                     <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-1">Current Token</p>
                     <p className="text-3xl font-extrabold text-[#1E3A8A]">A118</p>
                   </div>
                   <div className="text-center">
                     <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-1">People Ahead</p>
                     <p className="text-3xl font-extrabold text-[#EF4444]">6</p>
                   </div>
                   <div className="text-right">
                     <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-1">Est. Waiting</p>
                     <p className="text-2xl font-extrabold text-[#F59E0B]">~35 min</p>
                   </div>
                </div>

                <div className="relative h-2.5 bg-slate-100 rounded-full mb-8 relative z-10">
                   <div className="absolute top-0 left-0 h-full bg-[#0F7A3B] rounded-full" style={{ width: '60%' }}></div>
                   {/* Markers */}
                   <div className="absolute -top-1.5 left-0 w-5 h-5 bg-white border-4 border-[#0F7A3B] rounded-full"></div>
                   <div className="absolute -top-1.5 left-[60%] w-5 h-5 bg-[#0F7A3B] rounded-full shadow-lg shadow-[#0F7A3B]/40 animate-pulse border-2 border-white"></div>
                </div>

                <label className="flex items-center gap-3 cursor-pointer p-4 bg-[#F4F6F4] rounded-2xl relative z-10 hover:bg-slate-100 transition-colors">
                   <div className="relative shrink-0">
                     <input type="checkbox" className="sr-only peer" defaultChecked />
                     <div className="w-11 h-6 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#0F7A3B]"></div>
                   </div>
                   <span className="text-sm font-bold text-[#1E3A8A]">Notify me when my turn is near</span>
                </label>
                
                {/* Decorative background shape */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#0F7A3B]/5 rounded-bl-full -z-0"></div>
             </div>
           )}

           {/* Banner */}
           <div className="bg-[#1E3A8A] rounded-3xl p-6 text-white relative overflow-hidden shadow-lg shadow-[#1E3A8A]/20">
             <div className="relative z-10 w-2/3">
                <h3 className="text-xl font-bold mb-1 leading-tight">Timely Information</h3>
                <p className="text-sm text-blue-200 font-medium mb-5">Happier Farmers</p>
                <button className="bg-white text-[#1E3A8A] text-xs font-bold px-5 py-2.5 rounded-xl transition-transform hover:scale-105 shadow-sm">
                  Learn More
                </button>
             </div>
             {/* Decorative background representing field/tractor */}
             <div className="absolute -right-4 -bottom-4 opacity-30 mix-blend-overlay">
                <Tractor className="w-32 h-32 text-white" />
             </div>
             <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-bl-full"></div>
           </div>

           {/* Weather Widget */}
           <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-5 flex justify-between items-center">
              <div>
                <span className="text-sm font-bold text-[#1E3A8A] block">Today's Weather</span>
                <span className="text-xs font-medium text-slate-500 block mt-0.5">Barabanki</span>
              </div>
              <div className="flex items-center gap-3 bg-[#F4F6F4] px-4 py-2 rounded-2xl">
                 <Sun className="w-8 h-8 text-[#F59E0B]" />
                 <div>
                   <span className="font-extrabold text-[#1E3A8A] block leading-tight text-lg">28°C</span>
                   <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Sunny</span>
                 </div>
              </div>
           </div>

        </div>
      </div>
    </div>
  );
}

export default function FarmerDashboard({ language, user }: Props) {
  const [centers, setCenters] = useState<Center[]>([]);
  const [activeBooking, setActiveBooking] = useState<Booking | null>(null);

  useEffect(() => {
    fetch('/api/centers')
      .then(res => res.json())
      .then(data => setCenters(data));
      
    // Mocking an active booking instead of fetching from Firestore
    // For demo purposes, we will leave it empty initially or load from localStorage
    const savedBooking = localStorage.getItem('mockBooking');
    if (savedBooking) {
      setActiveBooking(JSON.parse(savedBooking));
    }
  }, []);

  const handleBook = async (bookingData: any) => {
    const newBooking: Booking = {
      id: `BK${Math.floor(Math.random() * 10000)}`,
      ...bookingData,
      farmerName: user?.name || 'Ramesh Yadav',
      status: "Registered",
      token: `A${Math.floor(100 + Math.random() * 900)}`,
      queuePosition: Math.floor(Math.random() * 20) + 1,
    };
    
    setActiveBooking(newBooking);
    localStorage.setItem('mockBooking', JSON.stringify(newBooking));
  };

  return (
    <Routes>
      <Route path="/" element={<Overview language={language} activeBooking={activeBooking} user={user} />} />
      <Route path="/schedule" element={<SlotBooking centers={centers} onBook={handleBook} language={language} />} />
      <Route path="/centers" element={<NearbyCenters centers={centers} />} />
      <Route path="/track" element={<StatusTracking booking={activeBooking} language={language} />} />
      <Route path="/payment" element={<PaymentStatus />} />
      <Route path="/history" element={<HistoryView />} />
      <Route path="/notifications" element={<NotificationsView />} />
      <Route path="/profile" element={<ProfileView />} />
    </Routes>
  );
}
