import React from 'react';
import {
    LayoutDashboard,
    Calendar,
    Users,
    Settings,
    Sword,
    Scroll
} from 'lucide-react';

// Definisi Interface untuk Props navigasi
interface SidebarProps {
    activeTab: 'chat' | 'schedule' | 'squads' | 'settings';
    setActiveTab: (tab: 'chat' | 'schedule' | 'squads' | 'settings') => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {

    // Menu Utama (Quest & Tavern)
    const mainItems = [
        {
            id: 'chat',
            label: 'Tavern Chat',
            icon: <Scroll size={20} />
        },
        {
            id: 'schedule',
            label: 'Quest Board',
            icon: <Calendar size={20} />
        },
    ];

    // Menu Guild & Inventory
    const secondaryItems = [
        {
            id: 'squads',
            label: 'My Guild',
            icon: <Users size={20} />
        },
        {
            id: 'settings',
            label: 'Inventory',
            icon: <Settings size={20} />
        },
    ];

    return (
        <div className="flex flex-col h-full w-full bg-black/40 backdrop-blur-xl border-r border-amber-900/30">

            {/* --- BRAND LOGO --- */}
            <div className="h-20 flex items-center justify-center lg:justify-start px-0 lg:px-6 border-b border-amber-900/30 mb-6">
                <div className="group relative flex items-center gap-3 cursor-pointer">
                    {/* Icon Logo (Sword) */}
                    <div className="p-2.5 bg-gradient-to-br from-amber-700 to-black rounded-xl border border-amber-500/30 shadow-[0_0_15px_rgba(245,158,11,0.2)] relative overflow-hidden">
                        {/* Shine Effect */}
                        <div className="absolute inset-0 bg-white/20 skew-x-12 -translate-x-full group-hover:animate-shine"></div>
                        <Sword size={24} className="text-amber-100 relative z-10" />
                    </div>

                    {/* Text Logo (Hidden on Mobile) */}
                    <span className="hidden lg:block text-xl font-bold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-amber-100 to-amber-500 font-rpg uppercase drop-shadow-sm">
                        GameSync
                    </span>
                </div>
            </div>

            {/* --- NAVIGASI UTAMA --- */}
            <div className="space-y-2 px-2 lg:px-4 mb-8">
                {/* Section Title (Desktop Only) */}
                <p className="hidden lg:block px-4 mb-2 text-[10px] font-bold text-amber-500/50 uppercase tracking-[0.2em]">
                    Main Quest
                </p>

                {mainItems.map((item) => (
                    <button
                        key={item.id}
                        onClick={() => setActiveTab(item.id as any)}
                        title={item.label} // Tooltip untuk mobile
                        className={`w-full flex items-center justify-center lg:justify-start gap-3 px-3 lg:px-4 py-3.5 rounded-xl transition-all duration-300 group relative overflow-hidden ${
                            activeTab === item.id
                                ? 'bg-amber-950/40 border border-amber-500/30 shadow-[0_0_15px_rgba(245,158,11,0.1)]'
                                : 'hover:bg-amber-900/10 hover:border-amber-500/10 border border-transparent'
                        }`}
                    >
                        {/* Active Indicator (Left Bar) */}
                        {activeTab === item.id && (
                            <div className="absolute left-0 top-2 bottom-2 w-1 bg-amber-500 rounded-r-full shadow-[0_0_8px_#f59e0b]"></div>
                        )}

                        <span className={`relative z-10 transition-colors ${
                            activeTab === item.id ? 'text-amber-400 animate-pulse' : 'text-amber-500/60 group-hover:text-amber-300'
                        }`}>
                            {item.icon}
                        </span>

                        {/* Label (Desktop Only) */}
                        <span className={`hidden lg:block font-bold text-xs uppercase tracking-widest relative z-10 ${
                            activeTab === item.id ? 'text-amber-100' : 'text-amber-500/60 group-hover:text-amber-200'
                        }`}>
                            {item.label}
                        </span>
                    </button>
                ))}
            </div>

            {/* --- NAVIGASI SEKUNDER --- */}
            <div className="space-y-2 px-2 lg:px-4">
                <p className="hidden lg:block px-4 mb-2 text-[10px] font-bold text-amber-500/50 uppercase tracking-[0.2em]">
                    Guild Tools
                </p>
                {secondaryItems.map((item) => (
                    <button
                        key={item.id}
                        onClick={() => setActiveTab(item.id as any)}
                        title={item.label}
                        className={`w-full flex items-center justify-center lg:justify-start gap-3 px-3 lg:px-4 py-3.5 rounded-xl transition-all duration-300 group relative overflow-hidden ${
                            activeTab === item.id
                                ? 'bg-amber-950/40 border border-amber-500/30 shadow-[0_0_15px_rgba(245,158,11,0.1)]'
                                : 'hover:bg-amber-900/10 hover:border-amber-500/10 border border-transparent'
                        }`}
                    >
                        {activeTab === item.id && (
                            <div className="absolute left-0 top-2 bottom-2 w-1 bg-amber-500 rounded-r-full shadow-[0_0_8px_#f59e0b]"></div>
                        )}

                        <span className={`relative z-10 transition-colors ${
                            activeTab === item.id ? 'text-amber-400 animate-pulse' : 'text-amber-500/60 group-hover:text-amber-300'
                        }`}>
                            {item.icon}
                        </span>
                        <span className={`hidden lg:block font-bold text-xs uppercase tracking-widest relative z-10 ${
                            activeTab === item.id ? 'text-amber-100' : 'text-amber-500/60 group-hover:text-amber-200'
                        }`}>
                            {item.label}
                        </span>
                    </button>
                ))}
            </div>

            {/* --- STATUS SYSTEM (Footer) --- */}
            <div className="mt-auto p-4 border-t border-amber-900/30 bg-black/20">
                <div className="flex flex-col lg:flex-row items-center lg:items-start gap-3 p-3 rounded-xl bg-black/40 border border-amber-900/20">
                    <div className="relative">
                        <div className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_#10b981]"></div>
                    </div>
                    <div className="hidden lg:block">
                        <p className="text-[10px] font-bold text-amber-500/60 uppercase tracking-widest mb-0.5">
                            Server Status
                        </p>
                        <p className="text-[9px] text-emerald-400 font-mono tracking-wider uppercase">
                            Spring Boot: Live
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;