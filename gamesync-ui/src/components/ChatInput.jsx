import React from 'react';
import { Send } from 'lucide-react';

const ChatInput = ({ input, setInput, onSend }) => {
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            onSend();
        }
    };

    return (
        <div className="p-6 bg-slate-900/80 border-t border-slate-800">
            <div className="max-w-4xl mx-auto relative">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyPress}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl py-4 pl-6 pr-14 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all text-slate-100"
                    placeholder="Tanya AI untuk jadwal mabar..."
                />
                <button
                    onClick={onSend}
                    className="absolute right-3 top-1/2 -translate-y-1/2 bg-indigo-500 hover:bg-indigo-400 p-2 rounded-lg transition-colors text-white"
                >
                    <Send size={20} />
                </button>
            </div>
        </div>
    );
};

export default ChatInput;