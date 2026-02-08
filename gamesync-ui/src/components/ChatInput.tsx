import React from 'react';
import { Send, Zap } from 'lucide-react';

interface ChatInputProps {
    input: string;
    setInput: (val: string) => void;
    onSend: () => void;
}

const ChatInput: React.FC<ChatInputProps> = ({ input, setInput, onSend }) => {
    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            onSend();
        }
    };

    return (
        <div className="w-full max-w-4xl mx-auto px-4 pb-6 pt-2">
            <div className="relative group">
                {/* Glow Effect saat fokus */}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl blur opacity-20 group-focus-within:opacity-40 transition duration-300"></div>

                <div className="relative flex items-center bg-slate-900/80 backdrop-blur-xl border border-slate-700/50 rounded-2xl shadow-2xl overflow-hidden px-4 py-2">

                    {/* Ikon Dekoratif */}
                    <div className="hidden sm:flex h-10 w-10 items-center justify-center text-slate-500">
                        <Zap size={20} className="group-focus-within:text-indigo-400 transition-colors" />
                    </div>

                    <textarea
                        rows={1}
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyPress}
                        placeholder="Tanya AI untuk jadwal mabar..."
                        className="flex-1 bg-transparent border-none focus:ring-0 text-slate-200 placeholder-slate-500 py-3 px-2 resize-none max-h-32 font-medium"
                    />

                    <div className="flex items-center gap-2 ml-2">
                        {/* Tombol Kirim Modern */}
                        <button
                            onClick={onSend}
                            disabled={!input.trim()}
                            className={`flex h-10 w-10 items-center justify-center rounded-xl transition-all duration-200 ${
                                input.trim()
                                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30 hover:scale-105 active:scale-95'
                                    : 'bg-slate-800 text-slate-600 cursor-not-allowed'
                            }`}
                        >
                            <Send size={18} className={input.trim() ? "translate-x-0.5 -translate-y-0.5" : ""} />
                        </button>
                    </div>
                </div>

                {/* Keterangan Kecil */}
                <p className="text-[10px] text-center text-slate-600 mt-2 uppercase tracking-[0.2em] font-bold">
                    GameSync AI can make mistakes. Check important raid dates.
                </p>
            </div>
        </div>
    );
};

export default ChatInput;