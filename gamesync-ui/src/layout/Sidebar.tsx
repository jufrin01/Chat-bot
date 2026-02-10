import React from 'react';
import {
    Calendar, Users, Settings, LogOut, Scroll, TrendingUp, Sword
} from 'lucide-react';

interface SidebarProps {
    isMobileOpen: boolean;
    setIsMobileOpen: (val: boolean) => void;
    isDesktopOpen: boolean;
    activeTab: string;
    setActiveTab: (tab: string) => void;
    onLogout: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({
                                             isMobileOpen,
                                             setIsMobileOpen,
                                             isDesktopOpen,
                                             activeTab,
                                             setActiveTab,
                                             onLogout
                                         }) => {
    const menuItems = [
        { id: 'chat', label: 'Tavern Chat', icon: <Scroll size={20} /> },
        { id: 'schedule', label: 'Quest Board', icon: <Calendar size={20} /> },
        { id: 'squads', label: 'My Guild', icon: <Users size={20} /> },
        { id: 'chronicles', label: 'Chronicles', icon: <TrendingUp size={20} /> },
        { id: 'settings', label: 'Inventory', icon: <Settings size={20} /> },
    ];

    return (
        <>
            {/* Mobile Overlay */}
            {isMobileOpen && (
                <div
                    onClick={() => setIsMobileOpen(false)}
                    className="absolute inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden animate-in fade-in duration-300"
                />
            )}

            <aside
                className={`
                    fixed inset-y-0 left-0 z-50 
                    bg-black/30 border-r border-amber-900/20 backdrop-blur-xl 
                    transition-all duration-300 ease-in-out
                    flex flex-col justify-between
                    w-64 ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'}
                    lg:translate-x-0 lg:static 
                    ${isDesktopOpen ? 'lg:w-64' : 'lg:w-20'}
                `}
            >
                <div>
                    {/* Logo Section */}
                    <div className={`h-20 flex items-center px-6 border-b border-amber-900/20 ${!isDesktopOpen ? 'lg:justify-center' : 'justify-between'}`}>
                        <div className="flex items-center gap-3 overflow-hidden">
                            <div className="p-2 bg-gradient-to-br from-amber-600 to-amber-800 rounded-lg shadow-[0_0_15px_rgba(245,158,11,0.4)] shrink-0">
                                <Sword className="text-white" size={20} />
                            </div>
                            <span className={`font-bold text-xl tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-amber-500 font-rpg uppercase transition-all duration-300 ${isDesktopOpen ? 'opacity-100 w-auto' : 'lg:opacity-0 lg:w-0 lg:hidden'}`}>
                                GameSync
                            </span>
                        </div>
                    </div>

                    {/* Navigation Items */}
                    <nav className="mt-8 px-3 space-y-2">
                        {menuItems.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => { setActiveTab(item.id); setIsMobileOpen(false); }}
                                className={`
                                    w-full flex items-center gap-3 px-3 py-4 rounded-xl transition-all duration-300 group relative
                                    ${!isDesktopOpen ? 'lg:justify-center' : ''}
                                    ${activeTab === item.id
                                    ? 'text-amber-100 bg-amber-900/40 border border-amber-500/40'
                                    : 'text-amber-500/60 hover:text-amber-300 hover:bg-amber-900/10'}
                                `}
                            >
                                {activeTab === item.id && <div className="absolute left-0 top-0 bottom-0 w-1 bg-amber-500 rounded-r-full shadow-[0_0_10px_#f59e0b]"></div>}
                                <span className={`shrink-0 ${activeTab === item.id ? 'text-amber-400' : ''}`}>{item.icon}</span>
                                <span className={`font-bold text-xs uppercase tracking-widest transition-all duration-300 ${isDesktopOpen ? 'opacity-100' : 'lg:opacity-0 lg:hidden'}`}>
                                    {item.label}
                                </span>
                            </button>
                        ))}
                    </nav>
                </div>

                {/* Logout Button */}
                <div className="p-4 border-t border-amber-900/20 bg-black/10">
                    <button
                        onClick={onLogout}
                        className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl text-red-400/70 hover:text-red-400 transition-all ${!isDesktopOpen ? 'lg:justify-center' : ''}`}
                    >
                        <LogOut size={20} className="shrink-0" />
                        <span className={`font-bold text-xs uppercase tracking-widest ${isDesktopOpen ? 'opacity-100' : 'lg:opacity-0 lg:hidden'}`}>
                            Logout Realm
                        </span>
                    </button>
                </div>
            </aside>
        </>
    );
};

export default Sidebar;