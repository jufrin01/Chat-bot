import React, { useState } from 'react';
import {
    Save,
    Shield,
    Mail,
    Bell,
    Volume2,
    LogOut,
    Edit2,
    Sword,
    Scroll,
    Settings as SettingsIcon
} from 'lucide-react';
import UserPhoto from '../../components/ui/UserPhoto';

const Settings: React.FC = () => {

    // --- STATE DUMMY DATA ---
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        username: 'JufrinDev',
        title: 'Guild Leader',
        email: 'jufrin200@gmail.com',
        bio: 'Backend Developer specializing in Spring Boot architecture and high-scalability systems.',
        notifications: true,
        sound: true
    });

    const handleSave = () => {
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            alert("Character Profile Updated!");
        }, 1500);
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8 pb-10 animate-in fade-in duration-500 font-sans text-amber-50">

            {/* --- 1. HERO HEADER --- */}
            <div className="relative p-6 md:p-8 rounded-3xl bg-black/40 backdrop-blur-xl border border-amber-500/20 shadow-[0_0_30px_rgba(0,0,0,0.5)] overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-amber-600/10 blur-[100px] rounded-full pointer-events-none"></div>

                <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-8">
                    <div className="flex flex-col items-center">
                        <UserPhoto
                            src={null}
                            alt={formData.username}
                            role="LEADER"
                            size="xl"
                            status="online"
                            editable={true}
                            onEditClick={() => alert("Fitur Upload Foto sedang dibangun oleh Blacksmith!")}
                            className="mb-4"
                        />
                        <div className="px-3 py-1 rounded-full bg-amber-900/40 border border-amber-500/30 text-[10px] font-bold text-amber-400 uppercase tracking-widest shadow-inner">
                            Level 99
                        </div>
                    </div>

                    <div className="flex-1 text-center md:text-left space-y-2">
                        <h2 className="text-3xl font-bold text-white font-rpg tracking-wide uppercase flex items-center justify-center md:justify-start gap-2">
                            {formData.username}
                            <Edit2 size={16} className="text-amber-500/50 cursor-pointer hover:text-amber-400 transition-colors" />
                        </h2>
                        <p className="text-amber-500 font-bold uppercase tracking-[0.15em] text-xs flex items-center justify-center md:justify-start gap-2">
                            <Sword size={12} /> {formData.title}
                        </p>

                        <div className="w-full max-w-md mt-4 group">
                            <div className="flex justify-between text-[9px] text-amber-500/60 uppercase font-bold mb-1">
                                <span>Experience</span>
                                <span>9,840 / 10,000 XP</span>
                            </div>
                            <div className="h-2 w-full bg-black/60 rounded-full border border-amber-900/30 overflow-hidden">
                                <div className="h-full w-[90%] bg-gradient-to-r from-amber-700 to-amber-500 shadow-[0_0_10px_#f59e0b] group-hover:animate-pulse"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* --- 2. FORM SETTINGS --- */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* KOLOM KIRI */}
                <div className="space-y-6">
                    <div className="p-6 rounded-2xl bg-black/40 border border-amber-900/30 backdrop-blur-md">
                        <div className="flex items-center gap-2 mb-6 border-b border-amber-900/20 pb-2">
                            <Scroll size={18} className="text-amber-500" />
                            <h3 className="text-sm font-bold text-amber-100 uppercase tracking-widest">Hero Attributes</h3>
                        </div>

                        <div className="space-y-4">
                            <div className="space-y-1.5 group">
                                <label className="text-[10px] font-bold uppercase text-amber-500/60 ml-1">Hero Name</label>
                                <input
                                    type="text"
                                    value={formData.username}
                                    onChange={(e) => setFormData({...formData, username: e.target.value})}
                                    className="w-full bg-black/40 border border-amber-900/40 rounded-xl px-4 py-3 text-sm text-amber-50 focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/50 outline-none transition-all placeholder:text-amber-900/40"
                                />
                            </div>

                            <div className="space-y-1.5 group">
                                <label className="text-[10px] font-bold uppercase text-amber-500/60 ml-1">Class / Title</label>
                                <div className="relative">
                                    <Shield className="absolute left-3 top-1/2 -translate-y-1/2 text-amber-900/60" size={16} />
                                    <input
                                        type="text"
                                        value={formData.title}
                                        onChange={(e) => setFormData({...formData, title: e.target.value})}
                                        className="w-full bg-black/40 border border-amber-900/40 rounded-xl pl-10 pr-4 py-3 text-sm text-amber-50 focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/50 outline-none transition-all"
                                    />
                                </div>
                            </div>

                            <div className="space-y-1.5 group">
                                <label className="text-[10px] font-bold uppercase text-amber-500/60 ml-1">Legendary Feats (Bio)</label>
                                <textarea
                                    rows={4}
                                    value={formData.bio}
                                    onChange={(e) => setFormData({...formData, bio: e.target.value})}
                                    className="w-full bg-black/40 border border-amber-900/40 rounded-xl px-4 py-3 text-sm text-amber-50 focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/50 outline-none transition-all resize-none"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* KOLOM KANAN */}
                <div className="space-y-6">

                    <div className="p-6 rounded-2xl bg-black/40 border border-amber-900/30 backdrop-blur-md">
                        <div className="flex items-center gap-2 mb-6 border-b border-amber-900/20 pb-2">
                            <Shield size={18} className="text-amber-500" />
                            <h3 className="text-sm font-bold text-amber-100 uppercase tracking-widest">Secret Scrolls</h3>
                        </div>

                        <div className="space-y-4">
                            <div className="space-y-1.5 group">
                                <label className="text-[10px] font-bold uppercase text-amber-500/60 ml-1">Owl Mail (Email)</label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-amber-900/60" size={16} />
                                    <input
                                        type="email"
                                        value={formData.email}
                                        readOnly
                                        className="w-full bg-black/60 border border-amber-900/20 rounded-xl pl-10 pr-4 py-3 text-sm text-amber-500/50 cursor-not-allowed"
                                    />
                                </div>
                            </div>

                            <button className="w-full py-3 rounded-xl border border-amber-500/20 text-amber-500/80 text-xs font-bold uppercase hover:bg-amber-900/20 hover:text-amber-400 transition-all">
                                Change Password
                            </button>
                        </div>
                    </div>

                    <div className="p-6 rounded-2xl bg-black/40 border border-amber-900/30 backdrop-blur-md">
                        <div className="flex items-center gap-2 mb-6 border-b border-amber-900/20 pb-2">
                            {/* PERBAIKAN: Gunakan SettingsIcon di sini */}
                            <SettingsIcon size={18} className="text-amber-500" />
                            <h3 className="text-sm font-bold text-amber-100 uppercase tracking-widest">System Config</h3>
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-center justify-between p-3 rounded-xl bg-black/20 border border-amber-900/10">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 rounded-lg bg-amber-900/20 text-amber-500"><Bell size={16} /></div>
                                    <div>
                                        <p className="text-xs font-bold text-amber-100">Realm Alerts</p>
                                        <p className="text-[10px] text-amber-500/50">Receive quest notifications</p>
                                    </div>
                                </div>
                                <div
                                    onClick={() => setFormData({...formData, notifications: !formData.notifications})}
                                    className={`w-10 h-5 rounded-full relative cursor-pointer transition-colors ${formData.notifications ? 'bg-amber-600' : 'bg-slate-700'}`}
                                >
                                    <div className={`absolute top-1 left-1 w-3 h-3 bg-white rounded-full transition-transform ${formData.notifications ? 'translate-x-5' : 'translate-x-0'}`}></div>
                                </div>
                            </div>

                            <div className="flex items-center justify-between p-3 rounded-xl bg-black/20 border border-amber-900/10">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 rounded-lg bg-amber-900/20 text-amber-500"><Volume2 size={16} /></div>
                                    <div>
                                        <p className="text-xs font-bold text-amber-100">Ambient Sound</p>
                                        <p className="text-[10px] text-amber-500/50">Play immersive background FX</p>
                                    </div>
                                </div>
                                <div
                                    onClick={() => setFormData({...formData, sound: !formData.sound})}
                                    className={`w-10 h-5 rounded-full relative cursor-pointer transition-colors ${formData.sound ? 'bg-amber-600' : 'bg-slate-700'}`}
                                >
                                    <div className={`absolute top-1 left-1 w-3 h-3 bg-white rounded-full transition-transform ${formData.sound ? 'translate-x-5' : 'translate-x-0'}`}></div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            {/* --- 3. ACTION BUTTONS --- */}
            <div className="flex flex-col md:flex-row items-center justify-end gap-4 pt-4 border-t border-amber-900/30">
                <button className="flex items-center gap-2 px-6 py-3 rounded-xl text-red-400/80 hover:text-red-400 hover:bg-red-900/10 transition-all text-xs font-bold uppercase tracking-widest">
                    <LogOut size={16} /> Delete Hero
                </button>

                <button
                    onClick={handleSave}
                    disabled={isLoading}
                    className={`
                flex items-center gap-3 px-8 py-3 rounded-xl text-xs font-bold uppercase tracking-widest text-white shadow-lg transition-all
                ${isLoading
                        ? 'bg-amber-900/50 cursor-not-allowed'
                        : 'bg-gradient-to-r from-amber-700 to-amber-900 hover:scale-105 hover:shadow-[0_0_20px_rgba(245,158,11,0.4)] border border-amber-500/30'}
            `}
                >
                    {isLoading ? "Saving..." : <><Save size={16} /> Save Changes</>}
                </button>
            </div>

        </div>
    );
};

export default Settings;