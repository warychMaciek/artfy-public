import { create } from "zustand";

const useUserProfileStore = create(set => ({
    userProfile: null,
    setUserProfile: userProfile => set({userProfile}),
    addPhoto: (photo) => set(state => ({
        userProfile: { ...state.userProfile, photos: [photo.id, ...state.userProfile.photos] }
    })),
    
}));

export default useUserProfileStore;