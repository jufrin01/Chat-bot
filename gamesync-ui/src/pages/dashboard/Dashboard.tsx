import React, { useState, useEffect, useRef } from 'react';
import DashboardLayout from '../../layout/DashboardLayout';
import ChatHeader from '../../components/ChatHeader';
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
    const [activeTab, setActiveTab] = useState<'chat' | 'schedule' | 'squads' | 'settings'>('chat');
    const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
    const [input, setInput] = useState<string>('');

    const scrollRef = useRef<HTMLDivElement>(null);

    // Ambil data user dari localStorage (Simulasi)
    const username = localStorage.getItem('username') || 'Adventurer';
    const userRole = localStorage.getItem('role') || 'ANGGOTA';

    // Efek Auto-scroll untuk Tab Chat
    useEffect(() => {
        if (activeTab === 'chat' && scrollRef.current) {
            scrollRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages, activeTab]);

    // --- HANDLER KIRIM PESAN ---
    const handleSend = () => {
        if (!input.trim()) return;

        // 1. Tambahkan pesan user
        const userMsg: Message = {
            role: 'user',
            text: input,
            senderName: username,
            senderRole: userRole as any,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };

        setMessages((prev) => [...prev, userMsg]);
        setInput('');

        // 2. Simulasi Respon AI (Oracle Bot)
        setTimeout(() => {
            const aiMsg: Message = {
                role: 'ai',
                text: `Halo ${username}, strategi raid kamu sedang dikalkulasi oleh GameSync Oracle.`,
                senderName: 'Oracle Bot',
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
                    <div className="flex flex-col h-full overflow-hidden relative">

                        {/* 1. HEADER (Sticky Top) */}
                        {/*<ChatHeader*/}
                        {/*    channelName="Tavern Chat"*/}
                        {/*    description="Tempat berkumpul para pahlawan untuk diskusi santai dan strategi harian."*/}
                        {/*    onlineCount={128}*/}
                        {/*/>*/}

                        {/* 2. CHAT AREA (Scrollable Middle) */}
                        <div className="flex-1 overflow-y-auto p-4 lg:p-6 space-y-6 custom-scrollbar relative z-10">
                            <ChatArea messages={messages} />
                            <div ref={scrollRef} />
                        </div>

                        {/* 3. FOOTER INPUT (Sticky Bottom - Capsule Style) */}
                        <footer className="w-full py-4 px-4 bg-black/60 backdrop-blur-xl border-t border-amber-900/20 relative z-20 flex justify-center items-center shadow-[0_-5px_20px_rgba(0,0,0,0.3)]">
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

    // --- JUDUL HEADER DINAMIS (RPG THEME) ---
    const getHeaderTitle = () => {
        switch (activeTab) {
            case 'chat': return "General Tavern";
            case 'schedule': return "Quest Board";
            case 'squads': return "My Guilds";
            case 'settings': return "Character Sheet";
            default: return "Command Center";
        }
    };

    return (
        <DashboardLayout
            activeTab={activeTab}
            setActiveTab={(tab) => setActiveTab(tab as any)}
            onLogout={onLogout}
            headerTitle={getHeaderTitle()}
        >
            {renderContent()}
        </DashboardLayout>
    );
};

export default Dashboard;