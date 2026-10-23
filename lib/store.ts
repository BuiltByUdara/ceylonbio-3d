import { create } from "zustand";
import type { ModelId } from "./data";
type State = {
  sinhala: boolean;
  toggleLanguage: () => void;
  model: ModelId;
  setModel: (model: ModelId) => void;
  selected: string | null;
  select: (id: string | null) => void;
  visited: ModelId[];
};
export const useStudio = create<State>((set) => ({
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
