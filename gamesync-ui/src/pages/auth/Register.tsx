import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Gamepad2,
    Mail,
    Lock,
    User,
    ShieldCheck,
    UserPlus,
    ArrowLeft
} from 'lucide-react';

const Register: React.FC = () => {
    const navigate = useNavigate();

    // State untuk form pendaftaran
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        role: 'ANGGOTA' // Default role sebagai Anggota
    });

    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        // Simulasi pendaftaran dan penyimpanan ke LocalStorage
        setTimeout(() => {
            console.log('User Registered:', formData);

            // Simulasi: Setelah daftar, langsung arahkan ke login
            alert(`Akun ${formData.username} sebagai ${formData.role} berhasil dibuat!`);
            navigate('/login');
            setIsLoading(false);
        }, 1500);
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-slate-950 p-4">
            {/* Tombol Back ke Login */}
            <button
                onClick={() => navigate('/login')}
                className="absolute top-8 left-8 flex items-center gap-2 text-slate-500 hover:text-white transition-colors font-bold text-xs tracking-widest"
            >
                <ArrowLeft size={16} /> BACK TO LOGIN
            </button>

            <div className="w-full max-w-md space-y-8 rounded-3xl bg-slate-900 p-8 border border-slate-800 shadow-2xl relative overflow-hidden">
                {/* Dekorasi Glow */}
                <div className="absolute -top-24 -right-24 h-48 w-48 bg-indigo-600/10 blur-3xl rounded-full" />

                <div className="text-center relative">
                    <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-600 shadow-lg mb-4">
                        <UserPlus size={32} className="text-white" />
                    </div>
                    <h2 className="text-3xl font-black text-white tracking-tight">CREATE ACCOUNT</h2>
                    <p className="text-slate-400 mt-1 text-xs uppercase tracking-[0.2em]">Join the GameSync Squad</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5 relative">
                    {/* Input Username */}
                    <div className="space-y-1.5">
                        <label className="text-[10px] font-black uppercase text-slate-500 ml-1">Username</label>
                        <div className="relative">
                            <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                            <input
                                type="text"
                                required
                                value={formData.username}
                                onChange={(e) => setFormData({...formData, username: e.target.value})}
                                className="w-full rounded-xl bg-slate-800 border border-slate-700 py-3 pl-11 pr-4 text-white focus:ring-2 focus:ring-indigo-500/50 outline-none transition-all"
                                placeholder="JufrinDev"
                            />
                        </div>
                    </div>

                    {/* Input Email */}
                    <div className="space-y-1.5">
                        <label className="text-[10px] font-black uppercase text-slate-500 ml-1">Email Address</label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                            <input
                                type="email"
                                required
                                value={formData.email}
                                onChange={(e) => setFormData({...formData, email: e.target.value})}
                                className="w-full rounded-xl bg-slate-800 border border-slate-700 py-3 pl-11 pr-4 text-white focus:ring-2 focus:ring-indigo-500/50 outline-none transition-all"
                                placeholder="jufrin200@gmail.com"
                            />
                        </div>
                    </div>

                    {/* Select Role */}
                    <div className="space-y-1.5">
                        <label className="text-[10px] font-black uppercase text-slate-500 ml-1">Select Your Role</label>
                        <div className="relative">
                            <ShieldCheck className="absolute left-3 top-1/2 -translate-y-1/2 text-indigo-500" size={18} />
                            <select
                                value={formData.role}
                                onChange={(e) => setFormData({...formData, role: e.target.value})}
                                className="w-full rounded-xl bg-slate-800 border border-slate-700 py-3 pl-11 pr-10 text-white focus:ring-2 focus:ring-indigo-500/50 outline-none transition-all appearance-none cursor-pointer"
                            >
                                <option value="ANGGOTA">ANGGOTA (Member)</option>
                                <option value="LEADER">LEADER (Squad Boss)</option>
                                <option value="ADMIN">ADMIN (System)</option>
                            </select>
                            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500">
                                <Gamepad2 size={16} />
                            </div>
                        </div>
                    </div>

                    {/* Input Password */}
                    <div className="space-y-1.5">
                        <label className="text-[10px] font-black uppercase text-slate-500 ml-1">Security Password</label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                            <input
                                type="password"
                                required
                                value={formData.password}
                                onChange={(e) => setFormData({...formData, password: e.target.value})}
                                className="w-full rounded-xl bg-slate-800 border border-slate-700 py-3 pl-11 pr-4 text-white focus:ring-2 focus:ring-indigo-500/50 outline-none transition-all"
                                placeholder="••••••••"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className={`w-full flex items-center justify-center gap-2 rounded-xl py-4 font-black text-xs tracking-[0.2em] text-white transition-all ${
                            isLoading ? 'bg-slate-700' : 'bg-indigo-600 hover:bg-indigo-500 shadow-lg shadow-indigo-600/30 active:scale-[0.98]'
                        }`}
                    >
                        {isLoading ? "CREATING ACCOUNT..." : "REGISTER NOW"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Register;