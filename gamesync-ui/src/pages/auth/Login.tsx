import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Sword,
    User,
    Lock,
    LogIn,
    AlertCircle,
    ArrowLeft,
    Shield
} from 'lucide-react';
import RPGBackground from '../../components/ui/RPGBackground';
import api from '../../api/axios';

const Login: React.FC = () => {
    const navigate = useNavigate();

    // State untuk menangkap input user
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        console.log("=== ATTEMPTING LOGIN ===");

        try {
            // 1. Tembak API Backend
            const response = await api.post('/auth/signin', {
                username: username,
                password: password
            });

            console.log("Login Response Success:", response.data);

            const { token, id, username: dbUsername, role, guildId, level } = response.data;

            // 3. Simpan ke LocalStorage (TERMASUK LEVEL)
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify({
                id,
                username: dbUsername,
                role,
                guildId,
                level: level || 1 // <--- TAMBAHKAN INI (Default 1 jika null)
            }));
            // ----------------------------------

            console.log("Data saved to LocalStorage (Level included). Redirecting...");

            // 4. Redirect
            window.location.href = '/dashboard';

        } catch (err: any) {
            console.error("=== LOGIN ERROR ===");
            if (err.response) {
                setError(err.response.data.message || "Authentication failed.");
            } else if (err.request) {
                setError("Server is offline.");
            } else {
                setError("Application Error.");
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="relative min-h-screen w-full flex items-center justify-center p-4 font-sans text-amber-50 selection:bg-amber-500/30 overflow-hidden">

            {/* Background bertema RPG */}
            <RPGBackground />

            {/* Tombol Kembali ke Landing Page */}
            <button
                onClick={() => navigate('/')}
                className="absolute top-6 left-6 z-20 flex items-center gap-3 text-amber-500/60 hover:text-amber-400 transition-all group font-bold text-[10px] tracking-[0.2em] uppercase"
            >
                <div className="p-2 rounded-full bg-black/40 border border-amber-900/30 group-hover:border-amber-500/50 group-hover:bg-amber-900/20 transition-colors">
                    <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                </div>
                Return to Portal
            </button>

            {/* Form Login Card */}
            <div className="relative z-10 w-full max-w-md bg-black/60 backdrop-blur-xl p-8 md:p-10 rounded-3xl border border-amber-500/20 shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden">

                {/* Dekorasi Garis Glow */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-1 bg-gradient-to-r from-transparent via-amber-500/50 to-transparent shadow-[0_0_15px_#f59e0b]"></div>

                <div className="text-center mb-10">
                    <div className="inline-flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-700 to-amber-900 shadow-[0_0_20px_rgba(245,158,11,0.3)] mb-6 border border-amber-500/30 relative">
                        <div className="absolute inset-0 border border-amber-400/20 rounded-2xl m-1"></div>
                        <Sword size={40} className="text-white drop-shadow-md" />
                    </div>
                    <h2 className="text-3xl font-bold text-white tracking-tight uppercase text-transparent bg-clip-text bg-gradient-to-b from-amber-100 to-amber-600">
                        Enter Realm
                    </h2>
                    <p className="text-amber-500/60 mt-2 text-xs uppercase tracking-[0.2em] font-bold">
                        Access Command Center
                    </p>
                </div>

                {/* Pesan Error Alert */}
                {error && (
                    <div className="flex items-center gap-3 p-4 mb-6 rounded-xl bg-red-900/20 border border-red-500/30 text-red-400 text-xs font-bold tracking-wide animate-pulse">
                        <AlertCircle size={18} />
                        <span>{error}</span>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Input Username */}
                    <div className="space-y-2 group">
                        <label className="text-[10px] font-bold uppercase text-amber-500/70 ml-1 tracking-widest group-focus-within:text-amber-400 transition-colors">
                            Adventurer Username
                        </label>
                        <div className="relative">
                            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-amber-700 group-focus-within:text-amber-50 text-amber-500 transition-colors" size={20} />
                            <input
                                type="text"
                                required
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="w-full rounded-xl bg-black/40 border border-amber-900/40 py-4 pl-12 pr-4 text-amber-100 placeholder:text-amber-900/50 focus:ring-1 focus:ring-amber-500/50 focus:border-amber-500/50 outline-none transition-all"
                                placeholder="Enter hero name..."
                            />
                        </div>
                    </div>

                    {/* Input Password */}
                    <div className="space-y-2 group">
                        <label className="text-[10px] font-bold uppercase text-amber-500/70 ml-1 tracking-widest group-focus-within:text-amber-400 transition-colors">
                            Secret Passcode
                        </label>
                        <div className="relative">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-amber-700 group-focus-within:text-amber-50 text-amber-500 transition-colors" size={20} />
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

                    {/* Tombol Submit */}
                    <button
                        type="submit"
                        disabled={isLoading}
                        className={`w-full flex items-center justify-center gap-3 rounded-xl py-4 font-bold text-xs tracking-[0.2em] uppercase transition-all relative overflow-hidden group ${
                            isLoading
                                ? 'bg-amber-900/30 text-amber-500/50 cursor-not-allowed border border-amber-900/30'
                                : 'bg-gradient-to-r from-amber-700 to-amber-900 text-white hover:shadow-[0_0_20px_rgba(245,158,11,0.4)] border border-amber-500/30'
                        }`}
                    >
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

                {/* Footer Link Register */}
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