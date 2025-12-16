import React, { useState, useEffect } from 'react';
import { FactoryLayout } from '../components/scenarios/Factory/FactoryLayout';
import { factoryLevels } from '../data/factory-levels';
import { DndContext, type DragEndEvent, type DragStartEvent, useSensor, useSensors, MouseSensor, TouchSensor, pointerWithin, DragOverlay } from '@dnd-kit/core';
import { DraggableAxiom } from '../components/scenarios/Factory/DraggableAxiom';
import { InferenceMachine } from '../components/scenarios/Factory/InferenceMachine';
import { AxiomToken } from '../components/scenarios/Factory/AxiomToken';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, AlertTriangle, ArrowRight, Home } from 'lucide-react';
import type { LogicSymbol } from '../types/logic.types';
import { Link } from 'react-router-dom';

export const ScenarioFactory: React.FC = () => {
    // Level State
    const [currentLevelIndex, setCurrentLevelIndex] = useState(0);
    const [levelComplete, setLevelComplete] = useState(false);
    const currentLevel = factoryLevels[currentLevelIndex];

    // Machine State
    const [machineInputs, setMachineInputs] = useState<Record<string, LogicSymbol[]>>({});
    const [machineErrors, setMachineErrors] = useState<Record<string, boolean>>({});
    const [machineOutputs, setMachineOutputs] = useState<Record<string, LogicSymbol | null>>({}); // New local output state
    const [producedTheorem, setProducedTheorem] = useState<string | null>(null);
    const [activeId, setActiveId] = useState<string | null>(null);

    // Reset state when level changes
    useEffect(() => {
        setMachineInputs({});
        setProducedTheorem(null);
        setLevelComplete(false);
        setMachineErrors({});
        setMachineOutputs({});
    }, [currentLevelIndex]);

    const handleDragStart = (event: DragStartEvent) => {
        setActiveId(event.active.id as string);
    };

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        setActiveId(null);

        if (over && active.data.current && over.data.current) {
            const axiom = active.data.current as LogicSymbol;
            const ruleId = over.data.current.id;

            // Find the rule definition from level (contains logic)
            const ruleLogic = currentLevel.availableRules.find(r => r.id === ruleId);
            if (!ruleLogic) return;

            // Get current inputs
            const currentInputs = machineInputs[ruleId] || [];
            if (currentInputs.length >= ruleLogic.inputs) return; // Full

            const newInputs = [...currentInputs, axiom];

            // Update Input State
            setMachineInputs(prev => ({
                ...prev,
                [ruleId]: newInputs
            }));

            // Check if ready to process
            if (newInputs.length === ruleLogic.inputs) {
                const result = ruleLogic.apply(newInputs);

                if (result) {
                    // SUCCESS
                    setProducedTheorem(result.symbol);
                    setMachineOutputs(prev => ({ ...prev, [ruleId]: result })); // Show on machine

                    if (result.symbol === currentLevel.goalTheorem) {
                        setLevelComplete(true);
                    }

                    // Clear inputs after success animation
                    setTimeout(() => {
                        setMachineInputs(prev => ({ ...prev, [ruleId]: [] }));
                        setMachineOutputs(prev => ({ ...prev, [ruleId]: null })); // Clear output display
                    }, 2000);

                } else {
                    // FAILURE / INVALID COMBINATION
                    setMachineErrors(prev => ({ ...prev, [ruleId]: true }));

                    // Clear error and inputs after delay
                    setTimeout(() => {
                        setMachineErrors(prev => ({ ...prev, [ruleId]: false }));
                        setMachineInputs(prev => ({ ...prev, [ruleId]: [] }));
                    }, 1000);
                }
            }
        }
    };

    const nextLevel = () => {
        if (currentLevelIndex < factoryLevels.length - 1) {
            setCurrentLevelIndex(prev => prev + 1);
        }
    };

    const sensors = useSensors(
        useSensor(MouseSensor, {
            activationConstraint: {
                distance: 10,
            },
        }),
        useSensor(TouchSensor, {
            activationConstraint: {
                delay: 250,
                tolerance: 5,
            },
        })
    );

    // Active Axiom helper
    const activeAxiom = activeId ? currentLevel.availableAxioms.find(a => a.id === activeId) : null;

    return (
        <DndContext
            sensors={sensors}
            collisionDetection={pointerWithin}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
        >
            <FactoryLayout title="La Fábrica de Verdades" levelInfo={currentLevel.name}>
                <div className="flex gap-8 relative">

                    {/* Background Ambience */}
                    <div className="absolute inset-0 pointer-events-none opacity-10 bg-[url('https://www.transparenttextures.com/patterns/black-scales.png')]"></div>
                    <div className="absolute top-0 left-0 w-full h-1 bg-cyan-500 shadow-[0_0_20px_rgba(34,211,238,0.5)] z-20"></div>

                    {/* Left Column: Axiom Conveyor Belt */}
                    <div className="w-1/4 bg-slate-900 border-r-4 border-slate-800 flex flex-col items-center relative z-10 shadow-2xl sticky top-16 h-[calc(100vh-4rem)]">
                        {/* Conveyor Header */}
                        <div className="w-full bg-slate-950 p-4 border-b border-slate-800 flex flex-col items-center">
                            <h2 className="text-cyan-500 font-black uppercase tracking-[0.3em] text-sm animate-pulse-slow">Axiom Supply</h2>
                            <div className="w-full h-1 mt-2 bg-slate-800 relative overflow-hidden">
                                <div className="absolute inset-y-0 bg-cyan-900 w-1/3 animate-loading-bar"></div>
                            </div>
                        </div>

                        {/* The Belt */}
                        <div className="flex-grow w-full flex flex-col items-center gap-12 py-8 overflow-y-auto relative"
                            style={{
                                backgroundImage: `radial-gradient(#1e293b 1px, transparent 1px)`,
                                backgroundSize: '20px 20px',
                                backgroundColor: '#0f172a'
                            }}
                        >
                            {/* Belt Treads */}
                            <div className="absolute inset-0 opacity-10 flex flex-col gap-4 pointer-events-none">
                                {[...Array(20)].map((_, i) => (
                                    <div key={i} className="w-full h-8 bg-black skew-y-12"></div>
                                ))}
                            </div>

                            {currentLevel.availableAxioms.map(axiom => (
                                <DraggableAxiom key={axiom.id} axiom={axiom} />
                            ))}
                        </div>
                    </div>

                    {/* Center: Production Floor */}
                    <div className="flex-grow flex flex-col items-center relative z-10 p-6 scrollbar-thin scrollbar-thumb-cyan-900 scrollbar-track-transparent pb-64">

                        {/* Manufacturing Order / Goal */}
                        <div className="w-full max-w-3xl bg-slate-800/80 border border-slate-600 p-2 rounded-xl flex items-center justify-between mb-4 shadow-lg backdrop-blur-sm relative overflow-hidden group">
                            <div className="absolute inset-0 bg-cyan-900/10 transform -skew-x-12 translate-x-full group-hover:translate-x-0 transition-transform duration-1000"></div>

                            <div className="z-10">
                                <p className="text-slate-400 text-xs font-mono uppercase mb-1">Current Order:</p>
                                <p className="text-cyan-200 text-sm font-medium">{currentLevel.description}</p>
                            </div>

                            <div className="flex items-center gap-4 z-10 bg-slate-950/50 p-2 rounded-lg border border-slate-700">
                                <span className="text-slate-500 text-xs font-black uppercase tracking-widest">TARGET:</span>
                                <span className="text-3xl font-mono font-bold text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">
                                    {currentLevel.goalTheorem}
                                </span>
                            </div>
                        </div>

                        {/* Machine Deck */}
                        <div className="flex flex-wrap items-start justify-center gap-12 w-full max-w-5xl">
                            {currentLevel.availableRules.map(rule => (
                                <div key={rule.id} className={machineErrors[rule.id] ? 'animate-shake' : ''}>
                                    <InferenceMachine
                                        rule={rule}
                                        currentInputs={machineInputs[rule.id] || []}
                                        lastOutput={machineOutputs[rule.id]}
                                    />
                                    {machineErrors[rule.id] && (
                                        <div className="absolute -bottom-12 left-0 right-0 text-center">
                                            <div className="inline-flex items-center gap-2 bg-red-900/90 text-red-200 px-4 py-2 rounded font-bold border border-red-500 shadow-xl animate-bounce">
                                                <AlertTriangle size={18} />
                                                <span>SYSTEM ERROR</span>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>

                        {/* Output Stats / Notifications */}
                        <div className="mt-auto w-full flex justify-center pb-8 min-h-[150px]">
                            <AnimatePresence mode='wait'>
                                {levelComplete ? (
                                    <motion.div
                                        key="complete"
                                        initial={{ scale: 0.8, opacity: 0, y: 50 }}
                                        animate={{ scale: 1, opacity: 1, y: 0 }}
                                        exit={{ scale: 0.8, opacity: 0 }}
                                        className="bg-green-600 text-white p-8 rounded-2xl shadow-[0_0_100px_rgba(34,197,94,0.3)] flex flex-col items-center gap-6 border-4 border-green-400 relative overflow-hidden"
                                    >
                                        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
                                        <div className="absolute top-0 w-full h-1 bg-white/50 animate-loading-bar"></div>

                                        <div className="flex items-center gap-4 relative z-10">
                                            <div className="bg-white p-2 rounded-full text-green-600">
                                                <CheckCircle size={40} />
                                            </div>
                                            <div>
                                                <h3 className="text-3xl font-black uppercase tracking-wider">Production Complete</h3>
                                                <p className="text-green-100 font-mono text-sm">Theorem Verified & Packaged.</p>
                                            </div>
                                        </div>

                                        <div className="flex gap-4 relative z-10 w-full justify-center">
                                            <Link to="/" className="bg-black/30 hover:bg-black/50 text-white px-6 py-3 rounded-lg font-bold flex items-center gap-2 transition-all border border-green-500/50 uppercase tracking-widest text-sm">
                                                <Home size={18} />
                                                Panel
                                            </Link>

                                            {currentLevelIndex < factoryLevels.length - 1 ? (
                                                <button onClick={nextLevel} className="bg-white text-green-700 hover:bg-gray-100 px-8 py-3 rounded-lg font-black flex items-center gap-2 transition-all shadow-lg transform hover:-translate-y-1 uppercase tracking-widest text-sm">
                                                    Next Order
                                                    <ArrowRight size={20} />
                                                </button>
                                            ) : (
                                                <div className="text-sm font-bold bg-black/40 px-6 py-3 rounded border border-white/20">ALL ORDERS FULFILLED</div>
                                            )}
                                        </div>
                                    </motion.div>
                                ) : producedTheorem && (
                                    <motion.div
                                        key="theorem"
                                        initial={{ y: 50, opacity: 0, scale: 0.9 }}
                                        animate={{ y: 0, opacity: 1, scale: 1 }}
                                        exit={{ y: -50, opacity: 0, scale: 0.9 }}
                                        className="bg-cyan-950/80 border-2 border-cyan-400 text-cyan-100 px-10 py-6 rounded-xl backdrop-blur-md shadow-[0_0_50px_rgba(34,211,238,0.2)] flex items-center gap-6"
                                    >
                                        <div className="w-12 h-12 rounded-full border-2 border-cyan-500 border-dashed animate-spin-slow flex items-center justify-center">
                                            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-ping"></div>
                                        </div>
                                        <div className="text-center">
                                            <span className="text-xs uppercase tracking-[0.3em] text-cyan-500 font-bold block mb-2">Output Generated</span>
                                            <span className="text-5xl font-mono font-black text-white drop-shadow-[0_0_15px_rgba(34,211,238,0.8)]">
                                                {producedTheorem}
                                            </span>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                    </div>



                    // ...

                    {/* Floating Drag Overlay */}
                    <DragOverlay>
                        {activeAxiom ? (
                            <div className="scale-110 pointer-events-none cursor-grabbing">
                                <AxiomToken axiom={activeAxiom} />
                            </div>
                        ) : null}
                    </DragOverlay>
                </div>
            </FactoryLayout>
        </DndContext>
    );
};
