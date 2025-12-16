import React from 'react';
import type { ReactNode } from 'react';
import { Settings, HelpCircle, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

interface FactoryLayoutProps {
    children: ReactNode;
    title: string;
    levelInfo?: string;
}

export const FactoryLayout: React.FC<FactoryLayoutProps> = ({ children, title, levelInfo }) => {
    console.log('DEBUG: FactoryLayout rendering');
    return (
        <div className="min-h-screen bg-slate-950 text-cyan-400 font-mono flex flex-col">
            {/* Industrial Header */}
            <header className="h-16 bg-slate-900 border-b border-cyan-900/50 flex items-center justify-between px-6 shadow-[0_0_15px_rgba(34,211,238,0.1)] z-50">
                <div className="flex items-center gap-4">
                    <Link to="/" className="text-cyan-600 hover:text-cyan-400 transition-colors">
                        <ArrowLeft size={24} />
                    </Link>
                    <div>
                        <h1 className="text-xl font-bold tracking-widest uppercase text-cyan-300 drop-shadow-[0_0_5px_rgba(34,211,238,0.5)]">
                            {title}
                        </h1>
                        {levelInfo && <p className="text-xs text-cyan-700">{levelInfo}</p>}
                    </div>
                </div>

                <div className="flex gap-4">
                    <button className="p-2 hover:bg-cyan-900/20 rounded-full transition-colors text-cyan-600 hover:text-cyan-400">
                        <HelpCircle size={20} />
                    </button>
                    <button className="p-2 hover:bg-cyan-900/20 rounded-full transition-colors text-cyan-600 hover:text-cyan-400">
                        <Settings size={20} />
                    </button>
                </div>
            </header>

            {/* Main Factory Floor */}
            <main className="flex-grow relative bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-900 to-slate-950">
                {/* Grid Background Effect */}
                <div className="absolute inset-0 z-0 opacity-10"
                    style={{
                        backgroundImage: 'linear-gradient(rgba(34,211,238,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(34,211,238,0.3) 1px, transparent 1px)',
                        backgroundSize: '40px 40px'
                    }}>
                </div>

                {/* Scanline Effect */}
                <div className="absolute inset-0 pointer-events-none z-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0),rgba(255,255,255,0)_50%,rgba(0,0,0,0.2)_50%,rgba(0,0,0,0.2))] bg-[length:100%_4px]"></div>

                <div className="relative z-10 h-full p-6">
                    {children}
                </div>
            </main>
        </div>
    );
};
