import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    UserPlus,
    Mail,
    Lock,
    User,
    Shield,
    ArrowLeft,
    Scroll,
    Crown,
    AlertCircle // Icon untuk pesan error
} from 'lucide-react';
import RPGBackground from '../../components/ui/RPGBackground';
import api from '../../api/axios'; // Import konfigurasi Axios

const Register: React.FC = () => {
    const navigate = useNavigate();

    // State Form
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        role: 'USER' // Default role (walaupun backend mungkin memaksa USER dulu)
    });

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null); // State untuk menangkap error dari backend

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        try {
            // 1. Tembak API Register Backend
            const response = await api.post('/auth/signup', {
                username: formData.username,
                email: formData.email,
                password: formData.password
                // Note: Role dikirim tapi di backend logic saat ini default-nya "USER"
                // Jika ingin role dinamis, logic AuthService di backend perlu disesuaikan.
            });

            console.log('Registration Success:', response.data);

            // 2. Notifikasi Sukses
            alert(`Hero ${formData.username} berhasil dipanggil! Silakan Login.`);

            // 3. Redirect ke halaman Login
            window.location.href = '/login';

        } catch (err: any) {
            console.error("Registration Failed:", err);

            // 4. Tangkap pesan error dari Backend (misal: "Error: Email is already in use!")
            if (err.response && err.response.data) {
                setError(err.response.data.message || "Gagal mendaftar. Coba lagi.");
            } else {
                setError("Server tidak merespons. Pastikan Backend sudah jalan.");
            }
        } finally {
            setIsLoading(false);
        }
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
                Back to Portal
            </button>

            {/* [LAYER 2] KARTU REGISTER */}
            <div className="relative z-10 w-full max-w-md bg-black/60 backdrop-blur-xl p-8 md:p-10 rounded-3xl border border-amber-500/20 shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden">

                {/* Dekorasi Glow Internal */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 blur-[80px] rounded-full pointer-events-none"></div>

                <div className="text-center mb-8">
                    <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-800 to-black border border-amber-500/30 shadow-lg mb-4 relative overflow-hidden">
                        <div className="absolute inset-0 bg-white/10 skew-x-12 -translate-x-full animate-shine"></div>
                        <UserPlus size={32} className="text-amber-400" />
                    </div>
                    <h2 className="text-2xl font-bold text-white tracking-tight font-rpg uppercase text-transparent bg-clip-text bg-gradient-to-b from-amber-100 to-amber-600">
                        Summon New Hero
                    </h2>
                    <p className="text-amber-500/60 mt-2 text-xs uppercase tracking-[0.2em] font-bold">
                        Join the Guild
                    </p>
                </div>

                {/* ERROR ALERT BOX */}
                {error && (
                    <div className="flex items-center gap-3 p-4 mb-6 rounded-xl bg-red-900/20 border border-red-500/30 text-red-400 text-xs font-bold tracking-wide animate-pulse">
                        <AlertCircle size={18} />
                        <span>{error}</span>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">

                    {/* Input Username */}
                    <div className="space-y-1.5 group">
                        <label className="text-[10px] font-bold uppercase text-amber-500/70 ml-1 tracking-widest group-focus-within:text-amber-400 transition-colors">
                            Hero Name
                        </label>
                        <div className="relative">
                            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-amber-700 group-focus-within:text-amber-500 transition-colors" size={18} />
                            <input
                                type="text"
                                required
                                value={formData.username}
                                onChange={(e) => setFormData({...formData, username: e.target.value})}
                                className="w-full rounded-xl bg-black/40 border border-amber-900/40 py-3.5 pl-12 pr-4 text-amber-100 placeholder:text-amber-900/50 focus:ring-1 focus:ring-amber-500/50 focus:border-amber-500/50 outline-none transition-all"
                                placeholder="JufrinDev"
                            />
                        </div>
                    </div>

                    {/* Input Email */}
                    <div className="space-y-1.5 group">
                        <label className="text-[10px] font-bold uppercase text-amber-500/70 ml-1 tracking-widest group-focus-within:text-amber-400 transition-colors">
                            Owl Mail (Email)
                        </label>
                        <div className="relative">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-amber-700 group-focus-within:text-amber-500 transition-colors" size={18} />
                            <input
                                type="email"
                                required
                                value={formData.email}
                                onChange={(e) => setFormData({...formData, email: e.target.value})}
                                className="w-full rounded-xl bg-black/40 border border-amber-900/40 py-3.5 pl-12 pr-4 text-amber-100 placeholder:text-amber-900/50 focus:ring-1 focus:ring-amber-500/50 focus:border-amber-500/50 outline-none transition-all"
                                placeholder="jufrin200@gmail.com"
                            />
                        </div>
                    </div>

                    {/* Select Role */}
                    <div className="space-y-1.5 group">
                        <label className="text-[10px] font-bold uppercase text-amber-500/70 ml-1 tracking-widest group-focus-within:text-amber-400 transition-colors">
                            Guild Class
                        </label>
                        <div className="relative">
                            <Shield className="absolute left-4 top-1/2 -translate-y-1/2 text-amber-500 group-focus-within:text-amber-400 transition-colors" size={18} />

                            <select
                                value={formData.role}
                                onChange={(e) => setFormData({...formData, role: e.target.value})}
                                className="w-full rounded-xl bg-black/40 border border-amber-900/40 py-3.5 pl-12 pr-10 text-amber-100 focus:ring-1 focus:ring-amber-500/50 focus:border-amber-500/50 outline-none transition-all appearance-none cursor-pointer hover:bg-amber-900/10"
                            >
                                <option value="USER" className="bg-slate-900 text-amber-100 py-2">🛡️ ADVENTURER (User)</option>
                                <option value="LEADER" className="bg-slate-900 text-amber-100 py-2">👑 LEADER (Squad Boss)</option>
                            </select>

                            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-amber-700">
                                <Crown size={14} />
                            </div>
                        </div>
                    </div>

                    {/* Input Password */}
                    <div className="space-y-1.5 group">
                        <label className="text-[10px] font-bold uppercase text-amber-500/70 ml-1 tracking-widest group-focus-within:text-amber-400 transition-colors">
                            Secret Passcode
                        </label>
                        <div className="relative">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-amber-700 group-focus-within:text-amber-500 transition-colors" size={18} />
                            <input
                                type="password"
                                required
                                value={formData.password}
                                onChange={(e) => setFormData({...formData, password: e.target.value})}
                                className="w-full rounded-xl bg-black/40 border border-amber-900/40 py-3.5 pl-12 pr-4 text-amber-100 placeholder:text-amber-900/50 focus:ring-1 focus:ring-amber-500/50 focus:border-amber-500/50 outline-none transition-all"
                                placeholder="••••••••"
                            />
                        </div>
                    </div>

                    {/* Tombol Register */}
                    <button
                        type="submit"
                        disabled={isLoading}
                        className={`w-full flex items-center justify-center gap-3 rounded-xl py-4 font-bold text-xs tracking-[0.2em] uppercase transition-all mt-4 relative overflow-hidden group ${
                            isLoading
                                ? 'bg-amber-900/30 text-amber-500/50 cursor-not-allowed border border-amber-900/30'
                                : 'bg-gradient-to-r from-amber-700 to-amber-900 text-white hover:shadow-[0_0_20px_rgba(245,158,11,0.4)] border border-amber-500/30 hover:scale-[1.02]'
                        }`}
                    >
                        {!isLoading && <div className="absolute inset-0 bg-white/20 skew-x-12 -translate-x-full group-hover:animate-shine" />}

                        {isLoading ? "SUMMONING..." : "START ADVENTURE"}
                    </button>
                </form>

                {/* Footer Link */}
                <div className="text-center pt-6 border-t border-amber-900/20 mt-6">
                    <button
                        onClick={() => navigate('/login')}
                        className="text-amber-500/60 hover:text-amber-400 text-xs font-bold tracking-wider hover:underline transition-colors flex items-center justify-center gap-2 mx-auto"
                    >
                        <Scroll size={14} />
                        Already have a hero? Login
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Register;