

export interface User {
    id?: number;
    username: string;
    email: string;
    role?: string;
}

/**
 * Interface untuk Response Login dari Spring Boot (JWT)
 */
export interface AuthResponse {
    token: string;
    type: string; // Biasanya "Bearer"
    id: number;
    username: string;
    email: string;
    roles: string[];
}

/**
 * Interface untuk Error Response (Jika login/register gagal)
 */
export interface AuthError {
    message: string;
    status: number;
}

/**
 * Type untuk navigasi halaman (Sesuai AppRouter kita)
 */
export type AuthPage = 'login' | 'register' | 'dashboard';