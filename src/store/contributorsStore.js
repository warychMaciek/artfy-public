import { create } from "zustand";

const useContributorsStore = create(set => ({
    contributors: [],
    setContributors: contributors => set({contributors}),
}));

export default useContributorsStore;