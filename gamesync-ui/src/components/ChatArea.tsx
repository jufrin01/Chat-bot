import React, { useEffect, useRef, useMemo } from 'react';
import { CheckCheck, Sparkles } from 'lucide-react';
import { Message } from '../types/chat';
import UserPhoto from '../components/ui/UserPhoto';

interface ChatAreaProps {
    messages: Message[];
}

const ChatArea: React.FC<ChatAreaProps> = ({ messages }) => {
    const bottomRef = useRef<HTMLDivElement>(null);

    // Mengambil data user lokal untuk menentukan mana pesan milik sendiri
    const userData = useMemo(() => {
        const localUser = localStorage.getItem('user');
        return localUser ? JSON.parse(localUser) : {};
    }, []);

    // Auto-scroll ke pesan paling bawah setiap ada update
    useEffect(() => {
        if (messages.length > 0) {
            bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages]);

    // Helper untuk menentukan gaya visual bubble chat berdasarkan Role
    const getBubbleStyle = (role?: string, isUser?: boolean) => {
        if (isUser) {
            return 'bg-gradient-to-br from-amber-700/90 to-amber-900/90 border border-amber-500/30 text-white rounded-tr-sm shadow-[0_4px_15px_rgba(245,158,11,0.1)]';
        }
        switch (role) {
            case 'ADMIN': return 'bg-red-950/40 border border-red-500/40 text-red-50 rounded-tl-sm shadow-[0_0_15px_rgba(220,38,38,0.1)]';
            case 'LEADER': return 'bg-amber-950/40 border border-amber-500/40 text-amber-50 rounded-tl-sm shadow-[0_0_15px_rgba(245,158,11,0.1)]';
            case 'BOT': return 'bg-indigo-950/40 border border-indigo-500/40 text-indigo-50 rounded-tl-sm shadow-[0_0_15px_rgba(99,102,241,0.1)]';
            default: return 'bg-black/40 backdrop-blur-sm border border-amber-900/30 text-amber-100/80 rounded-tl-sm hover:border-amber-500/20 transition-colors';
        }
    };

    // Mapping string Role dari Backend ke tipe yang diterima UserPhoto
    const mapRoleToUI = (role?: string): 'ADMIN' | 'LEADER' | 'BOT' | 'ANGGOTA' => {
        if (role === 'ADMIN') return 'ADMIN';
        if (role === 'LEADER' || role === 'GUILD_LEADER') return 'LEADER';
        if (role === 'BOT') return 'BOT';
        return 'ANGGOTA';
    };

    return (
        <div className="flex flex-col space-y-4 md:space-y-6 pb-4">
            {messages.map((msg: any, idx) => {
                // Gunakan ID unik dari database agar rendering real-time stabil
                const messageKey = msg.id || `chat-${idx}-${msg.createdAt}`;

                // Cek identitas pengirim menggunakan ID dari DTO
                const isUser = msg.senderId === userData.id;
                const isBot = msg.senderRole === 'BOT';

                // Mengambil data dari ChatMessageResponse (DTO)
                const displayName = msg.senderName || "Unknown Hero";
                const displayRole = msg.senderRole || 'USER';

                return (
                    <div
                        key={messageKey}
                        className={`flex ${isUser ? 'justify-end' : 'justify-start'} group animate-in slide-in-from-bottom-2 duration-500`}
                    >
                        <div className={`flex max-w-[85%] md:max-w-[70%] gap-2 md:gap-4 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>

                            {/* --- BAGIAN AVATAR --- */}
                            <div className="flex-shrink-0 flex flex-col items-center justify-end md:justify-start">
                                <UserPhoto
                                    src={msg.avatarUrl || null}
                                    alt={displayName}
                                    role={mapRoleToUI(displayRole)}
                                    size="md"
                                    className="hidden md:block"
                                />
                                <UserPhoto
                                    src={msg.avatarUrl || null}
                                    alt={displayName}
                                    role={mapRoleToUI(displayRole)}
                                    size="sm"
                                    className="md:hidden"
                                />
                            </div>

                            {/* --- BAGIAN KONTEN --- */}
                            <div className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}>

                                {/* Nama & Badge Role muncul jika bukan pesan sendiri */}
                                {!isUser && (
                                    <div className="flex items-center gap-2 mb-1 px-1">
                                        <span className="text-[10px] md:text-xs font-bold text-amber-500/80 tracking-widest uppercase font-rpg">
                                            {displayName}
                                        </span>

                                        {displayRole !== 'USER' && (
                                            <span className={`text-[8px] px-1 py-0.5 rounded border font-mono font-bold
                                                ${displayRole === 'ADMIN' ? 'bg-red-900/20 border-red-500/30 text-red-400' : ''}
                                                ${displayRole === 'LEADER' ? 'bg-amber-900/20 border-amber-500/30 text-amber-400' : ''}
                                                ${displayRole === 'BOT' ? 'bg-indigo-900/20 border-indigo-500/30 text-indigo-400' : ''}
                                            `}>
                                                {displayRole}
                                            </span>
                                        )}
                                    </div>
                                )}

                                <div className={`
                                    relative px-3 py-2 md:px-5 md:py-3.5 
                                    text-xs md:text-sm leading-relaxed 
                                    rounded-2xl shadow-xl backdrop-blur-md
                                    ${getBubbleStyle(displayRole, isUser)}
                                `}>
                                    <div className="break-words whitespace-pre-wrap font-sans">
                                        {isBot && <Sparkles size={12} className="inline mr-1 text-indigo-400 animate-pulse" />}
                                        {msg.content}
                                    </div>

                                    <div className={`flex items-center gap-1.5 mt-1 md:mt-2 ${isUser ? 'justify-end' : 'justify-start opacity-50 group-hover:opacity-100 transition-opacity'}`}>
                                        <span className={`text-[9px] md:text-[10px] font-mono ${isUser ? 'text-amber-200/60' : 'text-amber-500/40'}`}>
                                            {msg.createdAt ? new Date(msg.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) : 'Just now'}
                                        </span>
                                        {isUser && <CheckCheck size={12} className="text-emerald-400 drop-shadow-[0_0_5px_rgba(52,211,153,0.5)]" />}
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                );
            })}
            <div ref={bottomRef} className="h-2" />
        </div>
    );
};

export default ChatArea;