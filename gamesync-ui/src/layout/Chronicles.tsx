import React from 'react';
import { RefreshCw, TrendingUp } from 'lucide-react';
import { useChronicles } from '../hooks/useChronicles';
import StatCards from '../components/chronicles/StatCards';
import PerformanceChart from '../components/chronicles/PerformanceChart';
import BattleLog from '../components/chronicles/BattleLog';

const Chronicles: React.FC = () => {
    // Panggil Logic dari Custom Hook
    const { stats, history, isLoading } = useChronicles();

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center py-20 text-amber-500/50 font-bold tracking-widest uppercase text-xs">
                <RefreshCw className="animate-spin mb-4" size={32} />
                Decoding Ancient Battle Records...
            </div>
        );
    }

    return (
        <div className="p-4 lg:p-8 max-w-7xl mx-auto pb-20 animate-in fade-in duration-500 font-sans text-amber-50">

            {/* --- HEADER --- */}
            <div className="flex items-center gap-3 mb-8">
                <div className="p-2.5 bg-amber-900/20 rounded-xl border border-amber-500/30 shadow-[0_0_15px_rgba(245,158,11,0.2)]">
                    <TrendingUp className="text-amber-500" size={28} />
                </div>
                <div>
                    <h1 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-100 to-amber-600 font-rpg tracking-widest uppercase">
                        Chronicles
                    </h1>
                    <p className="text-amber-500/60 text-xs font-bold uppercase tracking-[0.2em]">
                        Battle Records & Analytics
                    </p>
                </div>
            </div>

            {/* --- STAT CARDS --- */}
            <StatCards stats={stats} />

            {/* --- CHARTS & HISTORY --- */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Grafik KDA */}
                <PerformanceChart history={history} />

                {/* Log Pertandingan */}
                <BattleLog history={history} />
            </div>
        </div>
    );
};

export default Chronicles;