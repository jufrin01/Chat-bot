import React from 'react';
import { User, Mail, MapPin, Code, Save } from 'lucide-react';
import { DUMMY_USER } from '../../data/dummy';

const Settings: React.FC = () => {
    return (
        <div className="p-6 lg:p-8 max-w-3xl mx-auto">
            <div className="bg-slate-900/40 border border-slate-800 rounded-3xl overflow-hidden backdrop-blur-md">
                <div className="h-32 bg-gradient-to-r from-indigo-600 to-purple-600" />
                <div className="px-8 pb-8">
                    <div className="relative -mt-12 mb-6">
                        <img src={DUMMY_USER.avatar} alt="Profile" className="h-24 w-24 rounded-2xl border-4 border-slate-950 bg-slate-800 shadow-xl" />
                    </div>

                    <div className="space-y-6">
                        <div>
                            <h2 className="text-2xl font-black text-white">{DUMMY_USER.username}</h2>
                            <p className="text-slate-400 text-sm">{DUMMY_USER.role} @ Indotech Logistik Indo</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="p-4 rounded-2xl bg-slate-950/50 border border-slate-800 space-y-1">
                                <div className="flex items-center gap-2 text-slate-500"><Mail size={14}/> <span className="text-[10px] font-bold uppercase tracking-widest">Email</span></div>
                                <p className="text-sm font-medium text-slate-200">jufrin200@gmail.com</p>
                            </div>
                            <div className="p-4 rounded-2xl bg-slate-950/50 border border-slate-800 space-y-1">
                                <div className="flex items-center gap-2 text-slate-500"><MapPin size={14}/> <span className="text-[10px] font-bold uppercase tracking-widest">Location</span></div>
                                <p className="text-sm font-medium text-slate-200">Cakung Barat, Jakarta</p>
                            </div>
                        </div>

                        <button className="flex items-center justify-center gap-2 w-full py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-2xl shadow-lg shadow-indigo-600/20 transition-all">
                            <Save size={20} /> SAVE CHANGES
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Settings;