import React, { useState, useEffect } from 'react';
import {
    Users,
    Shield,
    Sword,
    Crown,
    Zap,
    Scroll,
    RefreshCw
} from 'lucide-react';
import api from '../../api/axios'; // Import instance axios
import UserPhoto from '../../components/ui/UserPhoto';

// --- INTERFACES (Sesuai Struktur Backend) ---
interface GuildMember {
    id: number;
    username: string;
    role: string;
    status: string;
}

interface Guild {
    id: number;
    name: string;
    game: string;
    level: number;
    members: GuildMember[];
}

const Squads: React.FC = () => {
    // --- STATE MANAGEMENT ---
    const [squads, setSquads] = useState<Guild[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    // Ambil data user dari localStorage
    const userString = localStorage.getItem('user');
    const userData = userString ? JSON.parse(userString) : null;

    // --- EFFECT: LOAD DATA GUILDS ---
    useEffect(() => {
        fetchMyGuilds();
    }, []);

    const fetchMyGuilds = async () => {
        try {
            setIsLoading(true);
            console.log("=== FETCHING MY GUILDS FROM BACKEND ===");

            // Endpoint ini diasumsikan mengambil daftar guild tempat user bergabung
            // Jika belum ada endpoint khusus '/guilds/my', kamu bisa gunakan '/guilds'
            const response = await api.get('/guilds');

            console.log("Response My Guilds Received:", response.data);

            // Pastikan data yang diterima adalah array
            setSquads(Array.isArray(response.data) ? response.data : []);
        } catch (error: any) {
            console.error("Error fetching guilds:", error.response?.data || error.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="p-4 lg:p-8 max-w-7xl mx-auto pb-20 animate-in fade-in duration-500 font-sans text-amber-50">

            {/* --- HEADER --- */}
            <div className="flex items-center gap-3 mb-8">
                <div className="p-2.5 bg-amber-900/20 rounded-xl border border-amber-500/30 shadow-[0_0_15px_rgba(245,158,11,0.2)]">
                    <Shield className="text-amber-500" size={28} />
                </div>
                <div>
                    <h1 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-100 to-amber-600 font-rpg tracking-widest uppercase">
                        My Guilds
                    </h1>
                    <p className="text-amber-500/60 text-xs font-bold uppercase tracking-[0.2em]">
                        Manage Your Alliances
                    </p>
                </div>
            </div>

            {/* --- LOADING STATE --- */}
            {isLoading ? (
                <div className="flex flex-col items-center justify-center py-20 text-amber-500/50">
                    <RefreshCw className="animate-spin mb-4" size={32} />
                    <p className="text-xs font-bold uppercase tracking-widest">Gathering Alliances...</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {squads.map((squad) => (
                        <div
                            key={squad.id}
                            className="group relative bg-black/40 border border-amber-900/30 rounded-3xl p-6 backdrop-blur-xl hover:border-amber-500/40 transition-all duration-300 hover:shadow-[0_0_30px_rgba(245,158,11,0.1)] overflow-hidden"
                        >
                            {/* Dekorasi Background */}
                            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-amber-500/10 to-transparent rounded-bl-full pointer-events-none"></div>

                            {/* --- GUILD HEADER --- */}
                            <div className="flex items-start justify-between mb-6 relative z-10">
                                <div className="flex items-center gap-4">
                                    <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-amber-900 to-black border border-amber-500/30 flex items-center justify-center text-amber-400 shadow-inner group-hover:scale-105 transition-transform">
                                        <Sword size={32} />
                                    </div>

                                    <div>
                                        <h3 className="text-xl font-bold text-amber-100 font-rpg tracking-wide uppercase group-hover:text-amber-400 transition-colors">
                                            {squad.name}
                                        </h3>
                                        <div className="flex items-center gap-2 mt-1">
                                            <span className="text-[10px] px-2 py-0.5 rounded bg-amber-900/40 border border-amber-500/20 text-amber-500 font-bold uppercase tracking-wider">
                                                {squad.game}
                                            </span>
                                            <span className="text-[10px] px-2 py-0.5 rounded bg-black/40 border border-amber-900/30 text-amber-500/50 font-bold uppercase tracking-wider flex items-center gap-1">
                                                <Zap size={10} /> Lvl {squad.level || 1}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <button className="p-2 text-amber-500/40 hover:text-amber-300 hover:bg-amber-900/20 rounded-lg transition-colors">
                                    <Scroll size={18} />
                                </button>
                            </div>

                            {/* --- ROSTER LIST --- */}
                            <div className="space-y-3 relative z-10">
                                <div className="flex items-center justify-between mb-2 px-1">
                                    <p className="text-[10px] font-bold text-amber-500/50 uppercase tracking-[0.2em]">
                                        Guild Roster
                                    </p>
                                    <span className="text-[10px] font-mono text-amber-500/40">
                                        {squad.members?.length || 0} / 50
                                    </span>
                                </div>

                                <div className="bg-black/20 rounded-2xl p-2 border border-amber-900/10 space-y-1">
                                    {squad.members?.map((member) => (
                                        <div
                                            key={member.id}
                                            className="flex items-center justify-between p-2 rounded-xl hover:bg-amber-900/10 transition-colors group/member cursor-pointer"
                                        >
                                            <div className="flex items-center gap-3">
                                                <UserPhoto
                                                    src={null}
                                                    alt={member.username}
                                                    role={member.role as any}
                                                    size="sm"
                                                    status={member.status === 'ONLINE' ? 'online' : 'offline'}
                                                />

                                                <div>
                                                    <p className="text-xs font-bold text-amber-100 group-hover/member:text-amber-400 transition-colors">
                                                        {member.username}
                                                    </p>
                                                    <p className="text-[9px] text-amber-500/50 uppercase tracking-wider font-bold">
                                                        {member.role}
                                                    </p>
                                                </div>
                                            </div>

                                            {member.role === 'LEADER' && (
                                                <div className="p-1.5 bg-amber-500/10 rounded-lg border border-amber-500/20" title="Guild Master">
                                                    <Crown size={12} className="text-amber-400" />
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* --- FOOTER ACTION --- */}
                            <div className="mt-6 pt-4 border-t border-amber-900/20 flex justify-end">
                                <button className="text-[10px] font-bold text-amber-500/60 hover:text-amber-300 uppercase tracking-widest flex items-center gap-2 group/btn transition-all">
                                    Enter Guild Hall
                                    <span className="group-hover/btn:translate-x-1 transition-transform">→</span>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* --- EMPTY STATE --- */}
            {!isLoading && squads.length === 0 && (
                <div className="flex flex-col items-center justify-center py-20 text-center border-2 border-dashed border-amber-900/30 rounded-3xl bg-black/20">
                    <Shield size={48} className="text-amber-900/50 mb-4" />
                    <h3 className="text-xl font-bold text-amber-500/50 font-rpg uppercase">No Guilds Found</h3>
                    <p className="text-amber-900/50 text-xs tracking-widest mt-2">You are a lone wolf. Join or create a guild!</p>
                </div>
            )}
        </div>
    );
};

export default Squads;