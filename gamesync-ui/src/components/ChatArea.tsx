import React from 'react';
import { Bot, User, Crown, ShieldAlert, CheckCheck } from 'lucide-react';
import { Message } from '../types/chat';

// Tambahkan definisi tipe lokal atau import dari data/dummy
interface ChatAreaProps {
    messages: Message[];
}

const ChatArea: React.FC<ChatAreaProps> = ({ messages }) => {

    // Fungsi untuk mendapatkan ikon berdasarkan role pengirim
    const getRoleIcon = (role?: string) => {
        switch (role) {
            case 'ADMIN': return <ShieldAlert size={14} className="text-red-400" />;
            case 'LEADER': return <Crown size={14} className="text-amber-400" />;
            default: return <User size={14} className="text-slate-400" />;
        }
    };

    // Fungsi untuk mendapatkan warna bubble berdasarkan role
    const getBubbleStyle = (role?: string, isUser?: boolean) => {
        if (isUser) return 'bg-indigo-600 text-white rounded-tr-none shadow-indigo-900/20';

        switch (role) {
            case 'ADMIN': return 'bg-slate-800 border-l-4 border-red-500 text-slate-200 rounded-tl-none';
            case 'LEADER': return 'bg-slate-800 border-l-4 border-amber-500 text-slate-200 rounded-tl-none';
            default: return 'bg-slate-800/80 border border-slate-700 text-slate-200 rounded-tl-none';
        }
    };

    return (
        <div className="flex flex-col space-y-6 animate-in fade-in duration-500">
            {messages.map((msg, idx) => {
                const isUser = msg.role === 'user';

                return (
                    <div key={idx} className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
                        <div className={`flex max-w-[85%] sm:max-w-[70%] gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>

                            {/* AVATAR/ICON AREA */}
                            <div className={`h-9 w-9 rounded-xl flex items-center justify-center shrink-0 shadow-lg ${
                                isUser ? 'bg-indigo-500 shadow-indigo-500/20' : 'bg-slate-800 border border-slate-700'
                            }`}>
                                {msg.role === 'ai' ? (
                                    <Bot size={20} className="text-indigo-400" />
                                ) : (
                                    getRoleIcon(msg.senderRole)
                                )}
                            </div>

                            {/* MESSAGE CONTENT */}
                            <div className="flex flex-col">
                                {/* Info Pengirim (Hanya tampil jika bukan User saat ini) */}
                                {!isUser && (
                                    <div className="flex items-center gap-2 mb-1 px-1">
                    <span className="text-[10px] font-black text-white tracking-wide uppercase">
                      {msg.senderName || "System AI"}
                    </span>
                                        <span className="text-[8px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-500 font-bold border border-slate-700">
                      {msg.senderRole || "BOT"}
                    </span>
                                    </div>
                                )}

                                {/* Bubble Chat */}
                                <div className={`relative px-4 py-3 rounded-2xl text-sm leading-relaxed backdrop-blur-sm shadow-xl ${getBubbleStyle(msg.senderRole, isUser)}`}>
                                    {msg.text}

                                    {/* Timestamp & Status (Simulasi WebSocket Sent) */}
                                    <div className={`flex items-center gap-1 mt-1.5 ${isUser ? 'justify-end' : 'justify-start'}`}>
                                        <span className="text-[9px] opacity-50 font-mono">20:00</span>
                                        {isUser && <CheckCheck size={12} className="text-indigo-300 opacity-70" />}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default ChatArea;