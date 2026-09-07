import { useState } from 'react';
import { Center } from '../../types';
import { MapPin, Search, Navigation } from 'lucide-react';

interface Props {
  centers: Center[];
}

export default function NearbyCenters({ centers }: Props) {
  const [view, setView] = useState<'list' | 'map'>('list');

  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center gap-3 mb-2">
         <button onClick={() => window.history.back()} className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm border border-slate-100 hover:bg-slate-50 transition-colors">
            <span className="text-xl leading-none">&larr;</span>
         </button>
         <h2 className="text-2xl font-bold text-[#1E3A8A]">Nearby Centers</h2>
      </div>

      <div className="flex items-center gap-4">
         <div className="flex-1 bg-white border border-slate-200 rounded-xl px-4 py-3.5 flex items-center gap-3 shadow-sm focus-within:border-[#0F7A3B] transition-colors">
            <Search className="w-5 h-5 text-slate-400" />
            <input type="text" placeholder="Search by district, village or PIN" className="flex-1 outline-none text-[#1E3A8A] font-medium placeholder:font-normal placeholder:text-slate-400" />
         </div>
         <div className="flex bg-[#F4F6F4] p-1.5 rounded-xl">
            <button onClick={() => setView('map')} className={`px-4 py-2 text-sm font-bold rounded-lg transition-all ${view === 'map' ? 'bg-white shadow-sm text-[#0F7A3B]' : 'text-slate-500 hover:text-[#1E3A8A]'}`}>Map</button>
            <button onClick={() => setView('list')} className={`px-4 py-2 text-sm font-bold rounded-lg transition-all ${view === 'list' ? 'bg-white shadow-sm text-[#0F7A3B]' : 'text-slate-500 hover:text-[#1E3A8A]'}`}>List</button>
         </div>
      </div>

      {view === 'list' && (
        <div className="space-y-4">
          {centers.map(center => (
            <div key={center.id} className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:border-[#0F7A3B]/30 transition-all cursor-pointer">
               <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#0F7A3B]/10 flex items-center justify-center shrink-0">
                     <MapPin className="w-6 h-6 text-[#0F7A3B]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#1E3A8A] text-lg mb-1">{center.name}</h3>
                    <p className="text-slate-500 text-sm font-medium mb-3">{center.distance} • Varanasi</p>
                    
                    <div className="flex items-center gap-4 text-xs font-bold">
                       <span className={`px-3 py-1 rounded-full border ${center.status === 'red' ? 'bg-red-50 text-red-700 border-red-200' : center.status === 'yellow' ? 'bg-amber-50 text-amber-700 border-amber-200' : 'bg-green-50 text-green-700 border-green-200'}`}>
                          {center.status === 'red' ? 'Heavy Queue' : center.status === 'yellow' ? 'Moderate Queue' : 'Light Queue'}
                       </span>
                       <span className="text-slate-500 flex items-center gap-1">Queue: {center.status === 'red' ? '45' : center.status === 'yellow' ? '18' : '6'} farmers</span>
                    </div>
                  </div>
               </div>
               <div className="flex flex-row md:flex-col gap-3 md:items-end">
                  <div className="text-left md:text-right flex-1">
                     <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-1">Est. Wait</p>
                     <p className="font-bold text-[#1E3A8A]">{center.status === 'red' ? '3+ hrs' : center.status === 'yellow' ? '1 hr' : '15 min'}</p>
                  </div>
                  <button className="bg-[#0F7A3B] hover:bg-[#0F7A3B]/90 text-white text-sm font-bold px-6 py-2.5 rounded-xl transition-colors shadow-sm">
                     Get Directions
                  </button>
               </div>
            </div>
          ))}
        </div>
      )}

      {view === 'map' && (
         <div className="bg-slate-100 h-[500px] rounded-3xl border border-slate-200 flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('https://maps.gstatic.com/mapfiles/api-3/images/cb_scout5_hq.png')] opacity-20 bg-cover bg-center mix-blend-multiply"></div>
            <div className="text-center relative z-10 bg-white/90 backdrop-blur px-6 py-4 rounded-2xl shadow-lg border border-slate-200">
               <MapPin className="w-8 h-8 text-[#0F7A3B] mx-auto mb-2" />
               <p className="font-bold text-[#1E3A8A]">Interactive Map View</p>
               <p className="text-sm text-slate-500 font-medium mt-1">Shows all centers in your radius</p>
            </div>
         </div>
      )}
    </div>
  );
}
