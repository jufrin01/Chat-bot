import React, { useState, useEffect } from 'react';
import { X, Sword, Calendar, Clock, Users, AlertCircle } from 'lucide-react';

// --- DEFINISI INTERFACE PROPS (PENTING) ---
// Ini memberi tahu TypeScript bahwa komponen ini menerima isOpen, onClose, & onSubmit
interface QuestFormModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: any) => void;
}

// Tambahkan React.FC<QuestFormModalProps> di sini
const QuestFormModal: React.FC<QuestFormModalProps> = ({ isOpen, onClose, onSubmit }) => {

    const [formData, setFormData] = useState({
        game: '',
        squad: '',
        date: '',
        time: '',
        status: 'Open'
    });

    const [error, setError] = useState<string | null>(null);

    // Reset form saat modal dibuka
    useEffect(() => {
        if (isOpen) {
            setFormData({
                game: '',
                squad: '',
                date: '',
                time: '',
                status: 'Open'
            });
            setError(null);
        }
    }, [isOpen]);

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Validasi Waktu
        const selectedDateTime = new Date(`${formData.date}T${formData.time}`);
        const now = new Date();

        if (selectedDateTime < now) {
            setError("Time Paradox Detected: Cannot post a quest in the past!");
            return;
        }

        onSubmit(formData);
        onClose();
    };

    // Helper untuk disable tanggal masa lalu
    const today = new Date().toISOString().split('T')[0];

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-200">
            <div className="bg-black border border-amber-900/40 w-full max-w-md rounded-2xl shadow-[0_0_50px_rgba(245,158,11,0.1)] relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-amber-500 to-transparent"></div>

                <div className="p-6 border-b border-amber-900/20 flex justify-between items-center">
                    <h2 className="text-xl font-bold text-amber-100 font-rpg uppercase tracking-widest">New Quest</h2>
                    <button onClick={onClose} className="text-amber-500/50 hover:text-amber-500 transition-colors"><X size={20}/></button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    {/* Error Message */}
                    {error && (
                        <div className="flex items-center gap-2 p-3 bg-red-950/40 border border-red-500/30 rounded-lg text-red-200 text-xs animate-in slide-in-from-top-1">
                            <AlertCircle size={16} className="text-red-500 shrink-0" />
                            <span>{error}</span>
                        </div>
                    )}

                    {/* Inputs */}
                    <div className="space-y-1">
                        <label className="text-[10px] font-bold text-amber-500 uppercase tracking-widest">Game Title</label>
                        <div className="relative">
                            <Sword size={16} className="absolute left-3 top-3 text-amber-500/40" />
                            <input
                                required
                                type="text"
                                className="w-full bg-black/40 border border-amber-900/30 rounded-lg py-2.5 pl-10 text-amber-100 text-sm focus:border-amber-500/50 outline-none transition-colors placeholder:text-amber-900/40"
                                placeholder="e.g. League of Legends"
                                value={formData.game}
                                onChange={e => setFormData({...formData, game: e.target.value})}
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <label className="text-[10px] font-bold text-amber-500 uppercase tracking-widest">Squad Name</label>
                            <div className="relative">
                                <Users size={16} className="absolute left-3 top-3 text-amber-500/40" />
                                <input
                                    required
                                    type="text"
                                    className="w-full bg-black/40 border border-amber-900/30 rounded-lg py-2.5 pl-10 text-amber-100 text-sm focus:border-amber-500/50 outline-none"
                                    placeholder="e.g. Alpha Team"
                                    value={formData.squad}
                                    onChange={e => setFormData({...formData, squad: e.target.value})}
                                />
                            </div>
                        </div>
                        <div className="space-y-1">
                            <label className="text-[10px] font-bold text-amber-500 uppercase tracking-widest">Date</label>
                            <div className="relative">
                                <Calendar size={16} className="absolute left-3 top-3 text-amber-500/40" />
                                <input
                                    required
                                    type="date"
                                    min={today}
                                    className="w-full bg-black/40 border border-amber-900/30 rounded-lg py-2.5 pl-10 text-amber-100 text-sm focus:border-amber-500/50 outline-none [color-scheme:dark]"
                                    value={formData.date}
                                    onChange={e => {
                                        setFormData({...formData, date: e.target.value});
                                        setError(null);
                                    }}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="space-y-1">
                        <label className="text-[10px] font-bold text-amber-500 uppercase tracking-widest">Start Time</label>
                        <div className="relative">
                            <Clock size={16} className="absolute left-3 top-3 text-amber-500/40" />
                            <input
                                required
                                type="time"
                                className="w-full bg-black/40 border border-amber-900/30 rounded-lg py-2.5 pl-10 text-amber-100 text-sm focus:border-amber-500/50 outline-none [color-scheme:dark]"
                                value={formData.time}
                                onChange={e => {
                                    setFormData({...formData, time: e.target.value});
                                    setError(null);
                                }}
                            />
                        </div>
                    </div>

                    <button type="submit" className="w-full bg-amber-600 hover:bg-amber-500 text-black font-bold py-3 rounded-xl uppercase tracking-widest mt-4 transition-all hover:scale-[1.02] shadow-[0_0_15px_rgba(245,158,11,0.3)]">
                        Post Quest
                    </button>
                </form>
            </div>
        </div>
    );
};

export default QuestFormModal;