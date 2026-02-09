import axios, { InternalAxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';

// 1. Ambil Base URL dari Environment Variable (.env)
// Jika tidak ada di .env, otomatis pakai localhost:8080
const baseURL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8080/api';

// 2. Buat Instance Axios
const api = axios.create({
    baseURL: baseURL,
    headers: {
        'Content-Type': 'application/json',
    },
    // Timeout request (opsional, misal 10 detik)
    timeout: 10000,
});

// 3. Request Interceptor
// Fungsi: Mengecek apakah ada token di localStorage sebelum request dikirim ke backend
api.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        // Ambil token yang disimpan saat Login
        const token = localStorage.getItem('token');

        if (token && config.headers) {
            // Tempelkan token di Header Authorization
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error: AxiosError) => {
        return Promise.reject(error);
    }
);

// 4. Response Interceptor (Opsional tapi Recommended)
// Fungsi: Menangani error global, misal jika Token Expired (401)
api.interceptors.response.use(
    (response: AxiosResponse) => {
        return response;
    },
    (error: AxiosError) => {
        // Jika backend membalas 401 (Unauthorized), artinya token hangus/salah
        if (error.response && error.response.status === 401) {
            console.error("Session Expired or Unauthorized. Please Login.");

            // Opsional: Hapus token dan paksa logout
            // localStorage.removeItem('token');
            // localStorage.removeItem('user');
            // window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export default api;