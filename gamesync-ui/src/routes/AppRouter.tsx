import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import LandingPage from '../pages/LandingPage';
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';
import Dashboard from '../pages/dashboard/Dashboard';
// HAPUS: import Tavern from '../pages/Tavern'; -> Tidak perlu lagi karena sudah ada di dalam Dashboard

const AppRouter: React.FC = () => {
    // Cek token di localStorage
    const isAuthenticated = !!localStorage.getItem('token');

    return (
        <BrowserRouter>
            <Routes>
                {/* --- PUBLIC ROUTES --- */}
                <Route path="/" element={<LandingPage />} />

                <Route
                    path="/login"
                    element={!isAuthenticated ? <Login /> : <Navigate to="/dashboard" replace />}
                />

                <Route
                    path="/register"
                    element={!isAuthenticated ? <Register /> : <Navigate to="/dashboard" replace />}
                />

                {/* --- PROTECTED ROUTES --- */}

                {/* Dashboard (Chat sudah ada di dalamnya sekarang) */}
                <Route
                    path="/dashboard"
                    element={
                        isAuthenticated ? (
                            <Dashboard onLogout={() => {
                                localStorage.removeItem('token');
                                localStorage.removeItem('user');
                                window.location.href = '/';
                            }} />
                        ) : (
                            <Navigate to="/login" replace />
                        )
                    }
                />

                {/* HAPUS: Route /tavern juga dibuang agar user fokus di Dashboard saja */}

                {/* Fallback jika route tidak ditemukan */}
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </BrowserRouter>
    );
};

export default AppRouter;