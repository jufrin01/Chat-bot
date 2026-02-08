import React, { useState, useEffect, useRef } from 'react';
import DashboardLayout from '../../layout/DashboardLayout';
import ChatArea from '../../components/ChatArea';
import ChatInput from '../../components/ChatInput';
import Schedule from './Schedule';
import Squads from './Squads';
import Settings from './Settings';

// Import Data & Types
import { INITIAL_MESSAGES } from '../../data/dummy';
import { Message } from '../../types/chat';

interface DashboardProps {
    onLogout: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onLogout }) => {
    // --- STATE ---
    // Menentukan halaman yang aktif berdasarkan pilihan di Sidebar
    const [activeTab, setActiveTab] = useState<'chat' | 'schedule' | 'squads' | 'settings'>('chat');
    const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
    const [input, setInput] = useState<string>('');

    const scrollRef = useRef<HTMLDivElement>(null);

    // Ambil data user dari localStorage
    const username = localStorage.getItem('username') || 'User';
    const userRole = localStorage.getItem('role') || 'ANGGOTA';

    // Efek Auto-scroll untuk Tab Chat
    useEffect(() => {
        if (activeTab === 'chat' && scrollRef.current) {
            scrollRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages, activeTab]);

    // --- HANDLER KIRIM PESAN (SIMULASI WEBSOCKET) ---
    const handleSend = () => {
        if (!input.trim()) return;

        // Tambahkan pesan user dengan metadata role
        const userMsg: Message = {
            role: 'user',
            text: input,
            senderName: username,
            senderRole: userRole as any,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };

        setMessages((prev) => [...prev, userMsg]);
        setInput('');

        // Simulasi Respon AI
        setTimeout(() => {
            const aiMsg: Message = {
                role: 'ai',
                text: `Halo ${username}, pesan kamu sedang diproses oleh GameSync AI Planner.`,
                senderName: 'GameSync Bot',
                senderRole: 'BOT',
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            };
            setMessages((prev) => [...prev, aiMsg]);
        }, 1000);
    };

    // --- LOGIKA RENDER KONTEN BERDASARKAN TAB ---
    const renderContent = () => {
        switch (activeTab) {
            case 'chat':
                return (
                    <div className="flex flex-col h-full overflow-hidden">
                        <div className="flex-1 overflow-y-auto p-4 lg:p-6 space-y-6 custom-scrollbar">
                            <ChatArea messages={messages} />
                            <div ref={scrollRef} />
                        </div>
                        {/* Input Chat hanya muncul di tab AI Planner */}
                        <footer className="p-4 bg-slate-950/50 backdrop-blur-sm border-t border-slate-800/50">
                            <ChatInput
                                input={input}
                                setInput={setInput}
                                onSend={handleSend}
                            />
                        </footer>
                    </div>
                );
            case 'schedule':
                return <Schedule />;
            case 'squads':
                return <Squads />;
            case 'settings':
                return <Settings />;
            default:
                return null;
        }
    };

    // Judul Dinamis untuk Header
    const getHeaderTitle = () => {
        switch (activeTab) {
            case 'chat': return "AI PLANNER";
            case 'schedule': return "MABAR SCHEDULE";
            case 'squads': return "MY SQUADS";
            case 'settings': return "PROFILE SETTINGS";
            default: return "DASHBOARD";
        }
    };

    return (
        <DashboardLayout
            activeTab={activeTab as any}
            setActiveTab={(tab) => setActiveTab(tab as any)}
            onLogout={onLogout}
            headerTitle={getHeaderTitle()}
        >
            {renderContent()}
        </DashboardLayout>
    );
};

export default Dashboard;