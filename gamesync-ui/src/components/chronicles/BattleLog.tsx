import React from 'react';
import { Scroll } from 'lucide-react';
import { MatchHistory } from '../../hooks/useChronicles';

interface BattleLogProps {
    history: MatchHistory[];
}

const BattleLog: React.FC<BattleLogProps> = ({ history }) => {
    return (
        <div className="bg-black/40 border border-amber-900/30 p-6 rounded-3xl backdrop-blur-md flex flex-col h-[400px]">
            <h3 className="text-sm font-bold text-amber-100 uppercase tracking-widest mb-4 flex items-center gap-2">
                <Scroll size={16} className="text-amber-500" /> Battle Log
            </h3>

            <div className="flex-1 overflow-y-auto space-y-3 pr-2 scrollbar-thin scrollbar-thumb-amber-900/50">
                {history.length > 0 ? (
                    history.map((match) => (
                        <div key={match.id} className="bg-black/20 p-3 rounded-xl border border-amber-900/20 flex justify-between items-center group hover:bg-black/40 transition-colors">
                            <div>
                                <div className="flex items-center gap-2">
                                    <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold uppercase ${match.result === 'VICTORY' ? 'bg-emerald-900/30 text-emerald-400 border border-emerald-500/20' : 'bg-red-900/30 text-red-400 border border-red-500/20'}`}>
                                        {match.result}
                                    </span>
                                    <span className="text-xs font-bold text-amber-100">{match.gameName}</span>
                                </div>
                                <div className="text-[10px] text-amber-500/50 mt-1 flex gap-2">
                                    <span>{match.characterUsed}</span>
                                    <span>•</span>
                                    <span>{new Date(match.matchDate).toLocaleDateString()}</span>
                                </div>
                            </div>
                            <div className="text-right">
                                <div className="text-sm font-bold font-mono text-amber-100">
                                    {match.kills}/{match.deaths}/{match.assists}
                                </div>
                                <div className="text-[9px] text-amber-500/40 uppercase tracking-wider">KDA</div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-center py-10 text-amber-900/40 text-xs uppercase">No battle records found</div>
                )}
            </div>
        </div>
    );
};

export default BattleLog;