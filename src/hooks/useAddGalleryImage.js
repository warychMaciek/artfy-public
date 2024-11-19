import { useState } from "react";
import useAuthStore from "../store/authStore";
import useUserProfileStore from "../store/userProfileStore";
import useShowToast from "./useShowToast";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { firestore, storage } from "../firebase/firebase";
import { addDoc, arrayUnion, collection, doc, updateDoc } from "firebase/firestore";
import useGalleryImagesStore from "../store/galleryImagesStore";

const useAddGalleryImage = () => {
    const [ isLoading, setIsLoading ] = useState(false);
    const authUser = useAuthStore(state => state.user);
    const userProfile = useUserProfileStore(state => state.userProfile);
    const addPhoto = useUserProfileStore(state => state.addPhoto);
    const createPhoto = useGalleryImagesStore(state => state.createPhoto);
    const showToast = useShowToast();

    const addGalleryImage = async (selectedFile) => {

        if (isLoading || !authUser) return;
        if (!selectedFile) throw new Error('Please, select an image');
        setIsLoading(true);

        const newImageDoc = {
            owner: authUser.uid,
            addedAt: Date.now(),
            tags: [],
            comments: []
        }

        try {

            //ograniczenie do 8 zdjec dodac

            const imageDocRef = await addDoc(collection(firestore, "images"), newImageDoc);
            const userDocRef = doc(firestore, "users", authUser.uid);
            const imageRef = ref(storage, `images/${authUser.uid}/${imageDocRef.id}`);

            await updateDoc(userDocRef, {photos: arrayUnion(imageDocRef.id)});
            await uploadString(imageRef, selectedFile, "data_url");
            const downloadURL = await getDownloadURL(imageRef);

            await updateDoc(imageDocRef, {imageURL: downloadURL});

            newImageDoc.imageURL = downloadURL;

            if (userProfile.uid && authUser.uid) {
                addPhoto({ ...newImageDoc, id: imageDocRef.id });
                createPhoto({ ...newImageDoc, id: imageDocRef.id });
            }

            showToast("Success", "Photo added successfully", "success");
            
        } catch (error) {
            showToast("Error", error.message, "error");
        } finally {
            setIsLoading(false);
        }

    }

    return { isLoading, addGalleryImage };

}

export default useAddGalleryImage;