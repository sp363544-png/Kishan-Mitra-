import { useState } from 'react';
import { Center } from '../../types';
import { Calendar, MapPin, ChevronRight, CheckCircle2 } from 'lucide-react';

interface Props {
  centers: Center[];
  onBook: (booking: any) => void;
  language: string;
}

export default function SlotBooking({ centers, onBook }: Props) {
  const [selectedCenter, setSelectedCenter] = useState('');
  const [selectedCrop, setSelectedCrop] = useState('Wheat');
  const [quantity, setQuantity] = useState('500');
  const [selectedDate, setSelectedDate] = useState('2026-09-12');
  const [selectedTime, setSelectedTime] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const dates = [
    { id: 1, day: 'Mon', date: '10', active: false },
    { id: 2, day: 'Tue', date: '11', active: false },
    { id: 3, day: 'Wed', date: '12', active: true },
    { id: 4, day: 'Thu', date: '13', active: false },
    { id: 5, day: 'Fri', date: '14', active: false },
  ];

  const slots = [
    { time: '09:00 AM', available: true },
    { time: '10:00 AM', available: false },
    { time: '11:00 AM', available: true },
    { time: '12:00 PM', available: true },
    { time: '01:00 PM', available: true },
  ];

  const handleBook = () => {
    if(!selectedCenter || !selectedTime) return;
    onBook({
      centerId: selectedCenter,
      crop: selectedCrop,
      quantity,
      date: '12 Sept 2026',
      time: selectedTime
    });
    setIsSuccess(true);
    setTimeout(() => {
       window.history.back();
    }, 2000);
  };

  if (isSuccess) {
    return (
      <div className="max-w-md mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 mt-20 text-center">
         <div className="w-24 h-24 bg-[#0F7A3B] rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl shadow-[#0F7A3B]/30 animate-bounce">
            <CheckCircle2 className="w-12 h-12 text-white" />
         </div>
         <h2 className="text-3xl font-bold text-[#1E3A8A] mb-2">Slot Booked!</h2>
         <p className="text-slate-500 font-medium">Your procurement slot is confirmed.<br/>Redirecting to dashboard...</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center gap-3 mb-2">
         <button onClick={() => window.history.back()} className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm border border-slate-100 hover:bg-slate-50 transition-colors">
            <span className="text-xl leading-none">&larr;</span>
         </button>
         <h2 className="text-2xl font-bold text-[#1E3A8A]">Procurement Schedule</h2>
      </div>

      <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 space-y-6">
         
         {/* Center & Crop Selection */}
         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
               <label className="block text-xs font-bold text-slate-500 mb-2 uppercase tracking-wider">Select Center</label>
               <select 
                  className="w-full bg-[#F4F6F4] border border-slate-200 text-[#1E3A8A] font-bold rounded-xl px-4 py-3.5 outline-none focus:border-[#0F7A3B] transition-colors"
                  value={selectedCenter} onChange={e => setSelectedCenter(e.target.value)}
               >
                  <option value="" disabled>Choose a center...</option>
                  {centers.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
               </select>
            </div>
            <div className="flex gap-4">
               <div className="flex-1">
                 <label className="block text-xs font-bold text-slate-500 mb-2 uppercase tracking-wider">Select Crop</label>
                 <select 
                    className="w-full bg-[#F4F6F4] border border-slate-200 text-[#1E3A8A] font-bold rounded-xl px-4 py-3.5 outline-none focus:border-[#0F7A3B] transition-colors"
                    value={selectedCrop} onChange={e => setSelectedCrop(e.target.value)}
                 >
                    <option value="Wheat">Wheat</option>
                    <option value="Paddy">Paddy</option>
                    <option value="Maize">Maize</option>
                 </select>
               </div>
               <div className="w-24">
                 <label className="block text-xs font-bold text-slate-500 mb-2 uppercase tracking-wider">Qty (kg)</label>
                 <input 
                    type="number" 
                    className="w-full bg-[#F4F6F4] border border-slate-200 text-[#1E3A8A] font-bold rounded-xl px-4 py-3.5 outline-none focus:border-[#0F7A3B] transition-colors"
                    value={quantity} onChange={e => setQuantity(e.target.value)}
                 />
               </div>
            </div>
         </div>

         {/* Calendar Strip */}
         <div className="pt-4 border-t border-slate-100">
            <div className="flex justify-between items-center mb-4">
               <h3 className="font-bold text-[#1E3A8A]">September 2026</h3>
               <div className="flex gap-2">
                  <button className="w-8 h-8 rounded-lg border border-slate-200 flex items-center justify-center text-slate-400">&lt;</button>
                  <button className="w-8 h-8 rounded-lg border border-slate-200 flex items-center justify-center text-slate-400">&gt;</button>
               </div>
            </div>
            
            <div className="flex justify-between gap-2">
               {dates.map((d) => (
                  <button 
                     key={d.id}
                     className={`flex-1 py-3 rounded-2xl flex flex-col items-center justify-center transition-all ${
                        d.active ? 'bg-[#0F7A3B] text-white shadow-md shadow-[#0F7A3B]/30' : 'bg-[#F4F6F4] text-slate-500 hover:bg-slate-200'
                     }`}
                  >
                     <span className={`text-[10px] font-bold uppercase mb-1 ${d.active ? 'text-[#0F7A3B]/20 bg-white/20 px-2 rounded' : ''}`}>{d.day}</span>
                     <span className="text-lg font-bold">{d.date}</span>
                  </button>
               ))}
            </div>
         </div>

         {/* Time Slots */}
         <div className="pt-4 border-t border-slate-100">
            <h3 className="font-bold text-[#1E3A8A] mb-4">Available Slots - 12 Sept 2026</h3>
            <div className="space-y-3">
               {slots.map((s, i) => (
                  <label key={i} className={`flex items-center justify-between p-4 rounded-2xl border transition-all cursor-pointer ${
                     s.available ? 
                        selectedTime === s.time ? 'border-[#0F7A3B] bg-[#0F7A3B]/5' : 'border-slate-100 hover:border-[#0F7A3B]/50'
                     : 'border-slate-100 opacity-50 cursor-not-allowed bg-slate-50'
                  }`}>
                     <div className="flex items-center gap-4">
                        <input type="radio" name="slot" disabled={!s.available} onChange={() => setSelectedTime(s.time)} checked={selectedTime === s.time} className="w-4 h-4 text-[#0F7A3B] focus:ring-[#0F7A3B]" />
                        <span className={`font-bold ${!s.available ? 'text-slate-400' : 'text-[#1E3A8A]'}`}>{s.time}</span>
                     </div>
                     <span className={`px-3 py-1 rounded-lg text-xs font-bold ${
                        s.available ? 'bg-[#0F7A3B]/10 text-[#0F7A3B]' : 'bg-red-50 text-red-500'
                     }`}>
                        {s.available ? 'Available' : 'Booked'}
                     </span>
                  </label>
               ))}
            </div>
         </div>

         <button 
           disabled={!selectedCenter || !selectedTime}
           onClick={handleBook}
           className="w-full bg-[#0F7A3B] hover:bg-[#0F7A3B]/90 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-[#0F7A3B]/20 mt-4"
         >
            Book Slot
         </button>
      </div>
    </div>
  );
}
