import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface GameState {
    currentScenario: string | null;
    unlockedScenarios: string[];
    completedScenarios: string[];

    setCurrentScenario: (id: string | null) => void;
    unlockScenario: (id: string) => void;
    completeScenario: (id: string) => void;
    resetProgress: () => void;
}

export const useGameStore = create<GameState>()(
    persist(
        (set) => ({
            currentScenario: null,
            // Initially, Detective, Factory, and Paradox are unlocked
            unlockedScenarios: ['detective', 'factory', 'paradox'],
            completedScenarios: [],

            setCurrentScenario: (id) => set({ currentScenario: id }),

            unlockScenario: (id) => set((state) => {
                if (state.unlockedScenarios.includes(id)) return state;
                return { unlockedScenarios: [...state.unlockedScenarios, id] };
            }),

            completeScenario: (id) => set((state) => {
                if (state.completedScenarios.includes(id)) return state;
                return { completedScenarios: [...state.completedScenarios, id] };
            }),

            resetProgress: () => set({
                unlockedScenarios: ['detective', 'factory', 'paradox'],
                completedScenarios: []
            })
        }),
        {
            name: 'godel-game-storage',
        }
    )
);
