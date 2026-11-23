import { create } from "zustand";
import { persist } from "zustand/middleware";

export type BasketLine = { id: string; qty: number };

type BasketState = {
  lines: BasketLine[];
  open: boolean;
  setOpen: (open: boolean) => void;
  add: (id: string) => void;
  setQty: (id: string, qty: number) => void;
  remove: (id: string) => void;
  count: () => number;
};

export const useBasket = create<BasketState>()(
  persist(
    (set, get) => ({
      lines: [],
      open: false,
      setOpen: (open) => set({ open }),
      add: (id) =>
        set((state) => {
          const existing = state.lines.find((line) => line.id === id);
          const lines = existing
            ? state.lines.map((line) =>
                line.id === id ? { ...line, qty: line.qty + 1 } : line,
              )
            : [...state.lines, { id, qty: 1 }];
          return { lines, open: true };
        }),
      setQty: (id, qty) =>
        set((state) => ({
          lines:
            qty <= 0
              ? state.lines.filter((line) => line.id !== id)
              : state.lines.map((line) =>
                  line.id === id ? { ...line, qty } : line,
                ),
        })),
      remove: (id) =>
        set((state) => ({
          lines: state.lines.filter((line) => line.id !== id),
        })),
      count: () => get().lines.reduce((sum, line) => sum + line.qty, 0),
    }),
    { name: "mare-alta-basket", skipHydration: true, partialize: (state) => ({ lines: state.lines }) },
  ),
);
