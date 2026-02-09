import React, { useEffect, useState } from 'react';
import { Sparkles, X } from 'lucide-react';

interface WelcomeToastProps {
    username: string;
    onClose: () => void;
}

const WelcomeToast: React.FC<WelcomeToastProps> = ({ username, onClose }) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // 1. Trigger animasi masuk
        const enterTimer = setTimeout(() => {
            setIsVisible(true);
        }, 100);

        // 2. Trigger animasi keluar setelah 4 detik
        const exitTimer = setTimeout(() => {
            setIsVisible(false);
        }, 4000);

        // 3. Unmount komponen setelah animasi keluar selesai
        const unmountTimer = setTimeout(() => {
            onClose();
        }, 4500);

        return () => {
            clearTimeout(enterTimer);
            clearTimeout(exitTimer);
            clearTimeout(unmountTimer);
        };
    }, [onClose]);

    return (
        <div
            className={`
        /* POSISI: 
           - Fixed: Agar mengambang
           - top-24: Jarak 6rem (96px) dari atas, cukup untuk melewati Navbar (h-20/80px)
           - left-1/2 -translate-x-1/2: Agar tetap di tengah horizontal
        */
        fixed top-24 left-1/2 -translate-x-1/2 
        z-[100] /* Z-Index cukup tinggi, tapi di bawah modal/overlay lain jika ada */
        
        /* LAYOUT & STYLE */
        flex items-center gap-4 p-1.5 pr-5 pl-2
        bg-black/90 backdrop-blur-xl border border-amber-500/50 rounded-full
        shadow-[0_0_30px_rgba(245,158,11,0.4)]
        
        /* ANIMASI TRANSISI */
        transition-all duration-500 ease-out transform
        ${isVisible
                ? 'translate-y-0 opacity-100 scale-100' // Posisi Akhir (Muncul)
                : '-translate-y-10 opacity-0 scale-95'  // Posisi Awal (Sedikit di atasnya)
            }
      `}
        >
            {/* --- ICON CIRCLE --- */}
            <div className="relative h-10 w-10 rounded-full bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center text-white shadow-inner shrink-0">
                <div className="absolute inset-0 bg-white/20 rounded-full animate-pulse"></div>
                <Sparkles size={20} className="relative z-10" />
            </div>

            {/* --- TEXT CONTENT --- */}
            <div className="flex flex-col whitespace-nowrap">
        <span className="text-[9px] font-bold text-amber-500 uppercase tracking-[0.2em] mb-0.5">
          System Message
        </span>
                <span className="text-xs md:text-sm font-bold text-white tracking-wide">
          Welcome back, <span className="text-amber-400 font-rpg uppercase">{username}</span>
        </span>
            </div>

            {/* --- CLOSE BUTTON --- */}
            <button
                onClick={() => {
                    setIsVisible(false); // Trigger animasi keluar manual
                    setTimeout(onClose, 500);
                }}
                className="ml-2 p-1 rounded-full text-amber-500/50 hover:text-white hover:bg-white/10 transition-colors"
            >
                <X size={14} />
            </button>
        </div>
    );
};

export default WelcomeToast;