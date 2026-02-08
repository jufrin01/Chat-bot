import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Sword,
    Mail,
    Lock,
    LogIn,
    AlertCircle,
    ArrowLeft,
    Shield
} from 'lucide-react';
import RPGBackground from '../../components/ui/RPGBackground';

const Login: React.FC = () => {
    const navigate = useNavigate();

    // State Form
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        // Simulasi Request Server
        setTimeout(() => {
            // --- LOGIKA LOGIN DUMMY ---
            if (email === 'jufrin200@gmail.com' && password === '123') {

                // 1. Simpan Session
                localStorage.setItem('isLoggedIn', 'true');
                localStorage.setItem('username', 'JufrinDev');
                localStorage.setItem('role', 'LEADER'); // Role: ADMIN / LEADER / ANGGOTA

                // 2. Redirect Hard Refresh ke Dashboard (agar state Router ter-reset)
                window.location.href = '/dashboard';

            } else {
                // Error Handler
                setError('Kredensial tidak valid! (Gunakan: jufrin200@gmail.com / 123)');
                setIsLoading(false);
            }
        }, 1500); // Delay 1.5 detik biar kerasa "Loading"
    };

    return (
        <div className="relative min-h-screen w-full flex items-center justify-center p-4 font-sans text-amber-50 selection:bg-amber-500/30 overflow-hidden">

            {/* [LAYER 0] BACKGROUND MMORPG */}
            <RPGBackground />

            {/* [LAYER 1] TOMBOL KEMBALI */}
            <button
                onClick={() => navigate('/')}
                className="absolute top-6 left-6 z-20 flex items-center gap-3 text-amber-500/60 hover:text-amber-400 transition-all group font-bold text-[10px] tracking-[0.2em] uppercase"
            >
                <div className="p-2 rounded-full bg-black/40 border border-amber-900/30 group-hover:border-amber-500/50 group-hover:bg-amber-900/20 transition-colors">
                    <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                </div>
                Return to Portal
            </button>

            {/* [LAYER 2] KARTU LOGIN (Glassmorphism) */}
            <div className="relative z-10 w-full max-w-md bg-black/60 backdrop-blur-xl p-8 md:p-10 rounded-3xl border border-amber-500/20 shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden">

                {/* Dekorasi Glow Internal */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-1 bg-gradient-to-r from-transparent via-amber-500/50 to-transparent shadow-[0_0_15px_#f59e0b]"></div>

                <div className="text-center mb-10">
                    <div className="inline-flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-700 to-amber-900 shadow-[0_0_20px_rgba(245,158,11,0.3)] mb-6 border border-amber-500/30 relative">
                        <div className="absolute inset-0 border border-amber-400/20 rounded-2xl m-1"></div>
                        <Sword size={40} className="text-white drop-shadow-md" />
                    </div>
                    <h2 className="text-3xl font-bold text-white tracking-tight font-rpg uppercase text-transparent bg-clip-text bg-gradient-to-b from-amber-100 to-amber-600">
                        Enter Realm
                    </h2>
                    <p className="text-amber-500/60 mt-2 text-xs uppercase tracking-[0.2em] font-bold">
                        Access Command Center
                    </p>
                </div>

                {/* Notifikasi Error */}
                {error && (
                    <div className="flex items-center gap-3 p-4 mb-6 rounded-xl bg-red-900/20 border border-red-500/30 text-red-400 text-xs font-bold tracking-wide animate-pulse">
                        <AlertCircle size={18} />
                        <span>{error}</span>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">

                    {/* Input Email */}
                    <div className="space-y-2 group">
                        <label className="text-[10px] font-bold uppercase text-amber-500/70 ml-1 tracking-widest group-focus-within:text-amber-400 transition-colors">
                            Adventurer ID (Email)
                        </label>
                        <div className="relative">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-amber-700 group-focus-within:text-amber-500 transition-colors" size={20} />
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full rounded-xl bg-black/40 border border-amber-900/40 py-4 pl-12 pr-4 text-amber-100 placeholder:text-amber-900/50 focus:ring-1 focus:ring-amber-500/50 focus:border-amber-500/50 outline-none transition-all"
                                placeholder="jufrin200@gmail.com"
                            />
                        </div>
                    </div>

                    {/* Input Password */}
                    <div className="space-y-2 group">
                        <label className="text-[10px] font-bold uppercase text-amber-500/70 ml-1 tracking-widest group-focus-within:text-amber-400 transition-colors">
                            Secret Passcode
                        </label>
                        <div className="relative">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-amber-700 group-focus-within:text-amber-500 transition-colors" size={20} />
                            <input
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full rounded-xl bg-black/40 border border-amber-900/40 py-4 pl-12 pr-4 text-amber-100 placeholder:text-amber-900/50 focus:ring-1 focus:ring-amber-500/50 focus:border-amber-500/50 outline-none transition-all"
                                placeholder="••••••••"
                            />
                        </div>
                    </div>

                    {/* Tombol Login */}
                    <button
                        type="submit"
                        disabled={isLoading}
                        className={`w-full flex items-center justify-center gap-3 rounded-xl py-4 font-bold text-xs tracking-[0.2em] uppercase transition-all relative overflow-hidden group ${
                            isLoading
                                ? 'bg-amber-900/30 text-amber-500/50 cursor-not-allowed border border-amber-900/30'
                                : 'bg-gradient-to-r from-amber-700 to-amber-900 text-white hover:shadow-[0_0_20px_rgba(245,158,11,0.4)] border border-amber-500/30'
                        }`}
                    >
                        {/* Efek Shine saat Hover */}
                        {!isLoading && <div className="absolute inset-0 bg-white/20 skew-x-12 -translate-x-full group-hover:animate-shine" />}

                        {isLoading ? (
                            <>
                                <Shield size={18} className="animate-spin" /> VERIFYING MAGIC...
                            </>
                        ) : (
                            <>
                                <LogIn size={18} /> OPEN PORTAL
                            </>
                        )}
                    </button>
                </form>

                {/* Footer Link */}
                <div className="text-center pt-8 border-t border-amber-900/20 mt-8">
                    <p className="text-amber-500/40 text-xs">
                        New to this realm?{' '}
                        <button
                            type="button"
                            onClick={() => navigate('/register')}
                            className="text-amber-500 hover:text-amber-300 font-bold tracking-wider hover:underline transition-all"
                        >
                            CREATE HERO
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;