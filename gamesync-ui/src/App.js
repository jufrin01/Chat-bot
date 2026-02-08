import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import ChatHeader from './components/ChatHeader';
import ChatArea from './components/ChatArea';
import ChatInput from './components/ChatInput';

function App() {
  // State untuk menyimpan daftar pesan antara Jufrin dan AI
  const [messages, setMessages] = useState([
    { role: 'ai', text: 'Halo Jufrin! Siap mabar hari ini? Mau dijadwalkan game apa?' }
  ]);

  // State untuk menangani input teks di chat bar
  const [input, setInput] = useState('');

  // Fungsi untuk mengirim pesan
  const handleSend = () => {
    if (!input.trim()) return;

    // 1. Tambahkan pesan user ke daftar chat secara lokal
    setMessages(prev => [...prev, { role: 'user', text: input }]);

    // 2. Kosongkan input bar
    setInput('');

    // Rencana selanjutnya: Di sini kamu akan memanggil axios.post ke Spring Boot
    // untuk menyimpan pesan ke PostgreSQL dan mendapatkan respon dari Gemini.
  };

  return (
      <div className="flex h-screen bg-slate-950 text-slate-100 font-sans">
        {/* Komponen Navigasi Samping */}
        <Sidebar />

        <div className="flex-1 flex flex-col">
          {/* Komponen Header Atas */}
          <ChatHeader />

          {/* Komponen Area Percakapan (Scrollable) */}
          <ChatArea messages={messages} />

          {/* Komponen Input Chat */}
          <ChatInput
              input={input}
              setInput={setInput}
              onSend={handleSend}
          />
        </div>
      </div>
  );
}

export default App;