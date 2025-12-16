import React from 'react';
import { Search, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

interface DetectiveLayoutProps {
    children: React.ReactNode;
    title: string;
}

export const DetectiveLayout: React.FC<DetectiveLayoutProps> = ({ children, title }) => {
    return (
        <div className="min-h-screen bg-slate-900 text-slate-100 font-sans selection:bg-yellow-500 selection:text-slate-900">
            {/* Noir Header */}
            <header className="bg-slate-800 border-b-2 border-slate-700 shadow-lg sticky top-0 z-40">
                <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link to="/scenarios" className="text-slate-400 hover:text-yellow-500 transition-colors">
                            <ArrowLeft size={24} />
                        </Link>
                        <div className="flex items-center gap-2">
                            <div className="bg-yellow-600 p-2 rounded-full text-slate-900">
                                <Search size={20} />
                            </div>
                            <div>
                                <h2 className="text-xl font-display font-bold text-slate-100 tracking-wider">
                                    DETECTIVE LÓGICO
                                </h2>
                                <p className="text-xs text-yellow-500 font-mono uppercase tracking-widest">
                                    Departamento de Crímenes Lógicos
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-slate-950 px-4 py-1 rounded border border-slate-700 font-mono text-sm text-yellow-500">
                        CASO: {title.toUpperCase()}
                    </div>
                </div>
            </header>

            {/* Main Content Area */}
            <main className="p-6 max-w-7xl mx-auto">
                <div className="bg-slate-800 rounded-xl border border-slate-700 shadow-2xl overflow-hidden min-h-[600px] relative">
                    {children}
                </div>
            </main>
        </div>
    );
};
