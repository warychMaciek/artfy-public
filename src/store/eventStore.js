import { create } from "zustand";

const useEventStore = create(set => ({
    event: null,
    setEvent: event => set({event}),
}));

export default useEventStore;