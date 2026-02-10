import React, { useState, useEffect } from 'react';
import RPGBackground from '../components/ui/RPGBackground';
import Sidebar from './Sidebar';
import TopNavigation from './TopNavigation';


export interface NotificationItem {
    title: string;
    message: string;
    type: 'QUEST' | 'SYSTEM' | 'GUILD' | string;
    timestamp: string;
}

interface DashboardLayoutProps {
    children: React.ReactNode;
    activeTab: 'chat' | 'schedule' | 'squads' | 'chronicles' | 'settings'; // Bisa disederhanakan jadi string
    setActiveTab: (tab: string) => void;
    onLogout: () => void;
    headerTitle: string;
    notifications: NotificationItem[];
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({
                                                             children,
                                                             activeTab,
                                                             setActiveTab,
                                                             onLogout,
                                                             headerTitle,
                                                             notifications
                                                         }) => {
    // --- STATE UTAMA LAYOUT ---
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const [isDesktopOpen, setIsDesktopOpen] = useState(true);

    const toggleSidebar = () => {
        if (window.innerWidth < 1024) setIsMobileOpen(!isMobileOpen);
        else setIsDesktopOpen(!isDesktopOpen);
    };

    useEffect(() => {
        console.log("=== HUD SYSTEM ONLINE ===");
    }, []);

    return (
        <div className="flex h-screen w-full overflow-hidden relative font-sans text-amber-50 selection:bg-amber-500/30">
            {/* Background Layer */}
            <div className="absolute inset-0 z-0">
                <RPGBackground />
            </div>

            {/* --- COMPONENT 1: SIDEBAR --- */}
            <Sidebar
                isMobileOpen={isMobileOpen}
                setIsMobileOpen={setIsMobileOpen}
                isDesktopOpen={isDesktopOpen}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                onLogout={onLogout}
            />

            {/* --- MAIN CONTENT WRAPPER --- */}
            <main className="flex-1 flex flex-col relative z-10 h-full w-full min-w-0">

                {/* --- COMPONENT 2: TOP NAVIGATION --- */}
                <TopNavigation
                    toggleSidebar={toggleSidebar}
                    isDesktopOpen={isDesktopOpen}
                    headerTitle={headerTitle}
                    notifications={notifications}
                />

                {/* --- COMPONENT 3: CHILDREN (PAGE CONTENT) --- */}
                <div className="flex-1 overflow-y-auto p-4 lg:p-6 custom-scrollbar relative z-10 w-full">
                    {children}
                </div>
            </main>
        </div>
    );
};

export default DashboardLayout;