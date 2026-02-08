const ChatHeader = () => (
    <header className="h-16 border-b border-slate-800 flex items-center justify-between px-8 bg-slate-900/50 backdrop-blur-md">
        <h2 className="font-semibold text-lg">AI Assistant</h2>
        <div className="flex items-center gap-3">
            <span className="text-sm text-slate-400">Jufrin</span>
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500"></div>
        </div>
    </header>
);

export default ChatHeader;