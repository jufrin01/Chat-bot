import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // Hapus @/ gantikan dengan ./
import App from './App'; // Hapus @/ gantikan dengan ./

const rootElement = document.getElementById('root') as HTMLElement;

if (!rootElement) {
    throw new Error("Gagal menemukan elemen root.");
}

const root = ReactDOM.createRoot(rootElement);

root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);