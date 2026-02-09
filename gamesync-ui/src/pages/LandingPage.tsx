import React, { useState, useEffect } from 'react';
import Footer from '../layout/Footer';
import RPGBackground from '../components/ui/RPGBackground';
import { useNavigate } from 'react-router-dom';
import {
    Sword,
    Scroll,
    Crown,
    Gem,
    ChevronRight
} from 'lucide-react';

import './LandingPage.css';

const LandingPage: React.FC = () => {
    const navigate = useNavigate();

    // STATE: Deteksi apakah user sudah scroll ke bawah
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            // Jika scroll lebih dari 50px, ubah status jadi true
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="relative min-h-screen w-full overflow-hidden flex flex-col items-center justify-center font-serif text-amber-50">

            {/* --- MMORPG ATMOSPHERE --- */}
            <RPGBackground />

            {/* --- NAVIGATION BAR (UPDATED) --- */}
            <nav
                className={`
                    fixed top-0 left-0 w-full z-50 flex justify-between items-center px-6 lg:px-12 transition-all duration-300
                    ${isScrolled
                    ? 'py-4 bg-black/90 backdrop-blur-md border-b border-amber-900/30 shadow-lg' // Style saat Scroll (Gelap)
                    : 'py-6 bg-transparent border-b border-transparent' // Style saat di Atas (Transparan Penuh)
                }
                `}
            >
                <div className="flex items-center gap-3">
                    <div className="relative">
                        <div className="absolute inset-0 bg-amber-500 blur-md opacity-40"></div>
                        <Sword className="text-amber-400 relative z-10" size={32}/>
                    </div>
                    <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-amber-200 to-amber-600 tracking-widest uppercase font-rpg">
                        GameSync
                    </span>
                </div>

                <div className="hidden md:flex items-center gap-8">
                    <button
                        onClick={() => navigate('/login')}
                        className="text-xs font-bold text-amber-200/70 hover:text-amber-400 transition-colors tracking-[0.2em] uppercase"
                    >
                        Login Realm
                    </button>
                    <button
                        onClick={() => navigate('/register')}
                        className="px-8 py-2 border border-amber-500/30 hover:bg-amber-900/20 text-amber-400 text-xs font-bold tracking-[0.2em] uppercase transition-all duration-500 hover:shadow-[0_0_20px_rgba(245,158,11,0.2)] relative overflow-hidden group"
                    >
                        <span className="relative z-10">Create Hero</span>
                        {/* Shine Effect via CSS Class */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full animate-shine"/>
                    </button>
                </div>
            </nav>

            {/* --- HERO SECTION --- */}
            <div className="relative z-10 text-center px-4 max-w-4xl mt-32 md:mt-12"> {/* Tambah mt-32 agar konten tidak ketutup navbar di mobile */}

                <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-black/40 border border-amber-500/20 text-amber-500 text-[10px] font-bold tracking-[0.3em] mb-10 uppercase shadow-2xl backdrop-blur-md">
                    <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_10px_#22c55e]"></div>
                    Server Online : Jakarta
                </div>

                <h1 className="text-5xl md:text-8xl font-bold text-white tracking-tight mb-6 leading-tight drop-shadow-2xl font-rpg">
                    FORGE YOUR <br/>
                    <span className="text-transparent bg-clip-text bg-gradient-to-b from-amber-300 via-amber-500 to-amber-700 animate-pulse-slow">
                        LEGENDARY SQUAD
                    </span>
                </h1>

                <p className="text-amber-100/60 text-base md:text-lg max-w-2xl mx-auto mb-12 leading-relaxed tracking-wide">
                    Kumpulkan party, atur strategi Raid, dan dominasi dungeon.
                    Platform manajemen guild modern untuk pahlawan sejati.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                    <button
                        onClick={() => navigate('/register')}
                        className="group relative px-10 py-5 bg-gradient-to-b from-amber-600 to-amber-800 rounded-sm shadow-[0_0_30px_rgba(217,119,6,0.4)] hover:shadow-[0_0_50px_rgba(217,119,6,0.6)] hover:-translate-y-1 transition-all duration-300 border border-amber-400/50"
                    >
                        <div className="absolute inset-0 border border-amber-300/20 m-[2px]"></div>
                        <span className="flex items-center gap-3 text-white font-bold text-sm tracking-[0.2em] uppercase">
                           Start Adventure <ChevronRight size={16}/>
                        </span>
                    </button>

                    <button
                        onClick={() => navigate('/login')}
                        className="px-10 py-5 bg-black/40 border border-amber-500/30 hover:border-amber-500/80 hover:bg-black/60 text-amber-100 font-bold text-sm tracking-[0.2em] uppercase transition-all duration-300 backdrop-blur-md"
                    >
                        Enter Portal
                    </button>
                </div>

                {/* --- FEATURE CARDS --- */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-24 text-left font-sans pb-20">
                    <div className="group p-8 relative bg-black/40 border border-amber-900/30 hover:border-amber-500/50 transition-all duration-500 backdrop-blur-sm overflow-hidden">
                        <div className="absolute -inset-1 bg-gradient-to-r from-amber-600 to-purple-600 opacity-0 group-hover:opacity-20 blur transition-opacity duration-500"/>
                        <Crown className="text-amber-500 mb-4 drop-shadow-[0_0_10px_rgba(245,158,11,0.5)]" size={32}/>
                        <h4 className="text-amber-100 font-bold mb-2 uppercase text-xs tracking-widest">Guild Management</h4>
                        <p className="text-amber-200/50 text-xs leading-relaxed">Kelola pangkat member, rekrutmen, dan struktur komando guild.</p>
                    </div>

                    <div className="group p-8 relative bg-black/40 border border-amber-900/30 hover:border-purple-500/50 transition-all duration-500 backdrop-blur-sm">
                        <Scroll className="text-purple-400 mb-4 drop-shadow-[0_0_10px_rgba(168,85,247,0.5)]" size={32}/>
                        <h4 className="text-amber-100 font-bold mb-2 uppercase text-xs tracking-widest">Raid Planner</h4>
                        <p className="text-amber-200/50 text-xs leading-relaxed">Jadwal otomatis untuk Dungeon, Raid Boss, dan Guild War.</p>
                    </div>

                    <div className="group p-8 relative bg-black/40 border border-amber-900/30 hover:border-emerald-500/50 transition-all duration-500 backdrop-blur-sm">
                        <Gem className="text-emerald-400 mb-4 drop-shadow-[0_0_10px_rgba(52,211,153,0.5)]" size={32}/>
                        <h4 className="text-amber-100 font-bold mb-2 uppercase text-xs tracking-widest">Crystal Comms</h4>
                        <p className="text-amber-200/50 text-xs leading-relaxed">Chat real-time bertenaga Spring Boot, sejernih kristal.</p>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    );
};

export default LandingPage;