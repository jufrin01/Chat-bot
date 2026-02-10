import React from 'react';
import { Swords, Trophy, Target, Activity } from 'lucide-react';
import { ChronicleStats } from '../../hooks/useChronicles';

interface StatCardsProps {
    stats: ChronicleStats;
}

const StatCards: React.FC<StatCardsProps> = ({ stats }) => {
    const items = [
        { label: 'Total Matches', value: stats.totalMatches, icon: <Swords />, color: 'text-amber-400' },
        { label: 'Win Rate', value: `${stats.winRate}%`, icon: <Trophy />, color: 'text-emerald-400' },
        { label: 'Avg KDA', value: stats.averageKDA, icon: <Target />, color: 'text-red-400' },
        { label: 'Main Game', value: stats.mostPlayedGame, icon: <Activity />, color: 'text-purple-400' },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            {items.map((stat, idx) => (
                <div key={idx} className="bg-black/40 border border-amber-900/30 p-5 rounded-2xl backdrop-blur-md flex items-center gap-4 hover:border-amber-500/30 transition-all group">
                    <div className={`p-3 rounded-xl bg-black/40 border border-white/5 ${stat.color} group-hover:scale-110 transition-transform`}>
                        {stat.icon}
                    </div>
                    <div>
                        <p className="text-xl font-bold font-rpg text-white">{stat.value}</p>
                        <p className="text-[10px] text-amber-500/60 uppercase tracking-widest font-bold">{stat.label}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default StatCards;