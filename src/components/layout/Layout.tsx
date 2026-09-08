import { ReactNode } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Home, MapPin, Calendar, Bell, User as UserIcon, LogOut, Menu, Tractor, UserCog, LineChart, FileText, Activity, CreditCard, HelpCircle, MessageSquare, Settings, Leaf } from 'lucide-react';
import { Role, User } from '../../types';
import { supabase } from '../../lib/supabase';

interface Props {
  children: ReactNode;
  role: Role;
  setRole: (role: Role) => void;
  user: User | null;
  setUser: (user: User | null) => void;
  language: 'en' | 'hi';
  setLanguage: (lang: 'en' | 'hi') => void;
}

export default function Layout({ children, role, setRole, user, setUser, language, setLanguage }: Props) {
  const navigate = useNavigate();

  const farmerNav: Array<{path: string, label: string, icon: any, badge?: number, hiddenDesktop?: boolean}> = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/history', label: 'My Procurement', icon: FileText },
    { path: '/centers', label: 'Nearby Centers', icon: MapPin },
    { path: '/schedule', label: 'Schedule', icon: Calendar },
    { path: '/track', label: 'Track Status', icon: Activity },
    { path: '/payment', label: 'Payments', icon: CreditCard },
    { path: '/notifications', label: 'Notifications', icon: Bell, badge: 3 },
    { path: '/profile', label: 'Profile', icon: UserIcon, hiddenDesktop: true },
    { path: '/reports', label: 'Reports', icon: LineChart },
    { path: '/settings', label: 'Settings', icon: Settings },
  ];

  const bottomNav = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/centers', label: 'Centers', icon: MapPin },
    { path: '/schedule', label: 'Procurement', icon: Calendar },
    { path: '/notifications', label: 'Notifications', icon: Bell },
    { path: '/profile', label: 'Profile', icon: UserIcon },
  ];

  const supervisorNav: Array<{path: string, label: string, icon: any, badge?: number, hiddenDesktop?: boolean}> = [ { path: '/', label: 'Dashboard', icon: Home } ];
  const govNav: Array<{path: string, label: string, icon: any, badge?: number, hiddenDesktop?: boolean}> = [ { path: '/', label: 'Overview', icon: LineChart } ];
  
  const navItems = role === 'farmer' ? farmerNav : role === 'supervisor' ? supervisorNav : role === 'gov' ? govNav : [];
  const desktopNav = navItems.filter(n => !n.hiddenDesktop);

  return (
    <div className="min-h-screen bg-[#F4F6F4] flex flex-col md:flex-row font-sans text-slate-900 selection:bg-[#0F7A3B]/20">
      {/* Desktop Sidebar */}
      {role && (
        <aside className="hidden md:flex flex-col w-[280px] bg-white border-r border-slate-100 shadow-[2px_0_10px_rgba(0,0,0,0.02)] fixed inset-y-0 z-20">
          <div className="h-24 flex items-center px-8 border-b border-slate-50 shrink-0 cursor-pointer" onClick={() => navigate('/')}>
            <div className="w-10 h-10 bg-[#0F7A3B] rounded-xl flex items-center justify-center mr-3 shadow-sm shadow-[#0F7A3B]/20">
              <Leaf className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-[#1E3A8A] leading-tight tracking-tight">Krishi-Mitra</h1>
              <p className="text-[10px] text-slate-500 font-medium tracking-wide">Smart Procurement.</p>
            </div>
          </div>
          
          <div className="p-4 flex-1 flex flex-col gap-1 overflow-y-auto">
            {desktopNav.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) => 
                  `flex items-center justify-between px-4 py-3.5 rounded-xl text-sm font-medium transition-all ${
                    isActive ? 'bg-[#0F7A3B]/10 text-[#0F7A3B]' : 'text-slate-500 hover:bg-[#F4F6F4] hover:text-[#1E3A8A]'
                  }`
                }
              >
                <div className="flex items-center gap-3">
                  <item.icon className={`w-5 h-5 ${window.location.pathname === item.path ? 'text-[#0F7A3B]' : 'text-slate-400'}`} />
                  {item.label}
                </div>
                {item.badge && <span className="bg-[#EF4444] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">{item.badge}</span>}
              </NavLink>
            ))}
            
            <div className="mt-auto pt-4 border-t border-slate-50 space-y-1">
              <button className="w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-medium text-slate-500 hover:bg-[#F4F6F4] hover:text-[#1E3A8A] transition-all">
                <HelpCircle className="w-5 h-5 text-slate-400" /> Help & Support
              </button>
              <button onClick={async () => { await supabase.auth.signOut(); setUser(null); setRole(null); navigate('/'); }} className="w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 transition-all">
                <LogOut className="w-5 h-5" /> Logout
              </button>
            </div>
          </div>
        </aside>
      )}

      {/* Main Content */}
      <div className={`flex-1 flex flex-col min-h-screen ${role ? 'md:ml-[280px]' : ''}`}>
        
        {/* Mobile Header */}
        <header className="h-16 bg-white border-b border-slate-100 flex items-center justify-between px-4 sticky top-0 z-30 md:hidden shadow-sm">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
            <div className="w-8 h-8 bg-[#0F7A3B] rounded-lg flex items-center justify-center">
              <Leaf className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-lg font-bold text-[#1E3A8A] tracking-tight">Krishi-Mitra</h1>
          </div>
          <div className="flex items-center gap-4">
            <Bell className="w-5 h-5 text-slate-600" />
            {user && (
               <img src={user.photoURL || `https://ui-avatars.com/api/?name=${user.email}&background=0F7A3B&color=fff`} alt="Avatar" className="w-8 h-8 rounded-full border border-slate-200" onClick={() => navigate('/profile')} />
            )}
          </div>
        </header>

        {/* Desktop Header */}
        {role && (
          <header className="hidden md:flex h-24 bg-[#F4F6F4] items-center justify-between px-8 sticky top-0 z-10 pt-4">
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl shadow-sm border border-slate-100 text-[#1E3A8A]">
               <MapPin className="w-4 h-4 text-[#0F7A3B]" />
               <span className="font-semibold text-sm">Barabanki, Uttar Pradesh</span>
            </div>
            <div className="flex items-center gap-6">
               <select 
                  className="text-sm font-semibold bg-white text-[#1E3A8A] shadow-sm border border-slate-100 rounded-xl px-4 py-2 outline-none cursor-pointer hover:bg-slate-50 transition-colors"
                  value={language}
                  onChange={(e) => setLanguage(e.target.value as 'en' | 'hi')}
                >
                  <option value="en">English (EN)</option>
                  <option value="hi">हिंदी (HI)</option>
                </select>
               
               <div className="relative cursor-pointer bg-white p-2.5 rounded-xl shadow-sm border border-slate-100 hover:bg-slate-50 transition-colors">
                 <Bell className="w-5 h-5 text-slate-600" />
                 <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
               </div>
               
               <div className="flex items-center gap-3 bg-white p-1.5 pr-4 rounded-full shadow-sm border border-slate-100 cursor-pointer hover:bg-slate-50 transition-colors" onClick={() => navigate('/profile')}>
                  <img src={user?.photoURL || `https://ui-avatars.com/api/?name=${user?.email}&background=0F7A3B&color=fff`} alt="Avatar" className="w-10 h-10 rounded-full border border-slate-200" />
                  <div className="text-left">
                    <p className="text-sm font-bold text-[#1E3A8A] leading-tight">{user?.displayName || 'Ramesh Yadav'}</p>
                    <p className="text-[10px] text-slate-500 font-medium">Farmer ID: KM123456</p>
                  </div>
               </div>
            </div>
          </header>
        )}

        {/* Page Content */}
        <main className="flex-1 overflow-x-hidden p-4 sm:p-6 lg:p-8 pb-24 md:pb-8 w-full max-w-7xl mx-auto">
          {children}
        </main>

        {/* Mobile Bottom Navigation */}
        {role && (
          <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-100 pb-safe z-30 shadow-[0_-4px_20px_rgba(0,0,0,0.04)]">
            <div className="flex justify-around items-center h-16 px-1">
              {bottomNav.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) => 
                    `flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors relative ${
                      isActive ? 'text-[#0F7A3B]' : 'text-slate-400 hover:text-slate-900'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <item.icon className={`w-5 h-5 ${isActive ? 'fill-[#0F7A3B]/10' : ''}`} />
                      <span className="text-[10px] font-semibold truncate w-full text-center px-1">{item.label}</span>
                      {item.label === 'Notifications' && <span className="absolute top-3 right-4 w-1.5 h-1.5 bg-red-500 rounded-full"></span>}
                    </>
                  )}
                </NavLink>
              ))}
            </div>
          </nav>
        )}
      </div>
    </div>
  );
}
