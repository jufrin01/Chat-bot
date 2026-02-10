import React, { useState, useEffect, useRef } from 'react';
import SockJS from 'sockjs-client';
import * as Stomp from 'stompjs/lib/stomp.js';

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

    // [SAFETY] Gunakan array kosong sebagai default untuk menghindari crash map null
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState<string>('');
    const [showWelcome, setShowWelcome] = useState(false);

    // [SAFETY] Default array kosong
    const [notifications, setNotifications] = useState<NotificationItem[]>([]);

    const stompClientRef = useRef<any>(null);
    const scrollRef = useRef<HTMLDivElement>(null);

    // [SAFETY] Handle jika localStorage kosong/corrupt
    const userString = localStorage.getItem('user');

    // --- [FIX] Tambahkan ': any' agar TypeScript tidak error saat akses .id atau .role ---
    let userData: any = null;

    try {
        userData = userString ? JSON.parse(userString) : null;
    } catch (e) {
        console.error("Error parsing user data", e);
        localStorage.removeItem('user'); // Reset jika corrupt
    }

    const username = userData?.username || 'Adventurer';

    useEffect(() => {
        const hasBeenWelcomed = sessionStorage.getItem('hasBeenWelcomed');
        if (!hasBeenWelcomed) {
            setShowWelcome(true);
            sessionStorage.setItem('hasBeenWelcomed', 'true');
        }
        fetchChatHistory();
    }, []);

    useEffect(() => {
        if (activeTab === 'chat') {
            fetchChatHistory();
        }
    }, [activeTab]);

    // --- WEBSOCKET CONNECTION (FIXED) ---
    useEffect(() => {
        // [FIX] Ambil URL dari Environment Variable
        const wsUrl = process.env.REACT_APP_WS_URL || 'http://localhost:8080/ws';

        console.log("Connecting to WebSocket:", wsUrl);

        const socket = new SockJS(wsUrl);
        const stompClient = Stomp.Stomp.over(socket);

        if (process.env.NODE_ENV === 'production') {
            stompClient.debug = () => {};
        }

        stompClient.connect({}, (frame: any) => {
            console.log('Connected to Realm Socket');
            stompClientRef.current = stompClient;

            // Subscribe Chat
            stompClient.subscribe('/topic/public', (payload: any) => {
                const newMessage = JSON.parse(payload.body);
                setMessages((prev) => {
                    const isDuplicate = prev?.some(m =>
                        (m.timestamp === newMessage.timestamp && m.senderId === newMessage.senderId)
                    );
                    return isDuplicate ? prev : [...(prev || []), newMessage];
                });
            });

            // Subscribe Notifications
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
    }, [userData?.id]);

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
        if (!input.trim()) return;

        // --- [FIX] userData?.id sekarang aman karena tipe 'any' ---
        const chatPayload = {
            content: input,
            senderId: userData?.id,
            senderName: username,
            senderRole: userData?.role || 'USER',
            type: 'CHAT',
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        try {
            const response = await api.post('/chat/send', chatPayload);
            setMessages((prev) => [...(prev || []), response.data]);
            setInput('');
        } catch (error) {
            console.error("Failed to send message:", error);
        }
    };

    useEffect(() => {
        if (activeTab === 'chat' && scrollRef.current) {
            scrollRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages, activeTab]);

    const renderContent = () => {
        switch (activeTab) {
            case 'chat':
                return (
                    <div className="flex flex-col h-[calc(100vh-12rem)] md:h-[calc(100vh-10rem)] bg-black/20 rounded-3xl border border-amber-900/20 backdrop-blur-sm overflow-hidden shadow-2xl">
                        <ChatHeader title="General Tavern" subtitle="Realm Connection Established" type="CHANNEL" onlineCount={128} />
                        <div className="flex-1 overflow-y-auto p-4 lg:p-6 space-y-6 custom-scrollbar relative z-10">
                            {(!messages || messages.length === 0) ? (
                                <div className="text-center text-amber-500/30 mt-20 italic">The Tavern is quiet...</div>
                            ) : (
                                <ChatArea messages={messages} />
                            )}
                            <div ref={scrollRef} />
                        </div>
                        <footer className="w-full py-4 px-4 bg-black/20 backdrop-blur-xl border-t border-amber-900/10 relative z-20 flex justify-center items-center shadow-[0_-5px_20px_rgba(0,0,0,0.1)]">
                            <ChatInput input={input} setInput={setInput} onSend={handleSend} />
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
            notifications={notifications}
        >
            {showWelcome && <WelcomeToast username={username} onClose={() => setShowWelcome(false)} />}
            {renderContent()}
        </DashboardLayout>
    );
};

export default Dashboard;