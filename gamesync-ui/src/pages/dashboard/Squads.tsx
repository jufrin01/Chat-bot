import React from 'react';
import { Users, Shield, Circle } from 'lucide-react';
import { DUMMY_SQUADS } from '../../data/dummy';

const Squads: React.FC = () => {
    return (
        <div className="p-6 lg:p-8 max-w-6xl mx-auto animate-in fade-in duration-500">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {DUMMY_SQUADS.map((squad) => (
                    <div key={squad.id} className="bg-slate-900/40 border border-slate-800 rounded-2xl p-6 backdrop-blur-md">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="h-14 w-14 rounded-2xl bg-indigo-600/20 flex items-center justify-center text-indigo-400">
                                <Shield size={32} />
                            </div>
                            <div>
                                <h3 className="text-xl font-black text-white">{squad.name}</h3>
                                <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">{squad.game}</p>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Members</p>
                            {squad.members.map((member) => (
                                <div key={member.id} className="flex items-center justify-between p-3 rounded-xl bg-slate-950/50 border border-slate-800/50">
                                    <div className="flex items-center gap-3">
                                        <div className="h-8 w-8 rounded-full bg-slate-800 flex items-center justify-center text-[10px] font-bold text-slate-400">
                                            {member.name.substring(0, 2)}
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-slate-200">{member.name}</p>
                                            <p className="text-[10px] text-slate-500">{member.role}</p>
                                        </div>
                                    </div>
                                    <Circle size={8} className={member.status === 'Online' ? 'fill-emerald-500 text-emerald-500' : 'fill-slate-700 text-slate-700'} />
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Squads;