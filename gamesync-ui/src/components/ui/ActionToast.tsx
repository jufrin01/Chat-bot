import React, { useEffect } from 'react';
import { CheckCircle, XCircle, X } from 'lucide-react';

interface ActionToastProps {
    message: string;
    type: 'success' | 'error';
    onClose: () => void;
}

const ActionToast: React.FC<ActionToastProps> = ({ message, type, onClose }) => {
    // Auto-close dalam 3 detik
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, 3000);
        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <div className="fixed top-24 right-4 z-[100] animate-in slide-in-from-right duration-300">
            <div className={`
                flex items-center gap-3 px-4 py-3 rounded-xl border shadow-2xl backdrop-blur-xl min-w-[300px]
                ${type === 'success'
                ? 'bg-emerald-950/80 border-emerald-500/50 text-emerald-100'
                : 'bg-red-950/80 border-red-500/50 text-red-100'}
            `}>
                <div className={`p-2 rounded-full ${type === 'success' ? 'bg-emerald-500/20' : 'bg-red-500/20'}`}>
                    {type === 'success' ? <CheckCircle size={20} /> : <XCircle size={20} />}
                </div>

                <div className="flex-1">
                    <h4 className="font-bold text-sm uppercase tracking-wider">
                        {type === 'success' ? 'Success' : 'Failed'}
                    </h4>
                    <p className="text-xs opacity-80">{message}</p>
                </div>

                <button onClick={onClose} className="p-1 hover:bg-white/10 rounded-lg transition-colors">
                    <X size={16} />
                </button>
            </div>
        </div>
    );
};

export default ActionToast;