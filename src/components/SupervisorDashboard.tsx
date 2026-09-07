import { useState, useEffect } from 'react';
import { Users, Truck, AlertTriangle, CheckSquare, BarChart3, Clock } from 'lucide-react';
import { Booking } from '../types';

export default function SupervisorDashboard() {
  const [bookings, setBookings] = useState<Booking[]>([]);

  useEffect(() => {
    fetch('/api/bookings')
      .then(res => res.json())
      .then(data => setBookings(data));
  }, []);

  const stats = [
    { label: 'Farmers in Queue', value: '42', icon: Users, color: 'text-blue-600', bg: 'bg-blue-100' },
    { label: 'Processing Rate', value: '15/hr', icon: Clock, color: 'text-emerald-600', bg: 'bg-emerald-100' },
    { label: 'Trucks Needed', value: '3', icon: Truck, color: 'text-orange-600', bg: 'bg-orange-100' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Manduadih Mandi</h2>
          <p className="text-slate-500 mt-1">Center Supervisor Dashboard</p>
        </div>
        <div className="bg-red-50 text-red-700 px-4 py-2 rounded-lg border border-red-200 flex items-center gap-2 font-medium text-sm">
          <AlertTriangle className="w-4 h-4" />
          High surge predicted tomorrow
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 flex items-center gap-4">
            <div className={`w-12 h-12 rounded-full ${stat.bg} ${stat.color} flex items-center justify-center`}>
              <stat.icon className="w-6 h-6" />
            </div>
            <div>
              <div className="text-3xl font-bold text-slate-900">{stat.value}</div>
              <div className="text-sm font-medium text-slate-500 uppercase tracking-wide">{stat.label}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center bg-slate-50/50">
            <h3 className="font-bold text-slate-900">Live Queue (Token View)</h3>
            <span className="text-sm bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full font-medium">Counter 1 & 2 Active</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-white border-b border-slate-200 text-sm text-slate-500">
                  <th className="py-3 px-6 font-medium">Token</th>
                  <th className="py-3 px-6 font-medium">Farmer</th>
                  <th className="py-3 px-6 font-medium">Crop</th>
                  <th className="py-3 px-6 font-medium">Status</th>
                  <th className="py-3 px-6 font-medium">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {bookings.map((booking) => (
                  <tr key={booking.id} className="hover:bg-slate-50">
                    <td className="py-3 px-6 font-bold text-slate-900">{booking.token}</td>
                    <td className="py-3 px-6 text-slate-600">{booking.farmerName}</td>
                    <td className="py-3 px-6 text-slate-600">{booking.crop} • {booking.quantity}Q</td>
                    <td className="py-3 px-6">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        booking.status === 'Registered' ? 'bg-blue-100 text-blue-700' :
                        booking.status === 'Weighed' ? 'bg-purple-100 text-purple-700' :
                        'bg-emerald-100 text-emerald-700'
                      }`}>
                        {booking.status}
                      </span>
                    </td>
                    <td className="py-3 px-6">
                      <button className="text-sm font-medium text-emerald-600 hover:text-emerald-800 bg-emerald-50 px-3 py-1 rounded-md">
                        Process
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <h3 className="font-bold text-slate-900 flex items-center gap-2 mb-4">
              <BarChart3 className="w-5 h-5 text-slate-400" />
              7-Day Demand Forecast
            </h3>
            <div className="space-y-4">
              {[
                { day: 'Today', load: 85, color: 'bg-red-500' },
                { day: 'Tomorrow', load: 92, color: 'bg-red-600' },
                { day: 'Wed', load: 45, color: 'bg-yellow-500' },
                { day: 'Thu', load: 30, color: 'bg-emerald-500' },
              ].map(d => (
                <div key={d.day}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-medium text-slate-700">{d.day}</span>
                    <span className="text-slate-500">{d.load}% Capacity</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2">
                    <div className={`${d.color} h-2 rounded-full`} style={{ width: `${d.load}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <h3 className="font-bold text-slate-900 flex items-center gap-2 mb-4">
              <CheckSquare className="w-5 h-5 text-slate-400" />
              Quality Check entry
            </h3>
            <p className="text-sm text-slate-500 mb-4">Quick input for FAQ norms (moisture, foreign matter).</p>
            <button className="w-full bg-slate-900 text-white rounded-lg py-2 font-medium hover:bg-slate-800">
              Open QC Interface
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
