import React from 'react';
import {
    Bot,
    Hash,
    Users,
    Search,
    MoreVertical,
    ShieldAlert
} from 'lucide-react';

interface ChatHeaderProps {
    // Props Fleksibel (Bisa untuk Channel atau Direct Message)
    channelName?: string;
    username?: string;     // Backward compatibility untuk kode lama
    description?: string;
    status?: string;
    onlineCount?: number;
    isBot?: boolean;       // Opsi untuk menampilkan icon Bot atau Hash
}

const ChatHeader: React.FC<ChatHeaderProps> = ({
                                                   channelName,
                                                   username,
                                                   description = "Channel Diskusi Utama",
                                                   status = "Online",
                                                   onlineCount = 0,
                                                   isBot = false
                                               }) => {

    // Normalisasi Data (Prioritaskan channelName, jika tidak ada pakai username)
    const title = channelName || username || "Unknown Channel";
    const displayStatus = onlineCount > 0 ? `${onlineCount} Online` : status;

    return (
        // Container Header: Sticky, Glassmorphism, Border Amber
        <div className="w-full h-16 min-h-[64px] bg-black/60 backdrop-blur-md border-b border-amber-900/30 flex items-center justify-between px-4 lg:px-6 relative z-30 shadow-sm">

            {/* --- KIRI: Info Channel / User --- */}
            <div className="flex items-center gap-3 md:gap-4 overflow-hidden">

                {/* Icon Avatar (Frame RPG) */}
                <div className={`flex-shrink-0 h-10 w-10 rounded-lg border border-amber-500/30 flex items-center justify-center shadow-inner ${isBot ? 'bg-indigo-900/40' : 'bg-gradient-to-br from-amber-900/50 to-black'}`}>
                    {isBot ? (
                        <Bot size={20} className="text-indigo-400" />
                    ) : (
                        <Hash size={20} className="text-amber-500" />
                    )}
                </div>

                {/* Text Info */}
                <div className="flex flex-col overflow-hidden">
                    <div className="flex items-center gap-2">
                        <h3 className="font-bold text-amber-100 text-sm md:text-base truncate tracking-wide font-rpg uppercase">
                            {title}
                        </h3>
                        {/* Badge 'Official' hanya di Desktop */}
                        <span className="hidden md:flex items-center gap-1 px-1.5 py-0.5 rounded bg-amber-500/10 border border-amber-500/20 text-[9px] text-amber-500 font-bold uppercase tracking-widest">
              <ShieldAlert size={10} /> Official
            </span>
                    </div>

                    {/* DESKTOP: Tampilkan Deskripsi */}
                    <p className="text-[10px] md:text-xs text-amber-500/50 truncate md:block hidden font-sans">
                        {description}
                    </p>

                    {/* MOBILE: Tampilkan Status Singkat */}
                    <div className="md:hidden flex items-center gap-1 text-[10px] text-emerald-500/80 font-mono">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                        {displayStatus}
                    </div>
                </div>
            </div>

            {/* --- KANAN: Tools & Stats --- */}
            <div className="flex items-center gap-2 md:gap-4">

                {/* Member Count Pill (Desktop & Mobile beda style) */}
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/40 border border-amber-900/30 text-amber-500/60 hover:text-amber-400 hover:border-amber-500/50 transition-all cursor-default group">
                    <Users size={14} className="group-hover:text-amber-400 transition-colors" />
                    <span className="text-xs font-bold font-mono group-hover:text-amber-100 transition-colors">
            {onlineCount > 0 ? onlineCount : '1'}
                        <span className="hidden md:inline ml-1 text-[10px] opacity-50 font-sans uppercase">Heroes</span>
          </span>
                </div>

                {/* Desktop Search Bar (Hidden di Mobile) */}
                <div className="hidden md:flex items-center relative group">
                    <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                        <Search size={14} className="text-amber-900/60 group-hover:text-amber-500/50 transition-colors" />
                    </div>
                    <input
                        type="text"
                        placeholder="Search logs..."
                        className="bg-black/20 border border-amber-900/20 rounded-lg py-1.5 pl-9 pr-3 text-xs text-amber-100 placeholder:text-amber-900/40 focus:border-amber-500/30 focus:bg-black/40 focus:outline-none transition-all w-32 focus:w-48 font-sans"
                    />
                </div>

                {/* Separator Desktop */}
                <div className="h-6 w-[1px] bg-amber-900/20 hidden md:block"></div>

                {/* Menu Button (Mobile & Desktop) */}
                <button className="p-2 text-amber-500/40 hover:text-amber-300 hover:bg-amber-900/20 rounded-lg transition-colors">
                    <MoreVertical size={18} />
                </button>
            </div>

            {/* Dekorasi Garis Sinyal (Hiasan Bawah) */}
            <div className="absolute bottom-0 left-0 w-full flex items-end justify-between px-2 opacity-20 pointer-events-none">
                <div className="h-[1px] w-4 bg-amber-500"></div>
                <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-amber-900/50 to-transparent"></div>
                <div className="h-[1px] w-4 bg-amber-500"></div>
            </div>
        </div>
    );
};

export default ChatHeader;