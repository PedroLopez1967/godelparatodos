import React, { useState, useEffect } from 'react';
import { RefreshCw, Play, Pause, AlertTriangle } from 'lucide-react';

interface ParadoxNode {
    id: string;
    value: boolean;
    label: string;
}

export const ParadoxEngine: React.FC = () => {
    const [isRunning, setIsRunning] = useState(false);
    const [stepCount, setStepCount] = useState(0);
    const [nodes, setNodes] = useState<ParadoxNode[]>([
        { id: 'statement', value: true, label: "Esta afirmación" }
    ]);

    // Simplified state: just toggle the Truth Value
    useEffect(() => {
        let intervalId: ReturnType<typeof setInterval>;

        if (isRunning) {
            intervalId = setInterval(() => {
                try {
                    setNodes(prev => {
                        if (!prev || prev.length === 0) return prev;
                        return [{
                            ...prev[0],
                            value: !prev[0].value
                        }];
                    });
                    setStepCount(c => c + 1);
                } catch (e) {
                    console.error("Paradox Loop Error:", e);
                    setIsRunning(false); // Stop loop on error
                }
            }, 1000); // Slower interval for stability
        }

        return () => {
            if (intervalId) clearInterval(intervalId);
        };
    }, [isRunning]);

    const handleToggle = () => {
        setIsRunning(!isRunning);
    };

    const handleReset = () => {
        setIsRunning(false);
        setStepCount(0);
        setNodes([{ id: 'statement', value: true, label: "Esta afirmación" }]);
    };

    const currentValue = nodes[0].value;

    return (
        <div className="bg-slate-900 border border-slate-700 rounded-2xl p-8 max-w-2xl mx-auto shadow-2xl relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-yellow-500 to-transparent opacity-50"></div>

            <div className="relative z-10 flex flex-col items-center gap-8">
                <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 bg-yellow-500/20 rounded-full border border-yellow-500/50">
                        <RefreshCw className={`text-yellow-500 ${isRunning ? 'animate-spin' : ''}`} size={32} />
                    </div>
                    <h2 className="text-2xl font-bold text-white tracking-widest uppercase">Motor de Paradojas</h2>
                </div>

                {/* The Statement Visual */}
                <div className="flex flex-col items-center">
                    <div
                        className={`
                            w-64 h-32 flex items-center justify-center rounded-xl border-4 text-2xl font-bold transition-all duration-500 transform
                            ${isRunning ? 'scale-105' : 'scale-100'}
                            ${currentValue
                                ? 'bg-green-900/30 text-green-400 border-green-500 shadow-[0_0_30px_rgba(34,197,94,0.3)]'
                                : 'bg-red-900/30 text-red-400 border-red-500 shadow-[0_0_30px_rgba(239,68,68,0.3)]'
                            }
                        `}
                    >
                        {currentValue ? "VERDADERO" : "FALSO"}
                    </div>

                    {/* The Arrow / Loop */}
                    <div className="h-16 w-1 bg-slate-700 my-2 relative">
                        {isRunning && (
                            <div
                                className="w-3 h-3 bg-yellow-400 rounded-full absolute -left-1 opacity-75"
                            />
                        )}
                    </div>

                    <div className="text-slate-400 text-lg font-mono bg-slate-800 px-6 py-3 rounded-lg border border-slate-700">
                        "{nodes[0].label} <span className="text-yellow-400 font-bold">es FALSA</span>"
                    </div>
                </div>

                {/* Log / Status */}
                <div className="w-full bg-slate-950 p-4 rounded-lg font-mono text-sm text-green-500 h-24 overflow-hidden relative">
                    <div className="absolute top-2 right-2 text-xs text-slate-500">SYSTEM.LOG</div>
                    <div className="flex flex-col-reverse">
                        {stepCount > 0 && (
                            <>
                                <div className="opacity-100">&gt; Evaluando estado... {currentValue ? "VERDADERO" : "FALSO"}</div>
                                <div className="opacity-70">&gt; Aplicando regla: negación...</div>
                                <div className="opacity-40">&gt; Ciclo #{stepCount} iniciado</div>
                            </>
                        )}
                        {stepCount === 0 && <span className="text-slate-500">Esperando ejecución...</span>}
                    </div>
                </div>

                {/* Controls */}
                <div className="flex gap-4">
                    <button
                        onClick={handleToggle}
                        className={`
                            px-6 py-3 rounded-lg font-bold flex items-center gap-2 transition-all
                            cursor-pointer
                            ${isRunning
                                ? 'bg-red-500/20 text-red-500 border border-red-500 hover:bg-red-500/30'
                                : 'bg-green-500/20 text-green-500 border border-green-500 hover:bg-green-500/30'
                            }
                        `}
                    >
                        {isRunning ? <><Pause size={20} /> DETENER</> : <><Play size={20} /> INICIAR SIMULACIÓN</>}
                    </button>

                    <button
                        onClick={handleReset}
                        className="px-4 py-3 rounded-lg bg-slate-800 text-slate-400 hover:bg-slate-700 transition-colors border border-slate-700 cursor-pointer"
                    >
                        <RefreshCw size={20} />
                    </button>
                </div>

                {/* Warning */}
                {stepCount > 5 && (
                    <div
                        className="flex items-center gap-2 text-yellow-500 bg-yellow-500/10 px-4 py-2 rounded border border-yellow-500/20 animate-pulse"
                    >
                        <AlertTriangle size={16} />
                        <span className="text-sm font-bold">¡ALERTA! Bucle infinito detectado. El sistema no puede decidir.</span>
                    </div>
                )}
            </div>
        </div>
    );
};
