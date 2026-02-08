import React from 'react';
import {
    Send,
    Sword,
    Paperclip,
    Smile,
    Plus
} from 'lucide-react';

interface ChatInputProps {
    input: string;
    setInput: (value: string) => void;
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
        <div className="w-full flex justify-center">
            {/* CONTAINER UTAMA:
         - max-w-4xl: Membatasi lebar agar tetap di tengah (tidak terlalu panjang di monitor lebar).
         - rounded-full: Membuat bentuk kapsul (bukan kotak).
         - bg-black/60: Background lebih gelap agar kontras dengan footer.
      */}
            <div className="w-full max-w-4xl flex items-center gap-2 p-1.5 pl-4 bg-[#0a0510] border border-amber-900/40 rounded-full shadow-lg backdrop-blur-md focus-within:border-amber-500/60 focus-within:shadow-[0_0_20px_rgba(245,158,11,0.15)] transition-all duration-300">

                {/* [KIRI] Tools (Attach) */}
                <div className="flex items-center gap-1">
                    {/* Mobile: Plus Icon */}
                    <button className="md:hidden text-amber-500/60 hover:text-amber-400 p-2 rounded-full hover:bg-amber-900/20 transition-colors">
                        <Plus size={20} />
                    </button>

                    {/* Desktop: Paperclip */}
                    <button className="hidden md:block text-amber-500/60 hover:text-amber-400 p-2 rounded-full hover:bg-amber-900/20 transition-colors" title="Add Artifact">
                        <Paperclip size={18} />
                    </button>
                </div>

                {/* [TENGAH] Input Field */}
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyPress}
                    placeholder="Write your spell here..."
                    className="flex-1 bg-transparent border-none text-amber-50 placeholder:text-amber-900/50 focus:ring-0 px-2 py-3 text-sm font-sans"
                    autoComplete="off"
                />

                {/* [KANAN] Actions */}
                <div className="flex items-center gap-1 pr-1">
                    {/* Emoji Button */}
                    <button className="hidden md:block text-amber-500/60 hover:text-amber-400 p-2 rounded-full hover:bg-amber-900/20 transition-colors">
                        <Smile size={20} />
                    </button>

                    {/* Send Button (Lingkaran) */}
                    <button
                        onClick={onSend}
                        disabled={!input.trim()}
                        className={`h-10 w-10 flex items-center justify-center rounded-full transition-all duration-300 group relative overflow-hidden ${
                            input.trim()
                                ? 'bg-gradient-to-br from-amber-600 to-amber-800 text-white shadow-[0_0_15px_rgba(245,158,11,0.4)] hover:scale-105'
                                : 'bg-amber-900/20 text-amber-500/20 cursor-not-allowed'
                        }`}
                    >
                        {/* Shine Effect */}
                        {input.trim() && <div className="absolute inset-0 bg-white/20 skew-x-12 -translate-x-full group-hover:animate-shine" />}

                        {input.trim() ? (
                            <Sword size={18} className="fill-current animate-pulse -rotate-45 mb-0.5 ml-0.5" />
                        ) : (
                            <Send size={18} className="ml-0.5" />
                        )}
                    </button>
                </div>

            </div>
        </div>
    );
};

export default ChatInput;