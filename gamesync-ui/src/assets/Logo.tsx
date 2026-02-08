import React from 'react';

interface LogoProps {
    size?: number;
    className?: string;
}

const Logo: React.FC<LogoProps> = ({ size = 40, className = "" }) => {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
        >
            {/* Background Glow Effect */}
            <defs>
                <linearGradient id="logo-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#6366f1" />
                    <stop offset="100%" stopColor="#a855f7" />
                </linearGradient>
            </defs>

            {/* Outer Shield/Container */}
            <rect x="2" y="2" width="20" height="20" rx="6" fill="url(#logo-gradient)" />

            {/* Game Controller Icon Path */}
            <path
                d="M6 11H8M7 10V12M15 11H15.01M17 11H17.01M11 15C11 15 12 16 13 16C14 16 15 15 15 15M7 7C10.5 7 13.5 7 17 7C18.1046 7 19 7.89543 19 9V15C19 16.1046 18.1046 17 17 17H7C5.89543 17 5 16.1046 5 15V9C5 7.89543 5.89543 7 7 7Z"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
};

export default Logo;