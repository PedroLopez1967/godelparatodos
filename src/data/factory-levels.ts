import type { FactoryLevel, LogicSymbol, InferenceRule } from '../types/logic.types';

export const AXIOM_A: LogicSymbol = { id: 'axiom-a', symbol: 'A', type: 'axiom', color: 'bg-green-500' };
export const AXIOM_B: LogicSymbol = { id: 'axiom-b', symbol: 'B', type: 'axiom', color: 'bg-blue-500' };

export const RULE_IDENTITY: InferenceRule = {
    id: 'rule-identity',
    name: 'Identidad',
    description: 'La máquina saca exactamente lo que entra.',
    inputs: 1,
    apply: (inputs) => inputs[0] // Returns the same symbol
};

// Axioms for Level 2
export const AXIOM_P: LogicSymbol = { id: 'axiom-p', symbol: 'P', type: 'axiom', color: 'bg-purple-500' };
export const AXIOM_P_IMP_Q: LogicSymbol = { id: 'axiom-p-q', symbol: 'P→Q', type: 'axiom', color: 'bg-yellow-500' };

export const RULE_MODUS_PONENS: InferenceRule = {
    id: 'rule-mp',
    name: 'Modus Ponens',
    description: 'Si tienes P y P→Q, obtienes Q.',
    inputs: 2,
    apply: (inputs) => {
        // We need exactly 2 inputs
        if (inputs.length !== 2) return null;

        // Check for P and P->Q combo (order doesn't matter)
        const implies = inputs.find(i => i.symbol.includes('→'));
        const simple = inputs.find(i => !i.symbol.includes('→'));

        if (!implies || !simple) return null;

        const [p, q] = implies.symbol.split('→');

        if (simple.symbol === p) {
            return {
                id: `theorem-${q}-${Date.now()}`,
                symbol: q,
                type: 'theorem',
                color: 'bg-green-500'
            };
        }
        return null; // Invalid combination
    }
};

export const factoryLevels: FactoryLevel[] = [
    {
        id: 'factory-1',
        name: 'Nivel 1: Identidad',
        description: 'Arrastra el Axioma A a la máquina de Identidad.',
        availableAxioms: [AXIOM_A],
        availableRules: [RULE_IDENTITY],
        goalTheorem: 'A',
        tutorialText: 'Arrastra "A" a la máquina para producir el Teorema A.'
    },
    {
        id: 'factory-2',
        name: 'Nivel 2: Modus Ponens',
        description: 'Tienes "P" y "Si P entonces Q". ¡Obtén Q!',
        availableAxioms: [AXIOM_P, AXIOM_P_IMP_Q],
        availableRules: [RULE_MODUS_PONENS],
        goalTheorem: 'Q',
        tutorialText: 'La máquina Modus Ponens necesita DOS piezas. Arrástralas una por una.'
    }
];
