import { create } from "zustand";

const useEventsStore = create(set => ({
    events: [],
    setEvents: events => set({events}),
    loadMoreEvents: moreEvents => set(state => ({events: [...state.events, ...moreEvents]}))
}));

export default useEventsStore;