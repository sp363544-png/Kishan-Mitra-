import { CheckCircle2, Download } from 'lucide-react';

export default function PaymentStatus() {
  return (
    <div className="max-w-md mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center gap-3 mb-2">
         <button onClick={() => window.history.back()} className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm border border-slate-100 hover:bg-slate-50 transition-colors">
            <span className="text-xl leading-none">&larr;</span>
         </button>
         <h2 className="text-2xl font-bold text-[#1E3A8A]">Payment Status</h2>
      </div>

      <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 text-center">
         <div className="w-20 h-20 bg-[#0F7A3B]/10 rounded-full flex items-center justify-center mx-auto mb-6 relative">
            <div className="absolute inset-0 rounded-full border-2 border-[#0F7A3B]/20 animate-[ping_2s_ease-out_infinite]"></div>
            <CheckCircle2 className="w-10 h-10 text-[#0F7A3B]" />
         </div>
         
         <h3 className="text-lg font-bold text-[#1E3A8A] mb-1">Payment Processed Successfully</h3>
         <p className="text-sm text-slate-500 font-medium mb-8">Payment has been credited to your registered bank account.</p>

         <div className="text-4xl font-extrabold text-[#1E3A8A] mb-8">
            ₹ 24,500
         </div>

         <div className="space-y-4 text-left border-t border-slate-100 pt-6">
            <div className="flex justify-between items-center pb-4 border-b border-slate-50">
               <span className="text-sm font-bold text-slate-400 uppercase tracking-wider">Commodity</span>
               <span className="font-bold text-[#1E3A8A]">Wheat</span>
            </div>
            <div className="flex justify-between items-center pb-4 border-b border-slate-50">
               <span className="text-sm font-bold text-slate-400 uppercase tracking-wider">Quantity</span>
               <span className="font-bold text-[#1E3A8A]">500 kg</span>
            </div>
            <div className="flex justify-between items-center pb-4 border-b border-slate-50">
               <span className="text-sm font-bold text-slate-400 uppercase tracking-wider">Date</span>
               <span className="font-bold text-[#1E3A8A]">12 Sept 2026</span>
            </div>
            <div className="flex justify-between items-center">
               <span className="text-sm font-bold text-slate-400 uppercase tracking-wider">Transaction ID</span>
               <span className="font-bold text-[#1E3A8A] font-mono">TXN789456123</span>
            </div>
         </div>

         <button className="w-full mt-8 bg-[#0F7A3B] hover:bg-[#0F7A3B]/90 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-[#0F7A3B]/20">
            View Receipt <Download className="w-5 h-5" />
         </button>
      </div>
    </div>
  );
}
