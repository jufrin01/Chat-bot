import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Users, Sword, Edit2, Trash2, Timer } from 'lucide-react';

interface QuestItemProps {
    quest: any;
    isAdmin: boolean;
    onDelete: (id: number) => void;
}

const QuestItem: React.FC<QuestItemProps> = ({ quest, isAdmin, onDelete }) => {
    const [timeLeft, setTimeLeft] = useState<string>("");
    const [isExpired, setIsExpired] = useState(false);

    // --- LOGIKA HITUNG MUNDUR ---
    useEffect(() => {
        const calculateTimeLeft = () => {
            // Gabungkan Date (YYYY-MM-DD) dan Time (HH:mm) menjadi format ISO
            const targetDate = new Date(`${quest.date}T${quest.time}:00`);
            const now = new Date();
            const difference = targetDate.getTime() - now.getTime();

            if (difference > 0) {
                const days = Math.floor(difference / (1000 * 60 * 60 * 24));
                const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
                const minutes = Math.floor((difference / 1000 / 60) % 60);
                const seconds = Math.floor((difference / 1000) % 60);

                // Format tampilan: "2d 10h 30m"
                let timeString = "";
                if (days > 0) timeString += `${days}d `;
                timeString += `${hours}h ${minutes}m ${seconds}s`;

                setTimeLeft(timeString);
                setIsExpired(false);
            } else {
                setTimeLeft("EVENT STARTED");
                setIsExpired(true);
            }
        };

        // Update setiap 1 detik
        const timer = setInterval(calculateTimeLeft, 1000);
        calculateTimeLeft(); // Jalankan langsung agar tidak ada delay 1 detik pertama

        return () => clearInterval(timer);
    }, [quest.date, quest.time]);

    return (
        <div className={`group relative backdrop-blur-md border p-1 rounded-2xl transition-all duration-300 hover:shadow-[0_0_20px_rgba(245,158,11,0.15)] ${isExpired ? 'bg-red-950/20 border-red-900/30 grayscale-[0.5]' : 'bg-black/40 border-amber-900/30 hover:border-amber-500/50'}`}>
            <div className="bg-gradient-to-r from-black/60 to-transparent p-5 rounded-xl h-full flex flex-col md:flex-row md:items-center justify-between gap-6">

                {/* Bagian Kiri: Icon & Judul */}
                <div className="flex items-start md:items-center gap-5">
                    <div className="h-16 w-16 shrink-0 rounded-xl bg-gradient-to-br from-amber-900/40 to-black border border-amber-500/30 flex items-center justify-center text-amber-400 shadow-inner relative overflow-hidden">
                        <Sword size={28} />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-white tracking-wide font-rpg uppercase">
                            {quest.game}
                        </h3>

                        {/* COUNTDOWN DISPLAY */}
                        <div className="flex items-center gap-2 mt-2">
                            <Timer size={14} className={isExpired ? "text-red-500" : "text-emerald-400 animate-pulse"} />
                            <span className={`text-xs font-mono font-bold tracking-widest ${isExpired ? "text-red-500" : "text-emerald-400"}`}>
                                {timeLeft}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Bagian Kanan: Detail & Actions */}
                <div className="flex items-center justify-between md:justify-end gap-6 w-full md:w-auto border-t md:border-t-0 border-amber-900/30 pt-4 md:pt-0">
                    <div className="text-left md:text-right space-y-1">
                        <div className="flex items-center gap-2 text-amber-500/60 font-mono text-[10px] uppercase font-bold tracking-wider">
                            <Calendar size={12} /> {quest.date} • {quest.time}
                        </div>
                        <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-[0.1em] border ${quest.status === 'Confirmed' ? 'bg-emerald-900/20 text-emerald-400 border-emerald-500/30' : 'bg-amber-900/20 text-amber-500 border-amber-500/30'}`}>
                            <div className={`h-1.5 w-1.5 rounded-full animate-pulse ${quest.status === 'Confirmed' ? 'bg-emerald-500' : 'bg-amber-500'}`}></div>
                            {quest.status}
                        </span>
                    </div>

                    {isAdmin && (
                        <div className="flex gap-2 pl-4 md:pl-0 border-l md:border-l-0 border-amber-900/30">
                            <button onClick={() => onDelete(quest.id)} className="p-2.5 rounded-lg bg-black/60 border border-amber-900/40 text-amber-500/60 hover:text-red-400 hover:border-red-500/50 transition-all">
                                <Trash2 size={16} />
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default QuestItem;