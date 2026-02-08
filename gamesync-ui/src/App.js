import React, { useState } from 'react';
import { Send, Calendar, Users, Gamepad2, Bot, User } from 'lucide-react';

const App = () => {
  const [messages, setMessages] = useState([
    { role: 'ai', text: 'Halo Jufrin! Siap mabar hari ini? Mau dijadwalkan game apa?' }
  ]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages([...messages, { role: 'user', text: input }]);
    setInput('');
  };

  return (
      <div className="flex h-screen bg-slate-950 text-slate-100 font-sans">
        {/* SIDEBAR */}
        <div className="w-64 bg-slate-900 border-r border-slate-800 p-4 flex flex-col">
          <div className="flex items-center gap-2 mb-8 px-2">
            <Gamepad2 className="text-indigo-500" size={32} />
            <h1 className="text-xl font-bold tracking-wider">GAMESYNC</h1>
          </div>

          <nav className="space-y-2 flex-1">
            <button className="flex items-center gap-3 w-full p-3 rounded-lg bg-indigo-600 text-white transition">
              <Bot size={20} /> <span>AI Planner</span>
            </button>
            <button className="flex items-center gap-3 w-full p-3 rounded-lg hover:bg-slate-800 text-slate-400 transition">
              <Calendar size={20} /> <span>Schedule</span>
            </button>
            <button className="flex items-center gap-3 w-full p-3 rounded-lg hover:bg-slate-800 text-slate-400 transition">
              <Users size={20} /> <span>Squads</span>
            </button>
          </nav>

          <div className="p-4 border-t border-slate-800 text-xs text-slate-500">
            Backend: Spring Boot Active
          </div>
        </div>

        {/* MAIN CONTENT */}
        <div className="flex-1 flex flex-col">
          <header className="h-16 border-b border-slate-800 flex items-center justify-between px-8 bg-slate-900/50 backdrop-blur-md">
            <h2 className="font-semibold text-lg">AI Assistant</h2>
            <div className="flex items-center gap-3">
              <span className="text-sm text-slate-400">Jufrin</span>
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500"></div>
            </div>
          </header>

          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`flex gap-3 max-w-[80%] ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                    <div className={`w-8 h-8 rounded flex items-center justify-center shrink-0 ${msg.role === 'ai' ? 'bg-indigo-900 text-indigo-300' : 'bg-slate-700 text-slate-300'}`}>
                      {msg.role === 'ai' ? <Bot size={18} /> : <User size={18} />}
                    </div>
                    <div className={`p-4 rounded-2xl ${msg.role === 'ai' ? 'bg-slate-800 text-slate-200 rounded-tl-none' : 'bg-indigo-600 text-white rounded-tr-none'}`}>
                      <p className="text-sm leading-relaxed">{msg.text}</p>
                    </div>
                  </div>
                </div>
            ))}
          </div>

          <div className="p-6 bg-slate-900/80">
            <div className="max-w-4xl mx-auto relative">
              <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Tanya AI untuk jadwal mabar..."
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl py-4 pl-6 pr-14 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
              />
              <button onClick={handleSend} className="absolute right-3 top-1/2 -translate-y-1/2 bg-indigo-500 p-2 rounded-lg">
                <Send size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
  );
};

export default App;
