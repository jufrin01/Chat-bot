import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Gamepad2, Mail, Lock, LogIn, AlertCircle } from 'lucide-react';

const Login: React.FC = () => {
    const navigate = useNavigate();

    // State untuk form login
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        // Simulasi delay proses autentikasi
        setTimeout(() => {
            // LOGIKA LOGIN DUMMY JUFRIN
            // Pastikan email dan password sama persis dengan instruksi kamu
            if (email === 'jufrin200@gmail.com' && password === '123') {

                // 1. Simpan data ke LocalStorage agar dibaca oleh AppRouter
                localStorage.setItem('isLoggedIn', 'true');
                localStorage.setItem('username', 'JufrinDev');
                localStorage.setItem('role', 'LEADER'); // Default role kamu

                // 2. Redirect paksa ke Dashboard agar state Router ter-refresh
                window.location.href = '/dashboard';

            } else {
                // Tampilkan error jika kredensial tidak cocok
                setError('Email atau Password salah! (Gunakan: jufrin200@gmail.com / 123)');
                setIsLoading(false);
            }
        }, 1000);
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-slate-950 p-4">
            <div className="w-full max-w-md space-y-8 rounded-3xl bg-slate-900 p-8 border border-slate-800 shadow-2xl relative overflow-hidden">

                {/* Dekorasi Cahaya (Glow Effect) */}
                <div className="absolute -top-24 -left-24 h-48 w-48 bg-indigo-600/10 blur-3xl rounded-full" />

                <div className="text-center relative">
                    <div className="inline-flex h-20 w-20 items-center justify-center rounded-2xl bg-indigo-600 shadow-lg mb-6">
                        <Gamepad2 size={40} className="text-white" />
                    </div>
                    <h2 className="text-3xl font-black text-white tracking-tight">GAMESYNC</h2>
                    <p className="text-slate-400 mt-2 text-xs uppercase tracking-[0.2em] font-bold">Login to Access Dashboard</p>
                </div>

                {/* Notifikasi Error */}
                {error && (
                    <div className="flex items-center gap-2 p-3 rounded-xl bg-red-500/10 border border-red-500/50 text-red-500 text-sm animate-pulse">
                        <AlertCircle size={18} />
                        <span>{error}</span>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6 relative">
                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase text-slate-500 ml-1">Email Address</label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full rounded-xl bg-slate-800 border border-slate-700 py-4 pl-11 pr-4 text-white focus:ring-2 focus:ring-indigo-500/50 outline-none transition-all"
                                placeholder="jufrin200@gmail.com"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase text-slate-500 ml-1">Password</label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
                            <input
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full rounded-xl bg-slate-800 border border-slate-700 py-4 pl-11 pr-4 text-white focus:ring-2 focus:ring-indigo-500/50 outline-none transition-all"
                                placeholder="123"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className={`w-full flex items-center justify-center gap-2 rounded-xl py-4 font-black text-xs tracking-widest text-white transition-all ${
                            isLoading ? 'bg-slate-700 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-500 shadow-lg shadow-indigo-600/30 active:scale-[0.98]'
                        }`}
                    >
                        {isLoading ? "AUTHENTICATING..." : <><LogIn size={20} /> SIGN IN</>}
                    </button>
                </form>

                <div className="text-center pt-4">
                    <p className="text-slate-500 text-xs">
                        Don't have an account?{' '}
                        <button
                            type="button"
                            onClick={() => navigate('/register')}
                            className="text-indigo-400 hover:text-indigo-300 font-black"
                        >
                            CREATE ACCOUNT
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;