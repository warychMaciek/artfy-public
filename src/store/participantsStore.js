import { create } from "zustand";

const useParticipantsStore = create(set => ({
    participants: [],
    setParticipants: participants => set({participants}),
}));

export default useParticipantsStore;