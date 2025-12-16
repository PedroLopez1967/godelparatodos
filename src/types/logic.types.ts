export type SymbolType = 'axiom' | 'theorem' | 'operator';

export interface LogicSymbol {
    id: string;
    symbol: string; // e.g., "P", "Q", "A"
    label?: string; // e.g., "Si llueve"
    type: SymbolType;
    color?: string; // Visual coding
}

export interface InferenceRule {
    id: string;
    name: string; // e.g., "Modus Ponens"
    description: string;
    inputs: number; // How many premises it needs (e.g., 2)
    // Function to validate and transform inputs into a new symbol
    // In a real app, this would be more complex logic parsing
    apply: (inputs: LogicSymbol[]) => LogicSymbol | null;
}

export interface FactoryLevel {
    id: string;
    name: string;
    description: string;
    availableAxioms: LogicSymbol[];
    availableRules: InferenceRule[];
    goalTheorem: string; // The symbol string required to win (e.g. "Q")
    tutorialText?: string;
}
