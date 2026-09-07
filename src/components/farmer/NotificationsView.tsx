import { Bell, Calendar, Clock, CreditCard, ChevronRight } from 'lucide-react';

export default function NotificationsView() {
  const notifs = [
    { id: 1, icon: Calendar, title: 'Your procurement slot is confirmed.', desc: '12 Sept 2026, 10:00 AM', time: '2 min ago', type: 'success', bg: 'bg-[#0F7A3B]/10', color: 'text-[#0F7A3B]' },
    { id: 2, icon: Clock, title: 'Only 3 farmers are ahead of you.', desc: 'Your turn is near.', time: '10 min ago', type: 'warning', bg: 'bg-amber-100', color: 'text-amber-600' },
    { id: 3, icon: Bell, title: 'Center XYZ is experiencing high demand.', desc: 'Expect some delays.', time: '45 min ago', type: 'danger', bg: 'bg-red-100', color: 'text-red-600' },
    { id: 4, icon: CreditCard, title: 'Payment of ₹24,500 has been processed.', desc: 'Check your bank account.', time: '2 hours ago', type: 'success', bg: 'bg-[#0F7A3B]/10', color: 'text-[#0F7A3B]' },
    { id: 5, icon: Bell, title: 'New schedule released for next week.', desc: 'Book your slots now.', time: '5 hours ago', type: 'info', bg: 'bg-blue-100', color: 'text-blue-600' },
  ];

  return (
    <div className="max-w-2xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center gap-3 mb-2">
         <button onClick={() => window.history.back()} className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm border border-slate-100 hover:bg-slate-50 transition-colors">
            <span className="text-xl leading-none">&larr;</span>
         </button>
         <h2 className="text-2xl font-bold text-[#1E3A8A]">Notifications</h2>
      </div>

      <div className="flex gap-2 bg-[#F4F6F4] p-1.5 rounded-xl w-max mb-6">
         <button className="bg-[#0F7A3B] text-white font-bold px-6 py-2 rounded-lg text-sm shadow-sm">All</button>
         <button className="text-slate-500 hover:text-[#1E3A8A] font-bold px-4 py-2 rounded-lg text-sm transition-colors">Procurement</button>
         <button className="text-slate-500 hover:text-[#1E3A8A] font-bold px-4 py-2 rounded-lg text-sm transition-colors">Token</button>
         <button className="text-slate-500 hover:text-[#1E3A8A] font-bold px-4 py-2 rounded-lg text-sm transition-colors">Payment</button>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 divide-y divide-slate-100 overflow-hidden">
         {notifs.map((n) => (
            <div key={n.id} className="p-5 sm:p-6 flex items-start justify-between gap-4 hover:bg-[#F4F6F4]/50 transition-colors cursor-pointer group">
               <div className="flex gap-4 sm:gap-5">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${n.bg}`}>
                     <n.icon className={`w-5 h-5 ${n.color}`} />
                  </div>
                  <div>
                     <h4 className="font-bold text-[#1E3A8A] mb-1 leading-tight pr-4">{n.title}</h4>
                     <p className="text-sm font-medium text-slate-500 mb-2">{n.desc}</p>
                     <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{n.time}</p>
                  </div>
               </div>
               <ChevronRight className="w-5 h-5 text-slate-300 mt-2 shrink-0 group-hover:text-[#0F7A3B] transition-colors" />
            </div>
         ))}
      </div>
    </div>
  );
}
