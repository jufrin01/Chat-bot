import React, { useState, useEffect } from 'react';
import {
    Calendar,
    Users,
    Settings,
    LogOut,
    Sword,
    Bell,
    Scroll,
    Gem,
    Menu,
    X,
    ChevronLeft,
    ChevronRight
} from 'lucide-react';
import RPGBackground from '../components/ui/RPGBackground';
import UserPhoto from '../components/ui/UserPhoto';

interface DashboardLayoutProps {
    children: React.ReactNode;
    activeTab: 'chat' | 'schedule' | 'squads' | 'settings';
    setActiveTab: (tab: string) => void;
    onLogout: () => void;
    headerTitle: string;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({
                                                             children,
                                                             activeTab,
                                                             setActiveTab,
                                                             onLogout,
                                                             headerTitle
                                                         }) => {

    // --- STATE MANAGEMENT ---
    // State untuk Mobile (Drawer Slide)
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    // State untuk Desktop (Collapse/Expand)
    const [isDesktopOpen, setIsDesktopOpen] = useState(true);

    // Helper: Deteksi apakah sedang di mode Mobile/Desktop saat resize
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 1024) {
                setIsDesktopOpen(true); // Reset desktop state saat masuk mobile
            }
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Handler Toggle Universal
    const toggleSidebar = () => {
        if (window.innerWidth < 1024) {
            setIsMobileOpen(!isMobileOpen);
        } else {
            setIsDesktopOpen(!isDesktopOpen);
        }
    };

    const menuItems = [
        { id: 'chat', label: 'Tavern Chat', icon: <Scroll size={20} /> },
        { id: 'schedule', label: 'Quest Board', icon: <Calendar size={20} /> },
        { id: 'squads', label: 'My Guild', icon: <Users size={20} /> },
        { id: 'settings', label: 'Inventory', icon: <Settings size={20} /> },
    ];

    return (
        <div className="flex h-screen w-full overflow-hidden relative font-sans text-amber-50 selection:bg-amber-500/30">

            {/* [LAYER 0] BACKGROUND MMORPG */}
            <div className="absolute inset-0 z-0">
                <RPGBackground />
            </div>

            {/* --- MOBILE OVERLAY --- */}
            {isMobileOpen && (
                <div
                    onClick={() => setIsMobileOpen(false)}
                    className="absolute inset-0 z-40 bg-black/80 backdrop-blur-sm lg:hidden animate-in fade-in duration-300"
                />
            )}

            {/* --- SIDEBAR --- */}
            <aside
                className={`
          fixed inset-y-0 left-0 z-50 
          bg-black/80 border-r border-amber-900/30 backdrop-blur-xl 
          transition-all duration-300 ease-in-out
          flex flex-col justify-between
          
          /* Mobile Logic: Full Width (w-64) & Slide Transform */
          w-64 ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'}
          
          /* Desktop Logic: Static Transform, Variable Width */
          lg:translate-x-0 lg:static 
          ${isDesktopOpen ? 'lg:w-64' : 'lg:w-20'}
        `}
            >
                {/* Dekorasi Glow */}
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-amber-900/10 to-transparent pointer-events-none"></div>

                <div>
                    {/* Logo Area */}
                    <div className={`h-20 flex items-center px-6 border-b border-amber-900/30 ${isDesktopOpen ? 'justify-between' : 'justify-center'}`}>

                        {/* Logo Icon & Text */}
                        <div className="flex items-center gap-3 overflow-hidden whitespace-nowrap">
                            <div className="p-2 bg-gradient-to-br from-amber-600 to-amber-800 rounded-lg shadow-[0_0_15px_rgba(245,158,11,0.4)] shrink-0">
                                <Sword className="text-white" size={20} />
                            </div>

                            {/* Text Logo: Hanya muncul jika Desktop Open ATAU di Mobile */}
                            <span className={`font-bold text-xl tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-amber-500 font-rpg uppercase transition-opacity duration-300 ${isDesktopOpen ? 'opacity-100' : 'lg:opacity-0 lg:hidden'}`}>
                 GameSync
               </span>
                        </div>

                        {/* Tombol Close (Khusus Mobile) */}
                        <button
                            onClick={() => setIsMobileOpen(false)}
                            className="lg:hidden text-amber-500 hover:text-white transition-colors"
                        >
                            <X size={24} />
                        </button>
                    </div>

                    {/* Navigation Menu */}
                    <nav className="mt-8 px-3 space-y-2">
                        {menuItems.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => {
                                    setActiveTab(item.id);
                                    setIsMobileOpen(false); // Tutup sidebar di mobile setelah klik
                                }}
                                title={!isDesktopOpen ? item.label : ''} // Tooltip saat collapsed
                                className={`
                  w-full flex items-center gap-3 px-3 py-4 rounded-xl transition-all duration-300 group relative overflow-hidden
                  ${!isDesktopOpen ? 'justify-center' : ''}
                  ${activeTab === item.id
                                    ? 'text-amber-100 bg-amber-950/40 border border-amber-500/40 shadow-[0_0_15px_rgba(245,158,11,0.1)]'
                                    : 'text-amber-500/60 hover:text-amber-300 hover:bg-amber-900/10'}
                `}
                            >
                                {/* Active Indicator Line */}
                                {activeTab === item.id && (
                                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-amber-500 rounded-r-full shadow-[0_0_10px_#f59e0b]"></div>
                                )}

                                {/* Icon */}
                                <span className={`relative z-10 shrink-0 ${activeTab === item.id ? 'text-amber-400' : ''}`}>
                    {item.icon}
                </span>

                                {/* Label Text (Hidden saat Collapsed) */}
                                <span className={`font-bold text-xs uppercase tracking-widest relative z-10 whitespace-nowrap transition-all duration-300 ${isDesktopOpen ? 'opacity-100 translate-x-0' : 'lg:opacity-0 lg:translate-x-10 lg:hidden'}`}>
                    {item.label}
                </span>
                            </button>
                        ))}
                    </nav>
                </div>

                {/* User Profile / Logout */}
                <div className="p-4 border-t border-amber-900/30 bg-black/20 overflow-hidden">
                    <button
                        onClick={onLogout}
                        title={!isDesktopOpen ? "Logout Realm" : ""}
                        className={`
              w-full flex items-center gap-3 px-3 py-3 rounded-xl 
              text-red-400/70 hover:text-red-400 hover:bg-red-900/10 transition-all 
              border border-transparent hover:border-red-900/30 group whitespace-nowrap
              ${!isDesktopOpen ? 'justify-center' : ''}
            `}
                    >
                        <LogOut size={20} className="group-hover:-translate-x-1 transition-transform shrink-0" />
                        <span className={`font-bold text-xs uppercase tracking-widest transition-all duration-300 ${isDesktopOpen ? 'opacity-100' : 'lg:opacity-0 lg:hidden'}`}>
              Logout Realm
            </span>
                    </button>
                </div>
            </aside>

            {/* --- MAIN CONTENT --- */}
            <main className="flex-1 flex flex-col relative z-10 h-full w-full min-w-0">

                {/* Header HUD */}
                <header className="h-20 bg-black/40 border-b border-amber-900/30 backdrop-blur-md flex items-center justify-between px-4 lg:px-8 relative z-20 shadow-lg">

                    <div className="flex items-center gap-4">
                        {/* TOMBOL TOGGLE UNIVERSAL */}
                        <button
                            onClick={toggleSidebar}
                            className="p-2 rounded-lg bg-amber-900/20 text-amber-500 border border-amber-500/30 hover:bg-amber-900/40 transition-colors"
                        >
                            {/* Icon berubah tergantung kondisi */}
                            {window.innerWidth < 1024 ? (
                                <Menu size={24} />
                            ) : (
                                isDesktopOpen ? <ChevronLeft size={24} /> : <ChevronRight size={24} />
                            )}
                        </button>

                        {/* Judul Halaman */}
                        <div>
                            <h2 className="text-lg lg:text-2xl font-bold text-white tracking-tight font-rpg uppercase drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                                {headerTitle}
                            </h2>
                            <div className="flex items-center gap-2">
                                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                                <p className="text-[9px] lg:text-[10px] text-emerald-500/80 uppercase tracking-[0.2em] font-bold">
                                    System Online
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 lg:gap-6">
                        {/* Loot/Currency (Hidden di Mobile) */}
                        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 border border-amber-900/50 shadow-inner">
                            <Gem size={14} className="text-purple-400" />
                            <span className="text-xs font-mono text-amber-100/80">2,400 GP</span>
                        </div>

                        {/* Notifikasi */}
                        <button className="relative p-2 text-amber-500/60 hover:text-amber-400 transition-colors hover:bg-amber-900/20 rounded-lg">
                            <Bell size={20} />
                            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full animate-ping shadow-[0_0_8px_#ef4444]"></span>
                        </button>

                        {/* User Avatar */}
                        <div className="flex items-center gap-3 pl-2 lg:pl-4 lg:border-l border-amber-900/30">
                            <div className="text-right hidden md:block">
                                <div className="text-xs font-bold text-amber-100">JufrinDev</div>
                                <div className="text-[9px] font-bold text-amber-500 uppercase tracking-wider">Level 99 Leader</div>
                            </div>
                            <UserPhoto
                                alt="Jufrin Dev"
                                role="LEADER"
                                size="md"
                                src={null}
                                className="cursor-pointer hover:scale-105 transition-transform"
                            />
                        </div>
                    </div>
                </header>

                {/* Content Body */}
                <div className="flex-1 overflow-y-auto p-4 lg:p-6 custom-scrollbar relative z-10 w-full">
                    {children}
                </div>
            </main>

            {/* Style Helper */}
            <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: rgba(0, 0, 0, 0.3); }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #78350f; border-radius: 3px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #b45309; }
      `}</style>
        </div>
    );
};

export default DashboardLayout;