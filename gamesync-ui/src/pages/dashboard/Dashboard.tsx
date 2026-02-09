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

// Import Data & Types
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

    // Ambil data user dari localStorage
    const username = localStorage.getItem('username') || 'Adventurer';
    const userRole = localStorage.getItem('role') || 'ANGGOTA';

    // --- EFFECTS ---

    useEffect(() => {
        setShowWelcome(true);
    }, []);

    useEffect(() => {
        if (activeTab === 'chat' && scrollRef.current) {
            scrollRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages, activeTab]);

    // --- LOGIC: SLASH COMMAND PROCESSOR ---
    const processCommand = (cmd: string) => {
        const lowerCmd = cmd.toLowerCase().trim();

        if (lowerCmd.startsWith('/roll')) {
            const rollResult = Math.floor(Math.random() * 100) + 1;
            let rollMessage = "";

            if (rollResult === 100) {
                rollMessage = "🎲 **CRITICAL SUCCESS!** (100) - The Gods smile upon you!";
            } else if (rollResult === 1) {
                rollMessage = "💀 **CRITICAL FAILURE!** (1) - You tripped over your own weapon.";
            } else {
                rollMessage = `🎲 **Rolled: ${rollResult}** (1-100)`;
            }

            setTimeout(() => {
                const sysMsg: Message = {
                    role: 'ai',
                    text: rollMessage,
                    senderName: 'Game Master',
                    senderRole: 'ADMIN',
                    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                };
                setMessages((prev) => [...prev, sysMsg]);
            }, 300);
            return true;
        }

        if (lowerCmd === '/clear') {
            setMessages([]);
            setTimeout(() => {
                setMessages([{
                    role: 'ai',
                    text: "🧹 *The tavern keeper has swept the floor. Chat history purged.*",
                    senderName: 'System',
                    senderRole: 'BOT',
                    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                }]);
            }, 200);
            return true;
        }

        if (lowerCmd === '/heal') {
            setTimeout(() => {
                const sysMsg: Message = {
                    role: 'ai',
                    text: "✨ **Sanctuary!** All party members have been fully healed.",
                    senderName: 'Cleric Bot',
                    senderRole: 'BOT',
                    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                };
                setMessages((prev) => [...prev, sysMsg]);
            }, 500);
            return true;
        }

        return false;
    };

    // --- HANDLER: SEND MESSAGE ---
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

            // Simulasi Auto-Reply Oracle
            setTimeout(() => {
                const replies = [
                    `Affirmative, ${username}.`,
                    "Calculations complete. Probability of success: 32.33% (repeating of course).",
                    "I detect high mana usage in the southern region.",
                    "Don't forget to repair your armor before the raid.",
                    "System online. All systems nominal."
                ];

                // PERBAIKAN 1: Tambahkan fallback string (|| "") agar tidak undefined
                const randomReply = replies[Math.floor(Math.random() * replies.length)] || "System Online.";

                const aiMsg: Message = {
                    role: 'ai',
                    text: randomReply,
                    senderName: 'Oracle Bot',
                    senderRole: 'BOT',
                    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                };
                setMessages((prev) => [...prev, aiMsg]);
            }, 1000);
        }

        setInput('');
    };

    // --- RENDER CONTENT SWITCHER ---
    const renderContent = () => {
        switch (activeTab) {
            case 'chat':
                return (
                    <div className="flex flex-col h-full overflow-hidden relative">

                        {/* PERBAIKAN 2: Sesuaikan Props dengan ChatHeader baru */}
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
            case 'chronicles':
                return <Chronicles />;
            case 'settings':
                return <Settings />;
            default:
                return null;
        }
    };

    // --- DYNAMIC HEADER TITLE ---
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