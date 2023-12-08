import { create } from "zustand";

type UseRenameStore = {
  id?: string;
  fileName?: string;
  isOpen: boolean;
  onOpen: (id: string, fileName: string) => void;
  onClose: () => void;
};

export const useRenameModal = create<UseRenameStore>((set, get) => ({
  id: undefined,
  fileName: undefined,
  isOpen: false,
  onOpen: (id, fileName) => set({ isOpen: true, id, fileName }),
  onClose: () => set({ isOpen: false, id: undefined, fileName: undefined }),
}));
