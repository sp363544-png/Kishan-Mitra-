import { motion } from 'motion/react';
import { QRCodeSVG } from 'qrcode.react';
import { Booking } from '../../types';
import { Clock, Users, ArrowRight } from 'lucide-react';

interface Props {
  booking: Booking | null;
  language: 'en' | 'hi';
}

export default function DigitalToken({ booking, language }: Props) {
  if (!booking) {
    return (
      <div className="text-center py-12">
        <p className="text-slate-500">
          {language === 'hi' ? 'कोई सक्रिय टोकन नहीं। कृपया एक स्लॉट बुक करें।' : 'No active token. Please book a slot.'}
        </p>
      </div>
    );
  }

  const t = {
    tokenNumber: language === 'hi' ? 'टोकन नंबर' : 'Token Number',
    queuePos: language === 'hi' ? 'कतार में स्थान' : 'Queue Position',
    estWait: language === 'hi' ? 'अनुमानित प्रतीक्षा' : 'Est. Wait Time',
    offline: language === 'hi' ? 'यह QR कोड ऑफलाइन काम करता है' : 'This QR code works offline',
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="max-w-md mx-auto"
    >
      <div className="bg-emerald-900 border-2 border-emerald-800 rounded-2xl shadow-xl overflow-hidden">
        <div className="p-6 text-center text-white">
          <h2 className="text-xs font-black opacity-80 text-emerald-300 uppercase tracking-widest">{t.tokenNumber}</h2>
          <div className="text-5xl font-black mt-1 tracking-tight text-white">{booking.token}</div>
          <p className="mt-2 text-emerald-200 text-sm font-medium">{booking.centerId} • {booking.date}</p>
        </div>
        
        <div className="p-8 flex flex-col items-center border-t border-emerald-800 bg-emerald-950/50">
          <div className="bg-white p-4 rounded-xl shadow-lg border border-emerald-800">
            <QRCodeSVG value={JSON.stringify(booking)} size={160} />
          </div>
          <p className="text-xs text-emerald-400/80 mt-4 text-center">{t.offline}</p>
        </div>

        <div className="p-6 bg-emerald-900 grid grid-cols-2 gap-4 border-t border-emerald-800">
          <div className="bg-emerald-800/50 p-4 rounded-xl shadow-sm border border-emerald-700/50 text-center">
            <Users className="w-6 h-6 mx-auto text-emerald-400 mb-2" />
            <div className="text-2xl font-bold text-white">{booking.queuePosition}</div>
            <div className="text-[10px] font-bold text-emerald-300 uppercase tracking-wide mt-1">{t.queuePos}</div>
          </div>
          <div className="bg-emerald-800/50 p-4 rounded-xl shadow-sm border border-emerald-700/50 text-center">
            <Clock className="w-6 h-6 mx-auto text-emerald-400 mb-2" />
            <div className="text-2xl font-bold text-white">{booking.queuePosition * 5} <span className="text-sm font-normal text-emerald-300">m</span></div>
            <div className="text-[10px] font-bold text-emerald-300 uppercase tracking-wide mt-1">{t.estWait}</div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
