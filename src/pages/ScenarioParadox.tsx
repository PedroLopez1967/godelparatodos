import React from 'react';
import { ParadoxEngine } from '../components/scenarios/Paradox/ParadoxEngine';
import { Link } from 'react-router-dom';
import { ArrowLeft, BookOpen } from 'lucide-react';

export const ScenarioParadox: React.FC = () => {
    return (
        <div className="min-h-screen bg-slate-950 text-white p-8">
            <div className="max-w-6xl mx-auto space-y-8">

                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <div className="flex items-center gap-2 text-yellow-500 mb-2">
                            <BookOpen size={20} />
                            <span className="text-sm font-bold uppercase tracking-widest">Escenario 3</span>
                        </div>
                        <h1 className="text-4xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                            Laboratorio de Paradojas
                        </h1>
                        <p className="text-slate-400 mt-2 max-w-xl">
                            Bienvenido al límite de la lógica. Aquí estudiamos sistemas que se refieren a sí mismos,
                            creando inconsistencias extrañas.
                        </p>
                    </div>

                    <Link to="/" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors bg-slate-900 px-4 py-2 rounded-lg border border-slate-800">
                        <ArrowLeft size={20} />
                        Volver al Panel
                    </Link>
                </div>

                {/* Main Interaction Area */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Sidebar / Theory */}
                    <div className="lg:col-span-1 space-y-6">
                        <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800">
                            <h3 className="text-xl font-bold text-white mb-4">La Paradoja del Mentiroso</h3>
                            <p className="text-slate-400 mb-4 leading-relaxed">
                                Epiménides el cretense dijo: <span className="text-yellow-200 italic">"Todos los cretenses son mentirosos."</span>
                            </p>
                            <p className="text-slate-400 leading-relaxed">
                                Si dice la verdad, entonces es un mentiroso (contradicción).
                                Si miente, entonces está diciendo la verdad (contradicción).
                            </p>

                            <div className="mt-6 p-4 bg-yellow-900/20 border-l-4 border-yellow-500 rounded-r-lg">
                                <h4 className="font-bold text-yellow-500 mb-1">Concepto Clave</h4>
                                <p className="text-sm text-yellow-200">
                                    Esta oscilación ocurre debido a la <strong className="text-white">autorreferencia</strong>.
                                    El sistema intenta evaluarse a sí mismo.
                                </p>
                            </div>
                        </div>

                        <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800 opacity-60">
                            <h3 className="text-xl font-bold text-white mb-2">Nivel 2: ???</h3>
                            <p className="text-slate-500 text-sm">
                                Este experimento está bloqueado hasta que domines el bucle simple.
                            </p>
                        </div>
                    </div>

                    {/* Simulation Engine */}
                    <div className="lg:col-span-2">
                        <ParadoxEngine />
                    </div>
                </div>
            </div>
        </div>
    );
};
