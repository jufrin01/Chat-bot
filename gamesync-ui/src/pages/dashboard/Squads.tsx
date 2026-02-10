import React, { useState, useEffect } from 'react';
import {
    Users, Shield, Crown, UserPlus, XCircle,
    AlertTriangle, Swords, Scroll, Zap, Search, CheckCircle, X
} from 'lucide-react';
import api from '../../api/axios';
import ActionToast from '../../components/ui/ActionToast';
import UserPhoto from '../../components/ui/UserPhoto';

// --- TYPE DEFINITIONS ---
interface GuildMember { id: number; username: string; role: string; level: number; avatarUrl: string; }
interface GuildInfo { id: number; name: string; description: string; gameName: string; leaderId: number; maxMembers: number; }
interface GuildApplication { applicationId: number; userId: number; username: string; level: number; avatarUrl: string; }
interface ToastState { message: string; type: 'success' | 'error'; }

// --- HELPER: MAP BACKEND ROLE TO UI ROLE ---
// Backend: GUILD_LEADER, USER, ADMIN
// UI UserPhoto: LEADER, ANGGOTA, ADMIN
const mapRoleToUI = (backendRole: string): 'LEADER' | 'ADMIN' | 'ANGGOTA' | 'BOT' => {
    if (backendRole === 'GUILD_LEADER') return 'LEADER';
    if (backendRole === 'ADMIN') return 'ADMIN';
    if (backendRole === 'BOT') return 'BOT';
    return 'ANGGOTA'; // Default untuk USER
};

// ============================================================================
// KOMPONEN 1: GUILD BROWSER (List Semua Guild untuk Apply)
// ============================================================================
const GuildBrowser = ({ onApply, hasGuild, setToast }: { onApply: (id: number) => void, hasGuild: boolean, setToast: any }) => {
    const [guilds, setGuilds] = useState<GuildInfo[]>([]);

    useEffect(() => {
        api.get('/guilds/all').then(res => setGuilds(res.data)).catch(err => console.error(err));
    }, []);

    return (
        <div className="space-y-6 animate-in fade-in">
            <div className="flex items-center gap-2 mb-4 border-b border-amber-900/30 pb-2">
                <Search className="text-amber-500" />
                <h3 className="text-xl font-bold text-amber-100 font-rpg uppercase">Guild Registry</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {guilds.map(g => (
                    <div key={g.id} className="bg-black/40 border border-amber-900/30 p-5 rounded-2xl hover:border-amber-500/50 transition-all group flex flex-col justify-between h-full">
                        <div>
                            <div className="flex justify-between items-start mb-2">
                                <Shield className="text-amber-600 group-hover:text-amber-400 transition-colors" size={32} />
                                <span className="text-[10px] bg-amber-900/40 text-amber-500 px-2 py-1 rounded font-bold uppercase">{g.gameName || 'General'}</span>
                            </div>
                            <h4 className="text-lg font-bold text-white font-rpg uppercase truncate">{g.name}</h4>
                            <p className="text-xs text-amber-500/60 line-clamp-3 min-h-[3em] mb-4">{g.description || "No description provided."}</p>
                        </div>

                        {hasGuild ? (
                            <button disabled className="w-full py-2 bg-gray-800 text-gray-500 font-bold text-xs uppercase rounded-lg cursor-not-allowed">
                                Already in Guild
                            </button>
                        ) : (
                            <button onClick={() => onApply(g.id)} className="w-full py-2 bg-amber-700 hover:bg-amber-600 text-white font-bold text-xs uppercase rounded-lg transition-colors shadow-lg">
                                Apply to Join
                            </button>
                        )}
                    </div>
                ))}
                {guilds.length === 0 && <p className="text-amber-500/40 col-span-3 text-center py-10">No guilds registered yet.</p>}
            </div>
        </div>
    );
};

// ============================================================================
// KOMPONEN 2: APPLICANT INBOX (Khusus Leader)
// ============================================================================
const ApplicantInbox = ({ onProcess }: { onProcess: (appId: number, action: 'approve' | 'reject') => void }) => {
    const [applicants, setApplicants] = useState<GuildApplication[]>([]);

    useEffect(() => {
        api.get('/guilds/applications').then(res => setApplicants(res.data)).catch(console.error);
    }, []);

    if (applicants.length === 0) return (
        <div className="p-4 text-center text-amber-500/30 text-xs italic border border-dashed border-amber-900/30 rounded-xl">
            No pending requests.
        </div>
    );

    return (
        <div className="space-y-3 animate-in slide-in-from-bottom-2">
            <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
                <h3 className="text-xs font-bold text-amber-100 uppercase tracking-widest">Pending Requests</h3>
            </div>
            {applicants.map(app => (
                <div key={app.applicationId} className="flex items-center justify-between bg-black/60 border border-amber-500/30 p-3 rounded-xl shadow-lg">
                    <div className="flex items-center gap-3">
                        {/* FIX: Menggunakan role 'ANGGOTA' alih-alih 'USER' */}
                        <UserPhoto src={app.avatarUrl} alt={app.username} role="ANGGOTA" size="sm" />
                        <div>
                            <p className="font-bold text-amber-100 text-sm">{app.username}</p>
                            <p className="text-[10px] text-amber-500/50">Level {app.level}</p>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <button onClick={() => onProcess(app.applicationId, 'reject')} className="p-1.5 bg-red-900/20 text-red-500 hover:bg-red-500 hover:text-white border border-red-500/30 rounded-lg transition-all" title="Reject">
                            <X size={14}/>
                        </button>
                        <button onClick={() => onProcess(app.applicationId, 'approve')} className="p-1.5 bg-emerald-900/20 text-emerald-500 hover:bg-emerald-500 hover:text-white border border-emerald-500/30 rounded-lg transition-all" title="Approve">
                            <CheckCircle size={14}/>
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

// ============================================================================
// MAIN COMPONENT: SQUADS
// ============================================================================
const Squads: React.FC = () => {
    // View State: 'my-guild' (Dashboard) OR 'browser' (Cari Guild)
    const [view, setView] = useState<'my-guild' | 'browser'>('my-guild');

    const [hasGuild, setHasGuild] = useState(false);
    const [guildInfo, setGuildInfo] = useState<GuildInfo | null>(null);
    const [members, setMembers] = useState<GuildMember[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [toast, setToast] = useState<ToastState | null>(null);

    // Create Form State
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [createForm, setCreateForm] = useState({ name: '', description: '', gameName: '', isPrivate: false });

    // Recruit Form State
    const [recruitId, setRecruitId] = useState('');

    // User Data
    const userString = localStorage.getItem('user');
    const userData = userString ? JSON.parse(userString) : null;
    const myId = userData?.id;
    const myRole = userData?.role || 'USER';
    const isLeader = userData?.role === 'GUILD_LEADER' || userData?.role === 'LEADER' || userData?.role === 'ADMIN';
    const myLevel = myRole === 'ADMIN' ? 99 : (userData?.level || 1);

    useEffect(() => { fetchGuildData(); }, []);

    const fetchGuildData = async () => {
        setIsLoading(true);
        try {
            const response = await api.get('/guilds/my');
            if (response.status === 204 || !response.data) {
                setHasGuild(false);
                setView('browser'); // Kalau belum punya guild, arahkan ke browser
            } else {
                setHasGuild(true);
                setGuildInfo(response.data.info);
                setMembers(response.data.members);
                setView('my-guild');
            }
        } catch {
            setHasGuild(false);
            setView('browser');
        } finally {
            setIsLoading(false);
        }
    };

    // --- ACTIONS ---

    const handleApply = async (guildId: number) => {
        try {
            await api.post(`/guilds/apply/${guildId}`);
            setToast({ message: "Application sent to Guild Leader!", type: 'success' });
        } catch (err: any) {
            setToast({ message: err.response?.data?.message || "Application failed.", type: 'error' });
        }
    };

    const handleCreate = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await api.post('/guilds/create', createForm);
            setToast({ message: "Guild established!", type: 'success' });
            setIsCreateModalOpen(false);

            if (myRole !== 'ADMIN') {
                const updated = { ...userData, role: 'GUILD_LEADER' };
                localStorage.setItem('user', JSON.stringify(updated));
            }
            fetchGuildData();
        } catch (err: any) {
            setToast({ message: err.response?.data?.message || "Failed.", type: 'error' });
        }
    };

    const handleRecruit = async () => {
        if (!recruitId) return;
        try {
            await api.post('/guilds/add', { targetUserId: parseInt(recruitId) });
            setToast({ message: "Member recruited!", type: 'success' });
            setRecruitId('');
            fetchGuildData();
        } catch (err: any) { setToast({ message: err.response?.data?.message, type: 'error' }); }
    };

    const handleKick = async (id: number) => {
        if (!window.confirm("Kick member?")) return;
        try {
            await api.post('/guilds/kick', { targetUserId: id });
            setToast({ message: "Member exiled.", type: 'success' });
            fetchGuildData();
        } catch (err: any) { setToast({ message: err.response?.data?.message, type: 'error' }); }
    };

    const handleApplicationProcess = async (appId: number, action: 'approve' | 'reject') => {
        try {
            await api.post(`/guilds/application/${appId}/${action}`);
            setToast({ message: `Applicant ${action}ed!`, type: 'success' });
            fetchGuildData();
        } catch (err: any) {
            setToast({ message: err.response?.data?.message || "Action failed.", type: 'error' });
        }
    };

    if (isLoading) return <div className="p-10 text-center text-amber-500 animate-pulse font-bold tracking-widest">LOADING GUILD DATA...</div>;

    return (
        <div className="max-w-6xl mx-auto pb-20 font-sans text-amber-50">
            {toast && <ActionToast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

            {/* --- TOP NAVIGATION TABS --- */}
            <div className="flex gap-6 mb-8 border-b border-amber-900/30 px-2">
                {hasGuild && (
                    <button
                        onClick={() => setView('my-guild')}
                        className={`pb-3 text-xs font-bold uppercase tracking-widest transition-all ${view === 'my-guild' ? 'text-amber-500 border-b-2 border-amber-500' : 'text-amber-500/40 hover:text-amber-300'}`}
                    >
                        My Guild
                    </button>
                )}
                <button
                    onClick={() => setView('browser')}
                    className={`pb-3 text-xs font-bold uppercase tracking-widest transition-all ${view === 'browser' ? 'text-amber-500 border-b-2 border-amber-500' : 'text-amber-500/40 hover:text-amber-300'}`}
                >
                    Guild Finder
                </button>
            </div>

            {/* --- VIEW: BROWSER --- */}
            {view === 'browser' && (
                <div>
                    {!hasGuild && (
                        <div className="mb-8 p-6 bg-gradient-to-r from-amber-900/20 to-black border border-amber-500/20 rounded-2xl flex items-center justify-between">
                            <div>
                                <h3 className="font-bold text-amber-100 uppercase">Create your own Guild</h3>
                                <p className="text-xs text-amber-500/60">Level {myRole === 'ADMIN' ? 99 : 15} Required</p>
                            </div>
                            <button
                                onClick={() => setIsCreateModalOpen(true)}
                                disabled={myLevel < (myRole === 'ADMIN' ? 99 : 15)}
                                className="bg-amber-600 hover:bg-amber-500 disabled:opacity-50 disabled:cursor-not-allowed text-white px-6 py-2 rounded-lg font-bold text-xs uppercase shadow-lg"
                            >
                                Establish
                            </button>
                        </div>
                    )}
                    <GuildBrowser onApply={handleApply} hasGuild={hasGuild} setToast={setToast} />
                </div>
            )}

            {/* --- VIEW: MY GUILD --- */}
            {view === 'my-guild' && guildInfo && (
                <div className="space-y-8 animate-in fade-in">
                    {/* Header Info */}
                    <div className="relative rounded-3xl bg-black/40 border border-amber-500/20 p-8 overflow-hidden group">
                        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent z-0"></div>
                        <div className="absolute top-0 right-0 p-10 opacity-10 group-hover:opacity-20 transition-opacity"><Swords size={300} /></div>

                        <div className="relative z-10 flex flex-col md:flex-row gap-8 items-start">
                            <div className="w-24 h-24 md:w-32 md:h-32 rounded-2xl bg-gradient-to-br from-amber-700 to-black border-2 border-amber-500/50 flex items-center justify-center shadow-lg shrink-0">
                                <Shield size={48} className="text-amber-100" />
                            </div>
                            <div className="flex-1 space-y-2">
                                <div className="flex items-center gap-2 text-amber-500 font-bold uppercase tracking-widest text-xs mb-1">
                                    <Crown size={14} /> Guild Hall • {guildInfo.gameName || "General"}
                                </div>
                                <h1 className="text-4xl md:text-5xl font-black text-white font-rpg uppercase tracking-wide">{guildInfo.name}</h1>
                                <p className="text-amber-100/70 max-w-2xl text-sm leading-relaxed border-l-2 border-amber-500/30 pl-4">
                                    {guildInfo.description || "No description provided."}
                                </p>
                                <div className="flex gap-3 mt-4">
                                    <span className="badge-rpg"><Users size={14}/> {members.length}/{guildInfo.maxMembers}</span>
                                    <span className="badge-rpg"><Scroll size={14}/> ID: {guildInfo.leaderId}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Member List */}
                        <div className="lg:col-span-2 space-y-4">
                            {/* Action Bar (Leader Only) */}
                            {isLeader && (
                                <div className="flex gap-2 mb-4">
                                    <input type="number" placeholder="Direct Recruit ID..." className="input-rpg"
                                           value={recruitId} onChange={e => setRecruitId(e.target.value)} />
                                    <button onClick={handleRecruit} className="btn-primary">Recruit</button>
                                </div>
                            )}

                            <h3 className="text-sm font-bold text-amber-500 uppercase tracking-widest border-b border-amber-900/30 pb-2">Roster</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                {members.map(m => (
                                    <div key={m.id} className="bg-black/20 p-3 rounded-xl border border-amber-900/20 flex justify-between items-center group hover:bg-black/40 transition-all">
                                        <div className="flex gap-3 items-center">
                                            {/* FIX: Mapping Role Backend ke Role Frontend menggunakan Helper */}
                                            <UserPhoto src={m.avatarUrl} alt={m.username} role={mapRoleToUI(m.role)} size="sm" />
                                            <div>
                                                <p className="text-sm font-bold text-amber-100 flex items-center gap-1">
                                                    {m.username}
                                                    {m.id === guildInfo.leaderId && <Crown size={12} className="text-yellow-400" />}
                                                </p>
                                                <p className="text-[10px] text-amber-500/50">Lvl {m.level}</p>
                                            </div>
                                        </div>
                                        {isLeader && m.id !== myId && (
                                            <button onClick={() => handleKick(m.id)} className="text-red-500/50 hover:text-red-500 transition-colors"><XCircle size={18}/></button>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Leader Sidebar (Inbox) */}
                        {isLeader && (
                            <div className="space-y-4">
                                <div className="bg-gradient-to-b from-amber-900/10 to-black/40 p-5 rounded-2xl border border-amber-900/30 h-fit">
                                    <ApplicantInbox onProcess={handleApplicationProcess} />
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* --- CREATE MODAL --- */}
            {isCreateModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
                    <div className="bg-black border border-amber-500/30 w-full max-w-md rounded-2xl p-6 shadow-[0_0_50px_rgba(245,158,11,0.2)]">
                        <h3 className="text-xl font-bold text-amber-100 mb-4 font-rpg uppercase">Establish Guild</h3>
                        <form onSubmit={handleCreate} className="space-y-4">
                            <input required className="input-rpg" placeholder="Guild Name" value={createForm.name} onChange={e => setCreateForm({...createForm, name: e.target.value})} />
                            <input className="input-rpg" placeholder="Main Game" value={createForm.gameName} onChange={e => setCreateForm({...createForm, gameName: e.target.value})} />
                            <textarea className="input-rpg resize-none" rows={3} placeholder="Description" value={createForm.description} onChange={e => setCreateForm({...createForm, description: e.target.value})} />
                            <div className="flex gap-2 mt-2">
                                <button type="button" onClick={() => setIsCreateModalOpen(false)} className="btn-secondary flex-1">Cancel</button>
                                <button type="submit" className="btn-primary flex-1">Confirm</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <style>{`
                .input-rpg { width: 100%; background: rgba(0,0,0,0.6); border: 1px solid rgba(120,53,15,0.4); border-radius: 0.5rem; padding: 0.5rem; color: #fef3c7; font-size: 0.875rem; outline: none; transition: all; }
                .input-rpg:focus { border-color: #f59e0b; }
                .btn-primary { background: #d97706; color: white; font-weight: bold; padding: 0.5rem 1rem; border-radius: 0.5rem; font-size: 0.75rem; text-transform: uppercase; transition: all; }
                .btn-primary:hover { background: #b45309; }
                .btn-secondary { background: transparent; border: 1px solid rgba(120,53,15,0.5); color: #f59e0b; font-weight: bold; padding: 0.5rem; border-radius: 0.5rem; font-size: 0.75rem; text-transform: uppercase; }
                .btn-secondary:hover { background: rgba(120,53,15,0.1); }
                .badge-rpg { padding: 0.25rem 0.75rem; background: rgba(120,53,15,0.3); border-radius: 0.25rem; border: 1px solid rgba(245,158,11,0.2); font-size: 0.75rem; font-weight: bold; color: #fde68a; display: flex; align-items: center; gap: 0.5rem; }
            `}</style>
        </div>
    );
};

export default Squads;