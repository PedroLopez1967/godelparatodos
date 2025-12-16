import React, { forwardRef } from 'react';
import type { LogicSymbol } from '../../../types/logic.types';
import { Hexagon } from 'lucide-react';

interface AxiomTokenProps {
    axiom: LogicSymbol;
    className?: string;
    style?: React.CSSProperties;
    // Props passed from Draggable
    attributes?: any;
    listeners?: any;
}

// Pure Visual Component (forwardRef is important for dnd-kit)
export const AxiomToken = forwardRef<HTMLDivElement, AxiomTokenProps>(
    ({ axiom, className = '', style, attributes, listeners }, ref) => {
        return (
            <div
                ref={ref}
                style={style}
                {...listeners}
                {...attributes}
                className={`relative w-24 h-24 flex flex-col items-center justify-center cursor-grab active:cursor-grabbing hover:scale-110 transition-transform z-50 group touch-none ${className}`}
            >
                {/* Outer Glow / Halo */}
                <div className={`absolute inset-0 opacity-40 group-hover:opacity-70 transition-opacity ${axiom.color} blur-xl rounded-full`}></div>

                {/* Core Shape - Data Cell */}
                <div className={`relative z-10 w-20 h-20 ${axiom.color} bg-opacity-90 border-2 border-white/50 backdrop-blur-md rounded-lg flex items-center justify-center shadow-[0_0_20px_rgba(255,255,255,0.3)] clip-path-hexagon`}>
                    {/* Internal Tech Pattern */}
                    <div className="absolute inset-0 opacity-30 bg-black"
                        style={{
                            backgroundImage: 'linear-gradient(45deg, #000 25%, transparent 25%, transparent 75%, #000 75%, #000), linear-gradient(45deg, #000 25%, transparent 25%, transparent 75%, #000 75%, #000)',
                            backgroundSize: '4px 4px',
                            backgroundPosition: '0 0, 2px 2px'
                        }}>
                    </div>

                    {/* Icon */}
                    <Hexagon size={56} className="text-white opacity-90 absolute rotate-90 drop-shadow-lg" strokeWidth={1.5} />

                    {/* Symbol Text */}
                    <span className="relative z-20 text-4xl font-mono font-black text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                        {axiom.symbol}
                    </span>
                </div>

                {/* Label Tag */}
                <div className="absolute -bottom-8 bg-black/80 text-cyan-400 text-[10px] font-mono tracking-widest uppercase px-2 py-0.5 rounded border border-cyan-900 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    DATA: {axiom.type}
                </div>
            </div>
        );
    }
);
