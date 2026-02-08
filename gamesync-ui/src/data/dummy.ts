import { Message } from '../types/chat';


export type UserRole = 'ADMIN' | 'LEADER' | 'ANGGOTA' | 'USER';

export interface AppUser {
    id: string;
    username: string;
    role: UserRole;
    squadId?: string; // ID Squad tempat dia bergabung
}

// User saat ini (kamu)
export const CURRENT_USER: AppUser = {
    id: 'u-1',
    username: 'JufrinDev',
    role: 'LEADER', // Kamu adalah Leader di Squad Bima-Warrior
    squadId: 's-1'
};

// Data Chat untuk WebSocket (Persiapan)
export interface ChatMessage {
    id: string;
    senderId: string;
    senderName: string;
    senderRole: UserRole;
    text: string;
    timestamp: string;
}

export const DUMMY_USER = {
    username: "JufrinDev",
    status: "Online",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jufrin",
    role: "Backend Developer",
    location: "Jakarta, Indonesia"
};

export const INITIAL_MESSAGES: Message[] = [
    {
        role: 'ai',
        text: 'Halo Jufrin! Siap menyusun jadwal mabar hari ini?',
        senderName: 'GameSync Bot',
        senderRole: 'BOT'
    },
    {
        role: 'user',
        text: 'Cek jadwal mabar World of Warcraft malam ini.',
        senderName: 'JufrinDev',
        senderRole: 'LEADER'
    },
    {
        role: 'ai',
        text: 'Ada jadwal Raid jam 20:00 WIB bersama Squad "Bima-Warrior". Status: Siap tempur!',
        senderName: 'GameSync Bot',
        senderRole: 'BOT'
    }
];

export interface ScheduleItem {
    id: number;
    game: string;
    squad: string;
    time: string;
    date: string;
    status: 'Confirmed' | 'Pending';
}

export const DUMMY_SCHEDULE: ScheduleItem[] = [
    {
        id: 1,
        game: 'World of Warcraft',
        squad: 'Bima-Warrior',
        time: '20:00 WIB',
        date: 'Feb 08, 2026',
        status: 'Confirmed'
    },
    {
        id: 2,
        game: 'Anno 1800',
        squad: 'City Builder Indo',
        time: '14:00 WIB',
        date: 'Feb 09, 2026',
        status: 'Pending'
    },
    {
        id: 3,
        game: 'Lost Ark',
        squad: 'Legion Raiders',
        time: '21:00 WIB',
        date: 'Feb 10, 2026',
        status: 'Confirmed'
    }
];

export interface SquadMember {
    id: number;
    name: string;
    role: string;
    status: 'Online' | 'Offline';
}

export interface Squad {
    id: number;
    name: string;
    game: string;
    members: SquadMember[];
}

export const DUMMY_SQUADS: Squad[] = [
    {
        id: 1,
        name: "Bima-Warrior",
        game: "World of Warcraft",
        members: [
            { id: 1, name: "JufrinDev", role: "Leader", status: "Online" },
            { id: 2, name: "RaidMaster", role: "Healer", status: "Online" },
            { id: 3, name: "TankerBima", role: "Tank", status: "Offline" }
        ]
    },
    {
        id: 2,
        name: "City Builder Indo",
        game: "Anno 1800",
        members: [
            { id: 1, name: "JufrinDev", role: "Mayor", status: "Online" },
            { id: 2, name: "Architect99", role: "Planner", status: "Offline" }
        ]
    }
];