import { Booking } from '../../types';
import { CheckCircle2, Circle, Navigation, Activity } from 'lucide-react';

interface Props {
  booking: Booking | null;
  language: string;
}

export default function StatusTracking({ booking }: Props) {
  const steps = [
    { id: 1, name: 'Registration', date: '10 Sept 2026, 09:30 AM', status: 'Completed' },
    { id: 2, name: 'Verification', date: '10 Sept 2026, 11:00 AM', status: 'Completed' },
    { id: 3, name: 'Slot Booked', date: '11 Sept 2026, 10:00 AM', status: 'Completed' },
    { id: 4, name: 'Waiting', date: 'Your turn is near', status: 'In Progress' },
    { id: 5, name: 'Procurement', date: '', status: 'Pending' },
    { id: 6, name: 'Quality Check', date: '', status: 'Pending' },
    { id: 7, name: 'Payment', date: '', status: 'Pending' },
  ];

  if (!booking) {
    return (
       <div className="bg-white rounded-3xl p-8 text-center shadow-sm border border-slate-100 mt-4">
         <Activity className="w-12 h-12 text-slate-300 mx-auto mb-4" />
         <h3 className="text-xl font-bold text-[#1E3A8A]">No Active Tracking</h3>
       </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center gap-3 mb-2">
         <button onClick={() => window.history.back()} className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm border border-slate-100 hover:bg-slate-50 transition-colors">
            <span className="text-xl leading-none">&larr;</span>
         </button>
         <h2 className="text-2xl font-bold text-[#1E3A8A]">Track Procurement</h2>
      </div>

      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-100">
         <div className="relative pl-4 sm:pl-8">
            {/* Vertical Line */}
            <div className="absolute top-4 bottom-4 left-[1.35rem] sm:left-[2.35rem] w-1 bg-slate-100 rounded-full"></div>
            
            <div className="space-y-10">
               {steps.map((step, idx) => (
                 <div key={step.id} className="relative flex items-start gap-4 sm:gap-6 group">
                   
                   {/* Indicator */}
                   <div className="relative z-10 shrink-0 mt-1">
                      {step.status === 'Completed' ? (
                        <div className="w-7 h-7 bg-[#0F7A3B] rounded-full flex items-center justify-center shadow-md shadow-[#0F7A3B]/30 border-2 border-white">
                          <CheckCircle2 className="w-4 h-4 text-white" />
                        </div>
                      ) : step.status === 'In Progress' ? (
                        <div className="w-7 h-7 bg-white border-4 border-[#0F7A3B] rounded-full shadow-lg shadow-[#0F7A3B]/20 relative">
                           <div className="absolute inset-0 m-auto w-2 h-2 bg-[#0F7A3B] rounded-full animate-pulse"></div>
                        </div>
                      ) : (
                        <div className="w-7 h-7 bg-white border-4 border-slate-200 rounded-full"></div>
                      )}
                      
                      {/* Active line fill */}
                      {step.status === 'Completed' && idx < steps.length - 1 && (
                         <div className="absolute top-7 left-[13px] w-1 h-14 bg-[#0F7A3B] -z-10"></div>
                      )}
                   </div>

                   {/* Content */}
                   <div className={`flex-1 flex justify-between items-start ${step.status === 'Pending' ? 'opacity-50' : ''}`}>
                      <div>
                        <h4 className={`text-base font-bold ${step.status === 'In Progress' ? 'text-[#1E3A8A]' : 'text-slate-700'}`}>{step.name}</h4>
                        {step.date && <p className="text-xs font-medium text-slate-500 mt-1">{step.date}</p>}
                      </div>
                      
                      {step.status !== 'Pending' && (
                        <span className={`px-3 py-1 rounded-full text-[10px] font-bold shadow-sm border ${
                          step.status === 'Completed' ? 'bg-[#0F7A3B]/10 text-[#0F7A3B] border-[#0F7A3B]/20' : 
                          'bg-[#F59E0B]/10 text-[#F59E0B] border-[#F59E0B]/20'
                        }`}>
                           {step.status}
                        </span>
                      )}
                   </div>
                 </div>
               ))}
            </div>
         </div>
      </div>
    </div>
  );
}
