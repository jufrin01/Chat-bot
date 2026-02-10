import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp } from 'lucide-react';
import { MatchHistory } from '../../hooks/useChronicles';

interface PerformanceChartProps {
    history: MatchHistory[];
}

const PerformanceChart: React.FC<PerformanceChartProps> = ({ history }) => {
    // Transform data untuk grafik (Match lama di kiri, baru di kanan)
    const chartData = [...history].reverse().map((match, index) => ({
        name: `M${index + 1}`,
        kda: Number(((match.kills + match.assists) / (match.deaths || 1)).toFixed(2))
    }));

    return (
        <div className="lg:col-span-2 bg-black/40 border border-amber-900/30 p-6 rounded-3xl backdrop-blur-md">
            <h3 className="text-sm font-bold text-amber-100 uppercase tracking-widest mb-6 flex items-center gap-2">
                <TrendingUp size={16} className="text-amber-500" /> Performance Trend (KDA)
            </h3>
            <div className="h-64 w-full">
                {chartData.length > 0 ? (
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={chartData}>
                            <defs>
                                <linearGradient id="colorKda" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3} />
                                    <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="#451a03" opacity={0.3} />
                            <XAxis dataKey="name" stroke="#b45309" fontSize={10} tick={false} axisLine={false} />
                            <YAxis stroke="#b45309" fontSize={10} tickLine={false} axisLine={false} />
                            <Tooltip
                                contentStyle={{ backgroundColor: '#000', borderColor: '#78350f', borderRadius: '8px', color: '#fff' }}
                                itemStyle={{ color: '#fbbf24' }}
                            />
                            <Area type="monotone" dataKey="kda" stroke="#f59e0b" strokeWidth={2} fillOpacity={1} fill="url(#colorKda)" />
                        </AreaChart>
                    </ResponsiveContainer>
                ) : (
                    <div className="h-full flex items-center justify-center text-amber-900/40 text-xs italic uppercase tracking-widest">
                        Play more matches to unlock analytics
                    </div>
                )}
            </div>
        </div>
    );
};

export default PerformanceChart;