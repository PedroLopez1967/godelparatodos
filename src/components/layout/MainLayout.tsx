
import { Outlet, Link } from 'react-router-dom';
import { BookOpen } from 'lucide-react';

export const MainLayout: React.FC = () => {
    return (
        <div className="min-h-screen bg-background flex flex-col font-sans">
            {/* Header */}
            <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                    <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                        <div className="bg-primary-purple p-2 rounded-lg text-white">
                            <BookOpen size={24} />
                        </div>
                        <h1 className="text-2xl font-display font-bold text-gray-900 tracking-tight">
                            Gödel <span className="text-primary-purple">∀</span>
                        </h1>
                    </Link>

                    <nav className="flex items-center gap-4">
                        <Link
                            to="/"
                            className="font-semibold text-gray-600 hover:text-primary-purple transition-colors"
                        >
                            Misiones
                        </Link>
                        <Link
                            to="/progress"
                            className="font-semibold text-gray-600 hover:text-primary-purple transition-colors"
                        >
                            Progreso
                        </Link>
                    </nav>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-grow">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <Outlet />
                </div>
            </main>

            {/* Footer */}
            <footer className="bg-white border-t border-gray-200 mt-auto">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <p className="text-center text-gray-500 text-sm">
                        © 2025 Gödel para todos - Una aventura lógico-matemática
                    </p>
                </div>
            </footer>
        </div>
    );
};
