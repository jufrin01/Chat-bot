import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import LandingPage from '../pages/LandingPage';
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';
import Dashboard from '../pages/dashboard/Dashboard';

const AppRouter: React.FC = () => {
    // MODIFIKASI: Cek keberadaan 'token' bukan lagi 'isLoggedIn'
    // Karena di Login.tsx kita simpan: localStorage.setItem('token', token);
    const isAuthenticated = !!localStorage.getItem('token');

    return (
        <BrowserRouter>
            <Routes>
                {/* --- PUBLIC ROUTES --- */}

                {/* Halaman Utama */}
                <Route path="/" element={<LandingPage />} />

                {/* Halaman Login - Jika sudah login (punya token), lempar ke Dashboard */}
                <Route
                    path="/login"
                    element={!isAuthenticated ? <Login /> : <Navigate to="/dashboard" replace />}
                />

                {/* Halaman Register - Jika sudah login, lempar ke Dashboard */}
                <Route
                    path="/register"
                    element={!isAuthenticated ? <Register /> : <Navigate to="/dashboard" replace />}
                />

                {/* --- PROTECTED ROUTES (BUTUH AKSES) --- */}

                {/* Dashboard - Hanya bisa diakses jika isAuthenticated = true */}
                <Route
                    path="/dashboard"
                    element={
                        isAuthenticated ? (
                            <Dashboard onLogout={() => {
                                // Hapus semua sesi saat logout
                                localStorage.removeItem('token');
                                localStorage.removeItem('user');
                                // Refresh halaman agar state router ter-reset bersih
                                window.location.href = '/';
                            }} />
                        ) : (
                            // Jika tidak ada token, tendang kembali ke halaman Login
                            <Navigate to="/login" replace />
                        )
                    }
                />

                {/* --- FALLBACK ROUTE --- */}
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </BrowserRouter>
    );
};

export default AppRouter;