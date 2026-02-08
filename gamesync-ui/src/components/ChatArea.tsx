import React, { useEffect, useRef } from 'react';
import { CheckCheck, Sparkles } from 'lucide-react';
import { Message } from '../types/chat';
import UserPhoto from './ui/UserPhoto';

interface ChatAreaProps {
    messages: Message[];
}

const ChatArea: React.FC<ChatAreaProps> = ({ messages }) => {
    const bottomRef = useRef<HTMLDivElement>(null);

    // Auto-scroll ke bawah saat ada pesan baru
    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    // --- HELPER: Warna Bubble Chat (RPG Theme) ---
    const getBubbleStyle = (role?: string, isUser?: boolean) => {
        // 1. Style untuk User (Kanan) - Tema Hero
        if (isUser) {
            return 'bg-gradient-to-br from-amber-700/90 to-amber-900/90 border border-amber-500/30 text-white rounded-tr-sm shadow-[0_4px_15px_rgba(245,158,11,0.1)]';
        }

        // 2. Style untuk Orang Lain (Kiri)
        switch (role) {
            case 'ADMIN':
                // Admin: Aura Merah Gelap
                return 'bg-red-950/40 border border-red-500/40 text-red-50 rounded-tl-sm shadow-[0_0_15px_rgba(220,38,38,0.1)]';

            case 'LEADER':
                // Leader: Aura Emas Mewah
                return 'bg-amber-950/40 border border-amber-500/40 text-amber-50 rounded-tl-sm shadow-[0_0_15px_rgba(245,158,11,0.1)]';

            case 'BOT':
                // AI/Bot: Aura Mystic (Indigo/Ungu)
                return 'bg-indigo-950/40 border border-indigo-500/40 text-indigo-50 rounded-tl-sm shadow-[0_0_15px_rgba(99,102,241,0.1)]';

            default:
                // Anggota: Standard Void Glass
                return 'bg-black/40 backdrop-blur-sm border border-amber-900/30 text-amber-100/80 rounded-tl-sm hover:border-amber-500/20 transition-colors';
        }
    };

    return (
        <div className="flex flex-col space-y-4 md:space-y-6 pb-4">
            {messages.map((msg, idx) => {
                const isUser = msg.role === 'user';
                const isBot = msg.senderRole === 'BOT';

                return (
                    <div
                        key={idx}
                        className={`flex ${isUser ? 'justify-end' : 'justify-start'} group animate-in slide-in-from-bottom-2 duration-500`}
                    >
                        <div className={`flex max-w-[85%] md:max-w-[70%] gap-2 md:gap-4 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>

                            {/* --- 1. AVATAR AREA (Menggunakan UserPhoto) --- */}
                            <div className="flex-shrink-0 flex flex-col items-center justify-end md:justify-start">
                                {/* UserPhoto Otomatis:
                    - Menampilkan Inisial jika src null
                    - Border warna sesuai Role
                    - Ukuran responsif (sm di HP, md di Desktop)
                */}
                                <UserPhoto
                                    src={null} // Nanti diganti URL foto dari DB
                                    alt={msg.senderName || "Unknown"}
                                    role={msg.senderRole as any}
                                    size="md" // Default Desktop
                                    className="hidden md:block" // Sembunyikan di HP (pakai yg bawah)
                                />
                                <UserPhoto
                                    src={null}
                                    alt={msg.senderName || "U"}
                                    role={msg.senderRole as any}
                                    size="sm" // Ukuran Mobile
                                    className="md:hidden"
                                />
                            </div>

                            {/* --- 2. MESSAGE CONTENT --- */}
                            <div className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}>

                                {/* Info Pengirim (Nama & Role Badge) */}
                                {!isUser && (
                                    <div className="flex items-center gap-2 mb-1 px-1">
                    <span className="text-[10px] md:text-xs font-bold text-amber-500/80 tracking-widest uppercase font-rpg">
                      {msg.senderName || "Unknown Hero"}
                    </span>

                                        {/* Role Badge Kecil */}
                                        {msg.senderRole && msg.senderRole !== 'ANGGOTA' && (
                                            <span className={`text-[8px] px-1 py-0.5 rounded border font-mono font-bold
                            ${msg.senderRole === 'ADMIN' ? 'bg-red-900/20 border-red-500/30 text-red-400' : ''}
                            ${msg.senderRole === 'LEADER' ? 'bg-amber-900/20 border-amber-500/30 text-amber-400' : ''}
                            ${msg.senderRole === 'BOT' ? 'bg-indigo-900/20 border-indigo-500/30 text-indigo-400' : ''}
                        `}>
                            {msg.senderRole}
                        </span>
                                        )}
                                    </div>
                                )}

                                {/* Bubble Chat */}
                                <div className={`
                    relative px-3 py-2 md:px-5 md:py-3.5 
                    text-xs md:text-sm leading-relaxed 
                    rounded-2xl shadow-xl backdrop-blur-md
                    ${getBubbleStyle(msg.senderRole, isUser)}
                `}>
                                    {/* Isi Pesan */}
                                    <div className="break-words whitespace-pre-wrap font-sans">
                                        {isBot && <Sparkles size={12} className="inline mr-1 text-indigo-400 animate-pulse" />}
                                        {msg.text}
                                    </div>

                                    {/* Timestamp & Status */}
                                    <div className={`flex items-center gap-1.5 mt-1 md:mt-2 ${isUser ? 'justify-end' : 'justify-start opacity-50 group-hover:opacity-100 transition-opacity'}`}>
                        <span className={`text-[9px] md:text-[10px] font-mono ${isUser ? 'text-amber-200/60' : 'text-amber-500/40'}`}>
                            {msg.timestamp || 'Just now'}
                        </span>
                                        {isUser && <CheckCheck size={12} className="text-emerald-400 drop-shadow-[0_0_5px_rgba(52,211,153,0.5)]" />}
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                );
            })}

            {/* Invisible element untuk auto-scroll */}
            <div ref={bottomRef} />
        </div>
    );
};

export default ChatArea;