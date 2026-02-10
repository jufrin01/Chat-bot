import { useState, useEffect } from 'react';
import api from '../api/axios';

export interface MatchHistory {
    id: number;
    gameName: string;
    characterUsed: string;
    result: 'VICTORY' | 'DEFEAT' | 'DRAW';
    kills: number;
    deaths: number;
    assists: number;
    matchDate: string;
}

export interface ChronicleStats {
    totalMatches: number;
    winRate: number;
    averageKDA: number;
    mostPlayedGame: string;
}

export const useChronicles = () => {
    const [stats, setStats] = useState<ChronicleStats>({
        totalMatches: 0,
        winRate: 0,
        averageKDA: 0,
        mostPlayedGame: 'N/A'
    });
    const [history, setHistory] = useState<MatchHistory[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Menggunakan API instance yang sudah ada Interceptor Token-nya
                const res = await api.get('/chronicles/analytics');

                setStats({
                    totalMatches: res.data.totalMatches || 0,
                    winRate: res.data.winRate || 0,
                    averageKDA: res.data.averageKDA || 0,
                    mostPlayedGame: res.data.mostPlayedGame || 'N/A'
                });
                setHistory(res.data.recentMatches || []);
            } catch (error) {
                console.error("Failed to fetch chronicles:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    return { stats, history, isLoading };
};