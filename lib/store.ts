import { create } from "zustand";
import type { ModelId } from "./models";
type State = {
  expandedUnitId: number | null;
  setExpandedUnit: (unitId: number | null) => void;
  sinhala: boolean;
  toggleLanguage: () => void;
  model: ModelId;
  setModel: (model: ModelId) => void;
  selected: string | null;
  select: (id: string | null) => void;
  visited: ModelId[];
};
export const useStudio = create<State>((set) => ({
  expandedUnitId: null,
  setExpandedUnit: (unitId) => set({ expandedUnitId: unitId }),
  sinhala: false,
  toggleLanguage: () => set((s) => ({ sinhala: !s.sinhala })),
  model: "heart",
  setModel: (model) =>
    set((s) => ({
      model,
      selected: null,
      visited: Array.from(new Set([...s.visited, model])),
    })),
  selected: null,
  select: (selected) => set({ selected }),
  visited: ["heart"],
}));
