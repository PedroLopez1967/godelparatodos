import React, { useState } from 'react';
import { Calculator, ArrowDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Mapping table strictly based on Nagel & Newman (or simplified version)
const GODEL_MAP: Record<string, number> = {
    '~': 1,
    'v': 2,
    '>': 3,
    'E': 4,
    '=': 5,
    '0': 6,
    's': 7,
    '(': 8,
    ')': 9,
    'a': 10, // Variable
    'x': 11, // Variable
    'y': 12, // Variable
};

// First 10 primes for visualization
const PRIMES = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29];

export const GodelEncoder: React.FC = () => {
    const [formula, setFormula] = useState<string[]>([]);
    const [isCalculating, setIsCalculating] = useState(false);
    const [godelNumber, setGodelNumber] = useState<string | null>(null);

    const handleSymbolClick = (symbol: string) => {
        if (formula.length < 10) { // Limit length to avoid infinite numbers visually
            setFormula([...formula, symbol]);
            setGodelNumber(null);
        }
    };

    const handleBackspace = () => {
        setFormula(formula.slice(0, -1));
        setGodelNumber(null);
    };

    const calculateGodelNumber = () => {
        setIsCalculating(true);
        // We actally won't compute the massive number JS can't handle. 
        // We will just show the factorization form.
        setTimeout(() => {
            setIsCalculating(false);
            setGodelNumber("COMPUTED");
        }, 1500);
    };

    return (
        <div className="w-full max-w-4xl mx-auto p-6 bg-slate-900 rounded-xl border border-slate-700 shadow-2xl">
            {/* Header */}
            <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-emerald-400 mb-2 font-mono">Codificador Gödel</h2>
                <p className="text-slate-400">Convierte cualquier fórmula matemática en un ÚNICO número natural.</p>
            </div>

            {/* 1. Symbol Keyboard */}
            <div className="mb-8">
                <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-3">1. Construye tu Fórmula</h3>
                <div className="flex flex-wrap justify-center gap-2">
                    {Object.entries(GODEL_MAP).map(([symbol, num]) => (
                        <button
                            key={symbol}
                            onClick={() => handleSymbolClick(symbol)}
                            className="w-12 h-12 bg-slate-800 border border-slate-600 rounded hover:bg-emerald-900/50 hover:border-emerald-500 hover:text-emerald-400 transition-all font-mono text-xl flex flex-col items-center justify-center group"
                        >
                            <span>{symbol}</span>
                            <span className="text-[9px] text-slate-600 group-hover:text-emerald-500/80">{num}</span>
                        </button>
                    ))}
                    <button onClick={handleBackspace} className="px-4 h-12 bg-red-900/20 border border-red-900/50 text-red-400 rounded hover:bg-red-900/40 uppercase text-xs font-bold">
                        Borrar
                    </button>
                </div>
            </div>

            {/* 2. Formula Visualization */}
            <div className="mb-8 bg-black/50 p-6 rounded-xl border border-slate-700 min-h-[100px] flex items-center justify-center relative overflow-hidden">
                <div className="absolute top-2 left-2 text-xs text-slate-600 font-mono">BUFFER_ENTRADA</div>

                {formula.length === 0 ? (
                    <span className="text-slate-700 italic">Escribe algo...</span>
                ) : (
                    <div className="flex items-end gap-1">
                        <AnimatePresence>
                            {formula.map((char, idx) => (
                                <motion.div
                                    key={`${idx}-${char}`}
                                    initial={{ scale: 0, y: 20 }}
                                    animate={{ scale: 1, y: 0 }}
                                    exit={{ scale: 0, opacity: 0 }}
                                    className="flex flex-col items-center"
                                >
                                    <div className="w-10 h-10 bg-slate-100 text-slate-900 font-bold text-xl flex items-center justify-center rounded shadow-lg border-b-4 border-slate-300">
                                        {char}
                                    </div>
                                    <div className="h-8 w-0.5 bg-slate-700 my-1"></div>
                                    <div className="w-8 h-8 rounded-full bg-emerald-900/50 text-emerald-400 border border-emerald-500/50 flex items-center justify-center text-sm font-mono">
                                        {GODEL_MAP[char]}
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                )}
            </div>

            {/* Action */}
            <div className="flex justify-center mb-12">
                <button
                    onClick={calculateGodelNumber}
                    disabled={formula.length === 0 || isCalculating}
                    className={`
                        px-8 py-3 rounded-full font-bold text-lg flex items-center gap-3 transition-all
                        ${formula.length === 0 ? 'bg-slate-800 text-slate-500 cursor-not-allowed' : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-[0_0_20px_rgba(16,185,129,0.4)] hover:scale-105 active:scale-95'}
                    `}
                >
                    <Calculator size={20} />
                    {isCalculating ? 'Calculando...' : 'Gödelizar'}
                </button>
            </div>

            {/* 3. Result / Explanation */}
            <AnimatePresence>
                {godelNumber && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="overflow-hidden"
                    >
                        <div className="bg-emerald-950/30 border border-emerald-900/50 rounded-xl p-8 relative">
                            <h3 className="text-emerald-400 font-bold mb-6 flex items-center gap-2">
                                <ArrowDown size={18} /> Factorización Prima de Gödel
                            </h3>

                            <div className="flex flex-wrap items-center gap-4 text-2xl font-mono text-slate-300">
                                <span className="text-emerald-500 font-black">G</span>
                                <span>=</span>
                                {formula.map((char, idx) => {
                                    const prime = PRIMES[idx];
                                    const power = GODEL_MAP[char];
                                    if (!prime) return null; // Should not happen with limit 10

                                    return (
                                        <div key={idx} className="flex flex-col items-center group relative cursor-help">
                                            <span className="text-white text-3xl">{prime}</span>
                                            <span className="text-emerald-400 text-lg absolute -top-2 -right-3 font-bold">{power}</span>

                                            {/* Tooltip */}
                                            <div className="absolute bottom-full mb-2 opacity-0 group-hover:opacity-100 transition-opacity bg-black text-xs text-white p-2 rounded w-32 text-center pointer-events-none z-10">
                                                Primo #{idx + 1} ^ (Símbolo '{char}')
                                            </div>

                                            {idx < formula.length - 1 && (
                                                <span className="absolute -right-4 top-1 text-slate-600 text-xl">×</span>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>

                            <div className="mt-8 pt-6 border-t border-emerald-900/30 text-slate-400 text-sm">
                                <p>
                                    Este número es <strong className="text-white">único</strong>. Debido al Teorema Fundamental de la Aritmética, solo existe una combinación de primos que da como resultado este número.
                                    Por lo tanto, podemos recuperar la fórmula original simplemente factorizando el número.
                                </p>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
