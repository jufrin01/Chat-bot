export type MessageRole = 'ai' | 'user';
export type SenderRole = 'ADMIN' | 'LEADER' | 'ANGGOTA' | 'BOT';

export interface Message {
    role: MessageRole;
    text: string;
    senderName?: string;
    senderRole?: SenderRole;
    timestamp?: string;
}