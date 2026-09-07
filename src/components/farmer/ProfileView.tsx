import { User, Map, CreditCard, Globe, HelpCircle, MessageSquare, Info, ChevronRight, LogOut } from 'lucide-react';
import { supabase } from '../../lib/supabase';

export default function ProfileView() {
  const menuItems = [
    { icon: User, label: 'Personal Information' },
    { icon: Map, label: 'My Land Details' },
    { icon: CreditCard, label: 'Bank Details' },
    { icon: Globe, label: 'Language', sub: 'English' },
    { icon: HelpCircle, label: 'Help & Support' },
    { icon: MessageSquare, label: 'App Feedback' },
    { icon: Info, label: 'About Kishan Mitra' },
  ];

  return (
    <div className="max-w-2xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center gap-3 mb-2">
         <button onClick={() => window.history.back()} className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm border border-slate-100 hover:bg-slate-50 transition-colors md:hidden">
            <span className="text-xl leading-none">&larr;</span>
         </button>
         <h2 className="text-2xl font-bold text-[#1E3A8A] hidden md:block">Profile</h2>
      </div>

      <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 text-center">
         <img src={`https://ui-avatars.com/api/?name=Ramesh+Yadav&background=0F7A3B&color=fff`} alt="Avatar" className="w-24 h-24 rounded-full border-4 border-slate-50 shadow-md mx-auto mb-4" />
         <h3 className="text-xl font-bold text-[#1E3A8A] mb-1">Ramesh Yadav</h3>
         <p className="text-sm font-medium text-slate-500">Farmer ID: KM123456</p>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden divide-y divide-slate-100">
         {menuItems.map((item, i) => (
           <div key={i} className="flex items-center justify-between p-5 hover:bg-slate-50 cursor-pointer transition-colors group">
              <div className="flex items-center gap-4">
                 <div className="w-10 h-10 bg-[#F4F6F4] rounded-full flex items-center justify-center group-hover:bg-[#0F7A3B]/10 transition-colors">
                    <item.icon className="w-5 h-5 text-slate-500 group-hover:text-[#0F7A3B] transition-colors" />
                 </div>
                 <span className="font-bold text-slate-700 group-hover:text-[#1E3A8A] transition-colors">{item.label}</span>
              </div>
              <div className="flex items-center gap-3">
                 {item.sub && <span className="text-xs font-bold text-[#0F7A3B] bg-[#0F7A3B]/10 px-2 py-1 rounded-md">{item.sub}</span>}
                 <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-[#0F7A3B]" />
              </div>
           </div>
         ))}
         
         <div onClick={async () => { await supabase.auth.signOut(); window.location.href = '/'; }} className="flex items-center justify-between p-5 hover:bg-red-50 cursor-pointer transition-colors group">
            <div className="flex items-center gap-4">
               <div className="w-10 h-10 bg-red-50 rounded-full flex items-center justify-center group-hover:bg-red-100 transition-colors">
                  <LogOut className="w-5 h-5 text-red-500" />
               </div>
               <span className="font-bold text-red-500">Logout</span>
            </div>
         </div>
      </div>
    </div>
  );
}
