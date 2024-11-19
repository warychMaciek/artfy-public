import { useEffect, useState } from "react"
import useGalleryImagesStore from "../store/galleryImagesStore";
import useShowToast from "./useShowToast";
import useUserProfileStore from "../store/userProfileStore";
import { collection, getDocs, query, where } from "firebase/firestore";
import { firestore } from "../firebase/firebase";

const useGetUserGallery = () => {
    const [ isLoading, setIsLoading ] = useState(false);
    const { photos, setPhotos } = useGalleryImagesStore();
    const showToast = useShowToast();
    const userProfile = useUserProfileStore(state => state.userProfile);

    useEffect(() => {
        const getPhotos = async () => {

            if (!userProfile) return;
            setIsLoading(true);
            setPhotos([]);

            try {

                const q = query(collection(firestore, "images"), where("owner", "==", userProfile.uid));
                const querySnapshot = await getDocs(q);

                const photos = [];
                querySnapshot.forEach(doc => {
                    photos.push({ ...doc.data(), id: doc.id });
                });

                photos.sort((a, b) => b.addedAt - a.addedAt);
                setPhotos(photos);
                
            } catch (error) {
                showToast("Error", error.message, "error");
                setPhotos([]);
            } finally {
                setIsLoading(false);
            }

        }

        getPhotos();

    }, [setPhotos, userProfile, showToast]);

    return { isLoading, photos };
}

export default useGetUserGallery;