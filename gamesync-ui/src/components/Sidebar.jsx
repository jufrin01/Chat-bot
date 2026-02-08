import { Gamepad2, Bot, Calendar, Users } from 'lucide-react';

const Sidebar = () => (
    <div className="w-64 bg-slate-900 border-r border-slate-800 p-4 flex flex-col">
        <div className="flex items-center gap-2 mb-8 px-2">
            <Gamepad2 className="text-indigo-500" size={32} />
            <h1 className="text-xl font-bold tracking-wider">GAMESYNC</h1>
        </div>
        <nav className="space-y-2 flex-1">
            <button className="flex items-center gap-3 w-full p-3 rounded-lg bg-indigo-600 text-white">
                <Bot size={20} /> <span>AI Planner</span>
            </button>
            <button className="flex items-center gap-3 w-full p-3 rounded-lg hover:bg-slate-800 text-slate-400">
                <Calendar size={20} /> <span>Schedule</span>
            </button>
            <button className="flex items-center gap-3 w-full p-3 rounded-lg hover:bg-slate-800 text-slate-400">
                <Users size={20} /> <span>Squads</span>
            </button>
        </nav>
        <div className="p-4 border-t border-slate-800 text-xs text-slate-500">
            Backend: Spring Boot Active
        </div>
    </div>
);

export default Sidebar;