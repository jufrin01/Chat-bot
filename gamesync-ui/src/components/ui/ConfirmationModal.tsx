import React from 'react';
import { AlertTriangle, X } from 'lucide-react';

interface ConfirmationModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    message: string;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({ isOpen, onClose, onConfirm, title, message }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-black border border-amber-900/40 w-full max-w-sm rounded-2xl shadow-[0_0_50px_rgba(245,158,11,0.1)] relative overflow-hidden transform transition-all scale-100">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-red-500 to-transparent"></div>

                <div className="p-6 text-center">
                    <div className="w-12 h-12 rounded-full bg-red-900/30 flex items-center justify-center mx-auto mb-4 border border-red-500/30 text-red-500">
                        <AlertTriangle size={24} />
                    </div>

                    <h3 className="text-lg font-bold text-amber-100 font-rpg uppercase tracking-widest mb-2">
                        {title}
                    </h3>
                    <p className="text-amber-500/60 text-xs leading-relaxed mb-6">
                        {message}
                    </p>

                    <div className="flex gap-3">
                        <button
                            onClick={onClose}
                            className="flex-1 py-2.5 rounded-xl border border-amber-900/30 text-amber-500 hover:bg-amber-900/20 text-xs font-bold uppercase tracking-widest transition-all"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={() => { onConfirm(); onClose(); }}
                            className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-red-900 to-red-700 text-white hover:from-red-800 hover:to-red-600 border border-red-500/30 text-xs font-bold uppercase tracking-widest transition-all shadow-[0_0_15px_rgba(220,38,38,0.3)]"
                        >
                            Confirm
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationModal;