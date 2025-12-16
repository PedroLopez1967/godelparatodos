import React, { useState, useEffect } from 'react';
import { DetectiveLayout } from '../components/scenarios/Detective/DetectiveLayout';
import { detectiveCases, type Evidence } from '../data/detective-cases';
import { Search, MapPin, CheckCircle, ArrowRight, BookOpen, Lightbulb, XCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { DeductionBoard } from '../components/scenarios/Detective/DeductionBoard';

export const ScenarioDetective: React.FC = () => {
    const [currentCaseIndex, setCurrentCaseIndex] = useState(0);
    const currentCase = detectiveCases[currentCaseIndex];

    // State resets on case change
    const [collectedEvidence, setCollectedEvidence] = useState<string[]>([]);
    const [foundDeductions, setFoundDeductions] = useState<string[]>([]); // IDs of found combos
    const [showSolution, setShowSolution] = useState(false);
    const [showFailMessage, setShowFailMessage] = useState(false);

    // Deduction Result Modal
    const [deductionResult, setDeductionResult] = useState<{
        title: string;
        description: string;
        isCorrect: boolean;
    } | null>(null);

    // Reset state when case changes (Level up)
    useEffect(() => {
        setCollectedEvidence([]);
        setFoundDeductions([]);
        setShowSolution(false);
        setShowFailMessage(false);
        setDeductionResult(null);
    }, [currentCaseIndex]);

    const handleCollectEvidence = (evidence: Evidence) => {
        if (!collectedEvidence.includes(evidence.id)) {
            setCollectedEvidence([...collectedEvidence, evidence.id]);
        }
    };

    const handleConnection = (id1: string, id2: string) => {
        console.log(`Intentando conectar: ${id1} y ${id2}`);

        let combo = currentCase.combinations?.find(c =>
            (c.evidenceIds[0] === id1 && c.evidenceIds[1] === id2) ||
            (c.evidenceIds[0] === id2 && c.evidenceIds[1] === id1)
        );

        // FALLBACK MANUAL (Si los datos fallan por alguna razón)
        if (!combo && currentCase.id === 'case-1') {
            if ((id1 === 'ev-1' && id2 === 'ev-2') || (id1 === 'ev-2' && id2 === 'ev-1')) {
                combo = {
                    id: 'fallback-combo-1',
                    evidenceIds: ['ev-1', 'ev-2'],
                    resultTitle: 'Coincidencia Temporal (Manual)',
                    resultDescription: 'Las huellas frescas coinciden con el momento en que se escuchó el "Miau". ¡Esto sitúa a Mittens en la escena!',
                    isCorrect: true
                } as any;
            }
        }

        if (combo) {
            setDeductionResult({
                title: combo.resultTitle,
                description: combo.resultDescription,
                isCorrect: combo.isCorrect
            });
            if (combo.isCorrect && !foundDeductions.includes(combo.id)) {
                setFoundDeductions([...foundDeductions, combo.id]);
            }
        } else {
            setDeductionResult({
                title: "Sin Conexión Clara",
                description: "Estas dos pistas no parecen tener una relación directa que nos ayude a resolver el caso.",
                isCorrect: false
            });
        }
    };

    const isCaseSolvable = () => {
        // Now requires finding all 'correct' deductions OR just raw evidence if no combos exist
        const requiredCombos = currentCase.combinations?.filter(c => c.isCorrect) || [];
        const hasFoundAllCombos = requiredCombos.every(c => foundDeductions.includes(c.id));

        // Also check if we have enough raw evidence count (legacy check)
        const relevantFound = currentCase.evidence.filter((e: Evidence) =>
            collectedEvidence.includes(e.id) && e.isRelevant
        );

        // Special logic for unsolvable cases (Level 2)
        if (currentCase.minEvidenceCount > 10) return false;

        return (relevantFound.length >= currentCase.minEvidenceCount) && hasFoundAllCombos;
    };

    const hasFoundAllEvidence = () => {
        return collectedEvidence.length === currentCase.evidence.length;
    };

    const checkSolution = () => {
        // If it requires impossible evidence, it's an "Undecidable" check
        if (currentCase.minEvidenceCount > 10) {
            if (hasFoundAllEvidence()) {
                setShowFailMessage(true); // "We found everything, but still can't prove it!"
            }
            return;
        }
        setShowSolution(true);
    };

    const nextLevel = () => {
        if (currentCaseIndex < detectiveCases.length - 1) {
            setCurrentCaseIndex(currentCaseIndex + 1);
        }
    };

    return (
        <DetectiveLayout title={currentCase.title}>
            <div className="grid grid-cols-1 lg:grid-cols-3 h-full min-h-[600px]">

                {/* Left Panel: Crime Scene */}
                {/* ... (existing code) ... */}



                {/* Left Panel: Crime Scene */}
                <div className="lg:col-span-2 bg-slate-900 relative border-r border-slate-700 p-8 overflow-hidden group z-30">
                    <div className="absolute top-4 left-4 bg-black/50 p-2 rounded text-slate-300 text-sm z-30 pointer-events-none">
                        <MapPin size={16} className="inline mr-2" />
                        Escena del Crimen - Haz clic para investigar
                    </div>

                    {currentCase.evidence.map((ev: Evidence) => (
                        !collectedEvidence.includes(ev.id) && (
                            <button
                                key={ev.id}
                                className="absolute p-6 rounded-full border-4 border-white/10 hover:border-yellow-500 transition-all z-50 focus:outline-none focus:ring-4 focus:ring-yellow-500 bg-white/5 hover:bg-yellow-500/20 cursor-pointer shadow-[0_0_15px_rgba(0,0,0,0.5)] active:scale-95"
                                style={{ top: `${ev.position.y}%`, left: `${ev.position.x}%` }}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleCollectEvidence(ev);
                                }}
                                aria-label={`Recolectar pista: ${ev.name}`}
                            >
                                <Search className="text-white opacity-90 hover:opacity-100 hover:text-yellow-200" size={32} />
                                <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] bg-black/70 text-white px-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                                    Investigar
                                </span>
                            </button>
                        )
                    ))}

                    <div className="absolute inset-0 pointer-events-none opacity-10 flex items-center justify-center z-0">
                        <span className="text-9xl font-display font-bold text-white transform -rotate-12 select-none">
                            TOP SECRET
                        </span>
                    </div>
                </div>

                {/* Right Panel: Detective's Notebook */}
                <div className="bg-[#f0e6d2] text-slate-800 p-6 flex flex-col border-l-8 border-slate-800 shadow-[inset_10px_0_20px_rgba(0,0,0,0.1)] z-10 relative font-serif">
                    {/* Notebook Binding Effect */}
                    <div className="absolute left-[-12px] top-0 bottom-0 w-8 flex flex-col justify-around py-4 z-20">
                        {[...Array(10)].map((_, i) => (
                            <div key={i} className="w-6 h-2 bg-slate-700 rounded-full shadow-sm transform -rotate-3" />
                        ))}
                    </div>

                    <h3 className="text-2xl font-bold text-slate-900 mb-4 border-b-2 border-slate-400 pb-2 flex justify-between items-center font-typewriter">
                        <span>CASO #{currentCaseIndex + 1}</span>
                        <span className="text-xs bg-red-700 text-white px-2 py-1 transform rotate-2 shadow-sm font-sans">CONFIDENCIAL</span>
                    </h3>

                    <div className="mb-4 bg-white/50 p-3 rounded shadow-sm border border-slate-300">
                        <p className="text-slate-600 text-sm mb-1 font-bold uppercase">Misión:</p>
                        <p className="text-slate-800 italic leading-relaxed">"{currentCase.description}"</p>
                    </div>

                    <div className="mb-6 flex-grow ">
                        <DeductionBoard
                            collectedEvidence={currentCase.evidence.filter(e => collectedEvidence.includes(e.id))}
                            onConnect={handleConnection}
                        />
                    </div>

                    <div className="bg-slate-200/50 p-2 rounded border border-slate-300 mt-2">
                        <h4 className="text-xs font-bold text-slate-500 uppercase mb-2">Deducciones Confirmadas:</h4>
                        {foundDeductions.length > 0 ? (
                            <ul className="list-disc list-inside text-sm text-slate-700 space-y-1">
                                {foundDeductions.map(id => {
                                    const combo = currentCase.combinations?.find(c => c.id === id);
                                    return <li key={id}>{combo?.resultTitle}</li>
                                })}
                            </ul>
                        ) : (
                            <p className="text-xs text-slate-500 italic">Aún no hay deducciones sólidas.</p>
                        )}
                    </div>


                    <div className="mt-4 pt-4 border-t-2 border-slate-400">
                        {currentCase.minEvidenceCount > 10 ? (
                            <button
                                onClick={checkSolution}
                                disabled={!hasFoundAllEvidence()}
                                className={`w-full py-3 px-4 rounded font-bold font-display tracking-wide transition-all shadow-md
                 ${hasFoundAllEvidence()
                                        ? 'bg-slate-800 text-white hover:bg-slate-700'
                                        : 'bg-slate-400 text-slate-200 cursor-not-allowed'}
               `}
                            >
                                {hasFoundAllEvidence() ? "DECLARAR INDECIDIBLE" : "INVESTIGANDO..."}
                            </button>
                        ) : (
                            <button
                                onClick={checkSolution}
                                disabled={!isCaseSolvable()}
                                className={`w-full py-3 px-4 rounded font-bold font-display tracking-wide transition-all shadow-md
                  ${isCaseSolvable()
                                        ? 'bg-red-700 text-white hover:bg-red-600 animate-pulse'
                                        : 'bg-slate-400 text-slate-200 cursor-not-allowed'}
                `}
                            >
                                {(() => {
                                    const requiredCombos = currentCase.combinations?.filter(c => c.isCorrect) || [];
                                    const hasFoundAllCombos = requiredCombos.every(c => foundDeductions.includes(c.id));
                                    const relevantFound = currentCase.evidence.filter((e: Evidence) => collectedEvidence.includes(e.id) && e.isRelevant).length;

                                    if (isCaseSolvable()) return "CERRAR CASO";
                                    return `FALTA: Pistas ${relevantFound}/${currentCase.minEvidenceCount} - Deducción ${hasFoundAllCombos ? 'OK' : 'PEND'}`;
                                })()}
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* Deduction Result Modal */}
            <AnimatePresence>
                {deductionResult && (
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center z-50 p-4 backdrop-blur-sm" onClick={() => setDeductionResult(null)}>
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, rotate: -2 }}
                            animate={{ scale: 1, opacity: 1, rotate: 0 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-[#fffdf5] p-6 max-w-sm w-full shadow-2xl relative transform border-4 border-white"
                            style={{ backgroundImage: 'linear-gradient(#e8e8e8 1px, transparent 1px)', backgroundSize: '20px 20px' }}
                        >
                            {/* Tape effect */}
                            <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-32 h-8 bg-yellow-200/80 shadow-sm transform -rotate-1"></div>

                            <div className="flex flex-col items-center text-center">
                                <div className={`mb-4 p-3 rounded-full ${deductionResult.isCorrect ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                    {deductionResult.isCorrect ? <Lightbulb size={32} /> : <XCircle size={32} />}
                                </div>
                                <h3 className="text-xl font-bold text-slate-800 mb-2 font-display">{deductionResult.title}</h3>
                                <p className="text-slate-600 mb-6 leading-relaxed font-serif">{deductionResult.description}</p>

                                <button
                                    onClick={() => setDeductionResult(null)}
                                    className="px-6 py-2 bg-slate-800 text-white font-bold rounded hover:bg-slate-700 transition-colors"
                                >
                                    Entendido
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>


            {/* Success Modal */}
            <AnimatePresence>
                {showSolution && (
                    <div className="absolute inset-0 bg-black/90 flex items-center justify-center z-50 p-4">
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="bg-slate-800 border-2 border-yellow-500 p-8 rounded-xl max-w-lg w-full shadow-2xl relative"
                        >
                            <h3 className="text-2xl font-bold text-yellow-500 mb-4 flex items-center gap-2">
                                <CheckCircle className="text-yellow-500" />
                                ¡Caso Resuelto!
                            </h3>
                            <div className="space-y-4 text-slate-200">
                                <p>
                                    <strong className="text-white">La Verdad:</strong> {currentCase.truth}
                                </p>
                                <div className="bg-slate-900 p-4 rounded border-l-4 border-yellow-500">
                                    <p className="text-sm italic text-slate-400 mb-1">Lección de Gödel:</p>
                                    <p>{currentCase.provability}</p>
                                </div>
                            </div>

                            <div className="mt-8 flex justify-end gap-4">
                                <button
                                    onClick={() => setShowSolution(false)}
                                    className="px-4 py-2 text-slate-400 hover:text-white"
                                >
                                    Repasar
                                </button>
                                {currentCaseIndex < detectiveCases.length - 1 ? (
                                    <button
                                        onClick={nextLevel}
                                        className="bg-yellow-500 hover:bg-yellow-400 text-slate-900 px-6 py-2 rounded font-bold flex items-center gap-2"
                                    >
                                        Siguiente Caso <ArrowRight size={18} />
                                    </button>
                                ) : (
                                    <button className="bg-green-600 text-white px-6 py-2 rounded font-bold">
                                        ¡Misión Cumplida!
                                    </button>
                                )}
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* Fail/Undecidable Modal */}
            <AnimatePresence>
                {showFailMessage && (
                    <div className="absolute inset-0 bg-black/90 flex items-center justify-center z-50 p-4">
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="bg-slate-800 border-2 border-indigo-500 p-8 rounded-xl max-w-lg w-full shadow-2xl relative"
                        >
                            <h3 className="text-2xl font-bold text-indigo-400 mb-4 flex items-center gap-2">
                                <BookOpen className="text-indigo-400" />
                                Caso Indecidible
                            </h3>
                            <div className="space-y-4 text-slate-200">
                                <p>
                                    Has encontrado todas las pistas disponibles, pero... <strong>¡No son suficientes!</strong>
                                </p>
                                <p>
                                    <strong className="text-white">La Verdad:</strong> {currentCase.truth}
                                </p>
                                <div className="bg-slate-900 p-4 rounded border-l-4 border-indigo-500">
                                    <p className="text-sm italic text-slate-400 mb-1">El Teorema:</p>
                                    <p>
                                        A veces hay verdades matemáticas que <strong>no se pueden demostrar</strong> con las reglas (axiomas) que tenemos.
                                        Al igual que aquí: sabes quién fue, pero no puedes probarlo ante un juez.
                                    </p>
                                </div>
                            </div>

                            <div className="mt-8 flex justify-end gap-4">
                                <button
                                    onClick={() => setShowFailMessage(false)}
                                    className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-2 rounded font-bold"
                                >
                                    Entendido
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

        </DetectiveLayout>
    );
};
