import React from 'react';
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell
} from 'recharts';
import { Activity, Zap, TrendingUp, Trophy } from 'lucide-react';

// --- DUMMY DATA ---
const DATA_XP = [
    { name: 'Mon', xp: 400 },
    { name: 'Tue', xp: 300 },
    { name: 'Wed', xp: 550 },
    { name: 'Thu', xp: 450 },
    { name: 'Fri', xp: 800 }, // Weekend raid!
    { name: 'Sat', xp: 950 },
    { name: 'Sun', xp: 600 },
];

const DATA_DISTRIBUTION = [
    { name: 'Quests', value: 40 },
    { name: 'Raids', value: 30 },
    { name: 'Social', value: 20 },
    { name: 'Idle', value: 10 },
];

const COLORS = ['#f59e0b', '#ef4444', '#8b5cf6', '#10b981'];

const Chronicles: React.FC = () => {
    return (
        <div className="p-4 lg:p-8 max-w-7xl mx-auto pb-20 animate-in fade-in duration-500 font-sans text-amber-50">

            {/* --- HEADER --- */}
            <div className="flex items-center gap-3 mb-8">
                <div className="p-2.5 bg-amber-900/20 rounded-xl border border-amber-500/30 shadow-[0_0_15px_rgba(245,158,11,0.2)]">
                    <TrendingUp className="text-amber-500" size={28} />
                </div>
                <div>
                    <h1 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-100 to-amber-600 font-rpg tracking-widest uppercase">
                        Chronicles
                    </h1>
                    <p className="text-amber-500/60 text-xs font-bold uppercase tracking-[0.2em]">
                        Battle Records & Analytics
                    </p>
                </div>
            </div>

            {/* --- STAT CARDS --- */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {[
                    { label: 'Total XP Gained', value: '124,500', icon: <Zap />, color: 'text-amber-400' },
                    { label: 'Quests Completed', value: '42', icon: <Trophy />, color: 'text-emerald-400' },
                    { label: 'Raid Attendance', value: '98%', icon: <Activity />, color: 'text-red-400' },
                ].map((stat, idx) => (
                    <div key={idx} className="bg-black/40 border border-amber-900/30 p-6 rounded-2xl backdrop-blur-md flex items-center gap-4 hover:border-amber-500/30 transition-all">
                        <div className={`p-3 rounded-xl bg-black/40 border border-white/5 ${stat.color}`}>
                            {stat.icon}
                        </div>
                        <div>
                            <p className="text-2xl font-bold font-rpg text-white">{stat.value}</p>
                            <p className="text-[10px] text-amber-500/60 uppercase tracking-widest font-bold">{stat.label}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* --- CHARTS SECTION --- */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* 1. XP GROWTH CHART (Area Chart) */}
                <div className="lg:col-span-2 bg-black/40 border border-amber-900/30 p-6 rounded-3xl backdrop-blur-md">
                    <h3 className="text-sm font-bold text-amber-100 uppercase tracking-widest mb-6 flex items-center gap-2">
                        <TrendingUp size={16} className="text-amber-500" /> Weekly Activity (XP)
                    </h3>
                    <div className="h-64 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={DATA_XP}>
                                <defs>
                                    <linearGradient id="colorXp" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3}/>
                                        <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="#451a03" opacity={0.3} />
                                <XAxis dataKey="name" stroke="#b45309" fontSize={10} tickLine={false} axisLine={false} />
                                <YAxis stroke="#b45309" fontSize={10} tickLine={false} axisLine={false} />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#000', borderColor: '#78350f', borderRadius: '8px', color: '#fff' }}
                                    itemStyle={{ color: '#fbbf24' }}
                                />
                                <Area type="monotone" dataKey="xp" stroke="#f59e0b" strokeWidth={2} fillOpacity={1} fill="url(#colorXp)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* 2. ACTIVITY DISTRIBUTION (Pie Chart) */}
                <div className="bg-black/40 border border-amber-900/30 p-6 rounded-3xl backdrop-blur-md flex flex-col items-center justify-center">
                    <h3 className="text-sm font-bold text-amber-100 uppercase tracking-widest mb-2 w-full text-left flex items-center gap-2">
                        <Zap size={16} className="text-amber-500" /> Mana Usage
                    </h3>
                    <div className="h-48 w-full relative">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={DATA_DISTRIBUTION}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={50}
                                    outerRadius={70}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {DATA_DISTRIBUTION.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} stroke="rgba(0,0,0,0.5)" />
                                    ))}
                                </Pie>
                                <Tooltip contentStyle={{ backgroundColor: '#000', borderColor: '#78350f', borderRadius: '8px' }} />
                            </PieChart>
                        </ResponsiveContainer>
                        {/* Center Text */}
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            <span className="text-xl font-bold text-white font-rpg">100%</span>
                        </div>
                    </div>

                    {/* Legend */}
                    <div className="w-full grid grid-cols-2 gap-2 mt-4">
                        {DATA_DISTRIBUTION.map((entry, index) => (
                            <div key={index} className="flex items-center gap-2 text-[10px] text-amber-500/70 uppercase font-bold">
                                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[index] }}></div>
                                {entry.name}
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Chronicles;