export type EvidenceType = 'physical' | 'testimony' | 'document';

export interface Evidence {
    id: string;
    name: string;
    description: string;
    type: EvidenceType;
    isRelevant: boolean; // Does it help prove the truth?
    isFound: boolean;
    position: { x: number; y: number }; // For the scene
}

export interface DeductionCombo {
    id: string;
    evidenceIds: [string, string];
    resultTitle: string;
    resultDescription: string;
    isCorrect: boolean; // Does this deduction actually help solve the case?
}

export interface Case {
    id: string;
    title: string;
    description: string;
    truth: string; // The objective truth (e.g. "The butler did it")
    provability: string; // Why it can/cannot be proved yet
    evidence: Evidence[];
    combinations: DeductionCombo[]; // New field for logic
    requiredEvidenceIds: string[]; // IDs needed to PROVE the case
    minEvidenceCount: number;
}

export const detectiveCases: Case[] = [
    {
        id: 'case-1',
        title: 'El Caso del Jarrón Roto',
        description: 'Sabemos que el gato rompió el jarrón (verdad), pero ¿podemos demostrarlo?',
        truth: 'El gato Mittens rompió el jarrón.',
        provability: 'Al principio no hay prueba directa, solo sospechas. Conecta las pistas para formar una prueba sólida.',
        evidence: [
            {
                id: 'ev-1',
                name: 'Huellas de Gato',
                description: 'Huellas pequeñas cerca de los fragmentos.',
                type: 'physical',
                isRelevant: true,
                isFound: false,
                position: { x: 20, y: 80 }
            },
            {
                id: 'ev-2',
                name: 'Testimonio de la Abuela',
                description: 'Dice que escuchó un ruido fuerte "Miau".',
                type: 'testimony',
                isRelevant: true,
                isFound: false,
                position: { x: 50, y: 50 }
            },
            {
                id: 'ev-3',
                name: 'Pelo de Perro',
                description: 'Un pelo de perro, pero el perro estaba fuera.',
                type: 'physical',
                isRelevant: false,
                isFound: false,
                position: { x: 80, y: 70 }
            }
        ],
        combinations: [
            {
                id: 'combo-1',
                evidenceIds: ['ev-1', 'ev-2'],
                resultTitle: 'Coincidencia Temporal',
                resultDescription: 'Las huellas frescas coinciden con el momento en que se escuchó el "Miau". ¡Esto sitúa a Mittens en la escena!',
                isCorrect: true
            },
            {
                id: 'combo-2',
                evidenceIds: ['ev-1', 'ev-3'],
                resultTitle: 'Contradicción',
                resultDescription: 'Las huellas de gato no explican el pelo de perro. Probablemente el pelo ya estaba allí.',
                isCorrect: false
            }
        ],
        requiredEvidenceIds: ['ev-1', 'ev-2'],
        minEvidenceCount: 2
    },
    {
        id: 'case-2',
        title: 'El Ladrón Invisible',
        description: 'Sabemos que alguien robó el pastel (la verdad), pero nadie dejó huellas.',
        truth: 'El mayordomo se comió el pastel.',
        provability: 'Es VERDAD, pero con la evidencia actual (axiomas), es INDECIDIBLE (no se puede demostrar ni refutar).',
        evidence: [
            {
                id: 'ev-2-1',
                name: 'Plato Vacío',
                description: 'Un plato con migas, pero sin huellas dactilares.',
                type: 'physical',
                isRelevant: true,
                isFound: false,
                position: { x: 30, y: 40 }
            },
            {
                id: 'ev-2-2',
                name: 'Ventana Abierta',
                description: 'Podría haber entrado alguien... o haber sido el viento.',
                type: 'physical',
                isRelevant: false,
                isFound: false,
                position: { x: 70, y: 60 }
            },
            {
                id: 'ev-2-3',
                name: 'Guantes de Seda',
                description: 'Unos guantes limpios en el bolsillo del mayordomo.',
                type: 'physical',
                isRelevant: true,
                isFound: false,
                position: { x: 10, y: 20 }
            }
        ],
        combinations: [
            {
                id: 'combo-2-1',
                evidenceIds: ['ev-2-1', 'ev-2-3'],
                resultTitle: 'Hipótesis de los Guantes',
                resultDescription: 'Si usó guantes, no dejaría huellas. Es plausible, pero... ¿cómo probamos que LOS USÓ para robar?',
                isCorrect: false // Can't prove it fully yet!
            }
        ],
        requiredEvidenceIds: [],
        minEvidenceCount: 99
    },
    {
        id: 'case-3',
        title: 'El Ladrón Invisible (Con Axiomas)',
        description: 'Hemos recibido una nueva herramienta: LUZ UV (Nuevo Axioma). ¿Cambiará esto nuestra capacidad de probar la verdad?',
        truth: 'El mayordomo se comió el pastel.',
        provability: '¡SOLUCIONADO! Al añadir un nuevo axioma (Luz UV), lo que era invisible e indecidible se volvió visible y demostrable.',
        evidence: [
            {
                id: 'ev-3-1',
                name: 'Plato Vacío',
                description: 'El mismo plato de antes.',
                type: 'physical',
                isRelevant: true,
                isFound: false,
                position: { x: 30, y: 40 }
            },
            {
                id: 'ev-3-2',
                name: 'Huellas Fluorescentes',
                description: '¡La Luz UV revela huellas de zapato del mayordomo en la ventana!',
                type: 'physical',
                isRelevant: true,
                isFound: false,
                position: { x: 70, y: 60 }
            },
            {
                id: 'ev-3-3',
                name: 'Restos de Glaseado',
                description: 'Brillan bajo la luz UV en el delantal del mayordomo.',
                type: 'physical',
                isRelevant: true,
                isFound: false,
                position: { x: 50, y: 30 }
            }
        ],
        combinations: [
            {
                id: 'combo-3-1',
                evidenceIds: ['ev-3-2', 'ev-3-3'],
                resultTitle: 'Conexión Forense',
                resultDescription: 'Las huellas en la ventana y el glaseado en el delantal demuestran que el mayordomo estuvo en ambos lugares.',
                isCorrect: true
            }
        ],
        requiredEvidenceIds: ['ev-3-1', 'ev-3-2', 'ev-3-3'],
        minEvidenceCount: 3
    }
];
