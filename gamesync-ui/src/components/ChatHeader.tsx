import React from 'react';
import {
    Bot,
    Hash,
    Circle,
    ChevronRight,
    ShieldAlert
} from 'lucide-react';

// Interface dibuat fleksibel agar bisa menangani Channel atau User
interface ChatHeaderProps {
    title?: string;         // Menggantikan 'username' agar lebih umum
    subtitle?: string;      // Menggantikan 'status'
    type?: 'CHANNEL' | 'USER' | 'BOT'; // Untuk menentukan Icon
    onlineCount?: number;   // Opsional: Jika ingin menampilkan jumlah user online
}

const ChatHeader: React.FC<ChatHeaderProps> = ({
                                                   title = "Unknown Channel",
                                                   subtitle = "System Offline",
                                                   type = "CHANNEL",
                                                   onlineCount = 0
                                               }) => {

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

    // Helper: Warna Background Icon
    const getIconStyle = () => {
        switch (type) {
            case 'BOT': return 'bg-indigo-600 shadow-indigo-500/20';
            case 'USER': return 'bg-slate-700 shadow-slate-500/20';
            default: return 'bg-black/40 border border-amber-500/30 shadow-amber-500/10'; // RPG Style
        }
    };

    return (
        <div className="w-full h-20 bg-black/40 border-b border-amber-900/30 backdrop-blur-md flex items-center justify-between px-6 relative z-30">

            {/* Bagian Kiri: Icon & Judul */}
            <div className="flex items-center gap-4">
                {/* Icon Container */}
                <div className={`h-10 w-10 rounded-xl flex items-center justify-center shadow-lg transition-all ${getIconStyle()}`}>
                    {renderIcon()}
                </div>

                <div className="flex flex-col">
                    <h2 className="text-lg font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-100 to-amber-500 tracking-wide font-rpg uppercase drop-shadow-sm">
                        {title}
                    </h2>
                    <div className="flex items-center gap-2">
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

            {/* Bagian Kanan (Opsional): Bisa ditambah tombol search/menu di sini jika perlu */}
            <div className="hidden md:flex items-center gap-2">
                {type === 'CHANNEL' && (
                    <span className="px-2 py-1 rounded bg-amber-900/20 border border-amber-500/20 text-[10px] font-bold text-amber-500 uppercase">
                        Official Server
                    </span>
                )}
            </div>
        </div>
    );
};

export default ChatHeader;