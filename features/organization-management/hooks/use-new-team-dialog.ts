import { create } from "zustand";

type TeamDialogState = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

export const useNewTeamDialog = create<TeamDialogState>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
