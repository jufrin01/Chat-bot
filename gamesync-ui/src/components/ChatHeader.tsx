import React from 'react';
import { Bot, Circle } from 'lucide-react';

// 1. Tambahkan Interface agar TypeScript mengizinkan props username & status
interface ChatHeaderProps {
    username?: string;
    status?: string;
}

// 2. Gunakan props tersebut di dalam komponen
const ChatHeader: React.FC<ChatHeaderProps> = ({
                                                   username = "Guest",
                                                   status = "Offline"
                                               }) => {

    return (
        <div className="flex items-center gap-3">
            {/* Icon Avatar AI / Bot */}
            <div className="h-10 w-10 rounded-xl bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
                <Bot size={24} className="text-white" />
            </div>

            <div className="flex flex-col">
                <h2 className="text-sm font-bold text-white tracking-wide uppercase">
                    {username}
                </h2>
                <div className="flex items-center gap-1.5">
                    <Circle size={8} className="fill-emerald-500 text-emerald-500 animate-pulse" />
                    <span className="text-[10px] font-medium text-slate-400 uppercase tracking-widest">
            {status}
          </span>
                </div>
            </div>
        </div>
    );
};

export default ChatHeader;