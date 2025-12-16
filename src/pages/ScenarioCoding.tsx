import React from 'react';
import { GodelEncoder } from '../components/scenarios/Coding/GodelEncoder';

export const ScenarioCoding: React.FC = () => {
    return (
        <div className="min-h-screen bg-slate-950 py-12 px-4 flex flex-col items-center">
            {/* Intro Section */}
            <div className="max-w-3xl text-center mb-12 space-y-4">
                <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-500">
                    La Aritmetización de la Sintaxis
                </h1>
                <p className="text-lg text-slate-400 leading-relaxed">
                    Gödel descubrió una forma de traducir <strong className="text-white">cualquier afirmación matemática</strong> en un <strong className="text-white">número único</strong>.
                    Esto le permitió hacer que las matemáticas hablaran de sí mismas usando sus propios números.
                </p>
            </div>

            {/* The Interactive Tool */}
            <GodelEncoder />

            {/* Footer Info */}
            <div className="mt-16 max-w-2xl text-center text-slate-600 text-sm">
                <p>
                    "Cada fórmula lógica puede ser convertida en un número, y cada número (válido) puede ser convertido de nuevo en una fórmula."
                </p>
            </div>
        </div>
    );
};
