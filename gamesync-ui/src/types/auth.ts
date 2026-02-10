export interface User {
    id?: number;
    username: string;
    email: string;
    role?: string;
    level?: number;   // Tambahkan ini
    guildId?: number; // Tambahkan ini
    avatarUrl?: string;
}

/**
 * Interface untuk Response Login dari Spring Boot (JWT)
 */
export interface AuthResponse {
    token: string;
    type: string;
    id: number;
    username: string;
    email: string;
    role: string;      // Update: Backend kirim String (bukan Array)
    guildId?: number;  // Tambahkan ini
    level?: number;    // Tambahkan ini (KUNCI UTAMA)
}

/**
 * Interface untuk Error Response
 */
export interface AuthError {
    message: string;
    status: number;
}

export type AuthPage = 'login' | 'register' | 'dashboard';