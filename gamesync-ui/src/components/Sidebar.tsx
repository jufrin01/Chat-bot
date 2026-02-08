import React from 'react';
import { LayoutDashboard, Calendar, Users, Settings } from 'lucide-react';
import Logo from '../assets/Logo';

// Definisi Interface untuk Props navigasi
interface SidebarProps {
    activeTab: 'chat' | 'schedule' | 'squads' | 'settings';
    setActiveTab: (tab: 'chat' | 'schedule' | 'squads' | 'settings') => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {

    // Menu Utama (AI Planner & Schedule)
    const mainItems = [
        {
            id: 'chat',
            label: 'AI Planner',
            icon: <LayoutDashboard size={20} />
        },
        {
            id: 'schedule',
            label: 'Schedule',
            icon: <Calendar size={20} />
        },
    ];

    // Menu Sosial & Pengaturan (Squads & Settings)
    const secondaryItems = [
        {
            id: 'squads',
            label: 'Squads',
            icon: <Users size={20} />
        },
        {
            id: 'settings',
            label: 'Settings',
            icon: <Settings size={20} />
        },
    ];

    return (
        <div className="flex flex-col h-full p-4 bg-slate-900/50">

            {/* BRAND LOGO */}
            <div className="flex items-center gap-3 px-2 mb-10">
                <Logo size={32} className="shadow-lg shadow-indigo-500/20" />
                <span className="text-xl font-black tracking-tighter text-white uppercase">GameSync</span>
            </div>

            {/* NAVIGASI UTAMA */}
            <div className="space-y-1 mb-8">
                <p className="px-4 mb-2 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Main Menu</p>
                {mainItems.map((item) => (
                    <button
                        key={item.id}
                        onClick={() => setActiveTab(item.id as any)}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                            activeTab === item.id
                                ? 'bg-indigo-600/10 text-indigo-400 border border-indigo-500/20 shadow-[0_0_20px_rgba(79,70,229,0.1)]'
                                : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200 border border-transparent'
                        }`}
                    >
            <span className={`${activeTab === item.id ? 'text-indigo-400' : 'text-slate-500 group-hover:text-slate-300'}`}>
              {item.icon}
            </span>
                        <span className="font-bold text-sm tracking-wide">{item.label}</span>
                    </button>
                ))}
            </div>

            {/* NAVIGASI SEKUNDER */}
            <div className="space-y-1">
                <p className="px-4 mb-2 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Social & Tools</p>
                {secondaryItems.map((item) => (
                    <button
                        key={item.id}
                        onClick={() => setActiveTab(item.id as any)}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                            activeTab === item.id
                                ? 'bg-indigo-600/10 text-indigo-400 border border-indigo-500/20 shadow-[0_0_20px_rgba(79,70,229,0.1)]'
                                : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200 border border-transparent'
                        }`}
                    >
            <span className={`${activeTab === item.id ? 'text-indigo-400' : 'text-slate-500 group-hover:text-slate-300'}`}>
              {item.icon}
            </span>
                        <span className="font-bold text-sm tracking-wide">{item.label}</span>
                    </button>
                ))}
            </div>

            {/* STATUS SYSTEM (Backend Identity) */}
            <div className="mt-auto p-4 rounded-2xl bg-slate-950/50 border border-slate-800">
                <div className="flex items-center gap-2 mb-1">
                    <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">System Status</span>
                </div>
                <p className="text-[10px] text-emerald-500/80 font-mono tracking-tighter uppercase">Spring Boot Active</p>
            </div>
        </div>
    );
};

export default Sidebar;