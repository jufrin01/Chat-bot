import React from 'react';
import {
    Sword,
    Github,
    Linkedin,
    Twitter,
    Server,
    ShieldCheck,
    Activity,
    Globe
} from 'lucide-react';

const Footer: React.FC = () => {
    return (
        // [1] mt-32: Memberikan jarak jauh dari konten atas (Cards) agar tidak mepet
        <footer className="relative w-full mt-32 border-t border-white/5 bg-black/80 backdrop-blur-xl font-sans z-20">

            {/* Dekorasi Garis Gradient di Top Border */}
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-amber-500/50 to-transparent"></div>

            <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-16 pb-8">

                {/* --- MAIN GRID CONTENT --- */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">

                    {/* Column 1: Brand Identity */}
                    <div className="flex flex-col items-center md:items-start space-y-6">
                        <div className="flex items-center gap-3">
                            <div className="p-2 rounded-lg bg-amber-500/10 border border-amber-500/20">
                                <Sword className="text-amber-500" size={24} />
                            </div>
                            <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-amber-500 tracking-wider font-rpg uppercase">
                GameSync
              </span>
                        </div>
                        <p className="text-slate-400 text-sm leading-relaxed text-center md:text-left max-w-xs">
                            Platform komando guild modern. Ditempa dengan kode Spring Boot yang kokoh untuk stabilitas tingkat tinggi.
                        </p>

                        {/* Server Status Widget (Backend Dev Flex) */}
                        <div className="flex items-center gap-3 px-4 py-2 rounded-full bg-slate-900/80 border border-slate-800">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
                            <span className="text-[10px] font-mono text-emerald-400 tracking-wider">
                SYSTEM OPERATIONAL
              </span>
                        </div>
                    </div>

                    {/* Column 2: Quick Links */}
                    <div className="flex flex-col items-center md:items-start space-y-6">
                        <h4 className="text-white font-bold uppercase text-xs tracking-[0.2em]">
                            Platform
                        </h4>
                        <ul className="space-y-3 text-sm text-slate-400 text-center md:text-left">
                            <li>
                                <a href="#" className="hover:text-amber-400 transition-colors flex items-center gap-2 justify-center md:justify-start group">
                                    <span className="w-0 group-hover:w-2 h-[1px] bg-amber-400 transition-all duration-300"></span>
                                    Features
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-amber-400 transition-colors flex items-center gap-2 justify-center md:justify-start group">
                                    <span className="w-0 group-hover:w-2 h-[1px] bg-amber-400 transition-all duration-300"></span>
                                    Squad Management
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-amber-400 transition-colors flex items-center gap-2 justify-center md:justify-start group">
                                    <span className="w-0 group-hover:w-2 h-[1px] bg-amber-400 transition-all duration-300"></span>
                                    Download App
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Column 3: Developers */}
                    <div className="flex flex-col items-center md:items-start space-y-6">
                        <h4 className="text-white font-bold uppercase text-xs tracking-[0.2em]">
                            Developers
                        </h4>
                        <ul className="space-y-3 text-sm text-slate-400 text-center md:text-left">
                            <li><a href="#" className="hover:text-amber-400 transition-colors">API Documentation</a></li>
                            <li><a href="#" className="hover:text-amber-400 transition-colors">Spring Boot Guide</a></li>
                            <li><a href="#" className="hover:text-amber-400 transition-colors">Status Page</a></li>
                            <li><a href="#" className="hover:text-amber-400 transition-colors">Open Source</a></li>
                        </ul>
                    </div>

                    {/* Column 4: Contact / Stats */}
                    <div className="flex flex-col items-center md:items-start space-y-6">
                        <h4 className="text-white font-bold uppercase text-xs tracking-[0.2em]">
                            Real-time Stats
                        </h4>
                        <div className="grid grid-cols-2 gap-4 w-full max-w-[200px]">
                            <div className="p-3 rounded-xl bg-slate-900/50 border border-slate-800 text-center">
                                <div className="text-amber-500 font-bold text-xl">24ms</div>
                                <div className="text-[10px] text-slate-500 uppercase">Latency</div>
                            </div>
                            <div className="p-3 rounded-xl bg-slate-900/50 border border-slate-800 text-center">
                                <div className="text-emerald-500 font-bold text-xl">99%</div>
                                <div className="text-[10px] text-slate-500 uppercase">Uptime</div>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <a href="#" className="text-slate-500 hover:text-white transition-colors"><Github size={20} /></a>
                            <a href="#" className="text-slate-500 hover:text-blue-400 transition-colors"><Twitter size={20} /></a>
                            <a href="#" className="text-slate-500 hover:text-blue-600 transition-colors"><Linkedin size={20} /></a>
                        </div>
                    </div>

                </div>

                {/* --- BOTTOM BAR --- */}
                <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-xs text-slate-500 text-center md:text-left">
                        &copy; 2026 GameSync Inc. Engineered by <span className="text-amber-500 font-bold">Jufrin</span>.
                    </p>

                    <div className="flex items-center gap-6 text-xs text-slate-500">
                        <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                        <div className="flex items-center gap-2">
                            <Globe size={12} />
                            <span>Indonesia (ID)</span>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;