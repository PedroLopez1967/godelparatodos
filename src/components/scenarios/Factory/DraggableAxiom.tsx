import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import type { LogicSymbol } from '../../../types/logic.types';
import { AxiomToken } from './AxiomToken';

interface DraggableAxiomProps {
    axiom: LogicSymbol;
}

export const DraggableAxiom: React.FC<DraggableAxiomProps> = ({ axiom }) => {
    const { attributes, listeners, setNodeRef } = useDraggable({
        id: axiom.id,
        data: axiom
    });

    const style = undefined;

    return (
        <AxiomToken
            ref={setNodeRef}
            axiom={axiom}
            style={style}
            listeners={listeners}
            attributes={attributes}
        />
    );
};
