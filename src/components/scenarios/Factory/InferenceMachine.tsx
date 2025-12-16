import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import type { InferenceRule, LogicSymbol } from '../../../types/logic.types';
import { Cog, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { AxiomToken } from './AxiomToken';

interface InferenceMachineProps {
    rule: InferenceRule;
    currentInputs?: LogicSymbol[];
    lastOutput?: LogicSymbol | null;
}

export const InferenceMachine: React.FC<InferenceMachineProps> = ({ rule, currentInputs = [], lastOutput }) => {
    const { isOver, setNodeRef } = useDroppable({
        id: rule.id,
        data: rule
    });

    const activeStyle = isOver ? 'border-cyan-400 shadow-[0_0_40px_rgba(34,211,238,0.3)] scale-105 ring-2 ring-cyan-500/50' : 'border-slate-700 shadow-lg';

    return (
        <div
            ref={setNodeRef}
            className={`relative w-72 h-auto min-h-[16rem] bg-slate-900 border-2 ${activeStyle} rounded-xl block transition-all duration-300 mt-8 mb-8 group`}
            style={{
                backgroundImage: `radial-gradient(circle at center, #1e293b 0%, #0f172a 100%)`,
            }}
        >
            {/* Header / Name Plate */}
            <div className="absolute -top-4 bg-slate-800 border-2 border-slate-600 text-cyan-400 px-6 py-1 rounded-sm text-xs font-black tracking-[0.2em] uppercase shadow-md z-10">
                UNIT: {rule.name}
            </div>

            {/* Main Machinery Area */}
            <div className="w-full h-48 flex items-center justify-center gap-6 relative rounded-t-xl">
                {/* Background Grid */}
                <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjIiIGZpbGw9IiM5NGExYjIiLz48L3N2Zz4=')]"></div>

                <AnimatePresence mode="wait">
                    {lastOutput ? (
                        // Output Display Overlay
                        <motion.div
                            key="output"
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 1.5 }}
                            className="absolute inset-0 z-20 bg-slate-950/95 flex flex-col items-center justify-center"
                        >
                            <div className="text-cyan-400 text-xs font-black uppercase tracking-widest mb-2 animate-pulse">OUTPUT GENERATED</div>
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1.5, rotate: 360 }}
                                transition={{ type: "spring", stiffness: 200, damping: 10 }}
                                className="text-5xl font-mono font-bold text-white drop-shadow-[0_0_20px_rgba(34,211,238,0.8)]"
                            >
                                {lastOutput.symbol}
                            </motion.div>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="gears"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="flex items-center justify-center gap-6 absolute inset-0"
                        >
                            {/* Left Gear */}
                            <Cog
                                size={64}
                                className={`text-slate-700 transition-all duration-1000 ${isOver || currentInputs.length > 0 ? 'animate-spin text-cyan-600' : ''}`}
                            />

                            {/* Center Core Processing */}
                            <div className="relative">
                                <Zap size={32} className={`relative z-10 transition-colors ${isOver ? 'text-yellow-400 animate-bounce' : 'text-slate-800'}`} />
                                {isOver && <div className="absolute inset-0 bg-yellow-400 blur-xl opacity-50 animate-pulse"></div>}
                            </div>

                            {/* Right Gear (Reverse) */}
                            <Cog
                                size={48}
                                className={`text-slate-700 transition-all duration-1000 ${isOver || currentInputs.length > 0 ? 'animate-spin-reverse text-indigo-500' : ''}`}
                            />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Progress Bar / Status */}
            <div className="w-full h-1 bg-slate-800 relative">
                <div
                    className={`absolute inset-y-0 left-0 bg-cyan-500 transition-all duration-500`}
                    style={{ width: `${(currentInputs.length / rule.inputs) * 100}%` }}
                ></div>
            </div>

            {/* Output Tray Area */}
            <div className="w-full bg-slate-950 p-6 border-t border-slate-800 rounded-b-xl flex justify-center items-center relative min-h-[7rem]">
                <span className="absolute -top-6 text-[10px] text-cyan-500 font-mono uppercase bg-slate-900 px-2 rounded border border-cyan-900 shadow-[0_0_10px_rgba(34,211,238,0.2)]">
                    SALIDA
                </span>

                <AnimatePresence mode="wait">
                    {lastOutput ? (
                        <motion.div
                            key="result"
                            initial={{ scale: 0, rotate: -180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            className="relative"
                        >
                            <div className="absolute inset-0 bg-cyan-500 blur-xl opacity-20 animate-pulse"></div>
                            <AxiomToken axiom={lastOutput} />
                        </motion.div>
                    ) : (
                        <div className="text-slate-700 text-xs font-mono uppercase tracking-widest animate-pulse">
                            ESPERANDO PROCESO...
                        </div>
                    )}
                </AnimatePresence>
            </div>

            {/* Hover hint */}
            {isOver && (
                <div className="absolute inset-0 bg-cyan-500/10 border-2 border-cyan-400 border-dashed rounded-xl animate-pulse pointer-events-none z-20 flex items-center justify-center">
                    <span className="bg-black/80 text-cyan-400 font-bold px-3 py-1 rounded">SOLTAR AQUÍ</span>
                </div>
            )}
        </div>
    );
};
