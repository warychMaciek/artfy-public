import { create } from "zustand";

const useGalleryImagesStore = create(set => ({
    photos: [],
    createPhoto: photo => set(state => ({ photos: [photo, ...state.photos] })),
    setPhotos: photos => set({ photos }),
    deletePhoto: id => set(state => ({ photos: state.photos.filter(photo => photo.id !== id) }))
}))

export default useGalleryImagesStore;