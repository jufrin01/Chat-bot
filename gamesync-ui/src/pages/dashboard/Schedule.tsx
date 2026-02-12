import React, { useState, useEffect } from 'react';
import { Map, Plus, Scroll } from 'lucide-react';
import api from '../../api/axios';
import QuestItem from '../../components/QuestItem';
import QuestFormModal from '../../components/QuestFormModal';
import ActionToast from '../../components/ui/ActionToast';
import ConfirmationModal from '../../components/ui/ConfirmationModal';

interface Quest {
    id: number;
    game: string;
    squad: string;
    time: string;
    date: string;
    status: string;
}

const Schedule: React.FC = () => {
    // --- STATE UTAMA ---
    const [quests, setQuests] = useState<Quest[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isFormOpen, setIsFormOpen] = useState(false);

    // --- STATE UI (Toast & Modal) ---
    const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
    const [deleteId, setDeleteId] = useState<number | null>(null); // Menyimpan ID yang mau dihapus

    const userString = localStorage.getItem('user');
    const userData = userString ? JSON.parse(userString) : null;
    const isAdminOrLeader = userData?.role === 'ADMIN' || userData?.role === 'LEADER';

    useEffect(() => {
        fetchQuests();
    }, []);

    const fetchQuests = async () => {
        try {
            setIsLoading(true);
            const response = await api.get('/quests');

            setQuests(Array.isArray(response.data) ? response.data : []);
        } catch (error) {
            console.error("Failed to fetch quests:", error);
            setQuests([]);
        } finally {
            setIsLoading(false);
        }
    };

    // --- LOGIKA DELETE (DENGAN MODAL) ---
    const handleDeleteClick = (id: number) => {
        setDeleteId(id); // Buka modal konfirmasi
    };

    const confirmDelete = async () => {
        if (!deleteId) return;
        try {
            await api.delete(`/quests/${deleteId}`);
            setQuests(quests.filter(q => q.id !== deleteId));
            setToast({ message: "Quest has been abandoned successfully.", type: 'success' });
        } catch (error) {
            console.error("Delete failed:", error);
            setToast({ message: "Failed to abandon quest. Try again.", type: 'error' });
        } finally {
            setDeleteId(null);
        }
    };

    // --- LOGIKA CREATE (DENGAN TOAST) ---
    const handleCreate = async (data: any) => {
        try {
            const response = await api.post('/quests', data);
            setQuests([...quests, response.data]);
            setToast({ message: "New quest posted to the board!", type: 'success' });
            setIsFormOpen(false); // Tutup form modal
        } catch (error) {
            console.error("Create failed:", error);
            setToast({ message: "Failed to post quest. Server error.", type: 'error' });
        }
    };

    return (
        <div className="p-4 lg:p-8 max-w-6xl mx-auto font-sans text-amber-50 pb-20 animate-in fade-in duration-500">

            {/* --- ACTION TOAST (Global di halaman ini) --- */}
            {toast && (
                <ActionToast
                    message={toast.message}
                    type={toast.type}
                    onClose={() => setToast(null)}
                />
            )}

            {/* --- CONFIRMATION MODAL --- */}
            <ConfirmationModal
                isOpen={!!deleteId}
                onClose={() => setDeleteId(null)}
                onConfirm={confirmDelete}
                title="Abandon Quest?"
                message="This action cannot be undone. The quest scroll will be burned forever."
            />

            {/* Header Section */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-6">
                <div>
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-amber-900/20 rounded-lg border border-amber-500/30">
                            <Map className="text-amber-500" size={24} />
                        </div>
                        <h1 className="text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-100 to-amber-600 font-rpg tracking-widest uppercase">
                            Quest Board
                        </h1>
                    </div>
                    <p className="text-amber-500/60 text-sm font-bold uppercase tracking-[0.2em] ml-1">
                        Upcoming Raids & Missions
                    </p>
                </div>

                {isAdminOrLeader && (
                    <button
                        onClick={() => setIsFormOpen(true)}
                        className="group relative flex items-center gap-3 bg-gradient-to-r from-amber-700 to-amber-900 hover:from-amber-600 hover:to-amber-800 text-white px-6 py-3 rounded-xl font-bold text-xs tracking-widest uppercase transition-all shadow-lg hover:scale-105 overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-white/20 skew-x-12 -translate-x-full group-hover:animate-shine"></div>
                        <Plus size={16} />
                        <span>Post New Quest</span>
                    </button>
                )}
            </div>

            {/* List Section */}
            {isLoading ? (
                <div className="text-center py-20 text-amber-500 animate-pulse font-bold tracking-widest">
                    READING ANCIENT SCROLLS...
                </div>
            ) : (
                <div className="grid gap-5">
                    {quests.length > 0 ? (
                        quests.map((quest) => (
                            <QuestItem
                                key={quest.id}
                                quest={quest}
                                isAdmin={isAdminOrLeader}
                                onDelete={handleDeleteClick} // Kirim fungsi handler baru
                            />
                        ))
                    ) : (
                        <div className="flex flex-col items-center justify-center py-20 text-center border-2 border-dashed border-amber-900/30 rounded-3xl bg-black/20">
                            <Scroll size={48} className="text-amber-900/50 mb-4" />
                            <h3 className="text-xl font-bold text-amber-500/50 font-rpg uppercase">No Active Quests</h3>
                            <p className="text-amber-900/50 text-xs tracking-widest mt-2">The quest board is empty.</p>
                        </div>
                    )}
                </div>
            )}

            {/* Create Form Modal */}
            <QuestFormModal
                isOpen={isFormOpen}
                onClose={() => setIsFormOpen(false)}
                onSubmit={handleCreate}
            />
        </div>
    );
};

export default Schedule;