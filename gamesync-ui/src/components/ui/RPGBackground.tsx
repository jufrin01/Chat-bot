import React from 'react';
import './RPGBackground.css'; // Import CSS tadi

const RPGBackground: React.FC = () => {
    return (
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden bg-[#05030a]">

            {/* 1. Background Gradient (Deep Void) */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#2e1065_0%,#000000_100%)] opacity-60"></div>

            {/* 2. Mystical Fog */}
            <div className="absolute -bottom-1/2 -left-1/4 w-[150%] h-[100%] bg-purple-900/20 blur-[100px] rounded-full animate-fog-flow"></div>
            <div className="absolute -top-1/2 -right-1/4 w-[150%] h-[100%] bg-indigo-900/10 blur-[100px] rounded-full animate-fog-flow-reverse"></div>

            {/* 3. Ancient Magic Circle (SVG) */}
            <svg className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] opacity-20 animate-spin-slow mix-blend-screen" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="48" fill="none" stroke="#fbbf24" strokeWidth="0.2" strokeDasharray="4 2" />
                <path d="M50 2 L55 15 L50 20 L45 15 Z" fill="none" stroke="#fbbf24" strokeWidth="0.2" />
                <polygon points="50,10 85,75 15,75" fill="none" stroke="#c084fc" strokeWidth="0.2" opacity="0.5" />
                <polygon points="50,90 85,25 15,25" fill="none" stroke="#c084fc" strokeWidth="0.2" opacity="0.5" />
                <circle cx="50" cy="50" r="20" fill="none" stroke="#fbbf24" strokeWidth="0.3" />
            </svg>

            {/* 4. Rising Embers */}
            <div className="absolute inset-0">
                {[...Array(30)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute bg-amber-400 rounded-full blur-[1px] animate-ember-rise"
                        style={{
                            width: Math.random() * 3 + 1 + 'px',
                            height: Math.random() * 3 + 1 + 'px',
                            top: '110%',
                            left: Math.random() * 100 + '%',
                            opacity: Math.random() * 0.7,
                            animationDuration: Math.random() * 5 + 4 + 's',
                            animationDelay: Math.random() * 5 + 's'
                        }}
                    />
                ))}
            </div>
        </div>
    );
};

export default RPGBackground;