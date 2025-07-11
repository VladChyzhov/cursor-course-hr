'use client';

export default function UsageCard() {
  return (
    <div className="max-w-4xl mx-auto pt-10">
      <div className="rounded-2xl shadow-xl bg-gradient-to-r from-indigo-500 via-blue-400 to-purple-400 p-8 mb-8 flex flex-col md:flex-row md:items-center md:justify-between relative overflow-hidden">
        <div>
          <div className="uppercase text-xs text-white/80 font-semibold mb-2 tracking-widest">Current Plan</div>
          <div className="text-3xl font-bold text-white mb-2 drop-shadow">Researcher</div>
          <div className="text-sm text-white/80 mb-4">API Usage</div>
          <div className="w-full h-2 bg-white/30 rounded-full mb-2">
            <div className="h-2 bg-white/80 rounded-full" style={{width: '0%'}}></div>
          </div>
          <div className="text-xs text-white/70">0 / 1000 Credits</div>
        </div>
        <button className="absolute top-6 right-6 px-4 py-1 bg-white/90 hover:bg-white text-indigo-600 rounded-lg shadow text-sm font-semibold border border-indigo-100 transition">Manage Plan</button>
      </div>
    </div>
  );
} 