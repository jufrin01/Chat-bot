import React, { useState } from 'react';
import { Calendar as CalendarIcon, Clock, Users, ChevronRight, Plus, Edit2, Trash2 } from 'lucide-react';
import { DUMMY_SCHEDULE } from '../../data/dummy';

const Schedule: React.FC = () => {
    // Ambil role dari localStorage
    const userRole = localStorage.getItem('role');
    const isAdminOrLeader = userRole === 'ADMIN' || userRole === 'LEADER';

    return (
        <div className="p-6 lg:p-8 max-w-5xl mx-auto">
            <div className="flex justify-between items-end mb-8">
                <div>
                    <h1 className="text-2xl font-black text-white tracking-tight">MABAR SCHEDULE</h1>
                    <p className="text-slate-400 text-sm uppercase tracking-widest mt-1">Manage your upcoming gaming sessions</p>
                </div>

                {/* TOMBOL TAMBAH: Hanya muncul untuk Admin atau Leader */}
                {isAdminOrLeader && (
                    <button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2.5 rounded-xl font-bold text-xs transition-all shadow-lg shadow-indigo-600/20">
                        <Plus size={18} />
                        ADD SCHEDULE
                    </button>
                )}
            </div>

            <div className="grid gap-4">
                {DUMMY_SCHEDULE.map((item) => (
                    <div
                        key={item.id}
                        className="group relative bg-slate-900/50 backdrop-blur-md border border-slate-800 p-5 rounded-2xl hover:border-indigo-500/50 transition-all duration-300"
                    >
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div className="flex items-center gap-4">
                                <div className="h-12 w-12 rounded-xl bg-indigo-600/20 flex items-center justify-center text-indigo-400 group-hover:scale-110 transition-transform">
                                    <CalendarIcon size={24} />
                                </div>
                                <div>
                                    <h3 className="text-white font-bold tracking-wide">{item.game}</h3>
                                    <div className="flex items-center gap-3 mt-1 text-slate-400 text-xs">
                                        <span className="flex items-center gap-1"><Users size={14} /> {item.squad}</span>
                                        <span className="flex items-center gap-1"><Clock size={14} /> {item.time}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center justify-between md:justify-end gap-4">
                                <div className="text-right hidden md:block mr-4">
                                    <p className="text-white font-mono text-sm">{item.date}</p>
                                    <span className={`text-[10px] font-black uppercase ${item.status === 'Confirmed' ? 'text-emerald-500' : 'text-amber-500'}`}>
                    {item.status}
                  </span>
                                </div>

                                {/* AKSI EDIT/HAPUS: Hanya untuk Admin atau Leader */}
                                {isAdminOrLeader ? (
                                    <div className="flex gap-2">
                                        <button className="p-2 rounded-lg bg-slate-800 text-slate-400 hover:text-white hover:bg-indigo-600 transition-all">
                                            <Edit2 size={18} />
                                        </button>
                                        <button className="p-2 rounded-lg bg-slate-800 text-slate-400 hover:text-red-500 hover:bg-red-500/10 transition-all">
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                ) : (
                                    <button className="p-2 rounded-lg bg-slate-800 text-slate-400">
                                        <ChevronRight size={20} />
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Schedule;