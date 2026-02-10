import React, { useState, useRef, useEffect } from 'react';
import {
    Menu, ChevronLeft, ChevronRight, Gem, Bell, Sword, Users, ShieldAlert, Mail
} from 'lucide-react';
import UserPhoto from '../components/ui/UserPhoto';
import { NotificationItem } from './DashboardLayout';

interface TopNavigationProps {
    toggleSidebar: () => void;
    isDesktopOpen: boolean;
    headerTitle: string;
    notifications: NotificationItem[];
}

const TopNavigation: React.FC<TopNavigationProps> = ({
                                                         toggleSidebar,
                                                         isDesktopOpen,
                                                         headerTitle,
                                                         notifications
                                                     }) => {
    // --- STATE INTERNAL HEADER ---
    const [isNotifOpen, setIsNotifOpen] = useState(false);
    const notifRef = useRef<HTMLDivElement>(null);

    // --- AMBIL DATA USER ---
    const userString = localStorage.getItem('user');
    const userData = userString ? JSON.parse(userString) : null;
    const username = userData?.username || 'Adventurer';
    const userRole = userData?.role || 'USER';
    const userLevel = userData?.level || 1;

    // --- CLICK OUTSIDE HANDLER (Untuk Dropdown Notifikasi) ---
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
                setIsNotifOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const getNotifIcon = (type: string) => {
        switch (type) {
            case 'QUEST': return <Sword size={14} className="text-red-400" />;
            case 'GUILD': return <Users size={14} className="text-amber-400" />;
            case 'SYSTEM': return <ShieldAlert size={14} className="text-blue-400" />;
            default: return <Mail size={14} className="text-emerald-400" />;
        }
    };

    return (
        <header className="h-20 bg-black/10 border-b border-amber-900/20 backdrop-blur-md flex items-center justify-between px-4 lg:px-8 relative z-20">
            {/* Left Section: Toggle & Title */}
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

            {/* Right Section: Stats, Notif, Profile */}
            <div className="flex items-center gap-3 lg:gap-6">
                {/* Gem Counter */}
                <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/40 border border-amber-900/30">
                    <Gem size={14} className="text-purple-400" />
                    <span className="text-xs font-mono text-amber-100/80">2,400 GP</span>
                </div>

                {/* Notification Dropdown */}
                <div className="relative" ref={notifRef}>
                    <button onClick={() => setIsNotifOpen(!isNotifOpen)} className={`relative p-2 rounded-lg ${isNotifOpen ? 'bg-amber-900/40 text-amber-400' : 'text-amber-500/60'}`}>
                        <Bell size={20} />
                        {notifications.length > 0 && (
                            <>
                                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full animate-ping"></span>
                                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
                            </>
                        )}
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
                                    notifications.map((notif, idx) => (
                                        <div key={idx} className="p-4 border-b border-amber-900/20 hover:bg-amber-900/10 transition-colors cursor-pointer animate-in slide-in-from-right duration-300">
                                            <div className="flex gap-3">
                                                <div className="h-8 w-8 rounded-lg flex items-center justify-center bg-black/40 border border-amber-900/30 shrink-0">
                                                    {getNotifIcon(notif.type)}
                                                </div>
                                                <div className="flex-1">
                                                    <div className="flex justify-between items-start mb-1">
                                                        <h4 className="text-xs font-bold text-amber-100">{notif.title}</h4>
                                                        <span className="text-[9px] text-amber-500/40 font-mono">{notif.timestamp}</span>
                                                    </div>
                                                    <p className="text-[10px] text-amber-500/70 leading-relaxed">{notif.message}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    )}
                </div>

                {/* User Profile */}
                <div className="flex items-center gap-3 pl-2 lg:pl-4 lg:border-l border-amber-900/20">
                    <div className="text-right hidden md:block">
                        <div className="text-xs font-bold text-amber-100">{username}</div>
                        <div className="text-[9px] font-bold text-amber-500 uppercase tracking-wider">Lvl {userLevel} {userRole}</div>
                    </div>
                    <UserPhoto alt={username} role={userRole as any} size="md" src={null} />
                </div>
            </div>
        </header>
    );
};

export default TopNavigation;