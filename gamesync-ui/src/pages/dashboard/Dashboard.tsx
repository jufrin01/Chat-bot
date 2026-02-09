import React, { useState, useEffect, useRef } from 'react';
import DashboardLayout from '../../layout/DashboardLayout';
import ChatHeader from '../../components/ChatHeader';
import ChatArea from '../../components/ChatArea';
import ChatInput from '../../components/ChatInput';
import Schedule from './Schedule';
import Squads from './Squads';
import Settings from './Settings';
import Chronicles from '../../layout/Chronicles';
import WelcomeToast from '../../components/ui/WelcomeToast';

import { INITIAL_MESSAGES } from '../../data/dummy';
import { Message } from '../../types/chat';

interface DashboardProps {
    onLogout: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onLogout }) => {
    // --- STATE MANAGEMENT ---
    const [activeTab, setActiveTab] = useState<'chat' | 'schedule' | 'squads' | 'chronicles' | 'settings'>('chat');
    const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
    const [input, setInput] = useState<string>('');
    const [showWelcome, setShowWelcome] = useState(false);

    const scrollRef = useRef<HTMLDivElement>(null);

    const username = localStorage.getItem('username') || 'Adventurer';
    const userRole = localStorage.getItem('role') || 'ANGGOTA';

    useEffect(() => {
        setShowWelcome(true);
    }, []);

    useEffect(() => {
        if (activeTab === 'chat' && scrollRef.current) {
            scrollRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages, activeTab]);

    const processCommand = (cmd: string) => {
        const lowerCmd = cmd.toLowerCase().trim();
        // ... (Logic Command Sama Seperti Sebelumnya) ...
        if (lowerCmd.startsWith('/roll')) {
            // ... logic roll
            return true;
        }
        if (lowerCmd === '/clear') {
            setMessages([]);
            return true;
        }
        return false;
    };

    const handleSend = () => {
        if (!input.trim()) return;
        const isCommand = processCommand(input);

        if (!isCommand) {
            const userMsg: Message = {
                role: 'user',
                text: input,
                senderName: username,
                senderRole: userRole as any,
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            };
            setMessages((prev) => [...prev, userMsg]);

            // Auto Reply
            setTimeout(() => {
                const aiMsg: Message = {
                    role: 'ai',
                    text: "System Online.",
                    senderName: 'Oracle Bot',
                    senderRole: 'BOT',
                    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                };
                setMessages((prev) => [...prev, aiMsg]);
            }, 1000);
        }
        setInput('');
    };

    const renderContent = () => {
        switch (activeTab) {
            case 'chat':
                return (
                    <div className="flex flex-col h-full overflow-hidden relative">
                        {/* HEADER: Transparent */}
                        <ChatHeader
                            title="Tavern Chat"
                            subtitle="Main gathering hall for heroes and strategists."
                            type="CHANNEL"
                            onlineCount={128}
                        />

                        <div className="flex-1 overflow-y-auto p-4 lg:p-6 space-y-6 custom-scrollbar relative z-10">
                            <ChatArea messages={messages} />
                            <div ref={scrollRef} />
                        </div>

                        {/* FOOTER: UBAH JADI TRANSPARAN (bg-black/20) */}
                        <footer className="w-full py-4 px-4 bg-black/20 backdrop-blur-xl border-t border-amber-900/10 relative z-20 flex justify-center items-center shadow-[0_-5px_20px_rgba(0,0,0,0.1)]">
                            <ChatInput
                                input={input}
                                setInput={setInput}
                                onSend={handleSend}
                            />
                        </footer>
                    </div>
                );
            case 'schedule': return <Schedule />;
            case 'squads': return <Squads />;
            case 'chronicles': return <Chronicles />;
            case 'settings': return <Settings />;
            default: return null;
        }
    };

    const getHeaderTitle = () => {
        switch (activeTab) {
            case 'chat': return "General Tavern";
            case 'schedule': return "Quest Board";
            case 'squads': return "Active Guilds";
            case 'chronicles': return "Battle Records";
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
            {showWelcome && (
                <WelcomeToast
                    username={username}
                    onClose={() => setShowWelcome(false)}
                />
            )}
            {renderContent()}
        </DashboardLayout>
    );
};

export default Dashboard;