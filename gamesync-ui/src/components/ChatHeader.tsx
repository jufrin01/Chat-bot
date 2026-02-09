import React, { useEffect } from 'react';
import {
    Bot,
    Circle,
    ChevronRight
} from 'lucide-react';

// Interface fleksibel untuk menangani Channel, User, atau Bot
interface ChatHeaderProps {
    title?: string;         // Nama ruangan atau user
    subtitle?: string;      // Deskripsi atau status
    type?: 'CHANNEL' | 'USER' | 'BOT';
    onlineCount?: number;   // Jumlah user online
}

const ChatHeader: React.FC<ChatHeaderProps> = ({
                                                   title = "General Tavern",
                                                   subtitle = "Realm Connection Established",
                                                   type = "CHANNEL",
                                                   onlineCount = 0
                                               }) => {

    // --- LOGGING SINKRONISASI ---
    useEffect(() => {
        console.log("=== CHAT HEADER SYNCED ===");
        console.log("Header Title:", title);
        console.log("Header Type:", type);
        console.log("Online Status:", onlineCount > 0 ? `${onlineCount} heroes active` : "System Online");
    }, [title, type, onlineCount]);

    // Helper: Pilih Icon berdasarkan Tipe
    const renderIcon = () => {
        switch (type) {
            case 'BOT':
                return <Bot size={24} className="text-white" />;
            case 'USER':
                return <Circle size={24} className="text-white" />;
            default: // CHANNEL
                return <ChevronRight size={24} className="text-amber-500" />;
        }
    };

    // Helper: Warna Background Icon (RPG Style)
    const getIconStyle = () => {
        switch (type) {
            case 'BOT': return 'bg-indigo-600 shadow-indigo-500/20';
            case 'USER': return 'bg-slate-700 shadow-slate-500/20';
            default: return 'bg-black/40 border border-amber-500/30 shadow-amber-500/10';
        }
    };

    return (
        <div className="w-full h-20 bg-black/40 border-b border-amber-900/30 backdrop-blur-md flex items-center justify-between px-6 relative z-30">

            {/* Bagian Kiri: Icon & Judul Dinamis */}
            <div className="flex items-center gap-4">
                {/* Icon Container dengan Animasi Glow jika Online */}
                <div className={`h-10 w-10 rounded-xl flex items-center justify-center shadow-lg transition-all transform hover:scale-105 ${getIconStyle()}`}>
                    {renderIcon()}
                </div>

                <div className="flex flex-col">
                    <h2 className="text-lg font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-100 to-amber-500 tracking-wide font-rpg uppercase drop-shadow-sm">
                        {title}
                    </h2>
                    <div className="flex items-center gap-2">
                        {/* Status Indicator (Pulse Green) */}
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                        </span>
                        <span className="text-[10px] font-bold text-emerald-500/80 uppercase tracking-[0.2em]">
                            {subtitle} {onlineCount > 0 && `• ${onlineCount} Online`}
                        </span>
                    </div>
                </div>
            </div>

            {/* Bagian Kanan: Badge Server */}
            <div className="hidden md:flex items-center gap-2">
                {type === 'CHANNEL' && (
                    <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-amber-900/20 border border-amber-500/20">
                        <span className="w-1 h-1 rounded-full bg-amber-500 animate-pulse"></span>
                        <span className="text-[10px] font-bold text-amber-500 uppercase tracking-widest">
                            Official Realm
                        </span>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ChatHeader;