import React from 'react';

import AppRouter from './routes/AppRouter';

const App: React.FC = () => {
    return (
        <div className="min-h-screen bg-slate-950">
            <AppRouter />
        </div>
    );
};

export default App;
