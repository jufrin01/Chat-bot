import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import LandingPage from '../pages/LandingPage'; // Halaman Awal Baru (3D)
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';
import Dashboard from '../pages/dashboard/Dashboard';

const AppRouter: React.FC = () => {
    // Cek status login dari LocalStorage
    // Pastikan logic ini sinkron dengan yang ada di Login.tsx
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

    return (
        <BrowserRouter>
            <Routes>
                {/* --- PUBLIC ROUTES --- */}

                {/* Halaman Utama (Landing Page) - Bisa diakses siapa saja */}
                <Route path="/" element={<LandingPage />} />

                {/* Halaman Login - Jika sudah login, lempar ke Dashboard */}
                <Route
                    path="/login"
                    element={!isLoggedIn ? <Login /> : <Navigate to="/dashboard" replace />}
                />

                {/* Halaman Register - Jika sudah login, lempar ke Dashboard */}
                <Route
                    path="/register"
                    element={!isLoggedIn ? <Register /> : <Navigate to="/dashboard" replace />}
                />

                {/* --- PROTECTED ROUTES (BUTUH AKSES) --- */}

                {/* Dashboard - Hanya bisa diakses jika isLoggedIn = true */}
                <Route
                    path="/dashboard"
                    element={
                        isLoggedIn ? (
                            <Dashboard onLogout={() => {
                                // Hapus sesi saat logout
                                localStorage.clear();
                                // Refresh halaman agar state router ter-reset bersih
                                window.location.href = '/';
                            }} />
                        ) : (
                            // Jika belum login, tendang kembali ke halaman Login
                            <Navigate to="/login" replace />
                        )
                    }
                />

                {/* --- FALLBACK ROUTE --- */}
                {/* Jika user mengetik URL ngawur, kembalikan ke Landing Page */}
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </BrowserRouter>
    );
};

export default AppRouter;