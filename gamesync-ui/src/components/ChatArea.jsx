import React from 'react';
import { Bot, User } from 'lucide-react';

const ChatArea = ({ messages }) => {
    return (
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.map((msg, idx) => (
                <div
                    key={idx}
                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                    <div className={`flex gap-3 max-w-[80%] ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                        {/* Avatar Icon */}
                        <div className={`w-8 h-8 rounded flex items-center justify-center shrink-0 ${
                            msg.role === 'ai' ? 'bg-indigo-900 text-indigo-300' : 'bg-slate-700 text-slate-300'
                        }`}>
                            {msg.role === 'ai' ? <Bot size={18} /> : <User size={18} />}
                        </div>

                        {/* Message Bubble */}
                        <div className={`p-4 rounded-2xl ${
                            msg.role === 'ai'
                                ? 'bg-slate-800 text-slate-200 rounded-tl-none border border-slate-700'
                                : 'bg-indigo-600 text-white rounded-tr-none shadow-lg shadow-indigo-500/20'
                        }`}>
                            <p className="text-sm leading-relaxed">{msg.text}</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ChatArea;