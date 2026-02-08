import React from 'react';
import {
    Calendar as CalendarIcon,
    Clock,
    Users,
    ChevronRight,
    Plus,
    Edit2,
    Trash2,
    Map,
    Sword,
    Scroll,
    Timer
} from 'lucide-react';
import { DUMMY_SCHEDULE } from '../../data/dummy';

const Schedule: React.FC = () => {
    // Ambil role dari localStorage untuk otorisasi
    const userRole = localStorage.getItem('role');
    const isAdminOrLeader = userRole === 'ADMIN' || userRole === 'LEADER';

    return (
        <div className="p-4 lg:p-8 max-w-6xl mx-auto font-sans text-amber-50 pb-20 animate-in fade-in duration-500">

            {/* --- HEADER SECTION --- */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-6">
                <div>
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-amber-900/20 rounded-lg border border-amber-500/30">
                            <Map className="text-amber-500" size={24} />
                        </div>
                        <h1 className="text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-100 to-amber-600 font-rpg tracking-widest uppercase">
                            Quest Board
                        </h1>
                    </div>
                    <p className="text-amber-500/60 text-sm font-bold uppercase tracking-[0.2em] ml-1">
                        Upcoming Raids & Missions
                    </p>
                </div>

                {/* TOMBOL TAMBAH: Hanya muncul untuk Admin atau Leader */}
                {isAdminOrLeader && (
                    <button className="group relative flex items-center gap-3 bg-gradient-to-r from-amber-700 to-amber-900 hover:from-amber-600 hover:to-amber-800 text-white px-6 py-3 rounded-xl font-bold text-xs tracking-widest uppercase transition-all shadow-[0_0_15px_rgba(245,158,11,0.3)] hover:scale-105 overflow-hidden">
                        {/* Shine Effect */}
                        <div className="absolute inset-0 bg-white/20 skew-x-12 -translate-x-full group-hover:animate-shine"></div>

                        <Plus size={16} />
                        <span>Post New Quest</span>
                    </button>
                )}
            </div>

            {/* --- LIST JADWAL (QUEST CARDS) --- */}
            <div className="grid gap-5">
                {DUMMY_SCHEDULE.map((item) => (
                    <div
                        key={item.id}
                        className="group relative bg-black/40 backdrop-blur-md border border-amber-900/30 p-1 rounded-2xl hover:border-amber-500/50 transition-all duration-300 hover:shadow-[0_0_20px_rgba(245,158,11,0.15)]"
                    >
                        {/* Inner Container */}
                        <div className="bg-gradient-to-r from-black/60 to-transparent p-5 rounded-xl h-full flex flex-col md:flex-row md:items-center justify-between gap-6">

                            {/* LEFT: Icon & Main Info */}
                            <div className="flex items-start md:items-center gap-5">
                                {/* Quest Icon Frame */}
                                <div className="h-16 w-16 shrink-0 rounded-xl bg-gradient-to-br from-amber-900/40 to-black border border-amber-500/30 flex items-center justify-center text-amber-400 group-hover:scale-110 transition-transform shadow-inner relative overflow-hidden">
                                    <div className="absolute inset-0 bg-amber-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                    <Sword size={28} />
                                </div>

                                <div>
                                    <h3 className="text-xl font-bold text-white tracking-wide font-rpg uppercase group-hover:text-amber-400 transition-colors">
                                        {item.game}
                                    </h3>

                                    <div className="flex flex-wrap items-center gap-4 mt-2 text-amber-500/60 text-xs font-bold uppercase tracking-wider">
                                        <div className="flex items-center gap-1.5 bg-black/40 px-2 py-1 rounded border border-amber-900/20">
                                            <Users size={12} className="text-amber-500" />
                                            <span>{item.squad}</span>
                                        </div>
                                        <div className="flex items-center gap-1.5 bg-black/40 px-2 py-1 rounded border border-amber-900/20">
                                            <Clock size={12} className="text-amber-500" />
                                            <span>{item.time} WIB</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* RIGHT: Date, Status & Actions */}
                            <div className="flex items-center justify-between md:justify-end gap-6 w-full md:w-auto border-t md:border-t-0 border-amber-900/30 pt-4 md:pt-0">

                                {/* Date & Status */}
                                <div className="text-left md:text-right">
                                    <div className="flex items-center gap-2 text-amber-100 font-mono text-sm mb-1">
                                        <CalendarIcon size={14} className="md:hidden text-amber-500" />
                                        {item.date}
                                    </div>
                                    <span className={`
                                        inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-[0.1em] border
                                        ${item.status === 'Confirmed'
                                        ? 'bg-emerald-900/20 text-emerald-400 border-emerald-500/30 shadow-[0_0_8px_rgba(16,185,129,0.2)]'
                                        : 'bg-amber-900/20 text-amber-500 border-amber-500/30 shadow-[0_0_8px_rgba(245,158,11,0.2)]'}
                                    `}>
                                        <div className={`h-1.5 w-1.5 rounded-full animate-pulse ${item.status === 'Confirmed' ? 'bg-emerald-500' : 'bg-amber-500'}`}></div>
                                        {item.status === 'Confirmed' ? 'Party Ready' : 'Forming Party'}
                                    </span>
                                </div>

                                {/* ACTION BUTTONS: Admin/Leader vs Member */}
                                {isAdminOrLeader ? (
                                    <div className="flex gap-2 pl-4 md:pl-0 border-l md:border-l-0 border-amber-900/30">
                                        <button title="Edit Quest" className="p-2.5 rounded-lg bg-black/60 border border-amber-900/40 text-amber-500/60 hover:text-amber-400 hover:border-amber-500/50 hover:bg-amber-900/20 transition-all">
                                            <Edit2 size={16} />
                                        </button>
                                        <button title="Delete Quest" className="p-2.5 rounded-lg bg-black/60 border border-amber-900/40 text-amber-500/60 hover:text-red-400 hover:border-red-500/50 hover:bg-red-900/20 transition-all">
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                ) : (
                                    <button className="group/btn flex items-center gap-2 pl-4 md:pl-0 border-l md:border-l-0 border-amber-900/30 text-amber-500/60 hover:text-amber-400 transition-colors">
                                        <span className="text-[10px] font-bold uppercase tracking-widest hidden md:block group-hover/btn:underline">View Details</span>
                                        <div className="p-2 rounded-lg bg-black/60 border border-amber-900/40 group-hover/btn:bg-amber-900/20 group-hover/btn:border-amber-500/50 transition-all">
                                            <ChevronRight size={18} />
                                        </div>
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                ))}

                {/* --- EMPTY STATE (Jika Data Kosong) --- */}
                {DUMMY_SCHEDULE.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-20 text-center border-2 border-dashed border-amber-900/30 rounded-3xl bg-black/20">
                        <Scroll size={48} className="text-amber-900/50 mb-4" />
                        <h3 className="text-xl font-bold text-amber-500/50 font-rpg uppercase">No Active Quests</h3>
                        <p className="text-amber-900/50 text-xs tracking-widest mt-2">The quest board is empty. Post a new mission!</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Schedule;