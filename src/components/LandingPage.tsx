import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Leaf, ChevronRight, ShieldCheck } from 'lucide-react';
import { signInWithGoogle, auth } from '../lib/firebase';
import { Role } from '../types';

interface Props {
  language: 'en' | 'hi';
  setRole: (role: Role) => void;
}

export default function LandingPage({ language, setRole }: Props) {
  const [step, setStep] = useState(1);
  const user = auth.currentUser;

  const languages = [
    { code: 'en', label: 'English', native: 'English' },
    { code: 'hi', label: 'Hindi', native: 'हिंदी' },
    { code: 'pa', label: 'Punjabi', native: 'ਪੰਜਾਬੀ' },
    { code: 'gu', label: 'Gujarati', native: 'ગુજરાતી' },
    { code: 'mr', label: 'Marathi', native: 'मराठी' },
    { code: 'ta', label: 'Tamil', native: 'தமிழ்' },
  ];

  const handleLogin = async () => {
    try {
      await signInWithGoogle();
      setRole('farmer'); // Default routing for demo
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-[90vh] bg-white rounded-3xl overflow-hidden shadow-2xl border border-slate-100 max-w-7xl mx-auto w-full my-4 lg:my-8">
      
      {/* Left Area - Hero & Branding */}
      <div className="hidden lg:flex flex-1 bg-[#F4F6F4] p-12 flex-col justify-between relative overflow-hidden">
         {/* Decorative Background */}
         <div className="absolute top-0 right-0 w-96 h-96 bg-[#0F7A3B]/5 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
         <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#F59E0B]/5 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2"></div>
         
         <div className="relative z-10">
           <div className="flex items-center gap-3 mb-12">
              <div className="w-12 h-12 bg-[#0F7A3B] rounded-xl flex items-center justify-center shadow-lg shadow-[#0F7A3B]/30">
                <Leaf className="w-7 h-7 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-[#1E3A8A] tracking-tight">Kishan Mitra</h1>
           </div>

           <h2 className="text-5xl font-extrabold text-[#1E3A8A] leading-[1.1] mb-6">
             Smart Procurement.<br/>
             <span className="text-[#0F7A3B]">Less Waiting.</span><br/>
             More Certainty.
           </h2>
           
           <p className="text-lg text-slate-600 max-w-md font-medium">
             Track procurement schedules, monitor your queue and stay updated at every step.
           </p>
           
           <div className="mt-8 flex items-center gap-2 px-4 py-2 bg-white rounded-full w-max shadow-sm text-sm font-bold text-[#0F7A3B] border border-slate-100">
             <ShieldCheck className="w-5 h-5" />
             Government Backed Initiative
           </div>
         </div>

         <div className="relative z-10 grid grid-cols-3 gap-6 mt-16">
            <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100">
              <p className="font-bold text-[#1E3A8A] mb-1">Real-Time Updates</p>
              <p className="text-xs text-slate-500 font-medium">Never miss a status change.</p>
            </div>
            <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100">
              <p className="font-bold text-[#1E3A8A] mb-1">Live Queue Tracking</p>
              <p className="text-xs text-slate-500 font-medium">Know exactly when to arrive.</p>
            </div>
            <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100">
              <p className="font-bold text-[#1E3A8A] mb-1">Transparent Process</p>
              <p className="text-xs text-slate-500 font-medium">Clear insights into payments.</p>
            </div>
         </div>
      </div>

      {/* Right Area - Onboarding / Auth */}
      <div className="flex-1 p-6 sm:p-12 lg:p-20 flex flex-col justify-center bg-white relative">
        <AnimatePresence mode="wait">
          
          {step === 1 && (
            <motion.div 
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="w-full max-w-sm mx-auto"
            >
              <div className="lg:hidden flex items-center justify-center gap-2 mb-12">
                <div className="w-10 h-10 bg-[#0F7A3B] rounded-xl flex items-center justify-center shadow-lg">
                  <Leaf className="w-6 h-6 text-white" />
                </div>
                <h1 className="text-2xl font-bold text-[#1E3A8A]">Kishan Mitra</h1>
              </div>

              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-[#1E3A8A] mb-2">Select Your Language</h3>
                <p className="text-sm text-slate-500 font-medium">Choose your language<br/>अपनी भाषा चुनें</p>
              </div>

              <div className="space-y-3">
                {languages.map((lang) => (
                  <button 
                    key={lang.code}
                    onClick={() => setStep(2)}
                    className="w-full flex items-center justify-between p-4 rounded-2xl border-2 border-slate-100 hover:border-[#0F7A3B] hover:bg-[#F4F6F4] transition-all group"
                  >
                    <div className="flex items-center gap-4">
                       <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-500 group-hover:bg-white group-hover:text-[#0F7A3B]">
                         {lang.code.toUpperCase()}
                       </div>
                       <div className="text-left">
                         <p className="font-bold text-[#1E3A8A]">{lang.native}</p>
                         <p className="text-xs font-medium text-slate-500">{lang.label}</p>
                       </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-[#0F7A3B]" />
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div 
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="w-full max-w-sm mx-auto"
            >
              <div className="text-center mb-10">
                <div className="w-16 h-16 bg-[#0F7A3B] rounded-2xl flex items-center justify-center shadow-xl shadow-[#0F7A3B]/30 mx-auto mb-6">
                  <Leaf className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-[#1E3A8A] mb-2">Login to Kishan Mitra</h3>
                <p className="text-sm text-slate-500 font-medium">Welcome Back!<br/>Sign in to continue</p>
              </div>

              <div className="flex bg-[#F4F6F4] rounded-xl p-1.5 mb-8">
                <button className="flex-1 bg-white shadow-sm text-[#0F7A3B] font-bold py-2.5 rounded-lg text-sm">Farmer</button>
                <button className="flex-1 text-slate-500 font-medium hover:text-[#1E3A8A] py-2.5 rounded-lg text-sm transition-colors">Operator</button>
                <button className="flex-1 text-slate-500 font-medium hover:text-[#1E3A8A] py-2.5 rounded-lg text-sm transition-colors">Admin</button>
              </div>

              <div className="space-y-5">
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-2">Mobile Number</label>
                  <div className="flex border-2 border-slate-100 rounded-xl overflow-hidden focus-within:border-[#0F7A3B] transition-colors">
                    <div className="bg-slate-50 px-4 py-3 border-r border-slate-100 text-[#1E3A8A] font-bold">+91</div>
                    <input type="tel" placeholder="Enter mobile number" className="flex-1 px-4 py-3 outline-none text-[#1E3A8A] font-bold placeholder:font-normal placeholder:text-slate-400" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-2">Password</label>
                  <div className="flex border-2 border-slate-100 rounded-xl overflow-hidden focus-within:border-[#0F7A3B] transition-colors">
                    <input type="password" placeholder="Enter password" className="flex-1 px-4 py-3 outline-none text-[#1E3A8A] font-bold placeholder:font-normal placeholder:text-slate-400" />
                  </div>
                  <div className="text-right mt-2">
                    <a href="#" className="text-xs font-bold text-[#0F7A3B] hover:underline">Forgot Password?</a>
                  </div>
                </div>

                <button className="w-full bg-[#0F7A3B] hover:bg-[#0F7A3B]/90 text-white font-bold py-4 rounded-xl shadow-lg shadow-[#0F7A3B]/30 transition-all active:scale-95">
                  Login
                </button>

                <div className="relative flex items-center py-4">
                  <div className="flex-grow border-t border-slate-100"></div>
                  <span className="flex-shrink-0 mx-4 text-xs font-bold text-slate-400">OR</span>
                  <div className="flex-grow border-t border-slate-100"></div>
                </div>

                <button onClick={handleLogin} className="w-full bg-white border-2 border-slate-100 hover:border-[#0F7A3B] text-[#1E3A8A] font-bold py-4 rounded-xl shadow-sm transition-all flex items-center justify-center gap-3">
                  <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5" />
                  Continue with Google
                </button>

                <p className="text-center text-sm font-medium text-slate-500 mt-6">
                  Don't have an account? <a href="#" className="text-[#0F7A3B] font-bold hover:underline">Register</a>
                </p>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  );
}
