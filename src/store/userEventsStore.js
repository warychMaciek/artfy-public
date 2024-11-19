import { create } from "zustand";

const useUserEventsStore = create(set => ({
    userEventsCreated: [],
    userEventsJoined: [],
    setUserEventsCreated: userEventsCreated => set({userEventsCreated}),
    setUserEventsJoined: userEventsJoined => set({userEventsJoined}),
    deleteUserEvent: id => set(state => ({
        userEventsCreated: state.userEventsCreated.filter(event => event.id !== id)
    })),
}));

export default useUserEventsStore;