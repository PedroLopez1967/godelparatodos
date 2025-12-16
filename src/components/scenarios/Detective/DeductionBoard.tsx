import React, { useState } from 'react';
import { Share2, Paperclip } from 'lucide-react';
import type { Evidence } from '../../../data/detective-cases';
import { motion, AnimatePresence } from 'framer-motion';

interface DeductionBoardProps {
    collectedEvidence: Evidence[];
    onConnect: (id1: string, id2: string) => void;
}

export const DeductionBoard: React.FC<DeductionBoardProps> = ({ collectedEvidence, onConnect }) => {
    const [selectedIds, setSelectedIds] = useState<string[]>([]);

    const toggleSelection = (id: string) => {
        if (selectedIds.includes(id)) {
            setSelectedIds(selectedIds.filter(s => s !== id));
        } else {
            if (selectedIds.length < 2) {
                setSelectedIds([...selectedIds, id]);
            }
        }
    };

    const handleConnect = () => {
        if (selectedIds.length === 2) {
            onConnect(selectedIds[0], selectedIds[1]);
            setSelectedIds([]);
        }
    };

    return (
        <div className="bg-white/40 border-2 border-slate-300 rounded-lg p-4 shadow-sm relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10 pointer-events-none"
                style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '16px 16px' }}></div>

            <div className="flex items-center justify-between mb-4 relative z-10">
                <h3 className="text-slate-700 font-display font-bold flex items-center gap-2">
                    <Paperclip size={20} className="text-slate-500" />
                    Pizarra de Evidencias
                </h3>
                <span className="text-xs text-slate-500 uppercase tracking-wider font-bold">Selecciona 2 para conectar</span>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-4 relative z-10">
                {collectedEvidence.map(ev => {
                    const isSelected = selectedIds.includes(ev.id);
                    return (
                        <button
                            key={ev.id}
                            onClick={() => toggleSelection(ev.id)}
                            className={`p-3 text-xs rounded text-left transition-all border shadow-sm relative group
                                ${isSelected
                                    ? 'bg-yellow-100 border-yellow-500 text-slate-900 transform -rotate-1 scale-105 z-10'
                                    : 'bg-white border-slate-200 text-slate-600 hover:border-slate-400 hover:shadow-md'
                                }`}
                        >
                            {isSelected && (
                                <div className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full p-1 shadow-sm">
                                    <CheckIcon />
                                </div>
                            )}
                            <div className="flex flex-col gap-1">
                                <span className="font-bold underline decoration-slate-300/50">{ev.name}</span>
                                <span className="text-[10px] text-slate-500 line-clamp-2">{ev.description}</span>
                            </div>
                        </button>
                    );
                })}
                {collectedEvidence.length === 0 && (
                    <p className="col-span-2 text-center text-slate-500 italic text-xs py-8 border-2 border-dashed border-slate-300 rounded">
                        (La pizarra está vacía... busca pistas en la escena)
                    </p>
                )}
            </div>

            <div className="relative h-16 bg-slate-100/50 rounded border border-slate-200 flex items-center justify-center overflow-hidden z-10">
                <AnimatePresence>
                    {selectedIds.length === 2 && (
                        <motion.button
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            onClick={handleConnect}
                            className="bg-red-700 hover:bg-red-600 text-white px-6 py-2 rounded shadow-lg flex items-center gap-2 z-10 font-bold tracking-widest border border-red-800"
                        >
                            <Share2 size={16} />
                            ATAR CABOS
                        </motion.button>
                    )}
                </AnimatePresence>

                {/* Visualization of connection */}
                <div className="absolute inset-0 flex items-center justify-around opacity-30 pointer-events-none">
                    <div className="w-2 h-2 rounded-full bg-slate-400" />
                    <div className="h-[2px] bg-slate-400 w-full mx-4 border-t border-dashed border-slate-500"></div>
                    <div className="w-2 h-2 rounded-full bg-slate-400" />
                </div>
            </div>
        </div>
    );
};

const CheckIcon = () => (
    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="20 6 9 17 4 12" />
    </svg>
);
