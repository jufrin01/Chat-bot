import React, { useState } from 'react';
import { Camera, User } from 'lucide-react';

interface UserPhotoProps {
    src?: string | null;      // URL Foto (Bisa null jika belum upload)
    alt: string;              // Nama User (untuk Inisial)
    size?: 'sm' | 'md' | 'lg' | 'xl' | 'xxl'; // Ukuran
    role?: 'ADMIN' | 'LEADER' | 'ANGGOTA' | 'BOT'; // Role untuk warna border
    status?: 'online' | 'offline' | 'busy' | 'away'; // Status user
    editable?: boolean;       // Mode Edit (muncul ikon kamera)
    onEditClick?: () => void; // Fungsi ketika tombol edit diklik
    className?: string;       // Custom class tambahan
}

const UserPhoto: React.FC<UserPhotoProps> = ({
                                                 src,
                                                 alt,
                                                 size = 'md',
                                                 role = 'ANGGOTA',
                                                 status,
                                                 editable = false,
                                                 onEditClick,
                                                 className = ''
                                             }) => {
    const [imgError, setImgError] = useState(false);

    // --- 1. CONFIG SIZE ---
    const sizeClasses = {
        sm: 'w-8 h-8 text-[10px]',       // Chat Mobile
        md: 'w-10 h-10 text-xs',         // Chat Desktop / Header
        lg: 'w-14 h-14 text-sm',         // Sidebar Profile
        xl: 'w-24 h-24 text-xl',         // Profile Page
        xxl: 'w-32 h-32 text-3xl',       // Profile Edit Modal
    };

    // --- 2. CONFIG ROLE COLOR (Border & Glow) ---
    const getRoleStyle = () => {
        switch (role) {
            case 'ADMIN': return 'border-red-500/80 shadow-[0_0_10px_rgba(239,68,68,0.4)]';
            case 'LEADER': return 'border-amber-400/80 shadow-[0_0_10px_rgba(245,158,11,0.4)]';
            case 'BOT': return 'border-indigo-400/80 shadow-[0_0_10px_rgba(129,140,248,0.4)]';
            default: return 'border-amber-900/30'; // Anggota biasa
        }
    };

    // --- 3. CONFIG STATUS COLOR ---
    const getStatusColor = () => {
        switch (status) {
            case 'online': return 'bg-emerald-500 shadow-[0_0_5px_#10b981]';
            case 'busy': return 'bg-red-500 shadow-[0_0_5px_#ef4444]';
            case 'away': return 'bg-amber-500 shadow-[0_0_5px_#f59e0b]';
            default: return 'bg-slate-500'; // Offline
        }
    };

    // --- 4. GENERATE INITIALS (Jufrin Dev -> JD) ---
    const getInitials = () => {
        return alt
            .split(' ')
            .map((n) => n[0])
            .slice(0, 2)
            .join('')
            .toUpperCase();
    };

    return (
        <div className={`relative inline-block ${className}`}>

            {/* CONTAINER FOTO */}
            <div
                className={`
          ${sizeClasses[size]} 
          relative rounded-2xl overflow-hidden border-2 
          bg-black/60 flex items-center justify-center 
          transition-all duration-300
          ${getRoleStyle()}
        `}
            >
                {/* LOGIKA RENDER FOTO */}
                {src && !imgError ? (
                    <img
                        src={src}
                        alt={alt}
                        onError={() => setImgError(true)} // Jika link rusak, ganti ke inisial
                        className="w-full h-full object-cover"
                    />
                ) : (
                    // FALLBACK: Tampilkan Inisial dengan Gradient Background
                    <div className={`w-full h-full flex items-center justify-center font-black tracking-wider text-white
            ${role === 'ADMIN' ? 'bg-gradient-to-br from-red-900 to-black' : ''}
            ${role === 'LEADER' ? 'bg-gradient-to-br from-amber-700 to-black' : ''}
            ${role === 'BOT' ? 'bg-gradient-to-br from-indigo-900 to-black' : ''}
            ${role === 'ANGGOTA' ? 'bg-gradient-to-br from-slate-800 to-black' : ''}
          `}>
                        {getInitials()}
                    </div>
                )}

                {/* OVERLAY EDIT (Hanya muncul jika editable=true) */}
                {editable && (
                    <div
                        onClick={onEditClick}
                        className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity cursor-pointer group"
                    >
                        <Camera className="text-white group-hover:scale-110 transition-transform" size={size === 'xxl' ? 32 : 16} />
                    </div>
                )}
            </div>

            {/* STATUS INDICATOR (Dot Pojok Kanan Bawah) */}
            {status && (
                <span className={`
          absolute bottom-0 right-0 block rounded-full ring-2 ring-black 
          ${size === 'sm' ? 'w-2 h-2' : 'w-3 h-3'}
          ${getStatusColor()}
        `} />
            )}
        </div>
    );
};

export default UserPhoto;