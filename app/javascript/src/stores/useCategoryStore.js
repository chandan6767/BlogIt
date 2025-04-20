import { findById, removeById } from "@bigbinary/neeto-cist";
import { create } from "zustand";
import { persist } from "zustand/middleware";

const useCategoryStore = create(
  persist(
    (set, get) => ({
      selected: [],

      toggle: category => {
        const { selected } = get();

        const updated = findById(category.id, selected)
          ? removeById(category.id, selected)
          : [...selected, category];

        set({ selected: updated });
      },

      clear: () => set({ selected: [] }),

      isSelected: category => findById(category.id, get().selected),
    }),
    { name: "category-store" }
  )
);

export default useCategoryStore;
