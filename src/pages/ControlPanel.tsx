import React from 'react';
import { Link } from 'react-router-dom';
import { useGameStore } from '../store/gameStore';
import { Search, Settings, RotateCcw, Lock, Play, CheckCircle } from 'lucide-react';

interface ModuleCardProps {
    title: string;
    description: string;
    icon: React.ElementType;
    to: string;
    status: 'locked' | 'unlocked' | 'completed';
    color: string;
}

const ModuleCard: React.FC<ModuleCardProps> = ({ title, description, icon: Icon, to, status, color }) => {
    const isLocked = status === 'locked';

    return (
        <Link
            to={isLocked ? '#' : to}
            className={`relative overflow-hidden rounded-2xl p-6 border transition-all duration-300 group
                ${isLocked
                    ? 'bg-slate-900 border-slate-800 opacity-70 cursor-not-allowed'
                    : 'bg-white border-slate-200 hover:shadow-xl hover:scale-[1.02] hover:border-cyan-400'
                }
            `}
        >
            <div className={`absolute top-0 right-0 p-4 opacity-50`}>
                {status === 'completed' && <CheckCircle className="text-green-500" size={24} />}
                {status === 'locked' && <Lock className="text-slate-500" size={24} />}
                {status === 'unlocked' && <Play className="text-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity" size={24} />}
            </div>

            <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-4 shadow-lg ${isLocked ? 'bg-slate-800' : color}`}>
                <Icon className={isLocked ? 'text-slate-600' : 'text-white'} size={28} />
            </div>

            <h3 className={`text-xl font-bold mb-2 ${isLocked ? 'text-slate-500' : 'text-slate-900'}`}>
                {title}
            </h3>

            <p className={`text-sm ${isLocked ? 'text-slate-600' : 'text-slate-600'}`}>
                {description}
            </p>

            {!isLocked && (
                <div className="mt-4 w-full h-1 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-cyan-400 w-0 group-hover:w-full transition-all duration-700 ease-out" />
                </div>
            )}
        </Link>
    );
};

export const ControlPanel: React.FC = () => {
    const { unlockedScenarios, completedScenarios, resetProgress } = useGameStore();

    // Calculate Progress (5 modules total for now)
    const totalModules = 5;
    const progressPercentage = (completedScenarios.length / totalModules) * 100;

    const getStatus = (id: string) => {
        if (completedScenarios.includes(id)) return 'completed';
        if (unlockedScenarios.includes(id)) return 'unlocked';
        return 'locked';
    };

    const handleReset = () => {
        if (confirm('¿Estás seguro de que quieres reiniciar todo el progreso?')) {
            resetProgress();
            window.location.reload();
        }
    };

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            {/* Dashboard Header */}
            <header className="bg-slate-900 text-white rounded-3xl p-8 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500 rounded-full filter blur-[100px] opacity-10 -translate-y-1/2 translate-x-1/2"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500 rounded-full filter blur-[100px] opacity-10 translate-y-1/2 -translate-x-1/2"></div>

                <div className="relative z-10">
                    <h1 className="text-4xl font-bold mb-2 tracking-tight">Centro de Mando</h1>
                    <p className="text-cyan-200 text-lg">Sistema de Gestión de Paradojas y Lógica</p>

                    <div className="mt-8 flex items-center gap-4">
                        <div className="flex-grow max-w-md">
                            <div className="flex justify-between text-xs uppercase tracking-widest text-slate-400 mb-2">
                                <span>Progreso Global</span>
                                <span>{Math.round(progressPercentage)}%</span>
                            </div>
                            <div className="h-3 bg-slate-800 rounded-full overflow-hidden border border-slate-700">
                                <div
                                    className="h-full bg-gradient-to-r from-cyan-500 to-purple-500 relative transition-all duration-1000 ease-out"
                                    style={{ width: `${progressPercentage}%` }}
                                >
                                    <div className="absolute inset-0 bg-white opacity-20 w-full h-full animate-pulse"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Modules Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <ModuleCard
                    title="El Detective Lógico"
                    description="Analiza testimonios, encuentra contradicciones y descubre al mentiroso."
                    icon={Search}
                    to="/scenarios/detective"
                    status={getStatus('detective')}
                    color="bg-blue-500"
                />

                <ModuleCard
                    title="La Fábrica de Verdades"
                    description="Ensambla axiomas en máquinas lógicas para producir teoremas complejos."
                    icon={Settings}
                    to="/scenarios/factory"
                    status={getStatus('factory')}
                    color="bg-orange-500"
                />

                <ModuleCard
                    title="Laboratorio de Paradojas"
                    description="Experimenta con bucles extraños y sistemas autorreferentes."
                    icon={RotateCcw}
                    to="/scenarios/paradox"
                    status={getStatus('paradox')}
                    color="bg-yellow-500"
                />

                <ModuleCard
                    title="Código Secreto de Gödel"
                    description="Aritmetización de la sintaxis. Convierte fórmulas en números."
                    icon={Lock}
                    to="/scenarios/coding"
                    status='unlocked'
                    color="bg-purple-500"
                />

                <ModuleCard
                    title="El Reino Incompleto"
                    description="La confrontación final. ¿Existen verdades indemostrables?"
                    icon={Lock}
                    to="/scenarios/kingdom"
                    status={getStatus('kingdom')}
                    color="bg-red-500"
                />
            </div>

            {/* System Control Panel (Dev Tools) */}
            <div className="mt-12 bg-slate-900 border border-slate-800 rounded-2xl p-6 relative overflow-hidden group">
                <div className="absolute inset-0 bg-red-500/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
                <div className="flex items-center justify-between mb-6 relative z-10">
                    <div className="flex items-center gap-3">
                        <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                        <h3 className="text-xl font-bold text-red-400 tracking-widest uppercase">Sistema de Control Global</h3>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6 relative z-10">
                    <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 bg-slate-950 rounded-lg border border-slate-800">
                            <div>
                                <div className="text-white font-bold">Modo Desarrollador</div>
                                <div className="text-slate-500 text-xs text-justify">Desbloquear todos los niveles para pruebas</div>
                            </div>
                            <button className="bg-slate-800 hover:bg-slate-700 text-slate-300 px-4 py-2 rounded-lg text-sm font-mono border border-slate-700 transition-colors">
                                ACTIVAR
                            </button>
                        </div>
                        <div className="flex items-center justify-between p-4 bg-slate-950 rounded-lg border border-slate-800">
                            <div>
                                <div className="text-white font-bold">Reiniciar Sistema</div>
                                <div className="text-slate-500 text-xs">Borrar todo el progreso y comenzar de cero</div>
                            </div>
                            <button
                                onClick={handleReset}
                                className="bg-red-900/20 hover:bg-red-900/40 text-red-500 px-4 py-2 rounded-lg text-sm font-mono border border-red-900/30 transition-colors"
                            >
                                EJECUTAR
                            </button>
                        </div>
                    </div>

                    <div className="bg-slate-950 rounded-lg p-4 font-mono text-xs text-green-500 h-32 overflow-y-auto border border-slate-800 custom-scrollbar">
                        <div className="mb-1 text-slate-500"># SYSTEM LOG</div>
                        <div className="opacity-50">&gt; Inicializando Control Panel v1.0...</div>
                        <div className="opacity-75">&gt; Estado cargado desde Memoria Persistente.</div>
                        <div className="opacity-50">&gt; Progreso actual: {Math.round(progressPercentage)}%</div>
                        <div className="opacity-100 animate-pulse">&gt; Esperando input del usuario_</div>
                    </div>
                </div>
            </div>
        </div>
    );
};
