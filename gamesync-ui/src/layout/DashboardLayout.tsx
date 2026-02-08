import React, { useState } from 'react';
import { Menu, X, LogOut } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import ChatHeader from '../components/ChatHeader';

interface DashboardLayoutProps {
    children: React.ReactNode;
    activeTab: 'chat' | 'schedule' | 'squads';
    setActiveTab: (tab: 'chat' | 'schedule' | 'squads') => void;
    onLogout: () => void;
    headerTitle: string;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({
                                                             children,
                                                             activeTab,
                                                             setActiveTab,
                                                             onLogout,
                                                             headerTitle
                                                         }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <div className="flex h-[100dvh] bg-slate-950 text-slate-100 font-sans overflow-hidden">
            {/* SIDEBAR */}
            <aside className={`
        fixed inset-y-0 left-0 z-[100] w-72 bg-slate-900 border-r border-slate-800
        transform transition-transform duration-300 ease-in-out
        lg:relative lg:translate-x-0 
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
                <div className="flex flex-col h-full">
                    <div className="lg:hidden flex justify-end p-4">
                        <button onClick={() => setIsSidebarOpen(false)} className="p-2 text-slate-400">
                            <X size={28} />
                        </button>
                    </div>
                    <div className="flex-1 overflow-y-auto">
                        <Sidebar activeTab={activeTab as any} setActiveTab={(tab) => {
                            setActiveTab(tab as any);
                            setIsSidebarOpen(false);
                        }} />
                    </div>
                    <div className="p-4 border-t border-slate-800 bg-slate-900/50">
                        <button onClick={onLogout} className="flex items-center justify-center gap-3 w-full p-3.5 rounded-xl bg-red-500/10 text-red-500 border border-red-500/20 hover:bg-red-500/20 transition-all font-bold text-xs tracking-widest">
                            <LogOut size={18} /> LOGOUT
                        </button>
                    </div>
                </div>
            </aside>

            {/* MAIN CONTENT */}
            <div className="flex-1 flex flex-col min-w-0 relative">
                <header className="h-16 border-b border-slate-800 flex items-center px-4 lg:px-8 bg-slate-900/50 backdrop-blur-md z-10">
                    <button onClick={() => setIsSidebarOpen(true)} className="lg:hidden p-2 mr-3 text-indigo-400 hover:bg-indigo-500/10 rounded-xl transition-all">
                        <Menu size={28} />
                    </button>
                    <div className="flex-1">
                        <ChatHeader username={headerTitle} status="Online" />
                    </div>
                </header>

                <main className="flex-1 overflow-y-auto">
                    {children}
                </main>
            </div>

            {/* OVERLAY MOBILE */}
            {isSidebarOpen && (
                <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[90] lg:hidden" onClick={() => setIsSidebarOpen(false)} />
            )}
        </div>
    );
};

export default DashboardLayout;