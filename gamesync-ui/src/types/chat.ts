export type MessageRole = 'ai' | 'user';

// Sesuai dengan Enum Role yang ada di database/backend kamu
export type SenderRole = 'ADMIN' | 'LEADER' | 'USER' | 'BOT';

export interface Message {
    // Properti Dasar
    role: MessageRole;

    // SINKRONISASI BACKEND:
    // Mendukung 'text' (frontend lama) atau 'content' (nama field umum di DB/Entity Java)
    text?: string;
    content?: string;

    // Identitas Pengirim
    senderId?: number;     // Penting untuk membedakan bubble chat kanan/kiri
    senderName?: string;
    senderRole?: SenderRole;
    avatarUrl?: string | null;

    // Metadata
    timestamp?: string;
    guildId?: number | null; // Untuk filter chat berdasarkan guild/squad
}