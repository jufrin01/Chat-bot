import React, { useState, useEffect, useRef } from 'react';
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';

import DashboardLayout, { NotificationItem } from '../../layout/DashboardLayout';
import ChatHeader from '../../components/ChatHeader';
import ChatArea from '../../components/ChatArea';
import ChatInput from '../../components/ChatInput';
import Schedule from './Schedule';
import Squads from './Squads';
import Settings from './Settings';
import Chronicles from '../../layout/Chronicles';
import WelcomeToast from '../../components/ui/WelcomeToast';

import api from '../../api/axios';
import { Message } from '../../types/chat';

interface DashboardProps {
    onLogout: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onLogout }) => {
    // --- STATE MANAGEMENT ---
    const [activeTab, setActiveTab] = useState<'chat' | 'schedule' | 'squads' | 'chronicles' | 'settings'>('chat');

    const [userData, setUserData] = useState<any>(() => {
        try {
            const saved = localStorage.getItem('user');
            return saved ? JSON.parse(saved) : null;
        } catch (e) {
            console.error("Error parsing user data", e);
            localStorage.removeItem('user');
            return null;
        }
    });

    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState<string>('');
    const [showWelcome, setShowWelcome] = useState(false);
    const [notifications, setNotifications] = useState<NotificationItem[]>([]);

    const stompClientRef = useRef<any>(null);
    const scrollRef = useRef<HTMLDivElement>(null);

    const username = userData?.username || 'Adventurer';

    // --- 1. INITIAL LOAD & HISTORY ---
    useEffect(() => {
        const hasBeenWelcomed = sessionStorage.getItem('hasBeenWelcomed');
        if (!hasBeenWelcomed) {
            setShowWelcome(true);
            sessionStorage.setItem('hasBeenWelcomed', 'true');
        }

        // Ambil history chat saat pertama kali buka
        fetchChatHistory();
    }, []);

    // --- 2. WEBSOCKET CONNECTION (REAL-TIME) ---
    useEffect(() => {
        // Tentukan URL WebSocket (Sesuaikan dengan IP VPS kamu)
        const socketUrl = `${window.location.origin}/ws`; // Otomatis ikut domain/IP browser

        const socket = new SockJS(socketUrl);
        const stompClient = Stomp.over(socket);

        // Matikan debug log di production agar console bersih
        if (process.env.NODE_ENV === 'production') {
            stompClient.debug = () => {};
        }

        stompClient.connect({}, (frame: any) => {
            console.log('Connected to Realm Socket');
            stompClientRef.current = stompClient;

            // Subscribe ke Chat Global
            stompClient.subscribe('/topic/public', (payload: any) => {
                const newMessage = JSON.parse(payload.body);

                // Tambahkan pesan baru ke state (langsung muncul tanpa refresh)
                setMessages((prev) => [...prev, newMessage]);

                // Auto scroll ke bawah
                if (scrollRef.current) {
                    scrollRef.current.scrollIntoView({ behavior: 'smooth' });
                }
            });

            // Subscribe ke Notifikasi
            stompClient.subscribe('/topic/notifications', (payload: any) => {
                const newNotif = JSON.parse(payload.body);
                setNotifications((prev) => [newNotif, ...(prev || [])]);
            });

        }, (error: any) => {
            console.error("WebSocket Error:", error);
        });

        return () => {
            if (stompClientRef.current) stompClientRef.current.disconnect();
        };
    }, []);

    const fetchChatHistory = async () => {
        try {
            const response = await api.get('/chat/history');
            if (Array.isArray(response.data)) {
                setMessages(response.data);
            } else {
                setMessages([]);
            }
        } catch (error) {
            console.error("Failed to fetch chat history:", error);
            setMessages([]);
        }
    };

    const handleSend = async () => {
        if (!input.trim() || !userData) return;

        const chatPayload = {
            senderId: userData.id,
            content: input,
            messageType: 'CHAT',
            guildId: null
        };

        try {
            // Kirim ke endpoint REST, nanti backend yang broadcast via WebSocket
            await api.post('/chat/send', chatPayload);
            setInput('');
        } catch (error) {
            console.error("Failed to send message:", error);
        }
    };

    // Auto-scroll saat pesan bertambah atau tab berubah
    useEffect(() => {
        if (activeTab === 'chat' && scrollRef.current) {
            scrollRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages, activeTab]);

    const handleProfileUpdate = (updatedData: any) => {
        setUserData(updatedData);
        localStorage.setItem('user', JSON.stringify(updatedData));
    };

    // --- RENDER CONTENT BASED ON TAB ---
    const renderContent = () => {
        switch (activeTab) {
            case 'chat':
                return (
                    <div className="flex flex-col h-[calc(100vh-8rem)] md:h-[calc(100vh-6rem)] bg-black/20 rounded-3xl border border-amber-900/20 backdrop-blur-sm overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-300">
                        {/* Header Chat */}
                        <div className="p-4 border-b border-amber-900/20 bg-black/40 flex justify-between items-center">
                            <div>
                                <h2 className="text-amber-100 font-bold font-rpg tracking-wider uppercase">General Tavern</h2>
                                <p className="text-[10px] text-emerald-500 font-mono flex items-center gap-1">
                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                                    Live Connection
                                </p>
                            </div>
                            <div className="text-xs text-amber-500/50 font-mono">
                                Heroes Online: 128
                            </div>
                        </div>

                        {/* Area Chat */}
                        <div className="flex-1 overflow-y-auto p-4 lg:p-6 custom-scrollbar relative">
                            {(!messages || messages.length === 0) ? (
                                <div className="flex flex-col items-center justify-center h-full text-amber-500/30 italic space-y-2">
                                    <div className="w-12 h-12 rounded-full bg-amber-900/10 flex items-center justify-center">
                                        <span className="text-2xl">📜</span>
                                    </div>
                                    <p>The Tavern is quiet...</p>
                                </div>
                            ) : (
                                <ChatArea messages={messages} />
                            )}
                            <div ref={scrollRef} />
                        </div>

                        {/* Input Area */}
                        <div className="p-4 bg-black/40 border-t border-amber-900/20 backdrop-blur-md">
                            <div className="relative flex items-center gap-2">
                                <input
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                                    placeholder="Type your message, Hero..."
                                    className="w-full bg-black/40 border border-amber-900/30 rounded-xl py-3 pl-4 pr-12 text-amber-100 placeholder:text-amber-900/50 focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/20 focus:outline-none transition-all"
                                />
                                <button
                                    onClick={handleSend}
                                    disabled={!input.trim()}
                                    className="absolute right-2 p-2 bg-amber-600/20 text-amber-500 rounded-lg hover:bg-amber-600 hover:text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    ➤
                                </button>
                            </div>
                        </div>
                    </div>
                );
            case 'schedule': return <Schedule />;
            case 'squads': return <Squads />;
            case 'chronicles': return <Chronicles />;
            case 'settings':
                return (
                    <Settings
                        userData={userData}
                        onProfileUpdate={handleProfileUpdate}
                    />
                );
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
            notifications={notifications}
        >
            {showWelcome && <WelcomeToast username={username} onClose={() => setShowWelcome(false)} />}
            {renderContent()}
        </DashboardLayout>
    );
};

export default Dashboard;