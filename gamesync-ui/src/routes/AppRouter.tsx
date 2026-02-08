import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';
import Dashboard from '../pages/dashboard/Dashboard';

/**
 * AppRouter: Pusat kendali navigasi aplikasi.
 * Mengatur rute publik (Login/Register) dan rute terproteksi (Dashboard).
 */
const AppRouter = () => {
    // Mengecek status login secara langsung dari localStorage
    // Kita pastikan nilainya adalah string 'true' sesuai yang di-set di Login.tsx
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

    return (
        <BrowserRouter>
            <Routes>
                {/* --- RUTE PUBLIK --- */}
                {/* Jika sudah login, akses ke /login atau /register akan dilempar ke dashboard */}
                <Route
                    path="/login"
                    element={!isLoggedIn ? <Login /> : <Navigate to="/dashboard" replace />}
                />

                <Route
                    path="/register"
                    element={!isLoggedIn ? <Register /> : <Navigate to="/dashboard" replace />}
                />

                {/* --- RUTE TERPROTEKSI --- */}
                {/* Halaman Dashboard hanya bisa diakses jika isLoggedIn bernilai true */}
                <Route
                    path="/dashboard"
                    element={
                        isLoggedIn ? (
                            <Dashboard onLogout={() => {
                                // Menghapus seluruh data sesi saat logout
                                localStorage.clear();
                                // Mengarahkan kembali ke login dan merefresh state aplikasi
                                window.location.href = '/login';
                            }} />
                        ) : (
                            // Jika belum login tapi mencoba akses dashboard, tendang ke login
                            <Navigate to="/login" replace />
                        )
                    }
                />

                {/* --- PENGATURAN RUTE DEFAULT --- */}
                {/* Mengarahkan root URL (/) berdasarkan status login */}
                <Route
                    path="/"
                    element={<Navigate to={isLoggedIn ? "/dashboard" : "/login"} replace />}
                />

                {/* Menangani URL yang tidak dikenal (404 Redirect) */}
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </BrowserRouter>
    );
};

export default AppRouter;