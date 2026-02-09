import React, { useState, useEffect, useRef } from 'react';
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
    ChevronRight,
    TrendingUp,
    ShieldAlert,
    Mail,
    RefreshCw
} from 'lucide-react';
import RPGBackground from '../components/ui/RPGBackground';
import UserPhoto from '../components/ui/UserPhoto';
import api from '../api/axios'; // Import untuk fetching notifikasi asli

interface DashboardLayoutProps {
    children: React.ReactNode;
    activeTab: 'chat' | 'schedule' | 'squads' | 'chronicles' | 'settings';
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
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const [isDesktopOpen, setIsDesktopOpen] = useState(true);
    const [isNotifOpen, setIsNotifOpen] = useState(false);
    const [notifications, setNotifications] = useState<any[]>([]); // Ganti dummy dengan state
    const notifRef = useRef<HTMLDivElement>(null);

    // --- SINKRONISASI DATA USER ---
    const userString = localStorage.getItem('user');
    const userData = userString ? JSON.parse(userString) : null;

    const username = userData?.username || 'Adventurer';
    const userRole = userData?.role || 'USER';
    const userLevel = userData?.level || 1; // Jika ada field level di BE

    // --- EFFECT: INITIAL LOG & NOTIF FETCH ---
    useEffect(() => {
        console.log("=== HUD SYSTEM ONLINE ===");
        console.log("Logged as:", username, `[${userRole}]`);
        fetchNotifications();
    }, []);

    const fetchNotifications = async () => {
        try {
            console.log("Fetching realm alerts...");
            // Jika sudah ada endpoint notifikasi di BE
            // const response = await api.get('/notifications');
            // setNotifications(response.data);

            // Sementara jika BE belum siap, biarkan array kosong agar tidak crash
            setNotifications([]);
        } catch (error) {
            console.error("Failed to sync alerts:", error);
        }
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
                setIsNotifOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const toggleSidebar = () => {
        if (window.innerWidth < 1024) setIsMobileOpen(!isMobileOpen);
        else setIsDesktopOpen(!isDesktopOpen);
    };

    const menuItems = [
        { id: 'chat', label: 'Tavern Chat', icon: <Scroll size={20} /> },
        { id: 'schedule', label: 'Quest Board', icon: <Calendar size={20} /> },
        { id: 'squads', label: 'My Guild', icon: <Users size={20} /> },
        { id: 'chronicles', label: 'Chronicles', icon: <TrendingUp size={20} /> },
        { id: 'settings', label: 'Inventory', icon: <Settings size={20} /> },
    ];

    const getNotifIcon = (type: string) => {
        switch (type) {
            case 'quest': return <Sword size={14} className="text-red-400" />;
            case 'guild': return <Users size={14} className="text-amber-400" />;
            case 'system': return <ShieldAlert size={14} className="text-blue-400" />;
            default: return <Mail size={14} className="text-emerald-400" />;
        }
    };

    return (
        <div className="flex h-screen w-full overflow-hidden relative font-sans text-amber-50 selection:bg-amber-500/30">

            <div className="absolute inset-0 z-0">
                <RPGBackground />
            </div>

            {isMobileOpen && (
                <div
                    onClick={() => setIsMobileOpen(false)}
                    className="absolute inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden animate-in fade-in duration-300"
                />
            )}

            {/* --- SIDEBAR --- */}
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

            {/* --- MAIN CONTENT --- */}
            <main className="flex-1 flex flex-col relative z-10 h-full w-full min-w-0">
                <header className="h-20 bg-black/10 border-b border-amber-900/20 backdrop-blur-md flex items-center justify-between px-4 lg:px-8 relative z-20">
                    <div className="flex items-center gap-4">
                        <button onClick={toggleSidebar} className="p-2 rounded-lg bg-amber-900/10 text-amber-500 border border-amber-500/20">
                            <div className="lg:hidden"><Menu size={24} /></div>
                            <div className="hidden lg:block">{isDesktopOpen ? <ChevronLeft size={24} /> : <ChevronRight size={24} />}</div>
                        </button>
                        <div>
                            <h2 className="text-lg lg:text-2xl font-bold text-white tracking-tight font-rpg uppercase">{headerTitle}</h2>
                            <div className="flex items-center gap-2">
                                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                                <p className="text-[9px] lg:text-[10px] text-emerald-500/80 uppercase tracking-[0.2em] font-bold">System Online</p>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 lg:gap-6">
                        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/40 border border-amber-900/30">
                            <Gem size={14} className="text-purple-400" />
                            <span className="text-xs font-mono text-amber-100/80">2,400 GP</span>
                        </div>

                        <div className="relative" ref={notifRef}>
                            <button onClick={() => setIsNotifOpen(!isNotifOpen)} className={`relative p-2 rounded-lg ${isNotifOpen ? 'bg-amber-900/40 text-amber-400' : 'text-amber-500/60'}`}>
                                <Bell size={20} />
                                {notifications.length > 0 && <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full animate-ping"></span>}
                            </button>

                            {isNotifOpen && (
                                <div className="absolute right-0 top-full mt-3 w-80 md:w-96 bg-black/90 backdrop-blur-xl border border-amber-500/30 rounded-2xl shadow-2xl overflow-hidden z-[60]">
                                    <div className="p-4 border-b border-amber-900/30 bg-amber-900/10 text-xs font-bold text-amber-500 uppercase tracking-widest">
                                        Realm Alerts
                                    </div>
                                    <div className="max-h-[300px] overflow-y-auto custom-scrollbar">
                                        {notifications.length === 0 ? (
                                            <div className="p-8 text-center text-amber-500/30 text-[10px] uppercase italic">The realm is quiet...</div>
                                        ) : (
                                            notifications.map((notif) => (
                                                <div key={notif.id} className="p-4 border-b border-amber-900/20 hover:bg-amber-900/10 transition-colors cursor-pointer">
                                                    <div className="flex gap-3">
                                                        <div className="h-8 w-8 rounded-lg flex items-center justify-center bg-black/40 border border-amber-900/30">
                                                            {getNotifIcon(notif.type)}
                                                        </div>
                                                        <div className="flex-1">
                                                            <div className="flex justify-between items-start mb-1">
                                                                <h4 className="text-xs font-bold text-amber-100">{notif.title}</h4>
                                                                <span className="text-[9px] text-amber-500/40 font-mono">{notif.time}</span>
                                                            </div>
                                                            <p className="text-[10px] text-amber-500/70">{notif.desc}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="flex items-center gap-3 pl-2 lg:pl-4 lg:border-l border-amber-900/20">
                            <div className="text-right hidden md:block">
                                <div className="text-xs font-bold text-amber-100">{username}</div>
                                <div className="text-[9px] font-bold text-amber-500 uppercase tracking-wider">Lvl {userLevel} {userRole}</div>
                            </div>
                            <UserPhoto alt={username} role={userRole as any} size="md" src={null} />
                        </div>
                    </div>
                </header>

                <div className="flex-1 overflow-y-auto p-4 lg:p-6 custom-scrollbar relative z-10 w-full">
                    {children}
                </div>
            </main>
        </div>
    );
};

export default DashboardLayout;