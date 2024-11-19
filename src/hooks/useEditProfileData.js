import { useState } from "react"
import useAuthStore from "../store/authStore";
import useUserProfileStore from "../store/userProfileStore";
import useShowToast from "./useShowToast";
import { doc, updateDoc } from "firebase/firestore";
import { firestore } from "../firebase/firebase";

const useEditProfileData = () => {
    const [ isUpdating, setIsUpdating ] = useState(false);
    const authUser = useAuthStore(state => state.user);
    const setAuthUser = useAuthStore(state => state.setUser);
    const setUserProfile = useUserProfileStore(state => state.setUserProfile);
    const showToast = useShowToast();

    const editProfileData = async (data) => {
        if (isUpdating || !authUser) return;
        setIsUpdating(true);

        const userDocRef = doc(firestore, "users", authUser.uid);

        try {
            
            const updatedUser = {
                // przy zapisywaniu się oraz wypisywaniu się z eventu akutalizować usera
                ...authUser,
                fullName: data.fullName || authUser.fullName,
                birthDate: data.birthDate || authUser.birthDate,
                location: data.location || authUser.location,
                bio: data.bio || authUser.bio,
                scope: data.scope || authUser.scope
            }

            await updateDoc(userDocRef, updatedUser);
            localStorage.setItem("user-info", JSON.stringify(updatedUser));
            setAuthUser(updatedUser);
            setUserProfile(updatedUser);
            showToast("Success", "Profile data updated successfully", "success");

        } catch (error) {
            showToast("Error", error.message, "error");
        } finally {
            setIsUpdating(false);
        }
    }

    return { editProfileData, isUpdating };

}

export default useEditProfileData;