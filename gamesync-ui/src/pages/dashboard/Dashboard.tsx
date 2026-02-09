import React, { useState, useEffect, useRef } from 'react';
import SockJS from 'sockjs-client';
// Menggunakan import * as untuk mengakses objek Stomp di dalam file lib
import * as Stomp from 'stompjs/lib/stomp.js';

import DashboardLayout from '../../layout/DashboardLayout';
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
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState<string>('');
    const [showWelcome, setShowWelcome] = useState(false);

    const stompClientRef = useRef<any>(null);
    const scrollRef = useRef<HTMLDivElement>(null);

    const userString = localStorage.getItem('user');
    const userData = userString ? JSON.parse(userString) : null;
    const username = userData?.username || 'Adventurer';

    // --- EFFECT 1: INITIAL LOAD (History & Welcome Logic) ---
    useEffect(() => {
        console.log("=== DASHBOARD INITIALIZED ===");

        // Cek sessionStorage agar Toast hanya muncul 1 kali per sesi
        const hasBeenWelcomed = sessionStorage.getItem('hasBeenWelcomed');
        if (!hasBeenWelcomed) {
            setShowWelcome(true);
            sessionStorage.setItem('hasBeenWelcomed', 'true');
        }

        // Ambil history chat saat pertama kali masuk
        fetchChatHistory();
    }, []); // Dependency array kosong agar hanya jalan sekali saat mount

    // --- EFFECT 2: FETCH HISTORY ON TAB CHANGE ---
    useEffect(() => {
        if (activeTab === 'chat') {
            fetchChatHistory();
        }
    }, [activeTab]);

    // --- EFFECT 3: WEBSOCKET CONNECTION ---
    useEffect(() => {
        const socket = new SockJS('http://localhost:8080/ws');
        const stompClient = Stomp.Stomp.over(socket);

        stompClient.debug = () => {}; // Mematikan log debug agar console bersih

        stompClient.connect({}, (frame: any) => {
            console.log('Connected to Realm Socket: ' + frame);
            stompClientRef.current = stompClient;

            stompClient.subscribe('/topic/public', (payload: any) => {
                const newMessage = JSON.parse(payload.body);

                setMessages((prev) => {
                    // Cek duplikasi agar pesan tidak muncul dua kali
                    const isDuplicate = prev.some(m =>
                        (m.timestamp === newMessage.timestamp && m.senderId === newMessage.senderId) ||
                        (m.content === newMessage.content && m.senderId === newMessage.senderId)
                    );
                    return isDuplicate ? prev : [...prev, newMessage];
                });
            });
        }, (error: any) => {
            console.error("WebSocket connection error:", error);
        });

        return () => {
            if (stompClientRef.current) {
                stompClientRef.current.disconnect();
            }
        };
    }, [userData?.id]);

    const fetchChatHistory = async () => {
        try {
            const response = await api.get('/chat/history');
            setMessages(response.data);
        } catch (error: any) {
            console.error("Failed to fetch history:", error);
        }
    };

    const handleSend = async () => {
        if (!input.trim()) return;

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
            setMessages((prev) => [...prev, response.data]);
            setInput('');
        } catch (error: any) {
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
                        <ChatHeader
                            title="General Tavern"
                            subtitle="Realm Connection Established"
                            type="CHANNEL"
                            onlineCount={128}
                        />

                        <div className="flex-1 overflow-y-auto p-4 lg:p-6 space-y-6 custom-scrollbar relative z-10">
                            {messages.length === 0 ? (
                                <div className="text-center text-amber-500/30 mt-20 italic">
                                    The Tavern is quiet... No messages yet.
                                </div>
                            ) : (
                                <ChatArea messages={messages} />
                            )}
                            <div ref={scrollRef} />
                        </div>

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