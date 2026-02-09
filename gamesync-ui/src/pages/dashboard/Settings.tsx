import React, { useState, useEffect } from 'react';
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
    Settings as SettingsIcon,
    RefreshCw
} from 'lucide-react';
import UserPhoto from '../../components/ui/UserPhoto';
import api from '../../api/axios'; // Import instance axios

const Settings: React.FC = () => {
    // --- STATE MANAGEMENT ---
    const [isLoading, setIsLoading] = useState(false);
    const [isFetching, setIsFetching] = useState(true);

    // Inisialisasi state dengan struktur yang sesuai Entity User di Backend
    const [formData, setFormData] = useState({
        id: null,
        username: '',
        email: '',
        role: 'USER',
        level: 1,
        avatarUrl: '',
        bio: '', // Pastikan di BE sudah ada kolom bio, jika belum ini akan jadi optional
        notifications: true,
        sound: true
    });

    // --- EFFECT: LOAD PROFILE FROM BACKEND ---
    useEffect(() => {
        fetchUserProfile();
    }, []);

    const fetchUserProfile = async () => {
        try {
            setIsFetching(true);
            console.log("=== FETCHING USER PROFILE ===");

            // Endpoint ini biasanya mengembalikan data user yang sedang login berdasarkan Token
            const response = await api.get('/users/me');

            console.log("Profile Data Received from BE:", response.data);

            setFormData({
                ...formData,
                id: response.data.id,
                username: response.data.username,
                email: response.data.email,
                role: response.data.role,
                level: response.data.level || 1,
                avatarUrl: response.data.avatarUrl || '',
                // Bio dan title bisa ditambahkan jika entity di BE mendukung
            });
        } catch (error: any) {
            console.error("Failed to fetch profile:", error.response?.data || error.message);
        } finally {
            setIsFetching(false);
        }
    };

    // --- FUNCTION: SAVE CHANGES ---
    const handleSave = async () => {
        setIsLoading(true);
        console.log("=== UPDATING CHARACTER PROFILE ===");

        const payload = {
            username: formData.username,
            avatarUrl: formData.avatarUrl,
            bio: formData.bio
            // Tambahkan field lain yang diizinkan diupdate oleh BE
        };

        console.log("Sending Payload to BE:", payload);

        try {
            const response = await api.put(`/users/${formData.id}`, payload);

            console.log("Update Success Response:", response.data);
            alert("Character Profile Updated in the Records!");

            // Update data di localStorage juga agar dashboard ikut berubah
            const currentUser = JSON.parse(localStorage.getItem('user') || '{}');
            localStorage.setItem('user', JSON.stringify({
                ...currentUser,
                username: formData.username
            }));

        } catch (error: any) {
            console.error("Update Failed:", error.response?.data || error.message);
            alert("Magic failed! Server rejected the changes.");
        } finally {
            setIsLoading(false);
        }
    };

    if (isFetching) {
        return (
            <div className="flex flex-col items-center justify-center h-64 text-amber-500 animate-pulse">
                <RefreshCw className="animate-spin mb-4" size={32} />
                <p className="font-bold tracking-widest uppercase text-xs">Reading Character Scroll...</p>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto space-y-8 pb-10 animate-in fade-in duration-500 font-sans text-amber-50">

            {/* --- 1. HERO HEADER (Data Asli dari BE) --- */}
            <div className="relative p-6 md:p-8 rounded-3xl bg-black/40 backdrop-blur-xl border border-amber-500/20 shadow-[0_0_30px_rgba(0,0,0,0.5)] overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-amber-600/10 blur-[100px] rounded-full pointer-events-none"></div>

                <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-8">
                    <div className="flex flex-col items-center">
                        <UserPhoto
                            src={formData.avatarUrl}
                            alt={formData.username}
                            role={formData.role as any}
                            size="xl"
                            status="online"
                            editable={true}
                            onEditClick={() => console.log("Avatar edit clicked")}
                            className="mb-4"
                        />
                        <div className="px-3 py-1 rounded-full bg-amber-900/40 border border-amber-500/30 text-[10px] font-bold text-amber-400 uppercase tracking-widest shadow-inner">
                            Level {formData.level}
                        </div>
                    </div>

                    <div className="flex-1 text-center md:text-left space-y-2">
                        <h2 className="text-3xl font-bold text-white font-rpg tracking-wide uppercase flex items-center justify-center md:justify-start gap-2">
                            {formData.username}
                            <Edit2 size={16} className="text-amber-500/50 cursor-pointer hover:text-amber-400 transition-colors" />
                        </h2>
                        <p className="text-amber-500 font-bold uppercase tracking-[0.15em] text-xs flex items-center justify-center md:justify-start gap-2">
                            <Sword size={12} /> {formData.role}
                        </p>

                        <div className="w-full max-w-md mt-4 group">
                            <div className="flex justify-between text-[9px] text-amber-500/60 uppercase font-bold mb-1">
                                <span>Experience</span>
                                <span>{formData.level * 100} / {(formData.level + 1) * 100} XP</span>
                            </div>
                            <div className="h-2 w-full bg-black/60 rounded-full border border-amber-900/30 overflow-hidden">
                                <div className="h-full w-[65%] bg-gradient-to-r from-amber-700 to-amber-500 shadow-[0_0_10px_#f59e0b]"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* --- 2. FORM SETTINGS --- */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                                    className="w-full bg-black/40 border border-amber-900/40 rounded-xl px-4 py-3 text-sm text-amber-50 focus:border-amber-500/50 outline-none transition-all"
                                />
                            </div>

                            <div className="space-y-1.5 group">
                                <label className="text-[10px] font-bold uppercase text-amber-500/60 ml-1">Legendary Feats (Bio)</label>
                                <textarea
                                    rows={4}
                                    value={formData.bio}
                                    onChange={(e) => setFormData({...formData, bio: e.target.value})}
                                    className="w-full bg-black/40 border border-amber-900/40 rounded-xl px-4 py-3 text-sm text-amber-50 focus:border-amber-500/50 outline-none transition-all resize-none"
                                    placeholder="Describe your hero's journey..."
                                />
                            </div>
                        </div>
                    </div>
                </div>

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
                        </div>
                    </div>

                    {/* System Config (Local Only) */}
                    <div className="p-6 rounded-2xl bg-black/40 border border-amber-900/30 backdrop-blur-md">
                        <div className="flex items-center gap-2 mb-6 border-b border-amber-900/20 pb-2">
                            <SettingsIcon size={18} className="text-amber-500" />
                            <h3 className="text-sm font-bold text-amber-100 uppercase tracking-widest">System Config</h3>
                        </div>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between p-3 rounded-xl bg-black/20">
                                <div className="flex items-center gap-3">
                                    <Bell size={16} className="text-amber-500" />
                                    <div>
                                        <p className="text-xs font-bold text-amber-100">Realm Alerts</p>
                                    </div>
                                </div>
                                <Toggle
                                    active={formData.notifications}
                                    onClick={() => setFormData({...formData, notifications: !formData.notifications})}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* --- 3. ACTION BUTTONS --- */}
            <div className="flex flex-col md:flex-row items-center justify-end gap-4 pt-4 border-t border-amber-900/30">
                <button
                    onClick={handleSave}
                    disabled={isLoading}
                    className={`
                        flex items-center gap-3 px-8 py-3 rounded-xl text-xs font-bold uppercase tracking-widest text-white shadow-lg transition-all
                        ${isLoading ? 'bg-amber-900/50 cursor-not-allowed' : 'bg-gradient-to-r from-amber-700 to-amber-900 hover:scale-105 border border-amber-500/30'}
                    `}
                >
                    {isLoading ? "Saving..." : <><Save size={16} /> Save Changes</>}
                </button>
            </div>
        </div>
    );
};

// Sub-komponen Toggle untuk kerapian
const Toggle = ({ active, onClick }: { active: boolean, onClick: () => void }) => (
    <div
        onClick={onClick}
        className={`w-10 h-5 rounded-full relative cursor-pointer transition-colors ${active ? 'bg-amber-600' : 'bg-slate-700'}`}
    >
        <div className={`absolute top-1 left-1 w-3 h-3 bg-white rounded-full transition-transform ${active ? 'translate-x-5' : 'translate-x-0'}`}></div>
    </div>
);

export default Settings;