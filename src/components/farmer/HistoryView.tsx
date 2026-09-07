import { FileText, CheckCircle2 } from 'lucide-react';

export default function HistoryView() {
  const history = [
    { id: 1, crop: 'Wheat', weight: '500 kg', date: '12 Sept 2026', price: '₹24,500', status: 'Completed', color: 'bg-amber-100' },
    { id: 2, crop: 'Paddy', weight: '450 kg', date: '25 Aug 2026', price: '₹14,500', status: 'Completed', color: 'bg-green-100' },
    { id: 3, crop: 'Maize', weight: '300 kg', date: '10 July 2026', price: '₹9,600', status: 'Pending', color: 'bg-yellow-100' },
    { id: 4, crop: 'Wheat', weight: '600 kg', date: '15 June 2026', price: '₹20,400', status: 'Completed', color: 'bg-amber-100' },
  ];

  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center gap-3 mb-2">
         <button onClick={() => window.history.back()} className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm border border-slate-100 hover:bg-slate-50 transition-colors">
            <span className="text-xl leading-none">&larr;</span>
         </button>
         <h2 className="text-2xl font-bold text-[#1E3A8A]">My Procurement</h2>
      </div>

      <div className="flex gap-2 bg-[#F4F6F4] p-1.5 rounded-xl w-max mb-6">
         <button className="bg-[#0F7A3B] text-white font-bold px-6 py-2 rounded-lg text-sm shadow-sm">All</button>
         <button className="text-slate-500 hover:text-[#1E3A8A] font-bold px-4 py-2 rounded-lg text-sm transition-colors">Completed</button>
         <button className="text-slate-500 hover:text-[#1E3A8A] font-bold px-4 py-2 rounded-lg text-sm transition-colors">Pending</button>
      </div>

      <div className="space-y-4">
         {history.map((item) => (
           <div key={item.id} className="bg-white p-5 sm:p-6 rounded-3xl shadow-sm border border-slate-100 flex items-center justify-between hover:border-[#0F7A3B]/30 transition-colors cursor-pointer group">
              <div className="flex items-center gap-5">
                 <div className={`w-14 h-14 ${item.color} rounded-2xl flex items-center justify-center text-2xl`}>
                    🌾
                 </div>
                 <div>
                    <h3 className="font-bold text-[#1E3A8A] text-lg leading-tight mb-1">{item.crop}</h3>
                    <p className="text-xs font-medium text-slate-500">{item.weight} • {item.date}</p>
                    <p className="text-[#1E3A8A] font-extrabold mt-2">{item.price}</p>
                 </div>
              </div>
              <div className="flex items-center gap-4">
                 <span className={`px-3 py-1.5 rounded-full text-[10px] font-bold border ${
                    item.status === 'Completed' ? 'bg-[#0F7A3B]/10 text-[#0F7A3B] border-[#0F7A3B]/20' : 'bg-amber-50 text-amber-700 border-amber-200'
                 }`}>
                    {item.status}
                 </span>
                 <span className="text-slate-300 group-hover:text-[#0F7A3B] transition-colors hidden sm:block">
                    <ChevronRight className="w-5 h-5" />
                 </span>
              </div>
           </div>
         ))}
      </div>
    </div>
  );
}

// Needed to add ChevronRight since it was missing in HistoryView imports
import { ChevronRight } from 'lucide-react';
