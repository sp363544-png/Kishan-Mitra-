import { useState, useEffect } from 'react';
import { Map, Activity, TrendingUp, AlertOctagon, Download, Clock } from 'lucide-react';

export default function GovDashboard() {
  const [analytics, setAnalytics] = useState<any>(null);

  useEffect(() => {
    fetch('/api/analytics')
      .then(res => res.json())
      .then(data => setAnalytics(data));
  }, []);

  if (!analytics) return <div className="animate-pulse space-y-4">
    <div className="h-10 bg-slate-200 rounded w-1/4"></div>
    <div className="h-40 bg-slate-200 rounded"></div>
  </div>;

  const stats = [
    { label: 'Total Procurement', value: `${(analytics.totalProcurement / 1000).toFixed(1)}k Q`, icon: TrendingUp, color: 'text-emerald-600', bg: 'bg-emerald-100' },
    { label: 'Active Centers', value: analytics.activeCenters, icon: Activity, color: 'text-blue-600', bg: 'bg-blue-100' },
    { label: 'Avg Wait Time', value: analytics.avgWaitTime, icon: Clock, color: 'text-yellow-600', bg: 'bg-yellow-100' },
    { label: 'Anomalies Detected', value: analytics.anomaliesDetected, icon: AlertOctagon, color: 'text-red-600', bg: 'bg-red-100' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">State Nodal Dashboard</h2>
          <p className="text-slate-500 mt-1">Uttar Pradesh - Rabi Season (Wheat)</p>
        </div>
        <button className="bg-white border border-slate-300 text-slate-700 px-4 py-2 rounded-lg flex items-center gap-2 font-medium text-sm hover:bg-slate-50 shadow-sm">
          <Download className="w-4 h-4" />
          Export Reports
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 flex flex-col gap-4">
            <div className="flex justify-between items-start">
              <div className={`w-10 h-10 rounded-full ${stat.bg} ${stat.color} flex items-center justify-center`}>
                <stat.icon className="w-5 h-5" />
              </div>
            </div>
            <div>
              <div className="text-3xl font-bold text-slate-900">{stat.value}</div>
              <div className="text-sm font-medium text-slate-500 uppercase tracking-wide mt-1">{stat.label}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-slate-200 p-6 flex flex-col">
          <h3 className="font-bold text-slate-900 flex items-center gap-2 mb-6">
            <Map className="w-5 h-5 text-slate-400" />
            District Heatmap (Simulated)
          </h3>
          <div className="flex-1 bg-blue-50/50 rounded-lg border border-blue-100 relative min-h-[300px] flex items-center justify-center p-8">
            <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cartographer.png')] rounded-lg"></div>
            
            <div className="relative w-full max-w-lg space-y-4">
              <div className="bg-white p-3 rounded-lg shadow-sm border-l-4 border-red-500 flex justify-between">
                <div>
                  <div className="font-bold">Varanasi District</div>
                  <div className="text-xs text-slate-500">12 Centers Active</div>
                </div>
                <div className="text-right">
                  <div className="text-red-600 font-bold text-sm">High Load</div>
                  <div className="text-xs text-slate-400">92% Cap</div>
                </div>
              </div>
              <div className="bg-white p-3 rounded-lg shadow-sm border-l-4 border-yellow-500 flex justify-between ml-12">
                <div>
                  <div className="font-bold">Ghazipur District</div>
                  <div className="text-xs text-slate-500">8 Centers Active</div>
                </div>
                <div className="text-right">
                  <div className="text-yellow-600 font-bold text-sm">Mod Load</div>
                  <div className="text-xs text-slate-400">65% Cap</div>
                </div>
              </div>
              <div className="bg-white p-3 rounded-lg shadow-sm border-l-4 border-emerald-500 flex justify-between ml-6">
                <div>
                  <div className="font-bold">Chandauli District</div>
                  <div className="text-xs text-slate-500">15 Centers Active</div>
                </div>
                <div className="text-right">
                  <div className="text-emerald-600 font-bold text-sm">Optimal</div>
                  <div className="text-xs text-slate-400">30% Cap</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <h3 className="font-bold text-slate-900 flex items-center gap-2 mb-4">
              <TrendingUp className="w-5 h-5 text-slate-400" />
              7-Day Trend
            </h3>
            <div className="h-48 flex items-end justify-between gap-2 pt-4">
              {analytics.trendData.map((d: any, i: number) => {
                const max = Math.max(...analytics.trendData.map((x: any) => x.volume));
                const height = (d.volume / max) * 100;
                return (
                  <div key={i} className="flex flex-col items-center gap-2 flex-1 group">
                    <div className="w-full relative flex items-end justify-center h-full rounded-t-md overflow-hidden bg-slate-50">
                      <div 
                        className="w-full bg-blue-500 group-hover:bg-blue-600 transition-colors rounded-t-md"
                        style={{ height: `${height}%` }}
                      ></div>
                    </div>
                    <span className="text-xs text-slate-500 whitespace-nowrap">{d.date.split(' ')[1]}</span>
                  </div>
                )
              })}
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm border border-red-200 p-6 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-red-500"></div>
            <h3 className="font-bold text-slate-900 flex items-center gap-2 mb-2">
              <AlertOctagon className="w-5 h-5 text-red-500" />
              Anomaly Alert
            </h3>
            <p className="text-sm text-slate-600 mb-3">
              Ghost tokens detected at Center C2. 15 bookings created from single IP within 5 mins.
            </p>
            <button className="text-sm font-medium text-red-600 hover:text-red-700">
              Review Flagged Tokens &rarr;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
